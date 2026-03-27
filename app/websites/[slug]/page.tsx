import { sanity, getImageUrl, getOGImageUrl } from "@/lib/sanity";
import { websiteListingBySlugQuery, allWebsiteListingSlugsQuery } from "@/lib/queries";
import type { WebsiteListing } from "@/lib/types";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WebsiteListingSchema } from "@/components/StructuredData";
import WebsiteDetail from "./WebsiteDetail";

export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export async function generateStaticParams() {
  const slugs: Array<{ slug: string }> = await sanity.fetch(
    allWebsiteListingSlugsQuery
  );
  return slugs?.map(({ slug }) => ({ slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const listing: WebsiteListing | null = await sanity.fetch(
    websiteListingBySlugQuery,
    { slug }
  );

  if (!listing) return { title: "Not Found" };

  const description =
    listing.seo?.metaDescription ??
    listing.shortDescription ??
    `Buy this ${listing.category ?? ""} website built by BookOne.`;

  const ogImage = listing.seo?.ogImage ?? listing.mainImage;
  const ogImageUrl = ogImage ? getOGImageUrl(ogImage) : undefined;
  const canonical =
    listing.seo?.canonicalUrl ?? `${baseUrl}/websites/${slug}`;

  return {
    title: listing.seo?.metaTitle ?? `${listing.title} | Websites for Sale — BookOne`,
    description,
    alternates: { canonical },
    robots: listing.seo?.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true } },
    openGraph: {
      title: listing.seo?.metaTitle ?? listing.title,
      description,
      url: canonical,
      type: "website",
      images: ogImageUrl ? [{ url: ogImageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: listing.seo?.metaTitle ?? listing.title,
      description,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export default async function WebsiteListingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const listing: WebsiteListing | null = await sanity.fetch(
    websiteListingBySlugQuery,
    { slug },
    { cache: "force-cache", next: { revalidate: 60 } }
  );

  if (!listing) notFound();

  const heroImage = listing.mainImage ? getImageUrl(listing.mainImage) : null;

  return (
    <>
      <WebsiteListingSchema listing={listing} baseUrl={baseUrl} />
      <WebsiteDetail listing={listing} heroImage={heroImage} baseUrl={baseUrl} />
    </>
  );
}
