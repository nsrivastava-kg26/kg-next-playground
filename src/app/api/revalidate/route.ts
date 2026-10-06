import { timingSafeEqual } from "node:crypto";

import { revalidateTag } from "next/cache";
import { z } from "zod";

import { env } from "@/env";
import { cmsTags } from "@/lib/cms/tags";

const bodySchema = z.object({
  tags: z.array(z.enum(cmsTags)).min(1),
});

function isAuthorized(header: string | null) {
  if (!header) return false;
  const a = Buffer.from(header);
  const b = Buffer.from(env.REVALIDATE_SECRET);
  // Constant-time comparison so the secret can't be guessed byte by byte via timing.
  return a.length === b.length && timingSafeEqual(a, b);
}

/**
 * Webhook for the CMS: POST { "tags": ["plans"] } with the shared secret header.
 * Uses stale-while-revalidate ('max'): visitors keep getting the cached page instantly
 * while the fresh version is generated in the background.
 */
export async function POST(request: Request) {
  if (!isAuthorized(request.headers.get("x-revalidate-secret"))) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid body", issues: z.flattenError(parsed.error) },
      { status: 400 },
    );
  }

  for (const tag of parsed.data.tags) revalidateTag(tag, "max");

  return Response.json({ revalidated: parsed.data.tags });
}
