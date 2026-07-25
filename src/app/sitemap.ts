import { MetadataRoute } from "next";
import { getSiteUrl, buildUrl, STATIC_ROUTES } from "@/lib/site";
import { PRODUCTS } from "@/lib/products";

/**
 * Sitemap for Susan Atelier.
 *
 * Combines the static marketing routes with the dynamic product detail pages
 * so every indexable URL is discoverable by crawlers. The base URL is resolved
 * from NEXT_PUBLIC_SITE_URL (falling back to the prelaunch placeholder).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map((route) => ({
    url: buildUrl(route),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: buildUrl(`/collection/${product.id}`),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes];
}
