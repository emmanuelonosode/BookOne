import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id", // Replace with your Sanity project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production", // Or your dataset name
  apiVersion: "2023-01-01", // Use a date string
  useCdn: true, // `false` if you want fresh data
});

const builder = imageUrlBuilder(sanity);
export function urlFor(source) {
  return builder.image(source).url();
}

export async function getAllProjects() {
  const query = `*[_type == "project"]{
    title,
    slug,
    client,
    category,
    overview,
    "heroImage": webDetails.heroImage
  }`;
  return sanity.fetch(query);
}

// Helper function to fetch a single project by its slug
export async function getProjectBySlug(slug) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    title,
    slug,
    client,
    category,
    overview,
    challenge,
    solution,
    testimonial,
    // Category-specific details
    webDetails,
    seoDetails,
    aiDetails
  }`;
  return sanity.fetch(query, { slug });
}
