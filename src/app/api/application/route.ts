import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { calculateQualityScore, assignTier } from "@/lib/scoring";
import { sendApplicationAccepted } from "@/lib/email";
import { env } from "@/lib/env";

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
    const application = await request.json();

    // Security: validate no HTML/script injection in all string fields
    const htmlError = validateNoHtmlInput(application);
    if (htmlError) {
      return NextResponse.json({ success: false, error: htmlError }, { status: 400 });
    }

    // Ensure we have contact details
    const email = application.q18_contact?.email;
    const fullName = application.q18_contact?.fullName;
    if (!email || !fullName) {
      return NextResponse.json(
        { success: false, error: "Contact email and full name are required." },
        { status: 400 }
      );
    }

    // Calculate quality score using the deterministic scoring engine
    const score = calculateQualityScore(application);

    // Determine base tier
    let { tier, inherited } = assignTier(score);

    // Handle referral inheritance (simplified for MVP)
    if (application.q20_referralCode && /^CST-\d{4}-\d{4}$/.test(application.q20_referralCode)) {
      // In a real database scenario, we'd fetch the referrer's actual tier.
      // For MVP, if they have a valid formatted referral code, they can inherit up to Founding.
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
