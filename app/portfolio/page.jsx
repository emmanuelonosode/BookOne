"use client";
import { sanity, urlFor } from "@/lib/sanity";
import { projects } from "@/lib/queries";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Btn from "@/app/component/Btn";

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
      staggerChildren: 0.15,
      delayChildren: 0.1,
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
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const overlayVariants = {
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

  return (
    <motion.div
      ref={cardRef}
      className="group relative w-full h-150 rounded-md shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover={{ scale: 1.01 }}
      role="article"
      aria-labelledby={`project-title-${project.slug?.current}`}
      aria-describedby={`project-description-${project.slug?.current}`}
    >
      <a
        href={`/portfolio/${project.slug?.current}`}
        className="block w-full h-full"
        aria-label={`View details for ${project.title}`}
        title={`Learn more about ${project.title}`}
      >
        <motion.div style={{ y: imageY }} className="absolute inset-0">
          {project.mainImage?.asset?.url && (
            <img
              src={project.mainImage.asset.url}
              alt={`Screenshot or visual for ${project.title} project`}
              className="object-cover w-full h-full"
            />
          )}
        </motion.div>
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-black/60 text-white"
          variants={overlayVariants}
          initial="hidden"
          whileHover="visible"
        >
          <motion.h3
            id={`project-title-${project._id}`}
            variants={contentItemVariants}
            className="text-2xl md:text-3xl font-semibold mb-2"
          >
            {project.title}
          </motion.h3>
          <motion.p
            id={`project-description-${project._id}`}
            variants={contentItemVariants}
            className="text-sm md:text-base leading-relaxed mb-4"
          >
            {project.overview}
          </motion.p>
          <motion.span
            variants={contentItemVariants}
            className="inline-block text-blue-300 font-medium text-sm md:text-base"
            aria-hidden="true"
          >
            View Project &rarr;
          </motion.span>
        </motion.div>
      </a>
    </motion.div>
  );
};

// --- PortfolioPage Component ---
export default function PortfolioPage() {
  const [allProjects, setAllProjects] = useState([]);

  useEffect(() => {
    sanity.fetch(projects).then(setAllProjects).catch(console.error);
  }, []);

  return (
    <section
      id="portfolio-section"
      className="min-h-screen bg-bgcolor py-22 px-4 sm:px-6 lg:px-8 font-inter text-gray-800 overflow-hidden"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <motion.h2
            id="portfolio-heading"
            variants={headerTextVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="h2 font-extrabold text-purple-800 mb-6 leading-tight inline-block"
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

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          role="group"
          aria-label="Other Projects"
        >
          {allProjects.map((port) => (
            <motion.div key={port._id} className="mb-8">
              <ProjectCard project={port} />
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <a
            href="/portfolio"
            aria-label="View all our portfolio projects"
            title="Explore our complete portfolio of work"
          >
            <Btn label="Explore All Projects → " />
          </a>
        </div>
      </div>
    </section>
  );
}
