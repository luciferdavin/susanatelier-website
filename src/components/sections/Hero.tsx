"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import HeroTitle from "./HeroTitle";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const booted =
    typeof window !== "undefined" && Boolean((window as any).__SA_LOADED);
  const baseDelay = booted ? 0.15 : 2.9;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "38%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title">
      <motion.div
        className="hero-bg"
        style={reduced ? undefined : { y: bgY }}
        aria-hidden="true"
      >
        <motion.div
          className="hero-bg-inner"
          initial={reduced ? false : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3.2, ease: [0.22, 0.61, 0.36, 1] }}
        >
          <Image
            src="/images/editorial/hero-campaign.jpg"
            alt="Model wearing an ivory hand-embroidered silk co-ord with antique-gold botanical zardozi, standing in a dark, lamplit atelier"
            fill
            priority
            sizes="100vw"
            className="hero-img"
          />
        </motion.div>
      </motion.div>
      <div className="hero-scrim" aria-hidden="true" />

      <motion.div
        className="hero-inner"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="hero-eyebrow"
          initial={reduced ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: baseDelay, ease: EASE }}
        >
          Collection Nº 01 — The Seventeen
          <span className="hero-eyebrow-dot" aria-hidden="true">
            ✦
          </span>
          Pre-launch MMXXVI
        </motion.p>

        <HeroTitle baseDelay={baseDelay} />

        <motion.p
          className="hero-sub"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: baseDelay + 0.55,
            ease: EASE,
          }}
        >
          Seventeen one-of-a-kind pieces of hand-embroidered Indian occasion
          wear — already made, never restocked. The maker&apos;s name, the
          cloth, and the honest math are sewn into every label.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={reduced ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: baseDelay + 0.7,
            ease: EASE,
          }}
        >
          <Link href="#collection" className="btn btn--gold btn--lg">
            Discover the Collection
          </Link>
          <Link href="#join" className="btn btn--light btn--lg">
            Join the Waitlist
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-foot"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: baseDelay + 1, ease: EASE }}
        aria-hidden="true"
      >
        <span className="hf-meta">Est. MMXXVI · Made in India</span>
        <span className="hero-scroll">
          <i />
          Scroll
        </span>
        <span className="hf-meta">17 pieces · 4 ateliers · 100% named makers</span>
      </motion.div>
    </section>
  );
}
