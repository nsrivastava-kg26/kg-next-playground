/**
 * A/B experiment on the hero call-to-action label.
 * The bucket is assigned in `src/proxy.ts` (before rendering) and read in a
 * Suspense-wrapped Server Component, so the rest of the page stays in the static shell.
 */
export const HERO_CTA_COOKIE = "lumen-exp-hero-cta";

export const heroCtaVariants = {
  a: "Start free",
  b: "Get started in 2 minutes",
} as const;

export type HeroCtaVariant = keyof typeof heroCtaVariants;

export function isHeroCtaVariant(value: string | undefined): value is HeroCtaVariant {
  return value === "a" || value === "b";
}

/** Deterministic, injectable randomness keeps this testable. */
export function pickHeroCtaVariant(random: number = Math.random()): HeroCtaVariant {
  return random < 0.5 ? "a" : "b";
}
