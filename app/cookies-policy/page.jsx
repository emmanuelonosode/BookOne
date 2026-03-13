import React from "react";
import CookiesClient from "./CookiesClient";

export const revalidate = 3600;

export const metadata = {
  title: "Cookie Policy | BookOne - Cookie Usage & Management",
  description:
    "Understand how BookOne uses cookies to improve your experience. Learn about cookie types, management options, and your privacy choices.",
  keywords: [
    "cookie policy",
    "cookies usage",
    "website cookies",
    "cookie management",
    "privacy cookies",
    "analytics cookies",
    "BookOne cookies",
  ],
  alternates: {
    canonical: "/cookies-policy",
  },
  openGraph: {
    title: "Cookie Policy | BookOne - Cookie Usage & Management",
    description:
      "Understand how BookOne uses cookies to improve your experience. Learn about cookie types, management options, and your privacy choices.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/cookies-policy`,
    siteName: "BookOne",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Cookie Policy BookOne",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | BookOne",
    description: "Understand how BookOne uses cookies to improve your experience.",
    images: ["/opengraph-image.png"],
  },
};

export default function CookiePolicyPage() {
  return <CookiesClient />;
}
