import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/**
 * Static security headers applied to every route.
 * A nonce-based CSP is intentionally NOT set here: it forces every page to render
 * dynamically. See the Security page of the bible for the trade-off.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  // Rendering model: dynamic by default, explicit caching with "use cache", PPR shells.
  cacheComponents: true,
  // Prefetch one reusable App Shell per route instead of one request per link.
  partialPrefetching: true,
  // Automatic memoization. No hand-written useMemo/useCallback in this codebase.
  reactCompiler: true,
  // <Link href> is type-checked against real routes.
  typedRoutes: true,

  // Reusable cache lifetimes. Use cacheLife("content") instead of magic numbers.
  cacheLife: {
    content: { stale: 300, revalidate: 3600, expire: 86_400 },
  },

  // Self-hostable output for the Dockerfile (BUILD_STANDALONE=1). Vercel ignores this.
  output: process.env.BUILD_STANDALONE === "1" ? "standalone" : undefined,
  // The CMS stand-in reads JSON/MDX from /content at runtime; make sure it ships.
  outputFileTracingIncludes: { "/**/*": ["./content/**/*"] },

  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },

  experimental: {
    // Lets @next/playwright's instant() helper run against `next start` in CI.
    exposeTestingApiInProductionBuild: process.env.E2E === "1",
  },

  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },

  async redirects() {
    return [{ source: "/book-a-demo", destination: "/demo", permanent: true }];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
