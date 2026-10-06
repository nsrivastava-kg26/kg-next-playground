import { Clock, Mail, MessageSquare } from "lucide-react";
import type { Metadata } from "next";

import { Card, Section, SectionHeading } from "@/components/ui/primitives";
import { ContactForm } from "@/features/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Talk to the Lumen team about pricing, security reviews or a custom deployment.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: MessageSquare, title: "Sales", body: "Pricing, procurement and security reviews." },
  { icon: Mail, title: "Support", body: "Existing customers get a reply within 4 business hours." },
  {
    icon: Clock,
    title: "Response time",
    body: "Every message is answered by an engineer, not a bot.",
  },
];

export default function ContactPage() {
  return (
    <Section className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
      <div>
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Contact"
          title="Talk to a human"
          description="Tell us what you're building. We'll route you to the right engineer."
        />
        <ul className="mt-10 flex flex-col gap-4">
          {channels.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <Icon className="mt-1 size-5 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <p className="font-medium">{title}</p>
                <p className="text-sm text-muted">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Card className="relative p-8">
        <ContactForm />
      </Card>
    </Section>
  );
}
