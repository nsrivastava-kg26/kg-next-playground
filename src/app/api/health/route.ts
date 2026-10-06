import { connection } from "next/server";

/**
 * Liveness probe for load balancers and uptime monitors.
 * With Cache Components, GET handlers are prerendered like pages unless they touch
 * request-time data, so `connection()` opts this one into running on every request.
 */
export async function GET() {
  await connection();
  return Response.json(
    { status: "ok", uptime: Math.round(process.uptime()) },
    { headers: { "Cache-Control": "no-store" } },
  );
}
