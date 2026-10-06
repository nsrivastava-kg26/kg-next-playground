"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Button from "./Button";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Product", href: "/#features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-[#2e2a4a] bg-[#14121f]/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="inline-block h-7 w-7 rounded-lg bg-gradient-to-br from-[#5fd4e6] to-[#8b6cf6]" />
          Lumen
        </Link>
        <nav className="hidden gap-6 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "text-white" : "text-[#a7a2cc] hover:text-white"}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button href="/demo">Book a demo</Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>
      {open && (
        <div className="flex flex-col gap-3 px-6 pb-4 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
