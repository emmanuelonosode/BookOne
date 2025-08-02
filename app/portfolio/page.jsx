import { sanity, urlFor } from "@/lib/sanity";
import { projects } from "@/lib/queries";
import Script from "next/script";
import { ArrowUpRight, Users, Award, Star } from "lucide-react";
import ProjectCard from "../component/ProjectCard";
// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

// --- PortfolioPage Component ---
export default async function PortfolioPage() {
  const allProjects = await sanity.fetch(projects);

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
      itemListElement: allProjects.map((project, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: project.title,
          description: project.overview,
          url: `${baseUrl}/portfolio/${project.slug?.current}`,
          image: project.mainImage
            ? urlFor(project.mainImage).url()
            : undefined,
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

  // Sample stats - replace with real data
  const stats = [
    { icon: Users, label: "Happy Clients", value: "50+" },
    { icon: Award, label: "Projects Delivered", value: "100+" },
    { icon: Star, label: "Client Satisfaction", value: "95%" },
  ];

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
        className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-22 px-4 sm:px-6 lg:px-8 text-gray-800"
        aria-labelledby="portfolio-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-20">
            {/* Badge */}
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2" />
              Award-Winning Work
            </div>

            {/* Main Heading */}
            <h1
              id="portfolio-heading"
              className="text-6xl sm:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Our
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                {" "}
                Portfolio
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
              Showcasing our impactful work across various industries. Each
              project is a testament to our dedication to innovation and client
              success.
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg mb-3">
                      <IconComponent className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Featured Project */}
          {allProjects.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Featured Project
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto rounded-full"></div>
              </div>
              <div className="max-w-7xl mx-auto">
                <ProjectCard project={allProjects[0]} featured={true} />
              </div>
            </div>
          )}

          {/* All Projects Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                All Projects
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explore our complete collection of successful projects across
                different industries and technologies.
              </p>
            </div>

            {/* Projects Grid */}
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              role="group"
              aria-label="Portfolio Projects"
            >
              {allProjects.map((project) => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-3xl shadow-xl p-12 text-center relative overflow-hidden border border-gray-100">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -translate-y-16 translate-x-16 opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-100 rounded-full translate-y-12 -translate-x-12 opacity-50"></div>

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss your vision and create something amazing together.
                Get in touch for a free consultation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="/get-started"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-8 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <span>Start Your Project</span>
                  <ArrowUpRight className="w-5 h-5" />
                </a>

                <a
                  href="/about"
                  className="inline-flex items-center gap-2 border-2 border-gray-300 text-gray-700 py-4 px-8 rounded-full font-semibold hover:border-purple-600 hover:text-purple-600 transition-all duration-300"
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
