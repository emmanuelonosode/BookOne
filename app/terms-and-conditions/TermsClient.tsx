"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function TermsClient() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

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
            Terms and Conditions
          </h1>
          <p className="text-slate-500">Last updated: {currentDate}</p>
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
            Welcome to <strong>BookOne</strong>. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website located at <strong>bookone.dev</strong> (&quot;Website&quot;) and your engagement with our services.
          </p>
          <p>
            By accessing our Website or engaging BookOne for services, you agree to comply with these Terms. If you do not agree with any part of these terms, you may not access our services.
          </p>

          <h2>1. Definitions</h2>
          <ul>
            <li><strong>&quot;Agency&quot;, &quot;We&quot;, &quot;Us&quot;, &quot;Our&quot;</strong> refers to BookOne, a digital agency based in Nigeria.</li>
            <li><strong>&quot;Client&quot;, &quot;You&quot;</strong> refers to the entity or individual engaging our services.</li>
            <li><strong>&quot;Services&quot;</strong> refers to Web Design, Development, SEO, AI Automation, Content Writing, and related digital solutions provided by BookOne.</li>
            <li><strong>&quot;Deliverables&quot;</strong> refers to the specific work product created for the Client, such as website code, design files, or automation scripts.</li>
          </ul>

          <h2>2. Scope of Services</h2>
          <p>
            BookOne provides professional digital services including, but not limited to:
          </p>
          <ul>
            <li><strong>Web Development:</strong> Custom websites, e-commerce stores, and web applications using technologies like React and Next.js.</li>
            <li><strong>SEO Optimization:</strong> Technical SEO, on-page optimization, site speed improvements, and content strategy.</li>
            <li><strong>AI Automation:</strong> Setup of AI agents, chatbots, and business workflow automation.</li>
            <li><strong>Content Strategy:</strong> Copywriting, blog content, and digital marketing materials.</li>
          </ul>
          <p>
            The specific scope, timeline, and fees for your project will be detailed in a separate Proposal or Service Agreement. In the event of a conflict between these Terms and a specific Service Agreement, the Service Agreement shall control.
          </p>

          <h2>3. Payments and Billing</h2>
          <p>
            Unless otherwise agreed in writing:
          </p>
          <ul>
            <li><strong>Deposits:</strong> A non-refundable deposit (typically 50-70%) is required before work commences.</li>
            <li><strong>Milestones:</strong> Remaining balances are due upon completion of specific milestones or final delivery, as outlined in your invoice.</li>
            <li><strong>Late Payments:</strong> We reserve the right to suspend services or withhold delivery of final assets if payments are not made within the agreed timeframe.</li>
            <li><strong>Currency:</strong> All payments shall be made in the currency specified in the invoice (typically NGN or USD).</li>
          </ul>

          <h2>4. Intellectual Property Rights</h2>
          <p>
            <strong>Client Ownership:</strong> Upon full payment of all fees, the Client is granted full ownership of the final Deliverables (e.g., the specific website design and content).
          </p>
          <p>
            <strong>Agency Rights:</strong> BookOne retains ownership of:
          </p>
          <ul>
            <li>Our background technology, frameworks, pre-existing code libraries, and tools used to create the Deliverables.</li>
            <li>Draft concepts and design variations not selected by the Client.</li>
          </ul>
          <p>
            You grant BookOne a non-exclusive license to display the project in our portfolio, website, and marketing materials for the purpose of demonstrating our work.
          </p>

          <h2>5. Client Responsibilities</h2>
          <p>
            To ensure the success of the project, you agree to:
          </p>
          <ul>
            <li>Provide necessary content (text, images, credentials) in a timely manner.</li>
            <li>Review work and provide feedback within the agreed timelines.</li>
            <li>Ensure you have the right to use any images, text, or data you provide to us.</li>
          </ul>
          <p>
            Delays caused by the Client may result in adjustments to project timelines and potential restart fees if the project goes dormant for more than 30 days.
          </p>

          <h2>6. Artificial Intelligence (AI) Services Disclaimer</h2>
          <p>
            For services involving AI Automation and AI Agents:
          </p>
          <ul>
            <li><strong>Third-Party Dependence:</strong> Our solutions often rely on third-party providers (e.g., OpenAI, Anthropic). We are not liable for service interruptions, API changes, or policy updates by these third parties.</li>
            <li><strong>Accuracy:</strong> While we strive for accuracy, AI models can occasionally produce incorrect or &quot;hallucinated&quot; information. You acknowledge that AI outputs should be monitored and verified.</li>
            <li><strong>Usage Costs:</strong> Unless stated otherwise, ongoing API usage costs (e.g., OpenAI token fees) are the responsibility of the Client.</li>
          </ul>

          <h2>7. SEO and Marketing Guarantees</h2>
          <p>
            While we employ industry best practices to improve your search engine rankings and traffic:
          </p>
          <ul>
            <li><strong>No Guarantees:</strong> We cannot guarantee specific rankings (e.g., &quot;Page 1 of Google&quot;) or specific traffic numbers, as search algorithms are proprietary and change frequently.</li>
            <li><strong>Third-Party Platforms:</strong> We are not responsible for changes made by third-party platforms (Google, Meta, etc.) that may affect your visibility.</li>
          </ul>

          <h2>8. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, BookOne shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
          </p>
          <p>
            Our total liability for any claim arising out of or relating to these Terms or our Services shall not exceed the total amount paid by you to BookOne for the specific Service giving rise to the claim during the six (6) months prior to the claim.
          </p>

          <h2>9. Termination</h2>
          <p>
            Either party may terminate a project with written notice. In the event of termination:
          </p>
          <ul>
            <li>The Client shall pay BookOne for all work completed and expenses incurred up to the date of termination.</li>
            <li>If the Client terminates without cause, any non-refundable deposit remains with BookOne.</li>
          </ul>

          <h2>10. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with the laws of the <strong>Federal Republic of Nigeria</strong>, without regard to its conflict of law provisions. Any disputes arising from these Terms shall be resolved in the courts of Lagos State, Nigeria.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us. We are here to help your business grow.
          </p>
          
          <div className="not-prose mt-8 flex flex-col gap-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-4">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#6b46c1] shadow-sm shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Email us at</p>
                <a href="mailto:hello@bookone.dev" className="text-[#6b46c1] font-bold hover:underline">
                  hello@bookone.dev
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
