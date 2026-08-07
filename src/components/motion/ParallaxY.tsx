"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * ParallaxY — gently drifts its children vertically against scroll. Used for
 * lookbook figures and atelier imagery to give the page a living, cinematic
 * depth. Honors reduced motion.
 */

interface ParallaxYProps {
  children: ReactNode;
  className?: string;
  /** Pixels of drift across the scroll range (positive = starts lower). */
  strength?: number;
}

export default function ParallaxY({
  children,
  className,
  strength = 48,
}: ParallaxYProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
