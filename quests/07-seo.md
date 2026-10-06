# Ch07 · Metadata & SEO

**Story.** Every page is titled "Lumen". Shared links on Slack show no preview. Google has indexed
`/api/plans`.

## Acceptance criteria

- [ ] Root layout sets `metadataBase`, a `title.template`, default description and Open Graph.
- [ ] Every page exports `metadata` (or `generateMetadata` for blog posts) with a canonical URL.
- [ ] `sitemap.ts`, `robots.ts`, `manifest.ts` and `opengraph-image.tsx` exist in `src/app/`.
- [ ] Each blog post has its own generated OG image and `BlogPosting` JSON-LD (escaped).
- [ ] `robots.txt` disallows `/api/`.

## Hints

- `generateMetadata` and the page can call the same cached `getPost()`; it only runs once.
- `next/og` uses Satori: flexbox only, inline styles.
- Bible → _Metadata & SEO_.

**Verify:** `npm run quest -- ch07` then open `/sitemap.xml` and `/opengraph-image`.
