import HeroTitle from "@/components/sections/HeroTitle";
import HeroVisual from "@/components/sections/HeroVisual";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-mark" aria-hidden="true">S</div>
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Contemporary Indian occasion wear — pre-launch</p>
          <HeroTitle />
          <p className="hero-sub">
            One-of-a-kind pieces, already made and finished — for the woman
            who'd rather wear one real thing than ten forgettable ones. Every
            label carries the name of the artisan who embroidered it.
          </p>
          <div className="hero-cta">
            <Button href="/#join" variant="primary">
              Join the Waitlist <span>→</span>
            </Button>
            <Button href="/apply" variant="outline">
              Become a Custodian
            </Button>
            <a href="#collection" className="link-underline" style={{ marginLeft: "10px" }}>
              Browse the Collection
            </a>
          </div>
          <div className="hero-meta">
            <span><i>✦</i>Timeless</span>
            <span><i>✦</i>Feminine</span>
            <span><i>✦</i>Refined</span>
            <span><i>✦</i>Hand-finished</span>
          </div>
        </div>
        <div className="hero-visual">
          <HeroVisual />
          <div className="hero-side">EST. INDIA — HAND FINISHED — FAIR PAY</div>
        </div>
      </div>
    </section>
  );
}
