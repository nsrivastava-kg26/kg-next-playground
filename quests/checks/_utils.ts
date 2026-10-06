import { existsSync, globSync, readFileSync } from "node:fs";
import path from "node:path";

export const ROOT = path.resolve(import.meta.dirname, "../..");

export const abs = (p: string) => path.join(ROOT, p);
export const exists = (p: string) => existsSync(abs(p));
export const read = (p: string) => readFileSync(abs(p), "utf8");
export const readOr = (p: string, fallback = "") => (exists(p) ? read(p) : fallback);

/** Source files (no tests), relative to the repo root. */
export function sourceFiles(pattern = "src/**/*.{ts,tsx}") {
  return globSync(pattern, { cwd: ROOT }).filter(
    (f) => !/\.test\.tsx?$/.test(f) && !f.startsWith("src/test/"),
  );
}

export function filesMatching(regex: RegExp, pattern?: string) {
  return sourceFiles(pattern).filter((f) => regex.test(read(f)));
}

export const isClientFile = (f: string) => /^\s*["']use client["']/.test(read(f));
export const pages = () => sourceFiles("src/app/**/page.tsx");
