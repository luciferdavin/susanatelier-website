"use client";

import * as React from "react";
import posthog from "posthog-js";
import { CustodianApplication, Tier } from "@/lib/types";

const PRIORITY_OPTIONS = [
  { value: "origin", label: "Origin & traceability (who made it, where, under what conditions)" },
  { value: "longevity", label: "Longevity & durability (will last 20+ years with care)" },
  { value: "aesthetics", label: "Aesthetics & design (silhouette, color, how it looks on me)" },
  { value: "ethics", label: "Ethics & values (brand mission, labor practices)" },
  { value: "value", label: "Price relative to value (cost per wear over lifetime)" },
  { value: "reputation", label: "Brand reputation & status (recognized name, resale value)" },
];

const PRICE_OPTIONS = [
  { value: "willing-to-pay-premium", label: "I'd pay the premium — the data justifies it" },
  { value: "value-conscious", label: "I'd consider it if repair/alteration is included for life" },
  { value: "transparency-seeking", label: "I need to understand the cost breakdown first" },
  { value: "price-driven", label: "That's too much — I'd buy a classic heritage brand" },
];

const LOGO_OPTIONS = [
  { value: "no-logos", label: "I avoid logos entirely — the garment should speak" },
  { value: "subtle", label: "Subtle, tonal branding is fine" },
  { value: "visible", label: "I like recognizable logos — they signal status" },
  { value: "no-preference", label: "No strong preference" },
];

const PRIVACY_OPTIONS = [
  { value: "critical", label: "Critical — I'd pay more for true privacy" },
  { value: "important", label: "Very important — I expect it as baseline" },
  { value: "nice-to-have", label: "Nice to have but not a dealbreaker" },
  { value: "not-important", label: "Don't care — standard marketing is fine" },
];

const BEHAVIOR_OPTIONS = [
  { value: "low-turnover", label: "Buy 1-5 garments/year, Discard 0-1" },
  { value: "moderate", label: "Buy 6-15 garments/year, Discard 2-5" },
  { value: "high-turnover", label: "Buy 16-30 garments/year, Discard 5-15" },
  { value: "very-high", label: "Buy 30+ garments/year, Discard 15+" },
];

const TRUST_OPTIONS = [
  "Published cost breakdowns (materials + labor + margin)",
  "Named artisans with wages shown",
  "Third-party certifications (B Corp, GOTS, Fair Trade)",
  "Founder's personal reputation/track record",
  "Peer recommendations from people I trust",
  "Physical atelier/flagship I can visit",
  "Repair/alteration service included for life",
  "Garment digital passport with full history",
];

const DISCARD_OPTIONS = [
  "Worn out / beyond repair",
  "No longer fits (body changed)",
  "Style no longer suits me",
  "Poor quality (pilling, seams failed, faded)",
  "Emotional detachment / don't love it anymore",
  "Need storage space",
  "Gifted / didn't choose it",
];

const DESIRED_PIECES_LIST = [
  "Wool Coat", "Linen Shirt", "Silk Trousers",
  "Cashmere Sweater", "Cotton Dress", "Leather Belt",
  "Silk Scarf", "Custom Archetype"
];

const FIT_PREFERENCES_LIST = [
  "Close to body (tailored)", "Relaxed / ease of movement",
  "Oversized / layered", "High waist (trousers/skirts)",
  "Natural waist", "Low rise", "Long sleeves (cover wrist)",
  "Cropped sleeves", "Full length (trousers break on shoe)",
  "Ankle length (no break)",
];

const CONTACT_METHODS_LIST = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone / WhatsApp" },
  { value: "post", label: "Post / Letter" },
];

const MEASUREMENT_FIELDS = [
  { name: "chest", label: "Bust/Chest" },
  { name: "waist", label: "Waist" },
  { name: "hips", label: "Hips" },
  { name: "shoulder", label: "Shoulder width" },
  { name: "sleeve", label: "Sleeve length" },
  { name: "inseam", label: "Inseam" },
  { name: "height", label: "Height" },
  { name: "weight", label: "Weight (kg)" },
] as const;

