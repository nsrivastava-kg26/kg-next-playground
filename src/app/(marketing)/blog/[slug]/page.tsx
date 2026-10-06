import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { getPost, getPostSlugs } from "@/lib/cms/queries";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

/** Prerender every known post at build time. */
export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      url: `/blog/${post.slug}`,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const { default: Content } = await import(`@content/blog/${slug}.mdx`);

  return (
    <article className="container-page max-w-3xl py-16 sm:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        }}
      />
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> All posts
      </Link>
      <header className="mt-8 border-b border-line pb-8">
        <p className="font-mono text-xs text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.author}
        </p>
        <h1 className="mt-4 text-gradient text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 text-lg text-muted">{post.description}</p>
      </header>
      <div className="pb-8">
        <Content />
      </div>
    </article>
  );
}
