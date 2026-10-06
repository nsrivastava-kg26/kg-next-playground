"use client";

import { useState } from "react";
import useContent from "./useContent";
import Button from "./Button";

export function LogoCloud() {
  const customers = useContent("customers.json");
  return (
    <section className="mx-auto max-w-6xl px-6 py-12 text-center">
      <p className="text-sm text-[#6f6a96]">Trusted by AI teams at companies like these (sample names)</p>
      <div className="mt-8 grid grid-cols-3 gap-8 lg:grid-cols-6">
        {customers.map((c: string) => (
          <span key={c} className="font-mono text-lg text-[#a7a2cc]">
            {c}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Features() {
  const features = useContent("features.json");
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-4xl font-semibold">Everything between the prompt and the answer</h2>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {features.map((f: any) => (
          <div key={f.id} className="rounded-2xl border border-[#2e2a4a] bg-[#1d1a2e] p-6">
            <h3 className="font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-[#a7a2cc]">{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  const items = useContent("testimonials.json");
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <h2 className="text-center text-4xl font-semibold">Teams ship faster when they can see</h2>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {items.map((t: any) => (
          <div key={t.id} className="rounded-2xl border border-[#2e2a4a] bg-[#1d1a2e] p-6">
            <p>“{t.quote}”</p>
            <p className="mt-6 text-sm text-[#a7a2cc]">
              {t.name}, {t.role}, {t.company}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Faq() {
  const faqs = useContent("faqs.json");
  const [open, setOpen] = useState<string | null>(null);
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="text-center text-4xl font-semibold">Questions, answered</h2>
      <div className="mt-12 rounded-2xl border border-[#2e2a4a]">
        {faqs.map((f: any) => (
          <div key={f.id} className="border-b border-[#2e2a4a] px-6 py-5 last:border-0">
            <button className="w-full text-left font-medium" onClick={() => setOpen(open === f.id ? null : f.id)}>
              {f.question}
            </button>
            {open === f.id && <p className="mt-3 text-sm text-[#a7a2cc]">{f.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-6xl px-6">
      <div className="rounded-[2rem] border border-[#2e2a4a] bg-gradient-to-br from-[#3b2a8a]/60 to-[#1d1a2e] px-8 py-16 text-center">
        <h2 className="text-4xl font-semibold">Your next AI incident is already in the logs</h2>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/pricing">Start free</Button>
          <Button href="/demo" secondary>
            Talk to an engineer
          </Button>
        </div>
      </div>
    </section>
  );
}
