import { describe, expect, it } from "vitest";

import { exists, pages, read } from "./_utils";

describe("Ch02 · Routing & layouts", () => {
  it("uses route groups so marketing and legal pages get different layouts", () => {
    expect(exists("src/app/(marketing)/layout.tsx")).toBe(true);
    expect(exists("src/app/(legal)/layout.tsx")).toBe(true);
    expect(exists("src/app/(legal)/privacy/page.tsx")).toBe(true);
  });

  it("renders the header and footer once, in a layout, not in every page", () => {
    const offenders = pages().filter((p) => /SiteHeader|SiteFooter/.test(read(p)));
    expect(offenders).toEqual([]);
    expect(read("src/app/(marketing)/layout.tsx")).toMatch(/SiteHeader/);
  });

  it("intercepts /demo as a modal with a parallel @modal slot", () => {
    expect(read("src/app/(marketing)/layout.tsx")).toMatch(/\bmodal\b/);
    expect(exists("src/app/(marketing)/@modal/default.tsx")).toBe(true);
    expect(exists("src/app/(marketing)/@modal/(.)demo/page.tsx")).toBe(true);
    expect(exists("src/app/(marketing)/demo/page.tsx")).toBe(true);
  });

  it("has a branded not-found page", () => {
    expect(exists("src/app/not-found.tsx")).toBe(true);
  });

  it("generates static params for blog posts", () => {
    expect(read("src/app/(marketing)/blog/[slug]/page.tsx")).toMatch(/generateStaticParams/);
  });
});
