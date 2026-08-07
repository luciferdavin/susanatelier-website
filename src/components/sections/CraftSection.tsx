import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import AnimatedTitle from "@/components/motion/AnimatedTitle";
import ParallaxY from "@/components/motion/ParallaxY";
import Counters from "./Counters";

const artisans = [
  {
    num: "01",
    name: "Meena",
    place: "Lucknow — white cording & seed-pearl botanicals",
    yrs: "14",
    note: "yrs at the frame",
  },
  {
    num: "02",
    name: "Asha",
    place: "Jaipur — dori florals & fine needlework",
    yrs: "11",
    note: "yrs at the frame",
  },
  {
    num: "03",
    name: "Farida",
    place: "Kolkata — velvet & multi-floral zardozi",
    yrs: "17",
    note: "yrs at the frame",
  },
  {
    num: "04",
    name: "Sara",
    place: "Mumbai — pearl setting & final finishing",
    yrs: "9",
    note: "yrs at the frame",
  },
] as const;

const cloths = [
  {
    t: "Linen",
    d: "Cool, honest, ages like paper — softer every year you wear it.",
  },
  {
    t: "Cotton",
    d: "Crisp poplin and voile, breathable for long occasions and longer lives.",
  },
  {
    t: "Silk",
    d: "Velvet and tulle for the pieces that carry the evening.",
  },
] as const;

export default function CraftSection() {
  return (
    <section id="craft" className="craft">
      <div className="container">
        <Reveal>
          <p className="eyebrow eyebrow--light">( 04 ) — The Craft</p>
        </Reveal>
        <AnimatedTitle
          className="sec-title"
          lines={[<>Hours at the frame,</>, <em>printed on the price tag.</em>]}
        />
        <Reveal>
          <p className="craft-quote">
            Nearly every maison claims handwork. What&apos;s rare is proof: a
            face, a wage, a cloth you can name. Meet the four hands behind the
            seventeen.
          </p>
        </Reveal>
        <div className="craft-grid">
          <Reveal className="craft-sticky">
            <ParallaxY strength={36}>
              <figure>
                <Image
                  src="/images/editorial/editorial-atelier.jpg"
                  alt="Hands working antique-gold zardozi embroidery on ivory silk stretched across a wooden frame"
                  width={1536}
                  height={1024}
                />
              </figure>
              <figcaption>the frame, the thread, the name.</figcaption>
            </ParallaxY>
          </Reveal>
          <div>
            {artisans.map((a) => (
              <Reveal className="artisan" key={a.num}>
                <span className="a-num">{a.num}</span>
                <div>
                  <h3>{a.name}</h3>
                  <p>{a.place}</p>
                </div>
                <div className="a-stat">
                  <b>{a.yrs}</b>
                  {a.note}
                </div>
              </Reveal>
            ))}
            <div className="cloth-row">
              {cloths.map((c) => (
                <Reveal key={c.t}>
                  <div>
                    <h4>{c.t}</h4>
                    <p>{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <Counters />
      </div>
    </section>
  );
}
