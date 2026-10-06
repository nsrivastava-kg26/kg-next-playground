import { beforeEach, describe, expect, it, vi } from "vitest";

import { filesMatching, read } from "./_utils";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "198.51.100.1" }),
}));
vi.mock("next/server", () => ({ after: () => {} }));
vi.mock("next/cache", () => ({ updateTag: vi.fn() }));

describe("Ch05 · Mutations with Server Actions", () => {
  beforeEach(async () => (await import("@/server/rate-limit")).__resetRateLimits());

  it("posts forms to Server Actions, not to fetch('/api/...')", () => {
    expect(filesMatching(/fetch\(\s*["'`]\/api\//)).toEqual([]);
    expect(read("src/features/contact/actions.ts")).toMatch(/^["']use server["']/);
    expect(read("src/features/contact/contact-form.tsx")).toMatch(/useActionState/);
  });

  it("validates on the server and returns field errors", async () => {
    const { submitLead } = await import("@/features/contact/actions");
    const data = new FormData();
    data.set("name", "A");
    data.set("email", "nope");
    data.set("message", "short");
    const result = await submitLead({ status: "idle" }, data);
    expect(result.status).toBe("error");
    expect(result.status === "error" && result.fieldErrors?.email).toBeTruthy();
  });

  it("refreshes cached UI after a write with updateTag (read-your-writes)", () => {
    expect(read("src/features/newsletter/actions.ts")).toMatch(/updateTag\(/);
  });
});
