import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "BookOne";
  const category = searchParams.get("category") || "Professional Services";

  // For now, redirect to the static Open Graph image
  // In the future, you can implement dynamic image generation here
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  return NextResponse.redirect(`${baseUrl}/opengraph-image.png`);
}
