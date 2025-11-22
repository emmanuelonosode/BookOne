import { NextResponse } from "next/server";

export function middleware(request) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  // Performance headers
  response.headers.set("X-DNS-Prefetch-Control", "on");

  // SEO headers
  // By default, mark HTML page responses as indexable. For static assets
  // (images, favicon, manifest, etc.) and API responses, mark them as noindex.
  const pathname = request.nextUrl.pathname || "";
  const isStaticAsset =
    pathname.includes(".") &&
    /\.(js|css|png|jpg|jpeg|gif|svg|ico|webmanifest|json|avif|webp|woff2?|map)$/.test(
      pathname
    );
  const isApi = pathname.startsWith("/api/");

  if (isStaticAsset || isApi) {
    // Prevent indexing of binary/static assets and API endpoints
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  } else {
    response.headers.set("X-Robots-Tag", "index, follow");
  }

  // Cache control for static assets
  if (
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/static/") ||
    isStaticAsset
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  // Cache control for API routes
  if (request.nextUrl.pathname.startsWith("/api/")) {
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate"
    );
  }

  return response;
}

// Specify which paths to apply this to:
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
