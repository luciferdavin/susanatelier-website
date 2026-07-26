"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SpotlightCardProps extends Omit<React.ComponentProps<"div">, "ref"> {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle";
}

export const SpotlightCard = React.forwardRef<HTMLDivElement, SpotlightCardProps>(
  ({ className, children, variant = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden rounded-lg bg-card border border-border transition-all duration-500 ease-soft",
        variant === "subtle" && "shadow-sm hover:shadow-md",
        variant === "default" && "shadow-lg hover:shadow-xl",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-opacity duration-500",
          variant === "default" &&
            "bg-gradient-to-br from-gold/20 via-transparent to-charcoal/10 opacity-0 hover:opacity-100",
          variant === "subtle" && "bg-gradient-to-br from-gold-tint/10 via-transparent to-transparent opacity-0 hover:opacity-100"
        )}
      />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  )
);

interface BackgroundBeamsProps {
  className?: string;
}

export function BackgroundBeams({ className }: BackgroundBeamsProps) {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden pointer-events-none", className)}>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gold/10 blur-[150px] animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-charcoal/5 blur-[150px] animate-pulse-slower" />
      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-taupe/5 blur-[100px] animate-pulse-slowest" />
    </div>
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  const transforms = {
    up: { initial: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
    down: { initial: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  };

  const { initial, visible } = transforms[direction];

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? direction === "up"
            ? "translateY(0)"
            : direction === "down"
            ? "translateY(0)"
            : direction === "left"
            ? "translateX(0)"
            : "translateX(0)"
          : direction === "up"
          ? "translateY(40px)"
          : direction === "down"
          ? "translateY(-40px)"
          : direction === "left"
          ? "translateX(40px)"
          : "translateX(-40px)",
        transition: "opacity 0.8s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface MovingBorderProps {
  children: React.ReactNode;
  className?: string;
  color?: "gold" | "charcoal" | "taupe";
  speed?: number;
}

export function MovingBorder({
  children,
  className,
  color = "gold",
  speed = 3000,
}: MovingBorderProps) {
  const colors = {
    gold: "bg-gradient-to-r from-gold via-gold-deep to-gold",
    charcoal: "bg-gradient-to-r from-charcoal via-gold to-charcoal",
    taupe: "bg-gradient-to-r from-taupe via-gold-tint to-taupe",
  };

  return (
    <div className={cn("relative rounded-lg", className)}>
      <div className="absolute inset-0 -z-10 rounded-lg p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div
          className={cn("absolute inset-0 rounded-lg", colors[color])}
          style={{
            animation: `border-radius-pulse ${speed}ms infinite ease-in-out`,
          }}
        />
      </div>
      <div className="relative bg-card rounded-[11px] p-6 group">{children}</div>
    </div>
  );
}

interface WavesBackgroundProps {
  className?: string;
}

export function WavesBackground({ className }: WavesBackgroundProps) {
  return (
    <div className={cn("fixed inset-0 -z-10 overflow-hidden pointer-events-none", className)}>
      <svg className="absolute bottom-0 left-0 w-full h-[200px]" preserveAspectRatio="none">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8A6324" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#E4D3B8" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#3B2412" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <path
          className="fill-[url(#waveGradient)]"
          d="M0,100 C200,50 400,150 600,100 C800,50 1000,150 1200,100 L1200,200 L0,200 Z"
          style={{
            animation: "wave 10s infinite ease-in-out",
          }}
        />
      </svg>
      <style jsx>{`
        @keyframes wave {
          0%, 100% {
            d: path("M0,100 C200,50 400,150 600,100 C800,50 1000,150 1200,100 L1200,200 L0,200 Z");
          }
          50% {
            d: path("M0,120 C200,70 400,170 600,120 C800,70 1000,170 1200,120 L1200,200 L0,200 Z");
          }
        }
      `}</style>
    </div>
  );
}

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
}

export function TextReveal({ children, className, delay = 0, stagger = 0.05 }: TextRevealProps) {
  const text = typeof children === "string" ? children : String(children);
  const words = text.split(" ");

  return (
    <span className={cn("inline-block", className)}>
      {words.map((word, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            marginRight: i === words.length - 1 ? 0 : "0.25em",
            opacity: 1,
            transform: "translateY(0)",
            transition: `opacity 0.5s cubic-bezier(0.22, 0.61, 0.36, 1), transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)`,
            transitionDelay: `${delay + i * stagger * 1000}ms`,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

interface MagneticHoverProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticHover({ children, className, strength = 20 }: MagneticHoverProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPosition({ x: x / strength, y: y / strength });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: "transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1)",
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  offset?: number;
}

export function ParallaxScroll({ children, className, speed = 0.5, offset = 0 }: ParallaxScrollProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [y, setY] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollY = window.scrollY;
      const elementTop = rect.top + scrollY;
      const distance = (scrollY - elementTop + window.innerHeight) * speed + offset;
      setY(distance);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div
        style={{
          transform: `translate3d(0, ${y}px, 0)`,
          transition: "transform 0s",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export { cn };