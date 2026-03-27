"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.85]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-[#080808]"
    >
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
          poster="/hero-poster.jpg"
        >
          <source src="/hero-reel.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay — darkens as you scroll */}
        <motion.div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[url('/noise.png')] bg-repeat bg-[length:200px_200px] pointer-events-none" />
      </div>

      {/* Location tag — top left */}
      <div className="relative z-10 pt-32 px-6 sm:px-10 lg:px-16">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-[10px] sm:text-xs tracking-[0.25em] text-white/40 uppercase"
        >
          Lagos · Worldwide
        </motion.p>
      </div>

      {/* Main text block */}
      <motion.div
        style={{ y: textY }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pb-24"
      >
        <div className="max-w-6xl">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-white leading-[0.95] tracking-tight mb-8"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
            }}
          >
            We Build<br />
            Websites<br />
            <span className="italic text-white/70">That Sell.</span>
          </motion.h1>

          {/* Descriptor */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-white/50 max-w-sm leading-relaxed mb-12 font-light tracking-wide"
          >
            Web design, AI automation & SEO for ambitious businesses.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-3 text-sm sm:text-base font-medium tracking-wide text-[#E8FF47] hover:text-white transition-colors duration-300"
            >
              <span>Start a Project</span>
              <span className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-[#E8FF47]/40 group-hover:border-white/40 group-hover:bg-white/5 transition-all duration-300">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator — bottom centre */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="relative z-10 flex flex-col items-center gap-2 pb-10"
      >
        <span className="text-[10px] tracking-[0.2em] text-white/30 uppercase">Scroll</span>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-white/40"
            animate={{ y: ["0%", "200%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
