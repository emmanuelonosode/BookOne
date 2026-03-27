"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "How long does a website project take?",
    a: "Most projects are delivered in 2–4 weeks depending on scope. A landing page or portfolio site can be done in under 2 weeks. A full e-commerce or web app takes 4–8 weeks. We give you a clear timeline before we start.",
  },
  {
    q: "What does a website project cost?",
    a: "Our projects start at $1,500 for a landing page and scale up based on complexity. We offer fixed-price packages and custom quotes. Every proposal comes with a detailed breakdown — no surprises.",
  },
  {
    q: "Do you work with clients outside Nigeria?",
    a: "Yes. Roughly half our clients are based in the UK, US, and Canada. We work entirely remotely and are used to async communication across time zones.",
  },
  {
    q: "What do I need to get started?",
    a: "Just fill out our contact form and tell us what you're building. We'll schedule a free 30-minute call, understand your goals, and send you a proposal within 48 hours.",
  },
  {
    q: "Can you take over a website we already have?",
    a: "Absolutely. We do audits, redesigns, and ongoing maintenance. Send us your current site URL and we'll give you an honest assessment of what needs to change and why.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          {/* Left label */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">FAQ</p>
            <h2
              className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Common Questions
            </h2>
          </div>

          {/* Accordion */}
          <div>
            {FAQS.map((faq, i) => (
              <div key={i} className={`border-t border-white/[0.06] ${i === FAQS.length - 1 ? "border-b" : ""}`}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full text-left py-7 flex items-start gap-6 group"
                  aria-expanded={open === i}
                >
                  <span className="text-xs font-mono text-white/20 group-hover:text-[#E8FF47] transition-colors duration-300 pt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-base sm:text-lg font-medium text-white/80 group-hover:text-white transition-colors duration-200 leading-snug pr-4">
                    {faq.q}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`shrink-0 mt-1 text-white/20 group-hover:text-white/60 transition-all duration-300 ${
                      open === i ? "rotate-45 text-[#E8FF47]" : ""
                    }`}
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
                      <p className="pl-14 pb-8 text-sm sm:text-base text-white/40 leading-relaxed max-w-2xl">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
