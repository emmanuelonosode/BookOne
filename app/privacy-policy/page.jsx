import React from "react";
import PrivacyClient from "./PrivacyClient";

export const revalidate = 3600;

export const metadata = {
  title: "Privacy Policy | BookOne - Data Protection & Privacy",
  description:
    "Learn how BookOne protects your privacy and personal data. Our comprehensive privacy policy explains how we collect, use, and safeguard your information.",
  keywords: [
    "privacy policy",
    "data protection",
    "personal data",
    "BookOne privacy",
    "GDPR compliance",
    "data security",
    "privacy rights",
  ],
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyClient />;
}
