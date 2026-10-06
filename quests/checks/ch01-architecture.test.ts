import { describe, expect, it } from "vitest";

import { exists, filesMatching, read } from "./_utils";

describe("Ch01 · Architecture & conventions", () => {
  it.each(["marketing", "pricing", "blog", "contact", "newsletter"])(
    "groups domain code by feature: src/features/%s",
    (feature) => expect(exists(`src/features/${feature}`)).toBe(true),
  );

  it("keeps shared primitives in src/components/ui and data access in src/lib + src/server", () => {
    expect(exists("src/components/ui/button.tsx")).toBe(true);
    expect(exists("src/lib/cms/queries.ts")).toBe(true);
    expect(exists("src/server/db.ts")).toBe(true);
  });

  it("does not hide components inside src/app (the app dir is for routing)", () => {
    expect(exists("src/app/components")).toBe(false);
  });

  it("uses the @/ alias instead of ../ import ladders", () => {
    expect(JSON.parse(read("tsconfig.json")).compilerOptions.paths["@/*"]).toEqual(["./src/*"]);
    expect(filesMatching(/from\s+["']\.\.\//)).toEqual([]);
  });
});
