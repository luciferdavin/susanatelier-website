export default function Marquee() {
  return (
    <div className="band" aria-hidden="true">
      <div className="mq-track">
        {[0, 1].map((i) => (
          <div className="mq-group" key={i}>
            <span><em>Timeless.</em></span><span><i>✦</i></span><span><em>Feminine.</em></span><span><i>✦</i></span><span><em>Refined.</em></span><span><i>✦</i></span><span><em>Made by named hands.</em></span><span><i>✦</i></span>
          </div>
        ))}
      </div>
    </div>
  );
}
