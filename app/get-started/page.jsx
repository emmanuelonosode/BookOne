import React from "react";
import GetStartedClient from "./GetStartedClient";

export const metadata = {
  title: "Contact Us | BookOne - Start Your Digital Transformation",
  description:
    "Ready to scale your business? Contact BookOne for expert web design, AI automation, and SEO services. Let's build something brilliant together.",
  openGraph: {
    title: "Contact Us | BookOne - Start Your Digital Transformation",
    description:
      "Ready to scale your business? Contact BookOne for expert web design, AI automation, and SEO services. Let's build something brilliant together.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/get-started`,
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Contact BookOne",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function GetStartedPage() {
  return <GetStartedClient />;
}
