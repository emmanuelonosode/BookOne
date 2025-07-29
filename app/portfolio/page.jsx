import { sanity, urlFor } from "@/lib/sanity";
import { projects } from "@/lib/queries";
import React from "react";
import Image from "next/image";
import Script from "next/script";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

// --- ProjectCard Component ---
const ProjectCard = ({ project }) => {
  return (
    <div
      className="group relative w-full h-150 rounded-md shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
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
        <div className="absolute inset-0">
          {project.mainImage?.asset?.url && (
            <Image
              src={project.mainImage.asset.url}
              alt={`Screenshot or visual for ${project.title} project`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={false}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          )}
        </div>
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-black/60 text-white">
          <h3
            id={`project-title-${project._id}`}
            className="text-2xl md:text-3xl font-semibold mb-2"
          >
            {project.title}
          </h3>
          <p
            id={`project-description-${project._id}`}
            className="text-sm md:text-base leading-relaxed mb-4"
          >
            {project.overview}
          </p>
          <span
            className="inline-block text-blue-300 font-medium text-sm md:text-base"
            aria-hidden="true"
          >
            View Project &rarr;
          </span>
        </div>
      </a>
    </div>
  );
};

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
          image: project.mainImage?.asset?.url,
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
        className="min-h-screen bg-bgcolor py-22 px-4 sm:px-6 lg:px-8 font-inter text-gray-800 overflow-hidden"
        aria-labelledby="portfolio-heading"
      >
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <h2
              id="portfolio-heading"
              className="h2 font-extrabold text-purple-800 mb-6 leading-tight inline-block"
            >
              Our Portfolio
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Showcasing our impactful work across various industries. Each
              project is a testament to our dedication to innovation and client
              success.
            </p>
          </div>

          {/* Projects Grid */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            role="group"
            aria-label="Portfolio Projects"
          >
            {allProjects.map((port) => (
              <div key={port._id} className="mb-8">
                <ProjectCard project={port} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16"></div>
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
          url: `${baseUrl}/opengraph-image.png`,
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
      images: [`${baseUrl}/opengraph-image.png`],
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
