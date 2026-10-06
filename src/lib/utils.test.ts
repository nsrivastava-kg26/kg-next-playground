import { describe, expect, it } from "vitest";

import { cn, formatCompact, formatDate } from "./utils";

describe("cn", () => {
  it("lets later Tailwind classes win", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});

describe("formatters", () => {
  it("formats dates deterministically in UTC", () => {
    expect(formatDate("2026-09-02")).toBe("September 2, 2026");
  });

  it("formats compact numbers", () => {
    expect(formatCompact(12_480)).toBe("12K");
  });
});
