"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard component - displays product in collection grid
 * Used by Collection page
 */

export default function ProductCard({ product }: ProductCardProps) {
  const gstClass = product.gst === 5 ? "gst--5" : "gst--18";
  const gstLabel = product.gst === 5 ? "5% GST" : "18% GST";

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
        <span className="product-card__badge badge--entry">Entry · 5% GST</span>
      )}

      <div className="product-card__media">
        <Image
          src={`/images/ghost-${String(product.id).padStart(2, "0")}.png`}
          alt={product.name}
          fill
          sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 25vw"
          className="product-card__image"
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
    </Link>
  );
}