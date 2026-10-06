import { describe, expect, it } from "vitest";

import { exists, isClientFile, read } from "./_utils";

describe("Ch10 · Errors, loading & resilience", () => {
  it("has a segment error boundary with retry", () => {
    const file = "src/app/(marketing)/error.tsx";
    expect(exists(file)).toBe(true);
    expect(isClientFile(file)).toBe(true);
    expect(read(file)).toMatch(/retry/);
  });

  it("has a global error boundary that renders its own <html>", () => {
    expect(read("src/app/global-error.tsx")).toMatch(/<html/);
  });

  it("has loading UI for blog posts and same-size Suspense fallbacks", () => {
    expect(exists("src/app/(marketing)/blog/[slug]/loading.tsx")).toBe(true);
    expect(read("src/features/marketing/hero.tsx")).toMatch(/fallback=\{<CtaFallback/);
  });

  it("calls notFound() for unknown posts instead of crashing", () => {
    expect(read("src/app/(marketing)/blog/[slug]/page.tsx")).toMatch(/notFound\(\)/);
  });
});
