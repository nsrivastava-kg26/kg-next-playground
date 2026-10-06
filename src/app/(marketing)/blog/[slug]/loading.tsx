import { Skeleton } from "@/components/ui/primitives";

/** Route-level Suspense fallback for /blog/[slug] navigations to not-yet-prerendered posts. */
export default function BlogLoading() {
  return (
    <div className="container-page max-w-3xl py-24" aria-busy="true" aria-label="Loading post">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="mt-8 h-12 w-full" />
      <Skeleton className="mt-4 h-6 w-2/3" />
      <div className="mt-12 flex flex-col gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>
    </div>
  );
}
