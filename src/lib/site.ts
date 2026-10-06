import type { Route } from "next";

/**
 * Client-safe site configuration. Anything here may end up in the browser bundle,
 * so it must never contain secrets. Secrets live in `src/env.ts` (server-only).
 */
export const siteConfig = {
  name: "Lumen",
  tagline: "Observability for AI-native products",
  description:
    "Lumen traces every prompt, tool call and token so your team can ship AI features with confidence.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  social: {
    github: "https://github.com/",
    x: "https://x.com/",
  },
} as const;

export type NavItem = { label: string; href: Route };

export const mainNav: NavItem[] = [
  { label: "Product", href: "/#features" as Route },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "/#features" as Route },
      { label: "Pricing", href: "/pricing" },
      { label: "Book a demo", href: "/demo" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    items: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];
