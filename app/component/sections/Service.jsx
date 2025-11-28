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

// ============================================================================
// SAMPLE DATA
// ============================================================================
const mainServices = [
  {
    id: 1,
    icon: Code,
    title: "Web Development",
    subtitle: "Custom websites & applications",
    description:
      "Build powerful, scalable web applications with modern technologies that drive results for your Nigerian business. We focus on speed, security, and scalability.",
    services: [
      {
        title: "Custom Web Apps",
        description: "Tailored solutions for your unique business needs",
        icon: Code,
        features: ["React/Next.js", "API Integration", "Cloud Hosting"],
        impact: "3x faster load times",
      },
      {
        title: "E-commerce Solutions",
        description: "Full-featured online stores that convert",
        icon: Globe,
        features: ["Payment Gateway", "Inventory", "Analytics"],
        impact: "40% higher conversion",
      },
    ],
  },
  {
    id: 2,
    icon: Palette,
    title: "UI/UX Design",
    subtitle: "Beautiful, intuitive interfaces",
    description:
      "Create stunning user experiences that delight customers and drive engagement. We blend aesthetics with usability principles.",
    services: [
      {
        title: "Interface Design",
        description: "Pixel-perfect designs that users love",
        icon: Palette,
        features: ["Mobile First", "Accessibility", "Brand Identity"],
        impact: "2x user engagement",
      },
      {
        title: "User Research",
        description: "Data-driven insights for better decisions",
        icon: BarChart3,
        features: ["User Testing", "Analytics", "A/B Testing"],
        impact: "60% better UX scores",
      },
    ],
  },
  {
    id: 3,
    icon: Search,
    title: "SEO & Marketing",
    subtitle: "Get found, get customers",
    description:
      "Dominate search rankings and attract qualified leads with proven strategies. We help you rank for the keywords that actually bring money.",
    services: [
      {
        title: "Technical SEO",
        description: "Optimize for search engines and users",
        icon: Search,
        features: ["Site Speed", "Schema Markup", "Core Web Vitals"],
        impact: "10x organic traffic",
      },
      {
        title: "Content Strategy",
        description: "Engaging content that ranks and converts",
        icon: MessageSquare,
        features: ["Keyword Research", "Blog Posts", "Video Content"],
        impact: "5x more leads",
      },
    ],
  },
  {
    id: 4,
    icon: Bot,
    title: "AI Integration",
    subtitle: "Smart automation solutions",
    description:
      "Leverage AI to automate workflows and enhance customer experiences. Reduce busywork and focus on growing your business.",
    services: [
      {
        title: "AI Chatbots",
        description: "24/7 intelligent customer support",
        icon: Bot,
        features: ["NLP", "Multi-language", "CRM Integration"],
        impact: "80% faster response",
      },
      {
        title: "Process Automation",
        description: "Streamline operations with AI",
        icon: Zap,
        features: ["Workflow AI", "Data Processing", "Smart Analytics"],
        impact: "70% cost reduction",
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 0.5 });

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className="group relative overflow-hidden bg-white border border-gray-200 rounded-4xl hover:border-[#6b46c1]/50 transition-colors duration-500 shadow-sm hover:shadow-md h-full"
      onMouseMove={handleMouseMove}
    >

      {/* Grid Lines Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #000000 1px, transparent 1px), linear-gradient(to bottom, #000000 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-6 group-hover:bg-[#6b46c1] group-hover:border-[#6b46c1] transition-all duration-300">
          <Icon
            className="w-6 h-6 text-[#6b46c1] group-hover:text-white transition-colors"
            strokeWidth={1.5}
          />
        </div>

        <h4 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
          {item.title}
        </h4>
        <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
          {item.description}
        </p>

        <div className="space-y-2 mb-6">
          {item.features.map((f) => (
            <div
              key={f}
              className="flex items-center text-xs font-medium text-slate-500"
            >
              <CheckCircle className="w-3.5 h-3.5 text-green-500 mr-2" />
              {f}
            </div>
          ))}
        </div>

        {item.impact && (
          <div className="pt-4 border-t border-gray-100 group-hover:border-[#6b46c1]/10">
            <div className="inline-flex items-center bg-green-50 px-3 py-1.5 rounded-full border border-green-100">
              <TrendingUp className="w-3.5 h-3.5 text-green-600 mr-2" />
              <span className="text-xs font-bold text-green-700">
                {item.impact}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
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
    <main className="scroll-smooth bg-[#FAFAFA] font-sans selection:bg-[#6b46c1] selection:text-white">
      {/* HEADER SECTION */}
      <div className="pt-24 pb-16 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-[#6b46c1] mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b46c1]"></span>
          </span>
          Our Expertise
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
          Complete Digital Solutions
        </h2>
        <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
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
                        <span className="text-[#6b46c1] font-mono text-sm mb-6 block tracking-wider font-bold">
                          0{current.id} / SERVICE
                        </span>

                        {/* Title */}
                        <h3 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight leading-[1.1]">
                          {current.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-xl font-medium text-slate-400 mb-8 italic">
                          — {current.subtitle}
                        </p>

                        {/* Icon - Decorative Large */}
                        <div className="w-24 h-24 bg-white border border-gray-100 rounded-3xl flex items-center justify-center shadow-lg shadow-purple-900/5">
                          <Icon
                            className="w-12 h-12 text-[#6b46c1]"
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
                  <span className="text-[#6b46c1] font-mono text-xs mb-2 block font-bold">
                    0{service.id}
                  </span>
                  <h3 className="text-3xl font-bold text-slate-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-slate-400 italic">{service.subtitle}</p>
                </div>

                {/* Description (Information) */}
                <div className="prose prose-lg max-w-none mb-12">
                  <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
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
        className="py-24 bg-white border-t border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div
            className={`text-center mb-20 transition-all duration-1000 ${
              isProcessVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Our Proven Process
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              A transparent, collaborative approach built for speed and impact.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="relative transition-all duration-700"
                  style={{
                    opacity: isProcessVisible ? 1 : 0,
                    transform: isProcessVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                    transitionDelay: `${index * 150}ms`,
                  }}
                >
                  {/* Connector Line (Desktop) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-[1px] bg-gray-200 -z-10" />
                  )}

                  <div className="relative group">
                    <div className="w-20 h-20 bg-white border border-gray-200 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:border-[#6b46c1] group-hover:shadow-md transition-all duration-300 relative z-10">
                      <Icon
                        className="w-10 h-10 text-[#6b46c1]"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="text-center">
                      <h3 className="text-lg font-bold text-slate-900 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-500 text-sm mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <span className="inline-block text-xs font-bold text-[#6b46c1] bg-[#6b46c1]/5 px-3 py-1 rounded-full border border-[#6b46c1]/10">
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
