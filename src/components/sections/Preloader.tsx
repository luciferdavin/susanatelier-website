"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { DividerIcon } from "@/components/icons/BrandIcons";

export default function Preloader() {
  const reduced = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [count, setCount] = useState(0);
  const [fading, setFading] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);

  /* Body class + scroll lock */
  useEffect(() => {
    document.body.classList.add("is-loading");
    return () => document.body.classList.remove("is-loading");
  }, []);

  useEffect(() => {
    document.body.style.overflow = hidden ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  /* Reduced motion: skip progress animation, hide fast */
  useEffect(() => {
    if (!reduced) return;
    const t = setTimeout(() => setHidden(true), 50);
    return () => clearTimeout(t);
  }, [reduced]);

  /* Progress animation: 0 -> 100 over ~1.9 s via rAF */
  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let start: number | null = null;

    const step = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / 1900);
      const pct = Math.round(p * 100);
      setCount(pct);
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (p < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  /* When progress hits 100: fade inner, then hide overlay */
  useEffect(() => {
    if (reduced || count < 100) return;
    const f = setTimeout(() => setFading(true), 150);
    const h = setTimeout(() => setHidden(true), 450);
    return () => {
      clearTimeout(f);
      clearTimeout(h);
    };
  }, [count, reduced]);

  /* After exit animation: remove is-loading, flag site as booted, scroll to hash */
  function handleExit() {
    document.body.classList.remove("is-loading");
    (window as any).__SA_LOADED = true;
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector<HTMLElement>(hash);
      if (el) el.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    }
  }

  return (
    <AnimatePresence onExitComplete={handleExit}>
      {!hidden && (
        <motion.div
          key="preloader"
          id="preloader"
          aria-hidden="true"
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            className="pre-inner"
            initial={false}
            animate={{ opacity: fading ? 0 : 1 }}
            transition={{ duration: 0.35 }}
          >
            <div className="lockup on-dark">
              <Image
                src="/logos/trans/Susan_Atelier_Logo_Monogram-trans.png"
                alt=""
                width={110}
                height={110}
                className="lk-mono"
              />
              <div className="lk-word">Susan Atelier</div>
              <div className="lk-script">by Riya</div>
              <DividerIcon className="lk-div" />
              <div className="lk-tag">Timeless. Feminine. Refined.</div>
            </div>
            <div className="pre-line">
              <span ref={barRef} />
            </div>
            <div className="pre-count">
              {String(count).padStart(2, "0")}%
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
