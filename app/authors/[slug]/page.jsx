import { sanity, urlFor } from "@/lib/sanity";
import { authorBySlugQuery, blogsByAuthorQuery } from "@/lib/queries";
import { generateMetaTags } from "../../seo-config";
import Link from "next/link";
import Image from "next/image";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }) {
  const author = await sanity.fetch(authorBySlugQuery, { slug: params.slug });
  if (!author) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const authorImageUrl = author.image
    ? urlFor(author.image)
        .width(1200)
        .height(630)
        .fit("crop")
        .crop("focalpoint")
        .focalPoint(0.5, 0.5)
        .url()
    : undefined;

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
      canonical: `${baseUrl}/authors/${params.slug}`,
    },
    openGraph: {
      title: `${author.name} | Author at BookOne`,
      description: `Read articles and insights by ${author.name}, expert author at BookOne. Discover professional content on web design, SEO, and AI automation.`,
      type: "profile",
      url: `${baseUrl}/authors/${params.slug}`,
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
  const author = await sanity.fetch(authorBySlugQuery, { slug: params.slug });
  const blogs = await sanity.fetch(blogsByAuthorQuery, { slug: params.slug });

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Author not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="relative mb-16">
          <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              {/* Author Image */}
              {author.image && (
                <div className="flex-shrink-0">
                  <div className="relative w-32 h-32">
                    <Image
                      src={urlFor(author.image).url()}
                      alt={author.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover shadow-lg border-4 border-white hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full animate-pulse"></div>
                  </div>
                </div>
              )}

              {/* Author Info */}
              <div className="flex-1">
                <div className="mb-4">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                    {author.name}
                  </h1>
                  <div className="flex items-center gap-2 text-blue-600 font-medium">
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
                  <div className="text-gray-700 text-lg leading-relaxed mb-6">
                    {author.bio}
                  </div>
                )}

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                    {blogs.length} {blogs.length === 1 ? "Article" : "Articles"}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
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
                    Active since 2024
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Latest Articles
              </h2>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {blogs.length} {blogs.length === 1 ? "post" : "posts"}
            </div>
          </div>

          {blogs.length > 0 ? (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <article
                  key={blog._id}
                  className="group bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <Link
                    href={`/blogs/${blog.slug.current}`}
                    className="block"
                    aria-label={`Read ${blog.title}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-2 h-16 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
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
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {blog.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-blue-600 font-medium group-hover:gap-3 transition-all duration-300">
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
            <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-gray-400"
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
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No articles yet
              </h3>
              <p className="text-gray-600">
                Check back soon for new content from this author.
              </p>
            </div>
          )}
        </div>

        {/* Back to Authors */}
        <div className="mt-16 text-center">
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-300"
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
  );
}
