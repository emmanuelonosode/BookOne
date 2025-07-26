import { sanity, urlFor } from "@/lib/sanity";
import { projectsBySlug } from "../../../lib/queries";
import TestimonialCard from "../../component/testimonialCard";
import WebDesignDetails from "../../component/webDesignCard";
import SeoDetails from "../../component/seoDetails";
import AiAutomationDetails from "../../component/aiAutomation";
import Link from "next/link";

const categoryLabels = {
  web: "Web Design & Development",
  seo: "SEO & Website Optimization",
  ai: "AI Automation & Workflow",
};

export async function generateMetadata(props) {
  const params = await props.params;
  const project = await sanity.fetch(projectsBySlug, { slug: params.slug });
  if (!project) return {};

  const description = project.overview?.slice(0, 150) || project.title;
  const imageUrl =
    project.images && project.images[0] ? urlFor(project.images[0]) : undefined;

  return {
    title: project.title,
    description,
    openGraph: {
      title: project.title,
      description,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: project.title }]
        : [],
      type: "article",
      url: `http://localhost.com/portfolio/${params.slug}`,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title: project.title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

export default async function PortfolioDetailPage(props) {
  const params = await props.params;
  const project = await sanity.fetch(projectsBySlug, {
    slug: params.slug,
  });
  if (!project) return <div className="py-16 text-center">Not found</div>;

  return (
    <div className="bg-gray-900 min-h-screen text-gray-200">
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="py-12">
          <Link href="/portfolio">
            <p className="text-blue-400 hover:underline mb-8 block">
              ← Back to Portfolio
            </p>
          </Link>
          <span className="text-sm font-semibold text-purple-400 uppercase tracking-wider">
            {categoryLabels[project.category]}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mt-2 mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            For:{" "}
            <span className="font-semibold text-white">{project.client}</span>
          </p>

          {project.images && project.images[0] && (
            <img
              src={urlFor(project.images[0])}
              alt={project.title}
              className="mb-6 rounded-lg w-full max-h-96 object-cover"
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
  );
}
