import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { Plan } from "@/lib/cms/schemas";

import { PricingTable } from "./pricing-table";

const plans: Plan[] = [
  {
    id: "team",
    name: "Team",
    description: "For teams",
    priceMonthly: 49,
    priceAnnual: 39,
    cta: "Start trial",
    highlighted: true,
    features: ["Evals"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For orgs",
    priceMonthly: null,
    priceAnnual: null,
    cta: "Talk to sales",
    highlighted: false,
    features: ["SSO"],
  },
];

describe("<PricingTable>", () => {
  it("defaults to annual pricing and switches to monthly", async () => {
    render(<PricingTable plans={plans} />);
    expect(screen.getByTestId("price-team")).toHaveTextContent("$39");

    await userEvent.click(screen.getByLabelText("Monthly"));
    expect(screen.getByTestId("price-team")).toHaveTextContent("$49");
  });

  it("shows Custom for plans without a list price", () => {
    render(<PricingTable plans={plans} />);
    expect(screen.getByTestId("price-enterprise")).toHaveTextContent("Custom");
  });

  it("is keyboard accessible via a labelled radio group", () => {
    render(<PricingTable plans={plans} />);
    expect(screen.getByRole("group", { name: "Billing period" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });
});
