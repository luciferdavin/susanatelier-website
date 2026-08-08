import { Reveal } from "@/components/motion/Reveal";
import AnimatedTitle from "@/components/motion/AnimatedTitle";
import StackCards from "./StackCards";

export default function WhySection() {
  return (
    <section id="why" className="why">
      <div className="container why-head">
        <div>
          <Reveal>
            <p className="eyebrow">( 01 ) — The Standard</p>
          </Reveal>
          <AnimatedTitle
            className="sec-title"
            lines={["Proof,", <em>not promise.</em>]}
          />
        </div>
        <Reveal delay={0.12}>
          <p className="lede">
            &quot;Artisan-made&quot; means nothing if it stays a slogan. Scroll
            — the cards line up to make the argument: the maker, the cloth,
            the math. On every one of the seventeen.
          </p>
        </Reveal>
      </div>
      <div className="container">
        <StackCards />
      </div>
    </section>
  );
}
