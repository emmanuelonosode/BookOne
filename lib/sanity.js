// utils/sanity.ts
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: "18zc3ehw", // <-- Changed this line
  dataset: "production", // <-- Changed this line
  apiVersion: "2023-01-01", // Use a date string (consider updating to a more recent one like "2024-07-25" for current features)
  useCdn: true, // `false` if you want fresh data
});

const builder = imageUrlBuilder(sanity);
export function urlFor(source) {
  return builder.image(source).url();
}
