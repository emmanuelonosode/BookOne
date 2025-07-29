import { sanity, urlFor } from "@/lib/sanity";
import { blogBySlugQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Script from "next/script";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

const portableComponents = {
  types: {
    image: ({ value }) =>
      value && value.asset ? (
        <Image
          src={urlFor(value)}
          alt={value.alt || "Blog image"}
          width={800}
          height={600}
          className="my-6 rounded-lg shadow-md w-full max-w-2xl mx-auto"
          priority={false}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      ) : null,
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 leading-tight text-gray-900 dark:text-white">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-semibold mt-6 mb-3 leading-snug text-gray-800 ">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-700 ">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-[18px] leading-relaxed text-gray-800">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-[18px] text-gray-800 ">
        {children}
      </strong>
    ),
    em: ({ children }) => (
      <em className="italic text-[18px] text-gray-700 ">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 text-[18px] dark:bg-gray-800 px-1 rounded text-pink-600 dark:text-pink-400 font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline text-blue-600 text-[18px] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

export default async function BlogDetailPage({ params }) {
  const blog = await sanity.fetch(blogBySlugQuery, { slug: params.slug });
  if (!blog) return <div className="py-16 text-center">Not found</div>;

  // Generate structured data for the blog post
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const imageUrl = blog.mainImage ? urlFor(blog.mainImage) : undefined;
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
    wordCount: blog.body
      ? blog.body.reduce((count, block) => {
          if (block._type === "block" && block.children) {
            return (
              count +
              block.children.reduce(
                (blockCount, child) => blockCount + (child.text?.length || 0),
                0
              )
            );
          }
          return count;
        }, 0)
      : 0,
  };

  return (
    <>
      <Script
        id="blog-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <article className="max-w-3xl mx-auto py-16 md:py-22 px-4">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="flex items-center gap-4 mb-6">
          {blog.author?.image && (
            <Image
              src={urlFor(blog.author.image)}
              alt={blog.author.name}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover shadow-lg shadow-pink-50"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          )}
          <div className="text-gray-700 text-base">
            By{" "}
            <a
              href={`/authors/${blog.author?.slug?.current}`}
              className="hover:underline font-medium"
            >
              {blog.author?.name}
            </a>{" "}
            <p>
              {formatDistanceToNow(new Date(blog._createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {blog.category && (
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-gray-200 text-xs px-2 py-1 rounded-full text-gray-700">
              {blog.category
                .replace(/-/g, " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </span>
          </div>
        )}
        {blog.mainImage && (
          <Image
            src={urlFor(blog.mainImage)}
            alt={blog.title}
            width={1200}
            height={400}
            className="mb-6 rounded-lg w-full max-h-96 object-cover"
            priority={true}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        )}
        <div className="prose prose-lg mb-8 max-w-none dark:prose-invert">
          <PortableText value={blog.body} components={portableComponents} />
        </div>
      </article>
    </>
  );
}

export async function generateMetadata({ params }) {
  const blog = await sanity.fetch(blogBySlugQuery, { slug: params.slug });
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
  const imageUrl = blog.mainImage ? urlFor(blog.mainImage) : undefined;
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

  // Generate structured data for the blog post
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
    keywords: keywords.join(", "),
    wordCount: blog.body
      ? blog.body.reduce((count, block) => {
          if (block._type === "block" && block.children) {
            return (
              count +
              block.children.reduce(
                (blockCount, child) => blockCount + (child.text?.length || 0),
                0
              )
            );
          }
          return count;
        }, 0)
      : 0,
  };

  return {
    title: `${blog.title} | BookOne Blog`,
    description,
    keywords,
    authors: [author],
    creator: author,
    publisher: "BookOne",
    category,
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
      canonical: `${baseUrl}/blogs/${params.slug}`,
    },
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      url: `${baseUrl}/blogs/${params.slug}`,
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
              url: `${baseUrl}/opengraph-image.png`,
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
      images: imageUrl ? [imageUrl] : [`${baseUrl}/opengraph-image.png`],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
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
