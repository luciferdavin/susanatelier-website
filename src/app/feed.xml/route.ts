import { PRODUCTS } from "@/lib/products";
import { getSiteUrl } from "@/lib/site";

/**
 * RSS feed for the Susan Atelier collection.
 * Serves at /feed.xml — content freshness signal for search engines.
 */

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(): Response {
  const siteUrl = getSiteUrl();
  const now = new Date().toUTCString();

  const items = PRODUCTS.map((p) => {
    const productUrl = `${siteUrl}/collection/${p.id}`;
    const imageUrl = `${siteUrl}/images/ghost-${String(p.id).padStart(2, "0")}.webp`;
    return `
    <item>
      <title>${escapeXml(p.name)}</title>
      <link>${productUrl}</link>
      <guid isPermaLink="true">${productUrl}</guid>
      <description>${escapeXml(`${p.fab} — ${p.mrp} incl. GST. Hand-embroidered by ${p.maker}.`)}</description>
      <enclosure url="${imageUrl}" type="image/png" length="0"/>
      <category>${escapeXml(p.cat)}</category>
    </item>`;
  }).join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Susan Atelier — Collection</title>
    <link>${siteUrl}/collection</link>
    <description>17 one-of-a-kind hand-embroidered pieces by Susan Atelier. Each shows fabric, maker, and honest price.</description>
    <language>en-in</language>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
