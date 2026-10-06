"use client";

import { Check } from "lucide-react";
import { useState } from "react";

import { ButtonLink } from "@/components/ui/button";
import type { Plan } from "@/lib/cms/schemas";
import { cn } from "@/lib/utils";

export type Billing = "monthly" | "annual";

export function priceFor(plan: Plan, billing: Billing) {
  return billing === "annual" ? plan.priceAnnual : plan.priceMonthly;
}

/**
 * Client island: it owns the billing toggle state. Plans arrive as serialisable
 * props from a Server Component, so no data fetching happens in the browser.
 */
export function PricingTable({ plans }: { plans: Plan[] }) {
  const [billing, setBilling] = useState<Billing>("annual");

  return (
    <div className="flex flex-col items-center">
      <fieldset className="flex rounded-full border border-line bg-surface p-1">
        <legend className="sr-only">Billing period</legend>
        {(["monthly", "annual"] as const).map((option) => (
          <label
            key={option}
            className={cn(
              "cursor-pointer rounded-full px-5 py-2 text-sm font-medium text-muted transition-colors has-focus-visible:outline-2 has-focus-visible:outline-accent",
              billing === option && "bg-surface-raised text-foreground",
            )}
          >
            <input
              type="radio"
              name="billing"
              value={option}
              checked={billing === option}
              onChange={() => setBilling(option)}
              className="sr-only"
            />
            {option === "monthly" ? "Monthly" : "Annual · save 20%"}
          </label>
        ))}
      </fieldset>

      <ul className="mt-12 grid w-full gap-5 lg:grid-cols-3">
        {plans.map((plan) => {
          const price = priceFor(plan, billing);
          return (
            <li
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-card border border-line bg-surface/70 p-8",
                plan.highlighted && "border-brand/70 bg-surface shadow-2xl shadow-brand/20",
              )}
            >
              {plan.highlighted ? (
                <span className="absolute -top-3 left-8 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
                  Most popular
                </span>
              ) : null}
              <h2 className="text-lg font-semibold">{plan.name}</h2>
              <p className="mt-1 text-sm text-muted">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-1" data-testid={`price-${plan.id}`}>
                {price === null ? (
                  <span className="text-4xl font-semibold tracking-tight">Custom</span>
                ) : (
                  <>
                    <span className="text-4xl font-semibold tracking-tight">${price}</span>
                    <span className="text-sm text-muted">/ seat / month</span>
                  </>
                )}
              </p>
              <ButtonLink
                href={plan.priceMonthly === null ? "/demo" : "/contact"}
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-6"
              >
                {plan.cta}
              </ButtonLink>
              <ul className="mt-8 flex flex-col gap-3 text-sm">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-muted">
                    <Check className="size-4 shrink-0 text-success" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
