import React from "react";
import { notFound } from "next/navigation";
import { getProjectBySlug } from "../../Commons/projectData";
import {
  WebDesignProject,
  SEOMarketingProject,
  AIAutomationProject,
  Testimonial,
} from "../../component/ProjectLayouts";
import { PortfolioProjectSchema } from "../../component/StructuredData";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found - BookOne",
      description: "The requested project could not be found.",
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.com";
  const projectUrl = `${baseUrl}/portfolio/${project.slug}`;
  const ogImageUrl = `${baseUrl}/api/og?title=${encodeURIComponent(
    project.title
  )}&category=${encodeURIComponent(
    project.category
  )}&image=${encodeURIComponent(project.images[0])}`;

  return {
    title: `${project.title} - BookOne Portfolio`,
    description: project.overview,
    keywords: [
      project.category.toLowerCase(),
      "portfolio",
      "case study",
      "web design",
      "seo",
      "marketing",
      "ai automation",
      "bookone",
      ...project.techStack.map((tech) => tech.toLowerCase()),
    ],
    authors: [{ name: "BookOne Team" }],
    creator: "BookOne",
    publisher: "BookOne",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: projectUrl,
    },
    openGraph: {
      title: `${project.title} - BookOne Portfolio`,
      description: project.overview,
      url: projectUrl,
      siteName: "BookOne",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} - ${project.category} project by BookOne`,
        },
        {
          url: project.images[0],
          width: 800,
          height: 600,
          alt: project.title,
        },
      ],
      locale: "en_US",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} - BookOne Portfolio`,
      description: project.overview,
      images: [ogImageUrl],
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
}

// Generate static params for all projects
export async function generateStaticParams() {
  const { projects } = await import("../../Commons/projectData");

  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Main Project Page Component
const ProjectPage = ({ params }) => {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  // Render different layouts based on category
  const renderProjectContent = () => {
    switch (project.category) {
      case "Web Design":
        return <WebDesignProject project={project} />;
      case "SEO & Marketing":
        return <SEOMarketingProject project={project} />;
      case "AI Automation":
        return <AIAutomationProject project={project} />;
      default:
        return <WebDesignProject project={project} />;
    }
  };

  return (
    <>
      <PortfolioProjectSchema project={project} />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 md:py-28 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              <li>
                <a
                  href="/portfolio"
                  className="hover:text-purple-600 transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-800 font-medium" aria-current="page">
                {project.title}
              </li>
            </ol>
          </nav>

          {/* Project Content */}
          {renderProjectContent()}

          {/* Testimonial */}
          {project.testimonial && (
            <div className="mt-12">
              <Testimonial testimonial={project.testimonial} />
            </div>
          )}

          {/* Related Projects CTA */}
          <div className="mt-16 md:min-h-screen/2 flex md:flex-col place-content-center text-center">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">
              Ready to Start Your <span className="text-primary">Project?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how we can help you achieve similar results for your
              business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get a Similar Solution
              </a>
              <a
                href="/portfolio"
                className="inline-block bg-white hover:bg-gray-50 text-purple-600 font-bold py-3 px-6 rounded-full border-2 border-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                View More Projects
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
