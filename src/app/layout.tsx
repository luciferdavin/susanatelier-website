import type { Metadata, Viewport } from "next";
/* Self-hosted brand fonts (Fontsource) — hermetic builds, real italics.
   Family names match the --font-* tokens defined in globals.css :root. */
import "@fontsource/playfair-display/400.css";
import "@fontsource/playfair-display/400-italic.css";
import "@fontsource/playfair-display/500.css";
import "@fontsource/playfair-display/500-italic.css";
import "@fontsource/playfair-display/600.css";
import "@fontsource/playfair-display/600-italic.css";
import "@fontsource/playfair-display/700.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/cormorant-garamond/500.css";
import "@fontsource/cormorant-garamond/500-italic.css";
import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/600-italic.css";
import "@fontsource/alex-brush/400.css";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Preloader from "@/components/sections/Preloader";
import CustomCursor from "@/components/sections/CustomCursor";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { getSiteUrl, OG_IMAGE, siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "Susan Atelier — Hand-Embroidered Indian Occasion Wear",
    template: "%s | Susan Atelier",
  },
  description:
    "Susan Atelier — a quiet-luxury Indian occasion wear maison. Seventeen one-of-one hand-embroidered pieces, made by named hands, worn for years.",
  keywords: [
    "Indian occasion wear",
    "hand-embroidered clothing",
    "quiet luxury fashion",
    "artisan fashion",
    "linen co-ords",
    "contemporary ethnic wear",
    "transparent pricing",
    "fair wage fashion",
  ],
  authors: [{ name: "Susan Atelier" }],
  creator: "Susan Atelier",
  publisher: "Susan Atelier",
  formatDetection: { email: false, address: false, telephone: false },
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: getSiteUrl(),
    siteName: siteConfig.name,
    title: "Susan Atelier — Made by named hands",
    description:
      "Hand-embroidered Indian occasion wear, made by named hands. Seventeen one-of-one pieces. Join the waitlist for early access.",
    images: [
      {
        url: OG_IMAGE.path,
        width: OG_IMAGE.width,
        height: OG_IMAGE.height,
        alt: OG_IMAGE.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Susan Atelier — Made by named hands",
    description:
      "Hand-embroidered Indian occasion wear, made by named hands. Seventeen one-of-one pieces.",
    images: [OG_IMAGE.path],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#1E1106" },
    { media: "(prefers-color-scheme: dark)", color: "#1E1106" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logos/trans/Susan_Atelier_Favicon_512-trans.png" />
        <link rel="alternate" type="application/rss+xml" title="Susan Atelier Collection" href="/feed.xml" />
      </head>
      <body>
        <GoogleAnalytics />
        <Preloader />
        <CustomCursor />
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
