import { cva, type VariantProps } from "class-variance-authority";
import Link, { type LinkProps } from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/**
 * One source of truth for button styling. Variants are typed, so
 * `<Button variant="primry">` is a compile error, not a silent unstyled button.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-foreground shadow-lg shadow-brand/25 hover:bg-brand-strong",
        secondary: "border border-line bg-surface text-foreground hover:bg-surface-raised",
        ghost: "text-muted hover:text-foreground",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-7 text-base",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: ComponentProps<"button"> & ButtonVariants) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

/** A link that looks like a button. Keeps <a> semantics for navigation. */
export function ButtonLink<T extends string>({
  className,
  variant,
  size,
  ...props
}: LinkProps<T> & Omit<ComponentProps<"a">, keyof LinkProps<T>> & ButtonVariants) {
  return <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
