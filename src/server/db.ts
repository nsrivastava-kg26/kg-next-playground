import "server-only";

/**
 * In-memory persistence so the repo runs with zero infrastructure.
 * In a real deployment replace this module with your database client (Drizzle, Prisma...).
 * Everything that touches storage goes through these functions: the Data Access Layer.
 *
 * Stored on globalThis so dev-server hot reloads don't wipe it.
 */
export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  topic: "sales" | "support" | "demo" | "other";
  message: string;
  createdAt: string;
};

type Store = { leads: Lead[]; subscribers: Set<string> };

const globalStore = globalThis as unknown as { __lumenStore?: Store };
const store: Store = (globalStore.__lumenStore ??= { leads: [], subscribers: new Set() });

/** Marketing baseline so the counter looks realistic on a fresh boot. */
const SUBSCRIBER_BASELINE = 12_480;

export async function insertLead(input: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
  const lead: Lead = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  store.leads.push(lead);
  return lead;
}

export async function addSubscriber(email: string): Promise<{ alreadySubscribed: boolean }> {
  const normalized = email.trim().toLowerCase();
  if (store.subscribers.has(normalized)) return { alreadySubscribed: true };
  store.subscribers.add(normalized);
  return { alreadySubscribed: false };
}

export async function countSubscribers(): Promise<number> {
  return SUBSCRIBER_BASELINE + store.subscribers.size;
}

/** Test helper. Never call from app code. */
export function __resetStore() {
  store.leads = [];
  store.subscribers = new Set();
}
