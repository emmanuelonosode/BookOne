import React from "react";
import PrivacyClient from "./PrivacyClient";

export const revalidate = 3600;

export const metadata = {
  title: "Privacy Policy | Bookone Studio - Data Protection & Privacy",
  description:
    "Learn how Bookone Studio protects your privacy and personal data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal data",
    "Bookone Studio privacy",
    "GDPR compliance",
    "data security",
    "privacy rights",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Bookone Studio - Data Protection & Privacy",
    description:
      "Learn how Bookone Studio protects your privacy and personal data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information.",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"}/privacy-policy`,
    siteName: "Bookone Studio",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Privacy Policy Bookone Studio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Bookone Studio",
    description: "Learn how Bookone Studio protects your privacy and personal data.",
    images: ["/opengraph-image.png"],
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
