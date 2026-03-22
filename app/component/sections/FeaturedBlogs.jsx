import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { sanity, urlFor, getImageUrl } from "@/lib/sanity";
import { homepageBlogsQuery } from "@/lib/queries";
import { formatRelativeDate } from "../../utils/dateUtils";

export default async function FeaturedBlogs() {
  // Fetch top 3 recent blogs for homepage
  const blogs = await sanity.fetch(
    homepageBlogsQuery,
    {},
    { next: { revalidate: 60 } } // Revalidate every 60s
  );

  return (
    <section className="py-20 px-4 bg-[#0B0B0E]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 rounded-2xl mb-6">
            <svg
              className="w-8 h-8 text-[#A78BFA]"
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

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Featured Stories
          </h2>
          <p className="text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Discover our latest insights, stories, and expertise crafted for
            forward-thinking professionals
          </p>

          {/* Decorative line */}
          <div className="flex items-center justify-center mt-8">
            <div className="h-1 w-20 bg-[#8B5CF6] rounded-full"></div>
            <div className="h-2 w-2 bg-[#8B5CF6] rounded-full mx-4"></div>
            <div className="h-1 w-20 bg-[#8B5CF6] rounded-full"></div>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={blog._id}
              className={`group relative bg-[#1A1A24]/60 backdrop-blur-md rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10 hover:border-[#6B46C1]/50 hover:shadow-[0_0_20px_rgba(107,70,193,0.3)] transition-all duration-500 transform hover:-translate-y-2 ${
                index === 0
                  ? "lg:col-span-2 lg:row-span-2"
                  : "lg:row-span-1 lg:col-span-2"
              }`}
            >
              {/* Image Container */}
              {blog.mainImage && (
                <div
                  className={`relative overflow-hidden ${
                    index === 0 ? "h-1/2 lg:h-1/2" : "h-64"
                  }`}
                >
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    aria-label={`Read full article: ${blog.title}`}
                  >
                    <Image
                      src={
                        getImageUrl(blog.mainImage) || "/placeholder-image.jpg"
                      }
                      alt={blog.title}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </Link>

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Featured badge for first post */}
                  {index === 0 && (
                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center px-4 py-2 bg-yellow-500 text-white text-sm font-bold rounded-full shadow-lg">
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        Featured
                      </span>
                    </div>
                  )}
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
                        className="inline-flex items-center px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold rounded-full hover:bg-blue-500/20 transition-colors"
                      >
                        {cat.title}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <Link
                  href={`/blogs/${blog.slug.current}`}
                  className={`block group-hover:text-[#A78BFA] transition-colors duration-300 mb-4 ${
                    index === 0 ? "text-2xl lg:text-3xl" : "text-xl"
                  } font-bold text-white leading-tight`}
                  aria-label={`Read ${blog.title}`}
                >
                  {blog.title}
                </Link>

                {/* Excerpt */}
                <p
                  className={`text-slate-400 leading-relaxed mb-6 ${
                    index === 0 ? "text-base lg:text-lg" : "text-sm"
                  }`}
                >
                  {blog.description}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {blog.author?.image && (
                      <div className="relative">
                        <Image
                          src={
                            getImageUrl(blog.author.image) ||
                            "/placeholder-avatar.jpg"
                          }
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
                        className="text-sm font-semibold text-slate-200 hover:text-[#A78BFA] transition-colors"
                        aria-label={`View ${
                          blog.author?.name || "Anonymous"
                        } author profile`}
                      >
                        {blog.author?.name || "Anonymous"}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
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
                    className="inline-flex items-center justify-center w-10 h-10 bg-[#8B5CF6] text-white rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:shadow-[0_0_20px_rgba(139,92,246,0.7)] transform hover:scale-110 transition-all duration-300 group"
                    aria-label={`Read full article: ${blog.title}`}
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
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#6b46c1] hover:bg-[#8B5CF6] text-white font-semibold rounded-2xl shadow-[0_0_15px_rgba(107,70,193,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transform hover:-translate-y-0.5 transition-all duration-300 group"
            aria-label="View all articles"
          >
            View All Articles
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
    </section>
  );
}
