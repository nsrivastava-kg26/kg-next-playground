# Ch01 · Architecture & conventions

**Story.** Your first PR review: a teammate can't find where the pricing toggle lives. Everything
is in `src/components/` (31 files, no folders) and imports look like `../../../lib/utils`.

**Mission.** Make the codebase navigable by someone who has never seen it.

## Acceptance criteria

- [ ] Domain code lives in `src/features/<feature>/` (`marketing`, `pricing`, `blog`, `contact`, `newsletter`, `experiments`, `seo`).
- [ ] Shared, domain-free primitives live in `src/components/ui/`; site chrome in `src/components/layout/`.
- [ ] Data access lives in `src/lib/cms/` (reads) and `src/server/` (writes, server-only).
- [ ] No `../` imports anywhere in `src/`. Use `@/`. ESLint enforces this with `no-restricted-imports`.
- [ ] `src/app/` contains only routing files (pages, layouts, route handlers, metadata files).

## Hints

- Rule of thumb: if deleting a feature means deleting one folder, the structure is right.
- Move files with your editor's rename so imports update automatically.
- Bible → _Architecture & Conventions_.

**Verify:** `npm run quest -- ch01` · **Compare:** `git diff HEAD main --stat -- src`
