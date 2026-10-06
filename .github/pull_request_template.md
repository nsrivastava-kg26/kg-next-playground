## What & why

<!-- One paragraph. Link the quest or ticket. -->

## Golden Standard checklist

- [ ] Server Component by default; `"use client"` only on the smallest interactive leaf
- [ ] Data read through `src/lib/cms/queries.ts` / `src/server/*`, never fetched in `useEffect`
- [ ] Every `"use cache"` has `cacheLife` + `cacheTag`; runtime data sits behind `<Suspense>`
- [ ] Server Actions validate input with Zod, rate-limit, and return minimal state
- [ ] New pages export `metadata` (title, description, canonical)
- [ ] Images use `next/image`; no layout shift in fallbacks
- [ ] Secrets only via `src/env.ts`; nothing secret behind `NEXT_PUBLIC_`
- [ ] Tests added/updated; `npm run check` passes
