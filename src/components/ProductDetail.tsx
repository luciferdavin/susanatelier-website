"use client";

import Link from "next/link";
import Image from "next/image";
import { Product, formatPrice } from "@/lib/products";

/**
 * Product detail view (client) — interactive pre-order via WhatsApp.
 * The server `collection/[id]/page.tsx` resolves the product, owns the
 * page metadata, and renders the Product + Breadcrumb structured data.
 */
export default function ProductDetail({ product }: { product: Product }) {
  const gstLabel = product.gst === 5 ? "5% GST" : "18% GST";
  const gstClass = product.gst === 5 ? "gst--5" : "gst--18";

  const handleNotify = () => {
    const message = `Hi Susan Atelier! I'd like to pre-order: ${product.name} (₹${product.price.toLocaleString(
      "en-IN"
    )}). My email: [your email]`;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "PLACEHOLDER_REPLACE_ME";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/collection">Collection</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{product.name}</span>
      </nav>

      <section className="product-detail" aria-labelledby="product-title">
        <div className="pd">
          <div className="pd-media">
            <Image
              src={`/images/ghost-${String(product.id).padStart(2, "0")}.png`}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
              className="pd-image"
            />
          </div>

          <div>
            {product.hero && (
              <span
                className="product-card__badge badge--hero"
                style={{ position: "static", display: "inline-block", marginBottom: "12px" }}
              >
                Our Hero
              </span>
            )}
            {product.entry && (
              <span
                className="product-card__badge badge--entry"
                style={{ position: "static", display: "inline-block", marginBottom: "12px" }}
              >
                Entry · 5% GST
              </span>
            )}

            <h1 className="pd-name" id="product-title">
              {product.name}
            </h1>
            <p className="pd-fab">{product.fab}</p>
            <div className="pd-price">
              {formatPrice(product.price)}
              <span className={`gst ${gstClass}`}>{gstLabel}</span>
            </div>

            <div className="pd-actions">
              <button className="btn btn--solid" onClick={handleNotify}>
                Pre-order via WhatsApp
              </button>
              <Link href="/#fit" className="btn btn--outline">
                Check Size & Fit
              </Link>
            </div>

            <div className="transparency">
              <h3>Transparency card</h3>
              <div className="trow">
                <span>Maker</span>
                <span>{product.maker}</span>
              </div>
              <div className="trow">
                <span>Cloth</span>
                <span>{product.cloth}</span>
              </div>
              <div className="trow">
                <span>Embroidery</span>
                <span>{product.embroidery}</span>
              </div>
              <div className="trow">
                <span>Maker wage</span>
                <span>{product.wage}</span>
              </div>
              <div className="trow">
                <span>MRP (incl. GST)</span>
                <span>{product.mrp}</span>
              </div>
            </div>

            <p className="step-p" style={{ marginTop: "var(--space-4)" }}>
              Every piece is one-of-a-kind and already made. Join the waitlist for
              24 hours of early access before the public drop.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
