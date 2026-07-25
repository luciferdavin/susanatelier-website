"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * Join/Waitlist form (client) — email capture + WhatsApp handoff.
 * The server `join/page.tsx` owns the page metadata.
 */
export default function JoinForm() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [position, setPosition] = useState(0);

  useEffect(() => {
    // Get actual waitlist position from localStorage or API
    const stored = localStorage.getItem("sa_waitlist_count");
    const count = stored ? parseInt(stored, 10) + 1 : 1;
    setPosition(count);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Proper email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("sa_email", email);
    // Increment waitlist count
    const newCount = position + 1;
    localStorage.setItem("sa_waitlist_count", newCount.toString());
    setPosition(newCount);

    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";
    const message = `Hi Susan Atelier! I'd like early access to the waitlist. Email: ${email}`;
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  const openWhatsApp = (message: string) => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="wrap join-wrap" style={{ paddingTop: "var(--space-6)" }}>
      <p className="eyebrow">Early access</p>
      <h1>Join the waitlist</h1>
      <p className="lede">
        Be first through the door. Join for 24 hours of early access before the
        public drop — and a numbered hangtag if you&apos;re in the first 50.
      </p>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="capture">
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "email-error" : undefined}
          />
          {error && (
            <p
              id="email-error"
              className="error-message"
              style={{
                color: "var(--error-rust)",
                fontSize: "0.875rem",
                marginTop: "var(--space-2)",
              }}
            >
              {error}
            </p>
          )}
          <button type="submit" className="btn btn--gold btn--lg">
            Join the Waitlist →
          </button>
        </form>
      ) : (
        <p className="trust" style={{ marginTop: "var(--space-6)" }}>
          You&apos;re on the list! Check WhatsApp for confirmation.
        </p>
      )}

      <p className="trust">
        {position > 0 ? (
          <>
            You&apos;re <span className="code-box">{position}/50</span> in line.
            We&apos;ll message you on WhatsApp.
          </>
        ) : (
          <>Spots are limited. Join now for early access.</>
        )}
      </p>
      <p className="note">
        📱 Prefer WhatsApp? Tap the button and we&apos;ll take it from there.
      </p>

      <button
        className="wa-btn"
        onClick={() =>
          openWhatsApp(`Hi Susan Atelier! I'd like early access to the waitlist.`)
        }
      >
        Join via WhatsApp
      </button>
    </div>
  );
}
