import { sanity, urlFor } from "@/lib/sanity";
import { blogBySlugQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { formatDistanceToNow } from "date-fns";

import { Metadata } from "next";

const portableComponents = {
  types: {
    image: ({ value }) =>
      value && value.asset ? (
        <img
          src={urlFor(value)}
          alt={value.alt || "Blog image"}
          className="my-6 rounded-lg shadow-md w-full max-w-2xl mx-auto"
          loading="lazy"
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

  return (
    <article className="max-w-3xl mx-auto py-16 md:py-22 px-4">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      <div className="flex items-center gap-4 mb-6">
        {blog.author?.image && (
          <img
            src={urlFor(blog.author.image)}
            alt={blog.author.name}
            className="w-12 h-12 rounded-full object-cover shadow-lg shadow-pink-50"
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
          {/* · {new Date(blog._createdAt).toLocaleDateString()} */}
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
        <img
          src={urlFor(blog.mainImage)}
          alt={blog.title}
          className="mb-6 rounded-lg w-full max-h-96 object-cover"
        />
      )}
      <div className="prose prose-lg mb-8 max-w-none dark:prose-invert">
        <PortableText value={blog.body} components={portableComponents} />
      </div>
    </article>
  );
}

export async function generateMetadata({ params }) {
  const blog = await sanity.fetch(blogBySlugQuery, { slug: params.slug });
  if (!blog) return {};

  // Get a plain text summary from the body (first 150 chars)
  let description = "";
  if (Array.isArray(blog.body) && blog.body.length > 0) {
    const firstBlock = blog.body.find((b) => b._type === "block" && b.children);
    if (firstBlock) {
      description = firstBlock.children
        .map((c) => c.text)
        .join(" ")
        .slice(0, 150);
    }
  }
  if (!description) description = blog.title;

  const imageUrl = blog.mainImage ? urlFor(blog.mainImage) : undefined;
  const author = blog.author?.name || "BookOne";
  const category = blog.category
    ? blog.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : undefined;

  return {
    title: blog.title,
    description,
    keywords: [blog.title, author, category, "BookOne Blog"].filter(Boolean),
    openGraph: {
      title: blog.title,
      description,
      type: "article",
      url: `https://yourdomain.com/blogs/${params.slug}`,
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: blog.title,
            },
          ]
        : [],
      article: {
        publishedTime: blog._createdAt,
        authors: [author],
        tags: [category].filter(Boolean),
      },
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: blog.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}
