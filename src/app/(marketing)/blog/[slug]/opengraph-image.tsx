import { ImageResponse } from "next/og";

import { OgTemplate, ogSize } from "@/features/seo/og-template";
import { getPost, getPostSlugs } from "@/lib/cms/queries";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Lumen blog post";

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return new ImageResponse(
    <OgTemplate eyebrow="Lumen Blog" title={post?.title ?? "Lumen Blog"} />,
    size,
  );
}
