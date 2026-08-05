/**
 * Structured Data (JSON-LD) generators for SEO.
 *
 * Every builder returns a fully-typed object. The loose `any` shapes from the
 * original implementation have been replaced with explicit types and the
 * shared `Product` domain type, so pages can no longer pass malformed data to
 * the `<JsonLd>` renderer.
 *
 * All absolute URLs are derived from the canonical site origin via
 * `buildUrl()` so the site re-points correctly when NEXT_PUBLIC_SITE_URL is set.
 */

import { buildUrl } from "@/lib/site";
import type { Product } from "@/lib/products";

// ---------------------------------------------------------------------------
// Shared types
// ---------------------------------------------------------------------------

/** A minimal, reusable JSON-LD node with the schema.org @context. */
export interface JsonLdBase {
  "@context": "https://schema.org";
  "@type": string;
}

export interface BrandReference {
  "@type": "Brand";
  name: string;
}

export interface OrganizationReference {
  "@type": "Organization";
  name: string;
}

// ---------------------------------------------------------------------------
// Organization
// ---------------------------------------------------------------------------

export interface OrganizationSchema extends JsonLdBase {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string;
  foundingDate: string;
  founder: { "@type": "Person"; name: string };
  sameAs: string[];
  address: { "@type": "PostalAddress"; addressCountry: string };
}

/**
 * Organization schema for Susan Atelier.
 * Honest representation: no fake reviews, ratings, or aggregate ratings.
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Susan Atelier",
    url: buildUrl("/"),
    logo: buildUrl("/logos/trans/Susan_Atelier_Logo_WordmarkLockup-trans.png"),
    foundingDate: "2026",
    founder: {
      "@type": "Person",
      name: "Riya",
    },
    sameAs: [
      "https://instagram.com/susanatelier",
      `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "PLACEHOLDER_REPLACE_ME"}`,
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
  };
}

// ---------------------------------------------------------------------------
// WebSite (+ SearchAction)
// ---------------------------------------------------------------------------

export interface WebSiteSchema extends JsonLdBase {
  "@type": "WebSite";
  name: string;
  url: string;
}

/**
 * WebSite schema. SearchAction removed — collection filtering is client-only
 * and non-functional for crawlers. Keep honest: no broken promises.
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Susan Atelier",
    url: buildUrl("/"),
  };
}

// ---------------------------------------------------------------------------
// Product
// ---------------------------------------------------------------------------

export interface ProductSchema extends JsonLdBase {
  "@type": "Product";
  name: string;
  description: string;
  sku: string;
  brand: BrandReference;
  image: string;
  category?: string;
  offers: {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    price: number;
    availability: string;
    seller: OrganizationReference;
  };
}

/**
 * Maps a domain `Product` into a schema.org Product node.
 * Availability is taken from the canonical schemas.org InStock constant so it
 * validates against Google's rich-result rules.
 */
export function generateProductSchema(product: Product): ProductSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.fab,
    sku: `SA-${String(product.id).padStart(3, "0")}`,
    brand: {
      "@type": "Brand",
      name: "Susan Atelier",
    },
    image: buildUrl(`/images/ghost-${String(product.id).padStart(2, "0")}.webp`),
    category: product.cat,
    offers: {
      "@type": "Offer",
      url: buildUrl(`/collection/${product.id}`),
      priceCurrency: "INR",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Susan Atelier",
      },
    },
  };
}

// ---------------------------------------------------------------------------
// Breadcrumb
// ---------------------------------------------------------------------------

export interface BreadcrumbItem {
  name: string;
  /** Path relative to the site origin (e.g. "/collection"). */
  path: string;
}

export interface BreadcrumbSchema extends JsonLdBase {
  "@type": "BreadcrumbList";
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

/**
 * Builds a BreadcrumbList from relative paths. Each path is resolved to an
 * absolute URL via buildUrl so the markup is crawlable.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: buildUrl(item.path),
    })),
  };
}

// ---------------------------------------------------------------------------
// CollectionPage
// ---------------------------------------------------------------------------

export interface CollectionPageSchema extends JsonLdBase {
  "@type": "CollectionPage";
  name: string;
  description: string;
  mainEntity: {
    "@type": "ItemList";
    numberOfItems: number;
    itemListElement: Array<{
      "@type": "ListItem";
      position: number;
      name: string;
      url: string;
    }>;
  };
}

/**
 * CollectionPage schema. When products are supplied, the page lists each piece
 * as an ItemList element — otherwise it describes the 17-piece collection.
 */
export function generateCollectionSchema(
  products?: Product[]
): CollectionPageSchema {
  const listElements = (products ?? []).map((product, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: product.name,
    url: buildUrl(`/collection/${product.id}`),
  }));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Susan Atelier Collection",
    description:
      "Seventeen pieces, already made. Browse co-ords, occasionwear, and separates by Susan Atelier.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products?.length ?? 17,
      itemListElement: listElements,
    },
  };
}

