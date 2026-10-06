import { describe, expect, it } from "vitest";

import { exists, read } from "./_utils";

describe("Ch13 · Deploy & observe", () => {
  it("reports request errors from instrumentation.ts", () => {
    const file = read("src/instrumentation.ts");
    expect(file).toMatch(/export async function register/);
    expect(file).toMatch(/onRequestError/);
  });

  it("can build a small self-hosted image", () => {
    const dockerfile = read("Dockerfile");
    expect(dockerfile).toMatch(/standalone/);
    expect(dockerfile).toMatch(/USER nextjs/);
    expect(dockerfile).toMatch(/HEALTHCHECK/);
  });

  it("documents every environment variable", () => {
    expect(exists(".env.example")).toBe(true);
    const example = read(".env.example");
    for (const name of ["NEXT_PUBLIC_SITE_URL", "REVALIDATE_SECRET"])
      expect(example).toContain(name);
  });
});
