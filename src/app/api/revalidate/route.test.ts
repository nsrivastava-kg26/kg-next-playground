import { beforeEach, describe, expect, it, vi } from "vitest";

const revalidateTag = vi.fn();
vi.mock("next/cache", () => ({
  revalidateTag: (tag: string, profile: string) => revalidateTag(tag, profile),
}));

const { POST } = await import("./route");
const SECRET = process.env.REVALIDATE_SECRET!;

function request(body: unknown, secret?: string) {
  return new Request("http://localhost/api/revalidate", {
    method: "POST",
    headers: secret ? { "x-revalidate-secret": secret } : {},
    body: JSON.stringify(body),
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => revalidateTag.mockClear());

  it("rejects requests without the secret", async () => {
    const res = await POST(request({ tags: ["plans"] }));
    expect(res.status).toBe(401);
    expect(revalidateTag).not.toHaveBeenCalled();
  });

  it("rejects unknown tags", async () => {
    const res = await POST(request({ tags: ["everything"] }, SECRET));
    expect(res.status).toBe(400);
  });

  it("revalidates known tags with stale-while-revalidate", async () => {
    const res = await POST(request({ tags: ["plans", "posts"] }, SECRET));
    expect(res.status).toBe(200);
    expect(revalidateTag).toHaveBeenCalledWith("plans", "max");
    expect(revalidateTag).toHaveBeenCalledWith("posts", "max");
  });
});
