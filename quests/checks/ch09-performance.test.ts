import { describe, expect, it } from "vitest";

import { filesMatching, read } from "./_utils";

describe("Ch09 · Performance & images", () => {
  it("never uses a raw <img> tag", () => {
    expect(filesMatching(/<img\s/)).toEqual([]);
  });

  it("serves the LCP hero image with next/image, a static import and priority", () => {
    const hero = read("src/features/marketing/hero.tsx");
    expect(hero).toMatch(/from "next\/image"/);
    expect(hero).toMatch(/import \w+ from "@\/assets\//);
    expect(hero).toMatch(/\bpriority\b/);
    expect(hero).toMatch(/sizes=/);
  });

  it("lets the React Compiler memoise instead of hand-written useMemo/useCallback", () => {
    expect(read("next.config.ts")).toMatch(/reactCompiler:\s*true/);
    expect(filesMatching(/\buse(Memo|Callback)\(/)).toEqual([]);
  });

  it("uses zero-JS platform features where possible (<details> FAQ)", () => {
    expect(read("src/features/marketing/faq.tsx")).toMatch(/<details/);
  });
});
