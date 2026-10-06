# Lumen · the Next.js Golden Standard

A production-grade marketing site for **Lumen**, a fictional AI observability company. It exists to
answer one question for BrainStation engineers: _what does a really good Next.js codebase look like?_

- `main` is the **Golden Standard**: the reference implementation. Every pattern is deliberate and commented.
- `quest/start` is **the inherited agency codebase**: the same site built badly. The
  [13-chapter quest](./quests/README.md) walks you from one to the other.
- The **Next.js Bible** (Confluence) explains each topic briefly and links to the best sources.

## Stack

Next.js 16.3 (App Router, Cache Components, Partial Prefetching, React Compiler, typed routes) ·
React 19.2 · TypeScript (strict) · Tailwind CSS v4 · Zod · MDX · Vitest + Testing Library ·
Playwright + `@next/playwright` · ESLint flat config · Prettier · GitHub Actions · Docker.

## Quick start

```bash
nvm use                      # Node 22
cp .env.example .env.local   # then set REVALIDATE_SECRET
npm ci
npm run dev                  # http://localhost:3000
```

| Script                            | What it does                                                       |
| --------------------------------- | ------------------------------------------------------------------ |
| `npm run dev` / `build` / `start` | The usual                                                          |
| `npm run check`                   | Lint + typecheck + unit tests + quest checks (run before every PR) |
| `npm test`                        | Vitest unit/component tests                                        |
| `npm run test:e2e`                | Playwright against a production build                              |
| `npm run quest -- ch04`           | Acceptance checks for one quest chapter                            |

## Map of the codebase

```
src/
├─ app/                     Routing only: pages, layouts, route handlers, metadata files
│  ├─ (marketing)/          Route group: header + footer layout, @modal slot
│  │  ├─ @modal/(.)demo/    Intercepted /demo rendered as a dialog
│  │  ├─ blog/[slug]/       MDX posts, generateMetadata, per-post OG image
│  │  └─ pricing, contact, demo
│  ├─ (legal)/              Route group: minimal layout for privacy/terms
│  ├─ api/revalidate        CMS webhook → revalidateTag(tag, "max")
│  ├─ api/health            Liveness probe (dynamic via connection())
│  └─ sitemap.ts robots.ts manifest.ts opengraph-image.tsx not-found.tsx global-error.tsx
├─ components/
│  ├─ ui/                   Domain-free primitives (Button with cva, Card, form fields, Modal)
│  └─ layout/               Site chrome (header, footer, nav islands)
├─ features/<name>/         Domain code: components + actions + schemas, colocated with tests
├─ lib/
│  ├─ cms/                  Read path: client (I/O), schemas (Zod), queries ("use cache"), tags
│  ├─ site.ts               Client-safe config and navigation
│  └─ utils.ts
├─ server/                  Write path / data access layer (server-only): db, rate limiting
├─ env.ts                   Validated server env (server-only)
├─ proxy.ts                 A/B bucket cookie before render
└─ instrumentation.ts       Startup hook + onRequestError reporting
content/                    CMS stand-in: JSON collections + MDX posts
quests/                     The 13 chapters + automated acceptance checks
e2e/                        Playwright specs (incl. instant-navigation guards)
```

## The ten rules (short version)

1. **Server first.** `"use client"` goes on the smallest interactive leaf, never on a page or layout.
2. **Explicit caching.** Nothing is cached unless it says `"use cache"`, with `cacheLife` and `cacheTag`.
3. **Stream runtime data.** Cookies, headers, `searchParams` and uncached I/O live behind `<Suspense>` with same-size fallbacks.
4. **Instant navigations.** Routes produce a static shell; `instant` and `@next/playwright` keep it that way.
5. **Mutations are Server Actions.** Validate with Zod, rate-limit, return minimal state, `updateTag` for read-your-writes.
6. **Validate every boundary.** Env vars, CMS content, form input, webhook bodies.
7. **Secrets stay on the server.** `src/env.ts` + `server-only`. `NEXT_PUBLIC_` means public forever.
8. **Every page has metadata.** Plus sitemap, robots, OG images and JSON-LD from code.
9. **Tokens, not values.** Colours, fonts and radii come from `@theme`; variants from `cva`.
10. **Prove it.** Unit tests next to code, e2e on a production build, CI on every PR.

Lumen, its customers and its numbers are fictional.
