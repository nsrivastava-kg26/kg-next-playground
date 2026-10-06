"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import type { NavItem } from "@/lib/site";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  // Links close the menu in their onClick. We deliberately avoid usePathname() here:
  // it is URL data and would force this component behind a <Suspense> boundary.

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((value) => !value)}
        className="grid size-10 place-items-center rounded-full border border-line"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>
      {open ? (
        <nav
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-b border-line bg-canvas/95 px-5 pb-6 backdrop-blur"
        >
          <ul className="flex flex-col gap-1 pt-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-muted hover:text-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/demo"
            className={buttonVariants({ className: "mt-4 w-full" })}
            onClick={() => setOpen(false)}
          >
            Book a demo
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
