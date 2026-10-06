"use client";

import { useCallback, useMemo, useState } from "react";
import Button from "./Button";

export default function PricingTable({ plans }: { plans: any[] }) {
  const [annual, setAnnual] = useState(true);
  const toggle = useCallback(() => setAnnual((a) => !a), []);
  const rows = useMemo(
    () => plans.map((p) => ({ ...p, price: annual ? p.priceAnnual : p.priceMonthly })),
    [plans, annual],
  );
  return (
    <div className="text-center">
      <button onClick={toggle} className="rounded-full border border-[#3a3560] px-5 py-2 text-sm">
        {annual ? "Annual · save 20% (click for monthly)" : "Monthly (click for annual)"}
      </button>
      <div className="mt-12 grid gap-5 text-left lg:grid-cols-3">
        {rows.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border p-8"
            style={{ borderColor: p.highlighted ? "#8b6cf6" : "#2e2a4a", background: "#1d1a2e" }}
          >
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p className="text-sm text-[#a7a2cc]">{p.description}</p>
            <p className="mt-6 text-4xl font-semibold">{p.price === null ? "Custom" : `$${p.price}`}</p>
            <div className="mt-6">
              <Button href="/contact" secondary={!p.highlighted}>
                {p.cta}
              </Button>
            </div>
            <ul className="mt-8 flex flex-col gap-2 text-sm text-[#a7a2cc]">
              {p.features.map((f: string) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
