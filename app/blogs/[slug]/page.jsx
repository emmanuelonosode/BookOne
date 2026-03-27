import { sanity, getImageUrl, getOGImageUrl } from "@/lib/sanity";
import { blogBySlugQuery } from "@/lib/queries";
import { PortableText } from "@portabletext/react";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Script from "next/script";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ShareButtons,
  ReadingProgress,
  TableOfContents,
  RelatedPosts,
  NewsletterSignup,
} from "@/components/BlogClientComponents";
import CodeBlock from "@/components/CodeBlock";
import BackToTop from "@/components/BackToTop";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await sanity.fetch(
    `*[_type == "post" && defined(slug.current)].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = await sanity.fetch(blogBySlugQuery, { slug: resolvedParams.slug }, { next: { revalidate: 60 } });
  if (!blog) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const author = blog.author?.name || "BookOne";
  const category = blog.category
    ? blog.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : undefined;
  const metaTitle = blog.seo?.metaTitle || blog.title;
  const metaDescription = blog.seo?.metaDescription || blog.description || "BookOne blog article";
  const canonicalUrl = blog.seo?.canonicalUrl || `${baseUrl}/blogs/${resolvedParams.slug}`;
  const ogSource = blog.seo?.ogImage || blog.mainImage;
  const imageUrl = ogSource ? getOGImageUrl(ogSource) : undefined;
  const absoluteOgUrl = imageUrl?.startsWith("http") ? imageUrl : imageUrl ? `${baseUrl}${imageUrl}` : undefined;
  const published = blog.publishedAt || blog._createdAt;
  const updated = blog._updatedAt || published;
  const noIndex = blog.seo?.noIndex === true;

  return {
    title: metaTitle,
    description: metaDescription,
    authors: [author],
    creator: author,
    publisher: "BookOne",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: { index: !noIndex, follow: !noIndex, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
    alternates: { canonical: canonicalUrl },
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: "article",
      url: `${baseUrl}/blogs/${resolvedParams.slug}`,
      siteName: "BookOne",
      locale: "en_US",
      images: absoluteOgUrl
        ? [{ url: absoluteOgUrl, width: 1200, height: 630, alt: metaTitle }]
        : [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "BookOne Blog" }],
      article: {
        publishedTime: published,
        modifiedTime: updated,
        authors: [author],
        tags: [category, "web design", "SEO", "AI automation"].filter(Boolean),
        section: category,
      },
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: metaTitle,
      description: metaDescription,
      images: absoluteOgUrl ? [absoluteOgUrl] : ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@bookonedotdev",
    },
    other: {
      "article:published_time": published,
      "article:modified_time": updated,
      "article:author": author,
      "article:section": category,
    },
  };
}

// ─── Portable Text components (dark editorial style) ────────────────────────

const portableComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <figure className="my-10">
          <div className="relative overflow-hidden">
            <Image
              src={getImageUrl(value)}
              alt={value.alt || "Article image"}
              width={800}
              height={600}
              className="w-full object-cover"
              priority={false}
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-xs text-white/30 mt-3 font-mono tracking-wide">
              {value.caption}
            </figcaption>
          )}
        </figure>
      ) : null,

    callout: ({ value }) => (
      <div className={`my-8 p-6 border-l-2 ${
        value.type === "warning" ? "border-yellow-400/60 bg-yellow-400/[0.04]"
        : value.type === "error"  ? "border-red-400/60 bg-red-400/[0.04]"
        : "border-[#E8FF47]/40 bg-[#E8FF47]/[0.04]"
      }`}>
        {value.title && <p className="text-sm font-semibold text-white/70 mb-2">{value.title}</p>}
        <PortableText value={value.content} />
      </div>
    ),

    table: ({ value }) => {
      if (!value?.rows?.length) return null;
      return (
        <div className="my-8 overflow-x-auto border border-white/[0.08]">
          <table className="min-w-full">
            {value.caption && (
              <caption className="text-xs text-white/30 px-4 py-3 border-b border-white/[0.06] font-mono text-left">
                {value.caption}
              </caption>
            )}
            <tbody>
              {value.rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-white/[0.06] last:border-none">
                  {row.cells.map((cell, cellIndex) => {
                    const Tag = cell.isHeader ? "th" : "td";
                    return (
                      <Tag key={cellIndex} className={`px-4 py-3 text-sm text-left ${
                        cell.isHeader ? "text-white/50 font-medium uppercase text-[10px] tracking-wider" : "text-white/60"
                      }`}>
                        {cell.content?.length > 0 ? (
                          <PortableText value={cell.content} components={{ block: { normal: ({ children }) => <span>{children}</span> } }} />
                        ) : "—"}
                      </Tag>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    code: ({ value }) => <CodeBlock value={value} />,
  },

  block: {
    h1: ({ children }) => (
      <h1 id={String(children?.[0] ?? "").replace(/\s+/g, "-").toLowerCase()}
        className="font-display font-black text-white leading-tight mt-12 mb-5 scroll-mt-24"
        style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 id={String(children?.[0] ?? "").replace(/\s+/g, "-").toLowerCase()}
        className="font-display font-bold text-white leading-tight mt-10 mb-4 scroll-mt-24"
        style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 id={String(children?.[0] ?? "").replace(/\s+/g, "-").toLowerCase()}
        className="font-display font-bold text-white/90 leading-tight mt-8 mb-3 text-xl scroll-mt-24">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="font-semibold text-white/80 mt-6 mb-2 text-lg">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-white/55">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-[#E8FF47] pl-6">
        <div className="font-display italic text-white/60 text-lg leading-snug">{children}</div>
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => <strong className="font-bold text-white/90">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/70">{children}</em>,
    code: ({ children }) => (
      <code className="bg-white/[0.06] text-[#E8FF47] px-1.5 py-0.5 font-mono text-sm border border-white/[0.08]">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a href={value?.href} className="text-[#E8FF47] hover:text-white underline underline-offset-2 transition-colors duration-200"
        target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
    highlight: ({ children }) => (
      <mark className="bg-[#E8FF47]/20 text-[#E8FF47] px-1">{children}</mark>
    ),
  },

  list: {
    bullet: ({ children }) => <ul className="my-6 space-y-2 pl-0 list-none">{children}</ul>,
    number: ({ children }) => <ol className="my-6 space-y-2 pl-0 list-none">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="text-[#E8FF47] mt-1 shrink-0 text-xs">—</span>
        <span className="text-base text-white/55 leading-relaxed">{children}</span>
      </li>
    ),
    number: ({ children }) => (
      <li className="flex items-start gap-3">
        <span className="text-[#E8FF47] mt-1 shrink-0 text-xs font-mono">›</span>
        <span className="text-base text-white/55 leading-relaxed">{children}</span>
      </li>
    ),
  },
};

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const blog = await sanity.fetch(blogBySlugQuery, { slug: resolvedParams.slug }, { next: { revalidate: 60 } });
  if (!blog) notFound();

  const wordCount = blog.body
    ? blog.body.reduce((count, block) => {
        if (block._type === "block" && block.children) {
          return count + block.children.reduce((bc, child) => bc + (child.text?.split(" ").length || 0), 0);
        }
        return count;
      }, 0)
    : 0;
  const readingTime = Math.ceil(wordCount / 200);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const imageUrl = blog.mainImage ? getOGImageUrl(blog.mainImage) : undefined;
  const author = blog.author?.name || "BookOne";
  const category = blog.category
    ? blog.category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : undefined;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    image: imageUrl,
    author: {
      "@type": "Person",
      name: author,
      url: blog.author?.slug?.current ? `${baseUrl}/authors/${blog.author.slug.current}` : undefined,
    },
    publisher: { "@type": "Organization", name: "BookOne" },
    datePublished: blog._createdAt,
    dateModified: blog._updatedAt || blog._createdAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${baseUrl}/blogs/${resolvedParams.slug}` },
    articleSection: category,
    wordCount,
  };

  const currentUrl = `${baseUrl}/blogs/${resolvedParams.slug}`;

  return (
    <>
      <Script id="blog-structured-data" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <ReadingProgress />

      <div className="bg-[#080808] min-h-screen">

        {/* HERO */}
        <div className="pt-32 pb-14 border-b border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

            {/* Back */}
            <Link href="/blogs"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-white/30 hover:text-white transition-colors duration-200 font-mono mb-12">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M12 7H2M2 7L7 2M2 7L7 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All Articles
            </Link>

            <div className="grid lg:grid-cols-[1fr_280px] gap-16 items-start">
              <div>
                {category && (
                  <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-4">{category}</p>
                )}
                <h1 className="font-display font-black text-white leading-none mb-6"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 4.5rem)" }}>
                  {blog.title}
                </h1>
                {blog.description && (
                  <p className="text-base text-white/45 leading-relaxed max-w-2xl mb-8">{blog.description}</p>
                )}

                {/* Meta row */}
                <div className="flex flex-wrap items-center gap-6 text-[10px] tracking-[0.15em] uppercase text-white/25 font-mono">
                  {blog.author?.name && (
                    <Link href={`/authors/${blog.author.slug?.current}`}
                      className="hover:text-[#E8FF47] transition-colors duration-200">
                      {blog.author.name}
                    </Link>
                  )}
                  <span>{formatDistanceToNow(new Date(blog._createdAt), { addSuffix: true })}</span>
                  <span>{readingTime} min read</span>
                  <span>{wordCount.toLocaleString()} words</span>
                </div>
              </div>

              {/* Share */}
              <div className="hidden lg:block">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-mono mb-4">Share</p>
                <ShareButtons url={currentUrl} title={blog.title} />
              </div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        {blog.mainImage && (
          <div className="border-b border-white/[0.06]">
            <div className="max-w-[1600px] mx-auto">
              <div className="relative w-full aspect-[21/9] overflow-hidden">
                <Image
                  src={getImageUrl(blog.mainImage)}
                  alt={blog.title}
                  fill
                  className="object-cover opacity-75"
                  priority
                />
              </div>
            </div>
          </div>
        )}

        {/* CONTENT */}
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          <div className="grid lg:grid-cols-[220px_1fr] gap-16 items-start">

            {/* Sticky ToC */}
            <aside className="hidden lg:block lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-mono mb-4">Contents</p>
              <TableOfContents content={blog.body} />
            </aside>

            {/* Article */}
            <article className="min-w-0">
              <div className="max-w-2xl">
                <PortableText value={blog.body} components={portableComponents} />
              </div>

              {/* Tags */}
              {blog.tags?.length > 0 && (
                <div className="mt-12 pt-8 border-t border-white/[0.06]">
                  <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-mono mb-4">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {blog.tags.map((tag, i) => (
                      <span key={i}
                        className="px-3 py-1 border border-white/[0.08] text-[10px] tracking-[0.1em] uppercase font-mono text-white/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Author */}
              {blog.author && (
                <div className="mt-12 pt-8 border-t border-white/[0.06]">
                  <div className="flex items-start gap-6">
                    {blog.author.image && (
                      <div className="w-14 h-14 rounded-full overflow-hidden bg-white/[0.06] shrink-0 ring-1 ring-white/10">
                        <Image
                          src={getImageUrl(blog.author.image)}
                          alt={blog.author.name}
                          width={56}
                          height={56}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-bold text-white text-lg mb-1">{blog.author.name}</h3>
                      {blog.author.bio && (
                        <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-lg">{blog.author.bio}</p>
                      )}
                      <Link href={`/authors/${blog.author.slug?.current}`}
                        className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-[#E8FF47] hover:text-white transition-colors duration-200 font-mono">
                        View all posts
                        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                          <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Share bottom */}
              <div className="mt-12 pt-8 border-t border-white/[0.06]">
                <p className="text-[10px] tracking-[0.2em] uppercase text-white/20 font-mono mb-4">Share this article</p>
                <ShareButtons url={currentUrl} title={blog.title} />
              </div>

              {/* Newsletter */}
              <div className="mt-12">
                <NewsletterSignup />
              </div>
            </article>
          </div>
        </div>

        {/* Related posts */}
        <div className="border-t border-white/[0.06] py-20">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <RelatedPosts currentSlug={resolvedParams.slug} category={blog.category} />
          </div>
        </div>

      </div>

      <BackToTop />
    </>
  );
}
