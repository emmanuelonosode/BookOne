import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "BookOne";
  const category = searchParams.get("category") || "Professional Services";

  // Create an SVG-based OG image that works well with Cloudflare
  const svg = `
    <svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="6" flood-color="rgba(0,0,0,0.4)"/>
        </filter>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <!-- Background -->
      <rect width="1200" height="630" fill="url(#bg)"/>
      
      <!-- Background Pattern -->
      <defs>
        <pattern id="dots" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          <circle cx="25" cy="25" r="2" fill="rgba(255,255,255,0.1)"/>
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#dots)"/>
      
      <!-- Brand -->
      <text x="600" y="180" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white" filter="url(#shadow)">
        BookOne
      </text>
      
      <!-- Category Badge -->
      <rect x="450" y="220" width="300" height="40" rx="20" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
      <text x="600" y="245" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="white">
        ${category}
      </text>
      
      <!-- Main Title -->
      <text x="600" y="350" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="white" filter="url(#shadow)">
        ${title}
      </text>
      
      <!-- Subtitle -->
      <text x="600" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" fill="rgba(255,255,255,0.9)">
        Professional Web Design, SEO & AI Automation Services
      </text>
      
      <!-- Bottom Accent -->
      <rect x="500" y="550" width="200" height="4" rx="2" fill="white" filter="url(#glow)"/>
    </svg>
  `;

  return new NextResponse(svg, {
    status: 200,
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
