import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Our Craft — made by named hands",
  description:
    "How Susan Atelier works: the maker, the cloth, and the math — shown, not asserted. Meet the artisans behind every piece.",
  path: "/craft",
  keywords: [
    "artisan fashion India",
    "hand embroidery",
    "transparent pricing fashion",
    "slow fashion",
  ],
});

/**
 * Craft page - Our Craft, The Maker, The Cloth, The Math
 * Static content page
 */
export default function CraftPage() {
  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Our Craft</span>
      </nav>

      <section className="wrap" style={{ paddingTop: "var(--space-6)" }} aria-labelledby="craft-title">
        <p className="eyebrow">Our Craft</p>
        <h1 id="craft-title">Made by named hands, not machines</h1>
        <p className="lede">
          "Artisan-made" means nothing if it stays a slogan. So we show you the
          maker, the cloth, and the math — on every piece.
        </p>

        <div className="story-grid">
          <article className="story-card">
            <h3>The Maker</h3>
            <p>
              A short film of the embroiderer at work — name on screen, fair-pay
              noted. You&apos;ll meet Meena in Lucknow, Asha in Jaipur, Farida in
              Kolkata, Sara in Mumbai.
            </p>
          </article>
          <article className="story-card">
            <h3>The Cloth</h3>
            <p>
              Linen, cotton, and silk — breathable, natural, chosen to last. We
              name the fibre on every label because fabric is the difference
              between a year and a season.
            </p>
          </article>
          <article className="story-card">
            <h3>The Math</h3>
            <p>
              A transparency card per piece: fabric + embroidery + stitching =
              cost, then MRP. No fake "was ₹X" strikethroughs — just an honest
              number.
            </p>
          </article>
        </div>

        <div className="split">
          <div>
            <h3 style={{ color: "var(--accent)" }}>Why we show, not assert</h3>
            <p>
              Nearly every Indian label claims "premium, artisan, fair-pay."
              That claim is now saturated — it means little on its own. What&apos;s
              rare is proof: a face, a wage, a fabric you can name. That&apos;s
              the whole brand.
            </p>
            <Link href="/collection" className="btn btn--outline">
              See the pieces →
            </Link>
          </div>
          <div>
            <Image
              src="/logos/Susan_Atelier_IconStrip.png"
              alt="Five brand pillars: Handmade, Botanical, Artisan, Natural cloth, Made to last"
              width={520}
              height={120}
              className="icon-strip"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}