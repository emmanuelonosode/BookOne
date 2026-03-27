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
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://randomuser.me https://placehold.co; connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://www.google-analytics.com https://sheetdb.io; frame-src https://www.loom.com https://www.youtube.com https://player.vimeo.com; frame-ancestors 'none';"
  );

  // Performance headers
  response.headers.set("X-DNS-Prefetch-Control", "on");

  // X-Robots-Tag: only set on HTML pages (not on assets)
  const pathname = request.nextUrl.pathname || "";
  const isAsset = /\.(js|css|png|jpg|jpeg|gif|svg|ico|webmanifest|avif|webp|woff2?|map|txt|xml)$/.test(pathname);

  if (!isAsset) {
    response.headers.set("X-Robots-Tag", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  }

  // Cache control for _next and static directory assets
  if (
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/static/")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable"
    );
  }

  return response;
}

// Match all paths except API routes, static files, and special files
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
