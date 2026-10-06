"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";

import { env } from "@/env";
import { insertLead } from "@/server/db";
import { rateLimit } from "@/server/rate-limit";

import { leadSchema, type LeadField, type LeadFormState } from "./schema";

const FIELDS: LeadField[] = ["name", "email", "company", "topic", "message"];

export async function submitLead(
  _prevState: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  // 1. Spam: a hidden honeypot field that humans never fill.
  if (formData.get("website")) {
    return { status: "success", message: "Thanks! We'll be in touch within one business day." };
  }

  const values = Object.fromEntries(
    FIELDS.map((field) => [field, String(formData.get(field) ?? "")]),
  ) as Record<LeadField, string>;

  // 2. Abuse: rate-limit per client IP.
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`lead:${ip}`, { limit: 3 }).success) {
    return { status: "error", message: "Too many submissions. Please wait a minute.", values };
  }

  // 3. Validation: never trust the client, even though the form has `required`.
  const parsed = leadSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: "Please fix the highlighted fields.",
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  // 4. Mutation through the data access layer.
  const lead = await insertLead(parsed.data);

  // 5. Side effects after the response is sent: the user doesn't wait for email/CRM.
  after(() => {
    console.info(
      JSON.stringify({
        event: "lead.created",
        leadId: lead.id,
        topic: lead.topic,
        to: env.CONTACT_INBOX,
      }),
    );
  });

  // 6. Return the minimum: no internal IDs, no echo of what was stored.
  return {
    status: "success",
    message:
      lead.topic === "demo"
        ? "Demo requested! Check your inbox for a calendar link."
        : "Thanks! We'll be in touch within one business day.",
  };
}
