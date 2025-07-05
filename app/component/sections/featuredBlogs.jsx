import React from "react";
import Tagline from "../tagline.jsx";
import Btn from "../Btn.jsx";
import Link from "next/link";
import getReadTime from "@/lib/readTime.js";
import { formatDistanceToNow } from "date-fns";

export default async function FeaturedBlogs() {
  // Fetch blogs from your API route
  const res = await fetch(`${process.env.NEXTAUTH_URL || ""}/api/blogs`, {
    cache: "no-store",
  });
  const featBlogs = res.ok ? await res.json() : [];


  function getBlogReadTime(blog) {
    let readTime = "";
    if (blog && blog.content && Array.isArray(blog.content.blocks)) {
      const text = blog.content.blocks
        .map((block) => block.data?.text || "")
        .join(" ");
      readTime = getReadTime(text);
      return readTime;
    }
    return "";
  }

  return (
    <section
      className="py-28"
      aria-label="Featured Blogs Section"
      role="region"
    >
      <div className="container">
        <header className="mb-8" aria-label="Featured Blogs Header">
          <Tagline tag="Featured Blogs" />
          <h2 className="mt-4 mb-2 text-3xl font-bold" tabIndex={0}>
            Insights on Development
          </h2>
          <p className="text-[18px] leading-[150%] text-gray-900" tabIndex={0}>
            Explore the latest trends in web development and design.
          </p>
        </header>
        <div
          className="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-12 py-20"
          aria-label="Featured Blogs Grid"
        >
          {featBlogs.length === 0 && (
            <div
              className="col-span-full text-center text-gray-500"
              aria-label="No featured blogs found"
              tabIndex={0}
            >
              No featured blogs found.
            </div>
          )}
          {featBlogs.map((prop, index) => (
            <article
              key={index}
              className="rounded-md overflow-hidden"
              role="article"
              aria-label={`Featured blog: ${prop.title}`}
            >
              <img
                className="w-full aspect-video mb-6"
                src={prop.banner}
                alt={prop.title ? `Banner for ${prop.title}` : "Blog banner"}
                loading="lazy"
              />
              <Link
                href={`blogs/${prop.slug}`}
                aria-label={`Read blog: ${prop.title}`}
              >
                <h5 className="my-2 h4 text-gray-800" tabIndex={0}>
                  {prop.title}
                </h5>

                <div
                  className="flex items-center gap-8 text-sm text-gray-500"
                  aria-label="Blog meta info"
                >
                  {prop.createdAt && (
                    <span className="mr-2" aria-label="Date">
                      {formatDistanceToNow(new Date(prop.createdAt), { addSuffix: true })}{" "}
                    </span>
                  )}
                  <span aria-label="Read time">
                    {getBlogReadTime(prop)} min read
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
        <Link href="/blogs" className="flex items-center justify-center">
          <Btn label="View all" aria-label="View all featured blogs" />
        </Link>
      </div>
    </section>
  );
}
