import { ProductDetailSkeleton } from "@/components/Skeleton";

/**
 * Loading skeleton for the product detail page.
 */
export default function ProductLoading() {
  return (
    <div className="wrap" aria-busy="true" aria-label="Loading piece">
      <section className="product-detail">
        <ProductDetailSkeleton />
      </section>
    </div>
  );
}
