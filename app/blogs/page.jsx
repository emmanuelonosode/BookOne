import { sanity, getImageUrl } from "@/lib/sanity";
import { paginatedBlogsQuery } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { formatRelativeDate } from "../utils/dateUtils";

export const revalidate = 60;

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export const metadata = {
  title: "Blog | Web Design, SEO & AI Automation Insights — Bookone Studio",
  description:
    "Expert insights on web design, SEO strategies, AI automation, and digital marketing. Stay ahead with tips and trends from the Bookone Studio team.",
  keywords: [
    "web design blog", "SEO tips", "AI automation insights",
    "digital marketing blog", "web development tips", "business automation",
    "digital transformation", "Bookone Studio blog", "Nigeria digital agency blog",
  ],
  alternates: { canonical: "/blogs" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Blog | Web Design, SEO & AI Automation Insights — Bookone Studio",
    description:
      "Expert insights on web design, SEO strategies, AI automation, and digital marketing from the Bookone Studio team.",
    url: `${BASE_URL}/blogs`,
    siteName: "Bookone Studio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Bookone Studio Blog" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Bookone Studio — Web Design, SEO & AI Automation",
    description: "Expert insights on web design, SEO, and AI automation from the Bookone Studio team.",
    images: ["/opengraph-image.png"],
    creator: "@bookonedotdev",
    site: "@bookonedotdev",
  },
};

const PAGE_SIZE = 7; // 1 featured + 6 grid (2 rows of 3)

