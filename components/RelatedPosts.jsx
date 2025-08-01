"use client";

import { useState, useEffect } from "react";
import { sanity, urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export default function RelatedPosts({ currentSlug, category }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        const query = `
          *[_type == "post" && slug.current != $currentSlug && category == $category] | order(publishedAt desc) [0...3] {
            _id,
            title,
            slug,
            mainImage,
            publishedAt,
            author->{name, image},
            category
          }
        `;

        const posts = await sanity.fetch(query, {
          currentSlug,
          category,
        });

        setRelatedPosts(posts);
      } catch (error) {
        console.error("Error fetching related posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentSlug && category) {
      fetchRelatedPosts();
    }
  }, [currentSlug, category]);

  if (loading) {
    return (
      <div className="py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Related Posts
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-4 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <div className="py-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Related Posts
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {relatedPosts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link href={`/blogs/${post.slug.current}`}>
              <div className="relative h-48 overflow-hidden">
                {post.mainImage ? (
                  <Image
                    src={urlFor(post.mainImage).url()}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {post.category
                      ?.replace(/-/g, " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <div className="flex items-center gap-3 text-sm text-gray-600">
                  {post.author?.image && (
                    <Image
                      src={urlFor(post.author.image).url()}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  )}
                  <span>{post.author?.name}</span>
                  <span>•</span>
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
