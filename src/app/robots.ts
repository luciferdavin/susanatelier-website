import { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

/**
 * robots.txt for Susan Atelier.
 *
 * Allows all crawlers, blocks private/internal paths, and points at the
 * generated sitemap. The host and sitemap URL are derived from
 * NEXT_PUBLIC_SITE_URL so they stay correct once the real domain is set.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
