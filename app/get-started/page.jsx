import React from "react";
import { generateMetaTags } from "../seo-config";
import GetStartedClient from "./GetStartedClient";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

// Generate metadata for the get-started page
export const metadata = generateMetaTags({
  title: "Get Started - Free Strategy Session & Project Quote | BookOne",
  description:
    "Start your digital transformation journey with BookOne. Get a free strategy session, project quote, and personalized consultation for web design, SEO, and AI automation services.",
  url: "/get-started",
  keywords: [
    "free strategy session",
    "project quote",
    "web design consultation",
    "SEO consultation",
    "AI automation consultation",
    "digital transformation",
    "business consultation",
    "website project",
    "get started",
    "free consultation",
  ],
  authors: [{ name: "BookOne", url: "https://bookone.dev" }],
  creator: "BookOne",
  publisher: "BookOne",
  alternates: {
    canonical: "https://bookone.dev/get-started",
  },
  openGraph: {
    title: "Get Started - Free Strategy Session & Project Quote | BookOne",
    description:
      "Start your digital transformation journey with BookOne. Get a free strategy session, project quote, and personalized consultation for web design, SEO, and AI automation services.",
    url: "https://bookone.dev/get-started",
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Get Started - Free Strategy Session & Project Quote | BookOne",
      },
    ],
    locale: "en_US",
    type: "website",
    publisher: "BookOne",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started - Free Strategy Session & Project Quote | BookOne",
    description:
      "Start your digital transformation journey with BookOne. Get a free strategy session, project quote, and personalized consultation for web design, SEO, and AI automation services.",
    images: ["/opengraph-image.png"],
    site: "@EmmanuelOnosod1",
  },
});

export default function GetStartedPage() {
  return <GetStartedClient />;
}
