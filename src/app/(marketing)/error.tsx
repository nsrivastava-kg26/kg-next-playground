"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

/**
 * Segment error boundary. Keeps the header and footer (from the layout above) on screen
 * and lets the user retry just the broken segment.
 */
export default function MarketingError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // In production, report to your error tracker here. `digest` matches the server log.
    console.error(error);
  }, [error]);

  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-mono text-xs tracking-[0.2em] text-danger uppercase">Something broke</p>
      <h1 className="text-3xl font-semibold tracking-tight">This section failed to load</h1>
      <p className="max-w-md text-muted">
        It&apos;s on us, not you. Try again, and if it keeps happening, let us know.
        {error.digest ? (
          <span className="mt-2 block font-mono text-xs">Ref: {error.digest}</span>
        ) : null}
      </p>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
