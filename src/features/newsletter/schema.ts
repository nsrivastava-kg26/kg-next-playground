import { z } from "zod";

export const subscribeSchema = z.object({
  email: z.email("Enter a valid email address."),
});

export type SubscribeState =
  | { status: "idle" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export const initialSubscribeState: SubscribeState = { status: "idle" };
