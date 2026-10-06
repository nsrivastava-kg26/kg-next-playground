import { beforeEach, describe, expect, it, vi } from "vitest";

import { __resetStore, countSubscribers } from "@/server/db";
import { __resetRateLimits } from "@/server/rate-limit";

const updateTag = vi.fn();
vi.mock("next/cache", () => ({ updateTag: (tag: string) => updateTag(tag) }));
vi.mock("next/headers", () => ({ headers: async () => new Headers() }));

const { subscribe } = await import("./actions");

function form(email: string) {
  const data = new FormData();
  data.set("email", email);
  return data;
}

describe("subscribe", () => {
  beforeEach(() => {
    __resetStore();
    __resetRateLimits();
    updateTag.mockClear();
  });

  it("stores the subscriber and expires the cached count (read-your-writes)", async () => {
    const before = await countSubscribers();
    const result = await subscribe({ status: "idle" }, form("dev@example.com"));
    expect(result.status).toBe("success");
    expect(await countSubscribers()).toBe(before + 1);
    expect(updateTag).toHaveBeenCalledWith("subscribers");
  });

  it("is idempotent for the same email", async () => {
    await subscribe({ status: "idle" }, form("dev@example.com"));
    const result = await subscribe({ status: "idle" }, form("DEV@example.com"));
    expect(result).toMatchObject({ status: "success", message: expect.stringMatching(/already/i) });
  });

  it("rejects invalid emails without touching the cache", async () => {
    const result = await subscribe({ status: "idle" }, form("not-an-email"));
    expect(result.status).toBe("error");
    expect(updateTag).not.toHaveBeenCalled();
  });
});
