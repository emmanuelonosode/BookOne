import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImage } from "@/lib/types";
import { sanity, getImageUrl } from "@/lib/sanity";
import type { Metadata } from "next";

type Highlight = { title: string; description?: string; image?: SanityImage };
type Metric = { label: string; value: string; delta?: string };
type Testimonial = {
  quote: string;
  author: string;
  role?: string;
  photo?: SanityImage;
};

type CaseStudy = {
  title: string;
  slug: string;
  shortDescription?: string;
  heroMedia?: SanityImage;
  services?: string[];
  industry?: string;
  location?: string;
  liveUrl?: string;
  overview?: PortableTextBlock[];
  highlights?: Highlight[];
  screenshots?: SanityImage[];
  results?: Metric[];
  testimonial?: Testimonial;
  seo?: { metaTitle?: string; metaDescription?: string; ogImage?: SanityImage };
  publishedAt?: string;
};

const CASE_STUDY_QUERY = `
  *[_type == "caseStudy" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    shortDescription,
    heroMedia,
    services,
    industry,
    location,
    liveUrl,
    overview,
    highlights[]{title, description, image},
    screenshots[],
    results[]{label, value, delta},
    testimonial{quote, author, role, photo},
    seo{metaTitle, metaDescription, ogImage},
    publishedAt
  }
`;

