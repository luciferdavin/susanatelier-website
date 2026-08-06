import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { z } from "zod";
import { calculateQualityScore, assignTier } from "@/lib/scoring";
import { sendApplicationAccepted } from "@/lib/email";
import { env } from "@/lib/env";

// ponytail: in-memory per-IP rate limit — fine for single-instance prelaunch; swap to KV/Redis if scaled horizontally.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const hitCounts = new Map<string, number[]>();

// Body-size guard: cap at 256KB (forms are ~2KB, this leaves generous headroom).
const MAX_BODY_BYTES = 256_000;

// Trust-boundary fields: email must be valid, fullName non-empty, referral code format enforced.
const applicationSchema = z.object({
  q18_contact: z.object({
    email: z.string().email().max(320),
    fullName: z.string().min(1).max(120),
  }),
  q20_referralCode: z
    .string()
    .regex(/^CST-\d{4}-[A-Z0-9]{4}$/)
    .optional(),
}).passthrough();

/**
 * Validates that all string values in the application object are safe for
 * HTML context. Rejects inputs containing HTML/script tags to prevent
 * template injection if data is ever rendered in email templates.
 */
function validateNoHtmlInput(obj: Record<string, unknown>, path = ""): string | null {
  const htmlPattern = /<[^>]*>/;
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = path ? `${path}.${key}` : key;
    if (typeof value === "string" && htmlPattern.test(value)) {
      return `Invalid characters in field: ${currentPath}`;
    }
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const err = validateNoHtmlInput(value as Record<string, unknown>, currentPath);
      if (err) return err;
    }
    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (typeof value[i] === "string" && htmlPattern.test(value[i])) {
          return `Invalid characters in field: ${currentPath}[${i}]`;
        }
      }
    }
  }
  return null;
}

export async function POST(request: NextRequest) {
  try {
    // Body-size guard (prevents memory abuse).
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return NextResponse.json({ success: false, error: "Request too large" }, { status: 413 });
    }
    const application = JSON.parse(raw);

    // Per-IP rate limiting (10 requests per minute).
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const hits = (hitCounts.get(ip) || []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (hits.length >= RATE_LIMIT_MAX) {
      return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
    }
    hits.push(now);
    hitCounts.set(ip, hits);

    // Security: validate no HTML/script injection in all string fields
    const htmlError = validateNoHtmlInput(application);
    if (htmlError) {
      return NextResponse.json({ success: false, error: htmlError }, { status: 400 });
    }

    // Security: schema-validate trust-boundary fields (contact + referral format).
    const parsed = applicationSchema.safeParse(application);
    if (!parsed.success) {
      return NextResponse.json({ success: false, error: "Invalid application data." }, { status: 400 });
    }
    const email = parsed.data.q18_contact.email;
    const fullName = parsed.data.q18_contact.fullName;

    // Calculate quality score using the deterministic scoring engine
    const score = calculateQualityScore(application);

    // Determine base tier
    let { tier, inherited } = assignTier(score);

    // Handle referral inheritance (simplified for MVP)
    // Referral code format must match issued codes (CST-<year>-<4 hex/digits>).
    // TODO: gate on a real referrer DB record in production — format match alone is weak.
    if (parsed.data.q20_referralCode) {
      tier = "founding";
      inherited = true;
    }

    // Generate referral code using crypto-safe randomness
    const randomBytes = crypto.randomBytes(3).toString("hex").toUpperCase();
    const referralCode = `CST-${new Date().getFullYear()}-${randomBytes.substring(0, 4)}`;

    // Generate waitlist number using crypto-safe randomness
    const waitlistRandom = crypto.randomBytes(2).toString("hex").toUpperCase();
    const waitlistNumber = `CST-${new Date().getFullYear().toString().slice(-2)}${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-${waitlistRandom}`;

    // Trigger transactional email if API key is present
    if (env.RESEND_API_KEY) {
      try {
        await sendApplicationAccepted(email, {
          applicantName: fullName,
          tier,
          score,
          referralCode,
        });
      } catch (emailErr) {
        console.error("Failed to send application acceptance email:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      score,
      tier,
      inherited,
      referralCode,
      waitlistNumber,
    });
  } catch (error: unknown) {
    console.error("Failed to process application:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process application" },
      { status: 500 }
    );
  }
}
