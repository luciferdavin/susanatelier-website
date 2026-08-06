"use client";

import Link from "next/link";
import Image from "next/image";
import { DividerIcon } from "@/components/icons/BrandIcons";

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "PLACEHOLDER_REPLACE_ME";

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="foot-inner">
          {/* Brand Column */}
          <div className="foot-brand">
            <div className="foot-lockup">
              <Image
                src="/logos/trans/Susan_Atelier_Logo_Monogram-trans.png"
                alt="Susan Atelier monogram"
                width={96}
                height={96}
                className="lk-mono"
              />
              <div className="lk-wordmark-container">
                <Image
                  src="/logos/trans/Susan_Atelier_Logo_WordmarkLockup-trans.png"
                  alt="Susan Atelier by Riya"
                  width={200}
                  height={51}
                  className="lk-wordmark"
                />
              </div>
              <DividerIcon className="lk-div" />
              <div className="lk-tag">Timeless. Feminine. Refined.</div>
            </div>
            <p className="foot-line">
              Made by hand in India. Every garment tells you who made it.
            </p>
          </div>

          {/* Links Nav Columns */}
          <nav className="foot-nav" aria-label="Footer Navigation">
            {/* Explore Column */}
            <details open className="foot-col">
              <summary className="foot-col-head">Explore</summary>
              <ul className="foot-col-list">
                <li>
                  <Link href="/collection">The Collection</Link>
                </li>
                <li>
                  <Link href="/#craft">Our Craft</Link>
                </li>
                <li>
                  <Link href="/#fit">Size &amp; Fit</Link>
                </li>
                <li>
                  <Link href="/#about">About Riya</Link>
                </li>
              </ul>
            </details>

            {/* Care Column */}
            <details open className="foot-col">
              <summary className="foot-col-head">Care</summary>
              <ul className="foot-col-list">
                <li>
                  <Link href="/apply">Join the Waitlist</Link>
                </li>
                <li>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    WhatsApp the Atelier
                  </a>
                </li>
                <li>
                  <Link href="/#fit">Free Size Exchange</Link>
                </li>
                <li>
                  <Link href="/#why">The Transparency Card</Link>
                </li>
              </ul>
            </details>
          </nav>

          {/* Newsletter Column */}
          <div className="foot-news">
            <form className="foot-news-form" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="fn-email" className="foot-news-lbl">
                Letters from the Atelier
              </label>
              <p className="foot-news-desc">Quarterly updates on our craft and collections. No marketing spam.</p>
              <div className="foot-news-field">
                <input
                  id="fn-email"
                  type="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  required
                  className="foot-news-input"
                />
                <button type="submit" className="form-btn form-btn-primary foot-news-btn">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Legal Bottom Bar */}
        <div className="foot-bottom">
          <p className="foot-legal-text">
            © 2026 Susan Atelier · <Link href="/privacy">privacy</Link> · <Link href="/terms">terms</Link>
          </p>
          <p className="foot-transparency-text">
            Made by hand in India · Artisan wages transparent · Genuine MRP, no fake discounts
          </p>
        </div>
      </div>
    </footer>
  );
}
