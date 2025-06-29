"use client"
import React, { useState } from "react";

// Reusable ProjectCard component
const ProjectCard = ({ title, description, imageUrl, category }) => {
  return (
    <div className="group relative w-full h-100 rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
      {/* Background Image - Always covers the card */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x400/CCCCCC/000000?text=${encodeURIComponent(
            title.replace(/\s/g, "+")
          )}`;
        }}
      />

      {/* Overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
          {title}
        </h3>
        <p className="text-sm text-gray-200 mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
          {category}
        </p>
        <p className="text-gray-300 leading-relaxed mb-4 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-200">
          {description}
        </p>
        <button className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-blue-300 delay-300">
          View Project
        </button>
      </div>
    </div>
  );
};

// Main PortfolioPage component for BookOne website
const PortfolioPage = () => {
  const [filter, setFilter] = useState("All");

  // Sample project data (replace with real data from an API if applicable)
  const projects = [
    {
      id: 1,
      title: "Harmony Health Website Redesign",
      description:
        "A complete overhaul of a healthcare provider's online presence, focusing on user experience, appointment scheduling, and responsive design.",
      imageUrl: "/hero.avif",
      category: "Web Design & Development",
    },
    {
      id: 2,
      title: "Automated Customer Support Chatbot",
      description:
        "Implemented an AI-driven chatbot for a retail client, reducing support ticket volume by 30% and improving customer satisfaction through instant responses.",
      imageUrl: "/busyman.webp",
      category: "Business AI Automation",
    },
    {
      id: 3,
      title: "E-commerce Performance Boost",
      description:
        "Optimized a large e-commerce platform, achieving a 40% improvement in page load speed and a significant increase in conversion rates across devices.",
      imageUrl: "https://placehold.co/600x400/FFE0B2/1A1A1A?text=Project+3",
      category: "Website Optimization",
    },
    {
      id: 4,
      title: "Local Business SEO Success",
      description:
        "Developed and executed an SEO strategy for a local restaurant, resulting in top rankings for key local keywords and a 50% increase in online reservations.",
      imageUrl: "https://placehold.co/600x400/B2EBF2/1A1A1A?text=Project+4",
      category: "SEO Services",
    },
    {
      id: 5,
      title: "Compelling Blog Series for Tech Startup",
      description:
        "Created a series of engaging and SEO-friendly blog posts for a B2B SaaS company, establishing them as thought leaders in their industry and driving organic traffic.",
      imageUrl: "https://placehold.co/600x400/C5CAE9/1A1A1A?text=Project+5",
      category: "Content Writing",
    },
    {
      id: 6,
      title: "Bespoke Inventory Management System",
      description:
        "Designed and developed a custom web application for a manufacturing client to streamline their inventory tracking, reporting, and supply chain management.",
      imageUrl: "https://placehold.co/600x400/FFCDD2/1A1A1A?text=Project+6",
      category: "Custom Solutions",
    },
  ];

  // Get unique categories for the filter
  const categories = [
    "All",
    ...new Set(projects.map((project) => project.category)),
  ];

  // Filter projects based on the selected filter
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-purple-800 mb-6 leading-tight rounded-lg p-2 inline-block ">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore a selection of our successful projects that showcase our
            expertise in delivering exceptional digital solutions. Each project
            reflects our commitment to innovation, quality, and client
            satisfaction.
          </p>
        </div>

        {/* Filter Section */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`py-2 px-5 rounded-full font-semibold text-lg transition-all duration-300
                ${
                  filter === cat
                    ? "bg-purple-600 text-white shadow-lg transform scale-105"
                    : "bg-white text-purple-700 border border-purple-300 hover:bg-purple-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                category={project.category}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 text-xl py-10">
              No projects found for the selected category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;
