# Ch03 · Server & Client Components

**Story.** Lighthouse says the home page ships 380 kB of JavaScript to render mostly static text.
Every `page.tsx` starts with `"use client"` because "the toggle didn't work otherwise".

## Acceptance criteria

- [ ] No `page.tsx` or `layout.tsx` is a Client Component.
- [ ] `"use client"` appears only on interactive leaves: nav active state, mobile menu, modal,
      forms, the pricing table, error boundaries. (The check has the exact allow-list.)
- [ ] The header is a Server Component; only `ActiveNav` and `MobileNav` are islands.
- [ ] `ActiveNav` reads `usePathname()`, so it renders inside `<Suspense>` with a `StaticNav` fallback.
- [ ] Server-only data flows into Client Components as serialisable props (see `PricingTable plans={...}`).

## Hints

- Push the boundary down: extract the 10 interactive lines into their own file, keep the rest on the server.
- Pass Server Components _through_ Client Components as `children` instead of importing them.
- With Cache Components, `usePathname()` is URL data. Build, then read the error the App Shell gives you without Suspense.
- Bible → _Server & Client Components_.

**Verify:** `npm run quest -- ch03`
