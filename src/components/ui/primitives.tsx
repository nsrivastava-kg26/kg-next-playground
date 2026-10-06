import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("container-page py-20 sm:py-28", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-xs font-medium tracking-[0.2em] text-accent uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  as: Heading = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading className="mt-3 text-gradient text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </Heading>
      {description ? <p className="mt-4 text-lg text-pretty text-muted">{description}</p> : null}
    </div>
  );
}

export function Card({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("rounded-card border border-line bg-surface/70 p-6 backdrop-blur", className)}
      {...props}
    />
  );
}

export function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-muted",
        className,
      )}
      {...props}
    />
  );
}

export function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-lg bg-surface-raised", className)}
      {...props}
    />
  );
}
