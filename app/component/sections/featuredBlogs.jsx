import React from "react";
import Link from "next/link";
import Image from "next/image";
import { sanity, urlFor } from "@/lib/sanity";
import { paginatedBlogsQuery } from "@/lib/queries";
import { formatRelativeDate } from "../../utils/dateUtils";

export default async function FeaturedBlogs() {
  // Fetch top 3 recent blogs from Sanity
  const blogs = await sanity.fetch(
    paginatedBlogsQuery
      .replace("$categoryFilter", "")
      .replace("$searchFilter", "")
      .replace("$start", 0)
      .replace("$end", 3)
  );

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl mb-6">
            <svg
              className="w-6 h-6 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            Latest Insights
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our latest insights and expertise crafted for
            forward-thinking professionals
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={blog._id}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
            >
              {/* Image Container */}
              {blog.mainImage && (
                <div className="relative overflow-hidden h-48">
                  <Link href={`/blogs/${blog.slug.current}`}>
                    <Image
                      src={urlFor(blog.mainImage)}
                      alt={blog.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </Link>

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              )}

              {/* Content */}
              <div className={`p-8 ${index === 0 ? "lg:p-10" : "p-6"}`}>
                {/* Categories */}
                {blog.categories && blog.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.categories.slice(0, 2).map((cat) => (
                      <span
                        key={cat._id}
                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100 text-blue-700 text-xs font-semibold rounded-full hover:bg-blue-100 transition-colors"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <Link
                  href={`/blogs/${blog.slug.current}`}
                  className={`block group-hover:text-blue-600 transition-colors duration-300 mb-4 ${
                    index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                  } font-bold text-gray-900 leading-tight`}
                >
                  {blog.title}
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 leading-relaxed mb-6 text-sm line-clamp-3">
                  {blog.body &&
                  blog.body[0]?.children &&
                  blog.body[0].children[0]?.text
                    ? blog.body[0].children[0].text.slice(0, 120) + "..."
                    : "Discover insights and expertise on this topic..."}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {blog.author?.image && (
                      <div className="relative">
                        <Image
                          src={urlFor(blog.author.image)}
                          alt={blog.author.name}
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
                        href={`/authors/${blog.author?.slug?.current}`}
                        className="text-sm font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        {blog.author?.name || "Anonymous"}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <time dateTime={blog._createdAt}>
                          {formatRelativeDate(blog._createdAt)}
                        </time>
                        <span>•</span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>

                  {/* Read more arrow */}
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-all duration-300 group"
                  >
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-0.5 transition-transform"
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

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-all duration-300 group"
          >
            View All Articles
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
    </section>
  );
}
