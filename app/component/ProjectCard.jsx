"use client";
import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { urlFor } from "@/lib/sanity";

export default function ProjectCard({ project }) {
  // State for mobile tap interaction
  const [isTapped, setIsTapped] = useState(false);

  // Ref for the card to track its scroll position
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"], // When the card enters (0) and leaves (1) the viewport
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Variants for desktop hover overlay
  const desktopOverlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
        duration: 0.5,
      },
    },
  };

  // Variants for mobile overlay (always visible with subtle animation)
  const mobileOverlayVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.6,
        ease: "easeOut",
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

  // Enhanced content variants for mobile tap interaction
  const mobileContentVariants = {
    collapsed: { opacity: 0.9, y: 10 },
    expanded: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
      },
    },
  };

  // Handle mobile tap interaction
  const handleMobileTap = (e) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // Only on mobile
      e.preventDefault();
      setIsTapped(!isTapped);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative w-full h-screen sm:h-96 md:h-screen lg:h-screen rounded-lg md:rounded-xl shadow-lg md:shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-2"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{
        scale:
          typeof window !== "undefined" && window.innerWidth >= 768 ? 1.01 : 1,
      }} // Only scale on desktop
      role="article"
      aria-labelledby={`project-title-${project.slug?.current}`}
      aria-describedby={`project-description-${project.slug?.current}`}
    >
      <a
        href={`/portfolio/${project.slug?.current}`}
        className="block w-full h-full"
        aria-label={`View details for ${project.title}`}
        title={`Learn more about ${project.title}`}
        onClick={handleMobileTap}
      >
        {/* Background Image with Parallax */}
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          {project.mainImage && (
            <img
              src={urlFor(project.mainImage).url()}
              alt={`Screenshot or visual for ${project.title} project`}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          )}

          {/* Mobile gradient overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:hidden" />
        </motion.div>

        {/* Desktop Hover Overlay */}
        <motion.div
          className="hidden md:flex absolute inset-0 flex-col justify-end p-6 lg:p-8 bg-black/60 text-white"
          variants={desktopOverlayVariants}
          initial="hidden"
          whileHover="visible"
        >
          <motion.h3
            id={`project-title-${project.slug?.current}`}
            variants={contentItemVariants}
            className="text-2xl lg:text-3xl font-semibold mb-3"
          >
            {project.title}
          </motion.h3>
          <motion.p
            id={`project-description-${project.slug?.current}`}
            variants={contentItemVariants}
            className="text-base lg:text-lg leading-relaxed mb-4 line-clamp-3"
          >
            {project.overview}
          </motion.p>
          <motion.span
            variants={contentItemVariants}
            className="inline-block text-blue-300 font-medium text-base lg:text-lg"
            aria-hidden="true"
          >
            View Project &rarr;
          </motion.span>
        </motion.div>

        {/* Mobile Always-Visible Overlay */}
        <motion.div
          className="md:hidden absolute inset-0 flex flex-col justify-end p-4 sm:p-6 text-white"
          variants={mobileOverlayVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {/* Mobile tap hint (shows briefly, then fades) */}
          <motion.div
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2"
            initial={{ opacity: 1, scale: 1 }}
            animate={
              isTapped ? { opacity: 0, scale: 0.8 } : { opacity: 0.8, scale: 1 }
            }
            transition={{ delay: 3, duration: 0.5 }}
          >
            <svg
              className="w-4 h-4 text-white/80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>

          {/* Always visible title */}
          <motion.h3
            id={`project-title-${project.slug?.current}`}
            variants={contentItemVariants}
            className="text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg"
          >
            {project.title}
          </motion.h3>

          {/* Expandable content on mobile */}
          <motion.div
            variants={mobileContentVariants}
            animate={isTapped ? "expanded" : "collapsed"}
            className="space-y-2"
          >
            <motion.p
              id={`project-description-${project.slug?.current}`}
              variants={contentItemVariants}
              className={`text-sm sm:text-base leading-relaxed drop-shadow-md transition-all duration-300 ${
                isTapped ? "line-clamp-none" : "line-clamp-2"
              }`}
            >
              {project.overview}
            </motion.p>

            <motion.div
              variants={contentItemVariants}
              className="flex items-center justify-between pt-2"
            >
              <span className="text-blue-300 font-medium text-sm sm:text-base drop-shadow-md">
                {isTapped ? "Tap to view project" : "Tap to learn more"}
              </span>
              <motion.div
                animate={{ rotate: isTapped ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-blue-300"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile CTA button when expanded */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTapped ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: isTapped ? 0.1 : 0 }}
            className="mt-3"
          >
            <div className="inline-flex items-center px-4 py-2 bg-blue-600/80 backdrop-blur-sm rounded-full text-sm font-medium text-white shadow-lg">
              View Project
              <svg
                className="ml-2 w-4 h-4"
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
            </div>
          </motion.div>
        </motion.div>
      </a>
    </motion.div>
  );
}
