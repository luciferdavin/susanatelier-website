"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "primary" | "outline" | "ghost" | "gold";
  size?: "default" | "lg";
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
}

const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      href,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    // Map variants and sizes to Vanilla CSS classes defined in globals.css
    const variantClass = {
      primary: "btn--solid",
      outline: "btn--outline",
      ghost: "btn--ghost",
      gold: "btn--gold",
    }[variant];

    const sizeClass = size === "lg" ? "btn--lg" : "";

    const combinedClassName = cn("btn", variantClass, sizeClass, className);

    if (href) {
      const { type, ...anchorProps } = props as any;
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled}
        className={combinedClassName}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
