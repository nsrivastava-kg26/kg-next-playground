# Ch11 · Security & configuration

**Story.** A security review found `NEXT_PUBLIC_REVALIDATE_SECRET` in the browser bundle and
`process.env` reads scattered across 14 files, half of them with a different default.

## Acceptance criteria

- [ ] `src/env.ts` validates all server env vars with Zod at startup and imports `server-only`.
- [ ] `process.env` is read only in `env.ts`, `lib/site.ts` (public URL), `proxy.ts` and `instrumentation.ts`.
- [ ] No secret uses the `NEXT_PUBLIC_` prefix. `.env.example` documents every variable.
- [ ] Every file in `src/server/` imports `server-only`.
- [ ] `next.config.ts` sends security headers and disables `x-powered-by`.
- [ ] Forms have a honeypot and per-IP rate limiting.

## Hints

- Anything prefixed `NEXT_PUBLIC_` is inlined into JavaScript at build time. Assume it's public forever.
- Why doesn't this repo ship a nonce-based CSP? (It forces every page dynamic. Read the CSP guide.)
- Bible → _Security & Configuration_.

**Verify:** `npm run quest -- ch11`
