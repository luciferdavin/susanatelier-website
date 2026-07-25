import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "About — Riya & the makers",
  description:
    "Susan Atelier began with a refusal: that 'pretty' and 'honest' can't sit in the same garment. Meet founder Riya and the named artisans behind every piece.",
  path: "/about",
  keywords: ["Susan Atelier founder", "Riya", "Indian fashion brand story", "artisan collective"],
});

/**
 * About page - Founder story, brand pillars
 * Static content page
 */
export default function AboutPage() {
  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">About</span>
      </nav>

      <section className="about-hero" aria-labelledby="about-title">
        <div className="about-text">
          <p className="eyebrow">About the maker</p>
          <h1 id="about-title">Riya</h1>
          <p className="lede" style={{ marginTop: 'var(--space-5)' }}>
            Susan Atelier began with a simple refusal: that "pretty" and "honest"
            can&apos;t sit in the same garment. I wanted clothes made by named
            hands, from cloth I could name, at a price I could defend.
          </p>
          <p>
            Every collection starts with the embroiderers — Meena, Asha, Farida,
            Sara — not with a trend deck. The botanical motifs are drawn from my
            own garden. The silhouettes are current, never costume. The promise
            is that each piece is meant to be worn for years, not one occasion.
          </p>
        </div>
        <div>
          <Image
            src="/logos/Susan_Atelier_Logo_FullBlock.png"
            alt="Susan Atelier full brand block"
            width={600}
            height={420}
            className="about-logo"
            loading="lazy"
          />
        </div>
      </section>

      <div className="pillars-row" role="list" aria-label="Brand pillars">
        <div className="pillar" role="listitem"><span aria-hidden="true">✿</span> Handmade</div>
        <div className="pillar" role="listitem"><span aria-hidden="true">◈</span> Botanical</div>
        <div className="pillar" role="listitem"><span aria-hidden="true">✕</span> Artisan</div>
        <div className="pillar" role="listitem"><span aria-hidden="true">❀</span> Natural cloth</div>
        <div className="pillar" role="listitem"><span aria-hidden="true">∞</span> Made to last</div>
      </div>

      <div style={{ marginTop: "var(--space-8)", display: "flex", gap: "var(--space-3)", flexWrap: "wrap" }}>
        <Link href="/join" className="btn btn--primary">
          Join the Waitlist
        </Link>
        <Link href="/collection" className="btn btn--outline">
          Browse the Collection
        </Link>
      </div>
    </div>
  );
}