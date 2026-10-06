import { describe, expect, it } from "vitest";

import { isHeroCtaVariant, pickHeroCtaVariant } from "./hero-cta";

describe("hero CTA experiment", () => {
  it("splits traffic 50/50 on the random input", () => {
    expect(pickHeroCtaVariant(0.1)).toBe("a");
    expect(pickHeroCtaVariant(0.9)).toBe("b");
  });

  it("rejects tampered cookie values", () => {
    expect(isHeroCtaVariant("a")).toBe(true);
    expect(isHeroCtaVariant("<script>")).toBe(false);
    expect(isHeroCtaVariant(undefined)).toBe(false);
  });
});
