import React from "react";
import Link from "next/link";
import { sanity, urlFor } from "@/lib/sanity";
import { paginatedBlogsQuery } from "@/lib/queries";
import { Metadata } from "next";

export const metadata = {
  title: "Featured Blogs | BookOne",
  description:
    "Discover featured blog posts from BookOne on design, development, and business.",
};

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
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-8 text-center">
        Featured Blogs
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-xl shadow p-6 flex flex-col hover:shadow-lg transition"
          >
            {blog.mainImage && (
              <Link href={`/blogs/${blog.slug.current}`}>
                <img
                  src={urlFor(blog.mainImage)}
                  alt={blog.title}
                  className="rounded-lg w-full h-40 object-cover mb-4"
                />
              </Link>
            )}
            <Link
              href={`/blogs/${blog.slug.current}`}
              className="text-xl font-bold text-primary hover:underline mb-2"
            >
              {blog.title}
            </Link>
            <div className="flex flex-wrap gap-2 mb-2">
              {blog.categories?.map((cat) => (
                <span
                  key={cat._id}
                  className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
                >
                  {cat.title}
                </span>
              ))}
            </div>
            <div className="text-gray-600 text-sm mb-2 line-clamp-2">
              {blog.body &&
              blog.body[0]?.children &&
              blog.body[0].children[0]?.text
                ? blog.body[0].children[0].text.slice(0, 120) +
                  (blog.body[0].children[0].text.length > 120 ? "..." : "")
                : ""}
            </div>
            <div className="flex items-center gap-2 mt-auto">
              {blog.author?.image && (
                <img
                  src={urlFor(blog.author.image)}
                  alt={blog.author.name}
                  className="w-7 h-7 rounded-full object-cover border"
                />
              )}
              <Link
                href={`/authors/${blog.author?.slug?.current}`}
                className="text-xs font-medium text-primary hover:underline"
              >
                {blog.author?.name}
              </Link>
              <span className="text-gray-400 text-xs">
                · {new Date(blog._createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
