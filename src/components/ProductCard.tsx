"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPrice } from "@/lib/products";
import Tilt from "@/components/motion/Tilt";

interface ProductCardProps {
  product: Product;
  /** When provided, clicking the card calls onSelect instead of linking. */
  onSelect?: (product: Product) => void;
}

/**
 * Product card — dual-mode: link to /collection/[id] (default) or
 * modal-trigger via onSelect. Used by both home showcase and /collection grid.
 */
export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const gstClass = product.gst === 5 ? "gst--5" : "gst--18";
  const gstLabel = product.gst === 5 ? "5% GST" : "18% GST";
  const catLabel =
    product.cat === "coord"
      ? "Co-ord"
      : product.cat.charAt(0).toUpperCase() + product.cat.slice(1);
  const imgSrc = `/images/ghost-${String(product.id).padStart(2, "0")}.webp`;

  if (onSelect) {
    return (
      <article
        className="p-card"
        role="button"
        tabIndex={0}
        aria-label={`${product.name} — ${formatPrice(product.price)}`}
        onClick={() => onSelect(product)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onSelect(product);
          }
        }}
      >
        <Tilt className="p-card-3d" max={6}>
          <div className="p-media">
            <Image
              src={imgSrc}
              alt={product.name}
              fill
              sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
              className="image--contain"
              loading="lazy"
            />
            {product.hero && (
              <span className="product-card__badge badge--hero">Our Hero</span>
            )}
            {product.entry && (
              <span className="product-card__badge badge--entry">
                Entry · 5% GST
              </span>
            )}
            <span className={`p-tag ${(product.hero || product.entry) ? "p-tag--offset" : ""}`}>
              {catLabel}
            </span>
            <span className="p-quick">View piece +</span>
          </div>
          <div className="p-info">
            <div className="p-row">
              <h3>{product.name}</h3>
              <span className="p-price">{formatPrice(product.price)}</span>
            </div>
            <p className="p-fab">{product.fab}</p>
            <p className="p-maker">
              <i>✦</i> Embroidered by {product.maker}
            </p>
          </div>
        </Tilt>
      </article>
    );
  }

  return (
    <Link
      href={`/collection/${product.id}`}
      className="product-card"
      aria-label={`${product.name} - ${formatPrice(product.price)}`}
    >
      {product.hero && (
        <span className="product-card__badge badge--hero">Our Hero</span>
      )}
      {product.entry && (
        <span className="product-card__badge badge--entry">
          Entry · 5% GST
        </span>
      )}
      <Tilt className="p-card-3d" max={6}>
        <div className="product-card__media">
          <Image
            src={imgSrc}
            alt={product.name}
            fill
            sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
            className="product-card__image image--contain"
            loading="lazy"
          />
        </div>
        <div className="product-card__body">
          <div className="product-card__name">{product.name}</div>
          <div className="product-card__fab">{product.fab}</div>
          <div className="product-card__price">
            {formatPrice(product.price)}
            <span className={`gst ${gstClass}`}>{gstLabel}</span>
          </div>
        </div>
      </Tilt>
    </Link>
  );
}
