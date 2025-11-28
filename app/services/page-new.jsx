"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Code,
  Pen,
  Rocket,
  BarChart3,
  Lightbulb,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useMotionValueEvent,
} from "framer-motion";

const ServicesPage = () => {
  const [activeService, setActiveService] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrollProgress(Math.min(latest / 1000, 1));
  });

  // Services data - now with icon components instead of SVG paths
  const services = [
    {
      id: 1,
      title: "Web Design & Development",
      description:
        "Create stunning, conversion-focused websites that captivate your audience and drive results.",
      icon: Code,
      features: [
        "Custom Design",
        "Mobile-First",
        "E-commerce",
        "CMS Integration",
        "SEO Ready",
        "Fast Loading",
      ],
      benefits: ["100% Responsive", "Lightning Fast", "Modern Stack"],
      badge: "MOST POPULAR",
      color: "#6b46c1",
    },
    {
      id: 2,
      title: "AI Business Automation",
      description:
        "Streamline operations with intelligent automation that saves time and reduces costs.",
      icon: Sparkles,
      features: [
        "Workflow Automation",
        "AI Chatbots",
        "Data Analytics",
        "Process Optimization",
      ],
      benefits: ["Save 30+ hrs/week", "99% Accuracy", "24/7 Running"],
      badge: "TRENDING",
      color: "#6b46c1",
    },
    {
      id: 3,
      title: "SEO & Digital Marketing",
      description:
        "Boost your online visibility and drive qualified traffic that converts into customers.",
      icon: TrendingUp,
      features: [
        "Keyword Research",
        "On-Page SEO",
        "Link Building",
        "Content Strategy",
      ],
      benefits: ["300% ROI", "Top Rankings", "Qualified Leads"],
      badge: "HIGH ROI",
      color: "#6b46c1",
    },
    {
      id: 4,
      title: "Content & Copywriting",
      description:
        "Engage your audience with compelling content that drives action and builds trust.",
      icon: Pen,
      features: ["Blog Writing", "Web Copy", "Email Campaigns", "Social Media"],
      benefits: ["Persuasive Copy", "Brand Voice", "High Engagement"],
      badge: "CREATIVE",
      color: "#6b46c1",
    },
  ];

  // Process steps
  const processSteps = [
    {
      number: "01",
      title: "Discovery",
      description:
        "We dive deep into understanding your business, goals, and target audience.",
      details: [
        "Business Analysis",
        "Competitor Research",
        "Goal Setting",
        "Strategy Planning",
      ],
    },
    {
      number: "02",
      title: "Design",
      description:
        "We create visually stunning and user-centric designs that reflect your brand.",
      details: [
        "Wireframing",
        "Design Mockups",
        "Interactive Prototypes",
        "Client Feedback",
      ],
    },
    {
      number: "03",
      title: "Development",
      description:
        "Our team builds robust, scalable solutions using modern technology.",
      details: [
        "Frontend Development",
        "Backend Integration",
        "API Connection",
        "Testing",
      ],
    },
    {
      number: "04",
      title: "Launch",
      description:
        "We ensure seamless deployment and provide ongoing support and optimization.",
      details: ["Final Testing", "Deployment", "Monitoring", "Optimization"],
    },
  ];

  // Stats for proof
  const stats = [
    { value: "50+", label: "Clients Trusted" },
    { value: "100+", label: "Projects Delivered" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "24/7", label: "Support Available" },
  ];

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600"
        style={{ scaleX: scrollProgress, transformOrigin: "left" }}
        zIndex={50}
      />

      {/* Hero Section with Scroll Animation */}
      <motion.section
        ref={heroRef}
        className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 md:pt-32 pb-16 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-10 w-96 h-96 rounded-full border border-slate-200"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute bottom-20 left-10 w-72 h-72 rounded-full border border-slate-100"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            className="mb-6 inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 bg-slate-50">
              <Sparkles size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                Comprehensive Digital Solutions
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transform Your Business with{" "}
            <span className="text-blue-600">Strategic Digital Solutions</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            From stunning web design to AI-powered automation, we deliver
            comprehensive digital solutions that drive growth, increase
            conversions, and streamline your operations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link href="/get-started">
              <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center gap-2 justify-center">
                Get Started <ArrowRight size={20} />
              </button>
            </Link>
            <Link href="/portfolio">
              <button className="px-8 py-4 border border-slate-300 text-slate-900 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-300">
                View Portfolio
              </button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Grid Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Our Services
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each service is crafted with expertise and tailored to meet your
              unique business needs.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <motion.div
                  key={service.id}
                  className="group relative h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  onHoverStart={() => setActiveService(service.id)}
                >
                  {/* Card Background */}
                  <div className="absolute inset-0 rounded-2xl border border-slate-200 bg-slate-50 transition-all duration-300 group-hover:border-blue-600 group-hover:bg-blue-50" />

                  {/* Card Content */}
                  <div className="relative p-8 flex flex-col h-full">
                    {/* Badge and Icon */}
                    <div className="flex items-start justify-between mb-6">
                      <motion.div
                        className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                      >
                        <IconComponent size={24} />
                      </motion.div>
                      {service.badge && (
                        <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* Title and Description */}
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 mb-6 flex-grow">
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-3">
                        {service.features.slice(0, 4).map((feature, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 text-sm text-slate-700"
                          >
                            <CheckCircle
                              size={16}
                              className="text-green-600 flex-shrink-0"
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.div whileHover={{ x: 4 }} className="mt-auto">
                      <Link
                        href="/get-started"
                        className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                      >
                        Get Started <ArrowRight size={18} />
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              How We Work
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              A streamlined process designed to deliver exceptional results on
              time and within budget.
            </p>
          </motion.div>

          {/* Process Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-gradient-to-r from-slate-200 to-slate-200" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="relative"
                >
                  {/* Step Number Circle */}
                  <motion.div
                    className="w-32 h-32 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center mx-auto mb-6 relative z-10 shadow-lg"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-4xl font-bold text-blue-600">
                      {step.number}
                    </span>
                  </motion.div>

                  {/* Step Details */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 mb-6">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-center gap-2 text-sm text-slate-700"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose BookOne Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Choose BookOne?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Rocket,
                title: "Lightning Fast",
                description: "Most projects delivered within 2-4 weeks",
              },
              {
                icon: CheckCircle,
                title: "Guaranteed Results",
                description: "30-day money-back guarantee on all services",
              },
              {
                icon: Zap,
                title: "24/7 Support",
                description: "Round-the-clock support for all your needs",
              },
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  className="group p-8 rounded-xl border border-slate-200 hover:border-blue-600 transition-all duration-300 hover:bg-blue-50"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{ y: -4 }}
                >
                  <motion.div
                    className="w-14 h-14 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 10 }}
                  >
                    <IconComponent size={28} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-blue-600 relative overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 right-20 w-40 h-40 rounded-full bg-blue-500 opacity-20"
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg text-blue-50 mb-8 max-w-2xl mx-auto">
              Join hundreds of successful businesses who've accelerated their
              growth with BookOne's digital solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors duration-300 flex items-center gap-2 justify-center">
                  Get Started <ArrowRight size={20} />
                </button>
              </Link>
              <Link href="https://calendar.notion.so/meet/officialbookone/call">
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Schedule Consultation
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "What's the typical project timeline?",
                answer:
                  "Most projects are delivered within 2-4 weeks, depending on complexity and scope. We'll provide a detailed timeline during the discovery phase.",
              },
              {
                question: "Do you offer ongoing support after launch?",
                answer:
                  "Yes! We provide 24/7 support and maintenance for all our clients. Choose from our flexible support plans.",
              },
              {
                question: "Can you work with existing websites?",
                answer:
                  "Absolutely. We can redesign, optimize, or integrate new features into existing websites without starting from scratch.",
              },
              {
                question: "What's your process for understanding my needs?",
                answer:
                  "We start with an in-depth discovery session where we learn about your business, goals, audience, and competition.",
              },
            ].map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

// FAQ Item Component with toggle animation
const FAQItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="border border-slate-200 rounded-lg overflow-hidden bg-white"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <span className="font-semibold text-slate-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowRight size={20} className="text-blue-600 rotate-90" />
        </motion.div>
      </button>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 text-slate-600 border-t border-slate-200">
          {answer}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServicesPage;
