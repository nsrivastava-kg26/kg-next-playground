import { describe, expect, it } from "vitest";

import { isClientFile, read, sourceFiles } from "./_utils";

/** Every Client Component must justify itself. This is the full allow-list. */
const ALLOWED_CLIENT = [
  /^src\/app\/.*error\.tsx$/,
  /^src\/components\/layout\/(nav-link|mobile-nav)\.tsx$/,
  /^src\/components\/ui\/modal\.tsx$/,
  /^src\/features\/[^/]+\/[^/]*-form\.tsx$/,
  /^src\/features\/pricing\/pricing-table\.tsx$/,
];

describe("Ch03 · Server & Client Components", () => {
  it("never marks a page or layout as a Client Component", () => {
    const offenders = sourceFiles("src/app/**/{page,layout}.tsx").filter(isClientFile);
    expect(offenders).toEqual([]);
  });

  it("keeps 'use client' on small interactive leaves only", () => {
    const clientFiles = sourceFiles().filter(isClientFile);
    const unexpected = clientFiles.filter((f) => !ALLOWED_CLIENT.some((re) => re.test(f)));
    expect(unexpected).toEqual([]);
  });

  it("does not fetch data in useEffect", () => {
    const offenders = sourceFiles().filter((f) => /useEffect\([\s\S]{0,400}?fetch\(/.test(read(f)));
    expect(offenders).toEqual([]);
  });

  it("wraps the URL-reading nav (usePathname) in <Suspense>", () => {
    expect(read("src/components/layout/site-header.tsx")).toMatch(/<Suspense[\s\S]*<ActiveNav/);
  });
});
