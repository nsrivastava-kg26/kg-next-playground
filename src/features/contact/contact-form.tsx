"use client";

import { CheckCircle2 } from "lucide-react";
import { useActionState } from "react";

import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form";

import { submitLead } from "./actions";
import { initialLeadState, type LeadField } from "./schema";

/**
 * Progressive enhancement: this form posts to a Server Action, so it works before
 * (or without) JavaScript. useActionState layers pending/error UI on top.
 */
export function ContactForm({ intent = "contact" }: { intent?: "contact" | "demo" }) {
  const [state, formAction, pending] = useActionState(submitLead, initialLeadState);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center gap-3 py-10 text-center">
        <CheckCircle2 className="size-10 text-success" aria-hidden="true" />
        <p className="text-lg font-medium">{state.message}</p>
      </div>
    );
  }

  const errors = state.status === "error" ? state.fieldErrors : undefined;
  const values = state.status === "error" ? state.values : undefined;
  const a11y = (field: LeadField) =>
    errors?.[field] ? { "aria-invalid": true as const, "aria-describedby": `${field}-error` } : {};

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* Honeypot: hidden from humans and assistive tech, catnip for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors?.name}>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            defaultValue={values?.name}
            {...a11y("name")}
          />
        </Field>
        <Field id="email" label="Work email" error={errors?.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            defaultValue={values?.email}
            {...a11y("email")}
          />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="company" label="Company" error={errors?.company}>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            defaultValue={values?.company}
          />
        </Field>
        {intent === "demo" ? (
          <input type="hidden" name="topic" value="demo" />
        ) : (
          <Field id="topic" label="Topic" error={errors?.topic}>
            <Select id="topic" name="topic" defaultValue={values?.topic ?? "sales"}>
              <option value="sales">Sales</option>
              <option value="support">Support</option>
              <option value="demo">Product demo</option>
              <option value="other">Something else</option>
            </Select>
          </Field>
        )}
      </div>

      <Field
        id="message"
        label={intent === "demo" ? "What do you want to see?" : "Message"}
        error={errors?.message}
      >
        <Textarea
          id="message"
          name="message"
          required
          defaultValue={values?.message}
          {...a11y("message")}
        />
      </Field>

      {state.status === "error" ? (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : intent === "demo" ? "Request demo" : "Send message"}
      </Button>
    </form>
  );
}
