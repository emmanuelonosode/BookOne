import { NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function POST(request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json(
        { success: 0, message: "No URL provided" },
        { status: 400 }
      );
    }

    const { result } = await ogs({ url });

    return NextResponse.json({
      success: 1,
      meta: {
        title: result.ogTitle || result.title,
        description: result.ogDescription || result.description,
        image: {
          url: result.ogImage?.url || "",
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: 0, message: "Failed to fetch metadata" },
      { status: 500 }
    );
  }
}
