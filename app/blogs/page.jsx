import { sanity, getImageUrl } from "@/lib/sanity";
import { paginatedBlogsQuery } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { generateMetaTags } from "../seo-config";
import { formatRelativeDate } from "../utils/dateUtils";

// Add caching configuration
export const revalidate = 60; // Revalidate every 60 seconds to reduce ISR delay for new posts

export const metadata = generateMetaTags({
  title: "BookOne Blog - Web Design, SEO & AI Automation Insights",
  description:
    "Stay updated with the latest insights on web design, SEO strategies, AI automation, and digital marketing. Expert tips and industry trends from BookOne.",
  url: "/blogs",
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
});

const PAGE_SIZE = 7; // 1 featured + 6 grid (2 rows of 3)

export default async function BlogListPage({ searchParams }) {
  const page = parseInt(searchParams?.page || "1", 10);
  const search = searchParams?.search || "";

  // Build GROQ filters
  const searchFilter = search
    ? ` && (title match "*${search}*" || body[].children[].text match "*${search}*" || author->name match "*${search}*")`
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
    {},
    { cache: "force-cache" }
  );

  // For pagination, get total count
  const totalCount = await sanity.fetch(
    `count(*[_type == "post"${searchFilter}])`
  );
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <section className="py-16 md:py-22 px-4 max-w-6xl mx-auto">
      {/* Main Content: Blog List */}
      <div className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Latest Articles
            </h1>
            <p className="text-gray-600">
              Insights and expertise from our team
            </p>
          </div>
          <form className="flex gap-2 w-full md:w-auto" method="get">
            <input
              type="text"
              name="search"
              placeholder="Search articles..."
              defaultValue={search}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-64 text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-gray-400"
            />
            <button
              type="submit"
              className="bg-gray-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-gray-800 transition"
              aria-label="Search articles"
            >
              Search
            </button>
          </form>
        </div>
        {/* Featured Blog - Full Width */}
        {blogs.length > 0 && (
          <article className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 mb-12">
            <div className="flex flex-col lg:flex-row">
              {/* Image Container */}
              {blogs[0].mainImage && (
                <div className="lg:w-1/2 relative overflow-hidden h-64 lg:h-auto">
                  <Link
                    href={`/blogs/${blogs[0].slug.current}`}
                    aria-label={`Read full article: ${blogs[0].title}`}
                  >
                    <Image
                      src={getImageUrl(blogs[0].mainImage)}
                      alt={blogs[0].title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      priority={true}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </Link>
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Featured badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 bg-gray-900 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  </div>
                </div>
              )}

              {/* Content */}
              <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
                <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  <Link
                    href={`/blogs/${blogs[0].slug.current}`}
                    aria-label={`Read ${blogs[0].title}`}
                  >
                    {blogs[0].title}
                  </Link>
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6 text-base line-clamp-4">
                  {blogs[0].description}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {blogs[0].author?.image && (
                      <div className="relative">
                        <Image
                          src={getImageUrl(blogs[0].author.image)}
                          alt={blogs[0].author.name}
                          width={44}
                          height={44}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-white rounded-full"></div>
                      </div>
                    )}
                    <div>
                      <Link
                        href={`/authors/${blogs[0].author?.slug?.current}`}
                        className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                        aria-label={`View ${
                          blogs[0].author?.name || "Anonymous"
                        } author profile`}
                      >
                        {blogs[0].author?.name || "Anonymous"}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
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
                    className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300 group"
                    aria-label={`Read full article: ${blogs[0].title}`}
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
            </div>
          </article>
        )}

        {/* Other Blogs Grid */}
        {blogs.length > 1 && (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {blogs.slice(1).map((blog) => (
              <article
                key={blog._id}
                className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                {/* Image */}
                {blog.mainImage && (
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="block"
                    aria-label={`Read ${blog.title}`}
                  >
                    <div className="relative overflow-hidden h-48">
                      <Image
                        src={getImageUrl(blog.mainImage)}
                        alt={blog.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      />
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </Link>
                )}

                {/* Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors line-clamp-2">
                    <Link
                      href={`/blogs/${blog.slug.current}`}
                      aria-label={`Read ${blog.title}`}
                    >
                      {blog.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-gray-600 leading-relaxed mb-4 text-sm line-clamp-3">
                    {blog.description}
                  </p>

                  {/* Author & Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {blog.author?.image && (
                        <div className="relative">
                          <Image
                            src={getImageUrl(blog.author.image)}
                            alt={blog.author.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                          />
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/authors/${blog.author?.slug?.current}`}
                          className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors"
                          aria-label={`View ${
                            blog.author?.name || "Anonymous"
                          } author profile`}
                        >
                          {blog.author?.name || "Anonymous"}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <time dateTime={blog._createdAt}>
                            {formatRelativeDate(blog._createdAt)}
                          </time>
                        </div>
                      </div>
                    </div>

                    {/* Read more arrow */}
                    <Link
                      href={`/blogs/${blog.slug.current}`}
                      className="inline-flex items-center justify-center w-7 h-7 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300 group"
                      aria-label={`Read full article: ${blog.title}`}
                    >
                      <svg
                        className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform"
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
          <div className="text-center text-gray-500 py-12 text-lg">
            No blogs found.
          </div>
        )}
        {/* Pagination */}
        <div className="flex gap-2 mt-12 justify-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <Link
              key={i}
              href={`?page=${i + 1}${
                search ? `&search=${encodeURIComponent(search)}` : ""
              }`}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                page === i + 1
                  ? "bg-gray-900 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label={`Go to page ${i + 1}`}
            >
              {i + 1}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
