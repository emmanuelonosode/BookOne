import { sanity } from "@/lib/sanity";
import { homepageProjectsQuery } from "@/lib/queries";
import ProjectCard from "../ProjectCard";
import Link from "next/link";
import { ArrowRight, Star, Users, Award } from "lucide-react";

export const revalidate = 3600; // Enable ISR for portfolio section

export default async function PortfolioSection() {
  const allProjects = await sanity.fetch(
    homepageProjectsQuery,
    {},
    { cache: "force-cache" }
  );

  return (
    <section
      id="portfolio-section"
      className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-16 px-4 sm:px-6 lg:px-8 text-gray-800"
      aria-labelledby="portfolio-heading"
    >
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 mr-2" />
            Our Work Speaks for Itself
          </div>

          <div className="flex justify-between">
            <h2
              id="portfolio-heading"
              className="text-4xl text-left sm:text-5xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Case{" "}
              <span className="block text-transparent  bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                Studies{" "}
              </span>
            </h2>

            <p className="text-lg text-right text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover how we've helped businesses across industries transform
              their digital presence, drive growth, and achieve remarkable
              results through innovative design and strategic thinking.
            </p>
          </div>
        </div>

        {/* Featured Project Highlight */}
        {allProjects.length > 0 && (
          <div className=" pb-8 sm:p-12">
         
            <ProjectCard project={allProjects[0]} featured={true} />
          </div>
        )}

        {/* Section Header for Other Projects */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            More Amazing Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20"
          role="group"
          aria-label="Portfolio Projects"
        >
          {allProjects.slice(1).map((project) => (
            <div key={project._id} className="mb-8">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full -translate-y-24 translate-x-24"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-6">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Let's discuss your project and explore how we can help transform
              your digital presence and achieve exceptional results together.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/get-started"
                aria-label="Start your project - View pricing and begin your project"
                className="inline-flex items-center gap-2 bg-white text-purple-600 py-4 px-8 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                href="/portfolio"
                aria-label="View complete portfolio - See all our projects"
                className="inline-flex items-center gap-2 border-2 border-white text-white py-4 px-8 rounded-full font-bold hover:bg-white hover:text-purple-600 transition-all duration-300"
              >
                <span>View Complete Portfolio</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
