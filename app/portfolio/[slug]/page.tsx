import Link from "next/link";
import ClientCaseStudy from "./ClientCaseStudy";
import { sanity, getImageUrl } from "@/lib/sanity";

export const revalidate = 60;

const CASE_STUDY_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0]{
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
    seo{ogImage}
  }
`;

export async function generateStaticParams() {
  const slugs: string[] = await sanity.fetch(
    `*[_type == "caseStudy" && defined(slug.current)].slug.current`
  );
  return slugs?.map((slug) => ({ slug })) ?? [];
}

interface SanityData {
  heroMedia?: unknown;
  seo?: { ogImage?: unknown };
  highlights?: Array<{ title?: string; description?: string; image?: unknown }>;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections: any[] = [];

  if (Array.isArray(data.highlights) && data.highlights.length > 0) {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    heroImage: heroImage ? getImageUrl(heroImage as any) : undefined,
    sections,
    testimonial: undefined,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await sanity.fetch(CASE_STUDY_QUERY, { slug });
  const caseStudy = mapToClientShape(data);

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Case study not found
          </h1>
          <Link href="/portfolio" className="text-[#6b46c1] hover:underline">
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  return <ClientCaseStudy caseStudy={caseStudy} />;
}
