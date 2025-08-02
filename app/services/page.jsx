// NO "use client"; - this will be a Server Component

import React, { useMemo, useCallback } from "react";
import Link from "next/link";
import { generateMetaTags } from "../seo-config"; // Assuming seo-config is server-compatible
import { Star } from "lucide-react";

// Add caching configuration
export const revalidate = 3600; // Revalidate every hour

export const metadata = generateMetaTags({
  title: "Our Services - Web Design, SEO & AI Automation | BookOne",
  description:
    "Discover BookOne's comprehensive digital services including web design, SEO optimization, AI automation, and custom solutions. Transform your business online.",
  url: "/services",
  keywords: [
    "web design services",
    "SEO services",
    "AI automation",
    "website optimization",
    "content writing",
    "custom solutions",
    "digital marketing",
    "business automation",
  ],
});

// Main ServicesPage component for BookOne website
const ServicesPage = () => {
  // Memoize data arrays for better performance
  const stats = useMemo(
    () => [
      { value: "50+", label: "Projects Completed", color: "text-blue-600" },
      { value: "98%", label: "Client Satisfaction", color: "text-purple-600" },
      { value: "24/7", label: "Support Available", color: "text-green-600" },
      {
        value: "5",
        label: "Average Rating",
        color: "text-indigo-600",
        icon: true,
      },
    ],
    []
  );

  const webDesignFeatures = useMemo(
    () => [
      "Custom Design",
      "Mobile-First",
      "E-commerce",
      "CMS Integration",
      "SEO Ready",
      "Fast Loading",
    ],
    []
  );

  const services = useMemo(
    () => [
      {
        title: "AI Business Automation",
        description:
          "Streamline operations with intelligent automation that saves time and reduces costs.",
        icon: "M13 10V7a1 1 0 10-2 0v3l-.293-.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L13 10z",
        features: [
          "Workflow Automation",
          "AI Chatbots",
          "Data Analytics",
          "Process Optimization",
        ],
        badge: "TRENDING",
        badgeColor: "from-orange-500 to-red-500",
        ctaText: "Automate Now",
      },
      {
        title: "SEO & Digital Marketing",
        description:
          "Boost your online visibility and drive qualified traffic that converts into customers.",
        icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
        features: [
          "Keyword Research",
          "On-Page SEO",
          "Link Building",
          "Content Strategy",
        ],
        badge: "HIGH ROI",
        badgeColor: "from-green-500 to-emerald-500",
        ctaText: "Boost Rankings",
      },
      {
        title: "Website Optimization",
        description:
          "Maximize performance and user experience for higher conversions and better rankings.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        features: [
          "Speed Optimization",
          "Core Web Vitals",
          "UX/UI Audit",
          "Conversion Rate",
        ],
        badge: "PERFORMANCE",
        badgeColor: "from-blue-500 to-cyan-500",
        ctaText: "Optimize Now",
      },
      {
        title: "Content & Copywriting",
        description:
          "Engage your audience with compelling content that drives action and builds trust.",
        icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
        features: [
          "Blog Writing",
          "Web Copy",
          "Email Campaigns",
          "Social Media",
        ],
        badge: "CREATIVE",
        badgeColor: "from-purple-500 to-pink-500",
        ctaText: "Get Content",
      },
      {
        title: "Custom Solutions",
        description:
          "Tailored digital solutions designed specifically for your unique business needs.",
        icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
        features: [
          "Bespoke Development",
          "API Integration",
          "System Design",
          "Consulting",
        ],
        badge: "ENTERPRISE",
        badgeColor: "from-indigo-500 to-purple-500",
        ctaText: "Discuss Project",
      },
    ],
    []
  );

  const trustFeatures = useMemo(
    () => [
      {
        title: "Guaranteed Results",
        description: "30-day money-back guarantee on all our services.",
        icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
        gradient: "from-green-400 to-blue-500",
      },
      {
        title: "Lightning Fast",
        description: "Most projects delivered within 2-4 weeks.",
        icon: "M13 10V3L4 14h7v7l9-11h-7z",
        gradient: "from-purple-400 to-pink-500",
      },
      {
        title: "24/7 Support",
        description: "Round-the-clock support for all your needs.",
        icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z",
        gradient: "from-orange-400 to-red-500",
      },
    ],
    []
  );

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-22 md:py-22 px-4 sm:px-6 lg:px-8 font-inter relative overflow-hidden">
        {/* Reduced background decorative elements for better performance */}
        <div className="absolute top-10 left-10 w-48 h-48 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-element"></div>
        <div
          className="absolute top-20 right-10 w-48 h-48 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 floating-element"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6 animate-pulse-subtle">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by 50+ businesses worldwide
            </div>

            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              <span className="gradient-text">Transform Your</span>
              <br />
              <span className="text-slate-800">Digital Presence</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              From stunning web designs to AI-powered automation, we deliver
              comprehensive digital solutions that drive growth, increase
              conversions, and streamline your operations.
            </p>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center animate-slide-in-left"
                  style={{ "--card-index": `${index * 0.1}s` }}
                >
                  <div
                    className={`text-3xl font-bold ${stat.color} mb-2 flex items-center justify-center`}
                  >
                    {stat.icon ? (
                      <>
                        <span className="mr-1">{stat.value}</span>
                        <Star className="w-6 h-6 fill-current" />
                      </>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {/* Featured Service - Web Design */}
            <div
              className="lg:col-span-2 glass-effect rounded-3xl p-6 md:p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 service-card animate-fade-in-up border-l-4 border-blue-500"
              style={{ "--card-index": "0s" }}
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
                      Web Design & Development
                    </h2>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                  <p className="text-base text-slate-600 mb-6 leading-relaxed">
                    Create stunning, conversion-focused websites that captivate
                    your audience and drive results. From responsive design to
                    e-commerce solutions, we build digital experiences that
                    work.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    {webDesignFeatures.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-slate-700"
                      >
                        <svg
                          className="w-4 h-4 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/get-started"
                      className="flex-1"
                      aria-label="Get started - View pricing and begin your project"
                    >
                      <button className="w-full border-2 border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all duration-300">
                        Start Your Project
                      </button>
                    </Link>
                    <Link
                      href="/portfolio"
                      className="flex-1"
                      aria-label="View our portfolio of work"
                    >
                      <button className="w-full border-2 border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all duration-300">
                        View Portfolio
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Other Services */}
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} cardIndex={index + 1} />
            ))}
          </div>

          {/* Trust Section */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              Why Choose BookOne?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="glass-effect rounded-2xl p-6 shadow-lg"
                >
                  <div
                    className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <svg
                      className="w-7 h-7 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={feature.icon}
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center glass-effect rounded-3xl p-8 md:p-10 shadow-2xl animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-slate-600 mb-6 max-w-2xl mx-auto">
              Join hundreds of successful businesses who've accelerated their
              growth with BookOne's digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
              <Link
                href="https://calendar.notion.so/meet/officialbookone/call"
                className="flex-1"
                aria-label="Get free consultation - Schedule a call with our team"
              >
                <button className="w-full border-2 border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all duration-300">
                  Get Free Consultation
                </button>
              </Link>
              <Link
                href="/get-started"
                className="flex-1"
                aria-label="Get started - View pricing and begin your project"
              >
                <button className="w-full border-2 border-slate-300 text-slate-700 font-semibold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all duration-300">
                  Get Started
                </button>
              </Link>
            </div>
            <p className="text-sm text-slate-500 mt-4">
              No commitment required • Free 30-minute consultation
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Enhanced ServiceCard component (can remain here, as it's rendered by ServicesPage)
const ServiceCard = ({
  title,
  description,
  icon,
  features,
  badge,
  badgeColor,
  cardIndex,
  ctaText = "Get Started",
}) => {
  // Pass animation-delay as a CSS custom property (string with unit)
  const animationDelay = `${cardIndex * 0.1}s`;

  return (
    <div
      className="glass-effect rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 service-card animate-fade-in-up border-l-4 border-slate-300 hover:border-blue-500 group"
      style={{ "--card-index": animationDelay }} // Pass as a string with unit
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${
            badgeColor || "from-blue-500 to-purple-600"
          } rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
        >
          <svg
            className="w-7 h-7 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={icon}
            />
          </svg>
        </div>
        {badge && (
          <span
            className={`px-3 py-1 bg-gradient-to-r ${badgeColor} text-white text-xs font-bold rounded-full animate-pulse-subtle`}
          >
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>

      <p className="text-slate-600 mb-4 leading-relaxed text-sm">
        {description}
      </p>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center text-sm text-slate-700">
            <svg
              className="w-3 h-3 text-green-500 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            {feature}
          </div>
        ))}
      </div>

      <Link
        href="/get-started"
        aria-label={`${ctaText} - Get started with ${title}`}
      >
        <button className="w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105 group-hover:shadow-xl">
          {ctaText}
        </button>
      </Link>
    </div>
  );
};

export default ServicesPage;
