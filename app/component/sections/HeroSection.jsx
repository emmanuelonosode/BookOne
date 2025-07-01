"use client"; // This directive is necessary for client-side components in Next.js App Router

import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import Image from "next/image";
// Assuming AnimatedButton is a component you have,
// if it's not already a motion component, we'll wrap it.
import {AnimatedButton} from "../Btn"; // Adjust path as needed

function HeroSection() {
  // Variants for the main container to control staggering of its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Delay between each child animation
        delayChildren: 0.2, // Delay before the first child starts animating
      },
    },
  };

  // Variants for individual items to fade in and slide up slightly
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
    <section id="home" className="py-29 bg-white">
      {" "}
      {/* Added a background color for clarity */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 text-center overflow-hidden" // Added overflow-hidden for animations
        variants={containerVariants}
        initial="hidden"
        animate="visible" // Animate on component mount
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          Unlock <span className="text-primary">Digital Profit</span> with
          BookOne
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-2xl mx-auto text-lg text-gray-700"
        >
          We transform your online presence into a highly profitable asset. From
          stunning websites to intelligent AI automation, we deliver the
          complete web advantage your business needs to thrive.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex justify-center items-center gap-4"
        >
          {/* Assuming AnimatedButton is a regular React component, wrap it with motion.div */}
          <AnimatedButton label=" Start Your Project" />
          <a
            href="#services"
            className="text-primary font-bold py-3 px-8 hover:underline"
          >
            Explore Services &rarr;
          </a>
        </motion.div>

        {/* Image with Fade-in and Scale animation */}
        <motion.div
          variants={imageVariants}
          className="mt-16 h-25 overflow-hidden" // Added margin-top to separate from buttons
        >
          <Image
            src="/noise.png" // Ensure this image path is correct and accessible
            alt="noise"
            width={1440}
            height={100}
            className="w-full h-full object-cover" // Ensure image covers the div
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeroSection;
