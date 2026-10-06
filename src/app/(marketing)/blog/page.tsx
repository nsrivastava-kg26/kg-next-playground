import type { Metadata } from "next";
import { Suspense } from "react";

import { Section, SectionHeading } from "@/components/ui/primitives";
import { PostList, PostListSkeleton } from "@/features/blog/post-list";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering notes on tracing, evals and shipping AI features to production.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage({ searchParams }: PageProps<"/blog">) {
  return (
    <Section>
      {/* Static: part of the prerendered shell. */}
      <SectionHeading
        as="h1"
        eyebrow="Blog"
        title="Notes from the trace view"
        description="What we learn building observability for AI products."
      />
      {/* Runtime (searchParams): streams in. The promise is passed down, not awaited here. */}
      <div className="mt-12">
        <Suspense fallback={<PostListSkeleton />}>
          <PostList searchParams={searchParams} />
        </Suspense>
      </div>
    </Section>
  );
}
