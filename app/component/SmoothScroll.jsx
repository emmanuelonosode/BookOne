"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum smooth-scroll (Grain & Mortar feel) via Lenis.
 * - Client-only; guards window.
 * - Fully disabled under prefers-reduced-motion (returns children untouched).
 * - Lenis operates on the document, so this just needs to mount once.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      // strong ease-out — settles quickly, feels intentional
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
