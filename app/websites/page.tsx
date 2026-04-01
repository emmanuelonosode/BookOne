import { sanity } from "@/lib/sanity";
import { allWebsiteListingsQuery } from "@/lib/queries";
import type { WebsiteListing } from "@/lib/types";
import type { Metadata } from "next";
import Script from "next/script";
import WebsitesClient from "./WebsitesClient";

export const revalidate = 60;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export const metadata: Metadata = {
  title: "Websites for Sale | Buy Pre-built & Done-for-You Sites — Bookone Studio",
  description:
    "Browse pre-built and done-for-you websites for sale. Each listing includes a live preview, tech stack details, and full video walkthrough. Ready to launch from day one.",
  keywords: [
    "websites for sale", "buy a website", "pre-built websites",
    "done-for-you website", "website marketplace", "buy website online",
    "ready-made websites", "website templates for sale", "Bookone Studio websites",
    "e-commerce website for sale", "SaaS website template",
  ],
  alternates: { canonical: `${baseUrl}/websites` },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Websites for Sale | Buy Pre-built & Done-for-You Sites — Bookone Studio",
    description:
      "Browse pre-built and done-for-you websites for sale. Live preview, full video walkthrough, and instant transfer.",
    url: `${baseUrl}/websites`,
    siteName: "Bookone Studio",
    type: "website",
    locale: "en_US",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Websites for Sale — Bookone Studio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Websites for Sale | Bookone Studio",
    description: "Pre-built and done-for-you websites ready to launch. Browse listings with live previews.",
    images: ["/opengraph-image.png"],
    creator: "@bookonedotdev",
    site: "@bookonedotdev",
  },
};

export default async function WebsitesPage() {
  const listings: WebsiteListing[] = await sanity.fetch(
    allWebsiteListingsQuery,
    {},
    { next: { revalidate: 60 } }
  );

  const inStock = listings.filter((l) => l.availability === "in stock");

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Websites for Sale — Bookone Studio",
    description: "Pre-built and done-for-you websites available for purchase from Bookone Studio.",
    url: `${baseUrl}/websites`,
    publisher: { "@type": "Organization", name: "Bookone Studio", url: baseUrl },
    mainEntity: {
      "@type": "ItemList",
      name: "Website Listings",
      numberOfItems: listings.length,
      itemListElement: listings.map((listing, index) => {
        const slug = typeof listing.slug === "string" ? listing.slug : listing.slug?.current ?? "";
        return {
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Product",
            name: listing.title,
            description: listing.shortDescription ?? "",
            url: `${baseUrl}/websites/${slug}`,
            brand: { "@type": "Brand", name: "Bookone Studio" },
            offers: {
              "@type": "Offer",
              price: listing.price,
              priceCurrency: "USD",
              availability:
                listing.availability === "in stock"
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              seller: { "@type": "Organization", name: "Bookone Studio" },
            },
          },
        };
      }),
    },
  };

  return (
    <>
      <Script
        id="websites-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Websites for Sale", item: `${baseUrl}/websites` },
        ],
      }) }} />

      <main className="bg-[#080808] min-h-screen" aria-labelledby="websites-heading">

        {/* HERO */}
        <div className="pt-32 pb-20 border-b border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
            <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-4">
                  Website Marketplace
                </p>
                <h1
                  id="websites-heading"
                  className="font-display font-black text-white leading-none"
                  style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
                >
                  Websites<br />
                  <span className="italic">for sale.</span>
                </h1>
                <p className="mt-6 text-base text-white/40 leading-relaxed max-w-xl">
                  Pre-built templates and done-for-you builds — ready to launch.
                  Live preview, full walkthrough, instant transfer.
                </p>
              </div>
              <div className="text-right hidden lg:block">
                <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/20 mb-1">Available now</p>
                <p className="font-display font-black text-[#E8FF47]" style={{ fontSize: "clamp(2rem, 3vw, 3.5rem)" }}>
                  {inStock.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-16">
          {listings.length === 0 ? (
            <div className="py-24 border-t border-white/[0.06]">
              <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/20">
                No listings yet — check back soon.
              </p>
            </div>
          ) : (
            <WebsitesClient listings={listings} />
          )}
        </div>

        {/* CTA */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 py-24 sm:py-32">
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase font-mono mb-6">
              Custom build
            </p>
            <h2
              className="font-display font-black text-white leading-none mb-10"
              style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
            >
              Need something<br />
              <span className="italic">built from scratch?</span>
            </h2>
            <a
              href="/get-started"
              className="group inline-flex items-center gap-3 text-[#E8FF47] text-sm font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Start a Custom Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

      </main>
    </>
  );
}
