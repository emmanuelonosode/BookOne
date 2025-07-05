import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();
  response.headers.set("X-Robots-Tag", "index, follow");
  return response;
}

// Optionally, specify which paths to apply this to:
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)"],
};
