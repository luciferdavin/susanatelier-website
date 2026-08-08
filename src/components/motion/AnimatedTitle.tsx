"use client";

import { motion,  type Variants } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import { createElement, type ReactNode } from "react";

/**
 * AnimatedTitle — the maison's signature masked line reveal, reusable for any
 * heading. Each line slides up out of its overflow-hidden mask as the heading
 * scrolls into view (once). Honors prefers-reduced-motion.
 *
 * NOTE: `whileInView` must live on the OUTER heading, never on the masked
 * inner spans — IntersectionObserver clips targets by overflow ancestors, so
 * a span translated outside its overflow-hidden mask reports zero
 * intersection and its `whileInView` would never fire. Variants propagate
 * the reveal from the heading down to each masked line instead.
 */

interface AnimatedTitleProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  lines: ReactNode[];
  id?: string;
  delay?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const titleVariants = (delay: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: delay },
  },
});

const lineVariants: Variants = {
  hidden: { y: "115%" },
  visible: {
    y: 0,
    transition: { duration: 1.1, ease: EASE },
  },
};

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export default function AnimatedTitle({
  as = "h2",
  className,
  lines,
  id,
  delay = 0,
}: AnimatedTitleProps) {
  const reduced = useSafeReducedMotion();

  if (reduced) {
    return createElement(
      as,
      { className, id },
      lines.map((line, i) => (
        <span className="h-line" key={i}>
          <span className="h-in" style={{ transform: "none" }}>
            {line}
          </span>
        </span>
      ))
    );
  }

  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      variants={titleVariants(delay)}
    >
      {lines.map((line, i) => (
        <span className="h-line" key={i}>
          <motion.span className="h-in" variants={lineVariants}>
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
