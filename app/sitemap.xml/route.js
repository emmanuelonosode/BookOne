import { sanity } from "@/lib/sanity";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export async function GET() {
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/get-started`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/cookies-policy`,
      lastModified: new Date().toISOString(),
    },
    {
      url: `${baseUrl}/terms-and-conditions`,
      lastModified: new Date().toISOString(),
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
    }));
  } catch (error) {
console.log(error); 
  }

  try {
    const blogs = await sanity.fetch(`
      *[_type == "post" && publishedAt != null] {
        "slug": slug.current,
        publishedAt
      }
    `);
    blogPages = blogs.map((blog) => ({
      url: `${baseUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.publishedAt).toISOString(),
    }));
  } catch (error) {
    // Removed console.error for production cleanliness
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
    }));
  } catch (error) {
    // Removed console.error for production cleanliness
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
