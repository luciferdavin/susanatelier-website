import type { Metadata } from "next";
import { generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema, generateHowToSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import Hero from "@/components/sections/Hero";
import ValuesBand from "@/components/sections/ValuesBand";
import Marquee from "@/components/sections/Marquee";
import WhySection from "@/components/sections/WhySection";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import CraftSection from "@/components/sections/CraftSection";
import FitSection from "@/components/sections/FitSection";
import AboutSection from "@/components/sections/AboutSection";
import JoinSection from "@/components/sections/JoinSection";

export const metadata: Metadata = {
  title: "Contemporary Indian Occasion Wear — 17-Piece Collection",
  description:
    "Susan Atelier — contemporary Indian occasion wear made by named hands. 17-piece launch collection featuring co-ords, occasionwear, and separates. Join the waitlist for early access.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const organizationSchema = generateOrganizationSchema();
  const webSiteSchema = generateWebSiteSchema();
  const faqSchema = generateFAQSchema();
  const howToSchema = generateHowToSchema();

  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={webSiteSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={howToSchema} />
      <a className="skip" href="#collection">
        Skip to collection
      </a>

      <Hero />
      <ValuesBand />
      <Marquee />
      <WhySection />

      <section
        id="collection"
        className="collection"
        aria-labelledby="collection-title"
      >
        <div className="container col-head">
          <div>
            <Reveal>
              <p className="eyebrow">( 02 ) — The Launch Collection</p>
            </Reveal>
            <Reveal>
              <h2 className="sec-title" id="collection-title">
                Seventeen pieces,
                <br />
                <em>already made.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal>
            <p className="col-sub">
              One-of-a-kind and finished. Tap any piece for its fabric, the
              maker, and an honest price breakdown.
            </p>
          </Reveal>
        </div>
        <div className="container">
          <CollectionShowcase />
        </div>
      </section>

      <CraftSection />
      <FitSection />
      <AboutSection />
      <JoinSection />
    </>
  );
}
