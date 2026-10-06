# Ch06 · Route Handlers & Proxy

**Story.** The hero A/B test picks a variant with `Math.random()` inside a Client Component, causing
hydration errors and flicker. Marketing also wants CMS edits live in seconds, not on the next deploy.

## Acceptance criteria

- [ ] `src/middleware.ts` is renamed to `src/proxy.ts`, exporting `proxy`, with a `matcher`.
- [ ] The proxy assigns the `lumen-exp-hero-cta` cookie on the request _and_ response when missing.
- [ ] The hero reads the cookie in a small Server Component inside `<Suspense>` (same-size fallback).
- [ ] `POST /api/revalidate` checks `x-revalidate-secret` (constant-time), validates `{ tags }` with Zod
      against known tags, and calls `revalidateTag(tag, "max")`.
- [ ] `GET /api/health` calls `await connection()` so it isn't prerendered.

## Hints

- Proxy is for fast request rewriting: cookies, headers, redirects. Not data fetching, not your only auth check.
- With Cache Components, GET Route Handlers prerender like pages unless they touch request data.
- Try it: `curl -X POST localhost:3000/api/revalidate -H "x-revalidate-secret: $SECRET" -d '{"tags":["plans"]}'`
- Bible → _Route Handlers & Proxy_.

**Verify:** `npm run quest -- ch06`
