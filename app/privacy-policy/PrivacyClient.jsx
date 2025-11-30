"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

const lastUpdated = "July 24, 2025";

export default function PrivacyClient() {
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
            Privacy Policy
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
            At <strong>BookOne</strong>, we respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and share your information when you use our website or services.
          </p>

          <h2>1. Information We Collect</h2>
          <p>We collect various types of information to provide and improve our services for you:</p>
          <ul>
            <li>
              <strong>Personal Information:</strong> Personally identifiable information, such as your name, email address, phone number, and billing information (e.g., when you request a quote, sign up for a newsletter, or make a payment).
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you access and use the website, including your IP address, browser type, browser version, the pages of our service that you visit, the time and date of your visit, and other diagnostic data.
            </li>
            <li>
              <strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to track the activity on our service and hold certain information, primarily for preferences, analytics, and personalization.
            </li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>
            BookOne uses the collected data for various purposes:
          </p>
          <ul>
            <li>To provide and maintain our services, including our AI automation and web development projects.</li>
            <li>To notify you about changes to our services.</li>
            <li>To provide customer support and respond to your inquiries.</li>
            <li>To gather analysis or valuable information so that we can improve our services.</li>
            <li>To send you updates, newsletters, and marketing materials (only with your explicit consent).</li>
            <li>To comply with legal obligations and protect against legal liability.</li>
          </ul>

          <h2>3. Sharing Your Information</h2>
          <p>
            <strong>We do not sell your personal data.</strong> We respect your trust and only share your information in the following circumstances:
          </p>
          <ul>
            <li><strong>Service Providers:</strong> We may share your information with third-party companies and individuals to facilitate our service (e.g., hosting providers, analytics tools, payment processors) who process data on our behalf.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
            <li><strong>Business Transfers:</strong> If BookOne is involved in a merger, acquisition, or asset sale, your Personal Data may be transferred.</li>
          </ul>

          <h2>4. Your Rights (NDPR Compliance)</h2>
          <p>
            In accordance with the <strong>Nigeria Data Protection Regulation (NDPR)</strong> and other applicable laws, you have the right to:
          </p>
          <ul>
            <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
            <li><strong>Rectification:</strong> Request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
            <li><strong>Deletion:</strong> Request that we erase your personal data, under certain conditions.</li>
            <li><strong>Withdraw Consent:</strong> You have the right to withdraw your consent to data processing at any time.</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the details below.
          </p>

          <h2>5. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>

          <h2>6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          
          <div className="not-prose mt-8 flex flex-col gap-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#6b46c1] shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Email us at</p>
                <a href="mailto:info@bookone.dev" className="text-[#6b46c1] font-bold hover:underline">
                  info@bookone.dev
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

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#6b46c1] shadow-sm shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Location</p>
                <p className="text-[#6b46c1] font-bold">
                  Lagos, Nigeria
                </p>
              </div>
            </div>
          </div>

        </motion.div>
      </section>
    </main>
  );
}
