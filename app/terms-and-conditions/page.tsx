import React from "react";
import TermsClient from "./TermsClient";

export const metadata = {
  title: "Terms and Conditions | BookOne",
  description: "Terms and Conditions for BookOne services.",
};

export const revalidate = 3600;

export default function TermsPage() {
  return <TermsClient />;
}