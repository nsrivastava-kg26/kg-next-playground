import { z } from "zod";

/**
 * CMS content is external input: validate it at the boundary so a bad edit in the CMS
 * produces a clear error instead of `undefined is not a function` deep in a component.
 */
export const planSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  priceMonthly: z.number().nullable(),
  priceAnnual: z.number().nullable(),
  cta: z.string(),
  highlighted: z.boolean(),
  features: z.array(z.string()),
});

export const featureSchema = z.object({
  id: z.string(),
  icon: z.enum(["activity", "flask", "coins", "shield", "rewind", "code"]),
  title: z.string(),
  body: z.string(),
});

export const testimonialSchema = z.object({
  id: z.string(),
  quote: z.string(),
  name: z.string(),
  role: z.string(),
  company: z.string(),
});

export const faqSchema = z.object({
  id: z.string(),
  question: z.string(),
  answer: z.string(),
});

export const postMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.iso.date(),
  author: z.string(),
  tags: z.array(z.string()).min(1),
});

export type Plan = z.infer<typeof planSchema>;
export type Feature = z.infer<typeof featureSchema>;
export type Testimonial = z.infer<typeof testimonialSchema>;
export type Faq = z.infer<typeof faqSchema>;
export type PostMeta = z.infer<typeof postMetaSchema>;
export type Post = PostMeta & { slug: string };
