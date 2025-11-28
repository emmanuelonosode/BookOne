import React, { useMemo } from "react";
import Link from "next/link";
import TypingHeadline from "./TypingHeadline";




export default function HeroSection() {

  const headingElements = useMemo(
    () => (
      <TypingHeadline
        text={"Transform Your Business with Smart Web Design and AI Automation"}
        delay={50}
        className="text-[40px] md:text-7xl leading-[120%] font-extrabold text-gray-900 mb-6 sm:mb-8 max-w-5xl"
      />
    ),
    []
  );

  return (

    <section className="bg-[#FAFAFA] relative overflow-hidden">
      {/* Background decoration - subtle blobs instead of gradients if needed, or just clean */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         {/* Optional: Very subtle solid circles if "no gradient" allows solid shapes, 
             but for strict "no gradient", we keep it clean or use very faint solid colors. 
             Let's keep it strictly clean as requested. */}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 py-22 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Main Heading with staggered animation */}
        {headingElements}

        {/* Description with fade in */}
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-4 max-w-4xl leading-relaxed px-2 sm:px-4 animate-fade-in-up">
          We design smart, fast, conversion-driven websites and automate your
          workflows to help your business grow effortlessly.
        </p>

        {/* CTA Button with enhanced animations */}
        <div className="flex flex-col sm:flex-row gap-4 items-center animate-fade-in-up">
          <Link
            href="/get-started"
            className="group relative bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-base sm:text-lg lg:text-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-3 overflow-hidden hover:scale-105"
          >

            <div className="relative w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full animate-pulse-subtle" />
            <span className="relative z-10">Start Your Project</span>

            {/* Arrow icon with slide animation */}
            <svg
              className="relative w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
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
          </Link>

          <Link
            href="/portfolio"
            className="group text-gray-700 hover:text-gray-900 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-base sm:text-lg lg:text-xl font-semibold border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 flex items-center gap-3 hover:scale-105"
          >
            <span>See Our Work</span>
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1"
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
        </div>
      </div>
    </section>
  );
}
