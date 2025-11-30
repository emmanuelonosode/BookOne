"use client";

import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowRight, Search, Bot, PenTool, Globe, Cpu } from "lucide-react";

// ============================================================================
// SEO & STRUCTURED DATA
// ============================================================================

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "BookOne",
  image: "https://bookone.dev/logo.png", // Replace with actual logo URL
  description:
    "BookOne is a premier Web Design and AI Automation agency helping businesses scale with custom websites, SEO, and intelligent workflows.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NG",
  },
  priceRange: "$$$",
  telephone: "+234 807 708 0903",
  serviceArea: {
    "@type": "Country",
    name: "Nigeria",
    sameAs: "Global",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Web Design & Development",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Automation",
      },
    },
  ],
};

// ============================================================================
// DATA CONSTANTS
// ============================================================================

const services = [
  {
    id: "web-dev",
    title: "Web Design & Development",
    description:
      "Custom, responsive websites built to convert visitors into loyal customers.",
    icon: Globe,
    features: [
      "Next.js & React",
      "E-commerce Stores",
      "CMS Integration",
      "Mobile-First UI",
    ],
    cta: "Build Your Site",
    colSpan: "md:col-span-2",
  },
  {
    id: "ai-auto",
    title: "AI Automation",
    description:
      "Replace manual busywork with intelligent 24/7 autonomous agents.",
    icon: Bot,
    features: ["Chatbots", "Workflow Automation", "Data Scraping"],
    cta: "Automate Work",
    colSpan: "md:col-span-1",
  },
  {
    id: "seo",
    title: "SEO Optimization",
    description:
      "Dominate search rankings and drive consistent organic traffic.",
    icon: Search,
    features: ["Technical Audit", "Local SEO", "Link Building"],
    cta: "Rank Higher",
    colSpan: "md:col-span-1",
  },
  {
    id: "content",
    title: "Content Strategy",
    description:
      "Authority-building content that speaks your brand's language.",
    icon: PenTool,
    features: ["Blog Writing", "Copywriting", "Email Sequences"],
    cta: "Start Writing",
    colSpan: "md:col-span-2",
  },
];

const stats = [
  { value: "100+", label: "Projects Shipped" },
  { value: "98%", label: "Client Retention" },
  { value: "24/7", label: "System Uptime" },
  { value: "4.8", label: "Average Rating" },
];

const processSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We map out your goals and technical requirements.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "A tailored roadmap to hit your KPIs efficiently.",
  },
  {
    num: "03",
    title: "Build",
    desc: "Agile development with regular check-ins.",
  },
  {
    num: "04",
    title: "Launch",
    desc: "Deployment, testing, and growth optimization.",
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

const GlowCard = ({ service, index }) => {
  const Icon = service.icon;
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Optimized spring config for performance
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 0.5 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1 }}
      className={`group relative overflow-hidden bg-white border border-gray-200 rounded-4xl hover:border-[#6b46c1]/50 transition-colors duration-500 shadow-sm hover:shadow-md col-span-1 ${service.colSpan} will-change-transform`}
      onMouseMove={handleMouseMove}
    >
      {/* 3. Grid Lines Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* 4. Noise Texture */}
      <div
        className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 p-6 md:p-8 h-full flex flex-col justify-between">
        <div>
          <header className="flex justify-between items-start mb-6">
            <div
              className={`p-3 md:p-4 rounded-2xl bg-gray-50 border border-gray-100 group-hover:bg-[#6b46c1] group-hover:border-[#6b46c1] transition-all duration-300 shadow-sm`}
            >
              <Icon
                className="w-6 h-6 md:w-8 md:h-8 text-[#6b46c1] group-hover:text-white transition-colors"
                strokeWidth={1.5}
              />
            </div>
            <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-gray-300 group-hover:text-[#6b46c1] -rotate-45 group-hover:rotate-0 transition-all duration-300" />
          </header>

          <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 tracking-tight">
            {service.title}
          </h3>
          <p className="text-sm md:text-base text-slate-500 mb-8 leading-relaxed font-light">
            {service.description}
          </p>

          <ul className="space-y-3 mb-8">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#6b46c1]" />
                <span className="text-sm font-medium text-slate-600">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-gray-100 group-hover:border-[#6b46c1]/10 transition-colors">
          <a
            href="/get-started"
            className="flex items-center gap-2 text-[#6b46c1] font-semibold text-sm uppercase tracking-wide hover:text-[#5a37a6] transition-colors focus:outline-none focus:ring-2 focus:ring-[#6b46c1] focus:ring-offset-2 rounded-lg"
            aria-label={`Get started with ${service.title}`}
          >
            {service.cta}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.article>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================

const ServicesClient = () => {
  return (
    <main className="bg-[#FAFAFA] min-h-screen selection:bg-[#6b46c1] selection:text-white font-sans overflow-x-hidden">
      {/* Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="pt-24 md:pt-32 pb-12 md:pb-20 px-6 max-w-[1400px] mx-auto">
        <header className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-[#6b46c1] mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b46c1]"></span>
            </span>
            Available for new projects
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold text-slate-900 tracking-tight leading-[1.1] md:leading-[0.95] mb-6 md:mb-10"
          >
            Web Design & <br />
            <span className="text-gray-400">AI Automation.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed mb-12"
          >
            We don't just design websites; we build growth engines. From
            high-performance <strong>Next.js sites</strong> to{" "}
            <strong>AI agents</strong> that automate your workflow, BookOne
            delivers digital excellence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 md:flex md:flex-wrap gap-8 md:gap-12 border-t border-gray-200 pt-8"
          >
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-2xl md:text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </header>
      </section>

      {/* SERVICES BENTO GRID */}
      <section
        className="px-6 pb-24 md:pb-32 max-w-[1400px] mx-auto"
        aria-label="Our Services"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <GlowCard key={service.id} service={service} index={index} />
          ))}

          {/* Custom Solutions Card */}
          <motion.article
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-3 bg-[#6b46c1] rounded-4xl p-8 md:p-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl shadow-purple-900/20"
          >
            <div className="relative z-10 max-w-2xl text-center md:text-left">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                Need a custom enterprise solution?
              </h3>
              <p className="text-purple-100 text-base md:text-lg mb-8">
                From complex SaaS platforms to bespoke internal tools, our
                engineering team can build exactly what you need.
              </p>
              <a
                href="/get-started"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#6b46c1] font-bold rounded-xl hover:bg-purple-50 transition-all hover:scale-105 shadow-lg w-full md:w-auto"
                aria-label="Contact us for custom enterprise solutions"
              >
                Let's Talk Code
              </a>
            </div>

            {/* Abstract Graphic */}
            <div className="relative z-10 w-full md:w-1/3 aspect-square max-w-[300px] bg-white/10 rounded-2xl border border-white/20 flex items-center justify-center backdrop-blur-sm">
              <Cpu
                className="w-16 h-16 md:w-24 md:h-24 text-white opacity-90"
                strokeWidth={1}
              />
            </div>

            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-white rounded-full blur-[100px] md:blur-[150px] opacity-10 pointer-events-none" />
          </motion.article>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="bg-white py-24 md:py-32 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <header className="mb-16 md:mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 md:mb-6">
              How we work
            </h2>
            <p className="text-slate-500 text-base md:text-lg">
              A simple, transparent process built for speed and results.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative pl-6 md:pl-0 border-l md:border-l-0 border-gray-200"
              >
                <div className="text-5xl md:text-6xl font-bold text-slate-100 mb-4 font-mono">
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base">
                  {step.desc}
                </p>

                {/* Horizontal Line for Desktop */}
                {i < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 w-full h-px bg-gray-100 -z-10 translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-bold text-slate-900 mb-6 md:mb-8 tracking-tight">
            Ready to scale?
          </h2>
          <p className="text-lg md:text-xl text-slate-600 mb-10 md:mb-12 max-w-2xl mx-auto">
            Stop losing leads to outdated tech. Join 100+ businesses growing
            with BookOne today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://calendar.notion.so/meet/officialbookone/call"
              target="_blank"
              className="w-full sm:w-auto px-10 py-5 bg-[#6b46c1] text-white font-bold text-lg rounded-full hover:bg-[#5a37a6] transition-all hover:-translate-y-1 shadow-xl shadow-purple-200"
              aria-label="Book a strategy call to discuss your project"
            >
              Book Strategy Call
            </a>
            <a
              href="/portfolio"
              className="w-full sm:w-auto px-10 py-5 bg-white text-slate-900 font-bold text-lg rounded-full border border-gray-200 hover:border-[#6b46c1] transition-all"
              aria-label="View our portfolio of recent work"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesClient;
