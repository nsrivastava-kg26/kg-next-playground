import Link from "next/link";

import { siteConfig } from "@/lib/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="lumen-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.82 0.13 200)" />
          <stop offset="1" stopColor="oklch(0.66 0.2 285)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#lumen-mark)" />
      <path d="M10 8v16h12" stroke="white" strokeWidth="3.2" fill="none" strokeLinecap="round" />
      <circle cx="21" cy="11" r="2.6" fill="white" />
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
      <LogoMark className="size-7" />
      <span>{siteConfig.name}</span>
    </Link>
  );
}
