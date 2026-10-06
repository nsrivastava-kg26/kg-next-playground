import type { Metadata } from "next";

import { Card, Section, SectionHeading } from "@/components/ui/primitives";
import { ContactForm } from "@/features/contact/contact-form";

export const metadata: Metadata = {
  title: "Book a demo",
  description: "A 30-minute walkthrough of Lumen with an engineer, using your own use case.",
  alternates: { canonical: "/demo" },
};

/**
 * The full-page version of /demo. Shown on direct visits, refreshes and shared links.
 * Soft navigations from inside the site are intercepted by @modal/(.)demo instead.
 */
export default function DemoPage() {
  return (
    <Section className="max-w-2xl">
      <SectionHeading
        as="h1"
        eyebrow="Demo"
        title="See Lumen on your own traces"
        description="30 minutes with an engineer. Bring a real use case and leave with a working setup."
      />
      <Card className="relative mt-12 p-8">
        <ContactForm intent="demo" />
      </Card>
    </Section>
  );
}
