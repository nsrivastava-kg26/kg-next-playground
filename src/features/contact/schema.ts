import { z } from "zod";

/** Shared by the server action (authoritative) and tests. */
export const leadSchema = z.object({
  name: z.string().trim().min(2, "Tell us your name.").max(80),
  email: z.email("Enter a valid work email."),
  company: z.string().trim().max(120).default(""),
  topic: z.enum(["sales", "support", "demo", "other"]).default("other"),
  message: z
    .string()
    .trim()
    .min(20, "A little more detail helps us route this (20+ characters).")
    .max(2000),
});

export type LeadInput = z.infer<typeof leadSchema>;
export type LeadField = keyof LeadInput;

export type LeadFormState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | {
      status: "error";
      message: string;
      fieldErrors?: Partial<Record<LeadField, string[]>>;
      /** Echo values back so a no-JS submission doesn't wipe the form. */
      values?: Partial<Record<LeadField, string>>;
    };

export const initialLeadState: LeadFormState = { status: "idle" };
