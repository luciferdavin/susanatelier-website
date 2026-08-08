"use client";

import { motion,  type Variants } from "framer-motion";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import type { ReactNode } from "react";
import type React from "react";

type Direction = "up" | "left" | "right" | "none";

type DivProps = Pick<
  React.HTMLAttributes<HTMLDivElement>,
  "className" | "id" | "style" | "role" | "aria-label" | "aria-labelledby" | "aria-hidden" | "aria-current"
>;

interface RevealProps extends DivProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
}

const OFFSETS: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  none: {},
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance,
  ...rest
}: RevealProps) {
  const prefersReducedMotion = useSafeReducedMotion();
  const offset = OFFSETS[direction];
  const x = offset.x ? (distance ?? Math.abs(offset.x)) * Math.sign(offset.x) : 0;
  const y = offset.y ? distance ?? offset.y : 0;

  if (prefersReducedMotion) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <motion.div
      {...rest}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] },
  },
};

interface StaggerGroupProps extends DivProps {
  children: ReactNode;
}

export function StaggerGroup({ children, ...rest }: StaggerGroupProps) {
  const prefersReducedMotion = useSafeReducedMotion();

  if (prefersReducedMotion) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <motion.div
      {...rest}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, ...rest }: StaggerGroupProps) {
  const prefersReducedMotion = useSafeReducedMotion();

  if (prefersReducedMotion) {
    return <div {...rest}>{children}</div>;
  }

  return (
    <motion.div {...rest} variants={staggerItem}>
      {children}
    </motion.div>
  );
}
