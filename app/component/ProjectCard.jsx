"use client";
import React, { useRef } from "react";

import { motion, useScroll, useTransform } from "framer-motion";
export default function ProjectCard({ project }) {
  // Ref for the card to track its scroll position
  const cardRef = useRef(null);
  // Get scroll progress of the card within the viewport
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"], // When the card enters (0) and leaves (1) the viewport
  });

  // Transform scroll progress to a Y translation for the image
  // Moves image from -50px to +50px relative to its position
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Variants for the content overlay itself
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
        duration: 0.5, // Duration for the overlay fade-in
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each card's animation
        delayChildren: 0.1, // Delay before the first card starts animating
      },
    },
  };

  const contentItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 90,
      },
    },
  };

  return (
    <motion.div
      ref={cardRef} // Assign the ref to the card's outer motion.div
      className={`group relative w-full  h-150 rounded-md shadow-xl overflow-hidden cursor-pointer
              transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2`}
      variants={cardVariants} // For the card's entry animation
      initial="hidden"
      whileInView="visible"
      // viewport={{ once: true, amount: 0.4 }} // Trigger animation when 40% of the card is visible
      whileHover={{ scale: 1.01 }}
      role="article" // Semantic role for each project card
      aria-labelledby={`project-title-${project.slug?.current}`} // Links to the project title
      aria-describedby={`project-description-${project.slug?.current}`} // Links to the project description
    >
      {/* Replaced Next.js Link with standard <a> tag */}
      <a
        href={`/portfolio/${project.slug?.current}`}
        className="block w-full h-full "
        aria-label={`View details for ${project.title}`} // Descriptive label for screen readers
        title={`Learn more about ${project.title}`} // Tooltip on hover for all users
      >
        {/* Background Image - now a motion.div with parallax Y transform */}
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          {project.mainImage?.asset?.url && (
            <img
              src={project.mainImage.asset.url}
              alt={`Screenshot or visual for ${project.title} project`} // More descriptive alt text
              className="object-cover w-full h-full" // Ensure image covers the div
              loading="lazy"
            />
          )}
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-black/60 text-white"
          variants={overlayVariants} // Apply overlay variants
          initial="hidden" // Start hidden
          whileHover="visible" // Animate to visible on hover
        >
          <motion.h3 // Changed h4 to h3 for semantic hierarchy within the article
            id={`project-title-${project._id}`} // ID for aria-labelledby
            variants={contentItemVariants}
            className="text-2xl md:text-3xl font-semibold mb-2"
          >
            {project.title}
          </motion.h3>
          <motion.p
            id={`project-description-${project._id}`} // ID for aria-describedby
            variants={contentItemVariants}
            className="text-sm md:text-base leading-relaxed mb-4"
          >
            {project.overview}
          </motion.p>
          <motion.span
            variants={contentItemVariants}
            className="inline-block text-blue-300 font-medium text-sm md:text-base"
            aria-hidden="true" // Hide from screen readers as the parent <a> provides context
          >
            View Project &rarr;
          </motion.span>
        </motion.div>
      </a>{" "}
    </motion.div>
  );
}
