# The Lumen Rescue · a 13-chapter quest

> You've just joined the web platform team at **Lumen**, a (fictional) AI observability startup.
> The marketing site was rushed out by an agency called PixelRush. It renders. That's about all
> you can say for it: every page is a Client Component, data is fetched in `useEffect`, there's
> no SEO, secrets sit behind `NEXT_PUBLIC_`, and nobody has written a test.
>
> Launch is in thirteen chapters. By the end, this repo should match `main`: the
> **Golden Standard** for how a Next.js codebase looks at BrainStation.

## How to play

```bash
git clone <repo-url> lumen && cd lumen
git switch quest/start                 # the inherited agency codebase
git switch -c quest/<your-name>        # your working branch
cp .env.example .env.local
npm ci && npm run dev
```

For each chapter:

1. Read the chapter's page in the **Next.js Bible** (Confluence), then the quest file below.
2. Make the changes. Keep the site working after every commit.
3. Run the automated acceptance checks: `npm run quest -- ch04`
4. Commit with the chapter prefix: `git commit -m "ch04: cache CMS queries with use cache"`
5. Compare with the reference only **after** your checks pass:
   `git diff quest/<your-name> main -- src/lib/cms`
6. Open a PR into your own branch's `quest/start` base if you want a review from a mentor.

`npm run quest` with no argument runs every chapter. On `quest/start` almost everything fails.
On `main` everything passes. Your job is to get from one to the other.

## Chapters

| #   | Chapter                                                | You will fix                                        | Check  |
| --- | ------------------------------------------------------ | --------------------------------------------------- | ------ |
| 01  | [Architecture & conventions](./01-architecture.md)     | A flat `components/` dump and `../../` imports      | `ch01` |
| 02  | [Routing & layouts](./02-routing.md)                   | Header copy-pasted into every page; no demo modal   | `ch02` |
| 03  | [Server & Client Components](./03-server-client.md)    | `"use client"` on every page                        | `ch03` |
| 04  | [Data, caching & streaming](./04-data-caching.md)      | `useEffect` + `/api/plans` waterfalls               | `ch04` |
| 05  | [Mutations with Server Actions](./05-mutations.md)     | A contact form that trusts the client               | `ch05` |
| 06  | [Route Handlers & Proxy](./06-handlers-proxy.md)       | Deprecated middleware, hydration-mismatch A/B test  | `ch06` |
| 07  | [Metadata & SEO](./07-seo.md)                          | One title for the whole site, no sitemap            | `ch07` |
| 08  | [Styling & design system](./08-styling.md)             | Hex colours, inline styles, a Google Fonts `<link>` | `ch08` |
| 09  | [Performance & images](./09-performance.md)            | `<img>` hero, manual `useMemo` everywhere           | `ch09` |
| 10  | [Errors, loading & resilience](./10-errors-loading.md) | A white screen on any error                         | `ch10` |
| 11  | [Security & configuration](./11-security.md)           | Secrets in the browser bundle                       | `ch11` |
| 12  | [Testing & quality gates](./12-testing.md)             | Zero tests, zero CI                                 | `ch12` |
| 13  | [Deploy & observe](./13-ship.md)                       | No health check, no error reporting, no Dockerfile  | `ch13` |

Chapters build on each other, but 07 to 13 can be done in any order once 01 to 06 are done.

## Ground rules

- **The checks are the floor, not the ceiling.** They catch the obvious; your reviewer catches the rest.
- **Don't copy from `main`.** Diff against it after you pass. The learning is in the struggle.
- **Read the real docs.** Every chapter links the official page. This repo pins Next.js 16.3, and
  `node_modules/next/dist/docs/` has the docs for exactly that version.
