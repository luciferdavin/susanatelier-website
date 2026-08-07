"use client";

import { useState } from "react";
import Link from "next/link";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/Reveal";
import AnimatedTitle from "@/components/motion/AnimatedTitle";

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
    <div className="wrap page-top">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Collection</span>
      </nav>

      <header className="page-hero" aria-labelledby="collection-title">
        <Reveal>
          <p className="eyebrow">Collection Nº 01 — The Seventeen</p>
        </Reveal>
        <AnimatedTitle
          as="h1"
          className="sec-title"
          id="collection-title"
          lines={[<>Seventeen pieces,</>, <em>already made.</em>]}
        />
        <Reveal>
          <p className="lede">
            One-of-a-kind and finished — when a piece sells, it is gone. Each
            carries its cloth, its maker, and an honest price breakdown.
          </p>
        </Reveal>
      </header>

      <section aria-label="Collection pieces">
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
                onClick={() => setActiveCategory(cat.id)}
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
