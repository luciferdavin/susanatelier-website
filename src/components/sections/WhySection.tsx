import { Reveal } from "@/components/motion/Reveal";
import AnimatedTitle from "@/components/motion/AnimatedTitle";
import Hairline from "@/components/motion/Hairline";

export default function WhySection() {
  return (
    <section id="why" className="proof">
      <div className="container proof-grid">
        <div className="proof-sticky">
          <Reveal>
            <p className="eyebrow">( 01 ) — The Standard</p>
          </Reveal>
          <AnimatedTitle
            className="sec-title"
            lines={[<>Proof,</>, <em>not promise.</em>]}
          />
          <Reveal delay={0.15}>
            <p className="lede proof-lede">
              &quot;Artisan-made&quot; means nothing if it stays a slogan. So we
              publish the maker, the cloth, and the math — on every one of the
              seventeen.
            </p>
          </Reveal>
        </div>

        <div className="proof-list">
          <Reveal className="proof-item">
            <Hairline />
            <div className="pi-top">
              <span className="pi-num">Nº 01</span>
              <h3>The Maker</h3>
            </div>
            <p className="pi-copy">
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
          </Reveal>

          <Reveal className="proof-item">
            <Hairline delay={0.05} />
            <div className="pi-top">
              <span className="pi-num">Nº 02</span>
              <h3>The Cloth</h3>
            </div>
            <p className="pi-copy">
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
          </Reveal>

          <Reveal className="proof-item">
            <Hairline delay={0.1} />
            <div className="pi-top">
              <span className="pi-num">Nº 03</span>
              <h3>The Math</h3>
            </div>
            <p className="pi-copy">
              A transparency card accompanies every piece: fabric + embroidery
              + stitching = cost, then MRP. Never a fake &quot;was ₹X&quot;
              strikethrough — just a number we can defend out loud.
            </p>
            <table
              className="math-table math-table--light"
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
