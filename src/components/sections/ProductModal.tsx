"use client";

import { useEffect, useRef, useState } from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Tilt from "@/components/motion/Tilt";
import type { Product } from "@/lib/products";
import { formatPrice, LIVING_WAGE, parseWage } from "@/lib/products";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}


/**
 * Product detail modal — transparency card + wage bar + WhatsApp reserve.
 * Rendered by CollectionShowcase; only mounts content when open.
 */
export default function ProductModal({ product, onClose }: ProductModalProps) {
  const reduceMotion = useSafeReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<HTMLElement | null>(null);

  const [activeImg, setActiveImg] = useState<"ghost" | "real">("real");

  useEffect(() => {
    if (!product) return;
    setActiveImg("real"); // real model photograph first when product changes
    prevFocus.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      prevFocus.current?.focus();
    };
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [product, onClose]);

  if (!product) return null;

  const catLabel =
    product.cat === "coord"
      ? "Co-ord"
      : product.cat.charAt(0).toUpperCase() + product.cat.slice(1);
  const wage = parseWage(product.wage);
  const wagePct = Math.round(((wage - LIVING_WAGE) / LIVING_WAGE) * 100);
  const barWidth = Math.min(wage / 10, 100);
  const waNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "PLACEHOLDER_REPLACE_ME";
  const waHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(
    `Hi Susan Atelier — I'd like to reserve "${product.name}" (${formatPrice(product.price)}).`
  )}`;

  const ghostSrc = `/images/ghost-${String(product.id).padStart(2, "0")}.webp`;
  const realSrc = `/images/real/real-${String(product.id).padStart(2, "0")}.png`;
  const currentSrc = activeImg === "ghost" ? ghostSrc : realSrc;

  return (
    <div
      className="modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mName"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-backdrop" />
      <div className="modal-panel">
        <button
          ref={closeRef}
          className="modal-close"
          aria-label="Close piece details"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="modal-gallery">
          <Tilt className="pd-tilt" max={5} perspective={1300}>
            <div className="modal-media">
              <Image
                src={currentSrc}
                alt={product.name}
                fill
                sizes="(max-width: 1000px) 100vw, 50vw"
                className={activeImg === "ghost" ? "image--contain" : "image--cover"}
              />
            </div>
          </Tilt>
          <div className="pd-thumbnails">
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
          </div>
        </div>
        <div className="modal-body">
          <p className="eyebrow">
            Nº {String(product.id).padStart(2, "0")} — {catLabel}
          </p>
          <h3 className="m-name" id="mName">
            {product.name}
          </h3>
          <p className="m-fab">{product.fab}</p>
          <div className="m-price">
            <span>{formatPrice(product.price)}</span>
            <em>incl. {product.gst}% GST</em>
          </div>

          <div className="tc-panel">
            <h4>Transparency Card</h4>
            <dl>
              <div>
                <dt>The Maker</dt>
                <dd>{product.maker}</dd>
              </div>
              <div>
                <dt>The Cloth</dt>
                <dd>{product.cloth}</dd>
              </div>
              <div>
                <dt>The Embroidery</dt>
                <dd>{product.embroidery}</dd>
              </div>
              <div>
                <dt>Fair Wage</dt>
                <dd>
                  {formatPrice(wage)} · {wagePct >= 0 ? "+" : ""}
                  {wagePct}% vs living wage
                </dd>
              </div>
            </dl>
            <div className="wage-wrap">
              <div className="wage-track">
                {reduceMotion ? (
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
          </div>

          <div className="m-cta">
            <Button
              variant="primary"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Reserve on WhatsApp
            </Button>
            <span className="m-note">
              one of one — when it's gone, it's gone.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
