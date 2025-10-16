import {
  SanityImageAsset,
  SanityReference,
} from "@sanity/image-url/lib/types/types";

export interface SanityImage {
  _type: "image";
  asset: SanityReference<SanityImageAsset>;
  alt?: string;
  caption?: string;
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
  _updatedAt: string;
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
    asset?: SanityReference<SanityImageAsset>;
  }>;
  excerpt?: string;
  author?: Author;
  categories?: Category[];
}

export interface QueryOptions {
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: number;
  };
  fallback?: unknown;
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
