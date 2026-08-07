"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

/**
 * StackCards — the maison ledger stacking effect. Three cards (The Maker,
 * The Cloth, The Math) stick one over the other as you scroll; each covered
 * card gently scales down and dims beneath the one arriving on top.
 * Sticky positioning + per-card colors come from the .stack CSS block.
 */

interface StackCardProps {
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}

function StackCard({ index, total, progress, children }: StackCardProps) {
  const reduced = useReducedMotion();
  const targetScale = 1 - (total - 1 - index) * 0.04;
  const range: [number, number] = [index / total, 1];
  const scale = useTransform(progress, range, [1, targetScale]);
  const shade = useTransform(
    progress,
    range,
    [1, index === total - 1 ? 1 : 0.88]
  );
  const filter = useTransform(shade, (v) => `brightness(${v})`);

  if (reduced) {
    return <div className="stack-card">{children}</div>;
  }

  return (
    <motion.div
      className="stack-card"
      style={{ scale, filter, transformOrigin: "top center" }}
    >
      {children}
    </motion.div>
  );
}

export default function StackCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const total = 3;

  return (
    <div className="stack" ref={containerRef}>
      <StackCard index={0} total={total} progress={scrollYProgress}>
        <div>
          <span className="card-num">Nº 01</span>
          <h3>The Maker</h3>
          <p className="copy">
            Every piece carries the name and city of the embroiderer who made
            it — Meena in Lucknow, Asha in Jaipur, Farida in Kolkata, Sara in
            Mumbai — alongside the wage she was paid, measured against the
            local living wage. Named hands, not anonymous labor.
          </p>
          <div className="chips">
            <span>4 ateliers</span>
            <span>100% named makers</span>
            <span>Wage on every label</span>
          </div>
        </div>
        <figure className="card-aside">
          <Image
            src="/images/editorial/editorial-atelier.jpg"
            alt="Hands working antique-gold zardozi embroidery at the frame"
            width={170}
            height={170}
          />
          <figcaption>named, on every label</figcaption>
        </figure>
      </StackCard>

      <StackCard index={1} total={total} progress={scrollYProgress}>
        <div>
          <span className="card-num">Nº 02</span>
          <h3>The Cloth</h3>
          <p className="copy">
            Linen, cotton, and silk — breathable, natural, chosen to age
            gracefully. The fibre is named on every label, because fabric is
            the difference between a keepsake and a season.
          </p>
          <div className="chips">
            <span>Linen</span>
            <span>Cotton</span>
            <span>Silk</span>
            <span>Named on every label</span>
          </div>
        </div>
        <figure className="card-aside">
          <Image
            src="/images/editorial/editorial-drape.jpg"
            alt="Draped ivory silk with antique-gold botanical hand embroidery and seed pearls"
            width={170}
            height={170}
          />
          <figcaption>cloth you can name</figcaption>
        </figure>
      </StackCard>

      <StackCard index={2} total={total} progress={scrollYProgress}>
        <div>
          <span className="card-num">Nº 03</span>
          <h3>The Math</h3>
          <p className="copy">
            A transparency card accompanies every piece: fabric + embroidery +
            stitching = cost, then MRP. Never a fake &quot;was ₹X&quot;
            strikethrough — just a number we can defend out loud.
          </p>
          <table
            className="math-table"
            aria-label="Example price breakdown for the Midnight Botanical Co-ord"
          >
            <tbody>
              <tr>
                <td>Fabric — linen 55 / cotton 45</td>
                <td>₹1,480</td>
              </tr>
              <tr>
                <td>Hand embroidery — Meena&apos;s wage</td>
                <td>₹420</td>
              </tr>
              <tr>
                <td>Stitching &amp; finishing</td>
                <td>₹610</td>
              </tr>
              <tr className="total">
                <td>Cost ₹2,510 → MRP (incl. 18% GST)</td>
                <td>₹3,999</td>
              </tr>
            </tbody>
          </table>
          <p className="math-note">Always honest. Never a fake discount.</p>
        </div>
      </StackCard>
    </div>
  );
}
