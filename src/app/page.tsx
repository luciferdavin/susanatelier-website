import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/schemas";
import { PRODUCTS } from "@/lib/products";
import { HeroEmailForm } from "@/components/HeroEmailForm";
import JsonLd from "@/components/JsonLd";

/**
 * Home page - Hero, features, brand statement, CTA
 * Static content page with structured data
 */

export const metadata: Metadata = {
  title: "Made by named hands, worn for years",
  description:
    "Susan Atelier — contemporary Indian occasion wear made by named hands. 17-piece launch collection featuring co-ords, occasionwear, and separates. Join the waitlist for early access.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();

  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={webSiteSchema} />
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <Image
              src="/logos/trans/Susan_Atelier_Logo_WordmarkLockup-trans.png"
              alt=""
              width={300}
              height={80}
              className="hero-wordmark"
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
            <h1 id="hero-title">
              Made by named hands.<br />
              Worn for years — made by hand in India.
            </h1>
            <p className="lede">
              Contemporary Indian occasion wear, made by named hands — for the
              woman who&apos;d rather wear one real thing than ten forgettable
              ones.
            </p>
            <HeroEmailForm />
            <p className="trust">
              First 50 receive a numbered hangtag (1/50) · Free size exchange ·
              Genuine MRP, no fake discounts
            </p>
          </div>
          <div className="hero-art">
            <Image
              src="/images/hero-model.png"
              alt="Susan Atelier piece worn by a real woman"
              width={500}
              height={600}
              priority
              className="hero-image"
              style={{ width: 'auto', height: 'auto' }}
            />
          </div>
        </div>

        <div className="pillar-strip wrap" role="list" aria-label="Brand pillars">
          <div className="pillar" role="listitem"><span>✿</span> Handmade</div>
          <div className="pillar" role="listitem"><span>◈</span> Botanical</div>
          <div className="pillar" role="listitem"><span>✕</span> Artisan</div>
          <div className="pillar" role="listitem"><span>❀</span> Natural cloth</div>
          <div className="pillar" role="listitem"><span>∞</span> Made to last</div>
        </div>
      </section>

      <section className="cta-bar" aria-labelledby="cta-title">
        <div className="wrap cta-row">
          <Link href="/join" className="btn btn--gold btn--lg">
            Join the Waitlist
          </Link>
          <Link href="/collection" className="btn btn--outline btn--lg">
            Browse the Collection
          </Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: "var(--space-6)" }} aria-labelledby="why-title">
        <p className="eyebrow">Why Susan Atelier</p>
        <h2 id="why-title">Made by named hands, not machines</h2>
        <p className="lede">
          Every piece carries the name of the artisan who embroidered it. We
          show you who, what, and what they earned — because "artisan-made"
          means nothing if it stays a slogan.
        </p>
        <div className="feature-grid">
          <article className="feature-card">
            <h3>The Maker</h3>
            <p>
              A short film of the embroiderer at work — name on screen, fair-pay
              noted. Proof, not a promise.
            </p>
          </article>
          <article className="feature-card">
            <h3>The Cloth</h3>
            <p>
              Linen, cotton, and silk — breathable, natural, chosen to last. We
              name the fibre on every label.
            </p>
          </article>
          <article className="feature-card">
            <h3>The Math</h3>
            <p>
              A transparency card per piece: fabric + embroidery + stitching =
              cost, then MRP. Always honest.
            </p>
          </article>
        </div>
      </section>

      <section className="statement" aria-labelledby="statement-title" style={{ marginTop: 'var(--space-12)' }}>
        <div className="wrap">
          <div className="statement-logo">
            <Image
              src="/logos/trans/Susan_Atelier_Favicon_512-trans.png"
              alt="Susan Atelier SA monogram"
              width={84}
              height={84}
              priority
            />
          </div>
          <p className="statement-tag" id="statement-title">
            Made by named hands. <span className="em">Worn for years — made by hand in India.</span>
          </p>
        </div>
      </section>
    </>
  );
}