"use client";

import dynamic from "next/dynamic";

const darkSkeleton = <div className="h-8 bg-white/[0.04] animate-pulse" />;

export const ShareButtons = dynamic(() => import("./ShareButtons"), {
  ssr: false,
  loading: () => darkSkeleton,
});

export const ReadingProgress = dynamic(() => import("./ReadingProgress"), {
  ssr: false,
  loading: () => <div className="h-[2px] bg-white/[0.06]" />,
});

export const TableOfContents = dynamic(() => import("./TableOfContents"), {
  ssr: false,
  loading: () => (
    <div className="space-y-2 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-3 bg-white/[0.04] rounded" style={{ width: `${70 + i * 5}%` }} />
      ))}
    </div>
  ),
});

export const RelatedPosts = dynamic(() => import("./RelatedPosts"), {
  ssr: false,
  loading: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.06]">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-[#080808] p-6 h-48 animate-pulse" />
      ))}
    </div>
  ),
});

export const NewsletterSignup = dynamic(() => import("./NewsletterSignup"), {
  ssr: false,
  loading: () => <div className="h-40 bg-white/[0.04] animate-pulse" />,
});
