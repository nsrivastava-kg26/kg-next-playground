import "server-only";

/**
 * Fixed-window rate limiter, in memory, per server instance.
 * Good enough to stop a single bot hammering a form in dev or on one container.
 * For serverless or multi-instance production, back this with Redis/Upstash; the
 * signature stays the same.
 */
type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
  now: number = Date.now(),
): { success: boolean; remaining: number; resetAt: number } {
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    const fresh = { count: 1, resetAt: now + windowMs };
    windows.set(key, fresh);
    return { success: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }

  current.count += 1;
  const success = current.count <= limit;
  return { success, remaining: Math.max(0, limit - current.count), resetAt: current.resetAt };
}

export function __resetRateLimits() {
  windows.clear();
}
