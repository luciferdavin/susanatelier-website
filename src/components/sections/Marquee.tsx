"use client";

import { useRef } from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import { motion,  useScroll, useTransform } from "framer-motion";

/**
 * Marquee — the house ribbon. Enters tilted back like cloth unrolling
 * from the hero above and flattens as it crosses into view. The rotateX
 * lives on an outer wrapper so it never fights the track's translateX
 * loop. Honors reduced motion.
 */
export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);

  return (
    <div className="band" aria-hidden="true" ref={ref}>
      <motion.div
        className="mq-tilt"
        style={
          reduced ? undefined : { rotateX, transformPerspective: 900 }
        }
      >
        <div className="mq-track">
          {[0, 1].map((i) => (
            <div className="mq-group" key={i}>
              <span><em>Hand-embroidered in India.</em></span><span><i>✦</i></span>
              <span><em>One-of-one, never restocked.</em></span><span><i>✦</i></span>
              <span><em>The maker named on every label.</em></span><span><i>✦</i></span>
              <span><em>Worn for years, not seasons.</em></span><span><i>✦</i></span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
