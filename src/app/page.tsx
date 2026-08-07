import type { Metadata } from "next";
import { generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema, generateHowToSchema } from "@/lib/schemas";
import JsonLd from "@/components/JsonLd";
import { Reveal } from "@/components/motion/Reveal";
import AnimatedTitle from "@/components/motion/AnimatedTitle";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import ValuesBand from "@/components/sections/ValuesBand";
import Manifesto from "@/components/sections/Manifesto";
import WhySection from "@/components/sections/WhySection";
import CollectionShowcase from "@/components/sections/CollectionShowcase";
import EditorialSection from "@/components/sections/EditorialSection";
import CraftSection from "@/components/sections/CraftSection";
import FitSection from "@/components/sections/FitSection";
import AboutSection from "@/components/sections/AboutSection";
import JoinSection from "@/components/sections/JoinSection";

export const metadata: Metadata = {
  title: "Hand-Embroidered Indian Occasion Wear — Collection Nº 01",
  description:
    "Susan Atelier — a quiet-luxury Indian occasion wear maison. Seventeen one-of-one hand-embroidered pieces, made by named hands in India. Join the waitlist for early access.",
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
      <Marquee />
      <ValuesBand />
      <Manifesto />
      <WhySection />

      <section
        id="collection"
        className="collection"
        aria-labelledby="collection-title"
      >
        <div className="container col-head">
          <div>
            <Reveal>
              <p className="eyebrow">( 02 ) — Collection Nº 01</p>
            </Reveal>
            <AnimatedTitle
              className="sec-title"
              id="collection-title"
              lines={[<>Seventeen pieces,</>, <em>already made.</em>]}
            />
          </div>
          <Reveal>
            <p className="col-sub">
              One-of-a-kind and finished. Open any piece for its cloth, its
              maker, and an honest price breakdown.
            </p>
          </Reveal>
        </div>
        <div className="container">
          <CollectionShowcase />
        </div>
      </section>

      <EditorialSection />
      <CraftSection />
      <FitSection />
      <AboutSection />
      <JoinSection />
    </>
  );
}
