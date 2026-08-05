"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { SprigIcon } from "@/components/icons/BrandIcons";

const IMG = "/images/hero-model.png";
const ALT = "The Midnight Botanical Co-ord — hand-embroidered linen co-ord worn by a model";

function FigCaption() {
  return (
    <figcaption className="hero-cap">
      Nº 01 — The Midnight Botanical Co-ord <em>hand-embroidered by Meena, Lucknow</em>
    </figcaption>
  );
}

export default function HeroVisual() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <>
        <figure className="hero-frame">
          <Image src={IMG} alt={ALT} width={640} height={800} priority className="hero-img" />
        </figure>
        <FigCaption />
      </>
    );
  }

  return (
    <>
      <motion.figure
        className="hero-frame"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={{ clipPath: "inset(0% 0 0% 0)" }}
        transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image src={IMG} alt={ALT} width={640} height={800} priority className="hero-img" />
        <SprigIcon className="float-sprig" style={{ top: -30, left: -16 }} />
        <SprigIcon className="float-sprig" style={{ bottom: 70, right: -14, animationDelay: "-3s" }} />
      </motion.figure>
      <FigCaption />
    </>
  );
}
