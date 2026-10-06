# Ch09 · Performance & images

**Story.** LCP is 4.1 s on mobile. The hero screenshot is a 1.2 MB PNG in an `<img>` with no
dimensions, so the page jumps when it loads. The codebase is full of `useMemo` "for performance".

## Acceptance criteria

- [ ] No `<img>` anywhere. The hero uses `next/image` with a static import, `priority`, `placeholder="blur"` and `sizes`.
- [ ] `reactCompiler: true`; delete every hand-written `useMemo`/`useCallback`.
- [ ] The FAQ uses `<details>`/`<summary>` (zero JS) instead of a stateful accordion.
- [ ] Every Suspense fallback has the same dimensions as the content it replaces (no CLS).

## Hints

- Static imports give Next.js width, height and a blur placeholder for free.
- Measure before and after with Lighthouse on `npm run build && npm start`, never on `next dev`.
- Bible → _Performance & Images_.

**Verify:** `npm run quest -- ch09`
