import Link from "next/link";
import LegalPageLayout from "../component/LegalPage";
// seo-config removed — inline metadata for cookies policy

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

export const metadata = {
  title: "Cookie Policy | BookOne - Cookie Usage & Management",
  description:
    "Understand how BookOne uses cookies to improve your experience. Learn about cookie types, management options, and your privacy choices.",
  url: "/cookies-policy",
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
    canonical: `${
      process.env.NEXT_PUBLIC_BASE_URL || "https://bookone.dev"
    }/cookies-policy`,
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Cookie Policy">
      <section className="min-h-screen bg-white text-gray-800 px-6 py-12 lg:px-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <h1 className="text-4xl font-bold mb-4 text-purple-700">
            Cookie Policy
          </h1>
          <p className="text-sm text-gray-500 mb-8">
            Last updated: August 14, 2025
          </p>

          {/* Intro */}
          <section className="mb-8">
            <p>
              BookOne (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) uses
              cookies and similar tracking technologies on our website{" "}
              <Link
                href="https://bookone.dev"
                className="text-purple-600 underline"
              >
                https://bookone.dev
              </Link>{" "}
              to improve your browsing experience, deliver personalized content,
              analyze site traffic, and provide targeted advertising.
            </p>
            <p className="mt-4">
              By using our website, you agree to the use of cookies in
              accordance with this Cookie Policy.
            </p>
          </section>

          {/* What Are Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small text files stored on your device when you visit
              a website. They help websites remember your preferences and
              improve functionality.
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <strong>Session cookies</strong> — deleted when you close your
                browser.
              </li>
              <li>
                <strong>Persistent cookies</strong> — remain until they expire
                or are deleted.
              </li>
            </ul>
          </section>

          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              2. Types of Cookies We Use
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">a. Essential Cookies</h3>
                <p>
                  Required for the website to function properly, such as session
                  management and security tokens.
                </p>
              </div>
              <div>
                <h3 className="font-medium">
                  b. Performance & Analytics Cookies
                </h3>
                <p>
                  Used with analytics tools (e.g., Google Analytics) to
                  understand visitor interaction and improve site performance.
                </p>
              </div>
              <div>
                <h3 className="font-medium">c. Functional Cookies</h3>
                <p>
                  Remember your preferences (e.g., language, theme) for a
                  personalized experience.
                </p>
              </div>
              <div>
                <h3 className="font-medium">
                  d. Advertising & Marketing Cookies
                </h3>
                <p>
                  Used for ad targeting through tools like Facebook Pixel or
                  Google Ads, based on browsing activity.
                </p>
              </div>
            </div>
          </section>

          {/* Third-Party Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              3. Third-Party Cookies
            </h2>
            <p>Some cookies come from third-party services we use, such as:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>Google Analytics (traffic analysis)</li>
              <li>Facebook Pixel (ad targeting)</li>
              <li>Sanity.io CDN (content delivery and caching)</li>
              <li>Cloudflare (security & performance optimization)</li>
            </ul>
          </section>

          {/* Control Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              4. How to Control Cookies
            </h2>
            <p>
              You can manage or delete cookies through your browser settings:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-1">
              <li>
                <a
                  href="https://support.google.com/chrome/answer/95647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a
                  href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <Link
                  href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline"
                >
                  Microsoft Edge
                </Link>
              </li>
              <li>
                <Link
                  href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 underline"
                >
                  Safari
                </Link>
              </li>
            </ul>
            <p className="mt-4">
              You can also opt-out of Google Analytics tracking here:{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-600 underline"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
            </p>
          </section>

          {/* Changes */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-3">
              5. Changes to This Policy
            </h2>
            <p>
              We may update this Cookie Policy from time to time to reflect
              technology changes, legal updates, or our business practices.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
            <p>
              If you have any questions about this Cookie Policy, contact us:
            </p>
            <ul className="list-none mt-3 space-y-1">
              <li>
                <strong>BookOne</strong>
              </li>
              <li>
                Email:{" "}
                <a
                  href="mailto:support@bookone.dev"
                  className="text-purple-600 underline"
                >
                  support@bookone.dev
                </a>
              </li>
              <li>
                Website:{" "}
                <Link
                  href="https://bookone.dev"
                  className="text-purple-600 underline"
                >
                  https://bookone.dev
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </section>
    </LegalPageLayout>
  );
}
