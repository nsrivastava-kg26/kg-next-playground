"use server";

import { updateTag } from "next/cache";
import { headers } from "next/headers";

import { cacheTags } from "@/lib/cms/tags";
import { addSubscriber } from "@/server/db";
import { rateLimit } from "@/server/rate-limit";

import { subscribeSchema, type SubscribeState } from "./schema";

/**
 * Server Actions are public HTTP endpoints. Treat every argument as hostile:
 * validate, rate-limit, and return only what the UI needs.
 */
export async function subscribe(
  _prevState: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!rateLimit(`subscribe:${ip}`, { limit: 5 }).success) {
    return { status: "error", message: "Too many attempts. Try again in a minute." };
  }

  const parsed = subscribeSchema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  const { alreadySubscribed } = await addSubscriber(parsed.data.email);

  // Read-your-writes: the cached subscriber count is expired and re-read in this
  // same request, so the visitor sees the number go up immediately.
  updateTag(cacheTags.subscribers);

  return {
    status: "success",
    message: alreadySubscribed ? "You're already on the list." : "You're in. Watch your inbox.",
  };
}
