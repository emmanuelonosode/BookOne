"use client";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  CheckCircle,
  Code,
  Palette,
  Search,
  TrendingUp,
  Globe,
  Smartphone,
  Zap,
  BarChart3,
  MessageSquare,
  Bot,
} from "lucide-react";

// Sample data (replace with your actual data)
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
      "Build powerful, scalable web applications with modern technologies that drive results.",
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
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [isProcessVisible, setIsProcessVisible] = useState(false);
  const detailRef = useRef(null);
  const processRef = useRef(null);

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const detailObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsDetailVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const processObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsProcessVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentDetailRef = detailRef.current;
    const currentProcessRef = processRef.current;

    if (currentDetailRef) {
      detailObserver.observe(currentDetailRef);
    }

    if (currentProcessRef) {
      processObserver.observe(currentProcessRef);
    }

    return () => {
      if (currentDetailRef) {
        detailObserver.unobserve(currentDetailRef);
      }
      if (currentProcessRef) {
        processObserver.unobserve(currentProcessRef);
      }
      detailObserver.disconnect();
      processObserver.disconnect();
    };
  }, []);

  // Animate detail view when active service changes
  useEffect(() => {
    if (isDetailVisible) {
      setIsDetailVisible(false);
      const timer = setTimeout(() => setIsDetailVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [activeService]);

  return (
    <main className="scroll-smooth">
      {/* Main Services Overview */}
      <section
        id="services"
        className="py-20 bg-gradient-to-br from-slate-50 to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Animated Header */}
          <div className="text-center mb-16 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, optimize, and grow your digital
              presence
            </p>
          </div>

          {/* Service Cards Grid with Staggered Animation */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards] group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setActiveService(index)}
                >
                  {/* Active indicator */}
                  {activeService === index && (
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl opacity-20 animate-pulse" />
                  )}

                  <div className="relative">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${service.bgGradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {service.keyFeatures.map((feature, idx) => (
                        <span
                          key={feature}
                          className={`px-2 py-1 ${service.lightBg} ${service.textColor} rounded-full text-xs font-medium transform transition-all duration-300 hover:scale-110`}
                          style={{
                            animation: `fadeIn 0.4s ease-out forwards`,
                            animationDelay: `${index * 0.1 + idx * 0.05}s`,
                            opacity: 0,
                          }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <div
                      className={`w-full h-1 bg-gradient-to-r ${
                        service.bgGradient
                      } rounded-full transition-all duration-500 ${
                        activeService === index
                          ? "opacity-100 scale-x-100"
                          : "opacity-0 scale-x-0"
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Service View with Scroll Animation */}
          <div
            ref={detailRef}
            className={`bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100 transform transition-all duration-1000 ease-out ${
              isDetailVisible
                ? "opacity-100 translate-y-0 scale-100"
                : "opacity-0 translate-y-12 scale-95"
            }`}
          >
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Column - Service Header */}
                <div
                  className={`transition-all duration-700 delay-100 ${
                    isDetailVisible
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-8"
                  }`}
                >
                  <div className="flex items-center mb-6">
                    {(() => {
                      const IconComponent = mainServices[activeService].icon;
                      return (
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${mainServices[activeService].bgGradient} rounded-2xl flex items-center justify-center mr-4 animate-[scaleIn_0.5s_ease-out]`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                      );
                    })()}
                    <div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-1">
                        {mainServices[activeService].title}
                      </h3>
                      <p className="text-gray-600">
                        {mainServices[activeService].subtitle}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {mainServices[activeService].description}
                  </p>

                  <button
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${mainServices[activeService].bgGradient} text-white font-semibold rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 shadow-lg group`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* Right Column - Service Details */}
                <div className="space-y-4">
                  {mainServices[activeService].services.map((item, index) => (
                    <div
                      key={item.title}
                      className={`bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-all duration-500 hover:scale-[1.02] hover:shadow-md ${
                        isDetailVisible
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-8"
                      }`}
                      style={{
                        transitionDelay: `${200 + index * 100}ms`,
                      }}
                    >
                      <div className="flex items-start">
                        {item.icon &&
                          (() => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center mr-4 mt-1 flex-shrink-0 transition-all duration-300 hover:scale-110 hover:rotate-6`}
                              >
                                <ItemIcon className={`w-5 h-5 ${item.color}`} />
                              </div>
                            );
                          })()}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3">
                            {item.description}
                          </p>

                          {item.features && (
                            <div className="flex flex-wrap gap-2 mb-2">
                              {item.features.map((feature, idx) => (
                                <span
                                  key={feature}
                                  className="flex items-center text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                  style={{
                                    animation: `fadeIn 0.4s ease-out forwards`,
                                    animationDelay: `${
                                      400 + index * 100 + idx * 50
                                    }ms`,
                                    opacity: 0,
                                  }}
                                >
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}

                          {item.impact && (
                            <div className="flex items-center mt-2 group/impact">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 group-hover/impact:scale-150 transition-transform duration-300" />
                              <span className="text-xs font-medium text-green-600 group-hover/impact:text-green-700 transition-colors duration-200">
                                {item.impact}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section with Animations */}
      <section
        ref={processRef}
        className="py-20 bg-gradient-to-br from-gray-900 via-violet-900 to-purple-900 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isProcessVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Our Proven Process
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              A transparent, collaborative approach that ensures your project's
              success
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.title}
                  className={`relative text-center transform transition-all duration-700 ${
                    isProcessVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Animated connector line */}
                  {index < processSteps.length - 1 && (
                    <div
                      className={`hidden lg:block absolute top-8 left-full h-0.5 bg-gradient-to-r from-violet-500 to-transparent z-0 transition-all duration-1000 ${
                        isProcessVisible
                          ? "w-full opacity-100"
                          : "w-0 opacity-0"
                      }`}
                      style={{ transitionDelay: `${index * 150 + 300}ms` }}
                    />
                  )}

                  <div className="relative z-10 bg-white/10 backdrop-blur-sm p-6 rounded-3xl hover:bg-white/20 hover:scale-105 transition-all duration-500 group">
                    <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 relative group-hover:bg-violet-500 group-hover:rotate-6 transition-all duration-500">
                      <IconComponent className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-violet-600 rounded-full flex items-center justify-center text-sm font-bold group-hover:scale-125 transition-transform duration-300">
                        {index + 1}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3 group-hover:text-violet-200 transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-white/80 text-sm mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="text-xs text-violet-200 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {step.duration}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={`text-center transform transition-all duration-1000 ${
              isProcessVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-12"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-700 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg group">
              Start Your Project Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

        @keyframes scaleIn {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes expandWidth {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </main>
  );
};

export default BookOneServices;
