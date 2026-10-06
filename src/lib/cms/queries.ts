import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { z } from "zod";

import { listFiles, readCollection } from "./client";
import {
  faqSchema,
  featureSchema,
  planSchema,
  postMetaSchema,
  testimonialSchema,
  type Post,
} from "./schemas";
import { cacheTags } from "./tags";

/**
 * Data-level caching. Every query:
 *  1. declares "use cache" (opt-in caching, nothing is cached implicitly),
 *  2. sets a named lifetime with cacheLife (profiles live in next.config.ts),
 *  3. tags itself so a CMS webhook can invalidate exactly what changed.
 */

export async function getPlans() {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.plans);
  return readCollection("plans.json", planSchema);
}

export async function getFeatures() {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.features);
  return readCollection("features.json", featureSchema);
}

export async function getTestimonials() {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.testimonials);
  return readCollection("testimonials.json", testimonialSchema);
}

export async function getFaqs() {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.faqs);
  return readCollection("faqs.json", faqSchema);
}

export async function getCustomers() {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.customers);
  return readCollection("customers.json", z.string());
}

export async function getPostSlugs() {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.posts);
  return listFiles("blog", ".mdx");
}

export async function getPost(slug: string): Promise<Post | null> {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.posts, `post:${slug}`);

  const slugs = await getPostSlugs();
  if (!slugs.includes(slug)) return null;

  const { metadata } = await import(`@content/blog/${slug}.mdx`);
  return { slug, ...postMetaSchema.parse(metadata) };
}

export async function getPosts(): Promise<Post[]> {
  "use cache";
  cacheLife("content");
  cacheTag(cacheTags.posts);

  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPost(slug)));
  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => b.date.localeCompare(a.date));
}
