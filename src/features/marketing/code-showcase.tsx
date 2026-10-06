import { Check } from "lucide-react";

import { Section, SectionHeading } from "@/components/ui/primitives";

const snippet = `import { lumen } from "@lumen/sdk";

lumen.init({ project: "checkout-assistant" });

export const answer = lumen.trace("answer", async (question) => {
  const docs = await retrieve(question); // span
  return model.generate({ question, docs }); // span + cost
});`;

const points = [
  "OpenTelemetry-native, exports to any backend",
  "Automatic spans for popular AI SDKs",
  "PII redaction runs before data leaves your servers",
];

/** Pure Server Component: zero client JavaScript for a rich-looking section. */
export function CodeShowcase() {
  return (
    <Section className="grid items-center gap-12 lg:grid-cols-2">
      <div>
        <SectionHeading
          align="left"
          eyebrow="Developer first"
          title="Two lines to instrument. Zero to maintain."
          description="Wrap a function, ship, and every call shows up as a trace with latency, tokens and cost attached."
        />
        <ul className="mt-8 flex flex-col gap-3">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-3 text-muted">
              <Check className="size-4 text-success" aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      </div>
      <figure className="overflow-hidden rounded-card border border-line bg-surface shadow-2xl shadow-brand/10">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-3 rounded-full bg-danger/70" />
          <span className="size-3 rounded-full bg-accent/60" />
          <span className="size-3 rounded-full bg-success/70" />
          <figcaption className="ml-3 font-mono text-xs text-subtle">answer.ts</figcaption>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6 text-muted">
          <code>{snippet}</code>
        </pre>
      </figure>
    </Section>
  );
}
