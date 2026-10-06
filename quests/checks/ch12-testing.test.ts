import { describe, expect, it } from "vitest";

import { exists, read, sourceFiles } from "./_utils";
import { globSync } from "node:fs";
import { ROOT } from "./_utils";

describe("Ch12 · Testing & quality gates", () => {
  it("has unit tests next to the code they test", () => {
    const tests = globSync("src/**/*.test.{ts,tsx}", { cwd: ROOT });
    expect(tests.length).toBeGreaterThanOrEqual(6);
    expect(sourceFiles().length).toBeGreaterThan(0);
  });

  it("tests a Client Component with Testing Library", () => {
    expect(read("src/features/pricing/pricing-table.test.tsx")).toMatch(/@testing-library\/react/);
  });

  it("guards instant navigations with @next/playwright", () => {
    expect(exists("playwright.config.ts")).toBe(true);
    expect(read("e2e/instant.spec.ts")).toMatch(/instant\(page/);
  });

  it("runs lint, types, tests and e2e in CI", () => {
    const ci = read(".github/workflows/ci.yml");
    for (const step of ["npm run lint", "npm run typecheck", "npm test", "npm run test:e2e"]) {
      expect(ci).toContain(step);
    }
  });

  it("enforces strict TypeScript", () => {
    const { compilerOptions } = JSON.parse(read("tsconfig.json"));
    expect(compilerOptions.strict).toBe(true);
    expect(compilerOptions.noUncheckedIndexedAccess).toBe(true);
  });
});
