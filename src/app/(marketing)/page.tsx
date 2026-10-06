import { CodeShowcase } from "@/features/marketing/code-showcase";
import { CtaBanner } from "@/features/marketing/cta-banner";
import { Faq } from "@/features/marketing/faq";
import { FeatureGrid } from "@/features/marketing/feature-grid";
import { Hero } from "@/features/marketing/hero";
import { LogoCloud } from "@/features/marketing/logo-cloud";
import { Stats } from "@/features/marketing/stats";
import { Testimonials } from "@/features/marketing/testimonials";

/**
 * A page is composition only: no data fetching, no styling decisions, no logic.
 * Each section owns its data (cached queries) and its own loading strategy.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <FeatureGrid />
      <Stats />
      <CodeShowcase />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}
