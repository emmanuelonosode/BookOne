"use client";
import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingText from "../ui/RotatingText.jsx";
import Magnetic from "../ui/Magnetic.jsx";

const EASE = [0.23, 1, 0.32, 1];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const ROTATING = ["your brand.", "your customers.", "your growth.", "your business."];

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  // Subtle scroll parallax — glow drifts, content lifts gently
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F4F1EA]">
      {/* Soft green glow — warmth + depth, drifts on scroll */}
      <motion.div
        aria-hidden="true"
        style={{ y: glowY, background: "radial-gradient(circle, #DCFCE7 0%, rgba(244,241,234,0) 70%)" }}
        className="pointer-events-none absolute -top-40 -right-32 h-[560px] w-[560px] rounded-full opacity-70 blur-3xl"
      />

      <motion.div style={{ y: contentY }} className="relative z-10 max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 pt-40 pb-20 sm:pt-48 sm:pb-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-5xl">
          {/* Eyebrow */}
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-wide text-[#6F6A62] mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#15803D]" />
            Bookone Studio — web design, SEO &amp; AI automation
          </motion.p>

          {/* Headline — expressive serif with rotating tail */}
          <motion.h1
            variants={item}
            className="font-display font-medium text-[#1C1917] leading-[1.02] tracking-[-0.02em] mb-8"
            style={{ fontSize: "clamp(2.75rem, 7vw, 6rem)" }}
          >
            We make websites
            <br className="hidden sm:block" />{" "}
            that work for{" "}
            <span className="italic text-[#15803D]">
              <RotatingText items={ROTATING} />
            </span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            variants={item}
            className="text-base sm:text-xl text-[#6F6A62] leading-relaxed max-w-2xl mb-12"
          >
            Smart, beautiful websites — plus the SEO and automation that bring you a
            steady flow of leads. Built for ambitious businesses in Lagos and worldwide.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap items-center gap-4">
            <Magnetic strength={20}>
              <Link href="/get-started" className="btn-primary text-sm sm:text-base">
                Get a free quote
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Magnetic>
            <Link
              href="/portfolio"
              className="press inline-flex items-center gap-2 rounded-full border border-[#1C1917]/20 px-7 py-3.5 text-sm sm:text-base font-semibold text-[#1C1917] hover:border-[#1C1917]/40 hover:bg-[#1C1917]/[0.03] transition-colors"
            >
              See our work
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.p variants={item} className="mt-14 text-sm text-[#6F6A62]">
            Trusted by growing businesses across Nigeria, the UK &amp; the US.
          </motion.p>
        </motion.div>
      </motion.div>
    </section>
  );
}
