import type { Metadata } from "next";
import JoinForm from "@/components/JoinForm";
import { createMetadata } from "@/lib/site";

/**
 * Join/Waitlist page (server) — owns metadata.
 * Interactive form lives in the client <JoinForm /> component.
 */
export const metadata: Metadata = createMetadata({
  title: "Join the Waitlist — early access",
  description:
    "Join the Susan Atelier waitlist for 24 hours of early access before the public drop, and a numbered hangtag if you're in the first 50. No fake discounts — genuine MRP.",
  path: "/join",
  keywords: [
    "fashion waitlist India",
    "early access clothing drop",
    "Indian occasion wear preorder",
  ],
});

export default function JoinPage() {
  return <JoinForm />;
}
