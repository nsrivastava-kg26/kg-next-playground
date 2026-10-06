import { Card, Section, SectionHeading } from "@/components/ui/primitives";
import { getTestimonials } from "@/lib/cms/queries";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export async function Testimonials() {
  const testimonials = await getTestimonials();

  return (
    <Section>
      <SectionHeading
        eyebrow="Customers"
        title="Teams ship faster when they can see"
        description="Illustrative quotes from sample customers of this fictional product."
      />
      <ul className="mt-16 grid gap-5 lg:grid-cols-3">
        {testimonials.map((t) => (
          <li key={t.id}>
            <Card className="flex h-full flex-col justify-between gap-8">
              <blockquote className="text-pretty text-foreground/90">“{t.quote}”</blockquote>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid size-10 place-items-center rounded-full bg-linear-to-br from-accent to-brand text-sm font-semibold text-canvas"
                >
                  {initials(t.name)}
                </span>
                <div className="text-sm">
                  <p className="font-medium">{t.name}</p>
                  <p className="text-muted">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  );
}
