import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// POST /api/revalidate
// Body: { secret: string, slug?: string }
// Set `REVALIDATE_SECRET` in your Cloudflare/Wrangler env and use as webhook token in Sanity

export async function POST(request) {
  try {
    const body = await request.json();
    const secret = body?.secret;
    const slug = body?.slug;

    if (!secret || secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid secret" },
        { status: 401 }
      );
    }

    // Revalidate blog listing
    try {
      revalidatePath("/blogs");
    } catch (e) {
      console.error("Failed to revalidate /blogs", e);
    }

    // If a slug was provided, revalidate the specific blog page
    if (slug) {
      try {
        revalidatePath(`/blogs/${slug}`);
      } catch (e) {
        console.error(`Failed to revalidate /blogs/${slug}`, e);
      }
    }

    // Revalidate sitemap too
    try {
      revalidatePath("/sitemap.xml");
    } catch {
      // best-effort
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    console.error("Revalidate error:", err);
    return NextResponse.json(
      { revalidated: false, error: String(err) },
      { status: 500 }
    );
  }
}
