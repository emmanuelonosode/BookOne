import { getOGImageUrl } from "@/lib/sanity";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export const WebsiteListingSchema = ({ listing, baseUrl = BASE_URL }) => {
  const slug =
    typeof listing.slug === "string"
      ? listing.slug
      : listing.slug?.current ?? "";

  const imageUrl = listing.mainImage ? getOGImageUrl(listing.mainImage) : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: listing.title,
    description: listing.shortDescription ?? `Buy this ${listing.category ?? "website"} built by BookOne.`,
    brand: { "@type": "Brand", name: "BookOne" },
    url: `${baseUrl}/websites/${slug}`,
    ...(imageUrl ? { image: imageUrl } : {}),
    offers: {
      "@type": "Offer",
      price: listing.price,
      priceCurrency: "USD",
      availability:
        listing.availability === "in stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `${baseUrl}/websites/${slug}`,
      seller: {
        "@type": "Organization",
        name: "BookOne",
        url: baseUrl,
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Websites for Sale", item: `${baseUrl}/websites` },
        { "@type": "ListItem", position: 3, name: listing.title, item: `${baseUrl}/websites/${slug}` },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
