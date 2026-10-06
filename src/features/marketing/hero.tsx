import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { cookies } from "next/headers";
import { Suspense } from "react";

import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import {
  HERO_CTA_COOKIE,
  heroCtaVariants,
  isHeroCtaVariant,
} from "@/features/experiments/hero-cta";
import { cn } from "@/lib/utils";

import dashboard from "@/assets/dashboard.png";

/** Runtime data (a cookie) lives in its own small component behind Suspense. */
async function ExperimentCta() {
  const value = (await cookies()).get(HERO_CTA_COOKIE)?.value;
  const variant = isHeroCtaVariant(value) ? value : "a";
  return (
    <ButtonLink href="/pricing" size="lg" data-variant={variant}>
      {heroCtaVariants[variant]}
      <ArrowRight className="size-4" aria-hidden="true" />
    </ButtonLink>
  );
}

/** Same footprint as the real button, so streaming it in causes zero layout shift. */
function CtaFallback() {
  return (
    <span className={cn(buttonVariants({ size: "lg" }), "w-56 animate-pulse text-transparent")}>
      Loading
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute top-[-20%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-brand/25 blur-[140px]"
      />

      <div className="relative container-page flex flex-col items-center pt-20 pb-16 text-center sm:pt-28">
        <Badge className="animate-fade-up">
          <Sparkles className="size-3.5 text-accent" aria-hidden="true" />
          Evals in CI are now generally available
        </Badge>

        <h1 className="mt-6 max-w-4xl animate-fade-up text-gradient text-5xl font-semibold tracking-tight text-balance [animation-delay:80ms] sm:text-7xl">
          See inside every AI request you ship
        </h1>
        <p className="mt-6 max-w-2xl animate-fade-up text-lg text-pretty text-muted [animation-delay:160ms] sm:text-xl">
          Lumen traces prompts, tool calls and tokens end to end, then turns them into evals,
          budgets and alerts your whole team can act on.
        </p>

        <div className="mt-10 flex animate-fade-up flex-col items-center gap-3 [animation-delay:240ms] sm:flex-row">
          <Suspense fallback={<CtaFallback />}>
            <ExperimentCta />
          </Suspense>
          <ButtonLink href="/demo" variant="secondary" size="lg">
            Book a demo
          </ButtonLink>
        </div>

        <div className="relative mt-16 w-full max-w-5xl animate-fade-up [animation-delay:320ms]">
          <div
            aria-hidden="true"
            className="absolute -inset-px rounded-[1.6rem] bg-linear-to-b from-brand/60 via-line to-transparent"
          />
          <Image
            src={dashboard}
            alt="Lumen trace explorer showing a request waterfall with latency and token cost per span"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="relative rounded-3xl border border-line"
          />
        </div>
      </div>
    </section>
  );
}
