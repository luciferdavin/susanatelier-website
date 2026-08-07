import { Reveal } from "@/components/motion/Reveal";
import AnimatedTitle from "@/components/motion/AnimatedTitle";
import { SprigIcon } from "@/components/icons/BrandIcons";
import WaitlistCard from "./WaitlistCard";

const PERKS = [
  "24-hour early access before the public drop",
  "Numbered hangtag (1/50) for the first fifty",
  "Free size exchange, once, on any piece",
  "Genuine MRP — no fake discounts, ever",
];

export default function JoinSection() {
  return (
    <section id="join" className="join">
      <SprigIcon className="sprig-bg" />
      <div className="container join-grid">
        <div>
          <Reveal>
            <p className="eyebrow eyebrow--light">( 07 ) — Early Access</p>
          </Reveal>
          <AnimatedTitle
            className="sec-title"
            lines={[<>Join the waitlist.</>, <em>Be first through the door.</em>]}
          />
          <Reveal>
            <p
              style={{
                marginTop: 22,
                maxWidth: 500,
                color: "rgba(245,234,225,.8)",
                fontSize: "1.1rem",
              }}
            >
              Join for 24 hours of early access before the public drop — and a
              numbered hangtag if you&apos;re in the first 50.
            </p>
          </Reveal>
          <ul className="perks">
            {PERKS.map((t) => (
              <Reveal key={t} direction="none">
                <li>
                  <i>✦</i>
                  {t}
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
        <Reveal direction="none">
          <WaitlistCard />
        </Reveal>
      </div>
    </section>
  );
}
