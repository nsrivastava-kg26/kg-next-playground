import { describe, expect, it } from "vitest";

import { exists, read } from "./_utils";

describe("Ch04 · Data fetching, caching & streaming", () => {
  it("enables Cache Components and Partial Prefetching", () => {
    const config = read("next.config.ts");
    expect(config).toMatch(/cacheComponents:\s*true/);
    expect(config).toMatch(/partialPrefetching:\s*true/);
  });

  it("caches every CMS query with a lifetime and a tag", () => {
    const queries = read("src/lib/cms/queries.ts");
    const fns = queries.split(/export async function /).slice(1);
    expect(fns.length).toBeGreaterThanOrEqual(6);
    for (const fn of fns) {
      const name = fn.slice(0, fn.indexOf("("));
      expect(fn, `${name} needs "use cache"`).toMatch(/["']use cache["']/);
      expect(fn, `${name} needs cacheLife()`).toMatch(/cacheLife\(/);
      expect(fn, `${name} needs cacheTag()`).toMatch(/cacheTag\(/);
    }
  });

  it("defines cache tags in one place", () => {
    expect(read("src/lib/cms/queries.ts")).toMatch(/cacheTags\./);
    expect(exists("src/lib/cms/tags.ts")).toBe(true);
  });

  it("removes the client-side data API the agency built", () => {
    expect(exists("src/app/api/plans/route.ts")).toBe(false);
    expect(exists("src/app/api/posts/route.ts")).toBe(false);
    expect(exists("src/app/api/content/route.ts")).toBe(false);
  });

  it("streams runtime data (searchParams, cookies) behind <Suspense>", () => {
    expect(read("src/app/(marketing)/blog/page.tsx")).toMatch(/<Suspense/);
    expect(read("src/features/marketing/hero.tsx")).toMatch(
      /<Suspense[\s\S]*cookies|cookies[\s\S]*<Suspense/,
    );
  });

  it("validates CMS content with a schema at the boundary", () => {
    expect(read("src/lib/cms/client.ts")).toMatch(/safeParse/);
  });
});
