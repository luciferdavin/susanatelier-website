import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Alex_Brush } from "next/font/google";
import "../styles/globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Ticker from "@/components/sections/Ticker";
import Preloader from "@/components/sections/Preloader";
import CustomCursor from "@/components/sections/CustomCursor";
import { getSiteUrl, OG_IMAGE, siteConfig } from "@/lib/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Susan Atelier — Made by named hands, worn for years",
    template: "%s | Susan Atelier",
  },
  description:
    "Susan Atelier — contemporary Indian occasion wear made by named hands. 17-piece launch collection featuring co-ords, occasionwear, and separates.",
  keywords: [
    "Indian occasion wear",
    "handmade clothing",
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
      "Contemporary Indian occasion wear, made by named hands. 17-piece launch collection. Join the waitlist for early access.",
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
      "Contemporary Indian occasion wear, made by named hands. 17-piece launch collection.",
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
    { media: "(prefers-color-scheme: light)", color: "#F5EAE1" },
    { media: "(prefers-color-scheme: dark)", color: "#3B2412" },
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
    <html lang="en" className={`${playfair.variable} ${cormorant.variable} ${alexBrush.variable}`}>
      <head>
        <link rel="icon" href="/logos/trans/Susan_Atelier_Favicon_512-trans.png" />
      </head>
      <body>
        <Preloader />
        <CustomCursor />
        <Ticker />
        <Header />
        <main id="main-content" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
