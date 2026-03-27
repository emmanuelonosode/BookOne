import { sanity } from "@/lib/sanity";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export default async function sitemap() {
  // Static pages
  const staticRoutes = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/websites`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/authors`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/get-started`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies-policy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];

  // Blog posts
  let blogRoutes = [];
  try {
    const posts = await sanity.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current, _updatedAt, publishedAt }`,
      {},
      { next: { revalidate: 3600 } }
    );
    blogRoutes = posts.map((post) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || new Date()),
      changeFrequency: "weekly",
      priority: 0.7,
    }));
  } catch {}

  // Portfolio / case studies
  let portfolioRoutes = [];
  try {
    const projects = await sanity.fetch(
      `*[_type == "caseStudy" && defined(slug.current)] { "slug": slug.current, _updatedAt }`,
      {},
      { next: { revalidate: 3600 } }
    );
    portfolioRoutes = projects.map((p) => ({
      url: `${BASE_URL}/portfolio/${p.slug}`,
      lastModified: new Date(p._updatedAt || new Date()),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch {}

  // Website listings
  let websiteRoutes = [];
  try {
    const websites = await sanity.fetch(
      `*[_type == "websiteListing" && defined(slug.current)] { "slug": slug.current, _updatedAt }`,
      {},
      { next: { revalidate: 3600 } }
    );
    websiteRoutes = websites.map((w) => ({
      url: `${BASE_URL}/websites/${w.slug}`,
      lastModified: new Date(w._updatedAt || new Date()),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {}

  // Authors
  let authorRoutes = [];
  try {
    const authors = await sanity.fetch(
      `*[_type == "author" && defined(slug.current)] { "slug": slug.current, _updatedAt }`,
      {},
      { next: { revalidate: 3600 } }
    );
    authorRoutes = authors.map((a) => ({
      url: `${BASE_URL}/authors/${a.slug}`,
      lastModified: new Date(a._updatedAt || new Date()),
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {}

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes, ...websiteRoutes, ...authorRoutes];
}
