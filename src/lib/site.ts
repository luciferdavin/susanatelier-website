/**
 * Central site configuration — single source of truth for URLs, brand
 * identity, and shared SEO defaults. Everything that needs the canonical
 * domain (sitemap, robots, metadata, Open Graph) reads from here so the site
 * can be re-pointed to the real domain by setting one env var.
 */
import type { Metadata } from "next";

/**
 * Resolves the canonical site origin.
 *
 * Reads NEXT_PUBLIC_SITE_URL at build time. Falls back to the prelaunch
 * placeholder (susanatelier.com) until the real domain is provisioned.
 * Trailing slashes are stripped so callers can safely concatenate paths.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (!raw) return "https://susanatelier.com";
  return raw.replace(/\/+$/, "");
}

/** Absolute URL builder — joins the site origin with a path safely. */
export function buildUrl(path = "/"): string {
  const base = getSiteUrl();
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** The default social/Open Graph image (absolute so it works cross-domain). */
export const OG_IMAGE = {
  path: "/logos/Susan_Atelier_OG_1200x630.png",
  width: 1200,
  height: 630,
  alt: "Susan Atelier — contemporary Indian occasion wear, made by named hands",
} as const;

/** Static route paths that should appear in the sitemap and nav. */
export const STATIC_ROUTES = [
  "",
  "/collection",
  "/craft",
  "/fit",
  "/about",
  "/join",
] as const;

type SiteConfig = {
  name: string;
  /** Founder / creative lead. */
  founder: string;
  /** Short tagline used in titles and social cards. */
  tagline: string;
  /** Default page description used when a page does not override it. */
  description: string;
  locale: string;
  twitter: string;
  instagram: string;
};

export const siteConfig: SiteConfig = {
  name: "Susan Atelier",
  founder: "Riya",
  tagline: "Made by named hands, worn for years",
  description:
    "Contemporary Indian occasion wear, made by named hands. 17-piece launch collection featuring co-ords, occasionwear, and separates. Join the waitlist for early access.",
  locale: "en_IN",
  twitter: "@susanatelier",
  instagram: "https://instagram.com/susanatelier",
};

/**
 * Per-page metadata input. `title` is appended to the brand name via the
 * root layout's `%s | Susan Atelier` template unless `useTemplate` is false.
 */
export type PageMetadataInput = {
  title: string;
  description: string;
  /** Path used to build the canonical URL and OG url (e.g. "/craft"). */
  path?: string;
  /** Override the social share image for this page. */
  ogImage?: { url: string; width?: number; height?: number; alt?: string };
  keywords?: string[];
  noindex?: boolean;
};

/**
 * Builds fully-typed Next.js Metadata for a page, including Open Graph and
 * Twitter cards. The canonical URL and OG url are derived from `getSiteUrl()`
 * so they stay correct across environments.
 */
export function createMetadata(input: PageMetadataInput): Metadata {
  const url = buildUrl(input.path ?? "/");
  const image = input.ogImage
    ? {
        url: input.ogImage.url,
        width: input.ogImage.width ?? OG_IMAGE.width,
        height: input.ogImage.height ?? OG_IMAGE.height,
        alt: input.ogImage.alt ?? OG_IMAGE.alt,
      }
    : {
        url: OG_IMAGE.path,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      };

  return {
    // The root layout's `%s | Susan Atelier` template is applied automatically.
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    alternates: { canonical: url },
    robots: input.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url,
      siteName: siteConfig.name,
      title: input.title,
      description: input.description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image.url],
    },
  };
}
