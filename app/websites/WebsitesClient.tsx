"use client";

import type { WebsiteListing } from "@/lib/types";
import { getOGImageUrl } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CATEGORY_LABELS: Record<string, string> = {
  "e-commerce": "E-Commerce",
  restaurant: "Restaurant",
  portfolio: "Portfolio",
  saas: "SaaS",
  agency: "Agency",
  blog: "Blog",
  other: "Other",
};

interface Props {
  listings: WebsiteListing[];
}

export default function WebsitesClient({ listings }: Props) {
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all");

  const categories = Array.from(
    new Set(listings.map((l) => l.category).filter(Boolean))
  ) as string[];

  const filtered = listings.filter((l) => {
    if (typeFilter !== "all" && l.type !== typeFilter) return false;
    if (categoryFilter !== "all" && l.category !== categoryFilter) return false;
    if (availabilityFilter !== "all" && l.availability !== availabilityFilter)
      return false;
    return true;
  });

  const hasActiveFilters =
    typeFilter !== "all" ||
    categoryFilter !== "all" ||
    availabilityFilter !== "all";

  function clearFilters() {
    setTypeFilter("all");
    setCategoryFilter("all");
    setAvailabilityFilter("all");
  }

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-2 items-center">
          {/* Type filter */}
          {(["all", "pre-built", "done-for-you"] as const).map((val) => (
            <button
              key={val}
              onClick={() => setTypeFilter(val)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-mono border transition-colors ${
                typeFilter === val
                  ? "border-[#15803D] text-[#15803D]"
                  : "border-[#1C1917]/[0.08] text-[#9C968C] hover:border-[#1C1917]/15 hover:text-[#6F6A62]"
              }`}
            >
              {val === "all"
                ? "All Types"
                : val === "pre-built"
                ? "Pre-built"
                : "Done-for-You"}
            </button>
          ))}

          <span className="w-px h-4 bg-[#1C1917]/[0.04] mx-1" />

          {/* Category filter */}
          {categories.length > 0 && (
            <>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className={`bg-transparent text-[10px] tracking-[0.12em] uppercase font-mono border px-3 py-1.5 outline-none cursor-pointer [&>option]:bg-[#FBF8F2] transition-colors ${
                  categoryFilter !== "all"
                    ? "border-[#15803D] text-[#15803D]"
                    : "border-[#1C1917]/[0.08] text-[#9C968C] hover:border-[#1C1917]/15 hover:text-[#6F6A62]"
                }`}
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {CATEGORY_LABELS[cat] ?? cat}
                  </option>
                ))}
              </select>
              <span className="w-px h-4 bg-[#1C1917]/[0.04] mx-1" />
            </>
          )}

          {/* Availability filter */}
          {(["all", "in stock", "out of stock"] as const).map((val) => (
            <button
              key={val}
              onClick={() => setAvailabilityFilter(val)}
              className={`px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-mono border transition-colors ${
                availabilityFilter === val
                  ? "border-[#15803D] text-[#15803D]"
                  : "border-[#1C1917]/[0.08] text-[#9C968C] hover:border-[#1C1917]/15 hover:text-[#6F6A62]"
              }`}
            >
              {val === "all" ? "All" : val === "in stock" ? "Available" : "Sold"}
            </button>
          ))}

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase font-mono border border-[#1C1917]/[0.08] text-[#9C968C] hover:border-[#1C1917]/15 hover:text-[#6F6A62] transition-colors ml-1"
            >
              Clear
            </button>
          )}
        </div>

        <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#9C968C] shrink-0">
          {filtered.length} / {listings.length}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#9C968C]">
            No listings match your filters.{" "}
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-[10px] tracking-[0.2em] uppercase font-mono text-[#15803D] hover:text-[#1C1917] transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1C1917]/[0.04]">
          {filtered.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}

function ListingCard({ listing }: { listing: WebsiteListing }) {
  const slug =
    typeof listing.slug === "string"
      ? listing.slug
      : listing.slug?.current ?? listing._id;

  const imageUrl = listing.mainImage
    ? getOGImageUrl(listing.mainImage)
    : "/placeholder-image.jpg";

  const isInStock = listing.availability === "in stock";

  return (
    <Link
      href={`/websites/${slug}`}
      className="group bg-[#FBF8F2] flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#FFFFFF]">
        <Image
          src={imageUrl}
          alt={listing.title}
          fill
          className="object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        {/* Title + Availability */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="font-display font-bold text-[#1C1917] text-base leading-snug line-clamp-2">
            {listing.title}
          </h2>
          <span
            className={`shrink-0 text-[10px] font-mono uppercase leading-none pt-0.5 ${
              isInStock ? "text-[#9C968C]" : "text-[#9C968C]"
            }`}
          >
            {isInStock ? "In Stock" : "Sold"}
          </span>
        </div>

        {listing.shortDescription && (
          <p className="text-sm text-[#6F6A62] line-clamp-2 leading-relaxed">
            {listing.shortDescription}
          </p>
        )}

        {/* Price + Arrow */}
        <div className="flex items-end justify-between mt-auto pt-4 border-t border-[#1C1917]/[0.08]">
          <span className="font-display font-black text-[#15803D] text-xl">
            ${listing.price.toLocaleString()}
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 14 14"
            fill="none"
            className="text-[#9C968C] group-hover:text-[#15803D] transition-colors"
            aria-hidden="true"
          >
            <path
              d="M2 12L12 2M12 2H4M12 2V10"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
