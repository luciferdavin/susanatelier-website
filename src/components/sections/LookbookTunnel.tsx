"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * LookbookTunnel — a 3D fly-through interlude. As you scroll, the campaign
 * looks stand in space along a corridor and sweep past the camera one by
 * one, closing on a single line. Pure CSS 3D transforms driven by scroll
 * progress; reduced-motion visitors get a calm static gallery instead.
 */

interface Look {
  src: string;
  alt: string;
  caption: string;
  /** horizontal position in the corridor, % of viewport center offset */
  x: string;
  /** aspect class */
  portrait: boolean;
}

const LOOKS: Look[] = [
  {
    src: "/images/editorial/look-01.jpg",
    alt: "Model in the ivory chikankari co-ord in soft window light",
    caption: "The fit — fluid, and true to the body",
    x: "-24%",
    portrait: true,
  },
  {
    src: "/images/editorial/editorial-atelier.jpg",
    alt: "Hands working antique-gold zardozi at the embroidery frame",
    caption: "The hands — named, and fairly paid",
    x: "24%",
    portrait: false,
  },
  {
    src: "/images/editorial/look-03.jpg",
    alt: "Macro detail of antique-gold zardozi and seed-pearl embroidery",
    caption: "The cloth — embroidery you can read from across the room",
    x: "-6%",
    portrait: false,
  },
];

interface TunnelCardProps {
  look: Look;
  index: number;
  progress: MotionValue<number>;
}

function TunnelCard({ look, index, progress }: TunnelCardProps) {
  /* Windows must stay within [0,1]: framer delegates scroll-linked values to
     WAAPI, which throws on offsets outside that range. */
  const w0 = index * 0.2 + 0.02;
  const w1 = w0 + 0.5;
  const z = useTransform(progress, [w0, w1], [-1600, 720]);
  const opacity = useTransform(
    progress,
    [w0 + 0.015, w0 + 0.11, w1 - 0.12, w1 - 0.02],
    [0, 1, 1, 0]
  );
  const rotateZ = index % 2 === 0 ? -1.6 : 1.4;

  return (
    <motion.figure
      className={`t-card ${look.portrait ? "t-card--portrait" : ""}`}
      style={{ z, opacity, rotateZ, left: `calc(50% + ${look.x})` }}
      aria-hidden={false}
    >
      <div className="t-media">
        <Image
          src={look.src}
          alt={look.alt}
          fill
          sizes="(max-width: 700px) 62vw, 26vw"
          className="t-img"
        />
      </div>
      <figcaption className="t-caption">{look.caption}</figcaption>
    </motion.figure>
  );
}

export default function LookbookTunnel() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  /* Own scroll driver: progress measured live from the rect on every scroll
     event — immune to any cached-measurement or timeline quirks. */
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      progress.set(p);
    };
    let raf = 0;
    const onScroll = () => {
      update(); // synchronous — cheap single rect read
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update); // smooth tail
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [progress]);

  const endOpacity = useTransform(progress, [0.82, 0.94], [0, 1]);
  const endY = useTransform(progress, [0.82, 0.94], [26, 0]);
  const worldScale = useTransform(progress, [0, 1], [1, 1.12]);

  if (reduced) {
    return (
      <section className="tunnel tunnel--static" aria-label="The lookbook">
        <div className="tunnel-static-head">
          <p className="eyebrow">— An interlude —</p>
          <h2 className="tunnel-title">
            The maison, <em>in space.</em>
          </h2>
        </div>
        <div className="tunnel-static-grid">
          {LOOKS.map((l) => (
            <figure key={l.src}>
              <div className="t-media">
                <Image
                  src={l.src}
                  alt={l.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 33vw"
                  className="t-img"
                />
              </div>
              <figcaption className="t-caption">{l.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="tunnel" ref={ref} aria-label="The lookbook — a 3D interlude">
      <div className="tunnel-sticky">
        {/* content-visibility lets the browser skip this heavy scroll-driven
            subtree entirely while it is offscreen */}
        <motion.div className="tunnel-world" style={{ scale: worldScale }}>
          {LOOKS.map((l, i) => (
            <TunnelCard key={l.src} look={l} index={i} progress={progress} />
          ))}
        </motion.div>

        <div className="tunnel-eyebrow" aria-hidden="true">
          <span>— An interlude —</span>
        </div>

        <motion.div
          className="tunnel-end"
          style={{ opacity: endOpacity, y: endY }}
        >
          <p>
            Seventeen pieces.
            <br />
            <em>Then they are gone.</em>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
