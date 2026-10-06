import Link from "next/link";

import { NewsletterForm } from "@/features/newsletter/newsletter-form";
import { SubscriberCount } from "@/features/newsletter/subscriber-count";
import { footerNav, siteConfig } from "@/lib/site";

import { Logo } from "./logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line/60 bg-surface/30">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-[1.4fr_2fr]">
        <div className="flex flex-col gap-5">
          <Logo />
          <p className="max-w-sm text-sm text-muted">
            Join <SubscriberCount /> engineers getting one practical note on shipping AI each month.
          </p>
          <NewsletterForm />
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {footerNav.map((group) => (
            <div key={group.title}>
              <h2 className="text-sm font-semibold">{group.title}</h2>
              <ul className="mt-4 flex flex-col gap-3">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-sm text-muted hover:text-foreground">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-line/60 py-6 text-xs text-subtle sm:flex-row sm:justify-between">
        <p>
          © {siteConfig.name} Labs. A fictional company built as the Next.js Golden Standard
          reference.
        </p>
        <p>Made with Next.js, React Server Components and Tailwind CSS.</p>
      </div>
    </footer>
  );
}
