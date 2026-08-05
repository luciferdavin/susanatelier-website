import Link from "next/link";

/**
 * Global 404 — branded not-found page
 * Renders inside the root layout (Header + Footer present)
 */
export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeContent: "center",
        justifyItems: "center",
        textAlign: "center",
        padding: "96px 24px",
      }}
    >
      <div>
        {/* Gold pillar icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          style={{ marginBottom: "24px", color: "#8A6324" }}
        >
          <path
            d="M24 4C24 4 20 12 20 24C20 32 21.8 38 24 44C26.2 38 28 32 28 24C28 12 24 4 24 4Z"
            fill="currentColor"
            opacity="0.15"
          />
          <path
            d="M24 6L20 24L24 42L28 24L24 6Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <circle cx="24" cy="6" r="2" fill="currentColor" />
          <circle cx="24" cy="42" r="2" fill="currentColor" />
        </svg>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 500,
            fontSize: "clamp(2rem, 5vw, 2.75rem)",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          This page isn&apos;t here.
        </h1>

        <p
          style={{
            maxWidth: "40ch",
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2vw, 1.125rem)",
            lineHeight: 1.65,
            color: "var(--text-secondary)",
            marginBottom: "32px",
          }}
        >
          The piece you&apos;re looking for may have moved, or the address
          slipped a stitch. Let us show you the way back.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/"
            className="btn btn--primary"
          >
            Back to Home
          </Link>

          <Link
            href="/collection"
            className="btn btn--outline"
          >
            View the Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
