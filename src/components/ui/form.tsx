import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-xl border border-line bg-canvas/60 px-4 py-3 text-sm text-foreground placeholder:text-subtle transition-colors focus:border-brand focus:outline-none aria-invalid:border-danger";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldBase, "h-11 py-0", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(fieldBase, "min-h-32 resize-y", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(fieldBase, "h-11 py-0", className)} {...props} />;
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium text-foreground", className)} {...props} />;
}

/** Accessible field wrapper: wires the error message to the input via aria-describedby. */
export function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string[] | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error?.length ? (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error[0]}
        </p>
      ) : null}
    </div>
  );
}
