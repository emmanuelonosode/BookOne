import Link from "next/link";
import Image from "next/image";
import { sanity, getImageUrl } from "@/lib/sanity";
import { homepageWebsiteListingsQuery } from "@/lib/queries";

export const revalidate = 60;

export default async function FeaturedWebsites() {
  let listings = [];
  try {
    listings = await sanity.fetch(homepageWebsiteListingsQuery, {}, {
      next: { revalidate: 60 },
    });
  } catch {
    // Fall through to empty state
  }

  if (listings.length === 0) return null;

  return (
    <section className="py-20 sm:py-28 border-t border-[#1C1917]/[0.08]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-14 gap-6 flex-wrap">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-[#6F6A62] uppercase mb-3">
              Website Marketplace
            </p>
            <h2
              className="font-display font-black text-[#1C1917] leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Websites for Sale
            </h2>
          </div>
          <Link
            href="/websites"
            className="text-xs tracking-[0.15em] uppercase text-[#6F6A62] hover:text-[#1C1917] transition-colors duration-200 flex items-center gap-2 group shrink-0"
          >
            Browse All
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1917]/[0.04]">
          {listings.map((listing, i) => {
            const slug = typeof listing.slug === "string" ? listing.slug : listing.slug?.current ?? "#";
            const imgUrl = listing.mainImage ? getImageUrl(listing.mainImage) : null;
            const isAvailable = listing.availability === "in stock";

            return (
              <Link
                key={listing._id}
                href={`/websites/${slug}`}
                className="group bg-[#F4F1EA] flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="relative w-full aspect-[16/10] overflow-hidden bg-[#1C1917]/[0.03]">
                  {imgUrl ? (
                    <Image
                      src={imgUrl}
                      alt={listing.title}
                      fill
                      className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-white/[0.03]" />
                  )}
                  {/* Availability badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`text-[9px] tracking-[0.15em] uppercase font-mono px-2 py-1 ${
                      isAvailable
                        ? "bg-[#15803D] text-[#F4F1EA]"
                        : "bg-[#1C1917]/[0.05] text-[#6F6A62]"
                    }`}>
                      {isAvailable ? "Available" : "Sold"}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-[10px] tracking-[0.2em] text-[#15803D]/60 uppercase font-mono">
                      {String(i + 1).padStart(2, "0")} · {listing.type ?? "Pre-built"}
                    </p>
                    {listing.price && (
                      <p className="text-sm font-semibold text-[#1C1917]">
                        ${listing.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <h3 className="font-display font-bold text-[#1C1917] group-hover:text-[#3A352F] transition-colors leading-tight text-lg sm:text-xl mb-2">
                    {listing.title}
                  </h3>
                  {listing.shortDescription && (
                    <p className="text-sm text-[#6F6A62] leading-relaxed line-clamp-2 mb-4 flex-1">
                      {listing.shortDescription}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-2 text-xs text-[#15803D] group-hover:text-[#1C1917] transition-colors duration-200 font-medium mt-auto">
                    View Details
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                      <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
