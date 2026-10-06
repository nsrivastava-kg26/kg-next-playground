import type { Instrumentation } from "next";

/**
 * Runs once when a server instance boots. Register OpenTelemetry / APM here
 * (for example `registerOTel({ serviceName: "lumen-web" })` from @vercel/otel).
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.info(JSON.stringify({ event: "server.start", runtime: "nodejs" }));
  }
}

/**
 * Called for every uncaught error during rendering, route handlers and server actions.
 * Ship it to your error tracker; structured JSON keeps it searchable.
 */
export const onRequestError: Instrumentation.onRequestError = async (error, request, context) => {
  const err = error as Error & { digest?: string };
  console.error(
    JSON.stringify({
      event: "request.error",
      message: err.message,
      digest: err.digest,
      path: request.path,
      method: request.method,
      routePath: context.routePath,
      routeType: context.routeType,
    }),
  );
};
