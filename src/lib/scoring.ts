import { CustodianApplication, Tier } from "@/lib/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function calculateQualityScore(app: Record<string, any>): number {
  const scores = {
    valuesAlignment: scoreValuesAlignment(app),
    wardrobeIntent: scoreWardrobeIntent(app),
    makerEmpathy: scoreMakerEmpathy(app),
    privacyAlignment: scorePrivacyAlignment(app),
    inheritanceMindset: scoreInheritanceMindset(app),
    purchaseBehavior: scorePurchaseBehavior(app),
    preparationBonus: scorePreparationBonus(app),
  };

  const weightedScore = 
    scores.valuesAlignment * 0.35 +
    scores.wardrobeIntent * 0.20 +
    scores.makerEmpathy * 0.20 +
    scores.privacyAlignment * 0.10 +
    scores.inheritanceMindset * 0.10 +
    scores.purchaseBehavior * 0.05;

  const bonus = scores.preparationBonus;
  
  return Math.min(100, Math.round(weightedScore + bonus));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreValuesAlignment(app: any): number {
  let score = 0;

  const q1 = app.q1_heirloom?.toLowerCase() || "";
  if (q1.includes("repair") || q1.includes("inherit") || q1.includes("emotional") || q1.includes("material") || q1.includes("quality")) score += 8;
  if (q1.includes("fast fashion") || q1.includes("don't have") || q1.includes("trend")) score -= 5;

  const q2 = app.q2_priorities?.slice(0, 3) || [];
  const highValue = ["origin", "longevity", "ethics"];
  highValue.forEach(hv => q2.includes(hv) && (score += 3));

  const q3Scores: Record<string, number> = { "willing-to-pay-premium": 10, "value-conscious": 7, "transparency-seeking": 5, "price-driven": 0 };
  score += q3Scores[app.q3_price_sensitivity] || 0;

  const q4Scores: Record<string, number> = { "no-logos": 10, subtle: 6, "no-preference": 3, visible: 0 };
  score += q4Scores[app.q4_logo_philosophy as keyof typeof q4Scores] || 0;

  const q5 = app.q5_repair_experience?.toLowerCase() || "";
  if (q5.includes("worth") || q5.includes("value") || q5.includes("emotional")) score += 8;
  else if (q5.includes("never") || q5.includes("not worth")) score -= 3;

  const q6 = app.q6_maker_awareness?.toLowerCase() || "";
  if (q6.includes("changed") || q6.includes("decision") || q6.includes("specific")) score += 8;
  else if (q6.includes("never") || q6.includes("abstract")) score += 3;

  const q7 = app.q7_inheritance_intent?.toLowerCase() || "";
  if (q7.includes("specific") && (q7.includes("material") || q7.includes("memory") || q7.includes("craft"))) score += 10;
  else if (q7.includes("maybe") || q7.includes("vague")) score += 4;

  const q8Scores: Record<string, number> = { critical: 10, important: 7, "nice-to-have": 3, "not-important": 0 };
  score += q8Scores[app.q8_privacy_importance] || 0;

  const q9 = app.q9_ideal_relationship?.toLowerCase() || "";
  if (q9.includes("repair") || q9.includes("alteration") || q9.includes("inheritance") || q9.includes("community") || q9.includes("transparency") || q9.includes("education")) score += 8;

  const trustCount = app.q10_trust_signals?.length || 0;
  score += Math.min(10, trustCount * 1.25);

  const q11Scores: Record<string, number> = { "low-turnover": 10, moderate: 5, "high-turnover": 1, "very-high": 0 };
  score += q11Scores[app.q11_annual_behavior] || 0;

  const discard = app.q12_discard_reasons || [];
  if (discard.includes("Worn out") && discard.includes("No longer fits")) score += 3;
  if (discard.includes("Poor quality") || discard.includes("Style changed")) score -= 3;
  if (discard.includes("don't love")) score -= 2;

  return Math.max(0, Math.min(100, score));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreWardrobeIntent(app: any): number {
  let score = 0;
  
  const q13 = app.q13_philosophy?.toLowerCase() || "";
  if (q13.includes("intentional") || q13.includes("curatorial") || q13.includes("repair")) score += 10;
  else if (q13.includes("trend") || q13.includes("volume")) score -= 5;

  const q14 = app.q14_gaps?.toLowerCase() || "";
  if (q14.includes("coat") || q14.includes("trousers") || q14.includes("shirt") || q14.includes("timeless")) score += 10;

  const desiredCount = app.q15_desired_pieces?.length || 0;
  score += Math.min(10, desiredCount * 2);
  if (app.q15_desired_pieces?.some((p: string) => p.toLowerCase().includes("custom"))) score += 2;

  return Math.min(30, score);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreMakerEmpathy(app: any): number {
  let score = 0;

  const q5 = app.q5_repair_experience?.toLowerCase() || "";
  if (q5.includes("worth") || q5.includes("value") || q5.includes("emotional")) score += 10;

  const q6 = app.q6_maker_awareness?.toLowerCase() || "";
  if (q6.includes("changed") || q6.includes("decision")) score += 10;

  const q7 = app.q7_inheritance_intent?.toLowerCase() || "";
  if (q7.includes("specific") && (q7.includes("material") || q7.includes("memory") || q7.includes("craft"))) score += 10;

  const trustCount = app.q10_trust_signals?.length || 0;
  score += Math.min(10, trustCount * 1.25);

  return Math.min(40, score);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scorePrivacyAlignment(app: any): number {
  let score = 0;

  const q8Scores: Record<string, number> = { critical: 10, important: 7, "nice-to-have": 3, "not-important": 0 };
  score += q8Scores[app.q8_privacy_importance as keyof typeof q8Scores] || 0;

  const consent = app.q19_consent;
  if (consent?.noMarketing && consent?.artisanCouncilReview && consent?.applicationNotPurchase && consent?.privacyPolicy) {
    score += 10;
  }

  return Math.min(20, score);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scoreInheritanceMindset(app: any): number {
  let score = 0;

  const q7 = app.q7_inheritance_intent?.toLowerCase() || "";
  if (q7.includes("specific") && (q7.includes("material") || q7.includes("memory") || q7.includes("craft"))) score += 10;
  else if (q7.includes("maybe") || q7.includes("vague")) score += 4;

  const q9 = app.q9_ideal_relationship?.toLowerCase() || "";
  if (q9.includes("repair") || q9.includes("alteration") || q9.includes("inheritance") || q9.includes("community") || q9.includes("transparency") || q9.includes("education")) score += 10;

  return Math.min(20, score);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scorePurchaseBehavior(app: any): number {
  let score = 0;

  const q11Scores: Record<string, number> = { "low-turnover": 10, moderate: 5, "high-turnover": 1, "very-high": 0 };
  score += q11Scores[app.q11_annual_behavior] || 0;

  const discard = app.q12_discard_reasons || [];
  if (discard.includes("Worn out") && discard.includes("No longer fits")) score += 3;
  if (discard.includes("Poor quality") || discard.includes("Style changed")) score -= 3;
  if (discard.includes("don't love")) score -= 2;

  return Math.max(0, Math.min(20, score));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function scorePreparationBonus(app: any): number {
  let bonus = 0;

  const measurements = app.q16_measurements || {};
  const filled = Object.values(measurements).filter(v => v != null).length;
  bonus += Math.min(8, filled);

  const fitPrefs = app.q17_fit_preferences?.length || 0;
  bonus += Math.min(5, fitPrefs * 0.5);

  if (app.q20_referralCode && /^CST-\d{4}-\d{4}$/.test(app.q20_referralCode)) {
    bonus += 5;
  }

  return Math.min(13, bonus);
}

export function assignTier(score: number): { tier: "founding" | "custodian" | "observer"; inherited: boolean } {
  if (score >= 80) return { tier: "founding", inherited: false };
  if (score >= 60) return { tier: "custodian", inherited: false };
  return { tier: "observer", inherited: false };
}

export function applyTierInheritance(score: number, referrerTier: "founding" | "custodian" | "observer"): { tier: "founding" | "custodian" | "observer"; inherited: boolean } {
  const earned = score >= 80 ? "founding" : score >= 60 ? "custodian" : "observer";
  
  const referrerThreshold = { founding: 80, custodian: 60, observer: 0 }[referrerTier];
  
  if (score >= referrerThreshold) {
    return { tier: referrerTier, inherited: true };
  }
  
  return { tier: earned, inherited: false };
}
