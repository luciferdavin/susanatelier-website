"use client";

/**
 * Skeleton loader component for images and content
 * Provides loading states while images/content load
 * Used by: Collection page, Product detail page
 * No external API calls, no data schemas
 */

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

export function ImageSkeleton({ className, style }: SkeletonProps) {
  return (
    <div
      className={`skeleton-image ${className || ""}`}
      style={{
        background: "linear-gradient(90deg, var(--accent-soft) 25%, var(--gold-tint) 50%, var(--accent-soft) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "var(--radius-lg)",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <article className="product-card skeleton-card" aria-hidden="true">
      <div className="product-card__media">
        <ImageSkeleton style={{ width: "100%", height: "100%", aspectRatio: "3/4" }} />
      </div>
      <div className="product-card__body">
        <SkeletonLine width="70%" />
        <SkeletonLine width="90%" />
        <SkeletonLine width="40%" />
      </div>
    </article>
  );
}

interface SkeletonLineProps {
  width?: string;
  height?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function SkeletonLine({ width = "100%", height = "1rem", className, style }: SkeletonLineProps) {
  return (
    <div
      className={`skeleton-line ${className || ""}`}
      style={{
        width,
        height,
        background: "linear-gradient(90deg, var(--accent-soft) 25%, var(--gold-tint) 50%, var(--accent-soft) 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 1.5s infinite",
        borderRadius: "var(--radius-sm)",
        ...style,
      }}
      aria-hidden="true"
    />
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="pd" aria-hidden="true">
      <div className="pd-media">
        <ImageSkeleton style={{ width: "100%", aspectRatio: "3/4" }} />
      </div>
      <div>
        <SkeletonLine width="50%" height="2.5rem" style={{ marginBottom: "var(--space-3)" }} />
        <SkeletonLine width="80%" />
        <SkeletonLine width="40%" style={{ marginTop: "var(--space-3)", marginBottom: "var(--space-3)" }} />
        <div className="pd-actions">
          <SkeletonLine width="140px" height="3rem" />
          <SkeletonLine width="140px" height="3rem" />
        </div>
        <div className="transparency" style={{ marginTop: "var(--space-6)" }}>
          <SkeletonLine width="60%" style={{ marginBottom: "var(--space-3)" }} />
          {[...Array(5)].map((_, i) => (
            <SkeletonLine key={i} width="100%" style={{ marginBottom: "var(--space-2)" }} />
          ))}
        </div>
      </div>
    </div>
  );
}