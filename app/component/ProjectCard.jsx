"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.article
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.3 }}
      role="article"
      aria-labelledby={`project-title-${project.slug?.current}`}
    >
      <Link
        href={`/portfolio/${project.slug?.current}`}
        className="block h-full"
        aria-label={`View ${project.title} project details`}
      >
        {/* Image Section */}
        <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-50">
          {project.mainImage ? (
            <Image
              src={urlFor(project.mainImage).url()}
              alt={`${project.title} project preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-gray-400">
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          )}

          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />

          {/* View indicator */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
              <ArrowUpRight className="w-4 h-4 text-gray-700" />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8">
          {/* Title */}
          <h3
            id={`project-title-${project.slug?.current}`}
            className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300 line-clamp-2"
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3">
            {project.overview}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <span className="text-sm font-medium text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
              View Case Study
            </span>

            <ArrowUpRight className="w-4 h-4 text-gray-400 group-hover:text-purple-600 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Optional: Enhanced version for featured projects
export function FeaturedProjectCard({ project }) {
  return (
    <motion.article
      className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.2 }}
    >
      <Link
        href={`/portfolio/${project.slug?.current}`}
        className="block h-full"
      >
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Image */}
          <div className="relative h-64 lg:h-96 overflow-hidden">
            {project.mainImage ? (
              <Image
                src={urlFor(project.mainImage).url()}
                alt={`${project.title} project preview`}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200" />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-none" />
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center text-sm font-medium text-purple-600 mb-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
              Featured Project
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8">
              {project.overview}
            </p>

            <div className="flex items-center text-purple-600 font-semibold group-hover:text-purple-700 transition-colors duration-300">
              <span>Explore Project</span>
              <ArrowUpRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// Usage example component showing both cards
export function PortfolioGrid({ projects }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Featured Project */}
      {projects?.[0] && (
        <div className="mb-16">
          <FeaturedProjectCard project={projects[0]} />
        </div>
      )}

      {/* Regular Projects Grid */}
      {projects?.length > 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.slice(1).map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}
