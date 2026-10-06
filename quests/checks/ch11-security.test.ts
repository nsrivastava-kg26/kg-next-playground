import { describe, expect, it } from "vitest";

import { filesMatching, read, sourceFiles } from "./_utils";

const ENV_ALLOWED = ["src/env.ts", "src/lib/site.ts", "src/proxy.ts", "src/instrumentation.ts"];

describe("Ch11 · Security & configuration", () => {
  it("validates environment variables once, server-only", () => {
    const env = read("src/env.ts");
    expect(env).toMatch(/import "server-only"/);
    expect(env).toMatch(/z\.object/);
  });

  it("reads process.env only in the allowed modules", () => {
    const offenders = filesMatching(/process\.env\./).filter((f) => !ENV_ALLOWED.includes(f));
    expect(offenders).toEqual([]);
  });

  it("never exposes secrets with NEXT_PUBLIC_", () => {
    expect(read(".env.example")).not.toMatch(/NEXT_PUBLIC_\w*(SECRET|KEY|TOKEN|PASSWORD)/);
  });

  it("guards server modules with server-only", () => {
    const serverFiles = sourceFiles("src/server/**/*.ts");
    expect(serverFiles.length).toBeGreaterThan(0);
    for (const f of serverFiles) expect(read(f), f).toMatch(/import "server-only"/);
  });

  it("sends security headers", () => {
    const config = read("next.config.ts");
    expect(config).toMatch(/X-Frame-Options/);
    expect(config).toMatch(/poweredByHeader:\s*false/);
  });

  it("protects forms with a honeypot and rate limiting", () => {
    const action = read("src/features/contact/actions.ts");
    expect(action).toMatch(/rateLimit\(/);
    expect(action).toMatch(/website/);
  });
});
