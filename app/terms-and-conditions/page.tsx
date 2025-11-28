import React from "react";

export const metadata = {
  title: "Terms and Conditions | BookOne",
  description: "Terms and Conditions for BookOne services.",
};

export default function TermsAndConditions() {
  return (
    <main className="min-h-screen bg-white py-24 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto prose prose-slate lg:prose-lg">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">
          Terms and Conditions
        </h1>
        <p className="text-slate-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>
        <p>
          Welcome to BookOne. By accessing our website and using our services,
          you agree to comply with and be bound by the following terms and
          conditions.
        </p>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using our services, you agree to be bound by these
          Terms. If you disagree with any part of the terms, then you may not
          access the service.
        </p>
        <h2>2. Services</h2>
        <p>
          BookOne provides web design, SEO, and AI automation services. We
          reserve the right to modify or discontinue any service at any time.
        </p>
        <h2>3. Intellectual Property</h2>
        <p>
          The content, features, and functionality of our website and services
          are and will remain the exclusive property of BookOne and its
          licensors.
        </p>
        <h2>4. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at
          hello@bookone.dev.
        </p>
      </div>
    </main>
  );
}
