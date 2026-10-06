/**
 * Every cache tag in the app lives here. Tags are a contract between the code that
 * caches (`cacheTag`) and the code that invalidates (`revalidateTag` / `updateTag`),
 * so a typo must be a type error, not a stale page.
 */
export const cacheTags = {
  plans: "plans",
  features: "features",
  testimonials: "testimonials",
  faqs: "faqs",
  customers: "customers",
  posts: "posts",
  subscribers: "subscribers",
} as const;

export type CacheTag = (typeof cacheTags)[keyof typeof cacheTags];

export const cmsTags = Object.values(cacheTags).filter(
  (tag): tag is Exclude<CacheTag, "subscribers"> => tag !== "subscribers",
);
