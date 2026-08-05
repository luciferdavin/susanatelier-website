/**
 * Compress ghost-01..17.png (5-8MB) → WebP <1MB each.
 * Run: node scripts/compress-images.mjs
 * Saves WebP to public/images/ghost-01.webp … ghost-17.webp
 */
import sharp from "sharp";
import { readdir } from "fs/promises";
import { join } from "path";

const SRC = join(import.meta.dirname, "..", "public", "images");
const TARGET_MAX_BYTES = 1_000_000;

async function compress() {
  const files = (await readdir(SRC)).filter((f) => /^ghost-\d+\.png$/.test(f)).sort();
  console.log(`Found ${files.length} ghost PNGs`);

  for (const file of files) {
    const src = join(SRC, file);
    const dst = join(SRC, file.replace(".png", ".webp"));
    let buf;
    for (let q = 75; q >= 50; q -= 5) {
      buf = await sharp(src).webp({ quality: q, effort: 4 }).toBuffer();
      if (buf.length <= TARGET_MAX_BYTES) break;
    }
    await sharp(src).webp({ quality: 75, effort: 4 }).toFile(dst);
    console.log(`  ${file} → ${file.replace(".png", ".webp")}  ${(buf.length/1024).toFixed(0)}KB`);
  }
  console.log("Done. Update references: ghost-XX.png → ghost-XX.webp");
}
compress().catch(console.error);
