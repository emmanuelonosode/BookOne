"use client";
import React, { useState, useCallback, useMemo } from "react";
import {
  Globe,
  Code,
  Wrench,
  Smartphone,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Award,
  Clock,
  ArrowRight,
  Phone,
  Mail,
  Target,
  Zap,
  Shield,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { trackLeadSubmission } from "../../lib/analytics";

// Optimized service options
const serviceOptions = [
  {
    id: "web-design",
    label: "Web Design",
    icon: Globe,
    description: "Modern, conversion-focused designs",
    popular: true,
    timeframe: "2-3 weeks",
  },
  {
    id: "web-development",
    label: "Web Development",
    icon: Code,
    description: "Custom-built sites with CMS",
    popular: true,
    timeframe: "3-4 weeks",
  },
  {
    id: "website-revamp",
    label: "Website Revamp",
    icon: Wrench,
    description: "Transform your existing site",
    timeframe: "2-3 weeks",
  },
  {
    id: "ai-automation",
    label: "AI Automation",
    icon: Smartphone,
    description: "Smart workflows & chatbots",
    timeframe: "1-2 weeks",
  },
];

const budgetRanges = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-30k", label: "$15,000 - $30,000" },
  { value: "30k-plus", label: "$30,000+" },
];

const trustIndicators = [
  { icon: Users, text: "500+ Projects", color: "text-blue-600" },
  { icon: Award, text: "Award Winner", color: "text-purple-600" },
  { icon: TrendingUp, text: "300% ROI Avg", color: "text-green-600" },
  { icon: Clock, text: "24h Response", color: "text-orange-600" },
];

