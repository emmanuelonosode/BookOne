// Avoid importing internal Sanity runtime types from image-url package because
// their exports can vary between versions. Declare minimal compatible types
// here so the rest of the codebase can rely on a stable shape.
export interface SanityReference {
  _ref: string;
  _type?: "reference";
}

export interface SanityImage {
  _type: "image";
  asset: SanityReference;
  alt?: string;
  caption?: string;
}

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export interface Author {
  _id: string;
  name: string;
  bio?: {
    _type: string;
    children: Array<{
      _type: string;
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _type: string;
      href?: string;
    }>;
  }[];
  image?: SanityImage;
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface BlogPost {
  _id: string;
  _createdAt: string;
  _updatedAt?: string;
  publishedAt?: string;
  title: string;
  slug: {
    current: string;
  };
  mainImage?: SanityImage;
  body: Array<{
    _type: string;
    children: Array<{
      _type: string;
      text: string;
      marks?: string[];
    }>;
    markDefs?: Array<{
      _type: string;
      href?: string;
    }>;
    asset?: SanityReference;
  }>;
  excerpt?: string;
  author?: Author;
  categories?: Category[];
  seo?: SeoFields;
}

export interface QueryOptions {
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: number;
  };
  fallback?: unknown;
}

export interface WebsiteListing {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  title: string;
  slug: { current: string };
  type: "pre-built" | "done-for-you";
  price: number;
  availability: "in stock" | "out of stock";
  shortDescription?: string;
  loomVideoUrl?: string;
  liveUrl?: string;
  mainImage?: SanityImage;
  screenshots?: Array<{ asset?: { url?: string }; alt?: string; caption?: string }>;
  category?: string;
  techStack?: string[];
  whatsIncluded?: SanityBlock[];
  seo?: SeoFields;
}

// Types for Sanity block content
export interface SanityBlock {
  _type: string;
  children: Array<{
    _type: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{
    _type: string;
    href?: string;
  }>;
  asset?: {
    _ref: string;
    _type: "reference";
  };
}
