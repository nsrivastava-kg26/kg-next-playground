# Ch02 · Routing & layouts

**Story.** Marketing wants a "Book a demo" dialog that opens over any page, keeps its own URL, and
works when shared. Meanwhile, every page imports and renders `<Header />` and `<Footer />` itself,
so the header remounts (and the mobile menu state resets) on every navigation.

## Acceptance criteria

- [ ] `src/app/(marketing)/layout.tsx` renders header, footer and a `modal` slot. Pages render neither.
- [ ] `src/app/(legal)/layout.tsx` gives `/privacy` and `/terms` a minimal layout (no marketing chrome).
- [ ] `/demo` works as a full page on hard load **and** as a modal on soft navigation:
      `@modal/(.)demo/page.tsx`, `@modal/default.tsx`, `@modal/[...segments]/page.tsx`.
- [ ] The modal closes with Escape, backdrop click and the browser Back button.
- [ ] `src/app/not-found.tsx` renders a branded 404.
- [ ] `/blog/[slug]` uses `generateStaticParams`.

## Hints

- Route groups `(name)` don't appear in the URL. Slots `@name` don't either.
- `(.)demo` intercepts `/demo` from the same level. Why do you need the catch-all in the slot? Try removing it and navigating away from the open modal.
- Use the native `<dialog>` element: focus trap and Escape for free.
- Bible → _Routing & Layouts_.

**Verify:** `npm run quest -- ch02`
