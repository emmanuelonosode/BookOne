"use client";
import React, { useEffect, useState } from "react";

/**
 * TypingHeadline
 * Props:
 * - text: string — full headline text
 * - delay: number — ms delay between characters (default 50)
 * - className: string — optional classes for h1
 */
export default function TypingHeadline({ text, delay = 50, className = "" }) {
  const [index, setIndex] = useState(0);
  const [visibleText, setVisibleText] = useState("");

  useEffect(() => {
    // Respect user preference for reduced motion
    const supportsReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (supportsReduced) {
      setVisibleText(text);
      setIndex(text.length);
      return;
    }

    setVisibleText("");
    setIndex(0);
    if (!text || text.length === 0) return;

    let mounted = true;
    const interval = setInterval(() => {
      setIndex((i) => {
        const next = i + 1;
        if (next <= text.length) {
          setVisibleText(text.slice(0, next));
        }
        if (next >= text.length) {
          clearInterval(interval);
        }
        return next;
      });
    }, delay);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <h1 className={className} aria-live="polite">
      {visibleText}
      <span
        className="inline-block w-0.5 h-6 align-middle bg-gray-900 ml-1 animate-blink"
        aria-hidden="true"
      />
    </h1>
  );
}
