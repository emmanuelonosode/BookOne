"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

// ============================================================================
// DATA
// ============================================================================

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Bookone Studio",
  description:
    "Bookone Studio is a premier Web Design and AI Automation agency helping businesses scale with custom websites, SEO, and intelligent workflows.",
  address: { "@type": "PostalAddress", addressCountry: "NG" },
  priceRange: "$$$",
  telephone: "+234 807 708 0903",
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "AI Automation" } },
  ],
};

const services = [
  {
    number: "01",
    title: "Web Design & Development",
    description:
      "Custom, responsive websites built to convert visitors into loyal customers. We build on Next.js, React, and modern CMS platforms — fast, scalable, and SEO-ready out of the box.",
    tags: ["Next.js & React", "E-commerce", "CMS Integration", "Mobile-First UI"],
  },
  {
    number: "02",
    title: "AI Automation",
    description:
      "Replace manual busywork with intelligent 24/7 autonomous agents. We design and deploy AI workflows that free up your team and compound your output over time.",
    tags: ["Chatbots", "Workflow Automation", "Data Pipelines", "LLM Integration"],
  },
  {
    number: "03",
    title: "SEO Optimisation",
    description:
      "Dominate search rankings and drive consistent organic traffic. Technical audits, content strategy, and link building that compounds month over month.",
    tags: ["Technical Audit", "Local SEO", "Link Building", "Analytics"],
  },
  {
    number: "04",
    title: "Content Strategy",
    description:
      "Authority-building content that speaks your brand's language and earns attention. Blog, copy, email sequences — written for humans, optimised for search.",
    tags: ["Blog Writing", "Copywriting", "Email Sequences", "Brand Voice"],
  },
];

const processSteps = [
  { num: "01", title: "Discovery", desc: "We map your goals, audience, and technical requirements." },
  { num: "02", title: "Strategy",  desc: "A tailored roadmap to hit your KPIs efficiently." },
  { num: "03", title: "Build",     desc: "Agile development with regular check-ins and demos." },
  { num: "04", title: "Launch",    desc: "Deployment, testing, and growth optimisation." },
];

// ============================================================================
// MAIN
// ============================================================================

const ServicesClient = () => {
  const [open, setOpen] = useState(null);

  return (
    <main className="bg-[#080808] min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO */}
      <section className="pt-32 pb-20 border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
            Our Services
          </p>
          <h1
            className="font-display font-black text-white leading-none mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            Web Design &<br />
            <span className="italic">AI Automation.</span>
          </h1>
          <p className="text-base text-white/40 leading-relaxed max-w-xl">
            We don&apos;t just design websites — we build growth engines. From high-performance Next.js sites to AI agents that automate your workflow, Bookone Studio delivers digital excellence.
          </p>
        </div>
      </section>

      {/* SERVICES ACCORDION */}
      <section className="py-20 sm:py-28 border-b border-white/[0.06]" aria-label="Our Services">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div>
            {services.map((service, i) => (
              <div
                key={service.number}
                className={`border-t border-white/[0.06] ${i === services.length - 1 ? "border-b" : ""}`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-8 flex items-start gap-6 group"
                  aria-expanded={open === i}
                >
                  <span className="text-xs font-mono text-white/20 group-hover:text-[#E8FF47] transition-colors duration-300 pt-1 shrink-0 w-8">
                    {service.number}
                  </span>
                  <span
                    className="flex-1 font-display font-bold text-white group-hover:text-white/80 transition-colors leading-tight"
                    style={{ fontSize: "clamp(1.4rem, 3vw, 2.5rem)" }}
                  >
                    {service.title}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`shrink-0 mt-2 text-white/20 group-hover:text-white/60 transition-all duration-300 ${open === i ? "rotate-45 text-[#E8FF47]" : ""}`}
                  >
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-14 pb-10">
                        <p className="text-sm sm:text-base text-white/40 leading-relaxed max-w-2xl mb-6">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-6">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 border border-white/[0.08] text-[10px] tracking-[0.12em] uppercase text-white/30 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Link
                          href="/get-started"
                          className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase text-[#E8FF47] hover:text-white transition-colors duration-200 font-medium"
                        >
                          Get Started
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-20 sm:py-28 border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">Process</p>
              <h2
                className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                How we work.
              </h2>
            </div>

            {/* Horizontal timeline */}
            <div className="relative">
              {/* connecting line */}
              <div className="hidden sm:block absolute top-4 left-0 right-0 h-px bg-white/[0.06]" />
              <div className="grid sm:grid-cols-4 gap-8">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.09 }}
                    className="relative"
                  >
                    <div className="w-2 h-2 rounded-full bg-white/20 mb-6 relative z-10 sm:block hidden" />
                    <p className="text-xs font-mono text-white/20 mb-3">{step.num}</p>
                    <h3 className="font-display font-bold text-white text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-white/35 leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-6">Ready to scale?</p>
          <h2
            className="font-display font-black text-white leading-none mb-10"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Stop losing leads to<br />
            <span className="italic">outdated tech.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <a
              href="https://calendar.notion.so/meet/officialbookone/call"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 text-[#E8FF47] text-sm font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Book a Strategy Call
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-3 text-white/40 text-sm font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesClient;
