import type { Metadata } from "next";

import { Section, SectionHeading } from "@/components/ui/primitives";
import { Faq } from "@/features/marketing/faq";
import { PricingTable } from "@/features/pricing/pricing-table";
import { getPlans } from "@/lib/cms/queries";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Start free, then pay per seat as your team grows. Enterprise plans include SSO and self-hosting.",
  alternates: { canonical: "/pricing" },
};

// Navigations into /pricing must render instantly (validated in dev, tested in e2e).
export const instant = true;

export default async function PricingPage() {
  const plans = await getPlans();

  return (
    <>
      <Section className="pb-0">
        <SectionHeading
          as="h1"
          eyebrow="Pricing"
          title="Simple pricing that scales with your traces"
          description="Every plan includes unlimited seats for viewers and all core tracing features."
        />
        <div className="mt-12">
          <PricingTable plans={plans} />
        </div>
      </Section>
      <Faq />
    </>
  );
}
