import { sanity, getImageUrl } from "../../lib/sanity";
import { allProjectsQuery } from "../../lib/queries";
import Script from "next/script";
import { ArrowUpRight, Star } from "lucide-react";
import ProjectCard from "../component/ProjectCard";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

// --- PortfolioPage Component ---
export default async function PortfolioPage() {
  const project = await sanity.fetch(allProjectsQuery);

  // Generate structured data for the portfolio page
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BookOne Portfolio",
    description:
      "Showcasing our impactful work across various industries. Each project is a testament to our dedication to innovation and client success.",
    url: `${baseUrl}/portfolio`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: project.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.overview,
          url: `${baseUrl}/portfolio/${project.slug?.current}`,
          image: project.mainImage ? getImageUrl(project.mainImage) : undefined,
          creator: {
            "@type": "Organization",
            name: "BookOne",
          },
        },
      })),
    },
    publisher: {
      "@type": "Organization",
      name: "BookOne",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
  };

  return (
    <>
      <Script
        id="portfolio-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <section
        id="portfolio-section"
        className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-20 px-4 sm:px-6 lg:px-8 text-gray-800"
        aria-labelledby="portfolio-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 lg:mb-20">
            {/* Badge */}
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-2 sm:px-4 rounded-full text-sm font-medium mb-4 sm:mb-6">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Award-Winning Work
            </div>

            {/* Main Heading */}
            <h1
              id="portfolio-heading"
              className="text-5xl  md:text-8xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2"
            >
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {" "}
                Portfolio
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8 sm:mb-12 px-4">
              Showcasing our impactful work across various industries. Each
              project is a testament to our dedication to innovation and client
              success.
            </p>

            {/* Stats Row - Made Responsive */}
          </div>

          {/* Featured Project */}
          {project.length > 0 && (
            <div className="mb-12 lg:mb-16">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 px-4">
                  Featured Project
                </h2>
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
              </div>
              <div className="max-w-7xl mx-auto px-2 sm:px-0">
                <ProjectCard project={project[0]} featured={true} />
              </div>
            </div>
          )}

          {/* All Projects Section */}
          <div className="mb-12 lg:mb-16">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 px-4">
                All Projects
              </h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
                Explore our complete collection of successful projects across
                different industries and technologies.
              </p>
            </div>

            {/* Projects Grid - Enhanced Responsiveness */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
              role="group"
              aria-label="Portfolio Projects"
            >
              {project.slice(1).map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>

          {/* CTA Section - Enhanced Mobile Layout */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 lg:p-12 text-center relative overflow-hidden border border-gray-100 mx-2 sm:mx-0">
            {/* Background decoration - Adjusted for mobile */}
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-purple-100 rounded-full -translate-y-12 translate-x-12 sm:-translate-y-16 sm:translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-blue-100 rounded-full translate-y-8 -translate-x-8 sm:translate-y-12 sm:-translate-x-12 opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
                Ready to Start Your Project?
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-2">
                Let's discuss your vision and create something amazing together.
                Get in touch for a free consultation.
              </p>

              {/* CTA Buttons - Stack on mobile, side by side on larger screens */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <a
                  href="/get-started"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>

                <a
                  href="/about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 py-3 sm:py-4 px-6 sm:px-8 rounded-full font-semibold hover:border-purple-600 hover:text-purple-600 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Learn More About Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  return {
    title: "Portfolio | BookOne - Web Design, SEO & AI Automation Projects",
    description:
      "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation. See how we help businesses grow with innovative digital solutions.",
    keywords: [
      "portfolio",
      "web design projects",
      "SEO projects",
      "AI automation projects",
      "website development",
      "digital marketing",
      "business automation",
      "BookOne portfolio",
      "Nigeria digital agency",
      "client projects",
      "case studies",
    ],
    authors: [{ name: "BookOne" }],
    creator: "BookOne",
    publisher: "BookOne",
    classification: "Portfolio",
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
    alternates: {
      canonical: `${baseUrl}/portfolio`,
    },
    openGraph: {
      title: "Portfolio | BookOne - Web Design, SEO & AI Automation Projects",
      description:
        "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation. See how we help businesses grow with innovative digital solutions.",
      type: "website",
      url: `${baseUrl}/portfolio`,
      siteName: "BookOne",
      locale: "en_US",
      images: [
        {
          url: "/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: "BookOne Portfolio - Web Design, SEO & AI Automation Projects",
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Portfolio | BookOne - Web Design, SEO & AI Automation Projects",
      description:
        "Explore our portfolio of successful projects in web design, SEO optimization, and AI automation.",
      images: ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
    },
    other: {
      "portfolio:category": "Web Design, SEO, AI Automation",
      "portfolio:client_count": "30+",
      "portfolio:project_types": "Websites, SEO Campaigns, AI Workflows",
    },
  };
}
