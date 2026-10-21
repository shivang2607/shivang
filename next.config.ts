import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` emits ./out, deployable to any static host
  // (GitHub Pages, Cloudflare Pages, Netlify, S3...). No Node server needed.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
