import { sanity, getImageUrl } from "../../lib/sanity";
import { SanityImage } from "../../lib/types";
import Script from "next/script";
import { allCaseStudiesQuery } from "@/lib/queries";
import Link from "next/link";
import WorkGrid, { WorkItem } from "./PortfolioClientComponents";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  return {
    title: "Portfolio | Bookone Studio - Web Design, SEO & AI Automation Projects",
    description:
      "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation.",
    keywords: [
      "portfolio", "web design projects", "SEO projects", "AI automation projects",
      "website development", "digital marketing", "Bookone Studio portfolio",
    ],
    authors: [{ name: "Bookone Studio" }],
    creator: "Bookone Studio",
    publisher: "Bookone Studio",
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: { canonical: "/portfolio" },
    openGraph: {
      title: "Portfolio | Bookone Studio - Web Design, SEO & AI Automation Projects",
      description: "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation.",
      type: "website",
      url: `${baseUrl}/portfolio`,
      siteName: "Bookone Studio",
      locale: "en_US",
      images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Bookone Studio Portfolio" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | Bookone Studio",
      description: "Explore our portfolio of successful projects.",
      images: ["/opengraph-image.png"],
    },
  };
}

export default async function PortfolioPage() {
  const caseStudies = await sanity.fetch(allCaseStudiesQuery, {}, { next: { revalidate: 60 } });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  const workItems: WorkItem[] = caseStudies.map((cs: CaseStudy) => {
    const slug = (typeof cs.slug === "object" ? cs.slug?.current : cs.slug) ?? cs._id;
    const image = cs.heroMedia || cs.mainImage;
    return {
      id: cs._id,
      title: cs.title,
      href: `/portfolio/${slug}`,
      imageUrl: image ? getImageUrl(image) : null,
      client: cs.client ?? null,
      services: Array.isArray(cs.services) ? cs.services : [],
      industry: cs.industry ?? cs.category ?? null,
    };
  });

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bookone Studio Portfolio",
    description: "Showcasing our impactful work across various industries.",
    url: `${baseUrl}/portfolio`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((cs: CaseStudy, index: number) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: cs.title,
          description: cs.shortDescription,
          url: `${baseUrl}/portfolio/${typeof cs.slug === "object" ? cs.slug?.current : cs.slug}`,
          image: cs.heroMedia ? getImageUrl(cs.heroMedia) : undefined,
          creator: { "@type": "Organization", name: "Bookone Studio" },
        },
      })),
    },
    publisher: { "@type": "Organization", name: "Bookone Studio" },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: "Portfolio", item: `${baseUrl}/portfolio` },
    ],
  };

  return (
    <>
      <Script
        id="portfolio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      <section className="bg-[#F4F1EA] min-h-screen" aria-labelledby="portfolio-heading">

        {/* HERO */}
        <div className="pt-36 pb-16">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-xs tracking-[0.2em] text-[#C98A2B] font-semibold uppercase mb-5">
              Our work
            </p>
            <h1
              id="portfolio-heading"
              className="font-display font-medium text-[#1C1917] leading-[1.02] tracking-[-0.02em] max-w-4xl"
              style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
            >
              Case studies &amp; <span className="italic text-[#C98A2B]">good work.</span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-[#6F6A62] max-w-xl leading-relaxed">
              A look at the websites, brands and systems we&apos;ve built — and the
              results they delivered.
            </p>
          </div>
        </div>

        {/* FILTERABLE WORK GRID */}
        {workItems.length > 0 ? (
          <WorkGrid items={workItems} />
        ) : (
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 border-t border-[#1C1917]/[0.08]">
            <p className="text-[#9C968C] text-sm">No projects yet — check back soon.</p>
          </div>
        )}

        {/* CTA */}
        <div className="border-t border-[#1C1917]/[0.08] mt-8">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
            <p className="text-xs tracking-[0.2em] text-[#C98A2B] font-semibold uppercase mb-6">
              Start a project
            </p>
            <h2
              className="font-display font-medium text-[#1C1917] leading-[1.03] tracking-[-0.02em] mb-10 max-w-3xl"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Let&apos;s build something <span className="italic text-[#C98A2B]">great together.</span>
            </h2>
            <Link href="/get-started" className="btn-primary text-sm sm:text-base">
              Get a free quote
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

      </section>
    </>
  );
}

// Type helper
interface CaseStudy {
  _id: string;
  title: string;
  slug: { current?: string } | string | null;
  heroMedia?: SanityImage | null;
  mainImage?: SanityImage | null;
  shortDescription?: string;
  overview?: string;
  category?: string;
  services?: string[];
  industry?: string | null;
  client?: string | null;
}
