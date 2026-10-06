import "server-only";

import { z } from "zod";

/**
 * Single source of truth for server environment variables.
 *
 * - Validated once at startup: a missing secret fails fast instead of at 2am.
 * - `server-only` makes importing this file from a Client Component a build error.
 * - Never read `process.env.X` directly elsewhere in server code; import `env` instead.
 */
const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  NEXT_PUBLIC_SITE_URL: z.url().default("http://localhost:3000"),
  /** Shared secret for the CMS webhook that calls POST /api/revalidate. */
  REVALIDATE_SECRET: z.string().min(32, "REVALIDATE_SECRET must be at least 32 characters"),
  /** Where contact and demo requests are routed. */
  CONTACT_INBOX: z.email().default("hello@lumen.example"),
});

export type Env = z.infer<typeof schema>;

function parseEnv(): Env {
  // Escape hatch for tooling that imports server code without real secrets (Docker build, lint).
  if (process.env.SKIP_ENV_VALIDATION === "1") {
    return schema.partial().parse(process.env) as Env;
  }

  const result = schema.safeParse(process.env);
  if (!result.success) {
    console.error("Invalid environment variables:\n", z.prettifyError(result.error));
    throw new Error("Invalid environment variables. See .env.example.");
  }
  return result.data;
}

export const env = parseEnv();
