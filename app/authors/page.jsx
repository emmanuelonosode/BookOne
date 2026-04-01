import { sanity, getImageUrl } from "@/lib/sanity";
import { allAuthorsQuery } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  return {
    title: "Authors | Bookone Studio",
    description:
      "Meet the talented authors and experts behind Bookone Studio's content.",
    keywords: [
      "authors",
      "Bookone Studio team",
      "content creators",
      "experts",
      "writers",
    ],
    alternates: {
      canonical: "/authors",
    },
    openGraph: {
      title: "Authors | Bookone Studio",
      description:
        "Meet the talented authors and experts behind Bookone Studio's content.",
      url: `${baseUrl}/authors`,
      siteName: "Bookone Studio",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "Bookone Studio Authors",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Authors | Bookone Studio",
      description:
        "Meet the talented authors and experts behind Bookone Studio's content.",
      images: ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
    },
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
  };
}

export const revalidate = 3600;

const SOCIAL_ICONS = {
  twitter:   { label: "X (Twitter)",  icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  linkedin:  { label: "LinkedIn",     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
  github:    { label: "GitHub",       icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
  instagram: { label: "Instagram",    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg> },
  tiktok:    { label: "TikTok",       icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/></svg> },
  facebook:  { label: "Facebook",     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
};

export default async function AuthorsPage() {
  const authors = await sanity.fetch(
    allAuthorsQuery,
    {},
    { cache: "force-cache" }
  );

  return (
    <section className="bg-[#080808] min-h-screen pt-32 pb-24" aria-labelledby="authors-heading">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="mb-16 border-b border-white/[0.06] pb-12">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
            The Team
          </p>
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <h1
              id="authors-heading"
              className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              Our Authors
            </h1>
            <p className="text-sm text-white/40 leading-relaxed max-w-sm">
              The writers and strategists behind Bookone Studio&apos;s content — each bringing deep expertise in web, AI, and growth.
            </p>
          </div>
        </div>

        {/* Authors grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/[0.06]"
          role="list"
          aria-label="Authors List"
        >
          {authors.map((author, index) => {
            const imageUrl = author.image
              ? (getImageUrl(author.image) ?? author.image?.asset?.url ?? null)
              : null;

            const socials = Object.entries(SOCIAL_ICONS)
              .filter(([key]) => author[key])
              .map(([key, { label, icon }]) => ({ label, icon, href: author[key] }));

            return (
              <div
                key={author._id}
                className="group bg-[#080808] p-8 flex flex-col"
                role="listitem"
                aria-label={`Author: ${author.name}`}
              >
                {/* Avatar */}
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-white/[0.06] ring-1 ring-white/10">
                    {imageUrl ? (
                      <Image
                        src={imageUrl}
                        alt={author.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                        priority={index < 8}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span
                          className="font-display font-black text-white/40"
                          style={{ fontSize: "1.5rem" }}
                        >
                          {author.name?.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Name + role */}
                <h2 className="font-display font-bold text-white text-xl leading-tight mb-1">
                  {author.name}
                </h2>
                {author.role && (
                  <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase mb-4 font-mono">
                    {author.role}
                  </p>
                )}

                {/* Bio */}
                {author.bio && (
                  <p className="text-sm text-white/40 leading-relaxed mb-6 flex-1">
                    {author.bio}
                  </p>
                )}

                {/* Socials */}
                {socials.length > 0 && (
                  <div className="flex items-center gap-4 mb-6">
                    {socials.map(({ label, icon, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/25 hover:text-[#E8FF47] transition-colors duration-200"
                        aria-label={`${author.name} on ${label}`}
                      >
                        {icon}
                      </a>
                    ))}
                  </div>
                )}

                {/* View Profile */}
                <Link
                  href={`/authors/${author.slug?.current}`}
                  className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-[#E8FF47] hover:text-white transition-colors duration-200 font-medium group/link"
                  aria-label={`View profile for ${author.name}`}
                >
                  View Profile
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-300"
                  >
                    <path
                      d="M2 12L12 2M12 2H4M12 2V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            );
          })}
        </div>

        {authors.length === 0 && (
          <div className="text-center py-24">
            <p className="text-white/20 text-sm tracking-wide uppercase">No authors yet</p>
          </div>
        )}
      </div>
    </section>
  );
}
