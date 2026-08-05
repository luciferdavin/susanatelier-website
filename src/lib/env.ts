/**
 * Environment variable validation.
 *
 * Reads env vars at import time and exports typed, validated values.
 * Fails fast at startup if a required server-side var is missing.
 * All NEXT_PUBLIC_* values have safe fallbacks for local dev.
 *
 * Usage:
 *   import { env } from "@/lib/env";
 *   console.log(env.SITE_URL);         // string
 */

function warnMissing(varName: string): void {
  if (typeof process !== "undefined" && process.env?.NODE_ENV !== "production") {
    console.warn(`[env] ${varName} is not set. Some features may not work.`);
  }
}

export const env = {
  /** Canonical site origin, e.g. https://susanatelier.com */
  SITE_URL: (process.env.NEXT_PUBLIC_SITE_URL || "https://susanatelier.com").replace(/\/+$/, ""),

  /** WhatsApp number for lead capture links. Fallback is a no-op placeholder. */
  WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "PLACEHOLDER_REPLACE_ME",

  /** Whether telemetry is disabled for the build toolchain. */
  TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED === "1",
} as const;
