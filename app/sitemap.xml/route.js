import { sanity } from "@/lib/sanity";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export async function GET() {
  const staticPages = [
    {
      url: baseUrl,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/cookies-policy`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: "2025-10-29T00:00:00.000Z",
      changefreq: "daily",
      priority: 0.7,
    },
  ];

  let portfolioPages = [];
  let blogPages = [];
  let authorPages = [];
  try {
    const projects = await sanity.fetch(`
      *[_type == "project"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
    portfolioPages = projects.map((project) => ({
      url: `${baseUrl}/portfolio/${project.slug}`,
      lastModified: new Date(project._updatedAt).toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching portfolio pages:", error);
  }

  try {
    const blogs = await sanity.fetch(`
      *[_type == "post"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
    blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog._updatedAt).toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching blog pages:", error);
  }

  try {
    const authors = await sanity.fetch(`
      *[_type == "author"] {
        "slug": slug.current,
        _updatedAt
      }
    `);
    authorPages = authors.map((author) => ({
      url: `${baseUrl}/authors/${author.slug}`,
      lastModified: new Date(author._updatedAt).toISOString(),
      changefreq: "daily",
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching author pages:", error);
  }

  const allPages = [
    ...staticPages,
    ...portfolioPages,
    ...blogPages,
    ...authorPages,
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `<url>
  <loc>${page.url}</loc>
  <lastmod>${page.lastModified}</lastmod>
  <changefreq>${page.changefreq}</changefreq>
  <priority>${page.priority}</priority>
</url>`
  )
  .join("")}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
