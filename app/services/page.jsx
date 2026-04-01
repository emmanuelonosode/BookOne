import React from "react";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Our Services | Bookone Studio - Web Design, SEO & AI Automation",
  description:
    "Explore Bookone Studio's digital services: custom web development, SEO optimization, AI workflow automation, e-commerce, and maintenance. Done-for-you builds.",
  keywords: [
    "web design services", "SEO optimization", "AI automation services",
    "e-commerce development", "website maintenance", "digital agency services",
    "done-for-you websites", "Bookone Studio services",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Our Services | Bookone Studio - Web Design, SEO & AI Automation",
    description:
      "Explore Bookone Studio's digital services: custom web development, SEO optimization, AI workflow automation, e-commerce, and maintenance.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/services`,
    siteName: "Bookone Studio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Bookone Studio Services" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Bookone Studio",
    description: "Web design, SEO, AI automation, e-commerce, and maintenance — done-for-you by Bookone Studio.",
    images: ["/opengraph-image.png"],
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export default function ServicesPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Services", item: `${BASE_URL}/services` },
    ],
  };

  const serviceList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bookone Studio Services",
    description: "Web design, SEO, and AI automation services for ambitious businesses",
    url: `${BASE_URL}/services`,
    numberOfItems: 4,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Web Design & Development", url: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 2, name: "SEO Optimization", url: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 3, name: "AI Automation", url: `${BASE_URL}/services` },
      { "@type": "ListItem", position: 4, name: "Websites for Sale", url: `${BASE_URL}/websites` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceList) }} />
      <ServicesClient />
    </>
  );
}
