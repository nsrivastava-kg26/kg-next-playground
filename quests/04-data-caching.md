# Ch04 · Data, caching & streaming

**Story.** The pricing page shows a spinner, then calls `/api/plans`, which reads the CMS, which
the page could have read directly. Every visitor pays for that waterfall. Also, nothing is cached:
a CMS outage takes the site down.

## Acceptance criteria

- [ ] `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`.
- [ ] Every function in `src/lib/cms/queries.ts` has `"use cache"`, `cacheLife(...)` and `cacheTag(...)`.
- [ ] A named `cacheLife` profile (`content`) is defined in `next.config.ts`. No magic numbers.
- [ ] Tags come from `src/lib/cms/tags.ts`.
- [ ] `src/app/api/plans` and `src/app/api/posts` are deleted; pages call queries directly.
- [ ] `/blog` reads `searchParams` inside `<Suspense>`; the heading stays in the static shell.
- [ ] CMS JSON is validated with Zod in `src/lib/cms/client.ts`.
- [ ] `npm run build` shows `/` and `/blog` as ◐ (Partial Prerender) and `/pricing` as ○.

## Hints

- Pass the `searchParams` _promise_ down; await it in the component inside the boundary.
- `Date.now()`, `Math.random()` and `crypto.randomUUID()` inside a prerender need `connection()` or `"use cache"`.
- `export const instant = true` on `/pricing` makes the dev overlay tell you when a navigation would block.
- Bible → _Data Fetching, Caching & Streaming_.

**Verify:** `npm run quest -- ch04` and `npm run build`
