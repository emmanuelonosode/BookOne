import React, { Suspense } from "react";
import GetStartedClient from "./GetStartedClient";

export const metadata = {
  title: "Get Started | BookOne - Start Your Digital Transformation",
  description:
    "Ready to scale your business? Contact BookOne for expert web design, AI automation, and SEO services. Free proposal within 24 hours.",
  keywords: [
    "contact BookOne", "hire web designer", "get a website quote",
    "AI automation consultation", "SEO proposal", "start a web project",
    "web design inquiry", "digital agency contact",
  ],
  alternates: { canonical: "/get-started" },
  openGraph: {
    title: "Get Started | BookOne - Start Your Digital Transformation",
    description:
      "Ready to scale your business? Contact BookOne for expert web design, AI automation, and SEO. Free proposal within 24 hours.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/get-started`,
    siteName: "BookOne",
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Contact BookOne" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Get Started | BookOne",
    description: "Start your project with BookOne. Web design, AI automation, and SEO — free proposal in 24 hours.",
    images: ["/opengraph-image.png"],
  },
};

export default function GetStartedPage() {
  return (
    <Suspense fallback={null}>
      <GetStartedClient />
    </Suspense>
  );
}