// ---------------------------------------------------------------------------
// FAQPage
// ---------------------------------------------------------------------------

export interface FAQPageSchema extends JsonLdBase {
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
}

/**
 * FAQPage schema for the home page — covers Size Guide and Transparency.
 * Answers are honest, no fake claims.
 */
export function generateFAQSchema(): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What sizes does Susan Atelier offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Susan Atelier offers sizes XXS through 4XL across all pieces. We use a standard Indian size chart with bust, waist, and hip measurements in centimetres. If you're between sizes, we recommend sizing up — our pieces are cut to drape. Free size exchange is available on every piece.",
        },
      },
      {
        "@type": "Question",
        name: "How does Susan Atelier ensure fair wages for artisans?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Every product page shows a Transparency Card with the exact wage paid to the named artisan who made the piece. Our artisans — Meena (Lucknow, 14 years), Asha (Jaipur, 11 years), Farida (Kolkata, 17 years), and Sara (Mumbai, 9 years) — earn above the living wage benchmark of ₹300/day. We publish this openly because we believe transparency is the difference between 'artisan-made' as a slogan and artisan-made as a commitment.",
        },
      },
      {
        "@type": "Question",
        name: "What fabrics does Susan Atelier use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We use linen, cotton, and silk — breathable, natural fabrics chosen to last years, not seasons. Every label names the exact fibre composition. Our linen pieces soften with every wash, our cotton poplin and voile are crisp and breathable for long occasions, and our silk velvet carries the evening pieces.",
        },
      },
      {
        "@type": "Question",
        name: "Does Susan Atelier offer free size exchange?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer one free size exchange on every piece. Returns are the number one margin killer in fashion — we'd rather get you the right size than take a return. Message us on WhatsApp for a fit check and we'll measure with you, not at you.",
        },
      },
      {
        "@type": "Question",
        name: "Where are Susan Atelier pieces made?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "All pieces are hand-embroidered in India across four ateliers: Lucknow (white cording and seed-pearl botanicals), Jaipur (dori florals and fine needlework), Kolkata (velvet and multi-floral zardozi), and Mumbai (pearl setting and final finishing). Every piece carries the name of the artisan who made it.",
        },
      },
      {
        "@type": "Question",
        name: "How many pieces are in the Susan Atelier collection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The launch collection consists of 17 one-of-a-kind pieces across four categories: Co-ords (5 pieces, ₹2,800–₹4,500), Occasionwear (3 pieces, ₹6,500–₹8,800), Separates (8 pieces, ₹3,200–₹3,500), and Entry (1 piece, ₹1,800). Each piece is already made and finished — when it's gone, it's gone.",
        },
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// HowTo
// ---------------------------------------------------------------------------

export interface HowToSchema extends JsonLdBase {
  "@type": "HowTo";
  name: string;
  description: string;
  step: Array<{
    "@type": "HowToStep";
    position: number;
    name: string;
    text: string;
  }>;
}

/**
 * HowTo schema for measuring your size — links to the Size & Fit section.
 */
export function generateHowToSchema(): HowToSchema {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Measure Your Size for Susan Atelier",
    description:
      "Measure your bust, waist, and hip to find the right Susan Atelier size. Our pieces fit XXS to 4XL.",
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Measure your bust",
        text: "Wrap the tape around the fullest part of your bust, keeping it level and snug but not tight.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Measure your waist",
        text: "Wrap the tape around your natural waistline — the narrowest part of your torso, usually just above the belly button.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Measure your hip",
        text: "Wrap the tape around the widest part of your hips and buttocks, keeping it level.",
      },
      {
        "@type": "HowToStep",
        position: 4,
        name: "Compare with the size chart",
        text: "Match your measurements to the Susan Atelier size chart. If you fall between sizes, size up — our pieces are cut to drape. Free size exchange is available on every piece.",
      },
    ],
  };
}