export default async function BlogListPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const page = parseInt(resolvedSearchParams?.page || "1", 10);
  const search = resolvedSearchParams?.search || "";

  // Build GROQ filters
  const searchFilter = search
    ? ` && (title match $searchTerm || body[].children[].text match $searchTerm || author->name match $searchTerm)`
    : "";
  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // Replace filters in query
  const blogs = await sanity.fetch(
    paginatedBlogsQuery
      .replace("$categoryFilter", "")
      .replace("$searchFilter", searchFilter)
      .replace("$start", start)
      .replace("$end", end),
    { searchTerm: search ? `*${search}*` : "" },
    { next: { revalidate: 60 } }
  );

  // For pagination, get total count
  const totalCount = await sanity.fetch(
    `count(*[_type == "post"${searchFilter}])`,
    { searchTerm: search ? `*${search}*` : "" },
    { next: { revalidate: 60 } }
  );
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Bookone Studio Blog",
    description: "Expert insights on web design, SEO, and AI automation.",
    url: `${BASE_URL}/blogs`,
    publisher: {
      "@type": "Organization",
      name: "Bookone Studio",
      url: BASE_URL,
      logo: { "@type": "ImageObject", url: `${BASE_URL}/icon.svg` },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blogs` },
      ],
    },
  };

  return (
    <>
      <Script
        id="blog-list-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blogs` },
        ],
      }) }} />
    <div className="bg-[#080808] min-h-screen">
      {/* ── Hero ── */}
      <div className="pt-32 pb-16 border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            {/* Label + Heading */}
            <div>
              <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-6">
                Latest Thinking
              </p>
              <h1
                className="font-display font-black text-white leading-[0.92]"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
              >
                From the Blog
              </h1>
            </div>

            {/* Search */}
            <form
              method="get"
              className="flex items-end gap-6 shrink-0 w-full lg:w-auto"
            >
              <div className="flex-1 lg:w-72 border-b border-white/[0.18] pb-2">
                <input
                  type="text"
                  name="search"
                  placeholder="Search articles"
                  defaultValue={search}
                  className="w-full bg-transparent text-white placeholder:text-white/20 text-sm font-mono focus:outline-none caret-[#E8FF47]"
                />
              </div>
              <button
                type="submit"
                className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono hover:text-[#E8FF47] transition-colors pb-2 border-b border-transparent hover:border-[#E8FF47] shrink-0"
                aria-label="Search articles"
              >
                Search &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16 space-y-px">
        {/* ── Featured post ── */}
        {blogs.length > 0 && (
          <article className="border-b border-white/[0.06] pb-16 mb-4">
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
              {/* Image */}
              {blogs[0].mainImage && (
                <Link
                  href={`/blogs/${blogs[0].slug.current}`}
                  className="block aspect-[16/9] overflow-hidden bg-white/[0.03]"
                  aria-label={`Read full article: ${blogs[0].title}`}
                >
                  <Image
                    src={getImageUrl(blogs[0].mainImage)}
                    alt={blogs[0].title}
                    width={1200}
                    height={675}
                    className="w-full h-full object-cover transition-all duration-700"
                    priority
                  />
                </Link>
              )}

              {/* Content */}
              <div className="flex flex-col justify-between h-full py-2">
                <div>
                  <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-6">
                    Featured
                  </p>
                  <h2
                    className="font-display font-black text-white leading-[1.05] mb-8"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 3rem)" }}
                  >
                    <Link
                      href={`/blogs/${blogs[0].slug.current}`}
                      className="hover:text-[#E8FF47] transition-colors"
                    >
                      {blogs[0].title}
                    </Link>
                  </h2>
                  {blogs[0].description && (
                    <p className="text-white/40 text-sm leading-relaxed line-clamp-3 mb-10">
                      {blogs[0].description}
                    </p>
                  )}
                </div>

                {/* Meta + CTA */}
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-6">
                  <div>
                    <p className="text-white/60 text-sm font-mono">
                      {blogs[0].author?.name || "Anonymous"}
                    </p>
                    <time
                      dateTime={blogs[0]._createdAt}
                      className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-mono"
                    >
                      {formatRelativeDate(blogs[0]._createdAt)}
                    </time>
                  </div>
                  <Link
                    href={`/blogs/${blogs[0].slug.current}`}
                    className="inline-flex items-center gap-2 text-[#E8FF47] text-xs font-mono tracking-[0.15em] uppercase group"
                    aria-label={`Read ${blogs[0].title}`}
                  >
                    Read
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    >
                      <path d="M2 12L12 2M12 2H4M12 2V10" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ── Secondary posts grid ── */}
        {blogs.length > 1 && (
          <div className="grid lg:grid-cols-3 gap-px bg-white/[0.06]">
            {blogs.slice(1).map((blog, index) => (
              <article
                key={blog._id}
                className="bg-[#080808] p-8 flex flex-col justify-between group min-h-[340px]"
              >
                {/* Number + Category */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[#E8FF47] font-mono text-xs tracking-[0.2em]">
                      {String(index + 2).padStart(2, "0")}
                    </span>
                    {blog.categories && blog.categories.length > 0 && (
                      <span className="text-[10px] tracking-[0.25em] text-white/20 uppercase font-mono">
                        {blog.categories[0].title}
                      </span>
                    )}
                  </div>

                  {/* Image (optional small thumbnail) */}
                  {blog.mainImage && (
                    <Link
                      href={`/blogs/${blog.slug.current}`}
                      className="block aspect-[16/9] overflow-hidden bg-white/[0.03] mb-6"
                      aria-label={`Read ${blog.title}`}
                    >
                      <Image
                        src={getImageUrl(blog.mainImage)}
                        alt={blog.title}
                        width={600}
                        height={337}
                        className="w-full h-full object-cover transition-all duration-700"
                      />
                    </Link>
                  )}

                  <h3
                    className="font-display font-black text-white leading-[1.1] group-hover:text-white/80 transition-colors"
                    style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.4rem)" }}
                  >
                    <Link
                      href={`/blogs/${blog.slug.current}`}
                      aria-label={`Read ${blog.title}`}
                    >
                      {blog.title}
                    </Link>
                  </h3>
                </div>

                {/* Meta + CTA */}
                <div className="flex items-center justify-between border-t border-white/[0.06] pt-6 mt-6">
                  <time
                    dateTime={blog._createdAt}
                    className="text-[10px] tracking-[0.2em] text-white/20 uppercase font-mono"
                  >
                    {formatRelativeDate(blog._createdAt)}
                  </time>
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="inline-flex items-center gap-1.5 text-white/30 hover:text-[#E8FF47] text-[10px] font-mono tracking-[0.15em] uppercase transition-colors group/arrow"
                    aria-label={`Read ${blog.title}`}
                  >
                    Read
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="group-hover/arrow:translate-x-0.5 group-hover/arrow:-translate-y-0.5 transition-transform"
                    >
                      <path d="M2 12L12 2M12 2H4M12 2V10" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {blogs.length === 0 && (
          <div className="py-32 flex flex-col items-center justify-center">
            <p className="text-[10px] tracking-[0.25em] text-white/20 uppercase font-mono mb-4">
              No articles found
            </p>
            {search && (
              <Link
                href="/blogs"
                className="text-[10px] tracking-[0.2em] text-[#E8FF47] uppercase font-mono hover:underline"
              >
                Clear search &rarr;
              </Link>
            )}
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      {totalPages > 1 && (
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pb-24">
          <div className="border-t border-white/[0.06] pt-10 flex items-center gap-6 justify-center">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}${
                  search ? `&search=${encodeURIComponent(search)}` : ""
                }`}
                className={`text-xs font-mono transition-colors px-3 py-1 ${
                  page === i + 1
                    ? "text-[#E8FF47] border border-[#E8FF47]"
                    : "text-white/30 hover:text-[#E8FF47] border border-transparent"
                }`}
                aria-label={`Go to page ${i + 1}`}
              >
                {String(i + 1).padStart(2, "0")}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}
