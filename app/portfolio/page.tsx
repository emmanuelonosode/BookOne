import { sanity, getImageUrl } from "../../lib/sanity";
import { SanityImage } from "../../lib/types";
import Script from "next/script";
import { allCaseStudiesQuery } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";

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

      <section className="bg-[#FBF8F2] min-h-screen" aria-labelledby="portfolio-heading">

        {/* HERO */}
        <div className="pt-32 pb-20 border-b border-[#1C1917]/[0.08]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <p className="text-[10px] tracking-[0.25em] text-[#9C968C] uppercase mb-4">
              Selected Work
            </p>
            <h1
              id="portfolio-heading"
              className="font-display font-black text-[#1C1917] leading-none"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
            >
              Innovative builds<br />
              <span className="italic">powering growth.</span>
            </h1>
          </div>
        </div>

        {/* PROJECT ROWS */}
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          {caseStudies.length > 0 ? (
            <div>
              {caseStudies.map((cs: CaseStudy, i: number) => {
                const image = cs.heroMedia || cs.mainImage;
                const description = cs.shortDescription || cs.overview;
                const slug = (typeof cs.slug === "object" ? cs.slug?.current : cs.slug) ?? cs._id;

                return (
                  <Link
                    key={cs._id}
                    href={`/portfolio/${slug}`}
                    className="group block border-t border-[#1C1917]/[0.08] py-10 last:border-b hover:bg-white/[0.01] transition-colors duration-300 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16"
                  >
                    <div className="grid lg:grid-cols-[60px_1fr_1fr_auto] gap-6 lg:gap-10 items-start">
                      {/* number */}
                      <span className="text-xs font-mono text-[#9C968C] group-hover:text-[#15803D] transition-colors duration-300 pt-1 hidden sm:block">
                        {String(i + 1).padStart(2, "0")}
                      </span>

                      {/* title + tags */}
                      <div>
                        <h2
                          className="font-display font-bold text-[#1C1917] group-hover:text-[#3A352F] transition-colors leading-tight mb-3"
                          style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)" }}
                        >
                          {cs.title}
                        </h2>
                        {cs.category && (
                          <p className="text-[10px] tracking-[0.2em] uppercase text-[#9C968C] font-mono">
                            {cs.category}
                          </p>
                        )}
                      </div>

                      {/* description */}
                      {description && (
                        <p className="text-sm text-[#1C1917]/35 leading-relaxed hidden lg:block max-w-sm">
                          {description}
                        </p>
                      )}

                      {/* thumbnail + arrow */}
                      <div className="flex items-center gap-6">
                        {image && (
                          <div className="relative w-20 h-14 overflow-hidden bg-[#1C1917]/[0.03] shrink-0">
                            <Image
                              src={getImageUrl(image) ?? ""}
                              alt={cs.title}
                              fill
                              className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                              sizes="80px"
                            />
                          </div>
                        )}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          className="text-[#9C968C] group-hover:text-[#15803D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0"
                        >
                          <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* empty state */
            <div className="py-24 border-t border-[#1C1917]/[0.08]">
              <p className="text-[#9C968C] text-sm tracking-wide uppercase font-mono">
                No projects yet — check back soon.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="border-t border-[#1C1917]/[0.08] mt-8">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
            <p className="text-[10px] tracking-[0.25em] text-[#9C968C] uppercase mb-6">
              Start a project
            </p>
            <h2
              className="font-display font-black text-[#1C1917] leading-none mb-10"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Let&apos;s build something<br />
              <span className="italic">great together.</span>
            </h2>
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-3 text-[#15803D] text-sm font-semibold tracking-wide hover:text-[#1C1917] transition-colors duration-200"
            >
              Start Your Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
}
