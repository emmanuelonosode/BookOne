"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react";
import { SpotlightCard } from "../ui/SpotlightCard";
import { AnimatedGrid } from "../ui/AnimatedGrid";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

const ForWhoSection = () => {
  return (
    <section className="py-20 px-4 bg-[#0B0B0E] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Who We Partner With
          </h2>

          <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-light">
            We don't work with everyone. We partner with ambitious organizations that value design, speed, and intelligent automation as critical levers for massive growth.
          </p>
        </motion.div>

        {/* Audience Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8 mb-16"
        >
          {/* Small Businesses -> Ambitious Local Brands */}
          <motion.div variants={cardVariants} className="h-full">
            <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)" className="h-full p-8 group/card">
              <AnimatedGrid className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 w-16 h-16 bg-[#6B46C1]/10 border border-[#8B5CF6]/30 group-hover/card:bg-[#8B5CF6]/20 transition-colors duration-300 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(139,92,246,0.2)] group-hover/card:shadow-[0_0_25px_rgba(139,92,246,0.4)] group-hover/card:border-transparent">
                <svg
                  className="w-8 h-8 text-[#A78BFA] group-hover/card:text-white transition-colors duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m0 0v-4a2 2 0 012-2h4a2 2 0 012 2v4"
                  />
                </svg>
                {/* Inner reactor glow */}
                <div className="absolute inset-2 bg-[#8B5CF6]/30 blur-md rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-white mb-5 tracking-tight group-hover/card:text-[#A78BFA] transition-colors">
                Ambitious Local Brands
              </h3>
              <ul className="relative z-10 space-y-4 text-slate-400 group-hover/card:text-slate-300 transition-colors">
                <li className="flex items-start space-x-3">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-sm rounded-full group-hover/card:scale-150 transition-transform duration-500"></div>
                    <CheckCircle2 className="w-5 h-5 text-[#A78BFA] relative z-10" />
                  </div>
                  <span>
                    Dominate local search rankings and siphon traffic from competitors.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                   <div className="relative mt-0.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-sm rounded-full group-hover/card:scale-150 transition-transform duration-500"></div>
                    <CheckCircle2 className="w-5 h-5 text-[#A78BFA] relative z-10" />
                  </div>
                  <span>
                    Automate customer inquiries and focus on delivering excellent service.
                  </span>
                </li>
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Startups & Founders -> High-Growth Startups */}
          <motion.div variants={cardVariants} className="h-full">
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full p-8 group/card border-blue-500/10">
              <AnimatedGrid className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 w-16 h-16 bg-blue-500/10 group-hover/card:bg-blue-500/20 transition-colors duration-300 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/30 group-hover/card:border-transparent shadow-[0_0_15px_rgba(59,130,246,0.2)] group-hover/card:shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                <svg
                  className="w-8 h-8 text-blue-400 group-hover/card:text-white transition-colors duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {/* Inner reactor glow */}
                <div className="absolute inset-2 bg-blue-500/30 blur-md rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-white mb-5 tracking-tight group-hover/card:text-blue-300 transition-colors">
                High-Growth Startups
              </h3>
              <ul className="relative z-10 space-y-4 text-slate-400 group-hover/card:text-slate-300 transition-colors">
                <li className="flex items-start space-x-3">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500/30 blur-sm rounded-full group-hover/card:scale-150 transition-transform duration-500"></div>
                    <CheckCircle2 className="w-5 h-5 text-blue-400 relative z-10" />
                  </div>
                  <span>
                    Ship blazing fast MVPs and landing pages that convert early adopters.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-blue-500/30 blur-sm rounded-full group-hover/card:scale-150 transition-transform duration-500"></div>
                    <CheckCircle2 className="w-5 h-5 text-blue-400 relative z-10" />
                  </div>
                  <span>
                    Implement scalable AI architectures before you need to hire operators.
                  </span>
                </li>
              </ul>
            </SpotlightCard>
          </motion.div>

          {/* Creators & Solopreneurs */}
          <motion.div variants={cardVariants} className="h-full">
             <SpotlightCard spotlightColor="rgba(236, 72, 153, 0.2)" className="h-full p-8 group/card border-pink-500/10">
              <AnimatedGrid className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 w-16 h-16 bg-pink-500/10 group-hover/card:bg-pink-500/20 border border-pink-500/30 group-hover/card:border-transparent transition-colors duration-300 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_15px_rgba(236,72,153,0.2)] group-hover/card:shadow-[0_0_25px_rgba(236,72,153,0.4)]">
                <svg
                  className="w-8 h-8 text-pink-400 group-hover/card:text-white transition-colors duration-300 relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                 {/* Inner reactor glow */}
                <div className="absolute inset-2 bg-pink-500/30 blur-md rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="relative z-10 text-2xl font-bold text-white mb-5 tracking-tight group-hover/card:text-pink-300 transition-colors">
                Creators & Solopreneurs
              </h3>
              <ul className="relative z-10 space-y-4 text-slate-400 group-hover/card:text-slate-300 transition-colors">
                <li className="flex items-start space-x-3">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-pink-500/30 blur-sm rounded-full group-hover/card:scale-150 transition-transform duration-500"></div>
                    <CheckCircle2 className="w-5 h-5 text-pink-400 relative z-10" />
                  </div>
                  <span>
                    Premium digital storefronts that command higher rates for your services.
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="relative mt-0.5 flex-shrink-0">
                    <div className="absolute inset-0 bg-pink-500/30 blur-sm rounded-full group-hover/card:scale-150 transition-transform duration-500"></div>
                    <CheckCircle2 className="w-5 h-5 text-pink-400 relative z-10" />
                  </div>
                  <span>
                    Fully automated onboarding and lead nurturing so you can focus on creating.
                  </span>
                </li>
              </ul>
            </SpotlightCard>
          </motion.div>
        </motion.div>

        {/* Social Proof */}
        <section className="w-full py-12 px-4 flex justify-center items-center bg-transparent">
          {/* Main Container with ultra-soft shadow for a floating effect */}
          <div className="max-w-5xl w-full bg-[#11111A]/80 backdrop-blur-2xl rounded-[3rem] shadow-[0_20px_60px_-15px_rgba(107,70,193,0.15)] border border-white/10 overflow-hidden relative transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(107,70,193,0.25)] hover:border-purple-500/20">
            {/* Subtle background texture - fluid organic shapes using very light gray tones */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />
            <div className="absolute bottom-[-30%] right-[-10%] w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[120px] opacity-40 pointer-events-none" />

            <div className="relative z-10 p-8 md:p-14 lg:p-20 text-center">
              {/* Header Section */}
              <div className="max-w-3xl mx-auto mb-16">
                {/* Monochrome Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 shadow-sm text-slate-300 text-sm font-medium mb-8 border border-white/10">
                  <CheckCircle2
                    className="w-4 h-4 text-white"
                    strokeWidth={1.5}
                  />
                  <span>Proven Results</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                  Trusted by over 100 growing businesses.
                </h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                  Scale smarter with data-driven digital solutions designed for
                  growth.
                </p>
              </div>

              {/* Metrics Grid (Clean Monochrome Bento) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                {/* Metric 1 */}
                <div className="group bg-white/5 rounded-[2rem] p-8 border border-white/10 hover:border-[#6B46C1]/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                  <div className="w-16 h-16 bg-[#1A1A24] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 group-hover:text-[#A78BFA] transition-all duration-500 border border-white/5">
                    <TrendingUp className="w-8 h-8" strokeWidth={1.2} />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2 tracking-tighter">
                    47%
                  </div>
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                    Traffic Increase
                  </div>
                </div>

                {/* Metric 2 */}
                <div
                  className="group bg-white/5 rounded-[2rem] p-8 border border-white/10 hover:border-[#6B46C1]/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: "100ms" }}
                >
                  <div className="w-16 h-16 bg-[#1A1A24] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 group-hover:text-[#A78BFA] transition-all duration-500 border border-white/5">
                    <Clock className="w-8 h-8" strokeWidth={1.2} />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2 tracking-tighter">
                    20+
                  </div>
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                    Hours Saved Weekly
                  </div>
                </div>

                {/* Metric 3 */}
                <div
                  className="group bg-white/5 rounded-[2rem] p-8 border border-white/10 hover:border-[#6B46C1]/50 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1"
                  style={{ transitionDelay: "200ms" }}
                >
                  <div className="w-16 h-16 bg-[#1A1A24] text-white rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-105 group-hover:text-[#A78BFA] transition-all duration-500 border border-white/5">
                    <Star className="w-8 h-8 fill-current text-current" strokeWidth={1.2} />
                  </div>
                  <div className="text-5xl font-bold text-white mb-2 tracking-tighter">
                    4.9/5
                  </div>
                  <div className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                    Client Rating
                  </div>
                </div>
              </div>

              {/* Action Buttons (Monochrome) */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="https://calendar.notion.so/meet/officialbookone/call"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center justify-center px-10 py-4 bg-[#6B46C1] hover:bg-[#8B5CF6] text-white font-medium rounded-2xl transition-all duration-300 shadow-[0_0_20px_rgba(107,70,193,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Start Your Growth Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </a>

                <a
                  href="/get-started"
                  className="group inline-flex items-center justify-center px-10 py-4 bg-transparent text-white font-medium rounded-2xl transition-all duration-300 border-2 border-white/20 hover:border-white/40 hover:bg-white/5 backdrop-blur-sm shadow-sm hover:shadow-md transform hover:-translate-y-1 w-full sm:w-auto"
                >
                  Get Free Website Audit
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ForWhoSection;
