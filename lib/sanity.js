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

/**
 * Get Open Graph image URL with standard 1200x630 dimensions
 * This is the recommended size for OG images (1.91:1 aspect ratio)
 */
export function getOGImageUrl(source, fallback = "/placeholder-image.jpg") {
  if (!source) return fallback;
  try {
    const imageBuilder = builder.image(source);
    // Use fill mode to crop/resize to exact dimensions
    // This ensures the image is exactly 1200x630
    const url = imageBuilder
      .width(1200)
      .height(630)
      .fit("fill")
      .format("jpg")
      .quality(85)
      .url();
    return url || fallback;
  } catch (error) {
    console.error("OG Image URL generation error:", error);
    return fallback;
  }
}
