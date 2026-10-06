import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/book-a-demo") {
    return NextResponse.redirect(new URL("/demo", request.url));
  }
  return NextResponse.next();
}
