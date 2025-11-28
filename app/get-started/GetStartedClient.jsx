"use client";
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function GetStartedClient() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    previousWebsite: "",
    services: [],
    budget: "",
    referralSource: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const services = [
    { id: "web-design", label: "Web Design" },
    { id: "ai-automation", label: "AI Automation" },
    { id: "seo", label: "SEO" },
    { id: "ecommerce", label: "E-commerce" },
    { id: "maintenance", label: "Maintenance" },
    { id: "consulting", label: "Consulting" },
  ];

  const budgets = [
    "< $5k",
    "$5k - $10k",
    "$10k - $25k",
    "$25k+",
  ];

  const referralSources = [
    "Google Search",
    "LinkedIn",
    "Twitter / X",
    "Referral",
    "Other",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (formData.services.length === 0)
      newErrors.services = "Please select at least one service";
    if (!formData.budget) newErrors.budget = "Please select a budget range";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);
    console.log(formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (result.success) {
        setSubmitStatus("success");
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          previousWebsite: "",
          services: [],
          budget: "",
          referralSource: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
        throw new Error(result.message || "Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
    if (errors.services) {
      setErrors((prev) => ({ ...prev, services: null }));
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // Confetti canvas ref
  const confettiRef = useRef(null);

  // Launch a lightweight canvas confetti animation
  const launchConfetti = () => {
    const canvas = confettiRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = [
      "#7c3aed",
      "#06b6d4",
      "#f97316",
      "#10b981",
      "#ef4444",
      "#f59e0b",
    ];
    let particles = [];

    const createParticles = (count = 120) => {
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.2,
          vx: (Math.random() - 0.5) * 8,
          vy: Math.random() * 6 + 2,
          size: Math.random() * 8 + 6,
          color: colors[Math.floor(Math.random() * colors.length)],
          rot: Math.random() * Math.PI * 2,
          spin: (Math.random() - 0.5) * 0.2,
          life: 0,
          ttl: 80 + Math.random() * 40,
        });
      }
    };

    createParticles();

    let raf;
    const update = () => {
      ctx.clearRect(0, 0, w, h);
      for (let p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // gravity
        p.vx *= 0.99; // air resistance
        p.rot += p.spin;
        p.life++;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      particles = particles.filter((p) => p.life < p.ttl && p.y < h + 50);
      if (particles.length) {
        raf = requestAnimationFrame(update);
      } else {
        cancelAnimationFrame(raf);
        // clear canvas after animation ends
        ctx.clearRect(0, 0, w, h);
      }
    };

    // handle resize
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    update();

    // stop and cleanup after 6s
    setTimeout(() => {
      particles = [];
      window.removeEventListener("resize", onResize);
      if (raf) cancelAnimationFrame(raf);
      ctx.clearRect(0, 0, w, h);
    }, 6000);
  };

  // Trigger confetti when submitStatus becomes success
  useEffect(() => {
    if (submitStatus === "success") {
      // small timeout to allow UI update
      setTimeout(() => launchConfetti(), 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitStatus]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-24 pb-20 px-4 sm:px-6 lg:px-8 font-sans selection:bg-[#6b46c1] selection:text-white">
      {/* Confetti canvas overlay */}
      <canvas
        ref={confettiRef}
        className="pointer-events-none fixed inset-0 w-full h-full z-50"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column: Info & Context */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-sm font-medium text-[#6b46c1] mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6b46c1]"></span>
                </span>
                Start Your Project
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight leading-[1.1]">
                Let's build something <br />
                <span className="text-gray-400">brilliant.</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Ready to transform your digital presence? We help ambitious
                businesses scale through world-class design and intelligent
                automation.
              </p>
            </div>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-[#6b46c1] shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Email Us
                  </h3>
                  <a
                    href="mailto:hello@bookone.dev"
                    className="text-slate-600 hover:text-[#6b46c1] transition-colors"
                  >
                    hello@bookone.dev
                  </a>
                  <p className="text-sm text-slate-400 mt-1">
                    Response within 24 hours
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Call Us
                  </h3>
                  <a
                    href="tel:+2348077080903"
                    className="text-slate-600 hover:text-[#6b46c1] transition-colors"
                  >
                    +234 807 708 0903
                  </a>
                  <p className="text-sm text-slate-400 mt-1">
                    Mon-Fri from 9am to 6pm
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-600 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    Visit Us
                  </h3>
                  <p className="text-slate-600">
                    Allen Avenue, Lagos, Nigeria.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-auto p-8 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-2">
                  "BookOne transformed our workflow."
                </h3>
                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                  Their AI solutions saved us 20+ hours a week. The ROI was
                  immediate and the design quality is unmatched.
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">
                    JD
                  </div>
                  <div>
                    <p className="text-sm font-bold">John Doe</p>
                    <p className="text-xs text-slate-500">CEO, TechStart</p>
                  </div>
                </div>
              </div>
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#6b46c1] rounded-full blur-[60px] opacity-20 -translate-y-1/2 translate-x-1/2" />
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-gray-200/50 border border-gray-100">
              <AnimatePresence mode="wait">
                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-4">
                      Message Received!
                    </h3>
                    <p className="text-slate-600 max-w-md mx-auto mb-8">
                      Thanks for reaching out. We've received your project details
                      and will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitStatus(null)}
                      className="px-8 py-3 bg-gray-100 text-slate-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 ml-1">
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={`w-full px-5 py-4 bg-gray-50 border-2 ${
                            errors.firstName
                              ? "border-red-500 bg-red-50/50"
                              : "border-transparent focus:border-[#6b46c1] focus:bg-white"
                          } rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium`}
                        />
                        {errors.firstName && (
                          <p className="text-red-500 text-xs ml-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.firstName}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 ml-1">
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className={`w-full px-5 py-4 bg-gray-50 border-2 ${
                            errors.lastName
                              ? "border-red-500 bg-red-50/50"
                              : "border-transparent focus:border-[#6b46c1] focus:bg-white"
                          } rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium`}
                        />
                        {errors.lastName && (
                          <p className="text-red-500 text-xs ml-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900 ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full px-5 py-4 bg-gray-50 border-2 ${
                          errors.email
                            ? "border-red-500 bg-red-50/50"
                            : "border-transparent focus:border-[#6b46c1] focus:bg-white"
                        } rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs ml-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Services Selection */}
                    <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-900 ml-1">
                        I'm interested in...
                      </label>
                      <div className="flex flex-wrap gap-3">
                        {services.map((service) => (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => handleServiceToggle(service.id)}
                            className={`px-5 py-3 rounded-xl text-sm font-bold transition-all border-2 ${
                              formData.services.includes(service.id)
                                ? "bg-[#6b46c1] border-[#6b46c1] text-white shadow-lg shadow-purple-200"
                                : "bg-white border-gray-200 text-slate-600 hover:border-[#6b46c1]/50 hover:bg-purple-50"
                            }`}
                          >
                            {service.label}
                          </button>
                        ))}
                      </div>
                      {errors.services && (
                        <p className="text-red-500 text-xs ml-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.services}
                        </p>
                      )}
                    </div>

                    {/* Budget & Referral */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 ml-1">
                          Budget Range
                        </label>
                        <div className="relative">
                          <select
                            value={formData.budget}
                            onChange={(e) =>
                              handleInputChange("budget", e.target.value)
                            }
                            className={`w-full px-5 py-4 bg-gray-50 border-2 ${
                              errors.budget
                                ? "border-red-500 bg-red-50/50"
                                : "border-transparent focus:border-[#6b46c1] focus:bg-white"
                            } rounded-2xl outline-none transition-all appearance-none font-medium text-slate-900 cursor-pointer`}
                          >
                            <option value="" disabled>
                              Select a range
                            </option>
                            {budgets.map((b) => (
                              <option key={b} value={b}>
                                {b}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ArrowRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>
                        {errors.budget && (
                          <p className="text-red-500 text-xs ml-1 flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" />
                            {errors.budget}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-900 ml-1">
                          How did you hear about us?
                        </label>
                        <div className="relative">
                          <select
                            value={formData.referralSource}
                            onChange={(e) =>
                              handleInputChange("referralSource", e.target.value)
                            }
                            className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent focus:border-[#6b46c1] focus:bg-white rounded-2xl outline-none transition-all appearance-none font-medium text-slate-900 cursor-pointer"
                          >
                            <option value="" disabled>
                              Select source
                            </option>
                            {referralSources.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                            <ArrowRight className="w-4 h-4 rotate-90" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-900 ml-1">
                        Project Details
                      </label>
                      <textarea
                        placeholder="Tell us about your goals, timeline, and requirements..."
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        rows={4}
                        className={`w-full px-5 py-4 bg-gray-50 border-2 ${
                          errors.message
                            ? "border-red-500 bg-red-50/50"
                            : "border-transparent focus:border-[#6b46c1] focus:bg-white"
                        } rounded-2xl outline-none transition-all placeholder:text-gray-400 font-medium resize-none`}
                      />
                      {errors.message && (
                        <p className="text-red-500 text-xs ml-1 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-[#6b46c1] text-white font-bold text-lg rounded-2xl hover:bg-[#5a37a6] transition-all hover:-translate-y-1 shadow-xl shadow-purple-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <>
                          Send Message <Send className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
