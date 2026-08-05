"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!finePointer || reduceMotion) return;

    document.body.classList.add("cur-on");

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;
    let active = true;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (
        t &&
        typeof t.closest === "function" &&
        t.closest("a, button, [role=button], .p-card")
      ) {
        document.body.classList.add("cur-big");
      } else {
        document.body.classList.remove("cur-big");
      }
    };

    const loop = () => {
      if (!active) return;
      rx += (mx - rx) * 0.16;
      ry += (my - ry) * 0.16;
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (dot) dot.style.transform = `translate(${mx - 3}px, ${my - 3}px)`;
      if (ring)
        ring.style.transform = `translate(${rx - ring.offsetWidth / 2}px, ${
          ry - ring.offsetHeight / 2
        }px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);

    return () => {
      active = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("cur-on", "cur-big");
    };
  }, []);

  return (
    <>
      <div id="curDot" ref={dotRef} />
      <div id="curRing" ref={ringRef} />
    </>
  );
}
