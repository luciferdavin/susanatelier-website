/**
 * Brand icon set — ported verbatim from the "New Website Design" spec's inline
 * SVG symbol defs (gold line-art matching the brand's logo sheet).
 * Server components; purely presentational. Sprig uses `currentColor`.
 */
import type { SVGProps } from "react";

function Base(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      fill="none"
      stroke="#8A6324"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    />
  );
}

export function HandIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M37 12 L37 47" />
      <path d="M37 12 C33 7 28 9 29.5 13 C31 17 36 16 37 13" />
      <path d="M37 12 C41 7 46 9 44.5 13 C43 17 38 16 37 13" />
      <path d="M37 16 C30 22 26 28 27.5 36" />
      <path d="M14 34 C12 40 13 46 18 50 C22 53 27 53 30 50" />
      <path d="M20 36 C24 34 28 34 31 37" />
      <path d="M19 41 C23 39 27 39 30 42" />
      <path d="M50 30 C52 36 51 42 46 46 C43 49 39 49 37 47" />
      <path d="M45 32 C42 30 39 31 38 34" />
    </Base>
  );
}

export function FormIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M32 6 V11" />
      <path d="M25 12 H39" />
      <path d="M25 12 C23 20 24 26 28 31 C24 37 23 43 26 48 H38 C41 43 40 37 36 31 C40 26 41 20 39 12" />
      <path d="M32 48 V56" />
      <path d="M24 58 H40" />
    </Base>
  );
}

export function NeedleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M20 50 L44 16" />
      <ellipse
        cx="45.5"
        cy="14"
        rx="2.4"
        ry="3.4"
        transform="rotate(35 45.5 14)"
      />
      <path d="M45 18 C52 25 42 30 44 38 C46 46 36 48 35 54" />
    </Base>
  );
}

export function LeafIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M32 8 C37 16 37 24 32 30 C27 24 27 16 32 8" />
      <path d="M20 15 C27 19 30 25 30 31 C23 29 19 23 20 15" />
      <path d="M44 15 C37 19 34 25 34 31 C41 29 45 23 44 15" />
      <path d="M15 29 C23 30 28 34 30 40 C22 40 16 36 15 29" />
      <path d="M49 29 C41 30 36 34 34 40 C42 40 48 36 49 29" />
      <path d="M32 30 V44" />
    </Base>
  );
}

export function InfinityIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Base {...props}>
      <path d="M14 32 C14 25 24 25 32 32 C40 39 50 39 50 32 C50 25 40 25 32 32 C24 39 14 39 14 32 Z" />
    </Base>
  );
}

export function SprigIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 120 200"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      {...props}
    >
      <path d="M60 196 C40 160 34 110 44 62 C50 34 60 16 70 6" />
      <path d="M46 60 C52 52 52 42 46 34 C40 42 40 52 46 60" transform="rotate(24 46 60)" />
      <path d="M42 92 C48 84 48 74 42 66 C36 74 36 84 42 92" transform="rotate(-52 42 92)" />
      <path d="M44 124 C50 116 50 106 44 98 C38 106 38 116 44 124" transform="rotate(-76 44 124)" />
      <path d="M52 156 C58 148 58 138 52 130 C46 138 46 148 52 156" transform="rotate(-98 52 156)" />
      <path d="M52 76 C58 68 58 58 52 50 C46 58 46 68 52 76" transform="rotate(56 52 76)" />
      <path d="M52 110 C58 102 58 92 52 84 C46 92 46 102 52 110" transform="rotate(78 52 110)" />
      <path d="M58 144 C64 136 64 126 58 118 C52 126 52 136 58 144" transform="rotate(100 58 144)" />
    </svg>
  );
}

export function DividerIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 320 16" aria-hidden="true" {...props}>
      <g stroke="#8A6324" strokeWidth={1} fill="none">
        <path d="M8 8 H140" />
        <path d="M180 8 H312" />
      </g>
      <path d="M160 1 L166 8 L160 15 L154 8 Z" fill="#8A6324" />
    </svg>
  );
}
