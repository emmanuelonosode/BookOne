"use client";

import React, { MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";
import {
  BarChart3,
  Star,
  Rocket,
  LifeBuoy,
  TrendingUp,
  Handshake,
  Gem,
  ArrowRight,
} from "lucide-react";

// ============================================================================
// DATA
// ============================================================================

const stats = [
  {
    value: "100+",
    label: "Projects Delivered",
    icon: BarChart3,
  },
  {
    value: "98%",
    label: "Client Satisfaction",
    icon: Star,
  },
  {
    value: "5+",
    label: "Years Experience",
    icon: Rocket,
  },
  {
    value: "24/7",
    label: "Support Available",
    icon: LifeBuoy,
  },
];

const values = [
  {
    title: "Innovation First",
    description:
      "We stay ahead of digital trends to deliver cutting-edge solutions that future-proof your business.",
    icon: Rocket,
  },
  {
    title: "Results Driven",
    description:
      "Every strategy, design, and line of code is optimized for measurable business growth and ROI.",
    icon: TrendingUp,
  },
  {
    title: "Client Partnership",
    description:
      "We don't just build websites—we build lasting partnerships focused on your long-term success.",
    icon: Handshake,
  },
  {
    title: "Quality Excellence",
    description:
      "From initial concept to final deployment, we maintain the highest standards of quality and performance.",
    icon: Gem,
  },
];

const team = [
  {
    name: "Emmanuel Onosode",
    role: "Founder & CEO",
    image: "/ceo.jpg",
    bio: "Visionary leader with 5+ years in digital transformation. Emmanuel's strategic approach has helped dozens of businesses achieve 300%+ growth.",
    expertise: ["Strategic Planning", "Digital Transformation", "Business Growth"],
  },
  {
    name: "Jackson Fisher",
    role: "Technical Project Manager",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Engineering excellence meets flawless execution. Jackson ensures every project delivers on time and exceeds expectations.",
    expertise: ["Project Management", "System Architecture", "QA"],
  },
  {
    name: "Ava Thompson",
    role: "AI Automation Strategist",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    bio: "AI expert who saves clients 1000+ hours monthly through intelligent workflow design and process optimization.",
    expertise: ["AI Integration", "Workflow Automation", "Process Optimization"],
  },
  {
    name: "Elijah Brooks",
    role: "Brand & Motion Designer",
    image: "https://randomuser.me/api/portraits/men/83.jpg",
    bio: "Creative powerhouse behind award-winning brand identities. Elijah's designs don't just look stunning—they convert.",
    expertise: ["Brand Design", "Motion Graphics", "UX/UI Design"],
  },
  {
    name: "Ellie Bennett",
    role: "Content & SEO Strategist",
    image: "https://randomuser.me/api/portraits/women/34.jpg",
    bio: "SEO strategist who's driven 500%+ organic traffic growth for clients via data-driven insights.",
    expertise: ["SEO Strategy", "Content Marketing", "Analytics"],
  },
];

// ============================================================================
// COMPONENTS
// ============================================================================

// 1. Glow Card for Values & Team (Matching Service Page)
const GlowCard = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);



  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      className={`group relative overflow-hidden bg-white border border-gray-200 rounded-[2rem] transition-colors duration-500 hover:border-[#6b46c1]/50 ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
    >
      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative z-10 p-8 h-full flex flex-col">{children}</div>
    </motion.div>
  );
};

// 2. Animated Counter Component
const Counter = ({ value, label, icon: Icon, delay }: { value: string; label: string; icon: React.ElementType; delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="text-center group p-6 rounded-2xl hover:bg-gray-50 transition-colors"
  >
    <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center text-gray-600 group-hover:bg-[#6b46c1] group-hover:text-white transition-all duration-300">
      <Icon className="w-6 h-6" strokeWidth={1.5} />
    </div>
    <div className="text-4xl lg:text-5xl font-bold text-slate-900 mb-2 group-hover:text-[#6b46c1] transition-colors duration-300 tracking-tight">
      {value}
    </div>
    <div className="text-sm font-medium text-slate-500 uppercase tracking-widest">{label}</div>
  </motion.div>
);

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AboutClient() {
  return (
    <main className="bg-[#FAFAFA] min-h-screen selection:bg-[#6b46c1] selection:text-white font-sans overflow-x-hidden">
      
      {/* HEADER HERO */}
      <section className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-[#6b46c1] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b46c1]"></span>
          </span>
          Our Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8"
        >
          Building the future of <br />
          <span className="text-gray-400">digital business.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          BookOne is more than an agency. We are the strategic partner that ambitious Nigerian businesses trust to unlock growth through technology.
        </motion.p>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-gray-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <Counter key={idx} {...stat} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / STORY SPLIT */}
      <section className="py-24 md:py-32 px-6 max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Our Mission: Your Success
            </h2>
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p>
                We exist to bridge the gap between ambitious business goals and digital reality. In a world where digital presence determines success, we ensure you&apos;re leading the pack.
              </p>
              <p>
                BookOne started with a powerful observation: talented businesses across Africa were being held back by outdated strategies. We set out to change that by combining <strong>world-class design</strong> with <strong>intelligent automation</strong>.
              </p>
            </div>
            
            <div className="mt-10 p-8 bg-[#6b46c1]/5 rounded-[2rem] border border-[#6b46c1]/10">
              <p className="text-[#6b46c1] font-medium italic text-xl leading-relaxed">
                &quot;We don&apos;t just deliver projects—we deliver results that position you for sustainable, long-term success.&quot;
              </p>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-100 shadow-2xl shadow-purple-900/10 group"
          >
            <Image
              src="/about-team.jpg" 
              alt="BookOne Team"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="py-24 bg-white border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Core Values</h2>
            <p className="text-slate-500 text-lg">The principles that drive every pixel we push.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <GlowCard key={idx} delay={idx * 0.1}>
                  <div className="w-14 h-14 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#6b46c1] group-hover:border-[#6b46c1] transition-all duration-300">
                    <Icon className="w-7 h-7 text-[#6b46c1] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{val.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {val.description}
                  </p>
                </GlowCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM SECTION (Redesigned) */}
      <section className="py-24 px-6 max-w-[1400px] mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Meet the Experts</h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            A diverse team of strategists, designers, and developers united by a passion for excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <GlowCard key={idx} className="p-0" delay={idx * 0.1}>
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full mb-6 rounded-2xl overflow-hidden bg-slate-100 border border-gray-100">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col h-full">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">{member.name}</h3>
                  <p className="text-[#6b46c1] font-medium text-sm tracking-wide uppercase">{member.role}</p>
                </div>
                
                <p className="text-slate-500 text-sm leading-relaxed mb-6 border-b border-gray-100 pb-6 flex-grow">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {member.expertise.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-gray-50 text-slate-600 text-xs font-semibold rounded-md border border-gray-100 group-hover:border-[#6b46c1]/20 group-hover:bg-[#6b46c1]/5 group-hover:text-[#6b46c1] transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to grow?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
            Join the list of successful businesses transforming their future with BookOne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/get-started"
              className="group inline-flex items-center justify-center px-8 py-4 bg-[#6b46c1] text-white font-bold rounded-full hover:bg-[#5a37a6] transition-all hover:-translate-y-1 shadow-lg shadow-purple-900/20"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link 
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
