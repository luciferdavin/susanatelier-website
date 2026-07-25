"use client";

import { useState } from "react";

/**
 * Hero email capture form - Client component for interactivity
 * Used by Home page
 * No external API calls
 */

export function HeroEmailForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Enter a valid email");
      return;
    }

    localStorage.setItem("sa_email", email);
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";
    const message = `Hi Susan Atelier! I'd like early access to the waitlist. Email: ${email}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <form className="capture" onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="heroEmail"
        placeholder="Your email"
        aria-label="Email"
        required
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? "hero-email-error" : undefined}
      />
      <button className="btn btn--primary" type="submit">
        Join the Waitlist →
      </button>
      {error && (
        <p id="hero-email-error" className="error-message" style={{ color: "var(--error-rust)", fontSize: "0.875rem", marginTop: "var(--space-2)" }}>
          {error}
        </p>
      )}
    </form>
  );
}