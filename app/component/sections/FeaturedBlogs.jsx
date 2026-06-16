import Link from "next/link";
import Image from "next/image";
import { sanity, getImageUrl } from "@/lib/sanity";
import { homepageBlogsQuery } from "@/lib/queries";

export const revalidate = 60;

export default async function FeaturedBlogs() {
  let blogs = [];
  try {
    blogs = await sanity.fetch(homepageBlogsQuery, {}, {
      cache: "force-cache",
      next: { revalidate: 60 },
    });
  } catch {
    // Fall through to empty state
  }

  if (blogs.length === 0) return null;

  const [featured, ...rest] = blogs;

  return (
    <section className="py-20 sm:py-28 border-t border-[#1C1917]/[0.08]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#6F6A62] uppercase mb-3">
              Latest Thinking
            </p>
            <h2
              className="font-display font-black text-[#1C1917] leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              From the Blog
            </h2>
          </div>
          <Link
            href="/blogs"
            className="text-xs tracking-[0.15em] uppercase text-[#6F6A62] hover:text-[#1C1917] transition-colors duration-200 flex items-center gap-2 group shrink-0"
          >
            All Articles
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Featured + grid layout */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-px bg-[#1C1917]/[0.04]">

          {/* Featured post */}
          <Link
            href={`/blogs/${featured.slug?.current ?? "#"}`}
            className="group bg-[#F4F1EA] block overflow-hidden"
          >
            {featured.mainImage && (
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#1C1917]/[0.03]">
                <Image
                  src={getImageUrl(featured.mainImage) ?? "/placeholder-image.jpg"}
                  alt={featured.title}
                  fill
                  className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-700"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
              </div>
            )}
            <div className="p-8">
              <p className="text-[10px] tracking-[0.2em] text-[#6F6A62] uppercase mb-4">
                {featured.author?.name ?? "Bookone Studio"} ·{" "}
                {featured._createdAt
                  ? new Date(featured._createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                  : ""}
              </p>
              <h3
                className="font-display font-bold text-[#1C1917] group-hover:text-[#3A352F] transition-colors leading-tight mb-3"
                style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
              >
                {featured.title}
              </h3>
              <span className="inline-flex items-center gap-2 text-xs text-[#15803D] group-hover:text-[#1C1917] transition-colors duration-200 font-medium">
                Read Article
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </Link>

          {/* Secondary posts */}
          <div className="flex flex-col gap-px bg-[#1C1917]/[0.04]">
            {rest.slice(0, 2).map((post, i) => (
              <Link
                key={post._id}
                href={`/blogs/${post.slug?.current ?? "#"}`}
                className="group bg-[#F4F1EA] p-8 flex flex-col justify-between min-h-[200px]"
              >
                <div>
                  <p className="text-[10px] tracking-[0.2em] text-[#15803D]/60 uppercase mb-3 font-mono">
                    {String(i + 2).padStart(2, "0")}
                  </p>
                  <h3 className="font-display font-bold text-[#1C1917] group-hover:text-[#3A352F] transition-colors leading-tight text-lg sm:text-xl mb-3">
                    {post.title}
                  </h3>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-[10px] tracking-wide text-[#6F6A62] uppercase">
                    {post._createdAt
                      ? new Date(post._createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })
                      : ""}
                  </p>
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="text-[#6F6A62] group-hover:text-[#15803D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
