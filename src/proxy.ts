import { NextResponse, type NextRequest } from "next/server";

import {
  HERO_CTA_COOKIE,
  isHeroCtaVariant,
  pickHeroCtaVariant,
} from "@/features/experiments/hero-cta";

/**
 * Proxy (formerly middleware) runs before routing. Keep it thin and fast:
 * rewrites, redirects, headers, cookies. Never data fetching or auth decisions
 * that the page itself must also enforce.
 */
export function proxy(request: NextRequest) {
  const existing = request.cookies.get(HERO_CTA_COOKIE)?.value;
  if (isHeroCtaVariant(existing)) return NextResponse.next();

  const variant = pickHeroCtaVariant();

  // Set it on the *request* so the very first render already sees the bucket...
  request.cookies.set(HERO_CTA_COOKIE, variant);
  const response = NextResponse.next({ request: { headers: request.headers } });

  // ...and on the *response* so the browser keeps it for future visits.
  response.cookies.set(HERO_CTA_COOKIE, variant, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
  return response;
}

export const config = {
  // Only the home page runs the experiment. Static assets never hit the proxy.
  matcher: ["/"],
};
