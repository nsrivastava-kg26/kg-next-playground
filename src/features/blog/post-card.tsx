import Link from "next/link";

import type { Post } from "@/lib/cms/schemas";
import { formatDate } from "@/lib/utils";

const gradients = [
  "from-brand/50 to-accent/20",
  "from-accent/40 to-success/20",
  "from-danger/30 to-brand/30",
];

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-surface/60 transition-colors hover:border-brand/50">
      <div
        aria-hidden="true"
        className={`h-36 bg-linear-to-br bg-grid ${gradients[index % gradients.length]}`}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="font-mono text-xs text-subtle">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.tags.join(", ")}
        </p>
        <h2 className="text-lg font-semibold text-balance">
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="text-sm text-muted">{post.description}</p>
        <p className="mt-auto pt-2 text-sm text-foreground/80">By {post.author}</p>
      </div>
    </article>
  );
}
