import type { MetadataRoute } from "next";

import { getPosts } from "@/lib/cms/queries";
import { siteConfig } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/pricing"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/blog"), changeFrequency: "weekly", priority: 0.8 },
    { url: url("/contact"), changeFrequency: "yearly", priority: 0.5 },
    { url: url("/demo"), changeFrequency: "yearly", priority: 0.6 },
    { url: url("/privacy"), changeFrequency: "yearly", priority: 0.2 },
    { url: url("/terms"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
