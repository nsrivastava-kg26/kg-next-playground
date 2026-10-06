import {
  Activity,
  Code2,
  Coins,
  FlaskConical,
  Rewind,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { Card, Section, SectionHeading } from "@/components/ui/primitives";
import { getFeatures } from "@/lib/cms/queries";
import type { Feature } from "@/lib/cms/schemas";

const icons: Record<Feature["icon"], LucideIcon> = {
  activity: Activity,
  flask: FlaskConical,
  coins: Coins,
  shield: ShieldCheck,
  rewind: Rewind,
  code: Code2,
};

export async function FeatureGrid() {
  const features = await getFeatures();

  return (
    <Section id="features" className="scroll-mt-20">
      <SectionHeading
        eyebrow="Platform"
        title="Everything between the prompt and the answer"
        description="One SDK, one place to debug, measure and improve every AI feature in your product."
      />
      <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = icons[feature.icon];
          return (
            <li key={feature.id}>
              <Card className="group h-full transition-colors hover:border-brand/50">
                <span className="grid size-11 place-items-center rounded-xl border border-line bg-canvas text-accent transition-colors group-hover:text-brand">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{feature.body}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
