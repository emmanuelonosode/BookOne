// SEO Configuration for BookOne
export const seoConfig = {
  // Site Information
  site: {
    name: "BookOne",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev",
    description:
      "Professional web design, SEO & marketing, and AI automation services for businesses",
    logo: "/logo.png",
    favicon: "/favicon.ico",
  },

  // Social Media
  social: {
    twitter: {
      handle: "@bookone",
      site: "@bookone",
    },
    facebook: {
      appId: "your-facebook-app-id",
    },
    linkedin: {
      company: "bookone",
    },
  },

  // Analytics
  analytics: {
    googleAnalytics: {
      measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    },
    googleTagManager: {
      containerId: process.env.NEXT_PUBLIC_GTM_CONTAINER_ID,
    },
  },

  // Search Console Verification
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_SITE_VERIFICATION,
    yahoo: process.env.YAHOO_SITE_VERIFICATION,
    bing: process.env.BING_SITE_VERIFICATION,
  },

  // Default Metadata
  defaultMetadata: {
    title: "BookOne - Professional Web Design, SEO & AI Automation Services",
    description:
      "BookOne offers expert web design, development, and AI automation services to help businesses grow online, improve efficiency, and stand out.",
    keywords: [
      "web design",
      "web development",
      "seo",
      "digital marketing",
      "ai automation",
      "business optimization",
      "bookone",
      "website design",
      "search engine optimization",
      "content marketing",
      "social media marketing",
      "e-commerce development",
      "responsive design",
      "ux design",
      "ui design",
    ],
    authors: [{ name: "BookOne Team" }],
    creator: "BookOne",
    publisher: "BookOne",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  },

  // Open Graph Defaults
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "BookOne",
    images: [
      {
        url: "/api/og?title=BookOne&category=Professional Services",
        width: 1200,
        height: 630,
        alt: "BookOne - Professional Web Design, SEO & AI Automation Services",
      },
    ],
  },

  // Twitter Card Defaults
  twitter: {
    card: "summary_large_image",
    creator: "@bookone",
    site: "@bookone",
  },

  // Structured Data
  structuredData: {
    organization: {
      "@type": "Organization",
      name: "BookOne",
      url: "https://bookone.dev",
      logo: "https://bookone.dev/logo.png",
      description:
        "Professional web design, SEO & marketing, and AI automation services for businesses",
      foundingDate: "2023",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "info@bookone.dev",
      },
      sameAs: [
        "https://twitter.com/bookone",
        "https://linkedin.com/company/bookone",
        "https://facebook.com/bookone",
      ],
    },
  },

  // Performance Optimization
  performance: {
    // Image optimization settings
    images: {
      formats: ["image/webp", "image/avif"],
      sizes: {
        thumbnail: "150px",
        small: "300px",
        medium: "600px",
        large: "1200px",
      },
    },
    // Font optimization
    fonts: {
      preload: true,
      display: "swap",
    },
  },

  // Security Headers
  security: {
    headers: {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "origin-when-cross-origin",
      "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
    },
  },
};

// SEO Utility Functions
export const seoUtils = {
  // Generate canonical URL
  getCanonicalUrl: (path) => {
    const baseUrl = seoConfig.site.url;
    return `${baseUrl}${path}`;
  },

  // Generate Open Graph image URL
  getOgImageUrl: (title, category, image) => {
    const baseUrl = seoConfig.site.url;
    const params = new URLSearchParams({
      title: title || "BookOne",
      category: category || "Professional Services",
      image: image || "/hero.avif",
    });
    return `${baseUrl}/api/og?${params.toString()}`;
  },

  // Generate structured data for projects
  getProjectStructuredData: (project) => {
    const baseUrl = seoConfig.site.url;
    return {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: project.title,
      description: project.overview,
      url: `${baseUrl}/portfolio/${project.slug}`,
      author: {
        "@type": "Organization",
        name: "BookOne",
      },
      creator: {
        "@type": "Organization",
        name: "BookOne",
      },
      dateCreated: new Date().toISOString(),
      genre: project.category,
      keywords: [
        project.category.toLowerCase(),
        "portfolio",
        "case study",
        ...project.techStack.map((tech) => tech.toLowerCase()),
      ],
      image: project.images.map((img) => `${baseUrl}${img}`),
    };
  },

  // Generate breadcrumb structured data
  getBreadcrumbStructuredData: (items) => {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
  },

  // Generate FAQ structured data
  getFAQStructuredData: (faqs) => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };
  },
};

// Meta tags generator
export const generateMetaTags = (customMetadata = {}) => {
  const metadata = {
    ...seoConfig.defaultMetadata,
    ...customMetadata,
  };

  return {
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"
    ),
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords.join(", "),
    authors: metadata.authors,
    creator: metadata.creator,
    publisher: metadata.publisher,
    robots: metadata.robots,
    openGraph: {
      ...seoConfig.openGraph,
      title: metadata.title,
      description: metadata.description,
      url: customMetadata.url || seoConfig.site.url,
      images: customMetadata.images || seoConfig.openGraph.images,
    },
    twitter: {
      ...seoConfig.twitter,
      title: metadata.title,
      description: metadata.description,
      images: customMetadata.images || seoConfig.openGraph.images,
    },
    verification: seoConfig.verification,
  };
};
