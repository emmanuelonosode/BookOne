"use client";

import { useState, useEffect } from "react";

export default function ShareButtons({ url, title, className = "" }) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const share = async (platform) => {
    if (!mounted) return;
    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
      case "copy":
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {}
        break;
    }
  };

  if (!mounted) return null;

  const btnClass = "text-[10px] tracking-[0.15em] uppercase font-mono text-white/30 hover:text-[#E8FF47] transition-colors duration-200";

  return (
    <div className={`flex flex-wrap items-center gap-5 ${className}`}>
      <button onClick={() => share("twitter")} className={btnClass} aria-label="Share on Twitter">
        X / Twitter
      </button>
      <button onClick={() => share("linkedin")} className={btnClass} aria-label="Share on LinkedIn">
        LinkedIn
      </button>
      <button onClick={() => share("copy")} className={btnClass} aria-label="Copy link">
        {copied ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
