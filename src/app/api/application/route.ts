import { NextResponse } from "next/server";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Validation schema
// ---------------------------------------------------------------------------

const socialLinksSchema = z
  .object({
    instagram: z.string().url("Invalid Instagram URL").optional(),
    tiktok: z.string().url("Invalid TikTok URL").optional(),
    youtube: z.string().url("Invalid YouTube URL").optional(),
    website: z.string().url("Invalid website URL").optional(),
    linkedin: z.string().url("Invalid LinkedIn URL").optional(),
  })
  .optional();

const applicationBodySchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long")
    .trim(),
  email: z.string().email("Invalid email address").trim(),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .optional(),
  city: z.string().min(1, "City is required").max(100).trim(),
  role: z
    .enum(
      [
        "model",
        "stylist",
        "photographer",
        "designer",
        "content-creator",
        "influencer",
        "buyer",
        "other",
      ] as const,
    )
    .optional(),
  experience: z.string().max(2000).trim().optional(),
  portfolio: z.string().url("Invalid portfolio URL").optional(),
  socialLinks: socialLinksSchema,
  whyJoin: z
    .string()
    .min(10, "Please write at least 10 characters")
    .max(2000, "Answer is too long")
    .trim(),
  referralSource: z
    .string()
    .max(200, "Referral source is too long")
    .trim()
    .optional(),
});

type ApplicationInput = z.infer<typeof applicationBodySchema>;

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

interface ScoringBreakdown {
  /** Points from required fields being present and well-filled. */
  completeness: number;
  /** Points from written answer quality (length, structure). */
  answerQuality: number;
  /** Points from social / portfolio presence. */
  socialPresence: number;
  /** Points from optional enrichment fields. */
  extraEngagement: number;
  /** Final score 0-100. */
  total: number;
}

/**
 * Evaluate an application for quality signals. Returns a score 0-100 based on:
 *
 *   - Completeness of required fields                        (0-25)
 *   - Quality / depth of written answers                     (0-30)
 *   - Social media & portfolio presence                      (0-25)
 *   - Engagement with optional enrichment fields             (0-20)
 *
 * Deterministic — no randomness.
 */
function calculateScore(input: ApplicationInput): ScoringBreakdown {
  // --- Completeness (0-25) -------------------------------------------------
  let completeness = 0;

  // Required fields are guaranteed present by Zod, but we still reward depth.
  // Name length: short names get partial credit, full names get full credit.
  completeness += input.name.length >= 3 ? 10 : 5;

  // City is required — base credit.
  completeness += 5;

  // Phone is optional but valuable.
  if (input.phone) completeness += 5;

  // Role — indicates the applicant thought about their fit.
  if (input.role) completeness += 5;

  completeness = Math.min(completeness, 25);

  // --- Answer quality (0-30) ------------------------------------------------
  let answerQuality = 0;

  // whyJoin is required — measure depth.
  const whyJoinWords = input.whyJoin.split(/\s+/).length;
  if (whyJoinWords >= 50) {
    answerQuality += 20;
  } else if (whyJoinWords >= 30) {
    answerQuality += 15;
  } else if (whyJoinWords >= 15) {
    answerQuality += 10;
  } else {
    // Meets minimum (10 chars) but thin.
    answerQuality += 5;
  }

  // Bonus for structured answers (contain punctuation, not just walls of text).
  const hasSentences = /[.!?]/.test(input.whyJoin);
  if (hasSentences) answerQuality += 5;

  // Has paragraphs or line breaks = thoughtful response.
  const hasStructure = /\n/.test(input.whyJoin);
  if (hasStructure) answerQuality += 5;

  answerQuality = Math.min(answerQuality, 30);

  // --- Social presence (0-25) -----------------------------------------------
  let socialPresence = 0;

  const links = input.socialLinks;
  if (links) {
    const platformCount = [
      links.instagram,
      links.tiktok,
      links.youtube,
      links.website,
      links.linkedin,
    ].filter(Boolean).length;

    // Each linked platform adds points, diminishing returns.
    socialPresence += Math.min(platformCount * 8, 20);
  }

  // Portfolio URL is a strong signal.
  if (input.portfolio) socialPresence += 5;

  socialPresence = Math.min(socialPresence, 25);

  // --- Extra engagement (0-20) ----------------------------------------------
  let extraEngagement = 0;

  // experience field — shows willingness to share background.
  if (input.experience) {
    const expWords = input.experience.split(/\s+/).length;
    extraEngagement += Math.min(Math.floor(expWords / 10) * 2, 10);
  }

  // referralSource — shows they are tracking where they heard about us.
  if (input.referralSource) extraEngagement += 5;

  // Role + portfolio together = serious applicant.
  if (input.role && input.portfolio) extraEngagement += 5;

  extraEngagement = Math.min(extraEngagement, 20);

  // --- Total ----------------------------------------------------------------
  const total = completeness + answerQuality + socialPresence + extraEngagement;

  return { completeness, answerQuality, socialPresence, extraEngagement, total };
}

// ---------------------------------------------------------------------------
// POST handler
// ---------------------------------------------------------------------------

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const parsed = applicationBodySchema.safeParse(body);

    if (!parsed.success) {
      const firstError =
        parsed.error.issues[0]?.message ?? "Invalid input";
      return NextResponse.json(
        { success: false, error: firstError, issues: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const scoring = calculateScore(parsed.data);

    return NextResponse.json(
      {
        success: true,
        data: {
          name: parsed.data.name,
          email: parsed.data.email,
          score: scoring.total,
          breakdown: scoring,
        },
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { success: false, error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
