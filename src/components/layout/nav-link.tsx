"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "@/lib/site";
import { cn } from "@/lib/utils";

const linkClass =
  "rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-foreground";

function isActive(pathname: string, href: Route) {
  const base = href.split("#")[0] || "/";
  return base !== "/" && pathname.startsWith(base);
}

/**
 * Client island: only the active-state logic needs the browser (usePathname).
 *
 * usePathname() is URL data. On routes whose params aren't known at build time it is
 * only available at request time, so this component MUST render inside <Suspense>
 * (see SiteHeader). The fallback is the same nav without active styles.
 */
export function ActiveNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={cn(linkClass, active && "text-foreground")}
          >
            {item.label}
          </Link>
        );
      })}
    </>
  );
}

/** Server-renderable fallback: identical markup, no active state, no layout shift. */
export function StaticNav({ items }: { items: NavItem[] }) {
  return (
    <>
      {items.map((item) => (
        <Link key={item.href} href={item.href} className={linkClass}>
          {item.label}
        </Link>
      ))}
    </>
  );
}
