"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

// ============================================================================
// DATA
// ============================================================================

const stats = [
  { value: "100+", label: "Projects Delivered" },
  { value: "98%",  label: "Client Satisfaction" },
  { value: "5+",   label: "Years Experience" },
  { value: "24/7", label: "Support Available" },
];

const values = [
  {
    number: "01",
    title: "Innovation First",
    description:
      "We stay ahead of digital trends to deliver cutting-edge solutions that future-proof your business.",
  },
  {
    number: "02",
    title: "Results Driven",
    description:
      "Every strategy, design, and line of code is optimised for measurable business growth and ROI.",
  },
  {
    number: "03",
    title: "Client Partnership",
    description:
      "We don't just build websites — we build lasting partnerships focused on your long-term success.",
  },
  {
    number: "04",
    title: "Quality Excellence",
    description:
      "From concept to deployment, we maintain the highest standards of quality and performance.",
  },
];

const team = [
  {
    name: "Emmanuel Onosode",
    role: "Founder & CEO",
    image: "/ceo.jpg",
    bio: "Visionary leader with 5+ years in digital transformation. Emmanuel's strategic approach has helped dozens of businesses achieve 300%+ growth.",
  },
  {
    name: "Jackson Fisher",
    role: "Technical Project Manager",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Engineering excellence meets flawless execution. Jackson ensures every project delivers on time and exceeds expectations.",
  },
  {
    name: "Ava Thompson",
    role: "AI Automation Strategist",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "AI expert who saves clients 1000+ hours monthly through intelligent workflow design and process optimisation.",
  },
  {
    name: "Elijah Brooks",
    role: "Brand & Motion Designer",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    bio: "Creative powerhouse behind award-winning brand identities. Elijah's designs don't just look stunning — they convert.",
  },
  {
    name: "Ellie Bennett",
    role: "Content & SEO Strategist",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    bio: "SEO strategist who's driven 500%+ organic traffic growth for clients via data-driven insights.",
  },
];

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AboutClient() {
  return (
    <main className="bg-[#080808] min-h-screen overflow-x-hidden">

      {/* HERO */}
      <section className="pt-32 pb-20 border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">
            About Us
          </p>
          <h1
            className="font-display font-black text-white leading-none mb-8"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            We&apos;re a small team<br />
            <span className="italic">that builds big things.</span>
          </h1>
          <p className="text-base text-white/40 leading-relaxed max-w-xl">
            BookOne is the strategic partner that ambitious businesses trust to unlock growth through technology — world-class web design, intelligent automation, and SEO that compounds.
          </p>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06]">
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-[#080808] px-6 py-10">
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
        </div>
      </section>

      {/* MISSION */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">Our Mission</p>
              <h2
                className="font-display font-black text-white leading-none mb-8"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Your success is the only metric that matters.
              </h2>
              <div className="space-y-5 text-base text-white/45 leading-relaxed">
                <p>
                  We exist to bridge the gap between ambitious business goals and digital reality. In a world where digital presence determines success, we ensure you&apos;re leading the pack.
                </p>
                <p>
                  BookOne started with a powerful observation: talented businesses across Africa were being held back by outdated strategies. We set out to change that by combining world-class design with intelligent automation.
                </p>
              </div>
              <blockquote className="mt-10 border-l-2 border-[#E8FF47] pl-6">
                <p className="font-display font-bold italic text-white/70 text-lg leading-snug">
                  &quot;We don&apos;t just deliver projects — we deliver results that position you for sustainable, long-term success.&quot;
                </p>
              </blockquote>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-white/[0.04]">
              <Image
                src="/about-team.jpg"
                alt="BookOne Team"
                fill
                className="object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">Our Values</p>
              <h2
                className="font-display font-black text-white leading-none"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                What we stand for.
              </h2>
            </div>

            <div>
              {values.map((val, i) => (
                <motion.div
                  key={val.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="border-t border-white/[0.06] last:border-b py-8 grid sm:grid-cols-[60px_1fr_1.5fr] gap-6 items-start"
                >
                  <span className="text-xs tracking-[0.15em] font-mono text-white/20 pt-1">{val.number}</span>
                  <h3 className="font-display font-bold text-white text-xl leading-tight">{val.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{val.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06]">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <div className="mb-16">
            <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-4">The Team</p>
            <h2
              className="font-display font-black text-white leading-none"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              Meet the experts.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-[#080808] p-8 flex flex-col"
              >
                <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden bg-white/[0.04]">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-90 group-hover:scale-[1.02] transition-all duration-700"
                  />
                </div>
                <h3 className="font-display font-bold text-white text-xl leading-tight mb-1">
                  {member.name}
                </h3>
                <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase font-mono mb-4">
                  {member.role}
                </p>
                <p className="text-sm text-white/40 leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 sm:py-32">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16">
          <p className="text-[10px] tracking-[0.25em] text-white/30 uppercase mb-6">Ready?</p>
          <h2
            className="font-display font-black text-white leading-none mb-10"
            style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}
          >
            Let&apos;s build<br />
            <span className="italic">something great.</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Link
              href="/get-started"
              className="group inline-flex items-center gap-3 text-[#E8FF47] text-sm font-semibold tracking-wide hover:text-white transition-colors duration-200"
            >
              Start a Project
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">
                <path d="M2 12L12 2M12 2H4M12 2V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
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
}
