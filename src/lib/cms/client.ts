import "server-only";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import type { z } from "zod";

/**
 * A tiny stand-in for a headless CMS (Sanity, Contentful, Payload...).
 * Swapping to a real CMS means replacing these two functions; nothing else changes,
 * because components only talk to `queries.ts`.
 */
const CONTENT_DIR = path.join(process.cwd(), "content");

export async function readCollection<T extends z.ZodType>(
  file: string,
  schema: T,
): Promise<z.infer<T>[]> {
  const raw = await readFile(path.join(CONTENT_DIR, file), "utf8");
  const parsed: unknown = JSON.parse(raw);
  const result = (schema.array() as z.ZodArray<T>).safeParse(parsed);
  if (!result.success) {
    throw new Error(`Invalid CMS content in content/${file}: ${result.error.message}`);
  }
  return result.data;
}

export async function listFiles(dir: string, extension: string) {
  const entries = await readdir(path.join(CONTENT_DIR, dir));
  return entries
    .filter((entry) => entry.endsWith(extension))
    .map((entry) => entry.slice(0, -extension.length));
}
