import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { Logo } from "@/components/layout/logo";

/**
 * A different route group, a different layout: legal pages get a calm, minimal
 * chrome and long-form typography instead of the marketing header and footer.
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page max-w-3xl py-10">
      <header className="flex items-center justify-between">
        <Logo />
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to site
        </Link>
      </header>
      <main
        id="main"
        className="py-16 [&_h1]:text-4xl [&_h1]:font-semibold [&_h1]:tracking-tight [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_p]:mt-4 [&_p]:leading-7 [&_p]:text-muted"
      >
        {children}
      </main>
    </div>
  );
}
