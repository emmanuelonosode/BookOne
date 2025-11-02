import { sanity, getImageUrl } from "@/lib/sanity";
import { blogBySlugQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import {
  ShareButtons,
  ReadingProgress,
  TableOfContents,
  RelatedPosts,
  NewsletterSignup,
} from "@/components/BlogClientComponents";
import CodeBlock from "@/components/CodeBlock";
import BackToTop from "@/components/BackToTop";
import {
  AlertTriangle,
  X,
  Lightbulb,
  FileText,
  ArrowRight,
} from "lucide-react";
import { name } from "platform";

// Add caching configuration

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
 const blog = await sanity.fetch(
   blogBySlugQuery, // 1️⃣ GROQ query
   { slug: resolvedParams.slug }, // 2️⃣ Parameters
   { next: { revalidate: 60 } } // 3️⃣ Revalidation config (every 60 seconds)
 );

  if (!blog) return {};

  // Get a plain text summary from the body (first 160 chars for better SEO)
  let description = "";
  if (Array.isArray(blog.body) && blog.body.length > 0) {
    const firstBlock = blog.body.find((b) => b._type === "block" && b.children);
    if (firstBlock) {
      description = firstBlock.children
        .map((c) => c.text)
        .join(" ")
        .slice(0, 160);
    }
  }
  if (!description) description = blog.title;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const imageUrl = blog.mainImage ? getImageUrl(blog.mainImage) : undefined;
  const author = blog.author?.name || "BookOne";
  const category = blog.category
    ? blog.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : undefined;

  // Enhanced keywords based on content
  const keywords = [
    blog.title,
    author,
    category,
    "BookOne Blog",
    "web design",
    "SEO optimization",
    "AI automation",
    "digital marketing",
    "business growth",
    "website development",
    "content strategy",
    "Nigeria digital agency",
  ].filter(Boolean);

  return {
    title: blog.title,
    description,
    keywords,
    authors: [author],
    creator: author,
    publisher: "BookOne",
    category,
    name: blog.title,
    classification: "Blog Post",
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
      canonical: `${baseUrl}/blogs/${resolvedParams.slug}`,
    },
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      url: `${baseUrl}/blogs/${resolvedParams.slug}`,
      siteName: "BookOne",
      locale: "en_US",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: blog.title,
              type: "image/jpeg",
            },
          ]
        : [
            {
              url: "/opengraph-image.png",
              width: 1200,
              height: 630,
              alt: "BookOne Blog",
            },
          ],
      article: {
        publishedTime: blog._createdAt,
        modifiedTime: blog._updatedAt || blog._createdAt,
        authors: [author],
        tags: [category, "web design", "SEO", "AI automation"].filter(Boolean),
        section: category,
      },
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: blog.title,
      description,
      images: imageUrl ? [imageUrl] : ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@bookonedotdev",
    },
    other: {
      "article:published_time": blog._createdAt,
      "article:modified_time": blog._updatedAt || blog._createdAt,
      "article:author": author,
      "article:section": category,
      "article:tag": keywords.join(", "),
    },
  };
}
// Enhanced portable text components with better styling
const portableComponents = {
  types: {
    image: ({ value }) =>
      value && value.asset ? (
        <figure className="my-8 group">
          <div className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src={getImageUrl(value)}
              alt={value.alt || "Blog image"}
              width={800}
              height={600}
              className="w-full max-w-3xl mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-600 mt-3 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,

    callout: ({ value }) => (
      <div
        className={`my-8 p-6 rounded-2xl border-l-4 shadow-lg ${
          value.type === "warning"
            ? "bg-amber-50 border-amber-500 text-amber-900"
            : value.type === "error"
            ? "bg-red-50 border-red-500 text-red-900"
            : "bg-blue-50 border-blue-500 text-blue-900"
        }`}
      >
        <div className="flex items-start">
          <div className="text-2xl mr-3">
            {value.type === "warning" ? (
              <AlertTriangle className="w-8 h-8 text-yellow-500" />
            ) : value.type === "error" ? (
              <X className="w-8 h-8 text-red-500" />
            ) : (
              <Lightbulb className="w-8 h-8 text-blue-500" />
            )}
          </div>
          <div className="flex-1">
            {value.title && (
              <h4 className="font-bold text-lg mb-2">{value.title}</h4>
            )}
            <PortableText value={value.content} />
          </div>
        </div>
      </div>
    ),

    table: ({ value }) => {
      if (!value || !value.rows || value.rows.length === 0) return null;

      return (
        <div className="my-6 md:my-8 overflow-hidden rounded-xl md:rounded-2xl shadow-lg border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {value.caption && (
                <caption className="text-xs sm:text-sm text-gray-600 px-3 sm:px-6 py-3 sm:py-4 bg-gray-50 border-b border-gray-200 font-medium">
                  {value.caption}
                </caption>
              )}
              <tbody>
                {value.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`${
                      rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"
                    } hover:bg-blue-50 transition-colors duration-200`}
                  >
                    {row.cells.map((cell, cellIndex) => {
                      const CellTag = cell.isHeader ? "th" : "td";
                      return (
                        <CellTag
                          key={cellIndex}
                          className={`px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 text-left border-b border-gray-200 text-sm md:text-base ${
                            cell.isHeader
                              ? "font-bold bg-gray-100 text-gray-900 text-xs sm:text-sm uppercase tracking-wide"
                              : "text-gray-800"
                          }`}
                        >
                          {cell.content && cell.content.length > 0 ? (
                            <PortableText
                              value={cell.content}
                              components={{
                                block: {
                                  normal: ({ children }) => (
                                    <span>{children}</span>
                                  ),
                                },
                                marks: {
                                  strong: ({ children }) => (
                                    <strong className="font-bold">
                                      {children}
                                    </strong>
                                  ),
                                  em: ({ children }) => (
                                    <em className="italic">{children}</em>
                                  ),
                                  code: ({ children }) => (
                                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                      {children}
                                    </code>
                                  ),
                                },
                              }}
                            />
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </CellTag>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    },

    code: ({ value }) => <CodeBlock value={value} />,
  },

  block: {
    h1: ({ children }) => (
      <h1
        id={children?.[0]?.replace(/\s+/g, "-").toLowerCase()}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mt-8 md:mt-12 mb-4 md:mb-6 leading-tight text-gray-900 scroll-mt-20 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        id={children?.[0]?.replace(/\s+/g, "-").toLowerCase()}
        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mt-6 md:mt-10 mb-3 md:mb-5 leading-tight text-gray-800 scroll-mt-20 border-l-4 border-blue-500 pl-3 md:pl-4"
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        id={children?.[0]?.replace(/\s+/g, "-").toLowerCase()}
        className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mt-5 md:mt-8 mb-3 md:mb-4 text-gray-700 scroll-mt-20"
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-base sm:text-lg md:text-xl font-semibold mt-4 md:mt-6 mb-2 md:mb-3 text-gray-700">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 md:mb-6 text-base md:text-lg leading-relaxed text-gray-800 selection:bg-blue-100">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 md:my-8 pl-4 md:pl-6 border-l-4 border-blue-500 bg-blue-50 py-3 md:py-4 pr-4 md:pr-6 rounded-r-lg md:rounded-r-xl">
        <div className="text-base md:text-lg italic text-blue-900 font-medium leading-relaxed">
          {children}
        </div>
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
    code: ({ children }) => (
      <code className="bg-gray-100 text-pink-600 px-2 py-1 rounded font-mono text-base">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="text-blue-600 hover:text-blue-800 underline underline-offset-2 decoration-2 decoration-blue-300 hover:decoration-blue-500 transition-all duration-200 font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    highlight: ({ children }) => (
      <mark className="bg-yellow-200 px-1 py-0.5 rounded">{children}</mark>
    ),
  },

  list: {
    bullet: ({ children }) => (
      <ul className="my-6 space-y-2 list-none pl-0">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 space-y-2 list-none pl-0 counter-reset-[list-counter]">
        {children}
      </ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start">
        <span className="text-blue-500 mr-2 md:mr-3 mt-1">•</span>
        <div className="text-base md:text-lg text-gray-800">{children}</div>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start counter-increment-[list-counter]">
        <span className="bg-blue-500 text-white text-xs md:text-sm w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center mr-2 md:mr-3 mt-1 font-bold">
          {/* Counter will be handled by CSS */}
        </span>
        <div className="text-base md:text-lg text-gray-800">{children}</div>
      </li>
    ),
  },
};

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = await sanity.fetch(blogBySlugQuery, {
    slug: resolvedParams.slug,
  });
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <a
            href="/blogs"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Blog
          </a>
        </div>
      </div>
    );
  }

  // Calculate reading time
  const wordCount = blog.body
    ? blog.body.reduce((count, block) => {
        if (block._type === "block" && block.children) {
          return (
            count +
            block.children.reduce(
              (blockCount, child) =>
                blockCount + (child.text?.split(" ").length || 0),
              0
            )
          );
        }
        return count;
      }, 0)
    : 0;
  const readingTime = Math.ceil(wordCount / 200); // Average reading speed

  // Generate structured data
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  // Use the safe helper to get an image URL; keep undefined if no main image so
  // downstream logic can fall back to a default Open Graph image when needed.
  const imageUrl = blog.mainImage ? getImageUrl(blog.mainImage) : undefined;
  const author = blog.author?.name || "BookOne";
  const category = blog.category
    ? blog.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : undefined;

  // Get description for structured data
  let description = "";
  if (Array.isArray(blog.body) && blog.body.length > 0) {
    const firstBlock = blog.body.find((b) => b._type === "block" && b.children);
    if (firstBlock) {
      description = firstBlock.children
        .map((c) => c.text)
        .join(" ")
        .slice(0, 160);
    }
  }
  if (!description) description = blog.title;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: author,
      url: blog.author?.slug?.current
        ? `${baseUrl}/authors/${blog.author.slug.current}`
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: "BookOne",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    datePublished: blog._createdAt,
    dateModified: blog._updatedAt || blog._createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/blogs/${params.slug}`,
    },
    articleSection: category,
    keywords: [
      blog.title,
      author,
      category,
      "BookOne Blog",
      "web design",
      "SEO",
      "AI automation",
    ]
      .filter(Boolean)
      .join(", "),
    wordCount: wordCount,
  };

  const currentUrl = `${baseUrl}/blogs/${params.slug}`;

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <ReadingProgress />

      <div className="min-h-screen w-full max-w-none bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900">
          <div className="absolute inset-0 bg-black/20" />
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
                backgroundSize: "50px 50px",
              }}
            />
          </div>

          <div className="relative w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-22 md:py-22 lg:py-24">
            {/* Breadcrumb */}
            <nav className="text-white/70 text-xs sm:text-sm mb-6 md:mb-12">
              <a href="/" className="hover:text-white transition-colors">
                Home
              </a>
              {" > "}
              <a href="/blogs" className="hover:text-white transition-colors">
                Blog
              </a>
              {" > "}
              <span className="text-white">{blog.title}</span>
            </nav>

            {/* Category Badge */}
            {category && (
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/30">
                  <FileText className="w-4 h-4 mr-2" /> {category}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-white mb-6 md:mb-8 leading-tight">
              {blog.title}
            </h1>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-white/80 mb-6 md:mb-8 text-sm md:text-base">
              {blog.author?.image && (
                <div className="flex items-center gap-3">
                  <Image
                    src={getImageUrl(blog.author.image)}
                    alt={blog.author.name}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                  />
                  <div>
                    <div className="font-semibold text-white">
                      {blog.author.name}
                    </div>
                    <div className="text-sm text-white/70">Author</div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5"
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
                <span>{readingTime} min read</span>
              </div>

              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5"
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
                <span>
                  {formatDistanceToNow(new Date(blog._createdAt), {
                    addSuffix: true,
                  })}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                <span>{wordCount.toLocaleString()} words</span>
              </div>
            </div>

            {/* Share Buttons */}
            <ShareButtons url={currentUrl} title={blog.title} />
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 md:py-12">
          <div className="w-full grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-12">
            {/* Table of Contents - Sidebar */}
            <div className="lg:col-span-1 order-2 lg:order-1">
              <div className="lg:sticky lg:top-24">
                <TableOfContents content={blog.body} />
              </div>
            </div>

            {/* Article Content */}
            <article className="w-full lg:col-span-3 order-1 lg:order-2">
              {/* Featured Image */}
              {blog.mainImage && (
                <div className="relative mb-8 md:mb-12 rounded-xl md:rounded-2xl overflow-hidden shadow-xl md:shadow-2xl group">
                  <Image
                    src={getImageUrl(blog.mainImage)}
                    alt={blog.title}
                    width={1200}
                    height={600}
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                    priority={true}
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Content */}
              <div className="w-full bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 sm:p-6 md:p-8 lg:p-12 prose prose-sm sm:prose-base md:prose-lg max-w-none">
                <PortableText
                  value={blog.body}
                  components={portableComponents}
                />
              </div>

              {/* Newsletter Signup */}
              <div className="mt-8 md:mt-12">
                <NewsletterSignup />
              </div>

              {/* Author Bio */}
              {blog.author && (
                <div className="mt-8 md:mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 border border-blue-100">
                  <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                    {blog.author.image && (
                      <Image
                        src={getImageUrl(blog.author.image)}
                        alt={blog.author.name}
                        width={80}
                        height={80}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 sm:border-4 border-white shadow-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        About {blog.author.name}
                      </h3>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {blog.author.bio ||
                          `${blog.author.name} is a contributor to the BookOne blog, sharing insights on web design, SEO, and digital marketing strategies.`}
                      </p>
                      <div className="flex gap-4">
                        <a
                          href={`/authors/${blog.author.slug?.current}`}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          View all posts <ArrowRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="mt-8 md:mt-12">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 md:mb-4">
                    Tags:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full hover:bg-blue-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Share - Bottom */}
              <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-3 md:mb-4">
                  Share this article:
                </h3>
                <ShareButtons
                  url={currentUrl}
                  title={blog.title}
                  className="justify-start"
                />
              </div>
            </article>
          </div>
        </div>

        {/* Related Posts */}
        <div className="bg-white py-8 md:py-16">
          <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
            <RelatedPosts currentSlug={params.slug} category={blog.category} />
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <BackToTop />
    </>
  );
}


