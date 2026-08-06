"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="form-group">
        {label && (
          <label htmlFor={inputId} className="form-label">
            {label}
          </label>
        )}
        {hint && <span className="form-hint">{hint}</span>}
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "form-input",
            error && "form-input-error",
            className
          )}
          {...props}
        />
        {error && (
          <p className="form-error-banner" style={{ marginTop: "8px", padding: "8px 12px", fontSize: "0.9rem" }} role="alert">
            ✕ {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
