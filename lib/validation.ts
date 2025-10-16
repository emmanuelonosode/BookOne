import { BlogPost, Author, Category, SanityImage } from "./types";

export function validateBlogPost(data: unknown): BlogPost {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid blog post data");
  }

  const post = data as BlogPost;

  if (!post._id || !post.title || !post.slug?.current) {
    throw new Error("Missing required blog post fields");
  }

  return {
    _id: post._id,
    _createdAt: post._createdAt,
    _updatedAt: post._updatedAt,
    title: post.title,
    slug: { current: post.slug.current },
    mainImage: validateImage(post.mainImage),
    body: post.body || [],
    excerpt: post.excerpt,
    author: validateAuthor(post.author),
    categories: post.categories?.map(validateCategory) || [],
  };
}

export function validateImage(image: unknown): SanityImage | undefined {
  if (!image || typeof image !== "object") {
    return undefined;
  }

  const img = image as SanityImage;
  if (!img.asset) {
    return undefined;
  }

  return {
    _type: "image",
    asset: img.asset,
    alt: img.alt,
    caption: img.caption,
  };
}

export function validateAuthor(author: unknown): Author | undefined {
  if (!author || typeof author !== "object") {
    return undefined;
  }

  const a = author as Author;
  if (!a._id || !a.name) {
    return undefined;
  }

  return {
    _id: a._id,
    name: a.name,
    bio: a.bio,
    image: validateImage(a.image),
  };
}

export function validateCategory(category: unknown): Category | undefined {
  if (!category || typeof category !== "object") {
    return undefined;
  }

  const c = category as Category;
  if (!c._id || !c.title) {
    return undefined;
  }

  return {
    _id: c._id,
    title: c.title,
    description: c.description,
  };
}
