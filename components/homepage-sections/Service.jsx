"use client";

import { useMemo, useState } from "react";
import {
  MessageSquare,
  RefreshCw,
  ExternalLink,
  BarChart3,
  Target,
  DollarSign,
  Zap,
  Rocket,
  PenTool,
  CheckCircle,
  ArrowRight,
  Code,
  Search,
  Bot,
  FileText,
  Star,
  Users,
  Award,
} from "lucide-react";
import Link from "next/link";

const BookOneServices = () => {
  const [activeService, setActiveService] = useState(0);

  // Main service categories with comprehensive data
  const mainServices = useMemo(
    () => [
      {
        id: "website",
        icon: Code,
        title: "Website Design & Development",
        subtitle: "Modern, fast, conversion-optimized",
        color: "violet",
        bgGradient: "from-violet-500 to-purple-600",
        lightBg: "bg-violet-50",
        textColor: "text-violet-600",
        description:
          "Fast, responsive websites built with modern technology and optimized for conversions and search engines.",
        keyFeatures: ["React/Next.js", "95+ Lighthouse", "Mobile-First"],
        services: [
          {
            title: "Modern & Responsive Design",
            description:
              "Mobile-first, accessible design that works on all devices and screen sizes",
            features: [
              "Mobile-optimized",
              "Fast loading",
              "Cross-browser compatible",
            ],
          },
          {
            title: "SEO & Performance Optimized",
            description:
              "Built for speed and search engines with 95+ Lighthouse scores",
            features: [
              "Core Web Vitals optimized",
              "Schema markup",
              "Image optimization",
            ],
          },
          {
            title: "Content Management System",
            description:
              "User-friendly CMS with professional content writing included",
            features: [
              "Easy updates",
              "SEO-friendly",
              "Professional copywriting",
            ],
          },
        ],
      },
      {
        id: "seo",
        icon: Search,
        title: "SEO & Performance",
        subtitle: "Data-driven visibility growth",
        color: "emerald",
        bgGradient: "from-emerald-500 to-green-600",
        lightBg: "bg-emerald-50",
        textColor: "text-emerald-600",
        description:
          "Boost visibility and attract quality leads with data-driven SEO strategies that deliver measurable results.",
        keyFeatures: [
          "Strategic Research",
          "Technical Audits",
          "Performance Analytics",
        ],
        services: [
          {
            title: "Strategic Keyword Research",
            description:
              "Data-driven keyword strategy targeting your ideal customers",
            impact: "3x more qualified traffic",
          },
          {
            title: "Technical SEO Audit",
            description:
              "Complete site optimization for speed and search visibility",
            impact: "50% faster load times",
          },
          {
            title: "Performance Analytics",
            description:
              "Monthly reports with actionable insights and recommendations",
            impact: "Track ROI and growth",
          },
        ],
      },
      {
        id: "ai",
        icon: Bot,
        title: "AI Automation & Integration",
        subtitle: "24/7 intelligent workflows",
        color: "blue",
        bgGradient: "from-blue-500 to-cyan-600",
        lightBg: "bg-blue-50",
        textColor: "text-blue-600",
        description:
          "Streamline operations with intelligent AI assistants and automated workflows that work 24/7.",
        keyFeatures: ["AI Chatbots", "Smart Workflows", "System Integrations"],
        services: [
          {
            icon: MessageSquare,
            title: "AI Chatbots",
            description:
              "24/7 customer support with booking and FAQ automation",
            color: "text-blue-600",
            bgColor: "bg-blue-50",
          },
          {
            icon: RefreshCw,
            title: "Smart Workflows",
            description: "Automated lead nurturing and appointment reminders",
            color: "text-green-600",
            bgColor: "bg-green-50",
          },
          {
            icon: ExternalLink,
            title: "System Integrations",
            description:
              "Connect WhatsApp, CRM, email, and business tools seamlessly",
            color: "text-purple-600",
            bgColor: "bg-purple-50",
          },
          {
            icon: BarChart3,
            title: "Training & Support",
            description:
              "Complete setup with hands-on training and documentation",
            color: "text-orange-600",
            bgColor: "bg-orange-50",
          },
        ],
      },
      {
        id: "content",
        icon: FileText,
        title: "Content That Converts",
        subtitle: "Strategic storytelling & copy",
        color: "purple",
        bgGradient: "from-purple-500 to-indigo-600",
        lightBg: "bg-purple-50",
        textColor: "text-purple-600",
        description:
          "Strategic content creation that tells your story, ranks in search, and drives real business results.",
        keyFeatures: ["Converting Copy", "SEO Content", "Brand Voice"],
        services: [
          {
            title: "Website Copy That Converts",
            description:
              "Persuasive homepage, about, and service pages that turn visitors into customers",
            bgColor: "bg-gradient-to-br from-violet-600 to-purple-700",
            results: "Up to 40% higher conversion rates",
          },
          {
            title: "SEO Content Strategy",
            description:
              "Blog articles and landing pages optimized to rank and attract your audience",
            bgColor: "bg-gradient-to-br from-purple-600 to-indigo-700",
            results: "300% increase in organic traffic",
          },
          {
            title: "Brand Voice Development",
            description:
              "Consistent messaging that reflects your unique personality across all channels",
            bgColor: "bg-gradient-to-br from-indigo-600 to-violet-700",
            results: "Stronger brand recognition",
          },
        ],
      },
    ],
    []
  );

  const processSteps = useMemo(
    () => [
      {
        icon: Target,
        title: "Discovery & Strategy",
        description:
          "Deep dive into your goals, target audience, and competitive landscape",
        duration: "1-2 days",
      },
      {
        icon: DollarSign,
        title: "Proposal & Agreement",
        description:
          "Transparent pricing, detailed timeline, and clear project scope",
        duration: "1 day",
      },
      {
        icon: Zap,
        title: "Design & Development",
        description:
          "Collaborative creation process with regular updates and feedback loops",
        duration: "2-4 weeks",
      },
      {
        icon: Rocket,
        title: "Launch & Optimization",
        description:
          "Deployment, testing, training, and ongoing performance monitoring",
        duration: "1 week + ongoing",
      },
    ],
    []
  );

  const stats = [
    { icon: Users, label: "Happy Clients", value: "100+" },
    { icon: Award, label: "Projects Completed", value: "100+" },
    { icon: Star, label: "5-Star Reviews", value: "98%" },
  ];

  return (
    <main className="scroll-smooth">
      {/* Hero Section */}
    

      {/* Main Services Overview */}
      <section
        id="services"
        className="py-20 bg-gradient-to-br from-slate-50 to-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete Digital Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to build, optimize, and grow your digital
              presence
            </p>
          </div>

          {/* Service Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setActiveService(index)}
                >
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${service.bgGradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.subtitle}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.keyFeatures.map((feature) => (
                      <span
                        key={feature}
                        className={`px-2 py-1 ${service.lightBg} ${service.textColor} rounded-full text-xs font-medium`}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  <div
                    className={`w-full h-1 bg-gradient-to-r ${service.bgGradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                </div>
              );
            })}
          </div>

          {/* Detailed Service View */}
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100">
            <div className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center  mb-6">
                    {(() => {
                      const IconComponent = mainServices[activeService].icon;
                      return (
                        <div
                          className={`w-16 h-16 bg-gradient-to-r ${mainServices[activeService].bgGradient} rounded-2xl flex items-center justify-center mr-4`}
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

                  <Link
                    href="/get-started"
                    className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${mainServices[activeService].bgGradient} text-white font-semibold rounded-full hover:scale-105 transition-transform duration-300 shadow-lg`}
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                <div className="space-y-4">
                  {mainServices[activeService].services.map((item, index) => (
                    <div
                      key={item.title}
                      className="bg-gray-50 p-6 rounded-2xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start">
                        {item.icon &&
                          (() => {
                            const ItemIcon = item.icon;
                            return (
                              <div
                                className={`w-10 h-10 ${item.bgColor} rounded-xl flex items-center justify-center mr-4 mt-1 flex-shrink-0`}
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
                            <div className="flex flex-wrap gap-2">
                              {item.features.map((feature) => (
                                <span
                                  key={feature}
                                  className="flex items-center text-xs text-gray-500"
                                >
                                  <CheckCircle className="w-3 h-3 text-green-500 mr-1" />
                                  {feature}
                                </span>
                              ))}
                            </div>
                          )}

                          {item.impact && (
                            <div className="flex items-center mt-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                              <span className="text-xs font-medium text-green-600">
                                {item.impact}
                              </span>
                            </div>
                          )}

                          {item.results && (
                            <div className="flex items-center mt-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2" />
                              <span className="text-xs font-medium text-yellow-600">
                                {item.results}
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

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-violet-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
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
                <div key={step.title} className="relative text-center">
                  {/* Step connector line */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-violet-500 to-transparent z-0" />
                  )}

                  <div className="relative z-10 bg-white/10 backdrop-blur-sm p-6 rounded-3xl hover:bg-white/20 transition-all duration-300">
                    <div className="w-16 h-16 bg-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                      <IconComponent className="w-8 h-8 text-white" />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white text-violet-600 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                    <p className="text-white/80 text-sm mb-3 leading-relaxed">
                      {step.description}
                    </p>
                    <div className="text-xs text-violet-200 font-medium">
                      {step.duration}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <Link
              href="/get-started"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              Start Your Project Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default BookOneServices;
