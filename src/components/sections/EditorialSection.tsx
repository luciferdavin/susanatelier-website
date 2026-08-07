"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";

export default function EditorialSection() {
  const bandRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const bandY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section className="editorial" aria-labelledby="campaign-title">
      <div className="container col-head ed-head">
        <div>
          <Reveal>
            <p className="eyebrow">( 03 ) — The Campaign</p>
          </Reveal>
          <Reveal>
            <h2 className="sec-title" id="campaign-title">
              The Seventeen,
              <br />
              <em>worn.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <p className="col-sub">
            Shot in natural light on real bodies. Zardozi, cording, and seed
            pearls — embroidery you can read from across the room.
          </p>
        </Reveal>
      </div>

      <div className="container ed-grid">
        <Reveal className="ed-fig ed-a" direction="up">
          <Link href="/collection" aria-label="Explore the Collection — ivory cording co-ord campaign look">
            <figure>
              <div className="ed-fig-inner">
                <Image
                  src="/images/editorial/look-01.jpg"
                  alt="Campaign look — ivory hand-embroidered linen co-ord with white cording and botanical embroidery"
                  width={1024}
                  height={1536}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                Look Nº 01 — ivory cording co-ord
                <span>hand-embroidered linen ✦ one of one</span>
              </figcaption>
            </figure>
          </Link>
        </Reveal>
        <Reveal className="ed-fig ed-b" direction="up" delay={0.12}>
          <Link href="/collection" aria-label="Explore the Collection — midnight garden velvet campaign look">
            <figure>
              <div className="ed-fig-inner">
                <Image
                  src="/images/editorial/look-02.jpg"
                  alt="Campaign look — deep midnight silk velvet jacket with multi-floral antique-gold hand embroidery"
                  width={1024}
                  height={1536}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <figcaption>
                Look Nº 02 — midnight garden velvet
                <span>multi-floral zardozi ✦ made by Farida</span>
              </figcaption>
            </figure>
          </Link>
        </Reveal>
        <Reveal className="ed-fig ed-c" direction="up" delay={0.08}>
          <Link href="/collection" aria-label="Explore the Collection — ivory organza campaign look">
            <figure>
              <div className="ed-fig-inner">
                <Image
                  src="/images/editorial/look-03.jpg"
                  alt="Campaign look — ivory organza dress with antique-gold scrollwork embroidery, worn seated in a dark studio"
                  width={1024}
                  height={1024}
                  sizes="100vw"
                />
              </div>
              <figcaption>
                Look Nº 03 — ivory scrollwork organza
                <span>antique-gold thread ✦ sixteen hours at the frame</span>
              </figcaption>
            </figure>
          </Link>
        </Reveal>
      </div>

      <div className="quote-band" ref={bandRef}>
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
