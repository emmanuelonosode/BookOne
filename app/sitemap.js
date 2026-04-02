import { sanity } from "@/lib/sanity";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

// ─── Static page last-modified dates ─────────────────────────────────────────
// Use real, pinned dates instead of new Date() (which changes every build and
// causes Google to distrust the sitemap data entirely).
const SITE_LAUNCH = new Date("2024-09-01");
const CONTENT_UPDATE = new Date("2025-06-01");

export default async function sitemap() {
  // Static pages — pinned dates so Google knows when content actually changed
  const staticRoutes = [
    { url: BASE_URL, lastModified: CONTENT_UPDATE, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/portfolio`, lastModified: CONTENT_UPDATE, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE_URL}/blogs`, lastModified: CONTENT_UPDATE, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/websites`, lastModified: CONTENT_UPDATE, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/authors`, lastModified: CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/get-started`, lastModified: CONTENT_UPDATE, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: SITE_LAUNCH, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/terms-and-conditions`, lastModified: SITE_LAUNCH, changeFrequency: "yearly", priority: 0.2 },
    { url: `${BASE_URL}/cookies-policy`, lastModified: SITE_LAUNCH, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Blog posts — use actual _updatedAt from Sanity for accurate lastModified
  let blogRoutes = [];
  try {
    const posts = await sanity.fetch(
      `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) { "slug": slug.current, _updatedAt, publishedAt }`,
      {},
      { next: { revalidate: 3600 } }
    );
    blogRoutes = posts.map((post) => ({
      url: `${BASE_URL}/blogs/${post.slug}`,
      lastModified: new Date(post._updatedAt || post.publishedAt || CONTENT_UPDATE),
      changeFrequency: "weekly",
      priority: 0.8, // bumped from 0.7 — blog is a key traffic driver
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
      lastModified: new Date(p._updatedAt || CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.8, // bumped — portfolio pages drive conversions
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
      lastModified: new Date(w._updatedAt || CONTENT_UPDATE),
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
      lastModified: new Date(a._updatedAt || CONTENT_UPDATE),
      changeFrequency: "monthly",
      priority: 0.5,
    }));
  } catch {}

  return [...staticRoutes, ...blogRoutes, ...portfolioRoutes, ...websiteRoutes, ...authorRoutes];
}
