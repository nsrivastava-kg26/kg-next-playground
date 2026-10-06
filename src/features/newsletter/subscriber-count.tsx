import { cacheLife, cacheTag } from "next/cache";

import { cacheTags } from "@/lib/cms/tags";
import { formatCompact } from "@/lib/utils";
import { countSubscribers } from "@/server/db";

async function getSubscriberCount() {
  "use cache";
  cacheLife("hours");
  cacheTag(cacheTags.subscribers);
  return countSubscribers();
}

/** Cached UI that the `subscribe` action refreshes with updateTag(). */
export async function SubscriberCount() {
  const count = await getSubscriberCount();
  return <span className="font-semibold text-foreground">{formatCompact(count)}+</span>;
}
