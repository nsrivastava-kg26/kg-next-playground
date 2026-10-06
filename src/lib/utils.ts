import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes, letting later classes win over earlier conflicting ones. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric",
  timeZone: "UTC",
});

/** Deterministic date formatting (fixed locale + UTC) so server and client output match. */
export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}

const compactNumber = new Intl.NumberFormat("en-US", { notation: "compact" });

export function formatCompact(value: number) {
  return compactNumber.format(value);
}
