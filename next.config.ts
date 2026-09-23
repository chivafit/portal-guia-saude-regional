import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  outputFileTracingRoot: process.cwd(),
  turbopack: { root: process.cwd() },
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
