"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import {
  Globe,
  Code,
  Wrench,
  Smartphone,
  Upload,
  Loader2,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Clock,
  Shield,
  Zap,
  ArrowRight,
  Phone,
  Sparkles,
  PartyPopper,
  Rocket,
  Mail,
  Target,
} from "lucide-react";
import { motion } from "framer-motion";

// Confetti Component
const Confetti = ({ show }) => {
  const confettiColors = React.useMemo(
    () => [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#96CEB4",
      "#FFEAA7",
      "#DDA0DD",
      "#98D8C8",
      "#F7DC6F",
    ],
    []
  );

  const confettiPieces = React.useMemo(
    () =>
      [...Array(50)].map((_, i) => ({
        id: i,
        color: confettiColors[i % confettiColors.length],
        left: `${Math.random() * 100}%`,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 0.5,
        xOffset: Math.random() * 200 - 100,
        rotation: Math.random() * 360,
      })),
    [confettiColors]
  );

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: piece.color,
            left: piece.left,
            top: "-10px",
          }}
          initial={{
            y: -10,
            x: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            y: "100vh",
            x: piece.xOffset,
            rotate: piece.rotation,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            ease: "easeOut",
            delay: piece.delay,
          }}
          onAnimationComplete={() => {
            // Clean up after animation completes
          }}
        />
      ))}
    </div>
  );
};

