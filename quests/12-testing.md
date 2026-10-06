# Ch12 · Testing & quality gates

**Story.** Last Friday someone changed the pricing toggle and annual prices disappeared for a weekend.
There are no tests and no CI.

## Acceptance criteria

- [ ] Vitest + Testing Library unit tests sit next to the code: utils, rate limiter, Server Actions, the revalidate route, `PricingTable`.
- [ ] Playwright e2e covers the main flows against a production build, including the demo modal.
- [ ] `e2e/instant.spec.ts` uses `instant()` from `@next/playwright` to protect instant navigations.
- [ ] `.github/workflows/ci.yml` runs format check, lint, typecheck, unit tests, quest checks, then build + e2e.
- [ ] `tsconfig.json` has `strict` and `noUncheckedIndexedAccess`.

## Hints

- Test Server Actions as plain async functions; mock `next/headers` and `next/cache` with `vi.mock`.
- Async Server Components are best covered by e2e, not unit tests.
- Bible → _Testing & Quality Gates_.

**Verify:** `npm run quest -- ch12` and `npm run check`
