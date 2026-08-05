"use client";

import { motion, useReducedMotion } from "framer-motion";

const LINES: Array<{ text: React.ReactNode; script?: boolean }> = [
  { text: "Made by" },
  { text: <>named <em>hands,</em></> },
  { text: "worn for years,", script: true },
  { text: "not seasons.", script: true },
];

export default function HeroTitle() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <h1 className="hero-title">
        {LINES.map((line, i) => (
          <span className={`h-line${line.script ? " script-line" : ""}`} key={i}>
            <span className="h-in" style={{ transform: "none" }}>
              {line.text}
            </span>
          </span>
        ))}
      </h1>
    );
  }

  return (
    <motion.h1 className="hero-title">
      {LINES.map((line, i) => (
        <span className={`h-line${line.script ? " script-line" : ""}`} key={i}>
          <motion.span
            className="h-in"
            initial={{ y: "115%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line.text}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}
