import { ProductCardSkeleton } from "@/components/Skeleton";

/**
 * Loading skeleton for the collection page.
 */
export default function CollectionLoading() {
  return (
    <div className="wrap" aria-busy="true" aria-label="Loading collection">
      <section className="wrap" style={{ paddingTop: "var(--space-6)" }}>
        <p className="eyebrow">The Collection</p>
        <h1>Seventeen pieces, already made</h1>
        <div className="grid" style={{ marginTop: "var(--space-6)" }}>
          {Array.from({ length: 8 }, (_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
