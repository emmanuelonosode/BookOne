"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const SERVICES = [
  {
    number: "01",
    name: "Web Design & Development",
    description:
      "Custom-built, blazing-fast websites engineered for conversion. Every pixel is intentional, every millisecond optimised.",
    items: ["Next.js & React", "E-commerce builds", "Landing pages", "Web apps"],
  },
  {
    number: "02",
    name: "AI Automation",
    description:
      "We map your manual workflows and replace them with intelligent systems — so your team spends time on what actually matters.",
    items: ["Lead capture bots", "CRM automation", "Email sequences", "Reporting dashboards"],
  },
  {
    number: "03",
    name: "SEO & Search Dominance",
    description:
      "Organic traffic that compounds over time. Technical SEO, content strategy, and link architecture working together.",
    items: ["Technical SEO audits", "Content strategy", "Local SEO", "Core Web Vitals"],
  },
  {
    number: "04",
    name: "Websites for Sale",
    description:
      "Pre-built and done-for-you websites ready to launch. Browse our marketplace and own a production-ready site today.",
    items: ["Pre-built templates", "Done-for-you builds", "Full source code", "7-day support"],
  },
];

export default function Service() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header row */}
        <div className="flex items-end justify-between mb-16 gap-8">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">
              Our Services
            </p>
            <h2
              className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              What We Do
            </h2>
          </div>
          <span
            className="font-display font-black text-white/[0.06] leading-none hidden sm:block"
            style={{ fontSize: "clamp(4rem, 10vw, 9rem)" }}
            aria-hidden="true"
          >
            04
          </span>
        </div>

        {/* Service rows */}
        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
              isLast={i === SERVICES.length - 1}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-white/[0.06] flex items-center justify-between gap-6 flex-wrap">
          <p className="text-sm text-white/40 max-w-xs">
            Not sure what you need? Let&apos;s talk it through.
          </p>
          <Link
            href="/get-started"
            className="inline-flex items-center gap-2 text-[#E8FF47] text-xs tracking-[0.15em] uppercase font-semibold hover:text-white transition-colors duration-200 group"
          >
            Start a Project
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
              <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, isOpen, onToggle, isLast }) {
  return (
    <div className={`border-t border-white/[0.06] ${isLast ? "border-b" : ""}`}>
      <button
        onClick={onToggle}
        className="w-full text-left py-7 sm:py-8 flex items-center gap-6 sm:gap-10 group cursor-pointer"
        aria-expanded={isOpen}
      >
        {/* Number */}
        <span
          className={`text-xs tracking-[0.15em] font-mono shrink-0 transition-colors duration-300 ${
            isOpen ? "text-[#E8FF47]" : "text-white/20 group-hover:text-[#E8FF47]"
          }`}
        >
          {service.number}
        </span>

        {/* Name */}
        <span
          className="font-display font-bold text-white group-hover:text-white/90 transition-colors duration-200 flex-1 leading-tight"
          style={{ fontSize: "clamp(1.4rem, 3.5vw, 3rem)" }}
        >
          {service.name}
        </span>

        {/* Arrow */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className={`shrink-0 text-white/20 group-hover:text-[#E8FF47] transition-all duration-300 ${
            isOpen ? "rotate-90 text-[#E8FF47]" : ""
          }`}
        >
          <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Expandable detail */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-10 pl-12 sm:pl-16 grid sm:grid-cols-2 gap-8 items-start">
              <p className="text-sm sm:text-base text-white/50 leading-relaxed max-w-md">
                {service.description}
              </p>
              <ul className="flex flex-wrap gap-2">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="text-xs tracking-wide text-white/50 border border-white/10 px-3 py-1.5 rounded-full"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
