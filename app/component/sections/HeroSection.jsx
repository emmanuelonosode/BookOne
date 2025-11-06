import React, { useMemo } from "react";
import { Palette, Zap, Database, Code, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

// Memoized floating icons data
const useFloatingIcons = () => {
  return useMemo(
    () => [
      {
        icon: Palette,
        className:
          "absolute max-md:hidden top-16 left-4 sm:top-20 sm:left-8 lg:top-20 lg:left-20 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-white/20 animate-fade-in-up",
        iconClassName: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600",
      },
      {
        icon: Zap,
        className:
          "absolute max-md:hidden top-24 right-4 sm:top-32 sm:right-12 lg:top-32 lg:right-24 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center animate-fade-in-up",
        iconClassName: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white",
      },
      {
        icon: Database,
        className:
          "absolute max-md:hidden top-48 left-2 sm:top-60 sm:left-8 lg:top-60 lg:left-16 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center border border-white/20 animate-fade-in-up",
        iconClassName: "w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600",
      },
      {
        icon: Code,
        className:
          "absolute max-md:hidden bottom-32 left-6 sm:bottom-40 sm:left-16 lg:bottom-40 lg:left-32 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center animate-fade-in-up",
        iconClassName: "w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white",
      },
      {
        icon: Sparkles,
        className:
          "absolute max-md:hidden bottom-48 right-4 sm:bottom-60 sm:right-10 lg:bottom-60 lg:right-20 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-white/20 animate-fade-in-up",
        iconClassName: "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-500",
      },
      {
        icon: Globe,
        className:
          "absolute max-md:hidden top-64 right-2 sm:top-80 sm:right-8 lg:top-80 lg:right-16 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-md flex items-center justify-center animate-fade-in-up",
        iconClassName: "w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white",
      },
    ],
    []
  );
};

// Memoized animation styles to prevent re-creation


export default function HeroSection() {
  const floatingIcons = useFloatingIcons();
  // Memoized floating icon elements to prevent re-creation
  const floatingIconElements = useMemo(() => (
    <div className="max-md:hidden">
      {floatingIcons.map((iconData, index) => {
        const IconComponent = iconData.icon;
        return (
          <div
            key={index}
            className={iconData.className}
          >
            <IconComponent className={iconData.iconClassName} />
          </div>
        );
      })}
    </div>
  ), [floatingIcons]);

  // Memoized background elements
  const backgroundElements = useMemo(
    () => (
      <>
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/20 via-transparent to-purple-50/30"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-linear-to-r from-purple-200/30 to-blue-200/40 rounded-full blur-3xl animate-fade-in-up" />
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-linear-to-r from-yellow-200/25 to-orange-200/30 rounded-full blur-3xl animate-fade-in-up" />
      </>
    ),
    []
  );

  // Memoized heading elements
  const headingElements = useMemo(
    () => (
      <h1 className=" text-5xl md:text-7xl leading-[120%] font-extrabold text-gray-900 mb-6 sm:mb-8  max-w-5xl animate-fade-in-up">
        Transform Your Business with Smart Web Design and AI Automation
      </h1>
    ),
    []
  );

  return (
    <div className="relative min-h-screen bg-linear-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden">
      {/* Enhanced Background Elements */}
      {backgroundElements}

      {/* Responsive Floating icons */}
      {floatingIconElements}

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
            <div className="absolute inset-0 bg-linear-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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

      {/* Enhanced Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 flex pointer-events-none animate-fade-in-up">
        <div className="h-32 sm:h-40 lg:h-48 w-1/3 bg-purple-500/30 blur-3xl rounded-full animate-float" />
        <div className="h-32 sm:h-40 lg:h-48 w-1/3 bg-yellow-400/25 blur-3xl rounded-full animate-float" />
        <div className="h-32 sm:h-40 lg:h-48 w-1/3 bg-blue-500/30 blur-3xl rounded-full animate-float" />
      </div>
    </div>
  );
}
