"use client";

import type { WebsiteListing } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

interface Props {
  listing: WebsiteListing;
  heroImage: string | null;
  baseUrl: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  "e-commerce": "E-Commerce",
  restaurant: "Restaurant",
  portfolio: "Portfolio",
  saas: "SaaS",
  agency: "Agency",
  blog: "Blog",
  other: "Other",
};

function getLoomEmbedUrl(url: string): string | null {
  const match = url.match(/loom\.com\/share\/([a-zA-Z0-9]+)/);
  if (match) return `https://www.loom.com/embed/${match[1]}`;
  return null;
}

function DiagonalArrow({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

type ReactChildren = { children?: React.ReactNode };

// Dark editorial PortableText components for "What's Included"
const portableComponents = {
  block: {
    normal: ({ children }: ReactChildren) => (
      <p className="mb-4 text-base leading-relaxed text-white/55">{children}</p>
    ),
    h3: ({ children }: ReactChildren) => (
      <h3 className="font-display font-bold text-white text-lg mt-6 mb-3">{children}</h3>
    ),
    h4: ({ children }: ReactChildren) => (
      <h4 className="font-semibold text-white/80 mt-4 mb-2">{children}</h4>
    ),
  },
  marks: {
    strong: ({ children }: ReactChildren) => <strong className="font-bold text-white/90">{children}</strong>,
    em: ({ children }: ReactChildren) => <em className="italic text-white/70">{children}</em>,
  },
  list: {
    bullet: ({ children }: ReactChildren) => <ul className="my-4 space-y-2 pl-0 list-none">{children}</ul>,
    number: ({ children }: ReactChildren) => <ol className="my-4 space-y-2 pl-0 list-none">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: ReactChildren) => (
      <li className="flex items-start gap-3">
        <span className="text-[#E8FF47] mt-1 shrink-0 text-xs">—</span>
        <span className="text-base text-white/55 leading-relaxed">{children}</span>
      </li>
    ),
    number: ({ children }: ReactChildren) => (
      <li className="flex items-start gap-3">
        <span className="text-[#E8FF47] mt-1 shrink-0 text-xs font-mono">›</span>
        <span className="text-base text-white/55 leading-relaxed">{children}</span>
      </li>
    ),
  },
};

export default function WebsiteDetail({ listing, heroImage }: Props) {
  const isInStock = listing.availability === "in stock";
  const loomEmbed = listing.loomVideoUrl ? getLoomEmbedUrl(listing.loomVideoUrl) : null;

  return (
    <main className="min-h-screen bg-[#080808] text-white pt-28 pb-24">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Breadcrumb nav */}
        <nav className="mb-10 flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-mono text-white/25" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-white/60 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/websites" className="hover:text-white/60 transition-colors">Websites for Sale</Link>
          <span>/</span>
          <span className="text-white/40 truncate max-w-[200px]">{listing.title}</span>
        </nav>

        {/* Hero Grid */}
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 mb-20 items-start border-b border-white/[0.06] pb-20">

          {/* Image */}
          <div className="relative aspect-video overflow-hidden bg-[#111]">
            {heroImage ? (
              <Image
                src={heroImage}
                alt={`${listing.title} — website preview`}
                fill
                className="object-cover opacity-80"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/20 text-[10px] tracking-[0.2em] uppercase font-mono">
                No preview
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">

            {/* Type + Category badges */}
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/25 border border-white/[0.08] px-3 py-1">
                {listing.type === "pre-built" ? "Pre-built" : "Done-for-You"}
              </span>
              {listing.category && (
                <span className="text-[10px] tracking-[0.15em] uppercase font-mono text-white/25 border border-white/[0.08] px-3 py-1">
                  {CATEGORY_LABELS[listing.category] ?? listing.category}
                </span>
              )}
            </div>

            <h1
              className="font-display font-black text-white leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              {listing.title}
            </h1>

            {listing.shortDescription && (
              <p className="text-white/45 leading-relaxed text-sm max-w-sm">
                {listing.shortDescription}
              </p>
            )}

            {/* Price */}
            <div className="border-t border-white/[0.06] pt-5">
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/25 mb-2">Price</p>
              <div className="flex items-baseline gap-3">
                <span
                  className="font-display font-black text-[#E8FF47]"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  ${listing.price.toLocaleString()}
                </span>
                <span className="text-sm font-mono text-white/30">USD</span>
              </div>
              <p className={`text-[10px] font-mono uppercase tracking-[0.2em] mt-2 ${isInStock ? "text-white/40" : "text-white/20"}`}>
                {isInStock ? "● Available" : "○ Sold Out"}
              </p>
            </div>

            {/* Preview + Demo links */}
            {(listing.liveUrl || listing.loomVideoUrl) && (
              <div className="flex flex-wrap gap-5 border-t border-white/[0.06] pt-5">
                {listing.liveUrl && (
                  <a
                    href={listing.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-mono text-white/40 hover:text-white transition-colors"
                  >
                    Live Preview <DiagonalArrow />
                  </a>
                )}
                {listing.loomVideoUrl && (
                  <a
                    href={listing.loomVideoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase font-mono text-white/40 hover:text-white transition-colors"
                  >
                    Watch Demo <DiagonalArrow />
                  </a>
                )}
              </div>
            )}

            {/* Buy CTA */}
            <div className="border-t border-white/[0.06] pt-5">
              {isInStock ? (
                <Link
                  href={`/get-started?intent=website-purchase&website=${encodeURIComponent(listing.title)}&price=${listing.price}`}
                  className="inline-flex items-center gap-3 text-[#E8FF47] text-sm font-semibold hover:text-white transition-colors duration-200"
                >
                  Buy This Website — ${listing.price.toLocaleString()}
                  <DiagonalArrow />
                </Link>
              ) : (
                <Link
                  href="/get-started"
                  className="inline-flex items-center gap-3 text-white/30 text-sm font-semibold hover:text-white transition-colors duration-200"
                >
                  Commission a Similar Build
                  <DiagonalArrow />
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Loom Video Embed */}
        {loomEmbed && (
          <section className="mb-20" aria-label="Video walkthrough">
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-6">
              Video Walkthrough
            </p>
            <div className="relative w-full aspect-video overflow-hidden bg-[#111]">
              <iframe
                src={loomEmbed}
                allowFullScreen
                className="absolute inset-0 w-full h-full"
                title={`${listing.title} — video walkthrough`}
                loading="lazy"
              />
            </div>
          </section>
        )}

        {/* Tech Stack + Category */}
        <section className="border-t border-white/[0.06] pt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {listing.category && (
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/25 mb-3">Category</p>
              <p className="text-sm text-white/60">{CATEGORY_LABELS[listing.category] ?? listing.category}</p>
            </div>
          )}
          {listing.type && (
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/25 mb-3">Type</p>
              <p className="text-sm text-white/60">{listing.type === "pre-built" ? "Pre-built Template" : "Done-for-You Build"}</p>
            </div>
          )}
          {listing.techStack && listing.techStack.length > 0 && (
            <div>
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/25 mb-3">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {listing.techStack.map((tech) => (
                  <span key={tech} className="text-[10px] border border-white/[0.08] px-3 py-1 font-mono text-white/30 uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* What's Included */}
        {listing.whatsIncluded && listing.whatsIncluded.length > 0 && (
          <section className="border-t border-white/[0.06] pt-10 mb-20">
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-8">
              What&apos;s Included
            </p>
            <div className="max-w-2xl">
              <PortableText value={listing.whatsIncluded} components={portableComponents} />
            </div>
          </section>
        )}

        {/* Screenshots */}
        {listing.screenshots && listing.screenshots.length > 0 && (
          <section className="mb-20">
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-8">
              Screenshots
            </p>
            <div className="grid sm:grid-cols-2 gap-px bg-white/[0.06]">
              {listing.screenshots.map((shot, i) => {
                const url = shot?.asset?.url;
                if (!url) return null;
                return (
                  <div key={i} className="aspect-video relative overflow-hidden bg-[#111]">
                    <Image
                      src={url}
                      alt={shot.alt ?? `${listing.title} — screenshot ${i + 1}`}
                      fill
                      className="object-cover hover:opacity-90 transition-opacity duration-500"
                      sizes="(max-width: 640px) 100vw, 50vw"
                      loading="lazy"
                    />
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="border-t border-white/[0.06] pt-16">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-6">
            {isInStock ? "Ready to buy?" : "Need something similar?"}
          </p>
          <h2
            className="font-display font-black text-white mb-6 leading-[0.95]"
            style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
          >
            {isInStock ? "Own this website today." : "Let's build yours from scratch."}
          </h2>
          <p className="text-white/40 text-sm mb-8 max-w-md leading-relaxed">
            {isInStock
              ? "Fill out the form and we'll transfer everything — domain, code, and hosting setup."
              : "This listing is sold, but we can build you something similar or fully custom."}
          </p>
          <Link
            href={isInStock
              ? `/get-started?intent=website-purchase&website=${encodeURIComponent(listing.title)}&price=${listing.price}`
              : "/get-started"}
            className="inline-flex items-center gap-3 text-[#E8FF47] text-sm font-semibold hover:text-white transition-colors duration-200"
          >
            {isInStock ? `Get Started — $${listing.price.toLocaleString()}` : "Start a Custom Build"}
            <DiagonalArrow />
          </Link>
        </div>

      </div>
    </main>
  );
}
