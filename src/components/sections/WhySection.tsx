import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { SprigIcon } from "@/components/icons/BrandIcons";

export default function WhySection() {
  return (
    <section id="why" className="why">
      <div className="container why-head">
        <div>
          <Reveal>
            <p className="eyebrow">( 01 ) — Why Susan Atelier</p>
          </Reveal>
          <Reveal>
            <h2 className="sec-title">
              Made by named hands,
              <br />
              <em>not machines.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal>
          <p className="lede">
            &quot;Artisan-made&quot; means nothing if it stays a slogan. So we
            show you the maker, the cloth, and the math — on every piece.
          </p>
        </Reveal>
      </div>
      <div className="container stack">
        {/* Card 1: The Maker — aside uses monogram PNG */}
        <Reveal className="stack-card">
          <div>
            <span className="card-num">Nº 01</span>
            <h3>The Maker</h3>
            <p className="copy">
              A short film of the embroiderer at work — name on screen, fair-pay
              noted. You&apos;ll meet Meena in Lucknow, Asha in Jaipur, Farida in
              Kolkata, Sara in Mumbai. Proof, not a promise.
            </p>
            <div className="chips">
              <span>4 ateliers</span>
              <span>100% named makers</span>
              <span>Fair pay, on screen</span>
            </div>
          </div>
          <figure className="card-aside">
            <Image
              src="/logos/trans/Susan_Atelier_Logo_Monogram-trans.png"
              alt="Susan Atelier monogram"
              width={170}
              height={170}
            />
            <figcaption>named, on every label</figcaption>
          </figure>
        </Reveal>
        {/* Card 2: The Cloth — aside uses SprigIcon in a circle */}
        <Reveal className="stack-card">
          <div>
            <span className="card-num">Nº 02</span>
            <h3>The Cloth</h3>
            <p className="copy">
              Linen, cotton, and silk — breathable, natural, chosen to last. We
              name the fibre on every label, because fabric is the difference
              between a year and a season.
            </p>
            <div className="chips">
              <span>Linen</span>
              <span>Cotton</span>
              <span>Silk</span>
              <span>Named on every label</span>
            </div>
          </div>
          <figure className="card-aside">
            <span className="card-sprig">
              <SprigIcon />
            </span>
            <figcaption>cloth you can name</figcaption>
          </figure>
        </Reveal>
        {/* Card 3: The Math — no aside */}
        <Reveal className="stack-card">
          <div>
            <span className="card-num">Nº 03</span>
            <h3>The Math</h3>
            <p className="copy">
              A transparency card per piece: fabric + embroidery + stitching =
              cost, then MRP. No fake &quot;was ₹X&quot; strikethroughs — just
              an honest number.
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
        </Reveal>
      </div>
    </section>
  );
}
