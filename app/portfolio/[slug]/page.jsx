import { sanity, getImageUrl } from "@/lib/sanity";
import { projectsBySlug } from "../../../lib/queries";
import TestimonialCard from "../../component/testimonialCard";
import WebDesignDetails from "../../component/webDesignCard";
import SeoDetails from "../../component/seoDetails";
import AiAutomationDetails from "../../component/aiAutomation";
import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ArrowLeft } from "lucide-react";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

const categoryLabels = {
  web: "Web Design & Development",
  seo: "SEO & Website Optimization",
  ai: "AI Automation & Workflow",
};

export async function generateMetadata(props) {
  const params = await props.params;
  const project = await sanity.fetch(projectsBySlug, { slug: params.slug });
  if (!project) return {};

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const description = project.overview?.slice(0, 160) || project.title;
  const imageUrl =
    project.mainImage  ? getImageUrl(project.mainImage) : getImageUrl(project.images[0]);
  const category = categoryLabels[project.category] || project.category;

  // Enhanced keywords based on project category and content
  const keywords = [
    project.title,
    project.client,
    category,
    "BookOne project",
    "web design",
    "SEO optimization",
    "AI automation",
    "website development",
    "digital marketing",
    "business automation",
    "Nigeria digital agency",
    "case study",
  ].filter(Boolean);

  // Generate structured data for the project
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: description,
    image: imageUrl,
    creator: {
      "@type": "Organization",
      name: "BookOne",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "BookOne",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    dateCreated: project._createdAt,
    dateModified: project._updatedAt || project._createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/portfolio/${params.slug}`,
    },
    genre: category,
    keywords: keywords.join(", "),
    about: {
      "@type": "Thing",
      name: project.client,
    },
    audience: {
      "@type": "Audience",
      audienceType: "Businesses and Organizations",
    },
  };

  return {
    title: `${project.title} | BookOne Portfolio`,
    description,
    keywords,
    authors: [{ name: "BookOne" }],
    creator: "BookOne",
    publisher: "BookOne",
    category,
    classification: "Portfolio Project",
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
      canonical: `${baseUrl}/portfolio/${params.slug}`,
    },
    openGraph: {
      title: project.title,
      description,
      type: "article",
      url: `${baseUrl}/portfolio/${params.slug}`,
      siteName: "BookOne",
      locale: "en_US",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: project.title,
              type: "image/jpeg",
            },
          ]
        : [
            {
              url: "/opengraph-image.png",
              width: 1200,
              height: 630,
              alt: "BookOne Portfolio Project",
            },
          ],
      article: {
        publishedTime: project._createdAt,
        modifiedTime: project._updatedAt || project._createdAt,
        authors: ["BookOne"],
        tags: [category, "web design", "SEO", "AI automation"].filter(Boolean),
        section: category,
      },
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: project.title,
      description,
      images: imageUrl ? [imageUrl] : ["/opengraph-image.png"],
      creator: "@EmmanuelOnosod1",
      site: "@EmmanuelOnosod1",
    },
    other: {
      "project:client": project.client,
      "project:category": category,
      "project:completion_date": project._createdAt,
      "project:technologies": project.category,
    },
  };
}

export default async function PortfolioDetailPage(props) {
  const params = await props.params;
  const project = await sanity.fetch(projectsBySlug, {
    slug: params.slug,
  });
  if (!project) return <div className="py-16 text-center">Not found</div>;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";
  const category = categoryLabels[project.category] || project.category;
  const imageUrl = project.mainImage
    ? getImageUrl(project.mainImage)
    : undefined;

  // Generate structured data for the project
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    image: imageUrl,
    creator: {
      "@type": "Organization",
      name: "BookOne",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "BookOne",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo.png`,
      },
    },
    dateCreated: project._createdAt,
    dateModified: project._updatedAt || project._createdAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${baseUrl}/portfolio/${params.slug}`,
    },
    genre: category,
    keywords: [
      project.title,
      project.client,
      category,
      "BookOne project",
      "web design",
      "SEO",
      "AI automation",
    ]
      .filter(Boolean)
      .join(", "),
    about: {
      "@type": "Thing",
      name: project.client,
    },
    audience: {
      "@type": "Audience",
      audienceType: "Businesses and Organizations",
    },
  };

  return (
    <>
      <Script
        id="project-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="bg-gray-900 min-h-screen text-gray-200">
        <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="py-12">
            <Link
              href="/portfolio"
              aria-label="Back to portfolio"
              className="text-blue-400 hover:underline mb-8  flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Portfolio
            </Link>
            <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
              {category}
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-2 mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              For:{" "}
              <span className="font-semibold text-white">{project.client}</span>
            </p>

            {project.images && project.images[0] && (
              <Image
                src={getImageUrl(project.images[0])}
                alt={project.title}
                width={1200}
                height={400}
                className="mb-6 rounded-lg w-full max-h-96 object-cover"
                priority={true}
                placeholder="blur"
                blurDataURL="/placeholder-image.jpg"
              />
            )}

            <div className="prose prose-lg prose-invert max-w-none space-y-6">
              <div>
                <h2 className="text-3xl font-bold border-b border-gray-700 pb-2 mb-4">
                  Overview
                </h2>
                <p>{project.overview}</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold border-b border-gray-700 pb-2 mb-4">
                  The Challenge
                </h2>
                <p>{project.challenge}</p>
              </div>

              <div>
                <h2 className="text-3xl font-bold border-b border-gray-700 pb-2 mb-4">
                  Our Solution
                </h2>
                <p>{project.solution}</p>
              </div>
            </div>

            <TestimonialCard testimonial={project.testimonial} />

            {/* Conditional Rendering for Category-Specific Details */}
            <div className="mt-16">
              {project.category === "web" && (
                <WebDesignDetails details={project.webDetails} />
              )}
              {project.category === "seo" && (
                <SeoDetails details={project.seoDetails} />
              )}
              {project.category === "ai" && (
                <AiAutomationDetails details={project.aiDetails} />
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
