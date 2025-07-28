export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

  return {
    rules: [
      // Allow all crawlers to access most content
      {
        userAgent: "*",
        allow: [
          "/",
          "/portfolio",
          "/services",
          "/about",
          "/privacy-policy",
          "/cookies-policy",
          "/terms-and-conditions",
          "/blogs",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/auth/",
          "/dashboard/",
          "/temp/",
          "/test/",
          "/dev/",
          "/staging/",
          "*.json",
          "*.xml",
          "*.txt",
          "/search?*",
          "/api/*",
        ],
        crawlDelay: 1,
      },

      // Specific rules for Googlebot
      {
        userAgent: "Googlebot",
        allow: [
          "/",
          "/portfolio",
          "/services",
          "/about",
          "/pricing",
          "/privacy-policy",
          "/cookies-policy",
          "/terms-and-conditions",
          "/blogs",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/auth/",
          "/dashboard/",
          "/temp/",
          "/test/",
          "/dev/",
          "/staging/",
          "*.json",
          "*.xml",
          "*.txt",
          "/search?*",
        ],
        crawlDelay: 1,
      },

      // Specific rules for Bingbot
      {
        userAgent: "Bingbot",
        allow: [
          "/",
          "/portfolio",
          "/services",
          "/about",
          "/pricing",
          "/privacy-policy",
          "/cookies-policy",
          "/terms-and-conditions",
          "/blogs",
        ],
        disallow: [
          "/_next/",
          "/private/",
          "/auth/",
          "/dashboard/",
          "/temp/",
          "/test/",
          "/dev/",
          "/staging/",
          "*.json",
          "*.xml",
          "*.txt",
          "/search?*",
        ],
        crawlDelay: 1,
      },

      // Specific rules for Slurp (Yahoo)
      {
        userAgent: "Slurp",
        allow: [
          "/",
          "/portfolio",
          "/services",
          "/about",
          "/pricing",
          "/privacy-policy",
          "/cookies-policy",
          "/terms-and-conditions",
          "/blogs",
        ],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/auth/",
          "/dashboard/",
          "/temp/",
          "/test/",
          "/dev/",
          "/staging/",
          "*.json",
          "*.xml",
          "*.txt",
          "/search?*",
        ],
        crawlDelay: 1,
      },

      // Block bad bots and scrapers
      {
        userAgent: [
          "AhrefsBot",
          "MJ12bot",
          "DotBot",
          "SemrushBot",
          "rogerbot",
          "Exabot",
          "Gigabot",
          "ia_archiver",
          "archive.org_bot",
          "Baiduspider",
          "YandexBot",
          "DuckDuckBot",
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
          "WhatsApp",
          "TelegramBot",
          "Discordbot",
          "Slackbot",
          "SkypeUriPreview",
          "WhatsApp",
          "TelegramBot",
          "Discordbot",
          "Slackbot",
          "SkypeUriPreview",
        ],
        disallow: "/",
      },

      // Allow social media bots to access Open Graph images
      {
        userAgent: [
          "facebookexternalhit",
          "Twitterbot",
          "LinkedInBot",
          "WhatsApp",
          "TelegramBot",
          "Discordbot",
          "Slackbot",
          "SkypeUriPreview",
        ],
        allow: ["/api/og", "/portfolio", "/services", "/about"],
        disallow: [
          "/api/",
          "/admin/",
          "/_next/",
          "/private/",
          "/auth/",
          "/dashboard/",
        ],
      },
    ],

    // Sitemap location
    sitemap: `${baseUrl}/sitemap.xml`,

    // Host directive
    host: baseUrl,

    // Additional metadata
    additional: {
      // Crawl delay for all bots
      crawlDelay: 1,

      // Visit time
      visitTime: {
        from: "00:00",
        to: "23:59",
      },

      // Request rate
      requestRate: {
        requests: 1,
        per: "1s",
      },

      // Concurrency
      concurrentRequests: 1,
    },
  };
}
