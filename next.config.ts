import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // static HTML export → out/ (GitHub Pages)
  images: { unoptimized: true }, // no server image optimizer on Pages
  trailingSlash: true, // safer static routing on Pages (/me → /me/index.html)
};

export default nextConfig;
