import { describe, expect, it } from "vitest";

import { filesMatching, read } from "./_utils";

describe("Ch08 · Styling & design system", () => {
  it("defines semantic design tokens with Tailwind v4 @theme", () => {
    const css = read("src/app/globals.css");
    expect(css).toMatch(/@theme\s*{/);
    for (const token of ["--color-brand", "--color-surface", "--color-muted", "--font-sans"]) {
      expect(css).toContain(token);
    }
  });

  it("does not hard-code hex colours in components", () => {
    const offenders = filesMatching(
      /className=["{`][^"`}]*#[0-9a-fA-F]{3,6}/,
      "src/{components,features}/**/*.tsx",
    );
    expect(offenders).toEqual([]);
  });

  it("does not use inline style objects outside the OG image template", () => {
    const offenders = filesMatching(/style=\{\{/, "src/{components,features}/**/*.tsx").filter(
      (f) => !f.endsWith("og-template.tsx"),
    );
    expect(offenders).toEqual([]);
  });

  it("self-hosts fonts through next/font (no Google Fonts <link>)", () => {
    expect(read("src/app/layout.tsx")).toMatch(/geist\/font|next\/font/);
    expect(filesMatching(/fonts\.googleapis\.com/)).toEqual([]);
  });

  it("centralises button styles in typed cva variants", () => {
    expect(read("src/components/ui/button.tsx")).toMatch(/cva\(/);
  });
});
