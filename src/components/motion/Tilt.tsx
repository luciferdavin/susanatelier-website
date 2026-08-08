"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Tilt — pointer-tracked 3D tilt with a soft sheen sweep. Springs keep the
 * motion buttery; disabled for touch (no hover), and for
 * prefers-reduced-motion.
 */

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** max rotation in degrees (default 7) */
  max?: number;
  perspective?: number;
  shine?: boolean;
}

export default function Tilt({
  children,
  className,
  max = 7,
  perspective = 980,
  shine = true,
}: TiltProps) {
  const reduced = useSafeReducedMotion();
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    setEnabled(
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    );
  }, []);
  const active = enabled && !reduced;

  const rotateX = useSpring(0, { stiffness: 190, damping: 22, mass: 0.6 });
  const rotateY = useSpring(0, { stiffness: 190, damping: 22, mass: 0.6 });
  const sheenOpacity = useSpring(0, { stiffness: 220, damping: 26 });
  const sx = useMotionValue(50);
  const sy = useMotionValue(50);
  const sheen = useMotionTemplate`radial-gradient(340px circle at ${sx}% ${sy}%, rgba(245,234,225,0.15), transparent 62%)`;

  const cls = className ? `tilt ${className}` : "tilt";

  return (
    <motion.div
      className={cls}
      style={{
        rotateX,
        rotateY,
        transformPerspective: perspective,
        transformStyle: "preserve-3d",
      }}
      onPointerMove={(e) => {
        if (!active) return;
        const r = e.currentTarget.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rotateY.set(px * max);
        rotateX.set(-py * max);
        sx.set((px + 0.5) * 100);
        sy.set((py + 0.5) * 100);
        sheenOpacity.set(1);
      }}
      onPointerLeave={() => {
        rotateX.set(0);
        rotateY.set(0);
        sheenOpacity.set(0);
      }}
    >
      {children}
      {shine && (
        <motion.span
          className="tilt-shine"
          aria-hidden="true"
          style={{ opacity: sheenOpacity, background: sheen }}
        />
      )}
    </motion.div>
  );
}
