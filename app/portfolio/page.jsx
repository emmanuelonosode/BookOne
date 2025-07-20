import React from "react";
import { projects, getCategories } from "../Commons/projectData";
import { PortfolioPageSchema } from "../component/StructuredData";

// Generate metadata for SEO
export const metadata = {
  title:
    "Portfolio - BookOne | Professional Web Design, SEO & AI Automation Projects",
  description:
    "Explore our portfolio of successful projects in web design, SEO & marketing, and AI automation. See how BookOne delivers exceptional results for businesses.",
  keywords: [
    "portfolio",
    "web design projects",
    "seo case studies",
    "ai automation projects",
    "bookone portfolio",
    "digital marketing projects",
    "website development",
    "business automation",
    "client projects",
    "case studies",
  ],
  authors: [{ name: "BookOne Team" }],
  creator: "BookOne",
  publisher: "BookOne",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.com"
  ),
  alternates: {
    canonical: "/portfolio",
  },
  openGraph: {
    title:
      "Portfolio - BookOne | Professional Web Design, SEO & AI Automation Projects",
    description:
      "Explore our portfolio of successful projects in web design, SEO & marketing, and AI automation. See how BookOne delivers exceptional results for businesses.",
    url: "/portfolio",
    siteName: "BookOne",
    images: [
      {
        url: "/api/og?title=Portfolio&category=All Projects",
        width: 1200,
        height: 630,
        alt: "BookOne Portfolio - Professional Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Portfolio - BookOne | Professional Web Design, SEO & AI Automation Projects",
    description:
      "Explore our portfolio of successful projects in web design, SEO & marketing, and AI automation.",
    images: ["/api/og?title=Portfolio&category=All Projects"],
    creator: "@bookone",
    site: "@bookone",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
};

// Reusable ProjectCard component
const ProjectCard = ({ title, description, imageUrl, category, slug }) => {
  return (
    <a
      href={`/portfolio/${slug}`}
      className="block group relative w-full h-100 rounded-3xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
    >
      {/* Background Image - Always covers the card */}
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-105"
        // onError={(e) => {
        //   e.target.onerror = null;
        //   e.target.src = `https://placehold.co/600x400/CCCCCC/000000?text=${encodeURIComponent(
        //     title.replace(/\s/g, "+")
        //   )}`;
        // }}
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
        <span className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition-all duration-300 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 focus:outline-none focus:ring-4 focus:ring-purple-300 delay-300">
          View Project
        </span>
      </div>
    </a>
  );
};

// Main PortfolioPage component for BookOne website
const PortfolioPage = () => {
  // Get unique categories for display purposes
  const categories = getCategories();

  return (
    <>
      <PortfolioPageSchema />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 md:py-28 px-4 sm:px-6 lg:px-8 font-inter text-gray-800">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-purple-800 mb-6 leading-tight rounded-lg p-2 inline-block ">
              Our Portfolio
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore a selection of our successful projects that showcase our
              expertise in delivering exceptional digital solutions. Each
              project reflects our commitment to innovation, quality, and client
              satisfaction.
            </p>
          </div>

          {/* Category Overview */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Our Services
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {categories
                .filter((cat) => cat !== "All")
                .map((category) => (
                  <div
                    key={category}
                    className="bg-white px-6 py-3 rounded-full shadow-md border border-gray-200"
                  >
                    <span className="text-gray-700 font-medium">
                      {category}
                    </span>
                  </div>
                ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.overview}
                imageUrl={project.images[0]}
                category={project.category}
                slug={project.slug}
              />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </a>
              <a
                href="/services"
                className="inline-block bg-white hover:bg-gray-50 text-purple-600 font-bold py-3 px-6 rounded-full border-2 border-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View Our Services
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
