import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { createMetadata } from "@/lib/site";

export const metadata: Metadata = createMetadata({
  title: "Size & Fit — one chart, real bodies, free exchanges",
  description:
    "Susan Atelier size chart (XXS–4XL), how to measure, and our free size-exchange promise. Every piece is shot on real bodies so you see the drape.",
  path: "/fit",
  keywords: ["size chart Indian clothing", "XXS to 4XL", "free size exchange", "how to measure"],
});

/**
 * Fit page - Size chart, measuring guide, free exchanges
 * Static content page
 */
export default function FitPage() {
  return (
    <div className="wrap">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <span aria-hidden="true">›</span>
        <span aria-current="page">Size & Fit</span>
      </nav>

      <section className="fit-hero" aria-labelledby="fit-title">
        <p className="eyebrow">Size & Fit</p>
        <h1 id="fit-title">One chart. Real bodies.</h1>
        <p className="lede">
          We shoot every piece on real bodies — front, back, and in motion — so
          you see the drape. Our promise: XXS–4XL available across the line.
        </p>
      </section>

      <table className="sizechart" aria-describedby="sizechart-desc" style={{ marginTop: 'var(--space-4)' }}>
        <caption id="sizechart-desc" className="visually-hidden">
          Size chart with bust, waist, and hip measurements in centimeters
        </caption>
        <thead>
          <tr>
            <th scope="col">Size</th>
            <th scope="col">Bust (cm)</th>
            <th scope="col">Waist (cm)</th>
            <th scope="col">Hip (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>XXS</td><td>76–79</td><td>60–63</td><td>84–87</td></tr>
          <tr><td>XS</td><td>80–84</td><td>64–68</td><td>88–92</td></tr>
          <tr><td>S</td><td>85–89</td><td>69–73</td><td>93–97</td></tr>
          <tr><td>M</td><td>90–94</td><td>74–78</td><td>98–102</td></tr>
          <tr><td>L</td><td>95–99</td><td>79–83</td><td>103–107</td></tr>
          <tr><td>XL</td><td>100–104</td><td>84–88</td><td>108–112</td></tr>
          <tr><td>2XL</td><td>105–109</td><td>89–93</td><td>113–117</td></tr>
          <tr><td>3XL</td><td>110–114</td><td>94–98</td><td>118–122</td></tr>
          <tr><td>4XL</td><td>115–121</td><td>99–105</td><td>123–129</td></tr>
        </tbody>
      </table>

      <div className="fit-note">
        <h3 style={{ color: "var(--accent)" }}>How to measure</h3>
        <p>
          <strong>Bust:</strong> around the fullest part. <br />
          <strong>Waist:</strong> around the natural waist. <br />
          <strong>Hip:</strong> around the widest part.
        </p>
        <p>
          If between sizes, size up — our pieces are cut to drape. Not sure?
          Watch the 60-second measuring video, or message us on WhatsApp for a
          fit check.
        </p>
        <p>
          <strong>Free size exchange.</strong> Returns are the #1 margin-killer
          in fashion; we&apos;d rather get you the right size than take a return.
          Exchange any piece once, free.
        </p>
        <Link href="/collection" className="btn btn--outline">
          Find your size in the Collection →
        </Link>
      </div>
    </div>
  );
}