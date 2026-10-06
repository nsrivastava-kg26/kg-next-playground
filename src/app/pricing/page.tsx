"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import PricingTable from "../../components/PricingTable";

export default function Pricing() {
  const [plans, setPlans] = useState<any[] | null>(null);
  useEffect(() => {
    fetch("/api/plans")
      .then((r) => r.json())
      .then(setPlans);
  }, []);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-24">
        <h1 className="text-center text-5xl font-semibold">Simple pricing that scales with your traces</h1>
        <div className="mt-12">{plans ? <PricingTable plans={plans} /> : <p className="text-center">Loading...</p>}</div>
      </main>
      <Footer />
    </>
  );
}
