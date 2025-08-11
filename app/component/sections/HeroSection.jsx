"use client";
import React from "react";
import { motion as m } from "framer-motion";
import { Palette, Zap, Database, Code, Sparkles, Globe } from "lucide-react";
import Link from "next/link";

const floatingVariants = (delay = 0) => ({
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
      delay,
    },
  },
});

const pulseVariants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Floating icons */}
      <m.div
        className="hidden md:flex absolute top-20 left-20 w-16 h-16 bg-white rounded-2xl shadow-lg items-center justify-center"
        variants={floatingVariants(0)}
        animate="animate"
      >
        <Palette aria-hidden="true" className="w-8 h-8 text-purple-600" />
      </m.div>

      <m.div
        className="hidden md:flex absolute top-32 right-24 w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg items-center justify-center"
        variants={floatingVariants(1)}
        animate="animate"
      >
        <Zap aria-hidden="true" className="w-7 h-7 text-white" />
      </m.div>

      <m.div
        className="hidden md:flex absolute top-60 left-16 w-12 h-12 bg-white rounded-lg shadow-md items-center justify-center"
        variants={floatingVariants(2)}
        animate="animate"
      >
        <Database aria-hidden="true" className="w-6 h-6 text-green-600" />
      </m.div>

      <m.div
        className="hidden md:flex absolute bottom-40 left-32 w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg items-center justify-center"
        variants={floatingVariants(1.5)}
        animate="animate"
      >
        <Code aria-hidden="true" className="w-7 h-7 text-white" />
      </m.div>

      <m.div
        className="hidden md:flex absolute bottom-60 right-20 w-16 h-16 bg-white rounded-2xl shadow-lg items-center justify-center"
        variants={floatingVariants(0.5)}
        animate="animate"
      >
        <Sparkles aria-hidden="true" className="w-8 h-8 text-yellow-500" />
      </m.div>

      <m.div
        className="hidden md:flex absolute top-80 right-16 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg shadow-md items-center justify-center"
        variants={floatingVariants(2.5)}
        animate="animate"
      >
        <Globe aria-hidden="true" className="w-6 h-6 text-white" />
      </m.div>

      {/* Main Content */}
      <div className=" z-10 min-h-screen  flex flex-col justify-center  text-center">
        <m.h1
          className="text-5xl md:text-7xl font-mono px-1 font-extrabold text-gray-900 mb-8 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Turn Your
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            &nbsp;Website
          </span>
          &nbsp;Into a
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            &nbsp;Sales
          </span>
          &nbsp;Machine
        </m.h1>
<div className="w-screen ">

       <m.p
          className="text-lg md:text-xl w-full mx-auto  text-gray-600 mb-12 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          At BookOne, we blend stunning web design, advanced SEO, and powerful
          AI automation to help businesses attract more leads, close more sales,
          and operate smarter — all without adding more hours to your day.
        </m.p>
</div>

        <Link href="/get-started"
        className="w-full flex justify-center"
        >
          <m.button
            aria-label="Get a quote from BookOne"
            className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all duration-200 flex items-center gap-3"
            variants={pulseVariants}
            animate="animate"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            Get Quote
          </m.button>
        </Link>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 flex pointer-events-none">
        <div className="h-40 w-1/3 bg-purple-500/50 blur-3xl rounded-full" />
        <div className="h-40 w-1/3 bg-yellow-400/40 blur-3xl rounded-full" />
        <div className="h-40 w-1/3 bg-blue-500/40 blur-3xl rounded-full" />
      </div>
    </div>
  );
}
