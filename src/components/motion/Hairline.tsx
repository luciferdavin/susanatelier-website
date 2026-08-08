"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

/**
 * Hairline — a 1px rule that draws itself left-to-right as it scrolls into
 * view. Used to separate the proof ledger rows. Honors reduced motion.
 */
export default function Hairline({ delay = 0 }: { delay?: number }) {
  const reduced = useSafeReducedMotion();
  if (reduced) {
    return <span className="pi-line" style={{ transform: "none" }} />;
  }
  return (
    <motion.span
      className="pi-line"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    />
  );
}
