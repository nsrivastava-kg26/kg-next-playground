import type { Route } from "next";
import Link from "next/link";

import { Skeleton } from "@/components/ui/primitives";
import { getPosts } from "@/lib/cms/queries";
import { cn } from "@/lib/utils";

import { PostCard } from "./post-card";

/**
 * Reads `searchParams` (runtime data), so it renders inside the page's <Suspense>.
 * The posts themselves come from a cached query, so filtering is cheap.
 */
export async function PostList({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string | string[] }>;
}) {
  const [{ tag }, posts] = await Promise.all([searchParams, getPosts()]);
  const activeTag = typeof tag === "string" ? tag : undefined;
  const allTags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const visible = activeTag ? posts.filter((post) => post.tags.includes(activeTag)) : posts;

  return (
    <>
      <nav aria-label="Filter by tag" className="flex flex-wrap justify-center gap-2">
        <TagLink href="/blog" active={!activeTag}>
          All
        </TagLink>
        {allTags.map((t) => (
          <TagLink
            key={t}
            href={`/blog?tag=${encodeURIComponent(t)}` as Route}
            active={activeTag === t}
          >
            {t}
          </TagLink>
        ))}
      </nav>
      <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((post, index) => (
          <li key={post.slug}>
            <PostCard post={post} index={index} />
          </li>
        ))}
      </ul>
      {visible.length === 0 ? (
        <p className="mt-12 text-center text-muted">No posts with that tag yet.</p>
      ) : null}
    </>
  );
}

function TagLink({
  href,
  active,
  children,
}: {
  href: Route;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={cn(
        "rounded-full border border-line px-4 py-1.5 text-sm text-muted transition-colors hover:text-foreground",
        active && "border-brand/60 bg-brand/15 text-foreground",
      )}
    >
      {children}
    </Link>
  );
}

export function PostListSkeleton() {
  return (
    <>
      <div className="flex justify-center gap-2">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, i) => (
          <Skeleton key={i} className="h-80 rounded-card" />
        ))}
      </div>
    </>
  );
}
