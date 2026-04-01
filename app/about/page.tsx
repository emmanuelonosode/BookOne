import React from "react";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us | Bookone Studio - Building the Future of Digital Business",
  description:
    "Learn about Bookone Studio's mission to transform businesses through world-class web design, AI automation, and strategic SEO. Meet our expert team.",
  keywords: [
    "about Bookone Studio", "web design agency", "AI automation team", "SEO experts",
    "digital agency Nigeria", "Bookone Studio team", "web development company",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | Bookone Studio - Building the Future of Digital Business",
    description:
      "Learn about Bookone Studio's mission to transform businesses through world-class web design, AI automation, and strategic SEO. Meet our expert team.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/about`,
    siteName: "Bookone Studio",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "About Bookone Studio Team" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Bookone Studio",
    description: "Learn about Bookone Studio's mission to transform businesses through web design, AI automation, and SEO.",
    images: ["/opengraph-image.png"],
  },
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev";

export default function AboutPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "About", item: `${BASE_URL}/about` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <AboutClient />
    </>
  );
}