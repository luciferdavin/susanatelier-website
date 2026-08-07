import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import ParallaxY from "@/components/motion/ParallaxY";

export default function AboutSection() {
  return (
    <section id="about" className="about">
      <div className="container about-grid">
        <Reveal className="about-fig">
          <ParallaxY strength={40}>
            <Image
              src="/images/editorial/editorial-portrait.jpg"
              alt="Riya, founder of Susan Atelier, standing beside an embroidery frame in the atelier"
              width={1024}
              height={1536}
            />
            <p className="fig-cap">Riya, in the atelier</p>
          </ParallaxY>
        </Reveal>
        <div className="about-copy">
          <Reveal>
            <p className="eyebrow">( 06 ) — The Founder</p>
          </Reveal>
          <Reveal>
            <div className="about-name">Riya</div>
          </Reveal>
          <Reveal>
            <p>
              Susan Atelier began with a simple refusal: that &quot;pretty&quot;
              and &quot;honest&quot; can&apos;t sit in the same garment. I wanted
              clothes made by named hands, from cloth I could name, at a price I
              could defend.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Every collection starts with the embroiderers — Meena, Asha,
              Farida, Sara — not with a trend deck. The botanical motifs are
              drawn from my own garden. The silhouettes are current, never
              costume. The promise is that each piece is meant to be worn for
              years, not one occasion.
            </p>
          </Reveal>
          <Reveal>
            <blockquote>
              &quot;One real thing, worn for years, beats ten forgettable
              ones.&quot;
            </blockquote>
          </Reveal>
          <Reveal>
            <p className="about-sig">— Riya</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
