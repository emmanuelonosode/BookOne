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
      className={`group relative overflow-hidden bg-[#1A1A24]/60 backdrop-blur-md border border-white/10 rounded-[2rem] transition-all duration-500 hover:border-[#6b46c1]/50 hover:shadow-[0_0_20px_rgba(107,70,193,0.3)] ${className}`}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
    >
      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none bg-[url('/grid-pattern.svg')] mix-blend-overlay" />
      
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
    className="text-center group p-6 rounded-2xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10"
  >
    <div className="w-12 h-12 mx-auto mb-4 bg-[#6b46c1]/10 rounded-xl flex items-center justify-center text-[#6b46c1] border border-[#6b46c1]/20 group-hover:bg-[#6b46c1] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(107,70,193,0.5)] transition-all duration-300">
      <Icon className="w-6 h-6" strokeWidth={1.5} />
    </div>
    <div className="text-4xl lg:text-5xl font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors duration-300 tracking-tight">
      {value}
    </div>
    <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">{label}</div>
  </motion.div>
);

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function AboutClient() {
  return (
    <main className="bg-[#0B0B0E] min-h-screen selection:bg-[#6b46c1] selection:text-white font-sans overflow-x-hidden text-slate-300">
      
      {/* HEADER HERO */}
      <section className="pt-32 pb-20 px-6 max-w-[1400px] mx-auto text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6b46c1]/20 rounded-full blur-[120px] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A24]/80 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(107,70,193,0.3)] text-sm font-medium text-[#A78BFA] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#A78BFA]"></span>
          </span>
          Our Story
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative z-10 text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-8"
        >
          Building the future of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] to-purple-400">digital business.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          BookOne is more than an agency. We are the strategic partner that ambitious Nigerian businesses trust to unlock growth through technology.
        </motion.p>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-white/10 bg-[#0B0B0E] relative shadow-[0_0_50px_rgba(107,70,193,0.05)]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#6B46C1]/5 to-transparent pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <Counter key={idx} {...stat} delay={idx * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* MISSION / STORY SPLIT */}
      <section className="py-24 md:py-32 px-6 max-w-[1400px] mx-auto relative">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Our Mission: Your Success
            </h2>
            <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
              <p>
                We exist to bridge the gap between ambitious business goals and digital reality. In a world where digital presence determines success, we ensure you&apos;re leading the pack.
              </p>
              <p>
                BookOne started with a powerful observation: talented businesses across Africa were being held back by outdated strategies. We set out to change that by combining <strong className="text-[#A78BFA]">world-class design</strong> with <strong className="text-[#A78BFA]">intelligent automation</strong>.
              </p>
            </div>
            
            <div className="mt-10 p-8 bg-[#6b46c1]/10 rounded-[2rem] border border-[#6b46c1]/30 shadow-[inset_0_0_20px_rgba(107,70,193,0.1)] relative overflow-hidden">
               <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-20 bg-[#8B5CF6] rounded-full blur-[2px]" />
              <p className="text-[#A78BFA] font-medium italic text-xl leading-relaxed relative z-10">
                &quot;We don&apos;t just deliver projects—we deliver results that position you for sustainable, long-term success.&quot;
              </p>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-[#1A1A24] shadow-2xl shadow-purple-900/40 group border border-white/10"
          >
            <Image
              src="/about-team.jpg" 
              alt="BookOne Team"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E]/80 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* VALUES GRID */}
      <section className="py-24 bg-[#0B0B0E] border-t border-white/5 relative">
        <div className="absolute inset-0 bg-[#6B46C1]/5 bg-[url('/grid-pattern.svg')] mix-blend-screen opacity-20 pointer-events-none" />
        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Core Values</h2>
            <p className="text-slate-400 text-lg">The principles that drive every pixel we push.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => {
              const Icon = val.icon;
              return (
                <GlowCard key={idx} delay={idx * 0.1}>
                  <div className="w-14 h-14 bg-[#1A1A24] border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#6b46c1] group-hover:border-[#6b46c1] group-hover:shadow-[0_0_20px_rgba(107,70,193,0.5)] transition-all duration-500">
                    <Icon className="w-7 h-7 text-[#A78BFA] group-hover:text-white transition-colors" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Meet the Experts</h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A diverse team of strategists, designers, and developers united by a passion for excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, idx) => (
            <GlowCard key={idx} className="!p-0 border border-white/10" delay={idx * 0.1}>
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full mb-6 mt-4 mx-4 w-[calc(100%-2rem)] rounded-2xl overflow-hidden bg-[#0B0B0E] border border-white/10 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0E]/80 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-500" />
              </div>
              
              {/* Content */}
              <div className="flex flex-col h-full px-8 pb-8">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[#A78BFA] transition-colors">{member.name}</h3>
                  <p className="text-[#8B5CF6] font-medium text-sm tracking-wide uppercase">{member.role}</p>
                </div>
                
                <p className="text-slate-400 text-sm leading-relaxed mb-6 border-b border-white/10 pb-6 flex-grow group-hover:border-white/20 transition-colors">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {member.expertise.map((skill) => (
                    <span 
                      key={skill} 
                      className="px-3 py-1 bg-[#1A1A24] text-slate-300 text-xs font-semibold rounded-md border border-white/10 group-hover:border-[#6b46c1]/40 group-hover:bg-[#6b46c1]/10 group-hover:text-[#A78BFA] group-hover:shadow-[0_0_10px_rgba(107,70,193,0.3)] transition-all duration-300"
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
      <section className="py-24 bg-[#050508] text-white text-center border-t border-[#8B5CF6]/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#6B46C1_0%,transparent_50%)] opacity-20" />
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">Ready to grow?</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
            Join the list of successful businesses transforming their future with BookOne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/get-started"
              className="group inline-flex items-center justify-center px-8 py-4 bg-[#6b46c1] text-white font-bold rounded-full hover:bg-[#8B5CF6] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all hover:-translate-y-1"
            >
              Start Your Project
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link 
              href="/portfolio"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-bold rounded-full hover:bg-white/5 transition-all border border-white/20 hover:border-white/40"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
