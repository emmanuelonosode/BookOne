import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

/**
 * Sanity Webhook → On-Demand Revalidation
 *
 * When content is created/updated/deleted in Sanity, this endpoint
 * busts the Next.js cache for the affected pages so new content
 * appears immediately without waiting for a TTL to expire.
 *
 * Setup in Sanity Dashboard → API → Webhooks:
 *   URL:      https://bookone.dev/api/revalidate
 *   Trigger:  Create, Update, Delete
 *   Filter:   _type in ["post", "caseStudy", "author", "testimonia"]
 *   Secret:   <same value as SANITY_REVALIDATION_SECRET env var>
 */
export async function POST(request) {
  try {
    // Validate the webhook secret
    const secret = request.headers.get("sanity-webhook-secret") ||
                   request.nextUrl.searchParams.get("secret");

    const expectedSecret = process.env.SANITY_REVALIDATION_SECRET;

    if (expectedSecret && secret !== expectedSecret) {
      return NextResponse.json(
        { message: "Invalid secret" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { _type, slug } = body;

    // Always revalidate the homepage (it shows blogs, portfolio, testimonials)
    revalidatePath("/", "page");

    // Revalidate the sitemap so Google picks up changes quickly
    revalidatePath("/sitemap.xml", "page");

    switch (_type) {
      case "post":
        // Blog list page
        revalidatePath("/blogs", "page");
        // Individual blog post (if slug is available)
        if (slug?.current) {
          revalidatePath(`/blogs/${slug.current}`, "page");
        }
        break;

      case "caseStudy":
        // Portfolio list page
        revalidatePath("/portfolio", "layout");
        // Individual case study
        if (slug?.current) {
          revalidatePath(`/portfolio/${slug.current}`, "layout");
        }
        break;

      case "author":
        // Author pages
        revalidatePath("/authors", "page");
        if (slug?.current) {
          revalidatePath(`/authors/${slug.current}`, "page");
        }
        // Authors appear on blog pages too
        revalidatePath("/blogs", "page");
        break;

      case "testimonia":
        // Testimonials only appear on homepage (already revalidated above)
        break;

      default:
        // For any unknown type, revalidate everything
        revalidatePath("/", "layout");
        break;
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      slug: slug?.current || null,
      now: Date.now(),
    });
  } catch (error) {
    console.error("Revalidation error:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: error.message },
      { status: 500 }
    );
  }
}
