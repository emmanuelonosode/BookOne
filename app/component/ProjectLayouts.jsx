import React from "react";
import Tagline from "./tagline.jsx";
// Web Design Project Component
export const WebDesignProject = ({ project }) => (
  <div className="space-y-12">
    {/* Hero Section */}
    <div className="relative  rounded-2xl overflow-hidden">
      <img
        src={project.images[0]}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-8 left-8 text-white">
        {/* <span className="inline-block bg-purple-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          {project.category}
        </span> */}
        <Tagline tag={project.category} className="text-white bg-gray-600" />
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      </div>
    </div>

    {/* Overview & Challenge */}
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
        <p className="text-gray-600 leading-relaxed">{project.overview}</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Challenge</h2>
        <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
      </div>
    </div>

    {/* What We Did */}
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">What We Did</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {project.whatWeDid.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <p className="text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Results */}
    <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-8 rounded-2xl text-white">
      <h2 className="text-2xl font-bold mb-6">Results</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {project.results.map((result, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-white/90">{result}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Tech Stack */}
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack</h2>
      <div className="flex flex-wrap gap-3">
        {project.techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-semibold"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="text-center">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        View Live Project
      </a>
    </div>
  </div>
);

// SEO & Marketing Project Component
export const SEOMarketingProject = ({ project }) => (
  <div className="space-y-12">
    {/* Hero Section */}
    <div className="relative  rounded-2xl overflow-hidden">
      <img
        src={project.images[0]}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-8 left-8 text-white">
        <span className="inline-block bg-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          {project.category}
        </span>
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      </div>
    </div>

    {/* Overview & Challenge */}
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Campaign Overview
        </h2>
        <p className="text-gray-600 leading-relaxed">{project.overview}</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">The Challenge</h2>
        <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
      </div>
    </div>

    {/* Strategy & Implementation */}
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Our Strategy & Implementation
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {project.whatWeDid.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <p className="text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Results with Metrics */}
    <div className="bg-gradient-to-r from-green-600 to-green-800 p-8 rounded-2xl text-white">
      <h2 className="text-2xl font-bold mb-6">Measurable Results</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {project.results.map((result, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-white/90">{result}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Tools Used */}
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Tools & Platforms Used
      </h2>
      <div className="flex flex-wrap gap-3">
        {project.techStack.map((tool, index) => (
          <span
            key={index}
            className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="text-center">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        View Live Project
      </a>
    </div>
  </div>
);

// AI Automation Project Component
export const AIAutomationProject = ({ project }) => (
  <div className="space-y-12">
    {/* Hero Section */}
    <div className="relative  rounded-2xl overflow-hidden">
      <img
        src={project.images[0]}
        alt={project.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      <div className="absolute bottom-8 left-8 text-white">
        <span className="inline-block bg-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
          {project.category}
        </span>
        <h1 className="text-4xl font-bold mb-2">{project.title}</h1>
      </div>
    </div>

    {/* Overview & Challenge */}
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Automation Overview
        </h2>
        <p className="text-gray-600 leading-relaxed">{project.overview}</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Business Challenge
        </h2>
        <p className="text-gray-600 leading-relaxed">{project.challenge}</p>
      </div>
    </div>

    {/* Automation Pipeline */}
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Automation Pipeline
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {project.whatWeDid.map((step, index) => (
          <div key={index} className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {index + 1}
            </div>
            <p className="text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>

    {/* ROI Impact */}
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 rounded-2xl text-white">
      <h2 className="text-2xl font-bold mb-6">ROI Impact</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {project.results.map((result, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-white/90">{result}</p>
          </div>
        ))}
      </div>
    </div>

    {/* AI Stack */}
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        AI Stack & Technologies
      </h2>
      <div className="flex flex-wrap gap-3">
        {project.techStack.map((tech, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>

    {/* CTA */}
    <div className="text-center">
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        View Live Project
      </a>
    </div>
  </div>
);

// Testimonial Component
export const Testimonial = ({ testimonial }) => (
  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200">
    <div className="text-center">
      <svg
        className="w-12 h-12 text-purple-600 mx-auto mb-4"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
      </svg>
      <blockquote className="text-xl text-gray-700 mb-6 italic">
        "{testimonial.quote}"
      </blockquote>
      <div>
        <p className="font-semibold text-gray-800">{testimonial.author}</p>
        <p className="text-gray-600">{testimonial.role}</p>
      </div>
    </div>
  </div>
);
