# Ch08 · Styling & design system

**Story.** Design changed the brand purple. It's hard-coded in 46 places, sometimes as `#7c5cff`,
sometimes `#7b5cff`. Fonts load from Google with a visible flash.

## Acceptance criteria

- [ ] `globals.css` defines semantic tokens in a Tailwind v4 `@theme` block (`--color-brand`, `--color-surface`, `--color-muted`, `--font-sans`, ...).
- [ ] No hex colours in `className`s and no `style={{...}}` in components (the OG template is the one exception).
- [ ] Fonts load via `next/font` (this repo uses the `geist` package). No `fonts.googleapis.com`.
- [ ] Buttons use the typed `cva` variants in `src/components/ui/button.tsx`; class merging goes through `cn()`.

## Hints

- Name tokens by role (`surface`, `muted`), not by colour (`purple-500`). A rebrand should touch one file.
- `prettier-plugin-tailwindcss` sorts classes; let it.
- Bible → _Styling & Design System_.

**Verify:** `npm run quest -- ch08`
