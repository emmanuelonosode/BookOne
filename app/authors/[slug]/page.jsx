import { sanity, getImageUrl } from "@/lib/sanity";
import { authorBySlugQuery, blogsByAuthorQuery } from "@/lib/queries";
// seo-config import removed; metadata generated inline below
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Script from "next/script";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

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
    title: `${author.name} | Author at BookOne`,
    description: `Read articles and insights by ${author.name}, expert author at BookOne. Discover professional content on web design, SEO, and AI automation.`,
    keywords: [
      author.name,
      "BookOne author",
      "web design expert",
      "SEO specialist",
      "AI automation expert",
      "digital marketing",
      "business automation",
    ].join(", "),
    authors: [{ name: author.name }],
    creator: author.name,
    publisher: "BookOne",
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
      title: `${author.name} | Author at BookOne`,
      description: `Read articles and insights by ${author.name}, expert author at BookOne. Discover professional content on web design, SEO, and AI automation.`,
      type: "profile",
      url: `${baseUrl}/authors/${slug}`,
      siteName: "BookOne",
      locale: "en_US",
      images: authorImageUrl
        ? [
            {
              url: authorImageUrl,
              width: 1200,
              height: 630,
              alt: `${author.name} - Author at BookOne`,
              type: "image/jpeg",
            },
          ]
        : [
            {
              url: "/opengraph-image.png",
              width: 1200,
              height: 630,
              alt: `${author.name} - Author at BookOne`,
            },
          ],
      profile: {
        firstName: author.name.split(" ")[0],
        lastName: author.name.split(" ").slice(1).join(" "),
        username: author.name.toLowerCase().replace(/\s+/g, ""),
      },
    },
    twitter: {
      card: authorImageUrl ? "summary_large_image" : "summary",
      title: `${author.name} | Author at BookOne`,
      description: `Read articles and insights by ${author.name}, expert author at BookOne.`,
      images: authorImageUrl ? [authorImageUrl] : ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
    },
  };
}



export default async function AuthorPage({ params }) {
  const { slug } = await params;
  const author = await sanity.fetch(authorBySlugQuery, { slug });
  const blogs = await sanity.fetch(blogsByAuthorQuery, { slug });

  if (!author) {
    notFound();
  }

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

  return (
    <>
      <Script
        id="author-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="min-h-screen bg-[#0B0B0E] selection:bg-[#6b46c1] selection:text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[#6b46c1]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="max-w-4xl mx-auto px-4 py-22 relative z-10">
        {/* Hero Section */}
        <div className="relative mb-16 group">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none mix-blend-overlay rounded-2xl" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#6b46c1] to-[#8B5CF6] rounded-2xl opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-500"></div>
          <div className="relative bg-[#1A1A24]/60 backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(107,70,193,0.1)] border border-white/10 p-8 md:p-12 hover:border-[#6b46c1]/40 transition-colors duration-500">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Author Image */}
              {author.image && (
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32">
                    <Image
                      src={getImageUrl(author.image)}
                      alt={author.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover shadow-[0_0_20px_rgba(107,70,193,0.3)] border-4 border-[#1A1A24] hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-[#1A1A24] rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {author.name}
                  </h1>
                  <div className="flex items-center gap-2 text-[#A78BFA] font-medium">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified Author
                  </div>
                </div>

                {author.bio && (
                  <div className="text-slate-300 text-lg leading-relaxed mb-6 font-light">
                    {author.bio}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-400">
                    <svg
                      className="w-4 h-4 text-[#A78BFA]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {blogs.length} {blogs.length === 1 ? "Article" : "Articles"}
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <svg
                      className="w-4 h-4 text-[#A78BFA]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Active since 2024
                  </div>
                </div>

                {/* Social Media Links */}
                {(author.twitter ||
                  author.linkedin ||
                  author.github ||
                  author.instagram ||
                  author.tiktok ||
                  author.facebook) && (
                  <div className="flex items-center gap-4 mt-6">
                    <span className="text-sm font-medium text-slate-400">
                      Follow me:
                    </span>
                    <div className="flex items-center gap-3">
                      {author.twitter && (
                        <a
                          href={author.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-[#1DA1F2] transition-colors duration-300 hover:scale-110"
                          aria-label={`Follow ${author.name} on Twitter`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {author.linkedin && (
                        <a
                          href={author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-[#0A66C2] transition-colors duration-300 hover:scale-110"
                          aria-label={`Connect with ${author.name} on LinkedIn`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </a>
                      )}
                      {author.github && (
                        <a
                          href={author.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-white transition-colors duration-300 hover:scale-110"
                          aria-label={`View ${author.name}'s GitHub profile`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        </a>
                      )}
                      {author.instagram && (
                        <a
                          href={author.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-[#E1306C] transition-colors duration-300 hover:scale-110"
                          aria-label={`Follow ${author.name} on Instagram`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49zm-7.83 9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z" />
                          </svg>
                        </a>
                      )}
                      {author.tiktok && (
                        <a
                          href={author.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-[#2AF598] transition-colors duration-300 hover:scale-110"
                          aria-label={`Follow ${author.name} on TikTok`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                          </svg>
                        </a>
                      )}
                      {author.facebook && (
                        <a
                          href={author.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-[#1877F2] transition-colors duration-300 hover:scale-110"
                          aria-label={`Follow ${author.name} on Facebook`}
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Latest Articles
              </h2>
              <div className="w-16 h-1 bg-[#6b46c1] rounded-full shadow-[0_0_10px_rgba(107,70,193,0.8)]"></div>
            </div>
            <div className="text-sm text-[#A78BFA] bg-[#6b46c1]/10 border border-[#6b46c1]/20 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(107,70,193,0.1)]">
              {blogs.length} {blogs.length === 1 ? "post" : "posts"}
            </div>
          </div>

          {blogs.length > 0 ? (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-[#1A1A24]/40 backdrop-blur-md rounded-xl border border-white/10 p-6 hover:border-[#6b46c1]/50 hover:shadow-[0_0_20px_rgba(107,70,193,0.15)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6b46c1]/0 via-[#6b46c1]/5 to-[#6b46c1]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="block relative z-10"
                    aria-label={`Read ${blog.title}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-2 h-16 bg-[#6b46c1] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_10px_rgba(107,70,193,0.8)]"></div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-[#A78BFA] transition-colors duration-300">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500 mb-3 font-light">
                          <time
                            dateTime={blog._createdAt}
                            className="flex items-center gap-1"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                            {new Date(blog._createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </time>
                          <span className="flex items-center gap-1">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            5 min read
                          </span>
                        </div>
                        {blog.excerpt && (
                          <p className="text-slate-400 leading-relaxed mb-4 font-light">
                            {blog.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-[#A78BFA] font-medium group-hover:gap-3 transition-all duration-300">
                          Read article
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
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
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-[#1A1A24]/40 backdrop-blur-md rounded-xl border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 bg-[#1A1A24] rounded-full flex items-center justify-center border border-white/5 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                <svg
                  className="w-8 h-8 text-slate-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                No articles yet
              </h3>
              <p className="text-slate-400 font-light">
                Check back soon for new content from this author.
              </p>
            </div>
          )}
        </div>

        {/* Back to Authors */}
        <div className="mt-16 text-center relative z-10">
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#A78BFA] font-medium transition-colors duration-300"
            aria-label="Back to all authors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to all authors
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}
