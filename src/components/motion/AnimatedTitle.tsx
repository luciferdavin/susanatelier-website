"use client";

import { motion, useReducedMotion } from "framer-motion";
import { createElement, type ReactNode } from "react";

/**
 * AnimatedTitle — the maison's signature masked line reveal, reusable for any
 * heading. Each line slides up out of its overflow-hidden mask as the heading
 * scrolls into view (once). Honors prefers-reduced-motion.
 */

interface AnimatedTitleProps {
  as?: "h1" | "h2" | "h3";
  className?: string;
  lines: ReactNode[];
  id?: string;
  delay?: number;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function AnimatedTitle({
  as = "h2",
  className,
  lines,
  id,
  delay = 0,
}: AnimatedTitleProps) {
  const reduced = useReducedMotion();

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

  return createElement(
    as,
    { className, id },
    lines.map((line, i) => (
      <span className="h-line" key={i}>
        <motion.span
          className="h-in"
          initial={{ y: "115%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
          transition={{ duration: 1.1, delay: delay + i * 0.12, ease: EASE }}
        >
          {line}
        </motion.span>
      </span>
    ))
  );
}
