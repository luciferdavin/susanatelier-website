import Link from "next/link";
import Image from "next/image";

/**
 * Footer component - static server component
 * No client-side interactivity needed
 */

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="/" className="footer-logo-link" aria-label="Susan Atelier home">
              <Image
                src="/logos/trans/Susan_Atelier_Logo_WordmarkLockup-trans.png"
                alt=""
                width={240}
                height={60}
                className="footer-logo"
              />
            </Link>
            <p className="footer-note">
              Made by named hands, worn for years — made by hand in India.
            </p>
          </div>

          <div className="footer-cols">
            <div>
              <h4 className="footer-h">Explore</h4>
              <Link href="/collection">Collection</Link>
              <Link href="/craft">Our Craft</Link>
              <Link href="/fit">Size & Fit</Link>
              <Link href="/about">About</Link>
            </div>

            <div>
              <h4 className="footer-h">Get early access</h4>
              <Link href="/join">Join the Waitlist</Link>
              <Link href="/join">24 hours of early access</Link>
            </div>
          </div>
        </div>

        <p className="legal">
          Made in India · Artisan wages transparent · Genuine MRP, no fake
          discounts · GST as applicable (5% below ₹2,500, 18% above) ·{" "}
          <span className="copyright">© Susan Atelier</span>
        </p>
      </div>
    </footer>
  );
}