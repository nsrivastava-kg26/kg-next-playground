# Ch10 · Errors, loading & resilience

**Story.** A typo in the CMS JSON took the whole site down with a white screen. Users saw nothing, and
the team found out from Twitter.

## Acceptance criteria

- [ ] `src/app/(marketing)/error.tsx`: a Client Component that keeps the header/footer and offers `retry()`.
- [ ] `src/app/global-error.tsx` renders its own `<html>`/`<body>`.
- [ ] `blog/[slug]/loading.tsx` shows a skeleton; unknown slugs call `notFound()`.
- [ ] Error messages never leak server details; show `error.digest` as a support reference.

## Hints

- `error.tsx` doesn't catch errors in the layout of the same segment. Why? Where would you put one to catch it?
- With streaming, `notFound()` after the shell has been sent returns HTTP 200 plus a `noindex` tag. Know why, and when it matters.
- Bible → _Errors, Loading & Resilience_.

**Verify:** `npm run quest -- ch10`. Then break `content/plans.json` on purpose and watch what happens.
