"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FBF8F2]">
      {/* Soft warm glow, top-right — adds depth without noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #DCFCE7 0%, rgba(251,248,242,0) 70%)" }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-36 pb-20 sm:pt-44 sm:pb-28">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#15803D] mb-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
            Web design · SEO · AI automation — Lagos &amp; worldwide
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display font-extrabold text-[#1C1917] leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 5.25rem)" }}
          >
            Websites that turn visitors into{" "}
            <span className="text-[#15803D]">paying customers.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="text-base sm:text-lg text-[#6F6A62] leading-relaxed max-w-xl mb-10"
          >
            We design fast, clean websites and set up the SEO and automation that
            bring you a steady flow of leads — so you can focus on running your
            business.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Link href="/get-started" className="btn-primary text-sm sm:text-base">
              Get a free quote
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/portfolio"
              className="press inline-flex items-center gap-2 rounded-full border border-[#1C1917]/15 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#1C1917] hover:border-[#1C1917]/30 hover:bg-[#1C1917]/[0.03] transition-colors"
            >
              See our work
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={item}
            className="mt-12 text-sm text-[#9C968C]"
          >
            Trusted by growing businesses across Nigeria, the UK &amp; the US.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
