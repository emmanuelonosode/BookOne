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
  bio?: any[];
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
  body: any[];
  excerpt?: string;
  author?: Author;
  categories?: Category[];
}

export interface QueryOptions {
  cache?: "force-cache" | "no-store";
  next?: {
    revalidate?: number;
  };
  fallback?: any;
}
