import Link from "next/link";
import Image from "next/image";
import { DividerIcon } from "@/components/icons/BrandIcons";

/**
 * Footer — dark brand lockup + promise/explore/care columns.
 * Server component; no interactivity.
 */

export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="lockup on-dark foot-lockup">
          <Image
            src="/logos/trans/Susan_Atelier_Logo_Monogram-trans.png"
            alt="Susan Atelier monogram"
            width={168}
            height={168}
            className="lk-mono"
          />
          <div className="lk-word">Susan Atelier</div>
          <div className="lk-script">by Riya</div>
          <DividerIcon className="lk-div" />
          <div className="lk-tag">Timeless. Feminine. Refined.</div>
        </div>

        <div className="foot-grid">
          <div>
            <h5>The promise</h5>
            <p className="foot-blurb">
              Made by named hands, worn for years — not seasons. Contemporary
              Indian occasion wear, hand-embroidered in Lucknow, Jaipur,
              Kolkata &amp; Mumbai.
            </p>
          </div>
          <div>
            <h5>Explore</h5>
            <Link href="/collection">The Collection</Link>
            <Link href="/#craft">Our Craft</Link>
            <Link href="/#fit">Size &amp; Fit</Link>
            <Link href="/#about">About Riya</Link>
          </div>
          <div>
            <h5>Care</h5>
            <Link href="/#join">Join the Waitlist</Link>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}
              target="_blank"
              rel="noopener"
            >
              WhatsApp the Atelier
            </a>
            <Link href="/#fit">Free Size Exchange</Link>
            <Link href="/#why">The Transparency Card</Link>
          </div>
        </div>

        <div className="foot-bottom">
          <span>
            © 2026 Susan Atelier by Riya <i>✦</i> Made by named hands in India
          </span>
          <span>
            Genuine MRP <i>—</i> no fake discounts, ever
          </span>
        </div>
      </div>
    </footer>
  );
}
