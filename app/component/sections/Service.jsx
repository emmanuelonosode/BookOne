"use client"; // This directive is necessary for client-side components in Next.js App Router

import React from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import { offer } from "../../Commons/details"; // Assuming this path is correct for your project
import Image from "next/image"; // Keep Image for Next.js optimization if available
// import Link from "next/link"; // Re-add if you intend to use Next.js Link for internal navigation

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
    <section
      id="our-services" // Unique ID for the section
      className="py-28 bg-white overflow-hidden"
      aria-labelledby="services-heading" // Links section to its main heading
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-20 font-sans">
          <motion.h2 // Changed h3 to h2 for better semantic hierarchy (main section heading)
            id="services-heading" // ID for aria-labelledby
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-3xl md:text-4xl font-bold max-w-xl leading-tight text-gray-900"
          >
            Transform Your Business with Our Comprehensive Web Solutions and
            Automation Services
          </motion.h2>
          <motion.p // Changed h5 to p for semantic correctness (it's a paragraph, not a heading)
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-lg md:text-xl max-w-xl text-gray-700"
          >
            Our web development services create stunning, user-friendly websites
            tailored to your business needs. With cutting-edge AI automation, we
            streamline processes to enhance efficiency and productivity. Explore
            our range of web-based services designed to elevate your online
            presence.
          </motion.p>
        </div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-between"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Animate when 20% of the grid is in view, only once
        >
          {offer.map(({ tag, icon, desc }, index) => (
            <motion.div
              variants={itemVariants}
              className="w-full p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out hover:bg-[#d997f5] hover:scale-[1.02] flex flex-col items-start"
              key={index}
              role="article" // Semantic role for each service card
              aria-labelledby={`service-title-${index}`} // Link to the service title
              aria-describedby={`service-desc-${index}`} // Link to the service description
            >
              {/* If these cards are clickable links to detail pages, wrap the entire content in an <a> tag */}
              {/* Example if it were a link:
              <a href={`/services/${tag.toLowerCase().replace(/\s+/g, '-')}`} className="block w-full h-full">
              */}
              <Image
                src={icon}
                alt={`Icon for ${tag} service`} // More descriptive alt text
                height={48}
                width={48}
                className="mb-4"
              />
              <h3 // Changed h4 to h3 for semantic hierarchy (sub-heading within the section)
                id={`service-title-${index}`} // ID for aria-labelledby
                className="text-2xl font-semibold my-4 text-gray-800"
              >
                {tag}
              </h3>
              <p
                id={`service-desc-${index}`} // ID for aria-describedby
                className="text-gray-600 leading-relaxed"
              >
                {desc}
              </p>
              {/* Close </a> tag if it were a link */}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Service;
