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
console.log(CASE_STUDY_QUERY);
const CASE_STUDY_SLUGS = `*[_type == "caseStudy" && defined(slug.current)].slug.current`;

// Enable ISR for this route instead of passing revalidate to fetch
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
      <div className="min-h-screen flex items-center justify-center">
        Not found
      </div>
    );

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm mb-6" aria-label="Breadcrumb">
        <ol className="flex gap-2 text-slate-600">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>/</li>
          <li>
            <Link href="/portfolio">Portfolio</Link>
          </li>
          <li>/</li>
          <li aria-current="page" className="font-medium">
            {caseStudy.title}
          </li>
        </ol>
      </nav>

      {/* Hero */}
      <header className="grid md:grid-cols-2 py-28 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {caseStudy.title}
          </h1>
          {caseStudy.shortDescription ? (
            <p className="mt-4 text-lg text-slate-700 leading-relaxed">
              {caseStudy.shortDescription}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap gap-3">
            {caseStudy.liveUrl ? (
              <a
                href={caseStudy.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
              >
                View live site
              </a>
            ) : null}
            <Link href="/get-started" className="btn btn-outline">
              Talk to us
            </Link>
          </div>

          {/* Quick facts */}
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            {caseStudy.services?.length ? (
              <div>
                <dt className="font-semibold text-slate-800">Services</dt>
                <dd className="mt-1 text-slate-600">
                  {caseStudy.services.join(", ")}
                </dd>
              </div>
            ) : null}
            {caseStudy.industry ? (
              <div>
                <dt className="font-semibold text-slate-800">Industry</dt>
                <dd className="mt-1 text-slate-600">{caseStudy.industry}</dd>
              </div>
            ) : null}
            {caseStudy.location ? (
              <div>
                <dt className="font-semibold text-slate-800">Location</dt>
                <dd className="mt-1 text-slate-600">{caseStudy.location}</dd>
              </div>
            ) : null}
            {caseStudy.publishedAt ? (
              <div>
                <dt className="font-semibold text-slate-800">Published</dt>
                <dd className="mt-1 text-slate-600">
                  {new Date(caseStudy.publishedAt).toLocaleDateString()}
                </dd>
              </div>
            ) : null}
          </dl>
        </div>

        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden bg-slate-100">
          {caseStudy.heroMedia ? (
            <Image
              src={getImageUrl(caseStudy.heroMedia)}
              alt={caseStudy.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              style={{ objectFit: "cover" }}
            />
          ) : null}
        </div>
      </header>

      {/* Overview */}
      {Array.isArray(caseStudy.overview) && caseStudy.overview.length > 0 ? (
        <section className="mt-16">
          <h2 className="text-2xl font-semibold">Overview</h2>
          <div className="prose prose-slate max-w-none mt-4">
            <PortableText value={caseStudy.overview as PortableTextBlock[]} />
          </div>
        </section>
      ) : null}

      {/* Highlights */}
      {caseStudy.highlights?.length ? (
        <section className="mt-16">
          <h3 className="text-xl font-semibold">Highlights</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            {caseStudy.highlights.map((h, i) => (
              <article
                key={i}
                className="bg-white p-5 rounded-lg shadow-sm border border-slate-100"
              >
                {h.image ? (
                  <div className="w-full h-40 relative mb-4 rounded-md overflow-hidden">
                    <Image
                      src={getImageUrl(h.image)}
                      alt={h.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                ) : null}
                <h4 className="font-medium">{h.title}</h4>
                {h.description ? (
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {h.description}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Results */}
      {caseStudy.results?.length ? (
        <section className="mt-16">
          <h3 className="text-xl font-semibold">Results</h3>
          <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {caseStudy.results.map((m, i) => (
              <div
                key={i}
                className="bg-gradient-to-r from-white to-slate-50 p-6 rounded-lg shadow-sm border border-slate-100"
              >
                <div className="text-2xl font-bold tracking-tight">
                  {m.value}
                </div>
                <div className="text-sm text-slate-600">{m.label}</div>
                {m.delta ? (
                  <div className="text-sm text-green-600 mt-1">{m.delta}</div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {/* Screenshots gallery */}
      {caseStudy.screenshots && caseStudy.screenshots.length > 0 ? (
        <section className="mt-16">
          <h3 className="text-xl font-semibold">Gallery</h3>
          <div className="mt-6 ">
            {caseStudy.screenshots
              .filter((s) => s && (s.asset || s._type === "image"))
              .map((s, idx) => {
                const imageUrl = getImageUrl(s);
                if (!imageUrl || imageUrl === "/placeholder-image.jpg") {
                  return null;
                }
                return (
                  <figure
                    key={idx}
                    className="w-full h-full relative rounded overflow-hidden bg-slate-100"
                  >
                    <Image
                      src={imageUrl}
                      alt={`Screenshot ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </figure>
                );
              })}
          </div>
        </section>
      ) : null}

      {/* Testimonial */}
      {caseStudy.testimonial?.quote ? (
        <section className="mt-16">
          <div className="bg-white border border-slate-100 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-start gap-4">
              {caseStudy.testimonial.photo ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={getImageUrl(caseStudy.testimonial.photo)}
                    alt={caseStudy.testimonial.author}
                    fill
                    sizes="48px"
                  />
                </div>
              ) : null}
              <blockquote className="flex-1">
                <p className="italic text-slate-800">
                  “{caseStudy.testimonial.quote}”
                </p>
                <footer className="mt-3 font-medium text-slate-900">
                  {caseStudy.testimonial.author}
                  {caseStudy.testimonial.role ? (
                    <span className="text-sm text-slate-500">
                      {" "}
                      — {caseStudy.testimonial.role}
                    </span>
                  ) : null}
                </footer>
              </blockquote>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
