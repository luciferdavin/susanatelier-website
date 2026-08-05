"use client";

/**
 * NotifyButton - client-side WhatsApp pre-order CTA
 * Extracted so the product detail page can be a server component.
 */

interface NotifyButtonProps {
  productName: string;
  price: number;
}

export default function NotifyButton({ productName, price }: NotifyButtonProps) {
  const handleNotify = () => {
    const message = `Hi Susan Atelier! I'd like to pre-order: ${productName} (₹${price.toLocaleString("en-IN")}). My email: [your email]`;
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "PLACEHOLDER_REPLACE_ME";
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      className="btn btn--primary"
      onClick={handleNotify}
      aria-label={`Pre-order ${productName} via WhatsApp`}
    >
      Pre-order via WhatsApp
    </button>
  );
}
