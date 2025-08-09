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
  ChevronDown,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const BookOneServices = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  // Memoize service data to prevent recreation
  const websiteServices = useMemo(
    () => [
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
        features: ["Easy updates", "SEO-friendly", "Professional copywriting"],
      },
    ],
    []
  );

  const seoServices = useMemo(
    () => [
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
    []
  );

  const aiServices = useMemo(
    () => [
      {
        icon: MessageSquare,
        title: "AI Chatbots",
        description: "24/7 customer support with booking and FAQ automation",
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
        description: "Complete setup with hands-on training and documentation",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
      },
    ],
    []
  );

  const contentServices = useMemo(
    () => [
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

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <main className="scroll-smooth">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-600 via-purple-700 to-indigo-800 overflow-hidden"
        role="banner"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white to-violet-200 bg-clip-text text-transparent">
              What We Do at BookOne
            </span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform your digital presence with comprehensive solutions
            designed to grow your business
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#services"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Explore our services"
            >
              Explore Services
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
            <a
              href="/get-started"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-violet-700 transition-all duration-300"
              aria-label="Get started with a free consultation"
            >
              Get Started Free
            </a>
          </div>

          <div className="animate-bounce">
            <ChevronDown className="w-8 h-8 mx-auto opacity-70" />
          </div>
        </div>
      </section>

      {/* Services Container */}
      <div id="services">
        {/* Website Development Section */}
        <section
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-50 to-gray-100"
          aria-labelledby="website-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="text-center lg:text-left">
                <h2
                  id="website-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                >
                  Website Design & Development
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                  Fast, responsive websites built with modern technology and
                  optimized for conversions and search engines.
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8">
                  <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                    React/Next.js
                  </span>
                  <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                    95+ Lighthouse
                  </span>
                  <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-medium">
                    Mobile-First
                  </span>
                </div>
              </div>

              <div className="space-y-6">
                {websiteServices.map((service, index) => (
                  <div
                    key={service.title}
                    className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-violet-600"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-gray-500"
                        >
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Section */}
        <section
          className="py-16 lg:py-24 bg-gradient-to-br from-white to-slate-50"
          aria-labelledby="seo-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-6 order-2 lg:order-1">
                {seoServices.map((service, index) => (
                  <div
                    key={service.title}
                    className="bg-gradient-to-r from-violet-600 to-purple-700 text-white p-6 lg:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300"
                  >
                    <h3 className="text-xl lg:text-2xl font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="mb-4 leading-relaxed opacity-90">
                      {service.description}
                    </p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-green-200">
                        {service.impact}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center lg:text-right order-1 lg:order-2">
                <h2
                  id="seo-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                >
                  SEO & Performance
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                  Boost visibility and attract quality leads with data-driven
                  SEO strategies that deliver measurable results.
                </p>
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl inline-block">
                  <div className="text-3xl font-bold">95+</div>
                  <div className="text-sm opacity-90">Lighthouse Score</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Automation Section */}
        <section
          className="py-16 lg:py-24 bg-gradient-to-br from-slate-100 to-gray-200"
          aria-labelledby="ai-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="ai-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
              >
                AI Automation & Integration
              </h2>
              <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Streamline operations with intelligent AI assistants and
                automated workflows that work 24/7.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.title}
                    className="bg-white p-6 lg:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                  >
                    <div
                      className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className={`w-8 h-8 ${service.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Content Writing Section */}
        <section
          className="py-16 lg:py-24 bg-gradient-to-br from-white to-violet-50"
          aria-labelledby="content-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="space-y-8 order-2 lg:order-1">
                {contentServices.map((service, index) => (
                  <div
                    key={service.title}
                    className={`${service.bgColor} text-white p-6 lg:p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300`}
                  >
                    <h3 className="text-xl lg:text-2xl font-bold mb-4">
                      {service.title}
                    </h3>
                    <p className="mb-4 leading-relaxed opacity-90">
                      {service.description}
                    </p>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-yellow-200">
                        {service.results}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center lg:text-right order-1 lg:order-2">
                <div className="w-20 h-20 bg-violet-100 rounded-3xl flex items-center justify-center mx-auto lg:ml-auto lg:mr-0 mb-6">
                  <PenTool className="w-10 h-10 text-violet-600" />
                </div>
                <h2
                  id="content-heading"
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
                >
                  Content That Converts
                </h2>
                <p className="text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed">
                  Strategic content creation that tells your story, ranks in
                  search, and drives real business results.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section
          className="py-16 lg:py-24 bg-gradient-to-br from-gray-900 via-violet-900 to-purple-900 text-white"
          aria-labelledby="process-heading"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2
                id="process-heading"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              >
                Our Proven Process
              </h2>
              <p className="text-lg lg:text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                A transparent, collaborative approach that ensures your
                project's success from start to finish.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {processSteps.map((step, index) => {
                const IconComponent = step.icon;
                return (
                  <div key={step.title} className="relative">
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm p-6 lg:p-8 rounded-3xl hover:bg-white/20 transition-all duration-300 h-full">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-white/80 mb-4 leading-relaxed">
                        {step.description}
                      </p>
                      <div className="text-sm text-violet-200 font-medium">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="text-center mt-16">
              <Link
                href="/get-started"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-violet-700 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                aria-label="Start your project today"
              >
                Start Your Project Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookOneServices;
