// client.ts
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

  dataset: "production",
  useCdn: true,
  apiVersion: "2025-07-23", // use current date
});

