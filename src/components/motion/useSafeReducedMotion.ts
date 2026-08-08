"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hydration-safe reduced-motion preference.
 *
 * framer's useReducedMotion resolves to true on the very first client
 * render, while SSR always renders the motion variant — so under
 * prefers-reduced-motion every component quoting it produced hydration
 * errors and forced client re-rendering. This hook reports `false` for
 * the first render (matching SSR exactly), then adopts the real
 * preference inside an effect. The reduced variant swaps in one frame
 * later — instantly, with its CSS/global rules ensuring visibility, and
 * without a single hydration error.
 */
export function useSafeReducedMotion() {
  const prefers = useReducedMotion();
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    setReduced(Boolean(prefers));
  }, [prefers]);
  return reduced;
}
