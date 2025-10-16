"use client";

import dynamic from "next/dynamic";

// Dynamic imports with ssr: false
export const ShareButtons = dynamic(() => import("../utils/ShareButtons"), {
  ssr: false,
  loading: () => <div className="h-8 bg-gray-200 rounded animate-pulse"></div>,
});

export const ReadingProgress = dynamic(() => import("../utils/ReadingProgress"), {
  ssr: false,
  loading: () => <div className="h-1 bg-gray-200"></div>,
});

export const TableOfContents = dynamic(() => import("./TableOfContents"), {
  ssr: false,
  loading: () => (
    <div className="w-64 h-96 bg-gray-200 rounded animate-pulse"></div>
  ),
});

export const RelatedPosts = dynamic(() => import("./RelatedPosts"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-48 bg-gray-200 rounded animate-pulse"></div>
      ))}
    </div>
  ),
});

export const NewsletterSignup = dynamic(() => import("../NewsletterSignup"), {
  ssr: false,
  loading: () => <div className="h-32 bg-gray-200 rounded animate-pulse"></div>,
});
