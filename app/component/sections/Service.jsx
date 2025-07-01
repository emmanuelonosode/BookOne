"use client"; // This directive is necessary for client-side components in Next.js App Router

import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { offer } from "../../Commons/details"; // Assuming this path is correct for your project
import Image from "next/image";

function Service() {
  // Variants for the main container to control staggering of its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each child animation
        delayChildren: 0.1, // Delay before the first child starts animating
      },
    },
  };

  // Variants for individual service items to fade in and slide up slightly
  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring", // Use spring for a natural bounce effect
        damping: 12,
        stiffness: 100,
      },
    },
  };

  // Variants for the main headline and paragraph to fade in
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-28 bg-white overflow-hidden">
      {" "}
      {/* Added bg-white and overflow-hidden */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-20 font-sans">
          <motion.h3
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Animate when 50% in view, only once
            className="h3 text-3xl md:text-4xl font-bold max-w-xl leading-tight text-gray-900" // Added Tailwind classes
          >
            Transform Your Business with Our Comprehensive Web Solutions and
            Automation Services
          </motion.h3>
          <motion.h5
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} // Animate when 50% in view, only once
            className="h5 text-lg md:text-xl max-w-xl text-gray-700" // Added Tailwind classes
          >
            Our web development services create stunning, user-friendly websites
            tailored to your business needs. With cutting-edge AI automation, we
            streamline processes to enhance efficiency and productivity. Explore
            our range of web-based services designed to elevate your online
            presence.
          </motion.h5>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between" // Adjusted grid for better responsiveness
          variants={containerVariants}
          initial="hidden"
          whileInView="visible" // Animate when the grid enters the viewport
          viewport={{ once: false, amount: 0.5 }} // Trigger animation when 30% of the grid is visible, only once
        >
          {offer.map(({ tag, icon, desc }, index) => (
            <motion.div
              variants={itemVariants} // Apply item variants to each card
              className="w-full p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:bg-[#d997f5] hover:scale-[1.02] flex flex-col items-start" // Adjusted styling for better appearance
              key={index}
            >
              <Image
                src={icon}
                alt={tag}
                height={48}
                width={48}
                className="mb-4"
              />{" "}
              {/* Increased icon size, added margin */}
              <h4 className="text-2xl font-semibold my-4 text-gray-800">
                {tag}
              </h4>{" "}
              {/* Adjusted heading size and color */}
              <p className="text-gray-600 leading-relaxed">{desc}</p>{" "}
              {/* Adjusted paragraph color and line height */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Service;
