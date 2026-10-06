import { ButtonLink } from "@/components/ui/button";

export function CtaBanner() {
  return (
    <section className="container-page pb-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-line bg-linear-to-br from-brand/30 via-surface to-surface px-8 py-16 text-center sm:px-16">
        <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-60" />
        <div className="relative">
          <h2 className="text-gradient text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Your next AI incident is already in the logs
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
            Find it before your customers do. Free for 50k traces a month, no card required.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href="/pricing" size="lg">
              Start free
            </ButtonLink>
            <ButtonLink href="/demo" size="lg" variant="secondary">
              Talk to an engineer
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
