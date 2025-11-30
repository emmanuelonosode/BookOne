"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

const lastUpdated = "August 14, 2025";

export default function CookiesClient() {
  return (
    <main className="min-h-screen bg-[#FAFAFA] selection:bg-[#6b46c1] selection:text-white font-sans">
      {/* Header Section */}
      <section className="pt-32 pb-12 px-6 max-w-[1000px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-[#6b46c1] transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            Cookie Policy
          </h1>
          <p className="text-slate-500">Last updated: {lastUpdated}</p>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-24 max-w-[800px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-a:text-[#6b46c1] prose-a:no-underline hover:prose-a:underline"
        >
          <p className="lead">
            BookOne (&quot;we,&quot; &quot;our,&quot; &quot;us&quot;) uses
            cookies and similar tracking technologies on our website{" "}
            <Link href="https://bookone.dev" className="font-bold">
              https://bookone.dev
            </Link>{" "}
            to improve your browsing experience, deliver personalized content,
            analyze site traffic, and provide targeted advertising.
          </p>
          <p>
            By using our website, you agree to the use of cookies in accordance
            with this Cookie Policy.
          </p>

          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help websites remember your preferences and improve
            functionality.
          </p>
          <ul>
            <li>
              <strong>Session cookies</strong> — deleted when you close your
              browser.
            </li>
            <li>
              <strong>Persistent cookies</strong> — remain until they expire or
              are deleted.
            </li>
          </ul>

          <h2>2. Types of Cookies We Use</h2>
          
          <h3>a. Essential Cookies</h3>
          <p>
            Required for the website to function properly, such as session
            management and security tokens.
          </p>

          <h3>b. Performance & Analytics Cookies</h3>
          <p>
            Used with analytics tools (e.g., Google Analytics) to understand
            visitor interaction and improve site performance.
          </p>

          <h3>c. Functional Cookies</h3>
          <p>
            Remember your preferences (e.g., language, theme) for a personalized
            experience.
          </p>

          <h3>d. Advertising & Marketing Cookies</h3>
          <p>
            Used for ad targeting through tools like Facebook Pixel or Google
            Ads, based on browsing activity.
          </p>

          <h2>3. Third-Party Cookies</h2>
          <p>Some cookies come from third-party services we use, such as:</p>
          <ul>
            <li>Google Analytics (traffic analysis)</li>
            <li>Facebook Pixel (ad targeting)</li>
            <li>Sanity.io CDN (content delivery and caching)</li>
            <li>Cloudflare (security & performance optimization)</li>
          </ul>

          <h2>4. How to Control Cookies</h2>
          <p>
            You can manage or delete cookies through your browser settings:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/en-us/help/4027947/microsoft-edge-delete-cookies"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
          </ul>
          <p>
            You can also opt-out of Google Analytics tracking{" "}
            <a
              href="https://tools.google.com/dlpage/gaoptout"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>

          <h2>5. Changes to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect
            technology changes, legal updates, or our business practices.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Cookie Policy, contact us:
          </p>

          <div className="not-prose mt-8 flex flex-col gap-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#6b46c1] shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Email us at</p>
                <a href="mailto:support@bookone.dev" className="text-[#6b46c1] font-bold hover:underline">
                  support@bookone.dev
                </a>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#6b46c1] shadow-sm shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Call us at</p>
                <a href="tel:+2348077080903" className="text-[#6b46c1] font-bold hover:underline">
                  +234 807 708 0903
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
