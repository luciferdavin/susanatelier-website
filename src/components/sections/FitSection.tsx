import { Reveal } from "@/components/motion/Reveal";

const sizes = [
  ["XXS", "76–79", "60–63", "84–87"],
  ["XS", "80–84", "64–68", "88–92"],
  ["S", "85–89", "69–73", "93–97"],
  ["M", "90–94", "74–78", "98–102"],
  ["L", "95–99", "79–83", "103–107"],
  ["XL", "100–104", "84–88", "108–112"],
  ["2XL", "105–109", "89–93", "113–117"],
  ["3XL", "110–114", "94–98", "118–122"],
  ["4XL", "115–121", "99–105", "123–129"],
] as const;

export default function FitSection() {
  return (
    <section id="fit" className="fit">
      <div className="container fit-grid">
        <div>
          <Reveal>
            <p className="eyebrow">( 05 ) — Size &amp; Fit</p>
          </Reveal>
          <Reveal>
            <h2 className="sec-title">
              One chart.
              <br />
              <em>Real bodies.</em>
            </h2>
          </Reveal>
          <Reveal>
            <p className="lede">
              We shoot every piece on real bodies — front, back, and in motion —
              so you see the drape. Our promise: XXS–4XL available across the
              line.
            </p>
          </Reveal>
          <Reveal className="promise">
            <div>
              <h4>Free size exchange</h4>
              <p>
                Returns are the #1 margin-killer in fashion; we&apos;d rather
                get you the right size than take a return. Exchange any piece
                once, free.
              </p>
            </div>
          </Reveal>
          <Reveal className="measure">
            <b>BUST —</b>
            <p>around the fullest part.</p>
          </Reveal>
          <Reveal className="measure">
            <b>WAIST —</b>
            <p>around the natural waist.</p>
          </Reveal>
          <Reveal className="measure">
            <b>HIP —</b>
            <p>
              around the widest part. If between sizes, size up — our pieces are
              cut to drape.
            </p>
          </Reveal>
        </div>
        <Reveal>
          <table className="size-table" aria-label="Size chart in centimetres">
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust (cm)</th>
                <th>Waist (cm)</th>
                <th>Hip (cm)</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((r) => (
                <tr key={r[0]}>
                  {r.map((c, i) => (
                    <td key={i}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="fit-note">
            Not sure? Message us on WhatsApp for a fit check — we&apos;ll
            measure with you, not at you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
