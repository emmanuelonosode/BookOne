"use client";
import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Palette,
  Search,
  TrendingUp,
  Globe,
  Zap,
  BarChart3,
  MessageSquare,
  Bot,
} from "lucide-react";

import { SpotlightCard } from "../ui/SpotlightCard";
import { NeonIcon } from "../ui/NeonIcon";
import { AnimatedGrid } from "../ui/AnimatedGrid";

// ============================================================================
// SAMPLE DATA
// ============================================================================
const mainServices = [
  {
    id: 1,
    icon: Code,
    title: "Engineered for Conversion",
    subtitle: "High-performance web applications",
    description:
      "Stop losing customers to slow load times and confusing layouts. We engineer scalable web applications with advanced architectures that load instantly and drive actual business results.",
    services: [
      {
        title: "Web Apps & Platforms",
        description: "Tailored software that solves operational bottlenecks.",
        icon: Code,
        features: ["React/Next.js ecosystem", "Custom API Integrations", "Scalable Cloud Architecture"],
        impact: "Sub-second load times",
      },
      {
        title: "E-commerce Architecture",
        description: "Shopping experiences designed strictly for maximizing revenue.",
        icon: Globe,
        features: ["Frictionless Checkout", "Inventory Syncing", "Advanced Analytics"],
        impact: "Proven conversion lifts",
      },
    ],
  },
  {
    id: 2,
    icon: Palette,
    title: "Strategic UI/UX",
    subtitle: "Interfaces that build trust instantly",
    description:
      "First impressions dictate your revenue. We design premium, conversion-focused user interfaces that establish immediate authority and guide users effortlessly toward checkout or contact.",
    services: [
      {
        title: "Brand-Centric Interface Design",
        description: "Pixel-perfect visual design that elevates your brand perception.",
        icon: Palette,
        features: ["Psychology-driven layouts", "Flawless mobile experiences", "Accessible design systems"],
        impact: "Higher time-on-page",
      },
      {
        title: "Conversion Rate Optimization",
        description: "Data-backed design decisions to plug leaks in your funnel.",
        icon: BarChart3,
        features: ["User behavior heatmaps", "A/B split testing", "Friction point analysis"],
        impact: "Lower bounce rates",
      },
    ],
  },
  {
    id: 3,
    icon: Search,
    title: "Search Dominance",
    subtitle: "Capture high-intent traffic",
    description:
      "Don't rely just on paid ads. We engineer your digital presence to dominate search engine results for high-value keywords, turning organic traffic into your most profitable acquisition channel.",
    services: [
      {
        title: "Technical SEO Infrastructure",
        description: "Building the foundation Google loves to crawl and index.",
        icon: Search,
        features: ["Core Web Vitals mastery", "Advanced Schema Markup", "Site architecture optimization"],
        impact: "Top-tier search rankings",
      },
      {
        title: "Authority Content Strategy",
        description: "Targeted content that answers questions and captures leads.",
        icon: MessageSquare,
        features: ["Gap analysis", "High-intent keyword targeting", "Semantic clustering"],
        impact: "Sustainable inbound leads",
      },
    ],
  },
  {
    id: 4,
    icon: Bot,
    title: "Automate the Mundane",
    subtitle: "AI-driven operational efficiency",
    description:
      "Free your team from repetitive busywork. We deploy intelligent AI workflows that handle customer inquiries, process data, and streamline your operations 24/7 without breaking a sweat.",
    services: [
      {
        title: "Intelligent AI Assistants",
        description: "Always-on conversational agents that actually understand context.",
        icon: Bot,
        features: ["Custom trained LLMs", "CRM deep integrations", "Multi-platform deployment"],
        impact: "Instant lead qualification",
      },
      {
        title: "Workflow Orchestration",
        description: "Connecting your software stack to run on autopilot.",
        icon: Zap,
        features: ["Zapier/Make automation", "Data syncing", "Automated reporting"],
        impact: "Thousands of hours saved",
      },
    ],
  },
];

const processSteps = [
  {
    title: "Discovery",
    description: "Understanding your goals, audience, and requirements",
    icon: Search,
    duration: "1-2 weeks",
  },
  {
    title: "Strategy",
    description: "Creating a roadmap tailored to your success",
    icon: BarChart3,
    duration: "1 week",
  },
  {
    title: "Development",
    description: "Building your solution with cutting-edge tech",
    icon: Code,
    duration: "4-8 weeks",
  },
  {
    title: "Launch",
    description: "Deploying and optimizing for maximum impact",
    icon: TrendingUp,
    duration: "1 week",
  },
];

// ============================================================================
// GLOW CARD COMPONENT (Applied to Sub-Services)
// ============================================================================
const SubServiceCard = ({ item }) => {
  const Icon = item.icon;
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  
  const rotateX = useMotionTemplate`${mouseYSpring}deg`;
  const rotateY = useMotionTemplate`${mouseXSpring}deg`;

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const rect = currentTarget.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = clientX - rect.left;
    const mouseY = clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct * 15); // max rotation 15deg
    y.set(yPct * -15);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="h-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <SpotlightCard className="h-full flex flex-col group/card">
        {/* Animated Grid Background visible on hover */}
        <AnimatedGrid className="opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />

        <div 
          className="relative z-10 p-8 h-full flex flex-col"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="mb-6">
            <NeonIcon icon={Icon} color="purple" />
          </div>

          <h4 className="text-xl font-bold text-white mb-3 tracking-tight">
          {item.title}
        </h4>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
          {item.description}
        </p>

        <div className="space-y-3 mb-6 relative">
          {item.features.map((f, i) => (
            <div
              key={f}
              className="flex items-center text-xs font-medium text-slate-400 group-hover/card:text-slate-300 transition-colors"
            >
              <div className="relative mr-3 flex-shrink-0">
                <div className="absolute inset-0 bg-green-500/20 blur-sm rounded-full group-hover/card:scale-[2] transition-transform duration-500"></div>
                <CheckCircle className="w-4 h-4 text-green-400 relative z-10" />
              </div>
              {f}
            </div>
          ))}
        </div>

        {item.impact && (
          <div className="pt-4 mt-auto border-t border-white/10 group-hover/card:border-[#6b46c1]/30 transition-colors">
            <div className="inline-flex items-center bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)] group-hover/card:shadow-[0_0_15px_rgba(34,197,94,0.2)] transition-shadow">
              <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-xs font-bold text-green-400">
                {item.impact}
              </span>
            </div>
          </div>
        )}
      </div>
      </SpotlightCard>
    </motion.div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
const BookOneServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isProcessVisible, setIsProcessVisible] = useState(false);

  const sectionRefs = useRef([]);
  const processRef = useRef(null);

  // Scroll Observer for Services
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -50% 0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          setActiveService(index);
        }
      });
    }, options);

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // Scroll Observer for Process
  useEffect(() => {
    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsProcessVisible(true);
        });
      },
      { threshold: 0.2 }
    );

    if (processRef.current) processObserver.observe(processRef.current);
    return () => processObserver.disconnect();
  }, []);

  return (
    <main className="scroll-smooth bg-[#0B0B0E] font-sans selection:bg-[#6b46c1] selection:text-white">
      {/* HEADER SECTION */}
      <div className="pt-24 pb-16 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A24]/60 backdrop-blur-md border border-white/10 shadow-sm text-sm font-medium text-[#A78BFA] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B5CF6]"></span>
          </span>
          Our Expertise
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-[1.1]">
          Complete Digital Solutions
        </h2>
        <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
          Everything you need to build, optimize, and grow your digital presence
          in Nigeria and beyond.
        </p>
      </div>

      {/* STICKY SCROLL CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 relative">
          {/* LEFT SIDE: STICKY SERVICE IDENTITY */}
          <div className="lg:w-1/3 order-1 lg:order-1">
            <div className="sticky top-32 pt-4">
              <AnimatePresence mode="wait">
                {(() => {
                  const current = mainServices[activeService];
                  const Icon = current.icon;
                  return (
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.4 }}
                      className="bg-transparent"
                    >
                      <div className="relative z-10">
                        {/* Service Index */}
                        <span className="text-[#A78BFA] font-mono text-sm mb-6 block tracking-wider font-bold">
                          0{current.id} / SERVICE
                        </span>

                        {/* Title */}
                        <h3 className="text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight leading-[1.1]">
                          {current.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-xl font-medium text-slate-400 mb-8 italic">
                          — {current.subtitle}
                        </p>

                        {/* Icon - Decorative Large */}
                        <div className="w-24 h-24 bg-[#1A1A24]/80 backdrop-blur-md border border-white/10 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-500/10">
                          <Icon
                            className="w-12 h-12 text-[#A78BFA]"
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: SCROLLABLE INFORMATION */}
          <div className="lg:w-2/3 order-2 lg:order-2 py-4">
            {mainServices.map((service, idx) => (
              <div
                key={service.id}
                data-index={idx}
                ref={(el) => (sectionRefs.current[idx] = el)}
                className={`transition-all duration-700 mb-32 lg:mb-40 ${
                  activeService === idx
                    ? "opacity-100"
                    : "opacity-30 blur-[2px]"
                }`}
              >
                {/* Mobile Section Header (Visible only on mobile) */}
                <div className="lg:hidden mb-8">
                  <span className="text-[#A78BFA] font-mono text-xs mb-2 block font-bold">
                    0{service.id}
                  </span>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 italic">{service.subtitle}</p>
                </div>

                {/* Description (Information) */}
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Sub Service Cards Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {service.services.map((subItem, sIdx) => (
                    <SubServiceCard key={sIdx} item={subItem} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS SECTION */}
      <section
        ref={processRef}
        className="py-24 bg-[#0B0B0E] border-t border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isProcessVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Our Proven Process
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              A transparent, collaborative approach built for speed and impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
            {/* Animated Connector Line (Desktop) */}
            <div className="hidden lg:block absolute top-[2.5rem] left-0 right-0 h-[2px] bg-white/5 -z-10 overflow-hidden rounded-full">
               <motion.div 
                 className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent"
                 animate={{ left: ["-20%", "120%"] }}
                 transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
               />
            </div>
            
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative transition-all duration-700 group/process"
                  style={{
                    opacity: isProcessVisible ? 1 : 0,
                    transform: isProcessVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  <div className="relative">
                    <div className="w-20 h-20 bg-[#1A1A24]/60 backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover/process:border-[#8B5CF6]/50 group-hover/process:shadow-[0_0_25px_rgba(139,92,246,0.3)] group-hover/process:-translate-y-2 transition-all duration-500 relative z-10">
                      <NeonIcon icon={Icon} color="blue" />
                    </div>

                    <div className="text-center group-hover/process:translate-y-1 transition-transform duration-500">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover/process:text-[#A78BFA] transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 text-sm mb-4 leading-relaxed group-hover/process:text-slate-300 transition-colors">
                        {step.description}
                      </p>
                      <span className="inline-block text-xs font-bold text-[#A78BFA] bg-[#6B46C1]/10 px-3 py-1 rounded-full border border-[#8B5CF6]/30 shadow-[0_0_10px_rgba(139,92,246,0.1)] group-hover/process:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all">
                        {step.duration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookOneServices;
