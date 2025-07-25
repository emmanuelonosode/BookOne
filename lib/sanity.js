import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01", // Use a date string
  useCdn: true, // `false` if you want fresh data
});

const builder = imageUrlBuilder(sanity);
export function urlFor(source) {
  return builder.image(source).url();
}
