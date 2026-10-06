import { describe, expect, it } from "vitest";

import { exists, pages, read } from "./_utils";

describe("Ch07 · Metadata & SEO", () => {
  it("sets metadataBase and a title template in the root layout", () => {
    const layout = read("src/app/layout.tsx");
    expect(layout).toMatch(/metadataBase/);
    expect(layout).toMatch(/template:/);
  });

  it("gives every real page its own metadata", () => {
    const realPages = pages().filter((p) => !p.includes("/@modal/"));
    const missing = realPages.filter(
      (p) => !/export (const metadata|async function generateMetadata)/.test(read(p)),
    );
    // The home page inherits the root metadata on purpose.
    expect(missing.filter((p) => p !== "src/app/(marketing)/page.tsx")).toEqual([]);
  });

  it.each(["sitemap.ts", "robots.ts", "manifest.ts", "opengraph-image.tsx"])(
    "generates %s from code",
    (file) => expect(exists(`src/app/${file}`)).toBe(true),
  );

  it("adds per-post OG images and JSON-LD", () => {
    expect(exists("src/app/(marketing)/blog/[slug]/opengraph-image.tsx")).toBe(true);
    expect(read("src/app/(marketing)/blog/[slug]/page.tsx")).toMatch(/BlogPosting/);
  });
});
