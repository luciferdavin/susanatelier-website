"use client";

import { motion } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";

const LINES: Array<{ text: React.ReactNode }> = [
  { text: <>Made by <em>named hands,</em></> },
  { text: "worn for years," },
  { text: "not seasons." },
];

interface HeroTitleProps {
  baseDelay?: number;
}

export default function HeroTitle({ baseDelay = 0 }: HeroTitleProps) {
  const prefersReducedMotion = useSafeReducedMotion();

  if (prefersReducedMotion) {
    return (
      <h1 className="hero-title" id="hero-title">
        {LINES.map((line, i) => (
          <span className="h-line" key={i}>
            <span className="h-in" style={{ transform: "none" }}>
              {line.text}
            </span>
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1 className="hero-title" id="hero-title">
      {LINES.map((line, i) => (
        <span className="h-line" key={i}>
          <motion.span
            className="h-in"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 1.25,
              delay: baseDelay + 0.12 + i * 0.13,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
