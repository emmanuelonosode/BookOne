"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const SEGMENTS = [
  {
    number: "01",
    title: "Ambitious Local Brands",
    description:
      "You have a great product or service but your website doesn't reflect it. We build you a digital presence that wins trust instantly.",
  },
  {
    number: "02",
    title: "High-Growth Startups",
    description:
      "Speed matters. We ship fast, clean, scalable builds — and automate your growth stack so your team can focus on the business.",
  },
  {
    number: "03",
    title: "Creators & Solopreneurs",
    description:
      "Your personal brand is your business. We build the website, the SEO, and the systems that turn your audience into revenue.",
  },
];

const STATS = [
  { value: "47%", label: "Avg. traffic increase" },
  { value: "20+", label: "Hours saved per week" },
  { value: "4.9", label: "Average client rating" },
];

export default function ForWhoSection() {
  return (
    <section className="py-20 sm:py-28 border-t border-white/[0.06]">
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">

        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-end mb-16">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-3">
              Who We Work With
            </p>
            <h2
              className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Built for the builders.
            </h2>
          </div>
          <p className="text-base text-white/40 leading-relaxed max-w-md">
            We work best with people who take their business seriously and know
            that a great digital presence is an investment, not a cost.
          </p>
        </div>

        {/* Segment rows */}
        <div className="mb-16">
          {SEGMENTS.map((seg, i) => (
            <motion.div
              key={seg.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="border-t border-white/[0.06] last:border-b py-8 grid sm:grid-cols-[80px_1fr_1fr] gap-6 items-start"
            >
              <span className="text-xs tracking-[0.15em] font-mono text-white/20 pt-1">{seg.number}</span>
              <h3 className="font-display font-bold text-white text-xl sm:text-2xl leading-tight">
                {seg.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">{seg.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-px bg-white/[0.06] mb-14">
          {STATS.map(({ value, label }) => (
            <div key={label} className="bg-[#080808] px-6 py-8">
              <p
                className="font-display font-black text-white leading-none mb-2"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                {value}
              </p>
              <p className="text-xs text-white/30 uppercase tracking-wider">{label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/get-started"
          className="group inline-flex items-center gap-3 text-[#E8FF47] text-sm font-semibold tracking-wide hover:text-white transition-colors duration-200"
        >
          Start Your Growth Journey
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
            <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>
    </section>
  );
}
