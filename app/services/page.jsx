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

export default function ServicesPage() {
  return <ServicesClient />;
}
