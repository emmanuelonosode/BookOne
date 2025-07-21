"use client";

import React from "react";
import { motion } from "framer-motion";
// import Image from "next/image"; // Removed Next.js Image component
import Btn, { AnimatedButton } from "../Btn"; // Assuming Btn is a standard React component (not Next.js specific)
import Link from "next/link"; // Removed Next.js Link component

function HeroSection() {
  // Variants for the main container to control staggering of its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each child animation
        delayChildren: 0.1, // Delay before the first child starts animating
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Use spring for a natural bounce effect
        damping: 15,
        stiffness: 100,
      },
    },
  };

  // Variants for the image to fade in and scale up slightly
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="home"
      className="py-28 pt-38 bg-white "
      aria-labelledby="hero-heading"
    >
      {" "}
      {/* Added aria-labelledby for accessibility */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-hidden" // Added overflow-hidden for animations
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate on component mount
      >
        <motion.h1
          id="hero-heading" // Added id to link with aria-labelledby
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight"
        >
          Where Web <span className="text-primary">Design</span> Meets AI & SEO
          Excellence
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-2xl mx-auto pat text-gray-700"
        >
          We transform your online presence into a highly profitable asset. From
          stunning websites to intelligent AI automation, we deliver the
          complete web advantage your business needs to thrive.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 mb-2 md:flex justify-center items-center space-y-6 gap-4"
        >
          {/* Replaced Next.js Link with standard <a> tag and wrapped Btn for animation */}
          <Link
            href="#contact"
            aria-label="Start your project with BookOne by contacting us"
          >
            <Btn label=" Start Your Project" className="w-full max-md:mb-6" />
          </Link>
          <Link
            href="/services"
            aria-label="Explore our services" // Added aria-label for clarity
          >
            <Btn sec label="  Explore Services &rarr; " className="w-full" />
          </Link>
        </motion.div>

        {/* Image with Fade-in and Scale animation
        <motion.div
          variants={imageVariants}
          className="mt-16 h-25 overflow-hidden" // Added margin-top to separate from buttons
        >
          <img
            src="/noise.png" // Ensure this image path is correct and accessible
            alt="Abstract background texture with subtle noise pattern" // More descriptive alt text for SEO
            width={1440} // Explicit width for SEO and CLS prevention
            height={100} // Explicit height for SEO and CLS prevention
            className="w-full h-full object-cover" // Ensure image covers the div
          />
        </motion.div> */}
      </motion.div>
    </section>
  );
}

export default HeroSection;
