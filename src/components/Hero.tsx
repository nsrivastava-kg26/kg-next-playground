"use client";

import { useState } from "react";
import Button from "./Button";

export default function Hero() {
  // A/B test the CTA label
  const [variant] = useState(Math.random() < 0.5 ? "a" : "b");
  return (
    <section className="relative overflow-hidden px-6 pt-24 pb-16 text-center">
      <div className="absolute top-[-200px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#8b6cf6]/25 blur-[140px]" />
      <div className="relative mx-auto max-w-5xl">
        <span className="rounded-full border border-[#3a3560] px-3 py-1 text-xs text-[#a7a2cc]">
          Evals in CI are now generally available
        </span>
        <h1 className="mt-6 text-5xl font-semibold tracking-tight sm:text-7xl">
          See inside every AI request you ship
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[#a7a2cc]">
          Lumen traces prompts, tool calls and tokens end to end, then turns them into evals, budgets and
          alerts your whole team can act on.
        </p>
        <div className="mt-10 flex justify-center gap-3">
          <Button href="/pricing">{variant === "a" ? "Start free" : "Get started in 2 minutes"} →</Button>
          <Button href="/demo" secondary>
            Book a demo
          </Button>
        </div>
        <img src="/images/dashboard.png" className="mt-16 rounded-3xl border border-[#2e2a4a]" />
      </div>
    </section>
  );
}
