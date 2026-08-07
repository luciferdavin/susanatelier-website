export default function Marquee() {
  return (
    <div className="band" aria-hidden="true">
      <div className="mq-track">
        {[0, 1].map((i) => (
          <div className="mq-group" key={i}>
            <span><em>Hand-embroidered in India.</em></span><span><i>✦</i></span>
            <span><em>One-of-one, never restocked.</em></span><span><i>✦</i></span>
            <span><em>The maker named on every label.</em></span><span><i>✦</i></span>
            <span><em>Worn for years, not seasons.</em></span><span><i>✦</i></span>
          </div>
        ))}
      </div>
    </div>
  );
}
