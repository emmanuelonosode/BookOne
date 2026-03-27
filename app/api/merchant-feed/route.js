import { sanity } from "@/lib/sanity";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

const MERCHANT_FEED_QUERY = `
  *[_type == "websiteListing"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    price,
    availability,
    category,
    mainImage
  }
`;

function getSanityImageUrl(image) {
  if (!image?.asset?._ref) return null;
  const ref = image.asset._ref
    .replace("image-", "")
    .replace(/-(\w+)$/, ".$1");
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref}?w=1200&h=630&fit=fill`;
}

function escapeXml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let listings = [];

  try {
    listings = await sanity.fetch(
      MERCHANT_FEED_QUERY,
      {},
      { cache: "force-cache", next: { revalidate: 3600 } }
    );
  } catch {
    return new Response("Failed to fetch listings", { status: 500 });
  }

  const items = listings
    .map((listing) => {
      const slug =
        typeof listing.slug === "string"
          ? listing.slug
          : listing.slug?.current ?? listing._id;

      const productUrl = `${baseUrl}/websites/${slug}`;
      const imageUrl = getSanityImageUrl(listing.mainImage);
      const description =
        listing.shortDescription || `${listing.title} — available on BookOne.`;
      const availability =
        listing.availability === "in stock" ? "in stock" : "out of stock";

      return `    <item>
      <g:id>${escapeXml(listing._id)}</g:id>
      <g:title>${escapeXml(listing.title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      ${imageUrl ? `<g:image_link>${escapeXml(imageUrl)}</g:image_link>` : ""}
      <g:price>${listing.price} USD</g:price>
      <g:availability>${availability}</g:availability>
      <g:condition>new</g:condition>
      <g:brand>BookOne</g:brand>
      ${listing.category ? `<g:product_type>${escapeXml(listing.category)}</g:product_type>` : ""}
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>BookOne — Websites for Sale</title>
    <link>${baseUrl}/websites</link>
    <description>Pre-built and done-for-you websites available for purchase from BookOne.</description>
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=600",
    },
  });
}
