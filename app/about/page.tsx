import React from "react";
import AboutClient from "./AboutClient";

export const metadata = {
  title: "About Us | BookOne - Building the Future of Digital Business",
  description:
    "Learn about BookOne's mission to transform Nigerian businesses through world-class web design, AI automation, and strategic SEO. Meet our expert team.",
  openGraph: {
    title: "About Us | BookOne - Building the Future of Digital Business",
    description:
      "Learn about BookOne's mission to transform Nigerian businesses through world-class web design, AI automation, and strategic SEO. Meet our expert team.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/about`,
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png", // Ensure this exists or use a default
        width: 1200,
        height: 630,
        alt: "About BookOne Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}