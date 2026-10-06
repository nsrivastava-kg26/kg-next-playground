import { describe, expect, it, vi } from "vitest";

import { exists, read } from "./_utils";

vi.mock("next/cache", () => ({ revalidateTag: vi.fn() }));

describe("Ch06 · Route Handlers & Proxy", () => {
  it("uses proxy.ts (middleware.ts is deprecated)", () => {
    expect(exists("src/middleware.ts") || exists("middleware.ts")).toBe(false);
    expect(read("src/proxy.ts")).toMatch(/export (default )?function proxy/);
    expect(read("src/proxy.ts")).toMatch(/matcher/);
  });

  it("assigns the experiment cookie in the proxy, not with Math.random in a component", async () => {
    expect(read("src/proxy.ts")).toMatch(/cookies\.set/);
    const { pickHeroCtaVariant } = await import("@/features/experiments/hero-cta");
    expect(pickHeroCtaVariant(0.2)).toBe("a");
  });

  it("protects the revalidation webhook with a secret", async () => {
    const { POST } = await import("@/app/api/revalidate/route");
    const res = await POST(new Request("http://x/api/revalidate", { method: "POST", body: "{}" }));
    expect(res.status).toBe(401);
  });

  it("makes the health check dynamic with connection()", () => {
    expect(read("src/app/api/health/route.ts")).toMatch(/await connection\(\)/);
  });
});
