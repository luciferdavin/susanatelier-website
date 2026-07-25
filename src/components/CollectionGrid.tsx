"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, CATEGORIES, formatPrice } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

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
        <p className="eyebrow">The Collection</p>
        <h1 id="collection-title">Seventeen pieces, already made</h1>
        <p className="lede">
          One-of-a-kind and finished. Tap any piece for its fabric, the maker,
          and an honest price breakdown.
        </p>

        <div className="filterbar" role="group" aria-label="Filter by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`fbtn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
              aria-pressed={activeCategory === cat.id}
              aria-controls="product-grid"
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div
          className="grid"
          id="product-grid"
          role="list"
          aria-label={`${filteredProducts.length} products`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-results">
            <p>No pieces found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
}
