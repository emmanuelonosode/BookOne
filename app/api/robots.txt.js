// pages/api/robots.txt.ts

const handler = (req, res) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  const robotsTxt = `
User-agent: *
Allow: /

Disallow: /_next/

Sitemap: ${baseUrl}/sitemap.xml
Host: ${baseUrl}
  `.trim();

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(robotsTxt);
};

export default handler;
