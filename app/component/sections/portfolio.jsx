import { sanity, urlFor } from "@/lib/sanity";
import { projects } from "@/lib/queries";
import React from "react";
import ProjectCard from "../ProjectCard";

import Btn from "../Btn";

// --- Project Data ---
// --- Framer Motion Variants ---

// --- ProjectCard Component ---

// --- PortfolioPage Component ---
const allProjects = await sanity.fetch(projects);
export default async function PortfolioPage() {
  return (
    <section
      id="portfolio-section" // Unique ID for the section
      className="min-h-screen bg-bgcolor py-12 px-4 sm:px-6 lg:px-8 font-inter text-gray-800 overflow-hidden"
      aria-labelledby="portfolio-heading" // Links section to its main heading
    >
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h2 // Changed h1 to h2 for semantic hierarchy within the section
            id="portfolio-heading" // ID for aria-labelledby
            className="h2 font-extrabold text-purple-800 mb-6 leading-tight inline-block" // Removed text-shadow-zinc-900 as it's not a standard Tailwind class
          >
            Our Portfolio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our impactful work across various industries. Each
            project is a testament to our dedication to innovation and client
            success.
          </p>
        </div>

        {/* Other Projects (Grid Layout) */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8" // 2-column grid for other projects
          role="group" // Semantic role for the grid of projects
          aria-label="Other Projects" // Label for the group of projects
        >
          {allProjects.map((port) => (
            <div key={port._id} className="mb-8">
              <ProjectCard project={port} />
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          {/* Replaced Next.js Link with standard <a> tag */}
          <a
            href="/portfolio" // You might want this to be the same page or a more detailed one
            aria-label="View all our portfolio projects" // Descriptive label for screen readers
            title="Explore our complete portfolio of work" // Tooltip on hover
          >
            <Btn label="Explore All Projects → " />
          </a>
        </div>
      </div>
    </section>
  );
}
