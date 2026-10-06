import { beforeEach, describe, expect, it, vi } from "vitest";

import { __resetRateLimits } from "@/server/rate-limit";

vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "x-forwarded-for": "203.0.113.7" }),
}));
vi.mock("next/server", () => ({ after: (fn: () => void) => fn() }));

const { submitLead } = await import("./actions");

function form(values: Record<string, string>) {
  const data = new FormData();
  for (const [key, value] of Object.entries(values)) data.set(key, value);
  return data;
}

const valid = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  topic: "sales",
  message: "We want to trace our checkout assistant end to end.",
};

describe("submitLead", () => {
  beforeEach(() => {
    __resetRateLimits();
    vi.spyOn(console, "info").mockImplementation(() => {});
  });

  it("accepts a valid submission", async () => {
    const result = await submitLead({ status: "idle" }, form(valid));
    expect(result.status).toBe("success");
  });

  it("returns field errors and echoes values for invalid input", async () => {
    const result = await submitLead(
      { status: "idle" },
      form({ ...valid, email: "nope", message: "hi" }),
    );
    expect(result.status).toBe("error");
    if (result.status !== "error") return;
    expect(result.fieldErrors?.email).toBeDefined();
    expect(result.fieldErrors?.message).toBeDefined();
    expect(result.values?.name).toBe("Ada Lovelace");
  });

  it("silently accepts honeypot submissions without storing them", async () => {
    const result = await submitLead(
      { status: "idle" },
      form({ ...valid, website: "spam.example" }),
    );
    expect(result.status).toBe("success");
  });

  it("rate-limits repeated submissions from one IP", async () => {
    for (let i = 0; i < 3; i++) await submitLead({ status: "idle" }, form(valid));
    const result = await submitLead({ status: "idle" }, form(valid));
    expect(result).toMatchObject({ status: "error", message: expect.stringMatching(/too many/i) });
  });
});
