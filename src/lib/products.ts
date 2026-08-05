/**
 * Product data - Single source of truth for the 17-piece launch collection
 * Used by: Collection page, Product Detail page, ProductCard component
 * Static data - no external API calls
 */

export interface Product {
  id: number;
  name: string;
  cat: "coord" | "occasion" | "separate" | "entry";
  fab: string;
  price: number;
  gst: 5 | 18;
  hero?: boolean;
  entry?: boolean;
  maker: string;
  cloth: string;
  embroidery: string;
  wage: string;
  mrp: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Midnight Botanical Co-ord",
    cat: "coord",
    fab: "Premium linen/cotton · hand-embroidered white cording & seed pearls",
    price: 3999,
    gst: 18,
    hero: true,
    maker: "Meena, Lucknow",
    cloth: "Linen 55% / Cotton 45%",
    embroidery: "White cording & seed-pearl floral",
    wage: "₹420 (vs ₹300 living wage)",
    mrp: "₹3,999",
  },
  {
    id: 2,
    name: "The Midnight Garden Velvet Jacket",
    cat: "occasion",
    fab: "Silk-rayon velvet · multi-floral",
    price: 8500,
    gst: 18,
    maker: "Farida, Kolkata",
    cloth: "Silk-rayon velvet",
    embroidery: "Multi-floral hand embroidery",
    wage: "₹680",
    mrp: "₹8,500",
  },
  {
    id: 3,
    name: "The Azure Leaf Linen Co-ord",
    cat: "coord",
    fab: "Linen-cotton blend · blue-on-blue leaf",
    price: 3500,
    gst: 18,
    maker: "Meena, Lucknow",
    cloth: "Linen-cotton blend",
    embroidery: "Blue-on-blue leaf",
    wage: "₹380",
    mrp: "₹3,500",
  },
  {
    id: 4,
    name: "The Olive Sequin Ruched Dress",
    cat: "occasion",
    fab: "Illusion tulle/lycra · sequin ruching",
    price: 7200,
    gst: 18,
    maker: "Sara, Mumbai",
    cloth: "Illusion tulle / lycra",
    embroidery: "Sequin ruching",
    wage: "₹610",
    mrp: "₹7,200",
  },
  {
    id: 5,
    name: "The Powder Blue Graphic Floral Set",
    cat: "coord",
    fab: "Cotton poplin/twill · graphic floral",
    price: 2800,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "Cotton poplin / twill",
    embroidery: "Graphic floral",
    wage: "₹340",
    mrp: "₹2,800",
  },
  {
    id: 6,
    name: "The Cottage Bloom Bell Sleeve Shirt",
    cat: "separate",
    fab: "100% cotton · bell sleeve",
    price: 3200,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "100% cotton",
    embroidery: "Bell-sleeve smocking",
    wage: "₹360",
    mrp: "₹3,200",
  },
  {
    id: 7,
    name: "The Chambray Tonal Flora Shirt",
    cat: "separate",
    fab: "Cotton poplin/chambray · tonal flora",
    price: 3200,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "Cotton poplin / chambray",
    embroidery: "Tonal flora",
    wage: "₹360",
    mrp: "₹3,200",
  },
  {
    id: 8,
    name: "The Aegean Pearl Two-Piece",
    cat: "coord",
    fab: "Linen-viscose/cotton twill · pearl detail",
    price: 4500,
    gst: 18,
    maker: "Meena, Lucknow",
    cloth: "Linen-viscose / cotton twill",
    embroidery: "Pearl detail",
    wage: "₹470",
    mrp: "₹4,500",
  },
  {
    id: 9,
    name: "The Cobalt Dori Floral Shirt",
    cat: "separate",
    fab: "Crisp white cotton poplin · dori floral",
    price: 3200,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "Crisp white cotton poplin",
    embroidery: "Dori floral",
    wage: "₹360",
    mrp: "₹3,200",
  },
  {
    id: 10,
    name: "The Ivory Heirloom Scroll Dress",
    cat: "occasion",
    fab: "Heavy cotton canvas/linen + organza · scrollwork",
    price: 8800,
    gst: 18,
    maker: "Farida, Kolkata",
    cloth: "Heavy cotton canvas / linen + organza",
    embroidery: "Scrollwork",
    wage: "₹720",
    mrp: "₹8,800",
  },
  {
    id: 11,
    name: "The Coral Reef Pearl Wrap Top",
    cat: "separate",
    fab: "Cotton poplin/taffeta · pearl wrap",
    price: 3200,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "Cotton poplin / taffeta",
    embroidery: "Pearl wrap",
    wage: "₹360",
    mrp: "₹3,200",
  },
  {
    id: 12,
    name: "The Ink Sketch Floral Shirt",
    cat: "separate",
    fab: "Crisp white cotton poplin · ink floral",
    price: 3200,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "Crisp white cotton poplin",
    embroidery: "Ink floral",
    wage: "₹360",
    mrp: "₹3,200",
  },
  {
    id: 13,
    name: "The Crystal Bloom Striped Oxford",
    cat: "separate",
    fab: "Cotton Oxford/seersucker · striped",
    price: 3500,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "Cotton Oxford / seersucker",
    embroidery: "Striped",
    wage: "₹380",
    mrp: "₹3,500",
  },
  {
    id: 14,
    name: "The Rococo Ivory Illusion Top",
    cat: "separate",
    fab: "Sheer nylon/silk illusion tulle",
    price: 6500,
    gst: 18,
    maker: "Sara, Mumbai",
    cloth: "Sheer nylon / silk illusion tulle",
    embroidery: "Rococo motif",
    wage: "₹560",
    mrp: "₹6,500",
  },
  {
    id: 15,
    name: "The Coral Sprig Breezy Blouse",
    cat: "entry",
    fab: "Cotton voile · delicate floral & seed pearls",
    price: 1800,
    gst: 5,
    entry: true,
    maker: "Asha, Jaipur",
    cloth: "Cotton voile",
    embroidery: "Delicate floral & seed pearls",
    wage: "₹300",
    mrp: "₹1,800",
  },
  {
    id: 16,
    name: "The Topographic Rainbow Co-ord",
    cat: "coord",
    fab: "Linen/cotton-hemp blend · topographic",
    price: 4200,
    gst: 18,
    maker: "Meena, Lucknow",
    cloth: "Linen / cotton-hemp blend",
    embroidery: "Topographic rainbow",
    wage: "₹450",
    mrp: "₹4,200",
  },
  {
    id: 17,
    name: "The Monochrome Line-Art Co-ord",
    cat: "coord",
    fab: "Cotton poplin/linen · line-art",
    price: 3800,
    gst: 18,
    maker: "Asha, Jaipur",
    cloth: "Cotton poplin / linen",
    embroidery: "Line-art",
    wage: "₹390",
    mrp: "₹3,800",
  },
];

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "coord", label: "Co-ords" },
  { id: "occasion", label: "Occasion" },
  { id: "separate", label: "Separates" },
  { id: "entry", label: "Entry" },
] as const;

export function formatPrice(price: number): string {
  return "₹" + price.toLocaleString("en-IN");
}

export function getProductById(id: number): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategory(cat: string): Product[] {
  if (cat === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.cat === cat);
}

/** Extract numeric wage from the wage string for modal wage bar. */
export const LIVING_WAGE = 300;

export function parseWage(wage: string): number {
  const match = wage.match(/₹([\d,]+)/);
  if (!match) return 0;
  return parseInt(match[1].replace(/,/g, ""), 10);
}