// Success notification component
const SuccessNotification = ({ show, onClose, userName }) => {
  if (!show) return null;

  return (
    <div
      id="success-notification"
      tabIndex={-1}
      className="fixed top-4 right-4 z-50 max-w-md"
    >
      <div
        className="bg-white rounded-lg shadow-lg border border-green-200 p-4"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">Request Sent!</h4>
              <p className="text-sm text-gray-600">
                Thanks {userName || "there"}! We'll respond within 24 hours.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close notification"
          >
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

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
    newsletter: true,
    privacy: false,
    // honeypot hidden field to trap bots
    honeypot: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleServiceToggle = useCallback(
    (serviceId) => {
      setFormData((prev) => ({
        ...prev,
        services: prev.services.includes(serviceId)
          ? prev.services.filter((id) => id !== serviceId)
          : [...prev.services, serviceId],
      }));
      if (errors.services) {
        setErrors((prev) => ({ ...prev, services: "" }));
      }
    },
    [errors.services]
  );

  const handleInputChange = useCallback(
    (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    },
    [errors]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.email.trim()) {
      newErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email required";
    }
    if (!formData.services.length)
      newErrors.services = "Select at least one service";
    if (!formData.message.trim())
      newErrors.message = "Tell us about your project";
    if (!formData.privacy) newErrors.privacy = "Please accept privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Send form data to /api/contact
      const systemInfo = {
        country: Intl.DateTimeFormat().resolvedOptions().locale || "Unknown",
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "Unknown",
        userAgent:
          typeof navigator !== "undefined" ? navigator.userAgent : "Unknown",
      };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, systemInfo }),
      });
      const result = await response.json();

      if (result.success) {
        setShowSuccess(true);
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
          newsletter: true,
          privacy: false,
          honeypot: "",
        });
        setTimeout(() => setShowSuccess(false), 5000);

        // Fire a conversion event (safe helper prefers dataLayer then gtag)
        try {
          trackLeadSubmission({
            lead_source: "get_started_form",
            lead_name: `${formData.firstName} ${formData.lastName}`.trim(),
            lead_email: formData.email,
          });
        } catch (err) {
          // swallow analytics errors
        }

        // Move focus to success notification for accessibility
        const notif = document.querySelector("#success-notification");
        if (notif) notif.focus();
      } else {
        setErrors((prev) => ({
          ...prev,
          api: result.error || "Submission failed",
        }));
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        api: "Submission failed. Please try again.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const selectedServices = useMemo(() => {
    return serviceOptions.filter((service) =>
      formData.services.includes(service.id)
    );
  }, [formData.services]);

  return (
    <>
      <SuccessNotification
        show={showSuccess}
        onClose={() => setShowSuccess(false)}
        userName={formData.firstName}
      />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-4xl mx-auto px-4 py-22">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-1" />
              Trusted by 500+ businesses
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get Your Free
              <span className="text-blue-600"> Strategy Session</span>
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Tell us about your project and we'll create a custom growth plan
              to
              <span className="font-semibold text-blue-600">
                {" "}
                increase your revenue by 300%
              </span>
            </p>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
              {trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center p-3 bg-white rounded-lg shadow-sm"
                >
                  <indicator.icon
                    className={`w-6 h-6 ${indicator.color} mb-1`}
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {indicator.text}
                  </span>
                </div>
              ))}
            </div>

            <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
              <Zap className="w-4 h-4 mr-1" />
              Free consultation worth $500 - Limited time
            </div>
          </div>

          {/* Main Form */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">
                Get Started Today
              </h2>
              <p className="text-blue-100 text-sm">
                We'll respond within 24 hours
              </p>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              {/* Services Selection */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    What can we help you with?
                  </h3>
                  {errors.services && (
                    <span className="text-red-500 text-sm">
                      {errors.services}
                    </span>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {serviceOptions.map((service) => {
                    const IconComponent = service.icon;
                    const isSelected = formData.services.includes(service.id);

                    return (
                      <div key={service.id} className="relative">
                        {service.popular && (
                          <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                            Popular
                          </div>
                        )}

                        <button
                          onClick={() => handleServiceToggle(service.id)}
                          className={`w-full p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                            isSelected
                              ? "border-blue-500 bg-blue-50 shadow-md"
                              : "border-gray-200 hover:border-blue-300 hover:shadow-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  isSelected
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                <IconComponent className="h-4 w-4" />
                              </div>
                              <span className="font-semibold text-gray-900">
                                {service.label}
                              </span>
                            </div>
                            {isSelected && (
                              <CheckCircle className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {service.description}
                          </p>
                          <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded inline-block">
                            {service.timeframe}
                          </div>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Contact Information
                  </h3>

                  <form className="grid grid-cols-2 gap-4">
                    {/* Honeypot field - hidden from users but visible to simple bots */}
                    <input
                      type="text"
                      name="company_website"
                      value={formData.honeypot}
                      onChange={(e) =>
                        handleInputChange("honeypot", e.target.value)
                      }
                      autoComplete="off"
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ display: "none" }}
                    />
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Smith"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </form>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (Optional)
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Company (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your Company"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900">
                    Project Details
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range.value} value={range.value}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        handleInputChange("timeline", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">When to start?</option>
                      <option value="asap">ASAP</option>
                      <option value="1-month">Within 1 month</option>
                      <option value="2-3-months">2-3 months</option>
                      <option value="planning">Just planning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tell us about your project *
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        handleInputChange("message", e.target.value)
                      }
                      rows="4"
                      className={`w-full px-3 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Describe your goals, challenges, and what success looks like..."
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.newsletter}
                    onChange={(e) =>
                      handleInputChange("newsletter", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Send me monthly insights on digital growth strategies
                  </span>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.privacy}
                    onChange={(e) =>
                      handleInputChange("privacy", e.target.checked)
                    }
                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the
                    <Link
                      href="/privacy-policy"
                      className="text-blue-400 underline"
                    >
                      {" "}
                      privacy policy{" "}
                    </Link>
                    and
                    <Link
                      href="/terms-and-conditions"
                      className="text-blue-500 underline"
                    >
                      {" "}
                      terms of service *
                    </Link>
                  </span>
                </label>
                {errors.privacy && (
                  <p className="text-red-500 text-sm">{errors.privacy}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center space-y-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full md:w-auto inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Get My Free Strategy Session
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                    <span>Free consultation</span>
                  </div>
                  <div className="flex items-center">
                    <Shield className="w-4 h-4 text-green-500 mr-1" />
                    <span>No obligations</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 text-green-500 mr-1" />
                    <span>24hr response</span>
                  </div>
                </div>

                <p className="text-sm text-gray-500">
                  <Target className="w-4 h-4 inline mr-1" />
                  We'll review your project and send you a custom strategy
                  within 24 hours.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
