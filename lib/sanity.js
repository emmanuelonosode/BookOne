import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01", // Use a date string
  useCdn: true, // `false` if you want fresh data
});

const builder = imageUrlBuilder(sanity);

// Function that returns the builder object for transformations
export function urlFor(source) {
  if (!source) return null;
  try {
    return builder.image(source);
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Function that returns the final URL string
export function urlForImage(source) {
  if (!source) return null;
  try {
    return builder.image(source).url();
  } catch {
    return null;
  }
}

// Fallback function for when images fail to load
export function getImageUrl(source, fallback = "/placeholder-image.jpg") {
  const url = urlForImage(source);
  return url || fallback;
}
