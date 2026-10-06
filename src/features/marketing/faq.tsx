import { Plus } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/primitives";
import { getFaqs } from "@/lib/cms/queries";

/** Native <details>/<summary>: accessible accordion with zero JavaScript. */
export async function Faq() {
  const faqs = await getFaqs();

  return (
    <Section className="max-w-3xl">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      <div className="mt-12 divide-y divide-line rounded-card border border-line bg-surface/50">
        {faqs.map((faq) => (
          <details key={faq.id} className="group px-6 py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium [&::-webkit-details-marker]:hidden">
              {faq.question}
              <Plus
                className="size-4 shrink-0 text-muted transition-transform group-open:rotate-45"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