const CASE_STUDY_SLUGS = `*[_type == "caseStudy" && defined(slug.current)].slug.current`;

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs: string[] = await sanity.fetch(CASE_STUDY_SLUGS);
  return slugs?.map((slug) => ({ slug })) ?? [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const data: CaseStudy | null = await sanity.fetch(CASE_STUDY_QUERY, {
    slug: resolvedParams.slug,
  });
  if (!data) return {};
  const title = data.seo?.metaTitle ?? `${data.title} — Portfolio`;
  const description = data.seo?.metaDescription ?? data.shortDescription ?? "";
  const images = [
    data.seo?.ogImage
      ? getImageUrl(data.seo.ogImage)
      : data.heroMedia
      ? getImageUrl(data.heroMedia)
      : undefined,
  ].filter(Boolean) as string[];
  return {
    title,
    description,
    openGraph: { title, description, images },
    twitter: { card: "summary_large_image", title, description, images },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const caseStudy: CaseStudy | null = await sanity.fetch(CASE_STUDY_QUERY, {
    slug: resolvedParams.slug,
  });

  if (!caseStudy)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            Case study not found
          </h1>
          <Link
            href="/portfolio"
            className="text-blue-400 hover:text-blue-300 transition-colors"
          >
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );

  return (
    <main className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Breadcrumb - Minimal & Elegant */}
      <nav className="max-w-7xl mx-auto px-6 pt-22" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm text-slate-400">
          <li>
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
          </li>
          <li className="text-slate-600">/</li>
          <li>
            <Link
              href="/portfolio"
              className="hover:text-white transition-colors"
            >
              Portfolio
            </Link>
          </li>
          <li className="text-slate-600">/</li>
          <li className="text-white font-medium">{caseStudy.title}</li>
        </ol>
      </nav>

      {/* Hero - Full Bleed with Impact */}
      <header className="relative">
        <div className="max-w-7xl mx-auto px-6 py-10 md:py-32">
          {/* Content Section */}
          <div className="mb-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              <span className="text-sm font-medium text-blue-300">
                Case Study
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
              {caseStudy.title}
            </h1>

            {/* Description */}
            {caseStudy.shortDescription && (
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                {caseStudy.shortDescription}
              </p>
            )}

            {/* Meta Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {caseStudy.services?.length ? (
                <div>
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Services
                  </dt>
                  <dd className="text-base text-slate-200">
                    {caseStudy.services.join(", ")}
                  </dd>
                </div>
              ) : null}
              {caseStudy.industry && (
                <div>
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Industry
                  </dt>
                  <dd className="text-base text-slate-200">
                    {caseStudy.industry}
                  </dd>
                </div>
              )}
              {caseStudy.location && (
                <div>
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Location
                  </dt>
                  <dd className="text-base text-slate-200">
                    {caseStudy.location}
                  </dd>
                </div>
              )}
              {caseStudy.publishedAt && (
                <div>
                  <dt className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">
                    Delivered
                  </dt>
                  <dd className="text-base text-slate-200">
                    {new Date(caseStudy.publishedAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </dd>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 pt-4">
              {caseStudy.liveUrl && (
                <a
                  href={caseStudy.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative px-8 py-4 bg-white text-slate-950 font-semibold rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Live Site
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </a>
              )}
              <Link
                href="/get-started"
                className="px-8 py-4 border-2 border-slate-700 text-white font-semibold rounded-full hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-300"
              >
                Start Your Project
              </Link>
            </div>
          </div>
        </div>

        {/* Full Width Hero Image */}
        {caseStudy.heroMedia && (
          <div className="relative w-full aspect-video md:aspect-[16/9] overflow-hidden bg-slate-800/50 backdrop-blur-sm shadow-2xl shadow-blue-500/10">
            <Image
              src={getImageUrl(caseStudy.heroMedia)}
              alt={caseStudy.title}
              fill
              sizes="100vw"
              priority
              className="object-cover"
            />
            {/* Decorative gradient orb */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl -z-10"></div>
          </div>
        )}
      </header>

      {/* Results - High Impact Section */}
      {caseStudy.results?.length ? (
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                The Impact
              </h2>
              <p className="text-xl text-slate-400">
                Measurable results that matter
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.results.map((metric, i) => (
                <div
                  key={i}
                  className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all duration-300"></div>
                  <div className="relative">
                    <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                      {metric.value}
                    </div>
                    <div className="text-lg text-slate-300 font-medium mb-2">
                      {metric.label}
                    </div>
                    {metric.delta && (
                      <div className="inline-flex items-center gap-1 text-sm text-emerald-400 font-medium">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        {metric.delta}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Overview - Story Section */}
      {Array.isArray(caseStudy.overview) && caseStudy.overview.length > 0 && (
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="mb-12">
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                The Story
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                Project Overview
              </h2>
            </div>
            <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300 prose-strong:text-white prose-code:text-blue-400 prose-code:bg-slate-800 prose-code:px-2 prose-code:py-1 prose-code:rounded">
              <PortableText value={caseStudy.overview as PortableTextBlock[]} />
            </div>
          </div>
        </section>
      )}

      {/* Highlights - Feature Showcase */}
      {caseStudy.highlights?.length ? (
        <section className="py-20 md:py-32 bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Key Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">
                What We Built
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudy.highlights.map((highlight, i) => (
                <article
                  key={i}
                  className="group relative bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
                >
                  {highlight.image && (
                    <div className="relative aspect-video overflow-hidden bg-slate-800">
                      <Image
                        src={getImageUrl(highlight.image)}
                        alt={highlight.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                      {highlight.title}
                    </h3>
                    {highlight.description && (
                      <p className="text-slate-400 leading-relaxed">
                        {highlight.description}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Screenshots Gallery - Cinematic */}
      {caseStudy.screenshots && caseStudy.screenshots.length > 0 && (
        <section className="py-20 md:py-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="mb-16">
              <span className="text-sm font-semibold text-blue-400 uppercase tracking-wider">
                Visual Tour
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3">Gallery</h2>
            </div>
            <div className="mb-8">
              {caseStudy.screenshots
                .filter((s) => s && (s.asset || s._type === "image"))
                .map((screenshot, idx) => {
                  const imageUrl = getImageUrl(screenshot);
                  if (!imageUrl || imageUrl === "/placeholder-image.jpg")
                    return null;
                  return (
                    <figure
                      key={idx}
                      className="group relative aspect-video rounded-2xl overflow-hidden bg-slate-800 shadow-2xl shadow-black/50"
                    >
                      <Image
                        src={imageUrl}
                        alt={`Screenshot ${idx + 1}`}
                        fill
                        sizes="100%"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </figure>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial - Social Proof */}
      {caseStudy.testimonial?.quote && (
        <section className="py-20 md:py-32 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
          <div className="max-w-5xl mx-auto px-6 relative z-10">
            <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-slate-700/50 shadow-2xl">
              <svg
                className="w-12 h-12 text-blue-500/30 mb-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <blockquote className="space-y-6">
                <p className="text-2xl md:text-3xl font-medium leading-relaxed text-slate-100">
                  {caseStudy.testimonial.quote}
                </p>
                <footer className="flex items-center gap-4 pt-4 border-t border-slate-700">
                  {caseStudy.testimonial.photo && (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                      <Image
                        src={getImageUrl(caseStudy.testimonial.photo)}
                        alt={caseStudy.testimonial.author}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="font-bold text-lg text-white">
                      {caseStudy.testimonial.author}
                    </div>
                    {caseStudy.testimonial.role && (
                      <div className="text-slate-400 text-sm">
                        {caseStudy.testimonial.role}
                      </div>
                    )}
                  </div>
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* CTA - Strong Close */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-blue-600/20"></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Let&apos;s create something extraordinary together. Every project is
            a unique opportunity to deliver exceptional results.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/get-started"
              className="group relative px-10 py-5 bg-white text-slate-950 font-bold rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
            >
              <span className="relative z-10 flex items-center gap-2">
                Let&apos;s Talk
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
            <Link
              href="/portfolio"
              className="px-10 py-5 border-2 border-slate-600 text-white font-bold rounded-full hover:bg-white hover:text-slate-950 hover:border-white transition-all duration-300"
            >
              View More Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
