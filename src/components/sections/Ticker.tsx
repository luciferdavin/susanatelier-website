export default function Ticker() {
  return (
    <div className="ticker" aria-hidden="true">
      <div className="mq-track">
        {[0, 1].map((i) => (
          <div className="mq-group" key={i}>
            <span>First 50 receive a numbered hangtag (1/50)</span><span><i>✦</i></span>
            <span>Free size exchange</span><span><i>✦</i></span>
            <span>Genuine MRP — no fake discounts</span><span><i>✦</i></span>
            <span>Made by named hands in India</span><span><i>✦</i></span>
          </div>
        ))}
      </div>
    </div>
  );
}
