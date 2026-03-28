export const OrganizationSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bookone Studio",
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
      email: "hello@bookone.dev",
    },
    sameAs: [
      "https://twitter.com/bookone",
      "https://linkedin.com/company/bookone",
      "https://facebook.com/bookone",
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 40.7128,
        longitude: -74.006,
      },
      geoRadius: "50000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Digital Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Design",
            description: "Professional website design and development services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "SEO & Marketing",
            description:
              "Search engine optimization and digital marketing services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Automation",
            description: "AI-powered business automation solutions",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const PortfolioProjectSchema = ({ project }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.overview,
    url: `https://bookone.dev/portfolio/${project.slug}`,
    author: {
      "@type": "Organization",
      name: "Bookone Studio",
    },
    creator: {
      "@type": "Organization",
      name: "Bookone Studio",
    },
    dateCreated: new Date().toISOString(),
    genre: project.category,
    keywords: [
      project.category.toLowerCase(),
      "portfolio",
      "case study",
      ...project.techStack.map((tech) => tech.toLowerCase()),
    ],
    image: project.images.map((img) => `https://bookone.dev${img}`),
    mainEntity: {
      "@type": "WebPage",
      name: project.title,
      description: project.overview,
      url: `https://bookone.dev/portfolio/${project.slug}`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://bookone.dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Portfolio",
            item: "https://bookone.dev/portfolio",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `https://bookone.dev/portfolio/${project.slug}`,
          },
        ],
      },
    },
    offers: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${project.category} Services`,
        description: `Professional ${project.category.toLowerCase()} services similar to this project`,
      },
      url: "https://bookone.dev/contact",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export const PortfolioPageSchema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Bookone Studio Portfolio",
    description:
      "Explore our portfolio of successful projects in web design, SEO & marketing, and AI automation",
    url: "https://bookone.dev/portfolio",
    mainEntity: {
      "@type": "ItemList",
      name: "Portfolio Projects",
      description: "Collection of professional projects by Bookone Studio",
      numberOfItems: 6,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "Harmony Health Website Redesign",
            url: "https://bookone.dev/portfolio/harmony-health-redesign",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "TechStartup SEO & Marketing Campaign",
            url: "https://bookone.dev/portfolio/techstartup-seo-campaign",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "Retail AI Customer Support Automation",
            url: "https://bookone.dev/portfolio/retail-ai-automation",
          },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
