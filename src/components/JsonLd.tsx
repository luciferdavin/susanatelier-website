import type { JsonLdBase } from "@/lib/schemas";

/**
 * Renders a JSON-LD <script> tag for the given schema.org object.
 *
 * This is a Server Component (no "use client") so it can be embedded by any
 * page — including server pages — without adding client JavaScript to the
 * bundle. The schema is serialized compactly (no whitespace) and escaped so
 * it is safe to inline.
 */
export default function JsonLd({ schema }: { schema: JsonLdBase }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; React escapes it for us.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
