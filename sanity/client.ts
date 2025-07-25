// client.ts
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,

  dataset: process.env.SANITY_DATASET,
  useCdn: true,
  apiVersion: "2025-07-23", // use current date
});

