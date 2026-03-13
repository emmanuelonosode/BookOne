"use client";
import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import TypingHeadline from "./TypingHeadline";

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for the background elements
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const headingElements = useMemo(
    () => (
      <TypingHeadline
        text={"High-Performance Web Design & AI Workflows."}
        delay={40}
        className="text-[40px] md:text-7xl leading-[1.1] font-extrabold text-white mb-6 sm:mb-8 max-w-5xl tracking-tight"
      />
    ),
    []
  );

  return (
    <section ref={containerRef} className="bg-[#0B0B0E] relative overflow-hidden min-h-screen flex items-center pt-20">
      {/* Interactive Background Elements (Aurora Glow) */}
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none animate-aurora-bg opacity-30"
        style={{ y: yBg, opacity: opacityBg }}
      >
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex flex-col justify-center items-center text-center px-4 py-22 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A24]/60 backdrop-blur-md border border-white/10 shadow-sm text-sm font-medium text-[#A78BFA] mb-8 lg:mb-12"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
          </span>
          Digital Agency for Modern Brands
        </motion.div>

        {/* Main Heading with staggered animation */}
        {headingElements}

        {/* Description with fade in */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg sm:text-xl lg:text-2xl text-slate-300 mb-10 max-w-3xl leading-relaxed px-2 font-light"
        >
          Stop losing leads to slow, outdated websites. We build blazing-fast digital experiences and automate your busywork so you can focus on scaling.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link
            href="/get-started"
            className="group relative bg-[#6B46C1] hover:bg-[#8B5CF6] text-white px-8 lg:px-10 py-4 lg:py-5 rounded-full text-lg lg:text-xl font-semibold shadow-[0_0_20px_rgba(107,70,193,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 flex items-center gap-3 overflow-hidden transform hover:-translate-y-1"
          >
            <span className="relative z-10 flex items-center gap-3">
              Start Your Project
              {/* Arrow icon with slide animation */}
              <svg
                className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </Link>

          <Link
            href="/portfolio"
            className="group bg-transparent text-white px-8 lg:px-10 py-4 lg:py-5 rounded-full text-lg lg:text-xl font-semibold border-2 border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm transition-all duration-300 flex items-center gap-3 transform hover:-translate-y-1"
          >
            <span>See Our Work</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
