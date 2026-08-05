import type { Metadata } from "next";
import CollectionGrid from "@/components/CollectionGrid";
import { createMetadata } from "@/lib/site";
import { generateCollectionSchema } from "@/lib/schemas";
import { PRODUCTS } from "@/lib/products";
import JsonLd from "@/components/JsonLd";

/**
 * Collection page (server) — owns metadata + CollectionPage structured data.
 * Interactive filtering lives in the client <CollectionGrid /> component.
 */
export const metadata: Metadata = createMetadata({
  title: "The Collection — 17 pieces, already made",
  description:
    "17 handmade Indian occasion wear pieces — co-ords, separates, and more. Each shows fabric, maker, and honest price breakdown.",
  path: "/collection",
  keywords: [
    "Indian occasion wear collection",
    "co-ords",
    "linen co-ords India",
    "handmade dresses",
  ],
});

export default function CollectionPage() {
  const collectionSchema = generateCollectionSchema(PRODUCTS);
  return (
    <>
      <JsonLd schema={collectionSchema} />
      <CollectionGrid />
    </>
  );
}