export default function ApplicationForm() {
  const [step, setStep] = React.useState<"values" | "wardrobe" | "sizing" | "contact" | "result">("values");
  const [formData, setFormData] = React.useState<Partial<CustodianApplication>>({
    q2_priorities: [],
    q10_trust_signals: [],
    q12_discard_reasons: [],
    q15_desired_pieces: [],
    q17_fit_preferences: [],
    q16_measurements: {},
    q19_consent: {
      noMarketing: false,
      artisanCouncilReview: false,
      applicationNotPurchase: false,
      privacyPolicy: false
    }
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [result, setResult] = React.useState<{
    score: number;
    tier: Tier;
    inherited: boolean;
    referralCode: string;
    waitlistNumber: string;
  } | null>(null);

  // Field temporary states
  const [q1, setQ1] = React.useState("");
  const [q5, setQ5] = React.useState("");
  const [q6, setQ6] = React.useState("");
  const [q7, setQ7] = React.useState("");
  const [q9, setQ9] = React.useState("");
  const [q13, setQ13] = React.useState("");
  const [q14, setQ14] = React.useState("");
  const [q18_name, setQ18Name] = React.useState("");
  const [q18_email, setQ18Email] = React.useState("");
  const [q18_phone, setQ18Phone] = React.useState("");
  const [q18_contactMethod, setQ18ContactMethod] = React.useState<"email" | "phone" | "post">("email");
  const [q18_location, setQ18Location] = React.useState("");
  const [q20_referral, setQ20Referral] = React.useState("");

  const handleTogglePriority = (value: string) => {
    setFormData(prev => {
      const current = prev.q2_priorities || [];
      if (current.includes(value)) {
        return { ...prev, q2_priorities: current.filter(item => item !== value) };
      } else {
        return { ...prev, q2_priorities: [...current, value] };
      }
    });
  };

  const handleToggleTrust = (value: string) => {
    setFormData(prev => {
      const current = prev.q10_trust_signals || [];
      if (current.includes(value)) {
        return { ...prev, q10_trust_signals: current.filter(item => item !== value) };
      } else {
        return { ...prev, q10_trust_signals: [...current, value] };
      }
    });
  };

  const handleToggleDiscard = (value: string) => {
    setFormData(prev => {
      const current = prev.q12_discard_reasons || [];
      if (current.includes(value)) {
        return { ...prev, q12_discard_reasons: current.filter(item => item !== value) };
      } else {
        return { ...prev, q12_discard_reasons: [...current, value] };
      }
    });
  };

  const handleTogglePiece = (value: string) => {
    setFormData(prev => {
      const current = prev.q15_desired_pieces || [];
      if (current.includes(value)) {
        return { ...prev, q15_desired_pieces: current.filter(item => item !== value) };
      } else {
        return { ...prev, q15_desired_pieces: [...current, value] };
      }
    });
  };

  const handleTogglePreference = (value: string) => {
    setFormData(prev => {
      const current = prev.q17_fit_preferences || [];
      if (current.includes(value)) {
        return { ...prev, q17_fit_preferences: current.filter(item => item !== value) };
      } else {
        return { ...prev, q17_fit_preferences: [...current, value] };
      }
    });
  };

  const handleMeasurementChange = (field: string, val: string) => {
    setFormData(prev => ({
      ...prev,
      q16_measurements: {
        ...prev.q16_measurements,
        [field]: val ? Number(val) : undefined
      }
    }));
  };

  const handleConsentChange = (field: keyof CustodianApplication["q19_consent"]) => {
    setFormData(prev => ({
      ...prev,
      q19_consent: {
        ...prev.q19_consent!,
        [field]: !prev.q19_consent![field]
      }
    }));
  };

  const goToNextStep = (e: React.FormEvent, next: "wardrobe" | "sizing" | "contact") => {
    e.preventDefault();
    setFormData(prev => ({
      ...prev,
      q1_heirloom: q1,
      q5_repair_experience: q5,
      q6_maker_awareness: q6,
      q7_inheritance_intent: q7,
      q9_ideal_relationship: q9,
      q13_philosophy: q13,
      q14_gaps: q14
    }));
    posthog.capture("application_step_completed", {
      completed_step: step,
      next_step: next,
    });
    setStep(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrevStep = (prev: "values" | "wardrobe" | "sizing") => {
    setStep(prev);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const finalApplication: CustodianApplication = {
      ...formData,
      q1_heirloom: q1,
      q5_repair_experience: q5,
      q6_maker_awareness: q6,
      q7_inheritance_intent: q7,
      q9_ideal_relationship: q9,
      q13_philosophy: q13,
      q14_gaps: q14,
      q18_contact: {
        fullName: q18_name,
        email: q18_email,
        phone: q18_phone || undefined,
        preferredContact: q18_contactMethod,
        location: q18_location,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata"
      },
      q20_referralCode: q20_referral || undefined
    } as CustodianApplication;

    try {
      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalApplication)
      });
      const data = await response.json();
      if (data.success) {
        posthog.capture("custodian_application_submitted", {
          tier: data.tier,
          inherited_tier: data.inherited,
          referral_applied: Boolean(q20_referral),
        });
        setResult(data);
        setStep("result");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setError(data.error || "Failed to submit application. Please check your inputs.");
      }
    } catch (err) {
      setError("A connection error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Render Step Progress
  const renderProgress = (current: number) => {
    const totalSteps = 4;
    const pct = (current / totalSteps) * 100;
    return (
      <div className="form-progress-container">
        <div className="form-progress-bar" style={{ width: `${pct}%` }} />
        <div className="form-progress-text">Step {current} of {totalSteps}</div>
      </div>
    );
  };

  if (step === "values") {
    return (
      <div className="form-wrapper">
        {renderProgress(1)}
        <form onSubmit={(e) => goToNextStep(e, "wardrobe")} className="luxury-form">
          <div className="form-header">
            <p className="form-eyebrow">( Phase I ) — Values Alignment</p>
            <h1 className="form-title">Our Shared Alignment</h1>
            <p className="form-subtitle">We do not sell. We converse. Your values shape your standing in our circle.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Q1. The Heirloom Test *</label>
            <span className="form-hint">Describe the oldest garment in your wardrobe. How long have you owned it? Why have you kept it?</span>
            <textarea
              required
              rows={4}
              placeholder="The wool coat passed down from my grandmother... Worn for twenty years, repaired thrice, holds memories."
              value={q1}
              onChange={(e) => setQ1(e.target.value)}
              className="form-textarea"
              minLength={30}
              maxLength={600}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Q2. Purchase Priorities *</label>
            <span className="form-hint">Select what you look for in occasionwear. Click options to select (choose up to 3).</span>
            <div className="chip-grid">
              {PRIORITY_OPTIONS.map(opt => {
                const selectedIndex = (formData.q2_priorities || []).indexOf(opt.value);
                const isSelected = selectedIndex !== -1;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleTogglePriority(opt.value)}
                    className={`chip-btn ${isSelected ? "selected" : ""}`}
                    disabled={!isSelected && (formData.q2_priorities || []).length >= 3}
                  >
                    {isSelected && <span className="chip-badge">{selectedIndex + 1}</span>}
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Q3. Price & Transparency *</label>
            <span className="form-hint">A garment with transparent wage data costs more but pays the artisan fairly. Your perspective:</span>
            <div className="radio-group">
              {PRICE_OPTIONS.map(opt => (
                <label key={opt.value} className="radio-label">
                  <input
                    type="radio"
                    name="q3_price_sensitivity"
                    value={opt.value}
                    checked={formData.q3_price_sensitivity === opt.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, q3_price_sensitivity: e.target.value as any }))}
                    required
                    className="form-radio"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Q4. Branding & Logos *</label>
            <span className="form-hint">How do you prefer branding or logos to appear on your garments?</span>
            <div className="radio-group">
              {LOGO_OPTIONS.map(opt => (
                <label key={opt.value} className="radio-label">
                  <input
                    type="radio"
                    name="q4_logo_philosophy"
                    value={opt.value}
                    checked={formData.q4_logo_philosophy === opt.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, q4_logo_philosophy: e.target.value as any }))}
                    required
                    className="form-radio"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Q5. Repair Experience (Optional)</label>
            <span className="form-hint">Have you ever mended or altered a beloved piece? If so, why?</span>
            <textarea
              rows={3}
              placeholder="Yes, I had the embroidery on a silk dupatta re-secured last autumn..."
              value={q5}
              onChange={(e) => setQ5(e.target.value)}
              className="form-textarea"
              maxLength={400}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Q6. Artisan & Origin Awareness (Optional)</label>
            <span className="form-hint">Does knowing who made your garment influence your relationship with it?</span>
            <textarea
              rows={3}
              placeholder="Yes, knowing a dress was hand-stitched by Farida in Kolkata adds a human connection..."
              value={q6}
              onChange={(e) => setQ6(e.target.value)}
              className="form-textarea"
              maxLength={400}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Q7. Heritage & Inheritance (Optional)</label>
            <span className="form-hint">Do you intend to pass your garments down to others eventually?</span>
            <textarea
              rows={3}
              placeholder="Yes, I select pieces expecting my daughter or nieces to wear them in the future..."
              value={q7}
              onChange={(e) => setQ7(e.target.value)}
              className="form-textarea"
              maxLength={400}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Q8. Data & Privacy Importance *</label>
            <span className="form-hint">How critical is digital privacy and data protection to you?</span>
            <div className="radio-group">
              {PRIVACY_OPTIONS.map(opt => (
                <label key={opt.value} className="radio-label">
                  <input
                    type="radio"
                    name="q8_privacy_importance"
                    value={opt.value}
                    checked={formData.q8_privacy_importance === opt.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, q8_privacy_importance: e.target.value as any }))}
                    required
                    className="form-radio"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Q9. Brand Relationship (Optional)</label>
            <span className="form-hint">What is your ideal relationship with the atelier?</span>
            <textarea
              rows={3}
              placeholder="I prefer an open dialogue with the designers, transparent updates, and lifetime repair options."
              value={q9}
              onChange={(e) => setQ9(e.target.value)}
              className="form-textarea"
              maxLength={400}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Q10. Client Trust Signals</label>
            <span className="form-hint">What establishes trust between you and a premium label? (Select all that apply)</span>
            <div className="chip-grid">
              {TRUST_OPTIONS.map(opt => {
                const isSelected = (formData.q10_trust_signals || []).includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleToggleTrust(opt)}
                    className={`chip-btn ${isSelected ? "selected" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Q11. Annual Wardrobe Activity *</label>
            <span className="form-hint">Which description best fits your typical yearly purchasing and editing behavior?</span>
            <div className="radio-group">
              {BEHAVIOR_OPTIONS.map(opt => (
                <label key={opt.value} className="radio-label">
                  <input
                    type="radio"
                    name="q11_annual_behavior"
                    value={opt.value}
                    checked={formData.q11_annual_behavior === opt.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, q11_annual_behavior: e.target.value as any }))}
                    required
                    className="form-radio"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Q12. Discard Triggers</label>
            <span className="form-hint">What primary reasons prompt you to retired a garment? (Select all that apply)</span>
            <div className="chip-grid">
              {DISCARD_OPTIONS.map(opt => {
                const isSelected = (formData.q12_discard_reasons || []).includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleToggleDiscard(opt)}
                    className={`chip-btn ${isSelected ? "selected" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="form-btn form-btn-primary">
              Continue to Wardrobe Philosophy →
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "wardrobe") {
    return (
      <div className="form-wrapper">
        {renderProgress(2)}
        <form onSubmit={(e) => goToNextStep(e, "sizing")} className="luxury-form">
          <div className="form-header">
            <p className="form-eyebrow">( Phase II ) — Wardrobe Philosophy</p>
            <h1 className="form-title">Your Wardrobe Intent</h1>
            <p className="form-subtitle">We design for longevity. Help us understand how our garments will live in your closet.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Q13. Wardrobe Philosophy Statement *</label>
            <span className="form-hint">Describe your editing approach. Do you buy items to experiment or to hold for generations?</span>
            <textarea
              required
              rows={4}
              placeholder="I build a curated wardrobe focusing on natural fabrics. I avoid trends and look for structured, artisan-made silhouettes."
              value={q13}
              onChange={(e) => setQ13(e.target.value)}
              className="form-textarea"
              minLength={30}
              maxLength={500}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Q14. The Missing Pieces *</label>
            <span className="form-hint">What garments are missing from your wardrobe that you would buy immediately if they existed?</span>
            <textarea
              required
              rows={3}
              placeholder="A mid-length linen shirt with fine dori work, or structured high-waist trousers in silk velvet."
              value={q14}
              onChange={(e) => setQ14(e.target.value)}
              className="form-textarea"
              minLength={20}
              maxLength={400}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Q15. Desired Susan Atelier Archetypes</label>
            <span className="form-hint">Which garment silhouettes are you looking to secure in our Chapter 1 release? (Select all that apply)</span>
            <div className="chip-grid">
              {DESIRED_PIECES_LIST.map(opt => {
                const isSelected = (formData.q15_desired_pieces || []).includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleTogglePiece(opt)}
                    className={`chip-btn ${isSelected ? "selected" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => goToPrevStep("values")} className="form-btn form-btn-secondary">
              ← Back
            </button>
            <button type="submit" className="form-btn form-btn-primary">
              Continue to Size & Fit →
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "sizing") {
    return (
      <div className="form-wrapper">
        {renderProgress(3)}
        <form onSubmit={(e) => goToNextStep(e, "contact")} className="luxury-form">
          <div className="form-header">
            <p className="form-eyebrow">( Phase III ) — Size & Fit</p>
            <h1 className="form-title">Garment Proportions</h1>
            <p className="form-subtitle">Optional details. Let us prepare custom drape metrics for your occasion consultations.</p>
          </div>

          <div className="form-group">
            <label className="form-label">Measurements (in cm)</label>
            <span className="form-hint">Leaving these blank is completely fine. Fill only what is comfortable.</span>
            <div className="form-grid">
              {MEASUREMENT_FIELDS.map(field => (
                <div key={field.name} className="form-col">
                  <label className="form-field-label">{field.label}</label>
                  <input
                    type="number"
                    value={formData.q16_measurements?.[field.name] || ""}
                    onChange={(e) => handleMeasurementChange(field.name, e.target.value)}
                    placeholder="—"
                    className="form-input"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Fit & Silhouette Preferences</label>
            <span className="form-hint">How do you prefer our fabrics to drape against your frame? (Select all that apply)</span>
            <div className="chip-grid">
              {FIT_PREFERENCES_LIST.map(opt => {
                const isSelected = (formData.q17_fit_preferences || []).includes(opt);
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleTogglePreference(opt)}
                    className={`chip-btn ${isSelected ? "selected" : ""}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => goToPrevStep("wardrobe")} className="form-btn form-btn-secondary">
              ← Back
            </button>
            <button type="submit" className="form-btn form-btn-primary">
              Continue to Contact Details →
            </button>
          </div>
        </form>
      </div>
    );
  }

  if (step === "contact") {
    return (
      <div className="form-wrapper">
        {renderProgress(4)}
        <form onSubmit={handleSubmit} className="luxury-form">
          <div className="form-header">
            <p className="form-eyebrow">( Phase IV ) — Identity & Consent</p>
            <h1 className="form-title">Contact & Consent</h1>
            <p className="form-subtitle">Final step. Your details are secure. We only contact you regarding updates and drops.</p>
          </div>

          {error && <div className="form-error-banner" role="alert">✕ {error}</div>}

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input
              type="text"
              required
              placeholder="Riya Sen"
              value={q18_name}
              onChange={(e) => setQ18Name(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input
              type="email"
              required
              placeholder="riya@example.com"
              value={q18_email}
              onChange={(e) => setQ18Email(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Preferred Contact Channel *</label>
            <select
              value={q18_contactMethod}
              onChange={(e) => setQ18ContactMethod(e.target.value as any)}
              className="form-select"
            >
              {CONTACT_METHODS_LIST.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Phone / WhatsApp Number</label>
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={q18_phone}
              onChange={(e) => setQ18Phone(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current City & Country *</label>
            <input
              type="text"
              required
              placeholder="Delhi, India"
              value={q18_location}
              onChange={(e) => setQ18Location(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Referral Code (Optional)</label>
            <span className="form-hint">Enter your referral code if invited by an existing Custodian (format: CST-YYYY-XXXX).</span>
            <input
              type="text"
              placeholder="CST-2026-A1B2"
              pattern="^CST-\d{4}-[A-Z0-9]{4}$"
              value={q20_referral}
              onChange={(e) => setQ20Referral(e.target.value.toUpperCase())}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">The Form Promise & Consent *</label>
            <span className="form-hint">Please agree to our privacy parameters before joining the waitlist.</span>
            <div className="checkbox-list">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                  checked={formData.q19_consent?.noMarketing}
                  onChange={() => handleConsentChange("noMarketing")}
                  className="form-checkbox"
                />
                <span>I understand Susan Atelier does not send newsletter spam. I will only receive transactional updates and Chapter drop notifications.</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                  checked={formData.q19_consent?.artisanCouncilReview}
                  onChange={() => handleConsentChange("artisanCouncilReview")}
                  className="form-checkbox"
                />
                <span>I consent to my values answers being reviewed for waitlist prioritization.</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                  checked={formData.q19_consent?.applicationNotPurchase}
                  onChange={() => handleConsentChange("applicationNotPurchase")}
                  className="form-checkbox"
                />
                <span>I understand this is an application. Acceptance grants early access; it does not guarantee garment reservation.</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  required
                  checked={formData.q19_consent?.privacyPolicy}
                  onChange={() => handleConsentChange("privacyPolicy")}
                  className="form-checkbox"
                />
                <span>I have read and accepted the plain-language Privacy Policy.</span>
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => goToPrevStep("sizing")} className="form-btn form-btn-secondary" disabled={loading}>
              ← Back
            </button>
            <button type="submit" className="form-btn form-btn-primary" disabled={loading}>
              {loading ? "Processing Application..." : "Submit Custodian Application"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Result / Success Screen
  if (step === "result" && result) {
    const tierLabels: Record<Tier, string> = {
      founding: "Founding Custodian",
      custodian: "Custodian",
      observer: "Observer"
    };

    return (
      <div className="result-wrapper">
        <div className="result-card">
          <div className="result-seal-container">
            <svg viewBox="0 0 100 100" className="result-seal-svg">
              {/* Custom Seal Outline */}
              <circle cx="50" cy="50" r="45" stroke="#8A6324" strokeWidth="1.5" fill="none" />
              <path d="M50 15 L50 85 M15 50 L85 50" stroke="#8A6324" strokeWidth="0.5" strokeDasharray="3 3" />
              <text x="50" y="54" textAnchor="middle" fill="#3B2412" fontSize="12" fontWeight="600" letterSpacing="1">SA</text>
            </svg>
          </div>

          <div className="result-header">
            <span className="result-badge">Registration Confirmed</span>
            <h1 className="result-title">Welcome to the Circle</h1>
            <p className="result-salutation">Dear {q18_name},</p>
            <p className="result-desc">
              Your application has been received and scored by our deterministic values engine.
              We are honored to confirm your status in our collective:
            </p>
          </div>

          <div className="result-tier-box">
            <span className="result-tier-label">ASSIGNED STATUS</span>
            <h2 className={`result-tier-value ${result.tier}`}>{tierLabels[result.tier]}</h2>
            <p className="result-tier-details">Score: {result.score}/100 {result.inherited ? "(Tier inherited from referral invitation)" : ""}</p>
          </div>

          <div className="result-details-grid">
            <div className="result-detail-item">
              <span className="detail-lbl">WAITLIST ID</span>
              <span className="detail-val">{result.waitlistNumber}</span>
            </div>
            <div className="result-detail-item">
              <span className="detail-lbl">PERMANENT REFERRAL CODE</span>
              <span className="detail-val">{result.referralCode}</span>
            </div>
          </div>

          <div className="result-letter-body">
            <p>
              Your waitlist sequence guarantees you priority access for our upcoming <strong>Chapter 1: Occasionwear</strong> release. 
              If your status is <em>Founding Custodian</em> or <em>Custodian</em>, you will receive email/SMS invitations to book a measurements check and drape preview 24 hours before the public drop.
            </p>
            <p className="result-note">
              Share your permanent referral code with colleagues. If an invited member registers and matches your tier alignment, they will inherit your standing in the circle, and you will secure points towards bespoke customization.
            </p>
          </div>

          <div className="result-signature">
            <p className="sig-text">Sincerely,</p>
            <p className="sig-script">Riya</p>
            <p className="sig-sub">Founder, Susan Atelier</p>
          </div>

          <div className="result-actions">
            <a href="/" className="form-btn form-btn-primary">Return to Homepage</a>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
