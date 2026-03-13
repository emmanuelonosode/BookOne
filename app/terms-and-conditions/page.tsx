import React from "react";
import TermsClient from "./TermsClient";

export const metadata = {
  title: "Terms & Conditions | BookOne Services",
  description:
    "Review the Terms and Conditions for BookOne services. These terms govern your use of our website design, SEO, and AI automation solutions.",
  keywords: [
    "terms and conditions",
    "terms of service",
    "BookOne terms",
    "legal agreements",
    "service policies",
  ],
  alternates: {
    canonical: "/terms-and-conditions",
  },
  openGraph: {
    title: "Terms & Conditions | BookOne Services",
    description:
      "Review the Terms and Conditions for BookOne services. These terms govern your use of our website design, SEO, and AI automation solutions.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/terms-and-conditions`,
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Terms and Conditions BookOne",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions | BookOne Services",
    description: "Review the Terms and Conditions for BookOne services.",
    images: ["/opengraph-image.png"],
  },
};

export const revalidate = 3600;

export default function TermsPage() {
  return <TermsClient />;
}