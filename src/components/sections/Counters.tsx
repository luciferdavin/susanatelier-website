"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";

const items = [
  { end: 17, suffix: "", label: "one-of-one pieces" },
  { end: 4, suffix: "", label: "artisan ateliers" },
  { end: 2140, suffix: "+", label: "hours of handwork" },
  { end: 100, suffix: "%", label: "named makers" },
] as const;

function formatVal(n: number): string {
  return n.toLocaleString("en-IN");
}

export default function Counters() {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  const [values, setValues] = useState<number[]>(items.map((it) => it.end));

  useEffect(() => {
    if (prefersReducedMotion || !inView) return;

    const cleanups: (() => void)[] = [];

    items.forEach((it, i) => {
      const controls = animate(0, it.end, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (v: number) => {
          setValues((prev) => {
            if (prev[i] === Math.round(v)) return prev;
            const next = [...prev];
            next[i] = Math.round(v);
            return next;
          });
        },
      });
      cleanups.push(() => controls.stop());
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
    // ponytail: animate returns AnimationControls which isn't a Promise; stop() is the cleanup
  }, [prefersReducedMotion, inView]);

  return (
    <div className="counters" ref={ref}>
      {items.map((it, i) => (
        <div key={it.label}>
          <b>
            {prefersReducedMotion ? formatVal(it.end) : formatVal(values[i])}
            {it.suffix}
          </b>
          <span>{it.label}</span>
        </div>
      ))}
    </div>
  );
}
