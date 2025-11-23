"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

// Sample data
const mainServices = [
  {
    id: 1,
    icon: Code,
    title: "Web Development",
    subtitle: "Custom websites & applications",
    bgGradient: "from-blue-500 to-blue-700",
    lightBg: "bg-blue-50",
    textColor: "text-blue-700",
    keyFeatures: ["React", "Next.js", "Responsive"],
    description:
      "Build powerful, scalable web applications with modern technologies that drive results for your Nigerian business.",
    services: [
      {
        title: "Custom Web Apps",
        description: "Tailored solutions for your unique business needs",
        icon: Code,
        bgColor: "bg-blue-50",
        color: "text-blue-600",
        features: ["React/Next.js", "API Integration", "Cloud Hosting"],
        impact: "3x faster load times",
      },
      {
        title: "E-commerce Solutions",
        description: "Full-featured online stores that convert",
        icon: Globe,
        bgColor: "bg-blue-50",
        color: "text-blue-600",
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
    bgGradient: "from-purple-500 to-pink-600",
    lightBg: "bg-purple-50",
    textColor: "text-purple-700",
    keyFeatures: ["Figma", "User Research", "Prototyping"],
    description:
      "Create stunning user experiences that delight customers and drive engagement.",
    services: [
      {
        title: "Interface Design",
        description: "Pixel-perfect designs that users love",
        icon: Palette,
        bgColor: "bg-purple-50",
        color: "text-purple-600",
        features: ["Mobile First", "Accessibility", "Brand Identity"],
        impact: "2x user engagement",
      },
      {
        title: "User Research",
        description: "Data-driven insights for better decisions",
        icon: BarChart3,
        bgColor: "bg-purple-50",
        color: "text-purple-600",
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
    bgGradient: "from-green-500 to-emerald-600",
    lightBg: "bg-green-50",
    textColor: "text-green-700",
    keyFeatures: ["SEO", "Content", "Analytics"],
    description:
      "Dominate search rankings and attract qualified leads with proven strategies.",
    services: [
      {
        title: "Technical SEO",
        description: "Optimize for search engines and users",
        icon: Search,
        bgColor: "bg-green-50",
        color: "text-green-600",
        features: ["Site Speed", "Schema Markup", "Core Web Vitals"],
        impact: "10x organic traffic",
      },
      {
        title: "Content Strategy",
        description: "Engaging content that ranks and converts",
        icon: MessageSquare,
        bgColor: "bg-green-50",
        color: "text-green-600",
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
    bgGradient: "from-orange-500 to-red-600",
    lightBg: "bg-orange-50",
    textColor: "text-orange-700",
    keyFeatures: ["ChatGPT", "Automation", "ML"],
    description:
      "Leverage AI to automate workflows and enhance customer experiences.",
    services: [
      {
        title: "AI Chatbots",
        description: "24/7 intelligent customer support",
        icon: Bot,
        bgColor: "bg-orange-50",
        color: "text-orange-600",
        features: ["NLP", "Multi-language", "CRM Integration"],
        impact: "80% faster response",
      },
      {
        title: "Process Automation",
        description: "Streamline operations with AI",
        icon: Zap,
        bgColor: "bg-orange-50",
        color: "text-orange-600",
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

const BookOneServices = () => {
  const [activeService, setActiveService] = useState(0);
  const [isProcessVisible, setIsProcessVisible] = useState(false);

  const sectionRefs = useRef([]);
  const processRef = useRef(null);

  // 1. SCROLL OBSERVER FOR SERVICES (The Logic Logic)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "-20% 0px -50% 0px", // Triggers when the element is near the center/top
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

    // Observe each service section
    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  // 2. SCROLL OBSERVER FOR PROCESS SECTION
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
    <main className="scroll-smooth bg-slate-50">
      {/* HEADER SECTION */}
      <div className="pt-20 pb-10 text-center px-4">
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 animate-[fadeInUp_0.6s_ease-out_forwards]">
          Complete Digital Solutions
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-[fadeInUp_0.6s_ease-out_forwards_0.2s] opacity-0">
          Everything you need to build, optimize, and grow your digital presence
          in Nigeria.
        </p>
      </div>

      {/* STICKY SCROLL CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 relative">
          {/* LEFT SIDE: STICKY INFO (Changes on Scroll) */}
          <div className="lg:w-1/3 order-1 lg:order-1">
            <div className="sticky top-24 pt-4">
              {/* We use a transition-all wrapper to smooth changes */}
              <AnimatePresence mode="wait">
                {(() => {
                  const current = mainServices[activeService];
                  const Icon = current.icon;
                  return (
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 transition-all duration-500 ease-in-out transform hover:scale-[1.02]"
                    >
                      {/* Icon */}
                      <div
                        className={`w-20 h-20 ${current.lightBg} rounded-2xl flex items-center justify-center mb-6`}
                      >
                        <Icon
                          className={`w-10 h-10 ${current.textColor.replace(
                            "text-",
                            "stroke-"
                          )}`}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Title */}
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {current.title}
                      </h3>
                      <p
                        className={`text-lg font-medium ${current.textColor} mb-6`}
                      >
                        {current.subtitle}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {current.keyFeatures.map((feat) => (
                          <span
                            key={feat}
                            className={`px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium`}
                          >
                            {feat}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-600 leading-relaxed mb-8">
                        {current.description}
                      </p>

                      <button className="w-full bg-[#6b46c1] hover:bg-[#5a37a6] text-white py-4 rounded-xl font-semibold flex items-center justify-center group transition-all duration-300">
                        Explore {current.title}
                        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT SIDE: SCROLLABLE CONTENT (Triggers the change) */}
          <div className="lg:w-2/3 order-2 lg:order-2 space-y-24 lg:space-y-32 py-4">
            {mainServices.map((service, idx) => (
              <div
                key={service.id}
                data-index={idx}
                ref={(el) => (sectionRefs.current[idx] = el)}
                className={`transition-all duration-700 ${
                  activeService === idx
                    ? "opacity-100 scale-100"
                    : "opacity-40 scale-95 blur-[2px]"
                }`}
              >
                {/* Mobile Header (Only visible on small screens to give context) */}
                <div className="lg:hidden mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {service.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {service.services.map((subItem, sIdx) => {
                    const SubIcon = subItem.icon;
                    return (
                      <motion.div
                        key={sIdx}
                        className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group cursor-pointer"
                        whileHover={{
                          scale: 1.045,
                          rotateZ: subItem.title.length % 2 === 0 ? 1.5 : -1.5,
                          boxShadow: "0 8px 32px rgba(80,80,160,0.10)",
                        }}
                        whileTap={{
                          scale: 0.98,
                          rotateZ: 0,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 24 }}
                      >
                        <motion.div
                          className={`w-12 h-12 ${subItem.bgColor} rounded-xl flex items-center justify-center mb-6`}
                          whileHover={{ scale: 1.15, rotateZ: 8 }}
                          whileTap={{ scale: 0.95, rotateZ: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <SubIcon className={`w-6 h-6 ${subItem.color}`} />
                        </motion.div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">
                          {subItem.title}
                        </h4>
                        <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                          {subItem.description}
                        </p>

                        <div className="space-y-3 pt-6 border-t border-gray-100">
                          {subItem.features.map((f) => (
                            <div
                              key={f}
                              className="flex items-center text-sm text-gray-500"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                              {f}
                            </div>
                          ))}
                        </div>

                        {subItem.impact && (
                          <motion.div
                            className="mt-6 inline-flex items-center bg-green-50 px-3 py-1 rounded-full"
                            whileHover={{ scale: 1.1 }}
                            transition={{
                              type: "spring",
                              stiffness: 250,
                              damping: 18,
                            }}
                          >
                            <TrendingUp className="w-3 h-3 text-green-600 mr-2" />
                            <span className="text-xs font-bold text-green-700">
                              {subItem.impact}
                            </span>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PROCESS SECTION */}
      <section
        ref={processRef}
        className="py-20 bg-gray-900 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 ${
              isProcessVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Our Proven Process
            </h2>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              How BookOne delivers results for your business.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative text-center transition-all duration-700`}
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
                    <div
                      className={`hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-700 -z-10`}
                    />
                  )}

                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-3xl border border-gray-700 hover:bg-gray-800 transition-colors">
                    <div className="w-20 h-20 bg-[#6b46c1] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-900/20">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {step.description}
                    </p>
                    <span className="text-xs font-mono text-[#6b46c1] bg-[#6b46c1]/10 px-2 py-1 rounded">
                      {step.duration}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </main>
  );
};

export default BookOneServices;
