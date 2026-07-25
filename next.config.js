/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // NOTE: `output: 'standalone'` was removed because it breaks `next build`
  // on Windows when the project path contains a space (e.g. "Fashion Brand")
  // — the trace-collection phase fails with ENOENT on .next/server manifests.
  // `next dev` / `next start` / Vercel deploys do not need standalone output.
};

module.exports = nextConfig;