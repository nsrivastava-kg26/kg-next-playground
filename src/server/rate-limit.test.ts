import { beforeEach, describe, expect, it } from "vitest";

import { __resetRateLimits, rateLimit } from "./rate-limit";

describe("rateLimit", () => {
  beforeEach(() => __resetRateLimits());

  it("allows up to the limit, then blocks", () => {
    const now = 1_000;
    const results = Array.from({ length: 4 }, () => rateLimit("k", { limit: 3 }, now).success);
    expect(results).toEqual([true, true, true, false]);
  });

  it("resets after the window", () => {
    rateLimit("k", { limit: 1, windowMs: 100 }, 0);
    expect(rateLimit("k", { limit: 1, windowMs: 100 }, 50).success).toBe(false);
    expect(rateLimit("k", { limit: 1, windowMs: 100 }, 150).success).toBe(true);
  });
});
