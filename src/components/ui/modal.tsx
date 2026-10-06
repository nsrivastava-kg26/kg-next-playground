"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Route-driven modal for intercepted routes. Uses the native <dialog> element, which
 * gives focus trapping, Escape-to-close and an inert background for free.
 * Closing navigates back, so the URL is always the source of truth.
 */
export function Modal({ title, children }: { title: string; children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="modal-title"
      onClose={() => router.back()}
      onClick={(event) => {
        // Clicking the backdrop (the dialog element itself) closes it.
        if (event.target === event.currentTarget) dialogRef.current?.close();
      }}
      className="m-auto w-[min(92vw,36rem)] rounded-card border border-line bg-surface p-0 text-foreground shadow-2xl shadow-black/50 backdrop:bg-canvas/70 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <h2 id="modal-title" className="text-lg font-semibold">
          {title}
        </h2>
        <button
          type="button"
          aria-label="Close"
          onClick={() => dialogRef.current?.close()}
          className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-raised hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>
      <div className="p-6">{children}</div>
    </dialog>
  );
}
