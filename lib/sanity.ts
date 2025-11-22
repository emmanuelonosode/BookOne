import {
  createClient,
  type ClientConfig,
  type ClientPerspective,
} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { BlogPost, QueryOptions, SanityImage } from "./types";
import { validateBlogPost } from "./validation";

// Validate configuration
const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET as string,
  apiVersion: "2023-01-01",
  useCdn: process.env.NODE_ENV === "production",
  stega: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "published" as ClientPerspective,
};

if (!config.projectId || !config.dataset) {
  throw new Error("Missing required Sanity configuration");
}

export const sanity = createClient(config);
const builder = imageUrlBuilder(sanity);

// Create a preview client for immediate/preview results (no CDN)
// Use this when you want the latest published/draft content (e.g. during previews or after publish)
const previewConfig: ClientConfig = {
  ...config,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "previewDrafts" as ClientPerspective,
};

export const sanityPreview = createClient(previewConfig);

/**
 * Wrapper that chooses either the CDN-backed client or the preview client.
 * - `preview: true` will use the preview client (fresh data, requires token)
 * - otherwise the regular `sanity` client is used
 */
export async function sanityFetch<T = unknown>(
  query: string,
  params: Record<string, unknown> = {},
  options: { preview?: boolean } = {}
): Promise<T> {
  const client = options.preview ? sanityPreview : sanity;
  return client.fetch<T>(query, params) as Promise<T>;
}

// Cache with proper typing
const QUERY_CACHE = new Map<string, unknown>();

// Helper for retry logic with proper typing
async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  let lastError: Error | undefined;

  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i < retries - 1) {
        await new Promise((resolve) =>
          setTimeout(resolve, delay * Math.pow(2, i))
        );
      }
    }
  }

  throw lastError;
}

// Type-safe fetch with validation
export async function fetchSanityData<T = unknown>(
  query: string,
  params: Record<string, unknown> = {},
  options: QueryOptions = {}
): Promise<T> {
  const cacheKey = JSON.stringify({ query, params });

  if (QUERY_CACHE.has(cacheKey) && options.cache !== "no-store") {
    return QUERY_CACHE.get(cacheKey) as T;
  }

  try {
    const data = await fetchWithRetry(async () => {
      const result = await sanity.fetch<T>(query, params);
      if (result === null || result === undefined) {
        throw new Error("No data returned from Sanity");
      }
      return result;
    });

    if (options.cache !== "no-store") {
      QUERY_CACHE.set(cacheKey, data);
    }

    return data;
  } catch (error) {
    console.error("Sanity fetch error:", {
      query,
      params,
      error: error instanceof Error ? error.message : "Unknown error",
    });

    if (options.cache !== "no-store" && QUERY_CACHE.has(cacheKey)) {
      return QUERY_CACHE.get(cacheKey) as T;
    }

    if (options.fallback !== undefined) {
      return options.fallback as T;
    }

    throw error;
  }
}

// Type-safe blog post fetch
export async function fetchBlogPost(
  slug: string,
  options: QueryOptions = {}
): Promise<BlogPost | null> {
  const data = await fetchSanityData(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug },
    options
  );

  try {
    return data ? validateBlogPost(data) : null;
  } catch (error) {
    console.error("Blog post validation error:", error);
    return null;
  }
}

// Type-safe image URL functions
export function urlFor(source: SanityImage | null | undefined) {
  if (!source) return null;
  try {
    return builder.image(source);
  } catch (error) {
    console.error("Image URL generation error:", error);
    return null;
  }
}

export function urlForImage(
  source: SanityImage | null | undefined
): string | null {
  if (!source) return null;
  try {
    return builder.image(source).url();
  } catch (error) {
    console.error("Image URL generation error:", error);
    return null;
  }
}

export function getImageUrl(
  source: SanityImage | null | undefined,
  fallback = "/placeholder-image.jpg"
): string {
  const url = urlForImage(source);
  return url || fallback;
}

/**
 * Get Open Graph image URL with standard 1200x630 dimensions
 * This is the recommended size for OG images (1.91:1 aspect ratio)
 */
export function getOGImageUrl(
  source: SanityImage | null | undefined,
  fallback = "/placeholder-image.jpg"
): string {
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
