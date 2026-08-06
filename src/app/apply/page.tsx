import type { Metadata } from "next";
import ApplicationForm from "@/components/application/ApplicationForm";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Become a Custodian — Application",
  description:
    "Apply to become a Susan Atelier Custodian. Align your values, share your size preferences, and secure early waitlist access to Chapter 1.",
  path: "/apply",
  keywords: [
    "Susan Atelier waitlist",
    "become a custodian",
    "artisan occasionwear application",
    "Indian occasionwear waitlist",
  ],
});

export default function ApplyPage() {
  return (
    <div className="apply-container">
      <ApplicationForm />
    </div>
  );
}
