import { sanity, getImageUrl } from "@/lib/sanity";
import { paginatedBlogsQuery } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
// `seo-config` removed — inline metadata below to avoid external import
import { formatRelativeDate } from "../utils/dateUtils";

// Add caching configuration

export const metadata = {
  title: "BookOne Blog - Web Design, SEO & AI Automation Insights",
  description:
    "Stay updated with the latest insights on web design, SEO strategies, AI automation, and digital marketing. Expert tips and industry trends from BookOne.",
  keywords: [
    "web design blog",
    "SEO tips",
    "AI automation insights",
    "digital marketing blog",
    "web development tips",
    "business automation",
    "digital transformation",
    "BookOne blog",
    "Nigeria digital agency blog",
  ],
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: "BookOne Blog - Web Design, SEO & AI Automation Insights",
    description:
      "Stay updated with the latest insights on web design, SEO strategies, AI automation, and digital marketing. Expert tips and industry trends from BookOne.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/blogs`,
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BookOne Blog",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BookOne Blog - Web Design, SEO & AI Automation Insights",
    description:
      "Stay updated with the latest insights on web design, SEO strategies, AI automation, and digital marketing. Expert tips and industry trends from BookOne.",
    images: ["/opengraph-image.png"],
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
    { next: { revalidate: 200 } } // Revalidate
  );

  // For pagination, get total count
  const totalCount = await sanity.fetch(
    `count(*[_type == "post"${searchFilter}])`,
    { searchTerm: search ? `*${search}*` : "" }
  );
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <section className="py-24 px-4 bg-[#0B0B0E] min-h-screen font-sans selection:bg-[#6b46c1] selection:text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#6b46c1]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-20 gap-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A24]/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(107,70,193,0.3)] text-sm font-medium text-[#A78BFA] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A78BFA]"></span>
              </span>
              Our Blog
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
              Latest Articles & Insights
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-2xl font-light">
              Expert perspectives on web design, AI automation, and digital
              growth strategies.
            </p>
          </div>

          <form className="flex gap-3 w-full md:w-auto" method="get">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                name="search"
                placeholder="Search articles..."
                defaultValue={search}
                className="w-full pl-5 pr-4 py-3.5 rounded-2xl border border-white/10 bg-[#1A1A24]/60 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#6b46c1]/40 focus:border-[#6b46c1]/60 transition-all shadow-sm text-white placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3.5 bg-[#6b46c1] text-white font-bold rounded-2xl hover:bg-[#8B5CF6] transition-all duration-300 shadow-[0_0_15px_rgba(107,70,193,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] hover:-translate-y-1"
              aria-label="Search articles"
            >
              Search
            </button>
          </form>
        </div>

        {/* Featured Blog - Full Width */}
        {blogs.length > 0 && (
          <article className="group relative bg-[#1A1A24]/40 backdrop-blur-md rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-[0_0_30px_rgba(107,70,193,0.15)] transition-all duration-500 border border-white/10 hover:border-[#6b46c1]/50 mb-16">
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
            <div className="flex flex-col lg:flex-row relative z-10">
              {/* Image Container */}
              {blogs[0].mainImage && (
                <div className="lg:w-1/2 relative overflow-hidden h-[400px] lg:h-auto">
                  <Link
                    href={`/blogs/${blogs[0].slug.current}`}
                    aria-label={`Read full article: ${blogs[0].title}`}
                  >
                    <Image
                      src={getImageUrl(blogs[0].mainImage)}
                      alt={blogs[0].title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      priority={true}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </Link>
                  
                  {/* Featured badge */}
                  <div className="absolute top-8 left-8 z-20">
                    <span className="inline-flex items-center px-4 py-2 bg-[#1A1A24]/90 backdrop-blur-md text-[#A78BFA] text-sm font-bold rounded-full shadow-[0_0_15px_rgba(107,70,193,0.3)] border border-[#6b46c1]/30">
                      <svg
                        className="w-4 h-4 mr-2 fill-current drop-shadow-[0_0_5px_rgba(167,139,250,0.8)]"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Featured Story
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="lg:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-transparent relative z-10">
                <div className="mb-8">
                  {blogs[0].categories && blogs[0].categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {blogs[0].categories.slice(0, 2).map((cat) => (
                        <span
                          key={cat._id}
                          className="inline-flex items-center px-3 py-1 bg-[#6b46c1]/10 text-[#A78BFA] text-xs font-bold rounded-md border border-[#6b46c1]/20 uppercase tracking-wide shadow-[0_0_10px_rgba(107,70,193,0.1)]"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 group-hover:text-[#A78BFA] transition-colors leading-[1.2]">
                    <Link
                      href={`/blogs/${blogs[0].slug.current}`}
                      aria-label={`Read ${blogs[0].title}`}
                    >
                      {blogs[0].title}
                    </Link>
                  </h2>
                  <p className="text-slate-400 leading-relaxed text-lg line-clamp-3 font-light">
                    {blogs[0].description}
                  </p>
                </div>

                {/* Author & Meta */}
                <div className="flex items-center justify-between mt-auto pt-8 border-t border-white/10">
                  <div className="flex items-center gap-4">
                    {blogs[0].author?.image && (
                      <div className="relative">
                        <Image
                          src={getImageUrl(blogs[0].author.image)}
                          alt={blogs[0].author.name}
                          width={48}
                          height={48}
                          className="w-12 h-12 rounded-full object-cover border border-[#6b46c1]/30"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/authors/${blogs[0].author?.slug?.current}`}
                        className="text-base font-bold text-slate-300 hover:text-[#A78BFA] transition-colors"
                        aria-label={`View ${
                          blogs[0].author?.name || "Anonymous"
                        } author profile`}
                      >
                        {blogs[0].author?.name || "Anonymous"}
                      </Link>
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium font-light">
                        <time dateTime={blogs[0]._createdAt}>
                          {formatRelativeDate(blogs[0]._createdAt)}
                        </time>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Read more arrow */}
                  <Link
                    href={`/blogs/${blogs[0].slug.current}`}
                    className="inline-flex items-center justify-center w-12 h-12 bg-[#6b46c1]/10 text-[#A78BFA] rounded-full hover:bg-[#6b46c1] hover:text-white transition-all duration-300 group shadow-[0_0_15px_rgba(107,70,193,0.2)] hover:shadow-[0_0_20px_rgba(107,70,193,0.5)] border border-[#6b46c1]/30 hover:border-[#6b46c1]"
                    aria-label={`Read full article: ${blogs[0].title}`}
                  >
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* Other Blogs Grid */}
        {blogs.length > 1 && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 relative z-10">
            {blogs.slice(1).map((blog) => (
              <article
                key={blog._id}
                className="group relative bg-[#1A1A24]/40 backdrop-blur-md rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_0_20px_rgba(107,70,193,0.15)] transition-all duration-500 transform hover:-translate-y-1 border border-white/10 hover:border-[#6b46c1]/50 flex flex-col h-full"
              >
                {/* Image */}
                {blog.mainImage && (
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="block relative overflow-hidden h-64"
                    aria-label={`Read ${blog.title}`}
                  >
                    <div className="absolute inset-0 bg-transparent mix-blend-overlay group-hover:bg-[#6B46C1]/10 transition-colors duration-500 z-10 pointer-events-none" />
                    <Image
                      src={getImageUrl(blog.mainImage)}
                      alt={blog.title}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </Link>
                )}

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow relative z-20">
                  {/* Categories */}
                  {blog.categories && blog.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {blog.categories.slice(0, 1).map((cat) => (
                        <span
                          key={cat._id}
                          className="inline-flex items-center px-3 py-1 bg-white/5 text-slate-400 text-xs font-bold rounded-md border border-white/10 uppercase tracking-wide group-hover:border-[#6b46c1]/30 group-hover:bg-[#6b46c1]/10 group-hover:text-[#A78BFA] transition-colors shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                        >
                          {cat.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors line-clamp-2 leading-tight">
                    <Link
                      href={`/blogs/${blog.slug.current}`}
                      aria-label={`Read ${blog.title}`}
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-slate-400 leading-relaxed mb-6 text-sm line-clamp-3 font-light">
                    {blog.description}
                  </p>

                  {/* Author & Meta */}
                  <div className="flex items-center justify-between mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-center gap-3">
                      {blog.author?.image && (
                        <div className="relative">
                          <Image
                            src={getImageUrl(blog.author.image)}
                            alt={blog.author.name}
                            width={36}
                            height={36}
                            className="w-9 h-9 rounded-full object-cover border border-[#6b46c1]/20"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/authors/${blog.author?.slug?.current}`}
                          className="text-sm font-bold text-slate-300 hover:text-[#A78BFA] transition-colors"
                          aria-label={`View ${
                            blog.author?.name || "Anonymous"
                          } author profile`}
                        >
                          {blog.author?.name || "Anonymous"}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-slate-500 font-medium font-light">
                          <time dateTime={blog._createdAt}>
                            {formatRelativeDate(blog._createdAt)}
                          </time>
                        </div>
                      </div>
                    </div>

                    {/* Read more arrow */}
                    <Link
                      href={`/blogs/${blog.slug.current}`}
                      className="inline-flex items-center justify-center w-10 h-10 bg-white/5 text-[#A78BFA] rounded-full hover:bg-[#6b46c1] hover:text-white transition-all duration-300 group shadow-sm border border-white/10 hover:border-[#6b46c1] hover:shadow-[0_0_15px_rgba(107,70,193,0.4)]"
                      aria-label={`Read full article: ${blog.title}`}
                    >
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No blogs found */}
        {blogs.length === 0 && (
          <div className="text-center py-20 relative z-10">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#1A1A24] rounded-full mb-6 border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <svg
                className="w-10 h-10 text-slate-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No articles found
            </h3>
            <p className="text-slate-400 max-w-md mx-auto font-light">
              We couldn't find any articles matching "{search}". Try adjusting your search terms or check back later.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex gap-3 mt-20 justify-center relative z-10">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i}
                href={`?page=${i + 1}${
                  search ? `&search=${encodeURIComponent(search)}` : ""
                }`}
                className={`w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-lg transition-all duration-300 ${
                  page === i + 1
                    ? "bg-[#6b46c1] text-white shadow-[0_0_20px_rgba(107,70,193,0.5)] scale-110"
                    : "bg-[#1A1A24]/60 backdrop-blur-md text-slate-400 hover:bg-[#6b46c1]/20 hover:text-white border border-white/10 hover:border-[#6b46c1]/40"
                }`}
                aria-label={`Go to page ${i + 1}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
