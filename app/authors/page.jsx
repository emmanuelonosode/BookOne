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

const SOCIAL_LABELS = {
  twitter: "X",
  linkedin: "LI",
  github: "GH",
  instagram: "IG",
  tiktok: "TK",
  facebook: "FB",
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

            const socials = Object.entries(SOCIAL_LABELS)
              .filter(([key]) => author[key])
              .map(([key, label]) => ({ label, href: author[key] }));

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
                    {socials.map(({ label, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] tracking-[0.15em] font-mono text-white/25 hover:text-[#E8FF47] transition-colors duration-200"
                        aria-label={`${author.name} on ${label}`}
                      >
                        {label}
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
