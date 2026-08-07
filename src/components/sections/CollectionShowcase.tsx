"use client";

import { useState, useCallback } from "react";
import type { Product } from "@/lib/products";
import { PRODUCTS, CATEGORIES } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import ProductModal from "./ProductModal";
import { StaggerGroup, StaggerItem } from "@/components/motion/Reveal";

/**
 * Home #collection — filter bar (with counts) + product grid (onSelect mode)
 * + modal. Owns both filter and selectedProduct state in one client boundary.
 */
export default function CollectionShowcase() {
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);

  const filtered =
    active === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.cat === active);

  const counts = PRODUCTS.reduce<Record<string, number>>((acc, p) => {
    acc[p.cat] = (acc[p.cat] || 0) + 1;
    return acc;
  }, {});

  const handleClose = useCallback(() => setSelected(null), []);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter by category">
        <button
          className={`fbtn ${active === "all" ? "active" : ""}`}
          onClick={() => setActive("all")}
          aria-pressed={active === "all"}
        >
          All <sup>{PRODUCTS.length}</sup>
        </button>
        {CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
          <button
            key={cat.id}
            className={`fbtn ${active === cat.id ? "active" : ""}`}
            onClick={() => setActive(cat.id)}
            aria-pressed={active === cat.id}
          >
            {cat.label} <sup>{counts[cat.id] || 0}</sup>
          </button>
        ))}
      </div>

      <StaggerGroup
        key={active}
        className="grid"
        role="list"
        aria-label={`${filtered.length} pieces`}
      >
        {filtered.map((product) => (
          <StaggerItem key={product.id}>
            <ProductCard product={product} onSelect={setSelected} />
          </StaggerItem>
        ))}
      </StaggerGroup>

      {filtered.length === 0 && (
        <div className="no-results">
          <p>No pieces found in this category.</p>
        </div>
      )}

      <ProductModal product={selected} onClose={handleClose} />
    </>
  );
}
