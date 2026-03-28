import { sanity, getImageUrl } from "@/lib/sanity";
import { authorBySlugQuery, blogsByAuthorQuery } from "@/lib/queries";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";

export const revalidate = 3600;

const SOCIAL_LABELS = {
  twitter: "X",
  linkedin: "LI",
  github: "GH",
  instagram: "IG",
  tiktok: "TK",
  facebook: "FB",
};

export async function generateStaticParams() {
  const slugs = await sanity.fetch(
    `*[_type == "author" && defined(slug.current)].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const author = await sanity.fetch(authorBySlugQuery, { slug });
  if (!author) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const authorImageUrl = author.image ? getImageUrl(author.image) : undefined;

  return {
    title: `${author.name} | Author at Bookone Studio`,
    description: `Read articles and insights by ${author.name}, expert author at Bookone Studio. Discover professional content on web design, SEO, and AI automation.`,
    keywords: [
      author.name,
      "Bookone Studio author",
      "web design expert",
      "SEO specialist",
      "AI automation expert",
    ].join(", "),
    authors: [{ name: author.name }],
    creator: author.name,
    publisher: "Bookone Studio",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `/authors/${slug}`,
    },
    openGraph: {
      title: `${author.name} | Author at Bookone Studio`,
      description: `Read articles and insights by ${author.name}, expert author at Bookone Studio.`,
      type: "profile",
      url: `${baseUrl}/authors/${slug}`,
      siteName: "Bookone Studio",
      locale: "en_US",
      images: authorImageUrl
        ? [{ url: authorImageUrl, width: 1200, height: 630, alt: `${author.name} - Author at Bookone Studio` }]
        : [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: `${author.name} - Author at Bookone Studio` }],
    },
    twitter: {
      card: authorImageUrl ? "summary_large_image" : "summary",
      title: `${author.name} | Author at Bookone Studio`,
      description: `Read articles and insights by ${author.name}, expert author at Bookone Studio.`,
      images: authorImageUrl ? [authorImageUrl] : ["/opengraph-image.png"],
    },
  };
}

export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = await sanity.fetch(authorBySlugQuery, { slug });
  const blogs = await sanity.fetch(blogsByAuthorQuery, { slug });

  if (!author) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const authorImageUrl = author.image ? getImageUrl(author.image) : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: author.name,
      description: author.bio,
      image: authorImageUrl,
      sameAs: [
        author.twitter,
        author.linkedin,
        author.github,
        author.instagram,
        author.tiktok,
        author.facebook,
      ].filter(Boolean),
      url: `${baseUrl}/authors/${slug}`,
    },
  };

  const socials = Object.entries(SOCIAL_LABELS)
    .filter(([key]) => author[key])
    .map(([key, label]) => ({ label, href: author[key] }));

  return (
    <>
      <Script
        id="author-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-[#080808] min-h-screen pt-32 pb-24">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

          {/* Back link */}
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-200 font-mono mb-14"
          >
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            All Authors
          </Link>

          {/* Author hero */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 pb-16 mb-16 border-b border-white/[0.06]">
            {/* Left: avatar + socials */}
            <div>
              <div className="w-24 h-24 rounded-full overflow-hidden bg-white/[0.06] ring-1 ring-white/10 mb-6">
                {authorImageUrl ? (
                  <Image
                    src={authorImageUrl}
                    alt={author.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-black text-white/40 text-3xl">
                      {author.name?.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              {socials.length > 0 && (
                <div className="flex items-center gap-5">
                  {socials.map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] tracking-[0.15em] font-mono text-white/25 hover:text-[#E8FF47] transition-colors duration-200"
                    >
                      {label}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Right: name + bio + stats */}
            <div>
              {author.role && (
                <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4 font-mono">
                  {author.role}
                </p>
              )}
              <h1
                className="font-display font-black text-white leading-none mb-6"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                {author.name}
              </h1>
              {author.bio && (
                <p className="text-base text-white/50 leading-relaxed max-w-xl mb-8">
                  {author.bio}
                </p>
              )}
              <p className="text-xs text-white/20 tracking-wide font-mono">
                {blogs.length} {blogs.length === 1 ? "article" : "articles"} published
              </p>
            </div>
          </div>

          {/* Articles */}
          <div>
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-10 font-mono">
              Articles
            </p>

            {blogs.length > 0 ? (
              <div>
                {blogs.map((blog, i) => (
                  <Link
                    key={blog._id}
                    href={`/blogs/${blog.slug.current}`}
                    className="group flex items-start gap-8 border-t border-white/[0.06] py-8 last:border-b hover:bg-white/[0.02] transition-colors duration-200 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16"
                  >
                    <span className="text-xs font-mono text-white/20 group-hover:text-[#E8FF47] transition-colors duration-300 pt-1 shrink-0 w-8">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-display font-bold text-white group-hover:text-white/80 transition-colors leading-tight text-xl sm:text-2xl mb-3">
                        {blog.title}
                      </h2>
                      {blog.excerpt && (
                        <p className="text-sm text-white/35 leading-relaxed mb-4 max-w-2xl">
                          {blog.excerpt}
                        </p>
                      )}
                      <p className="text-[10px] tracking-wide text-white/20 uppercase font-mono">
                        {new Date(blog._createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="text-white/20 group-hover:text-[#E8FF47] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 mt-1"
                    >
                      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-16 border-t border-white/[0.06]">
                <p className="text-white/20 text-sm tracking-wide uppercase font-mono">
                  No articles published yet
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
