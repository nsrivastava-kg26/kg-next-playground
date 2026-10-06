import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// TODO(pixelrush): figure out caching later
const nextConfig: NextConfig = {
  images: { unoptimized: true },
};

export default createMDX({})(nextConfig);