// Celebration Banner Component
const CelebrationBanner = ({ show, onClose, userName }) => {
  if (!show) return null;

  return (
    <motion.div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4"
      initial={{ opacity: 0, y: -50, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.8 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header with sparkles */}
        <div className="relative p-6 text-center">
          <div className="absolute top-2 right-2">
            <motion.button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>
          </div>

          {/* Sparkle icons */}
          <motion.div
            className="absolute top-4 left-4 text-yellow-300"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>
          <motion.div
            className="absolute top-4 right-8 text-yellow-300"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>

          {/* Main content */}
          <div className="space-y-3">
            <motion.div
              className="text-4xl mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 3, repeatDelay: 0.5 }}
            >
              <PartyPopper className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white text-xl font-bold">
              Quote Request Sent Successfully!
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Thank you {userName ? userName : "there"}!{" "}
              <Rocket className="w-4 h-4 inline" />
              <br />
              We've received your request and will get back to you within 24
              hours with a detailed quote.
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
      </div>
    </motion.div>
  );
};

// Service selection options with enhanced descriptions and pricing hints
const serviceOptions = [
  {
    id: "web-design",
    label: "Web Design",
    icon: Globe,
    description: "Clean, modern designs that build trust",
    popular: true,
    timeframe: "1-3 weeks",
    features: [
      "Responsive design (mobile & desktop)",
      "Conversion-optimized layout",
      "SEO best practices included",
      "Fast-loading pages",
    ],
  },
  {
    id: "web-development",
    label: "Web Development",
    icon: Code,
    description: "Custom-built sites with powerful features",
    popular: true,
    timeframe: "2-4 weeks",
    features: [
      "CMS setup (Sanity, WordPress, etc.)",
      "Third-party tool integrations",
      "Contact & lead forms",
      "SEO-ready structure",
    ],
  },
  {
    id: "website-revamp",
    label: "Website Revamp",
    icon: Wrench,
    description: "Upgrade your outdated site for better performance",
    popular: false,
    timeframe: "1-2 weeks",
    features: [
      "UI/UX redesign",
      "Performance optimization",
      "Mobile responsiveness",
      "SEO and content improvements",
    ],
  },
  {
    id: "ai-automation",
    label: "AI Automation & Workflow",
    icon: Smartphone,
    description: "Streamline tasks using smart automation tools",
    popular: false,
    timeframe: "1-3 weeks",
    features: [
      "AI chatbot integration",
      "Automated blog/content posting",
      "CRM & lead workflows",
      "Zapier/n8n automations",
    ],
  },
];

const budgetRanges = [
  { value: "under-5k", label: "Under $5,000", note: "Perfect for startups" },
  { value: "5k-15k", label: "$5,000 - $15,000", note: "Most popular choice" },
  { value: "15k-30k", label: "$15,000 - $30,000", note: "Premium solutions" },
  { value: "30k-50k", label: "$30,000 - $50,000", note: "Enterprise grade" },
  { value: "over-50k", label: "Over $50,000", note: "White-glove service" },
];

// Trust indicators and social proof
const trustIndicators = [
  { icon: Users, text: "50+ Happy Clients", color: "text-blue-600" },
  { icon: Award, text: "Award-Winning Team", color: "text-purple-600" },
  { icon: TrendingUp, text: "300% Avg ROI Increase", color: "text-green-600" },
  { icon: Clock, text: "24hr Response Time", color: "text-orange-600" },
];

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    services: [],
    message: "",
    timeline: "",
    newsletter: false,
    privacy: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Get system info with caching and better error handling
  async function getSystemInfo() {
    // Check if we already have cached system info
    const cachedInfo = sessionStorage.getItem("systemInfo");
    if (cachedInfo) {
      try {
        return JSON.parse(cachedInfo);
      } catch {
        // If cached data is corrupted, continue with fresh fetch
      }
    }

    let country = "";
    let timezone = "";
    let userAgent = "";

    try {
      // Get timezone and user agent immediately (synchronous)
      timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      userAgent = navigator.userAgent;

      // Get country with timeout
      const geoPromise = fetch("https://ipapi.co/json/");
      const geoData = await Promise.race([
        geoPromise,
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Geo request timeout")), 3000)
        ),
      ]);

      if (geoData.ok) {
        const geoResult = await geoData.json();
        country = geoResult.country_name || "";
      }
    } catch (error) {
      console.warn("Could not fetch location data:", error.message);
      country = "";
    }

    const systemInfo = {
      userAgent,
      timezone,
      country,
    };

    // Cache the result for this session
    try {
      sessionStorage.setItem("systemInfo", JSON.stringify(systemInfo));
    } catch {
      // If sessionStorage fails, continue without caching
    }

    return systemInfo;
  }

  const handleServiceToggle = React.useCallback((serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  }, []);

  const handleInputChange = React.useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.services.length === 0)
      newErrors.services = "Please select at least one service";
    if (!formData.message.trim())
      newErrors.message = "Please tell us about your project";
    if (!formData.privacy)
      newErrors.privacy = "Please accept our privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Get system info with a timeout to prevent long delays
      const systemInfoPromise = getSystemInfo();
      const systemInfo = await Promise.race([
        systemInfoPromise,
        new Promise((resolve) => setTimeout(() => resolve({}), 2000)), // 2 second timeout
      ]);

      const payload = { ...formData, systemInfo };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Network error");

      const resData = await res.json();
      console.log("Form submitted:", formData, "Response:", resData);

      // Store the name for celebration
      const submittedName = formData.firstName;

      // Show celebration
      setShowCelebration(true);
      setSubmittedName(submittedName);

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        company: "",
        budget: "",
        services: [],
        message: "",
        timeline: "",
        newsletter: false,
        privacy: false,
      });

      // Hide celebration after 5 seconds
      setTimeout(() => {
        setShowCelebration(false);
        setSubmittedName("");
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      // You could show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>
          Get Started - Free Strategy Session | BookOne Web Design & AI
          Automation
        </title>
        <meta
          name="description"
          content="Start your digital transformation journey with a free strategy session. Get personalized recommendations for web design, AI automation, and digital growth. No obligation, immediate actionable insights."
        />
        <meta
          name="keywords"
          content="free strategy session, web design consultation, AI automation consultation, digital transformation, business automation, website development, SEO consultation, free consultation, BookOne services, digital agency Nigeria"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Get Started - Free Strategy Session | BookOne"
        />
        <meta
          property="og:description"
          content="Start your digital transformation journey with a free strategy session. Get personalized recommendations for web design, AI automation, and digital growth."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bookone.dev/get-started" />
        <meta property="og:site_name" content="BookOne" />
        <meta
          property="og:image"
          content="https://bookone.dev/og-image-get-started.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="BookOne Get Started - Free Strategy Session"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Get Started - Free Strategy Session | BookOne"
        />
        <meta
          name="twitter:description"
          content="Start your digital transformation journey with a free strategy session. Get personalized recommendations for web design, AI automation, and digital growth."
        />
        <meta
          name="twitter:image"
          content="https://bookone.dev/og-image-get-started.jpg"
        />

        {/* Canonical */}
        <link rel="canonical" href="https://bookone.dev/get-started" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />
      </Head>

      {/* Celebration Components */}
      <Confetti show={showCelebration} />
      <CelebrationBanner
        show={showCelebration}
        onClose={() => {
          setShowCelebration(false);
          setSubmittedName("");
        }}
        userName={submittedName}
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10 py-22 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {/* Hero Section with Trust Indicators */}
            <div
              className={`text-center mb-16 transform transition-all duration-1000 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full border border-blue-200/50 mb-6">
                <Star className="w-4 h-4 text-yellow-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Trusted by 500+ businesses worldwide
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                <span className="block mb-2">Transform Your Business</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 animate-gradient-x">
                  Into a Revenue Machine
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12">
                Get a{" "}
                <span className="font-semibold text-blue-600">
                  free strategy session
                </span>{" "}
                and discover how our award-winning team can{" "}
                <span className="font-semibold text-purple-600">
                  increase your revenue by 300%
                </span>
                through cutting-edge digital solutions.
              </p>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
                {trustIndicators.map((indicator, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 ${
                      isVisible ? "animate-fade-in-up" : ""
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <indicator.icon
                      className={`w-8 h-8 ${indicator.color} mb-2`}
                    />
                    <span className="text-sm font-semibold text-gray-800 text-center">
                      {indicator.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Urgency Banner */}
              <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-lg animate-bounce">
                <Zap className="w-5 h-5 mr-2" />
                <span className="font-semibold">
                  Limited Time: Free Strategy Session Worth $500
                </span>
              </div>
            </div>

            {/* Main Contact Form */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
                {/* Form Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Get Your Free Strategy Session
                  </h2>
                  <p className="text-blue-100">
                    Tell us about your project and we'll create a custom growth
                    plan
                  </p>
                </div>

                <div className="p-8 sm:p-12">
                  <div className="space-y-12">
                    {/* Services Selection */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-bold text-gray-900">
                          What can we help you with?
                        </h3>
                        {errors.services && (
                          <span className="text-red-500 text-sm">
                            *{errors.services}
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {serviceOptions.map((service, index) => {
                          const IconComponent = service.icon;
                          const isSelected = formData.services.includes(
                            service.id
                          );
                          return (
                            <div
                              key={service.id}
                              className={`relative transform transition-all duration-300 hover:scale-105 ${
                                isVisible ? "animate-fade-in-up" : ""
                              }`}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              {service.popular && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-red-400 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                                  Popular
                                </div>
                              )}
                              <button
                                onClick={() => handleServiceToggle(service.id)}
                                className={`
                                w-full flex flex-col items-start p-6 rounded-2xl border-2 transition-all duration-300 text-left group
                                ${
                                  isSelected
                                    ? "border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50 shadow-lg transform scale-105"
                                    : "border-gray-200 hover:border-blue-300 bg-white hover:shadow-lg"
                                }
                              `}
                              >
                                <div className="flex items-center space-x-3 mb-3">
                                  <div
                                    className={`p-2 rounded-lg transition-colors duration-300 ${
                                      isSelected
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                                    }`}
                                  >
                                    <IconComponent className="h-5 w-5" />
                                  </div>
                                  <span className="font-semibold text-gray-900">
                                    {service.label}
                                  </span>
                                  {isSelected && (
                                    <CheckCircle className="h-5 w-5 text-blue-500" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                  {service.description}
                                </p>

                                {/* Pricing Information */}
                                <div className="w-full space-y-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-blue-600">
                                      {service.price}
                                    </span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                      {service.timeframe}
                                    </span>
                                  </div>

                                  {/* Features List */}
                                  <div className="space-y-1">
                                    {service.features
                                      .slice(0, 2)
                                      .map((feature, idx) => (
                                        <div
                                          key={idx}
                                          className="flex items-center text-xs text-gray-600"
                                        >
                                          <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                                          <span>{feature}</span>
                                        </div>
                                      ))}
                                    {service.features.length > 2 && (
                                      <div className="text-xs text-gray-500">
                                        +{service.features.length - 2} more
                                        features
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Personal Information */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                      {/* Left Column */}
                      <div className="space-y-8">
                        <h3 className="text-xl font-bold text-gray-900">
                          Tell us about yourself
                        </h3>

                        <div className="space-y-6">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                First name*
                              </label>
                              <input
                                type="text"
                                value={formData.firstName}
                                onChange={(e) =>
                                  handleInputChange("firstName", e.target.value)
                                }
                                className={`
                                w-full px-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-gray-900
                                ${
                                  errors.firstName
                                    ? "border-red-500"
                                    : "border-gray-200 focus:border-blue-500"
                                }
                              `}
                                placeholder="John"
                              />
                              {errors.firstName && (
                                <p className="text-red-500 text-sm">
                                  {errors.firstName}
                                </p>
                              )}
                            </div>

                            <div className="space-y-2">
                              <label className="block text-sm font-semibold text-gray-700">
                                Last name*
                              </label>
                              <input
                                type="text"
                                value={formData.lastName}
                                onChange={(e) =>
                                  handleInputChange("lastName", e.target.value)
                                }
                                className={`
                                w-full px-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-gray-900
                                ${
                                  errors.lastName
                                    ? "border-red-500"
                                    : "border-gray-200 focus:border-blue-500"
                                }
                              `}
                                placeholder="Smith"
                              />
                              {errors.lastName && (
                                <p className="text-red-500 text-sm">
                                  {errors.lastName}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Email*
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                handleInputChange("email", e.target.value)
                              }
                              className={`
                              w-full px-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-gray-900
                              ${
                                errors.email
                                  ? "border-red-500"
                                  : "border-gray-200 focus:border-blue-500"
                              }
                            `}
                              placeholder="john@company.com"
                            />
                            {errors.email && (
                              <p className="text-red-500 text-sm">
                                {errors.email}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Phone (optional)
                            </label>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                  handleInputChange("phone", e.target.value)
                                }
                                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900"
                                placeholder="+44 123 456 7890"
                              />
                            </div>
                            <p className="text-xs text-gray-500">
                              For urgent inquiries and faster response
                            </p>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Company (optional)
                            </label>
                            <input
                              type="text"
                              value={formData.company}
                              onChange={(e) =>
                                handleInputChange("company", e.target.value)
                              }
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900"
                              placeholder="Your Company Ltd"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-8">
                        <h3 className="text-xl font-bold text-gray-900">
                          Project details
                        </h3>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Investment budget
                            </label>
                            <select
                              value={formData.budget}
                              onChange={(e) =>
                                handleInputChange("budget", e.target.value)
                              }
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900"
                            >
                              <option value="">
                                Select your investment range
                              </option>
                              {budgetRanges.map((range) => (
                                <option key={range.value} value={range.value}>
                                  {range.label} - {range.note}
                                </option>
                              ))}
                            </select>
                            <div className="flex items-center space-x-2 mt-2">
                              <Shield className="w-4 h-4 text-green-500" />
                              <p className="text-xs text-gray-600">
                                100% transparent pricing. No hidden fees.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Project timeline
                            </label>
                            <select
                              value={formData.timeline}
                              onChange={(e) =>
                                handleInputChange("timeline", e.target.value)
                              }
                              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-900"
                            >
                              <option value="">
                                When do you want to start?
                              </option>
                              <option value="asap">As soon as possible</option>
                              <option value="1-month">Within 1 month</option>
                              <option value="2-3-months">2-3 months</option>
                              <option value="3-6-months">3-6 months</option>
                              <option value="planning">
                                Just planning ahead
                              </option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                              Tell us about your project*
                            </label>
                            <textarea
                              value={formData.message}
                              onChange={(e) =>
                                handleInputChange("message", e.target.value)
                              }
                              rows="6"
                              className={`
                              w-full px-4 py-4 border-2 rounded-xl bg-white/50 backdrop-blur-sm resize-none focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 text-gray-900
                              ${
                                errors.message
                                  ? "border-red-500"
                                  : "border-gray-200 focus:border-blue-500"
                              }
                            `}
                              placeholder="Describe your goals, challenges, and what success looks like for your business. The more details you provide, the better we can help you..."
                            />
                            {errors.message && (
                              <p className="text-red-500 text-sm">
                                {errors.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-gray-700">
                        <Upload className="inline h-4 w-4 mr-2" />
                        Additional materials (optional)
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-all duration-300 bg-gradient-to-br from-gray-50/50 to-blue-50/50 backdrop-blur-sm group hover:shadow-lg">
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.sketch,.fig"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <div className="text-gray-500 group-hover:text-blue-600 transition-colors duration-300">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                              <Upload className="h-8 w-8 text-blue-600" />
                            </div>
                            <p className="text-lg font-semibold mb-2">
                              Drop files here or click to upload
                            </p>
                            <p className="text-sm">
                              Brand guidelines, wireframes, inspiration -
                              anything that helps us understand your vision
                            </p>
                            <p className="text-xs mt-2 text-gray-400">
                              PDF, DOC, PNG, JPG, Sketch, Figma up to 25MB each
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="space-y-4 p-6 bg-gradient-to-r from-gray-50/50 to-blue-50/50 rounded-2xl border border-gray-200/50">
                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={(e) =>
                            handleInputChange("newsletter", e.target.checked)
                          }
                          className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <div className="space-y-1">
                          <span className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
                            <Mail className="w-4 h-4 inline mr-1" /> Yes, send
                            me monthly insights on digital growth strategies
                          </span>
                          <p className="text-xs text-gray-600">
                            Join 10,000+ business owners getting actionable tips
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start space-x-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={formData.privacy}
                          onChange={(e) =>
                            handleInputChange("privacy", e.target.checked)
                          }
                          className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          I agree to BookOne's{" "}
                          <Link
                            href="/privacy-policy"
                            className="text-blue-600 hover:text-blue-700 underline font-medium"
                          >
                            privacy policy
                          </Link>{" "}
                          and understand my data will be handled securely*
                        </span>
                      </label>
                      {errors.privacy && (
                        <p className="text-red-500 text-sm">{errors.privacy}</p>
                      )}
                    </div>

                    {/* Call-to-Action */}
                    <div className="text-center space-y-6 pt-8">
                      <button
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`
                        group inline-flex items-center justify-center space-x-3 px-12 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-xl rounded-full shadow-2xl
                        transform transition-all duration-300 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-3xl
                        focus:outline-none focus:ring-4 focus:ring-blue-300/50
                        disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
                        ${!isSubmitting ? "animate-pulse" : ""}
                      `}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="animate-spin h-6 w-6" />
                            <span>Preparing Your Strategy...</span>
                          </>
                        ) : (
                          <>
                            <span>Get My Free Strategy Session</span>
                            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </button>

                      <div className="space-y-2">
                        <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>Free consultation</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>No obligations</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>24hr response</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">
                          <Target className="w-4 h-4 inline mr-1" />{" "}
                          <strong>What happens next:</strong> We'll review your
                          project and send you a custom strategy within 24
                          hours. No spam, no pushy sales calls - just actionable
                          insights.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes gradient-x {
            0%,
            100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-gradient-x {
            background-size: 200% 200%;
            animation: gradient-x 3s ease infinite;
          }

          .animate-fade-in-up {
            animation: fade-in-up 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
};

export default ContactPage;
