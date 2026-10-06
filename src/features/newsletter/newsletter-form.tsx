"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/form";
import { cn } from "@/lib/utils";

import { subscribe } from "./actions";
import { initialSubscribeState } from "./schema";

export function NewsletterForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialSubscribeState);

  return (
    <form action={formAction} className="flex w-full max-w-md flex-col gap-2">
      <div className="flex gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={state.status === "error" || undefined}
        />
        <Button type="submit" disabled={pending} className="shrink-0">
          {pending ? "Joining…" : "Subscribe"}
        </Button>
      </div>
      <p
        aria-live="polite"
        className={cn("min-h-5 text-sm", state.status === "error" ? "text-danger" : "text-success")}
      >
        {state.status === "idle" ? "" : state.message}
      </p>
    </form>
  );
}
