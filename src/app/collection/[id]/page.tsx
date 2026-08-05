import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PRODUCTS, getProductById } from "@/lib/products";
import {
  generateProductSchema,
  generateBreadcrumbSchema,
} from "@/lib/schemas";
import { buildUrl } from "@/lib/site";
import ProductDetail from "@/components/ProductDetail";
import JsonLd from "@/components/JsonLd";

/**
 * Product detail page - dynamic route /collection/[id]
 * Server component: resolves the product, owns metadata + Product/Breadcrumb
 * structured data. Interactive pre-order lives in <ProductDetail />.
 */

// Pre-render every known product at build time (static generation).
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({ id: String(product.id) }));
}

// Page-level metadata, generated from the resolved product.
export function generateMetadata({
  params,
}: {
  params: { id: string };
}): Metadata {
  const id = parseInt(params.id, 10);
  const product = getProductById(id);
  if (!product) {
    return { title: "Piece not found" };
  }
  return {
    title: product.name,
    description: `${product.name} — ${product.fab}. Handmade by ${product.maker}. ${product.mrp} incl. GST.`.slice(0, 155),
    alternates: { canonical: buildUrl(`/collection/${product.id}`) },
    openGraph: {
      type: "website",
      url: buildUrl(`/collection/${product.id}`),
      title: product.name,
      description: `${product.fab}. Made by ${product.maker}. ${product.mrp} incl. GST.`,
      images: [
        {
          url: buildUrl(`/images/ghost-${String(product.id).padStart(2, "0")}.webp`),
          width: 1200,
          height: 630,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: `${product.fab}. Made by ${product.maker}.`,
      images: [buildUrl(`/images/ghost-${String(product.id).padStart(2, "0")}.webp`)],
    },
  };
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const id = parseInt(params.id, 10);
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Collection", path: "/collection" },
    { name: product.name, path: `/collection/${product.id}` },
  ]);

  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={productSchema} />
      <ProductDetail product={product} />
    </>
  );
}
