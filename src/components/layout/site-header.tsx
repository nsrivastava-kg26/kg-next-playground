import { Suspense } from "react";

import { ButtonLink } from "@/components/ui/button";
import { mainNav } from "@/lib/site";

import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { ActiveNav, StaticNav } from "./nav-link";

/** Server Component. Only ActiveNav and MobileNav ship JavaScript. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/60 bg-canvas/70 backdrop-blur-xl">
      <div className="relative container-page flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          <Suspense fallback={<StaticNav items={mainNav} />}>
            <ActiveNav items={mainNav} />
          </Suspense>
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/contact" variant="ghost" size="sm">
            Sign in
          </ButtonLink>
          <ButtonLink href="/demo" size="sm">
            Book a demo
          </ButtonLink>
        </div>
        <MobileNav items={mainNav} />
      </div>
    </header>
  );
}
