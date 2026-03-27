import React from "react";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us | BookOne - Building the Future of Digital Business",
  description:
    "Learn about BookOne's mission to transform businesses through world-class web design, AI automation, and strategic SEO. Meet our expert team.",
  keywords: [
    "about BookOne", "web design agency", "AI automation team", "SEO experts",
    "digital agency Nigeria", "BookOne team", "web development company",
  ],
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | BookOne - Building the Future of Digital Business",
    description:
      "Learn about BookOne's mission to transform businesses through world-class web design, AI automation, and strategic SEO. Meet our expert team.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/about`,
    siteName: "BookOne",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "About BookOne Team" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | BookOne",
    description: "Learn about BookOne's mission to transform businesses through web design, AI automation, and SEO.",
    images: ["/opengraph-image.png"],
  },
};

export default function AboutPage() {
  return <AboutClient />;
}