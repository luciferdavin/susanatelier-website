"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import AnimatedTitle from "@/components/motion/AnimatedTitle";
import Tilt from "@/components/motion/Tilt";

const SilkBackdrop = dynamic(() => import("@/components/three/SilkBackdrop"), {
  ssr: false,
});

export default function EditorialSection() {
  const bandRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  /* The photograph stays as the SSR/fallback layer; once the live silk
     has drawn its first frame we crossfade to it. */
  const [silkReady, setSilkReady] = useState(false);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const { scrollYProgress: gridProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });
  /* Lookbook drift — figures float at different velocities, and turn
     gently in space as they pass (the grid supplies the perspective). */
  const driftA = useTransform(gridProgress, [0, 1], [70, -40]);
  const driftB = useTransform(gridProgress, [0, 1], [110, -70]);
  const driftC = useTransform(gridProgress, [0, 1], [40, -40]);
  const rotA = useTransform(gridProgress, [0, 1], [5, -3]);
  const rotB = useTransform(gridProgress, [0, 1], [-7, 4]);
  const rotC = useTransform(gridProgress, [0, 1], [4, -4]);

  return (
    <section className="editorial" aria-labelledby="campaign-title">
      <div className="container col-head ed-head">
        <div>
          <Reveal>
            <p className="eyebrow">( 03 ) — The Campaign</p>
          </Reveal>
          <AnimatedTitle
            className="sec-title"
            id="campaign-title"
            lines={[<>The Seventeen,</>, <em>worn.</em>]}
          />
        </div>
        <Reveal>
          <p className="col-sub">
            Shot in natural light on real bodies. Zardozi, cording, and seed
            pearls — embroidery you can read from across the room.
          </p>
        </Reveal>
      </div>

      <div className="container ed-grid" ref={gridRef}>
        <Reveal className="ed-fig ed-a" direction="up">
          <Link href="/collection" aria-label="Explore the Collection — ivory cording co-ord campaign look">
            <motion.figure style={reduced ? undefined : { y: driftA, rotateY: rotA }}>
              <Tilt className="ed-tilt" max={4.5} perspective={1400}>
                <div className="ed-fig-inner">
                  <Image
                    src="/images/editorial/look-01.jpg"
                    alt="Campaign look — ivory hand-embroidered linen co-ord with white cording and botanical embroidery"
                    width={1024}
                    height={1536}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
              </Tilt>
              <figcaption>
                Look Nº 01 — ivory cording co-ord
                <span>hand-embroidered linen ✦ one of one</span>
              </figcaption>
            </motion.figure>
          </Link>
        </Reveal>
        <Reveal className="ed-fig ed-b" direction="up" delay={0.12}>
          <Link href="/collection" aria-label="Explore the Collection — midnight garden velvet campaign look">
            <motion.figure style={reduced ? undefined : { y: driftB, rotateY: rotB }}>
              <Tilt className="ed-tilt" max={4.5} perspective={1400}>
                <div className="ed-fig-inner">
                  <Image
                    src="/images/editorial/look-02.jpg"
                    alt="Campaign look — deep midnight silk velvet jacket with multi-floral antique-gold hand embroidery"
                    width={1024}
                    height={1536}
                    sizes="(max-width: 900px) 100vw, 50vw"
                  />
                </div>
              </Tilt>
              <figcaption>
                Look Nº 02 — midnight garden velvet
                <span>multi-floral zardozi ✦ made by Farida</span>
              </figcaption>
            </motion.figure>
          </Link>
        </Reveal>
        <Reveal className="ed-fig ed-c" direction="up" delay={0.08}>
          <Link href="/collection" aria-label="Explore the Collection — ivory organza campaign look">
            <motion.figure style={reduced ? undefined : { y: driftC, rotateY: rotC }}>
              <Tilt className="ed-tilt" max={4.5} perspective={1400}>
                <div className="ed-fig-inner">
                  <Image
                    src="/images/editorial/look-03.jpg"
                    alt="Campaign look — ivory organza dress with antique-gold scrollwork embroidery, worn seated in a dark studio"
                    width={1024}
                    height={1024}
                    sizes="100vw"
                  />
                </div>
              </Tilt>
              <figcaption>
                Look Nº 03 — ivory scrollwork organza
                <span>antique-gold thread ✦ sixteen hours at the frame</span>
              </figcaption>
            </motion.figure>
          </Link>
        </Reveal>
      </div>

      <div
        className={silkReady ? "quote-band quote-band--silk" : "quote-band"}
        ref={bandRef}
      >
        <motion.div
          className="qb-bg"
          style={reduced ? undefined : { y: bandY }}
          aria-hidden="true"
        >
          <Image
            src="/images/editorial/editorial-drape.jpg"
            alt=""
            fill
            sizes="100vw"
          />
        </motion.div>
        {/* live silk — mounted only when motion is welcome; calls back
            after its first painted frame so we can crossfade to it */}
        {!reduced && (
          <SilkBackdrop
            className="qb-3d"
            onReady={() => setSilkReady(true)}
          />
        )}
        <div className="qb-scrim" aria-hidden="true" />
        <div className="qb-inner">
          <Reveal>
            <blockquote className="qb-quote">
              &quot;One real thing, worn for years,
              <br />
              beats ten forgettable ones.&quot;
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="qb-cite">— Riya</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
