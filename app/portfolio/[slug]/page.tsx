import ClientCaseStudy from "./ClientCaseStudy";
import { sanity, getImageUrl, getOGImageUrl } from "@/lib/sanity";
import type { SanityImage, SeoFields } from "@/lib/types";
import { notFound } from "next/navigation";

export const revalidate = 60;

const CASE_STUDY_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0]{
    _createdAt,
    _updatedAt,
    "slug": slug.current,
    title,
    shortDescription,
    heroMedia,
    services,
    industry,
    client,
    liveUrl,
    highlights[]{title, description, image},
    screenshots[]{asset->{url}},
    results[]{label, value, delta},
    publishedAt,
    seo{
      metaTitle,
      metaDescription,
      canonicalUrl,
      ogImage,
      noIndex
    }
  }
`;

export async function generateStaticParams() {
  const slugs: string[] = await sanity.fetch(
    `*[_type == "caseStudy" && defined(slug.current)].slug.current`
  );
  return slugs?.map((slug) => ({ slug })) ?? [];
}

interface SanityData {
  _createdAt?: string;
  _updatedAt?: string;
  slug?: string;
  heroMedia?: SanityImage | null;
  seo?: SeoFields;
  highlights?: Array<{ title?: string; description?: string; image?: SanityImage | null }>;
  screenshots?: Array<{ asset?: { url?: string } }>;
  shortDescription?: string;
  results?: Array<{ label: string; value: string; delta?: string }>;
  publishedAt?: string;
  title: string;
  services?: string[] | string;
  industry?: string;
  client?: string;
  liveUrl?: string;
}

function mapToClientShape(data: SanityData | null) {
  if (!data) return null;
  const heroImage = data.heroMedia ?? data.seo?.ogImage ?? null;

  const sections: Array<{
    title: string;
    description: string;
    images: Array<{ src: string; alt: string }>;
    layout?: "single" | "grid-2x2";
    tags: string[];
  }> = [];

  if (Array.isArray(data.highlights) && data.highlights.length > 0) {
    data.highlights.forEach((highlight) => {
      if (highlight.title || highlight.description) {
        sections.push({
          title: highlight.title || "",
          description: highlight.description || "",
          images: highlight.image ? [{ src: getImageUrl(highlight.image), alt: highlight.title || "Highlight" }] : [],
          layout: "single",
          tags: [],
        });
      }
    });
  }

  if (Array.isArray(data.screenshots) && data.screenshots.length > 0) {
    sections.push({
      title: "Gallery",
      description: data.shortDescription || "",
      images: data.screenshots
        .map((s) =>
          s?.asset?.url ? { src: s.asset.url, alt: "Screenshot" } : null
        )
        .filter(Boolean),
      layout: data.screenshots.length > 1 ? "grid-2x2" : "single",
      tags: [],
    });
  }

  if (Array.isArray(data.results) && data.results.length > 0) {
    sections.push({
      title: "Results",
      description: data.results
        .map((r) => `${r.label}: ${r.value}`)
        .join(" \n"),
      tags: data.results.map((r) => r.label),
      images: [],
    });
  }

  // Fallback overview section
  if (sections.length === 0) {
    sections.push({
      title: "Overview",
      description: data.shortDescription ?? "",
      tags: [],
      images: [],
      layout: "single",
    });
  }

  return {
    date: data.publishedAt
      ? new Date(data.publishedAt).toLocaleDateString()
      : undefined,
    title: data.title,
    lead: data.shortDescription ?? "",
    metadata: {
      services: Array.isArray(data.services)
        ? data.services.join(", ")
        : data.services ?? "",
      category: data.industry ?? "",
      client: data.client ?? "",
      link: data.liveUrl ?? "",
    },
    heroImage: heroImage ? getImageUrl(heroImage) : undefined,
    sections,
    testimonial: undefined,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await sanity.fetch(CASE_STUDY_QUERY, { slug }, { next: { revalidate: 60 } });

  if (!data) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const metaTitle = data.seo?.metaTitle || data.title;
  const metaDescription =
    data.seo?.metaDescription || data.shortDescription || "BookOne case study";
  const canonicalUrl = data.seo?.canonicalUrl || `${baseUrl}/portfolio/${slug}`;
  const ogSource = data.seo?.ogImage || data.heroMedia;
  const ogUrl = ogSource ? getOGImageUrl(ogSource) : undefined;
  const absoluteOgUrl =
    ogUrl && ogUrl.startsWith("http") ? ogUrl : ogUrl ? `${baseUrl}${ogUrl}` : undefined;
  const published = data.publishedAt || data._createdAt;
  const updated = data._updatedAt || published;
  const noIndex = data.seo?.noIndex === true;

  return {
    title: metaTitle,
    description: metaDescription,
    metadataBase: new URL(baseUrl),
    alternates: { canonical: canonicalUrl },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `${baseUrl}/portfolio/${slug}`,
      siteName: "BookOne",
      type: "article",
      images: absoluteOgUrl
        ? [
            {
              url: absoluteOgUrl,
              width: 1200,
              height: 630,
              alt: metaTitle,
            },
          ]
        : undefined,
    },
    twitter: {
      card: absoluteOgUrl ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      images: absoluteOgUrl ? [absoluteOgUrl] : undefined,
    },
    other: {
      "article:published_time": published,
      "article:modified_time": updated,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await sanity.fetch(CASE_STUDY_QUERY, { slug }, { next: { revalidate: 60 } });
  const caseStudy = mapToClientShape(data);

  if (!caseStudy) {
    notFound();
  }

  return <ClientCaseStudy caseStudy={caseStudy} />;
}
