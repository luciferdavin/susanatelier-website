"use client";

import { useRef } from "react";
import { useSafeReducedMotion } from "@/components/motion/useSafeReducedMotion";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue } from "framer-motion";

interface Segment {
  t: string;
  em?: boolean;
}

const TEXT: Segment[] = [
  { t: "True" },
  { t: "luxury" },
  { t: "is" },
  { t: "not" },
  { t: "a" },
  { t: "logo." },
  { t: "It" },
  { t: "is" },
  { t: "a" },
  { t: "name", em: true },
  { t: "on" },
  { t: "every" },
  { t: "label," },
  { t: "a" },
  { t: "wage", em: true },
  { t: "on" },
  { t: "every" },
  { t: "card," },
  { t: "and" },
  { t: "cloth", em: true },
  { t: "you" },
  { t: "can" },
  { t: "name" },
  { t: "—" },
  { t: "made" },
  { t: "by" },
  { t: "hand" },
  { t: "in" },
  { t: "India," },
  { t: "worn" },
  { t: "for" },
  { t: "years," },
  { t: "not" },
  { t: "seasons." },
];

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span className="mf-w" style={{ opacity, y }}>
      {children}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useSafeReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.42"],
  });

  return (
    <section className="manifesto" aria-label="The Susan Atelier standard">
      <div className="mf-inner" ref={ref}>
        <p className="mf-eyebrow">
          <span aria-hidden="true" /> The Maison Standard{" "}
          <span aria-hidden="true" />
        </p>
        {reduced ? (
          <p className="mf">
            {TEXT.map((s, i) => (
              <span className="mf-w" key={i}>
                {s.em ? <em>{s.t}</em> : s.t}
              </span>
            ))}
          </p>
        ) : (
          <p className="mf">
            {TEXT.map((s, i) => (
              <Word
                key={i}
                progress={scrollYProgress}
                range={[i / TEXT.length, (i + 1) / TEXT.length]}
              >
                {s.em ? <em>{s.t}</em> : s.t}
              </Word>
            ))}
          </p>
        )}
      </div>
    </section>
  );
}
