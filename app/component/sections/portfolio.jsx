"use client";

import React, { useRef } from "react";
// import Image from 'next/image'; // Removed Next.js Image component
// import Link from 'next/link';   // Removed Next.js Link component
import { motion, useScroll, useTransform } from "framer-motion";

// --- Project Data ---
const allProjects = [
  {
    id: 1,
    title: "EcoHarvest Sustainable Farming Platform",
    description:
      "Developed a comprehensive web platform for sustainable farming, connecting local farmers with consumers and optimizing crop management through data analytics. Features include inventory tracking, order management, and community forums.",
    imageUrl: "/port-5.avif",
    category: "Web & AI Development",
    slug: "ecoharvest-platform",
    isFeatured: true, // This project will be full-width
  },
  {
    id: 2,
    title: "UrbanFlow Smart Traffic Management",
    description:
      "An AI-powered solution to optimize urban traffic flow, reducing congestion and travel times. Utilizes real-time sensor data and predictive algorithms for dynamic signal control.",
    imageUrl: "/port-4.avif",
    category: "Business AI Automation",
    slug: "urbanflow-traffic",
  },
  {
    id: 3,
    title: "Zenith Fitness Mobile App",
    description:
      "Designed and developed a cross-platform mobile application for personalized fitness coaching, featuring workout tracking, nutrition plans, and virtual trainer integration.",
    imageUrl: "/port-3.avif",
    category: "Mobile App Development",
    slug: "zenith-fitness-app",
  },
  {
    id: 4,
    title: "Spectra CRM Customization",
    description:
      "Tailored a CRM system for a growing tech startup, integrating sales, marketing, and customer support functionalities into a unified, efficient platform.",
    imageUrl: "/port-1.avif",
    category: "Custom Solutions",
    slug: "spectra-crm",
  },
  {
    id: 5,
    title: "Voyage Travels SEO & Content",
    description:
      "Implemented a comprehensive SEO strategy and content marketing plan for a travel agency, significantly increasing organic traffic and online bookings for various destinations.",
    imageUrl: "/port-2.avif",
    category: "SEO & Content Writing",
    slug: "voyage-seo",
  },
];

// --- Framer Motion Variants ---

const headerTextVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
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

// --- ProjectCard Component ---
const ProjectCard = ({ project }) => {
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

  return (
    <motion.div
      ref={cardRef} // Assign the ref to the card's outer motion.div
      className={`group relative w-full rounded-md shadow-xl overflow-hidden cursor-pointer
        transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
        ${
          project.isFeatured
            ? "aspect-video md:aspect-[16/7]"
            : "aspect-square md:aspect-[4/3]"
        }
      `}
      variants={cardVariants} // For the card's entry animation
      initial="hidden"
      whileInView="visible"
      // viewport={{ once: true, amount: 0.4 }} // Trigger animation when 40% of the card is visible
      whileHover={{ scale: 1.01 }}
      role="article" // Semantic role for each project card
      aria-labelledby={`project-title-${project.id}`} // Links to the project title
      aria-describedby={`project-description-${project.id}`} // Links to the project description
    >
      {/* Replaced Next.js Link with standard <a> tag */}
      <a
        href={`/portfolio/${project.slug}`}
        className="block w-full h-full absolute inset-0"
        aria-label={`View details for ${project.title}`} // Descriptive label for screen readers
        title={`Learn more about ${project.title}`} // Tooltip on hover for all users
      >
        {/* Background Image - now a motion.div with parallax Y transform */}
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          {/* Replaced Next.js Image with standard <img> tag */}
          <img
            src={project.imageUrl}
            alt={`Screenshot or visual for ${project.title} project`} // More descriptive alt text
            // fill and sizes props are specific to next/image, so they are removed
            className="object-cover w-full h-full" // Ensure image covers the div
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/700x400/C0FFEE/1A1A1A?text=${encodeURIComponent(
                project.title.replace(/\s/g, "+")
              )}`;
            }}
          />
        </motion.div>

        {/* Content Overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-black/60 text-white"
          variants={overlayVariants} // Apply overlay variants
          initial="hidden" // Start hidden
          whileHover="visible" // Animate to visible on hover
        >
          <motion.h3 // Changed h4 to h3 for semantic hierarchy within the article
            id={`project-title-${project.id}`} // ID for aria-labelledby
            variants={contentItemVariants}
            className="text-2xl md:text-3xl font-semibold mb-2"
          >
            {project.title}
          </motion.h3>
          <motion.p
            id={`project-description-${project.id}`} // ID for aria-describedby
            variants={contentItemVariants}
            className="text-sm md:text-base leading-relaxed mb-4"
          >
            {project.description}
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
      {/* Closing <a> tag */}
    </motion.div>
  );
};

// --- PortfolioPage Component ---
export default function PortfolioPage() {
  const featuredProject = allProjects.find((p) => p.isFeatured);
  const otherProjects = allProjects.filter((p) => !p.isFeatured);

  return (
    <section
      id="portfolio-section" // Unique ID for the section
      className="min-h-screen bg-bgcolor py-12 px-4 sm:px-6 lg:px-8 font-inter text-gray-800 overflow-hidden"
      aria-labelledby="portfolio-heading" // Links section to its main heading
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h2 // Changed h1 to h2 for semantic hierarchy within the section
            id="portfolio-heading" // ID for aria-labelledby
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="h2 font-extrabold text-purple-800 mb-6 leading-tight inline-block" // Removed text-shadow-zinc-900 as it's not a standard Tailwind class
          >
            Our Portfolio
          </motion.h2>
          <motion.p
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Showcasing our impactful work across various industries. Each
            project is a testament to our dedication to innovation and client
            success.
          </motion.p>
        </div>

        {/* Featured Project (Full Width) */}
        {featuredProject && (
          <div className="mb-12" role="group" aria-label="Featured Project">
            <ProjectCard project={featuredProject} />
          </div>
        )}

        {/* Other Projects (Grid Layout) */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8" // 2-column grid for other projects
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Trigger animation for the grid
          role="group" // Semantic role for the grid of projects
          aria-label="Other Projects" // Label for the group of projects
        >
          {otherProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>

        {/* Optional: View Full Portfolio Button */}
        <div className="text-center mt-16">
          {/* Replaced Next.js Link with standard <a> tag */}
          <a
            href="/portfolio" // You might want this to be the same page or a more detailed one
            className="inline-block bg-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-purple-700 transition-colors shadow-lg transform hover:scale-105"
            aria-label="View all our portfolio projects" // Descriptive label for screen readers
            title="Explore our complete portfolio of work" // Tooltip on hover
          >
            Explore All Projects →
          </a>
        </div>
      </div>
    </section>
  );
}
