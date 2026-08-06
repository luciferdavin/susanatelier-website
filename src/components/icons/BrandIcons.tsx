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

interface MonogramProps extends SVGProps<SVGSVGElement> {
  size?: number;
  color?: 'black' | 'white' | 'auto';
  showThread?: boolean;
}

export function Monogram({ 
  size = 32, 
  color = 'auto', 
  showThread = false,
  ...props
}: MonogramProps) {
  const colorValue = color === 'auto' ? 'currentColor' : 
    color === 'white' ? '#F5EAE1' : '#3B2412';

  return (
    <svg 
      viewBox="0 0 24 24" 
      width={size} 
      height={size} 
      color={colorValue} 
      aria-hidden="true"
      {...props}
    >
      {/* S Spine */}
      <path d="M14,10 C14,12.21 12.21,14 10,14 C7.79,14 6,12.21 6,10 C6,7.79 7.79,6 10,6 C11.1,6 12,6.9 12,8 C12,9.1 11.1,10 10,10 C8.9,10 8,9.1 8,8 C8,6.9 8.9,6 10,6"
            stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      
      {/* A Legs */}
      <path d="M7.5,4 L12,20.3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M20.5,4 L12,20.3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
      
      {/* A Crossbar */}
      <path d="M7.5,12.3 L20.5,12.3" stroke="currentColor" strokeWidth="0.5" fill="none"/>
      
      {/* Gold Thread */}
      {showThread && (
        <line x1="12" y1="10" x2="12" y2="22" stroke="#8A6324" strokeWidth="0.5"/>
      )}
    </svg>
  );
}

interface SignatureProps extends SVGProps<SVGSVGElement> {
  color?: 'black' | 'white' | 'red' | 'auto';
  size?: 'sm' | 'md' | 'lg';
  showThread?: boolean;
}

const signatureSizeMap = {
  sm: { width: 120, height: 36, stroke: 2 },
  md: { width: 200, height: 60, stroke: 3 },
  lg: { width: 300, height: 90, stroke: 4 },
};

export function Signature({ 
  color = 'auto', 
  size = 'md', 
  showThread = false,
  ...props
}: SignatureProps) {
  const { width, height, stroke } = signatureSizeMap[size];
  const colorValue = color === 'auto' ? 'currentColor' : 
    color === 'white' ? '#F5EAE1' : 
    color === 'red' ? '#8A6324' : '#3B2412';

  return (
    <svg 
      viewBox="0 0 200 60" 
      width={width} 
      height={height} 
      color={colorValue} 
      aria-hidden="true"
      {...props}
    >
      {/* R */}
      <path d="M10,10 L10,50 M10,10 Q30,10 30,25 Q30,40 10,40 M30,40 L45,50"
            stroke="currentColor" strokeWidth={stroke} fill="none" 
            strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* i */}
      <path d="M60,10 L60,50" stroke="currentColor" strokeWidth={stroke * 0.75} 
            fill="none" strokeLinecap="round"/>
      <circle cx="60" cy="5" r={stroke} fill="currentColor"/>
      
      {/* y */}
      <path d="M80,10 L90,50 Q95,55 90,55 Q85,55 80,50 L80,65"
            stroke="currentColor" strokeWidth={stroke} fill="none" 
            strokeLinecap="round" strokeLinejoin="round"/>
      
      {/* a */}
      <path d="M110,40 Q110,25 125,25 Q140,25 140,40 Q140,55 125,55 Q110,55 110,40
               M125,25 L125,10"
            stroke="currentColor" strokeWidth={stroke} fill="none" 
            strokeLinecap="round" strokeLinejoin="round"/>
      
      {showThread && (
        <line x1="150" y1="30" x2="170" y2="30" 
              stroke="#8A6324" strokeWidth={stroke * 0.33} />
      )}
    </svg>
  );
}

