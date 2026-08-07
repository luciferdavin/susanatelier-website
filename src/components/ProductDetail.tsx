"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import posthog from "posthog-js";
import { motion, useReducedMotion } from "framer-motion";
import { Product, formatPrice, LIVING_WAGE, parseWage } from "@/lib/products";

/**
 * Product detail view (client) — interactive pre-order via WhatsApp.
 * The server `collection/[id]/page.tsx` resolves the product, owns the
 * page metadata, and renders the Product + Breadcrumb structured data.
 */
export default function ProductDetail({ product }: { product: Product }) {
  const [activeImg, setActiveImg] = useState<"ghost" | "real">("ghost");
  const reduced = useReducedMotion();
  
  const gstLabel = product.gst === 5 ? "5% GST" : "18% GST";
  const gstClass = product.gst === 5 ? "gst--5" : "gst--18";
  
  const wage = parseWage(product.wage);
  const wagePct = Math.round(((wage - LIVING_WAGE) / LIVING_WAGE) * 100);
  const barWidth = Math.min(wage / 10, 100);

  const ghostSrc = `/images/ghost-${String(product.id).padStart(2, "0")}.webp`;
  const realSrc = `/images/real/real-${String(product.id).padStart(2, "0")}.png`;
  const currentSrc = activeImg === "ghost" ? ghostSrc : realSrc;

  const handleNotify = () => {
    posthog.capture("product_preorder_initiated", {
      product_id: product.id,
      category: product.cat,
      price: product.price,
      channel: "whatsapp",
    });
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
          <div className="pd-gallery">
            <div className="pd-media">
              <Image
                src={currentSrc}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 50vw"
                className={`pd-image ${activeImg === "ghost" ? "image--contain" : "image--cover"}`}
              />
            </div>
            <div className="pd-thumbnails">
              <button
                className={`pd-thumbnail ${activeImg === "ghost" ? "active" : ""}`}
                onClick={() => setActiveImg("ghost")}
                aria-label="View Studio drape"
              >
                <div className="pd-thumbnail__frame">
                  <Image src={ghostSrc} alt="Ghost mannequin" fill sizes="44px" />
                </div>
                <span>Studio</span>
              </button>
              <button
                className={`pd-thumbnail ${activeImg === "real" ? "active" : ""}`}
                onClick={() => setActiveImg("real")}
                aria-label="View Model drape"
              >
                <div className="pd-thumbnail__frame">
                  <Image src={realSrc} alt="Model drape" fill sizes="44px" />
                </div>
                <span>Model</span>
              </button>
            </div>
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
                <span>
                  {formatPrice(wage)} · {wagePct >= 0 ? "+" : ""}
                  {wagePct}% vs living wage
                </span>
              </div>

              <div className="wage-wrap" style={{ marginBottom: "18px" }}>
                <div className="wage-track">
                  {reduced ? (
                    <span
                      className="wage-bar"
                      style={{ width: `${barWidth}%` }}
                    />
                  ) : (
                    <motion.span
                      className="wage-bar"
                      initial={{ width: 0 }}
                      animate={{ width: `${barWidth}%` }}
                      transition={{ duration: 1.1, delay: 0.2, ease: "easeOut" }}
                    />
                  )}
                  <span className="wage-mark" style={{ left: "30%" }} />
                </div>
                <div className="wage-lbls">
                  <span>₹0</span>
                  <span>living wage ₹{LIVING_WAGE}</span>
                  <span>₹1,000</span>
                </div>
              </div>

              <div className="trow" style={{ borderTop: "1px dashed var(--line)", paddingTop: "9px" }}>
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
