import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
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
          <p className="eyebrow">( 03 ) — Our Craft</p>
        </Reveal>
        <Reveal>
          <h2 className="sec-title">
            Made by named hands,
            <br />
            <em>not machines.</em>
          </h2>
        </Reveal>
        <Reveal>
          <p className="craft-quote">
            Nearly every label claims &quot;premium, artisan, fair-pay.&quot;
            What&apos;s rare is proof: a face, a wage, a fabric you can name.
            That&apos;s the whole brand.
          </p>
        </Reveal>
        <div className="craft-grid">
          <Reveal className="craft-sticky">
            <figure>
              <Image
                src="/logos/Susan_Atelier_Logo_FullBlock.png"
                alt="Susan Atelier brand mark"
                width={640}
                height={800}
              />
            </figure>
            <figcaption>the frame, the thread, the name.</figcaption>
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
