"use client";

import { useState, useEffect } from "react";
import { sanity, getImageUrl } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";

export default function RelatedPosts({ currentSlug, category }) {
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentSlug || !category) { setLoading(false); return; }
    const fetchRelated = async () => {
      try {
        const posts = await sanity.fetch(
          `*[_type == "post" && slug.current != $currentSlug && category == $category] | order(publishedAt desc) [0...3] {
            _id, title, slug, mainImage, publishedAt, author->{name}, category
          }`,
          { currentSlug, category }
        );
        setRelatedPosts(posts);
      } catch {}
      finally { setLoading(false); }
    };
    fetchRelated();
  }, [currentSlug, category]);

  if (loading) {
    return (
      <div>
        <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-8">More Articles</p>
        <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-[#080808] p-6 animate-pulse">
              <div className="bg-white/[0.06] h-40 mb-4" />
              <div className="bg-white/[0.06] h-3 mb-2 w-3/4" />
              <div className="bg-white/[0.06] h-3 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) return null;

  return (
    <div>
      <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-8">More Articles</p>
      <div className="grid md:grid-cols-3 gap-px bg-white/[0.06]">
        {relatedPosts.map((post, i) => (
          <Link
            key={post._id}
            href={`/blogs/${post.slug.current}`}
            className="group bg-[#080808] p-6 flex flex-col hover:bg-white/[0.02] transition-colors duration-300"
            aria-label={`Read ${post.title}`}
          >
            {post.mainImage && (
              <div className="relative aspect-[16/9] overflow-hidden mb-5 bg-white/[0.03]">
                <Image
                  src={getImageUrl(post.mainImage)}
                  alt={post.title}
                  fill
                  className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                />
              </div>
            )}
            <span className="text-[10px] font-mono text-white/20 group-hover:text-[#E8FF47] transition-colors duration-200 mb-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3
              className="font-display font-bold text-white/80 group-hover:text-white leading-tight mb-3 flex-1 transition-colors duration-200"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.3rem)" }}
            >
              {post.title}
            </h3>
            <div className="flex items-center gap-4 text-[10px] tracking-[0.1em] uppercase text-white/20 font-mono mt-auto">
              {post.author?.name && <span>{post.author.name}</span>}
              {post.publishedAt && (
                <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
