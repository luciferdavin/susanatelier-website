"use client";

import { useState } from "react";
import posthog from "posthog-js";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, CATEGORIES, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

/**
 * Collection grid - client component for interactive category filtering.
 * Rendered by the server `collection/page.tsx` which owns the page metadata.
 */
export default function CollectionGrid() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.cat === activeCategory);

  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Collection</span>
      </nav>

      <section
        className="wrap"
        style={{ paddingTop: "var(--space-6)" }}
        aria-labelledby="collection-title"
      >
        <Reveal>
          <p className="eyebrow">The Collection</p>
          <h1 id="collection-title">Seventeen pieces, already made</h1>
          <p className="lede">
            One-of-a-kind and finished. Tap any piece for its fabric, the maker,
            and an honest price breakdown.
          </p>
        </Reveal>

        <div className="filterbar" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => {
            const count =
              cat.id === "all"
                ? PRODUCTS.length
                : PRODUCTS.filter((p) => p.cat === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`fbtn ${activeCategory === cat.id ? "active" : ""}`}
                onClick={() => {
                  posthog.capture("collection_category_filtered", {
                    category: cat.id,
                    surface: "collection_page",
                  });
                  setActiveCategory(cat.id);
                }}
                aria-pressed={activeCategory === cat.id}
                aria-controls="product-grid"
              >
                {cat.label} <sup>{count}</sup>
              </button>
            );
          })}
        </div>

        <StaggerGroup
          key={activeCategory}
          className="grid"
          id="product-grid"
          role="list"
          aria-label={`${filteredProducts.length} products`}
        >
          {filteredProducts.map((product) => (
            <StaggerItem key={product.id}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>No pieces found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
