export interface CustodianApplication {
  // Step 1: Values Alignment
  q1_heirloom: string;
  q2_priorities: string[]; // ranked
  q3_price_sensitivity: "willing-to-pay-premium" | "value-conscious" | "transparency-seeking" | "price-driven";
  q4_logo_philosophy: "no-logos" | "subtle" | "visible" | "no-preference";
  q5_repair_experience: string;
  q6_maker_awareness: string;
  q7_inheritance_intent: string;
  q8_privacy_importance: "critical" | "important" | "nice-to-have" | "not-important";
  q9_ideal_relationship: string;
  q10_trust_signals: string[];
  q11_annual_behavior: "low-turnover" | "moderate" | "high-turnover" | "very-high";
  q12_discard_reasons: string[];

  // Step 2: Wardrobe Philosophy
  q13_philosophy: string;
  q14_gaps: string;
  q15_desired_pieces: string[];

  // Step 3: Sizing
  q16_measurements: {
    chest?: number;
    waist?: number;
    hips?: number;
    shoulder?: number;
    sleeve?: number;
    inseam?: number;
    height?: number;
    weight?: number;
  };
  q17_fit_preferences: string[];

  // Step 4: Contact & Consent
  q18_contact: {
    email: string;
    fullName: string;
    preferredContact: "email" | "phone" | "post";
    phone?: string;
    location: string;
    timezone: string;
  };
  q19_consent: {
    noMarketing: boolean;
    artisanCouncilReview: boolean;
    applicationNotPurchase: boolean;
    privacyPolicy: boolean;
  };
  q20_referralCode?: string;

  // Scoring & Result
  qualityScore?: number;
  tier?: "founding" | "custodian" | "observer";
  tierInherited?: boolean;
  referralCode?: string;
  referredBy?: string;
  loyaltyPoints?: number;
  submittedAt?: string;
}

export type Tier = "founding" | "custodian" | "observer";

export interface TierThresholds {
  founding: { minScore: 80; label: "Founding Custodian"; color: "gold"; }
  custodian: { minScore: 60; label: "Custodian"; color: "charcoal"; }
  observer: { minScore: 0; label: "Observer"; color: "taupe"; }
}

export const TIER_THRESHOLDS: TierThresholds = {
  founding: { minScore: 80, label: "Founding Custodian", color: "gold" },
  custodian: { minScore: 60, label: "Custodian", color: "charcoal" },
  observer: { minScore: 0, label: "Observer", color: "taupe" },
};

export interface ReferralEvent {
  id: string;
  referrerId: string;
  refereeId?: string;
  eventType: "link_click" | "application_start" | "application_submit" | "accepted" | "declined";
  channel: "email" | "link" | "social" | "direct";
  refereeTierEarned?: Tier;
  refereeTierInherited?: boolean;
  referrerPointsAwarded: number;
  timestamp: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

export interface LoyaltyEvent {
  action: string;
  points: number;
  refereeId?: string;
  refereeTier?: string;
  garmentId?: string;
  timestamp: string;
}

export interface ReferralStats {
  totalReferrals: number;
  acceptedReferrals: number;
  conversionRate: number;
  viralCoefficient: number;
  tierInheritanceRate: number;
  totalPoints: number;
  tierInherited: number;
}
