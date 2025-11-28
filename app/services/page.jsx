import React from "react";
import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Our Services | BookOne - Web Design, SEO & AI Automation",
  description:
    "Explore BookOne's comprehensive digital services including custom web development, SEO optimization, and AI workflow automation for Nigerian businesses.",
  openGraph: {
    title: "Our Services | BookOne - Web Design, SEO & AI Automation",
    description:
      "Explore BookOne's comprehensive digital services including custom web development, SEO optimization, and AI workflow automation for Nigerian businesses.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/services`,
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "BookOne Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
