// This harness should run against an ALREADY-RUNNING `next start`/`next dev` server.
// Pass the port via PORT env. It builds nothing and starts nothing — just probes routes + content.
import http from "node:http";

const PORT = Number(process.env.PORT || 8854);
const ROOT = process.cwd();

function fetchText(path) {
  return new Promise((resolve, reject) => {
    http
      .get(`http://localhost:${PORT}${path}`, (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, body: data }));
      })
      .on("error", reject);
  });
}

async function main() {
  const routes = [
    "/",
    "/collection",
    ...Array.from({ length: 17 }, (_, i) => `/collection/${i + 1}`),
    "/craft",
    "/fit",
    "/about",
    "/join",
    "/sitemap.xml",
    "/robots.txt",
  ];
  let ok = 0;
  for (const r of routes) {
    try {
      const { status, body } = await fetchText(r);
      const hasContent = body && body.length > 200;
      const pass = status === 200 && hasContent;
      console.log(`${pass ? "✓" : "✗"} ${r} -> ${status} (${body.length} bytes)`);
      if (pass) ok++;
      else console.error(`   FAILED: status=${status} len=${body.length}`);
    } catch (e) {
      console.error(`✗ ${r} -> error ${e.message}`);
    }
  }
  // Check home renders brand serif (Playfair) + hero copy
  const home = await fetchText("/");
  const checks = {
    "Playfair font var": home.body.includes("--font-display") || home.body.includes("Playfair"),
    "hero copy": home.body.includes("Worn for years"),
    "pillars": home.body.includes("Handmade") && home.body.includes("Made to last"),
    "join CTA": home.body.includes("Join the Waitlist"),
  };
  for (const [k, v] of Object.entries(checks)) console.log(`${v ? "✓" : "✗"} check: ${k}`);

  const allRoutesOk = ok === routes.length;
  console.log(`\n${allRoutesOk ? "✓ ALL ROUTES OK" : "✗ SOME ROUTES FAILED"} (${ok}/${routes.length})`);
  process.exit(allRoutesOk ? 0 : 1);
}
main();
