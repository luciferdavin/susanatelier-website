"use client";

import { useEffect } from "react";

/**
 * Global error boundary — branded error page with "Try Again" button
 * Renders inside the root layout (Header + Footer present)
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Error logged by error boundary system
  }, [error]);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeContent: "center",
        justifyItems: "center",
        textAlign: "center",
        padding: "180px 24px 96px",
      }}
    >
      <div>
        {/* Gold warning icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          aria-hidden="true"
          style={{ marginBottom: "24px", color: "#8A6324" }}
        >
          <path
            d="M24 4L4 42H44L24 4Z"
            fill="currentColor"
            opacity="0.1"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M24 18V30"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <circle cx="24" cy="36" r="1.5" fill="currentColor" />
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
          Something went wrong.
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
          We encountered an unexpected issue. Please try again — if the
          problem persists, reach out to us at{" "}
          <a href="mailto:hello@susanatelier.com" style={{ color: "var(--accent)" }}>
            hello@susanatelier.com
          </a>.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            type="button"
            className="btn btn--primary"
            onClick={reset}
          >
            Try Again
          </button>

          <a
            href="/"
            className="btn btn--outline"
          >
            Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
