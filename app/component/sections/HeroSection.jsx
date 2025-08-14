"use client";
import React, { useState, useEffect } from "react";
import { motion as m } from "framer-motion";
import { Palette, Zap, Database, Code, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

const floatingVariants = (delay = 0) => ({
  animate: {
    y: [-8, 12, -8],
    rotate: [-3, 3, -3],
    transition: {
      duration: 6,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    },
  },
});

const pulseVariants = {
  animate: {
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const textRevealVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.8,
      duration: 0.6,
      ease: "easeOut",
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
  },
};

export default function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-transparent to-purple-50/30"></div>

      {/* Animated gradient orbs */}
      <m.div
        className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-gradient-to-r from-purple-200/30 to-blue-200/40 rounded-full blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />

      <m.div
        className="absolute bottom-1/4 right-1/4 w-40 h-40 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-to-r from-yellow-200/25 to-orange-200/30 rounded-full blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, 15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Responsive Floating icons */}
      {isMounted && (
        <>
          {/* Top Left - Palette */}
          <m.div
            className="absolute top-16 left-4 sm:top-20 sm:left-8 lg:top-20 lg:left-20 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-white/20"
            variants={floatingVariants(0)}
            animate="animate"
          >
            <Palette className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600" />
          </m.div>

          {/* Top Right - Zap */}
          <m.div
            className="absolute top-24 right-4 sm:top-32 sm:right-12 lg:top-32 lg:right-24 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg flex items-center justify-center"
            variants={floatingVariants(1)}
            animate="animate"
          >
            <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
          </m.div>

          {/* Middle Left - Database */}
          <m.div
            className="absolute top-48 left-2 sm:top-60 sm:left-8 lg:top-60 lg:left-16 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-white/90 backdrop-blur-sm rounded-lg shadow-md flex items-center justify-center border border-white/20"
            variants={floatingVariants(2)}
            animate="animate"
          >
            <Database className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
          </m.div>

          {/* Bottom Left - Code */}
          <m.div
            className="absolute bottom-32 left-6 sm:bottom-40 sm:left-16 lg:bottom-40 lg:left-32 w-11 h-11 sm:w-13 sm:h-13 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg flex items-center justify-center"
            variants={floatingVariants(1.5)}
            animate="animate"
          >
            <Code className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-white" />
          </m.div>

          {/* Bottom Right - Sparkles */}
          <m.div
            className="absolute bottom-48 right-4 sm:bottom-60 sm:right-10 lg:bottom-60 lg:right-20 w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg flex items-center justify-center border border-white/20"
            variants={floatingVariants(0.5)}
            animate="animate"
          >
            <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-500" />
          </m.div>

          {/* Middle Right - Globe */}
          <m.div
            className="absolute top-64 right-2 sm:top-80 sm:right-8 lg:top-80 lg:right-16 w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-md flex items-center justify-center"
            variants={floatingVariants(2.5)}
            animate="animate"
          >
            <Globe className="w-5 h-5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
          </m.div>
        </>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 py-22 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Main Heading with staggered animation */}
        <m.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-gray-900 mb-6 sm:mb-8 leading-[1.1] sm:leading-tight max-w-5xl"
          initial="hidden"
          animate="visible"
        >
          <m.span className="" custom={0} variants={textRevealVariants}>
          Turn Your
          </m.span>
          <m.span
            className=" mx-1 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600"
            custom={1}
            variants={textRevealVariants}
          >
            &nbsp;Website
          </m.span>
          <m.span className="mx-2" custom={2} variants={textRevealVariants}>
            &nbsp;Into a
          </m.span>
          <m.span
            className="text-transparent mx-1 bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600"
            custom={3}
            variants={textRevealVariants}
          >
            &nbsp;Sales Machine
          </m.span>
        </m.h1>

        {/* Description with fade in */}
        <m.p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-8 sm:mb-12 max-w-4xl leading-relaxed px-2 sm:px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        >
          At BookOne, we blend stunning web design, advanced SEO, and powerful
          AI automation to help businesses attract more leads, close more sales,
          and operate smarter, all without adding more hours to your day.
        </m.p>

        {/* CTA Button with enhanced animations */}
        <m.div
          initial="hidden"
          animate="visible"
          variants={buttonVariants}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Link href="/get-started" className="group">
            <m.button
              className="relative bg-gray-900 hover:bg-gray-800 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full text-base sm:text-lg lg:text-xl font-semibold shadow-lg transition-all duration-300 flex items-center gap-3 overflow-hidden"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Animated background gradient */}
              <m.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />

              <m.div
                className="relative w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <span className="relative z-10">Get Your Quote</span>

              {/* Arrow icon with slide animation */}
              <m.svg
                className="relative w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </m.svg>
            </m.button>
          </Link>

          {/* Secondary action */}
          <m.div
            className="text-sm sm:text-base text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Free consultation • No commitment
          </m.div>
        </m.div>

        {/* Trust indicators */}
        <m.div
          className="flex items-center justify-center mt-8 sm:mt-12 space-x-6 sm:space-x-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <div className="flex items-center space-x-1 text-yellow-500">
            {[...Array(5)].map((_, i) => (
              <m.svg
                key={i}
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.6 + i * 0.1, duration: 0.3 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </m.svg>
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            Trusted by 100+ businesses
          </span>
        </m.div>
      </div>

      {/* Enhanced Bottom Gradient */}
      <m.div
        className="absolute bottom-0 left-0 right-0 flex pointer-events-none"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <m.div
          className="h-32 sm:h-40 lg:h-48 w-1/3 bg-purple-500/30 blur-3xl rounded-full"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <m.div
          className="h-32 sm:h-40 lg:h-48 w-1/3 bg-yellow-400/25 blur-3xl rounded-full"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <m.div
          className="h-32 sm:h-40 lg:h-48 w-1/3 bg-blue-500/30 blur-3xl rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </m.div>
    </div>
  );
}
