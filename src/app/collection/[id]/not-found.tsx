import Link from "next/link";

/**
 * Not-found UI for /collection/[id]
 */
export default function ProductNotFound() {
  return (
    <div className="wrap page-top">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/collection">Collection</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Not found</span>
      </nav>
      <section className="wrap" style={{ paddingTop: "var(--space-6)" }}>
        <h1>Piece not found</h1>
        <p className="lede">
          That piece isn&apos;t in the current collection.{" "}
          <Link href="/collection">Browse all 17 →</Link>
        </p>
      </section>
    </div>
  );
}
