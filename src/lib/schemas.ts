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
      "https://wa.me/91XXXXXXXXXX",
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
  potentialAction: {
    "@type": "SearchAction";
    target: { "@type": "EntryPoint"; urlTemplate: string };
    "query-input": string;
  };
}

/**
 * WebSite schema with an internal search action. Kept honest: the search
 * endpoint is the real collection filter (`/collection?search=`).
 */
export function generateWebSiteSchema(): WebSiteSchema {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Susan Atelier",
    url: buildUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: buildUrl("/collection?search={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
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
    image: buildUrl(`/images/ghost-${String(product.id).padStart(2, "0")}.png`),
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
