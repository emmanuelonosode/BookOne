"use client";
import React, { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

// Confetti Component
const Confetti = ({ show }) => {
  const confettiColors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#96CEB4",
    "#FFEAA7",
    "#DDA0DD",
    "#98D8C8",
    "#F7DC6F",
  ];

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: confettiColors[i % confettiColors.length],
            left: `${Math.random() * 100}%`,
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
            x: Math.random() * 200 - 100,
            rotate: Math.random() * 360,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            ease: "easeOut",
            delay: Math.random() * 0.5,
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
            ✨
          </motion.div>
          <motion.div
            className="absolute top-4 right-8 text-yellow-300"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>

          {/* Main content */}
          <div className="space-y-3">
            <motion.div
              className="text-4xl mb-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 3, repeatDelay: 0.5 }}
            >
              🎉
            </motion.div>
            <h3 className="text-white text-xl font-bold">
              Message Sent Successfully!
            </h3>
            <p className="text-white/90 text-sm leading-relaxed">
              Thank you {userName ? userName : "there"}! 🚀
              <br />
              We've received your inquiry and will get back to you within 24
              hours.
            </p>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
      </div>
    </motion.div>
  );
};

// Mock contact data
const contact = [
  {
    src: <Mail />,
    label: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours",
    value: "officialbookone@gmail.com",
  },
  {
    src: <Phone />,
    label: "Call Us",
    description: "Speak directly with our team during business hours",
    value: "+234 807 708 0903",
  },
];

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Website Design & Building",
    message: "",
    terms: false,
  });
  const [responseMsg, setResponseMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [pending, setPending] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [focusedField, setFocusedField] = useState("");
  const [formProgress, setFormProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [submittedName, setSubmittedName] = useState("");

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
      mouseX.set(x * 30);
      mouseY.set(y * 30);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Calculate form progress
  useEffect(() => {
    const fields = ["name", "email", "message"];
    const completedFields = fields.filter(
      (field) => formData[field].trim() !== ""
    ).length;
    const termsProgress = formData.terms ? 1 : 0;
    setFormProgress(
      ((completedFields + termsProgress) / (fields.length + 1)) * 100
    );
  }, [formData]);

  // Get system info
  async function getSystemInfo() {
    let country = "";
    try {
      const geoRes = await fetch("https://ipapi.co/json/");
      const geoData = await geoRes.json();
      country = geoData.country_name || "";
    } catch {
      country = "";
    }

    return {
      userAgent: navigator.userAgent,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      country,
    };
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setResponseMsg("");
    setErrorMsg("");

    // Store the name immediately for celebration
    const submittedName = formData.name;

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
      console.log(resData);

      // Enhanced success message with data storage info
      let successMessage = resData.message || "Message sent successfully!";
      if (resData.dataStored) {
        successMessage += ` (Data stored: ${resData.dataStored})`;
      }

      // Show celebration immediately
      setResponseMsg(successMessage);
      setShowCelebration(true);
      setSubmittedName(submittedName);

      // Reset form immediately
      setFormData({
        name: "",
        email: "",
        service: "Website Design & Building",
        message: "",
        terms: false,
        timestamp: new Date().toISOString(),
        status: "false",
      });

      // Hide celebration after 5 seconds
      setTimeout(() => {
        setShowCelebration(false);
        setSubmittedName("");
      }, 5000);
    } catch (error) {
      setErrorMsg("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        once: true,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        once: true,
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <>
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

      <section
        id="contact"
        className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden py-20"
      >
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-transparent rounded-full blur-3xl"
            style={{
              x: springX,
              y: springY,
            }}
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{ duration: 8, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-br from-indigo-300/30 to-transparent rounded-full blur-2xl"
            style={{
              x: mousePosition.x * -20,
              y: mousePosition.y * -20,
            }}
            initial={{ y: 10 }}
            animate={{ y: -10 }}
            transition={{ duration: 8, delay: 2, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-transparent rounded-full blur-3xl"
            style={{
              x: mousePosition.x * 15,
              y: mousePosition.y * 15,
            }}
            initial={{ y: -10 }}
            animate={{ y: 10 }}
            transition={{ duration: 8, delay: 4, ease: "easeInOut" }}
          />

          {/* Interactive floating particles */}
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/40 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                x: mousePosition.x * (10 + i * 3),
                y: mousePosition.y * (10 + i * 3),
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
              whileHover={{ scale: 2, opacity: 1 }}
            />
          ))}
        </div>

        {/* Header Section */}
        <motion.div
          className="container mx-auto px-6 md:px-8 text-center mb-16 relative z-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-6 leading-tight"
          >
            Ready to bring your{" "}
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
              whileHover={{
                backgroundImage:
                  "linear-gradient(45deg, #6b46c1, #8b5cf6, #a855f7)",
                transition: { duration: 0.3 },
              }}
            >
              business
            </motion.span>{" "}
            online?
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            Let's talk about how BookOne can help you launch smarter and faster.
            We're here to transform your digital presence.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Form background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none" />

                {/* Progress indicator */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200 rounded-t-3xl overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>

                <div className="relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                  >
                    <h3 className="text-3xl font-light text-gray-800 mb-3">
                      Get in Touch
                    </h3>
                    <p className="text-gray-600">
                      Get a free consultation from our experts
                    </p>
                    <div className="text-sm text-purple-600 mt-2">
                      Form {Math.round(formProgress)}% complete
                    </div>
                  </motion.div>

                  <div className="space-y-6">
                    {/* Name Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name *
                      </label>
                      <motion.input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField("")}
                        required
                        className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                        placeholder="Your full name"
                        whileFocus={{ scale: 1.02 }}
                      />
                      {focusedField === "name" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-2 right-2 w-4 h-4 bg-purple-500 rounded-full"
                        />
                      )}
                    </motion.div>

                    {/* Email Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email *
                      </label>
                      <motion.input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField("")}
                        required
                        className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500"
                        placeholder="your.email@example.com"
                        whileFocus={{ scale: 1.02 }}
                      />
                      {focusedField === "email" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-2 right-2 w-4 h-4 bg-purple-500 rounded-full"
                        />
                      )}
                    </motion.div>

                    {/* Service Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        How can we help?
                      </label>
                      <motion.select
                        name="service"
                        id="service"
                        value={formData.service}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("service")}
                        onBlur={() => setFocusedField("")}
                        className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-800"
                        whileFocus={{ scale: 1.02 }}
                      >
                        <option>Website Design & Building</option>
                        <option>AI Automation</option>
                        <option>Search Engine Optimization (SEO)</option>
                        <option>Website Optimization (CRO)</option>
                        <option>General Inquiry</option>
                      </motion.select>
                      {focusedField === "service" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-2 right-2 w-4 h-4 bg-purple-500 rounded-full"
                        />
                      )}
                    </motion.div>

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      className="relative"
                    >
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message *
                      </label>
                      <motion.textarea
                        name="message"
                        id="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                        onFocus={() => setFocusedField("message")}
                        onBlur={() => setFocusedField("")}
                        required
                        className="w-full px-4 py-4 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 text-gray-800 placeholder-gray-500 resize-none"
                        placeholder="Tell us about your project..."
                        whileFocus={{ scale: 1.02 }}
                      />
                      {focusedField === "message" && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute -top-2 right-2 w-4 h-4 bg-purple-500 rounded-full"
                        />
                      )}
                    </motion.div>

                    {/* Terms Checkbox */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0, once: true }}
                      transition={{ duration: 0.6 }}
                      className="flex items-start space-x-3"
                    >
                      <motion.input
                        type="checkbox"
                        name="terms"
                        id="terms"
                        checked={formData.terms}
                        onChange={handleInputChange}
                        required
                        className="mt-1 w-4 h-4 text-purple-500 border-gray-300 rounded focus:ring-purple-400"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm text-gray-600 leading-relaxed"
                      >
                        I accept the{" "}
                        <motion.a
                          href="/terms"
                          className="text-purple-500 hover:text-purple-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          terms and conditions
                        </motion.a>{" "}
                        and{" "}
                        <motion.a
                          href="/privacy"
                          className="text-purple-500 hover:text-purple-600 transition-colors"
                          whileHover={{ scale: 1.05 }}
                        >
                          privacy policy
                        </motion.a>
                        *
                      </label>
                    </motion.div>

                    {/* Status Messages */}
                    {(responseMsg || errorMsg) && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl ${
                          responseMsg
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                        }`}
                      >
                        {responseMsg || errorMsg}
                      </motion.div>
                    )}

                    {/* Submit Button */}
                    <motion.button
                      type="button"
                      onClick={handleSubmit}
                      disabled={pending || !formData.terms}
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-8 rounded-xl font-medium text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0, once: true }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.6 }}
                      />
                      {pending ? (
                        <span className="inline-flex items-center relative z-10">
                          <motion.svg
                            className="-ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </motion.svg>
                          Sending Message...
                        </span>
                      ) : (
                        <span className="relative z-10">Send Message</span>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0, once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0, once: true }}
                transition={{ duration: 0.6 }}
                className="mb-8"
              >
                <h3 className="text-2xl font-light text-gray-800 mb-4">
                  Let's Connect
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Choose the best way to reach us. We're here to help bring your
                  vision to life.
                </p>
              </motion.div>

              {contact.map(({ src, label, description, value }, index) => (
                <motion.a
                  href={
                    value === "officialbookone@gmail.com"
                      ? "mailto:officialbookone@gmail.com"
                      : `tel:${value}`
                  }
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0, once: true }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30 cursor-pointer group transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <div className="flex items-start space-x-4 relative z-10">
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      transition={{ duration: 0.6 }}
                    >
                      {src}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                        {label}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                        {description}
                      </p>
                      <p className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors">
                        {value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0, once: true }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"
                  animate={{
                    background: [
                      "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%)",
                      "linear-gradient(225deg, rgba(99, 102, 241, 0.2) 0%, transparent 100%)",
                      "linear-gradient(315deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%)",
                      "linear-gradient(45deg, rgba(99, 102, 241, 0.2) 0%, transparent 100%)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="relative z-10">
                  <h4 className="text-xl font-semibold mb-3">
                    Ready to Start?
                  </h4>
                  <p className="text-purple-100 mb-6 leading-relaxed">
                    Book a free 30-minute consultation call with our experts
                    today.
                  </p>
                  <motion.button
                    className="bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-purple-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Link href="https://calendar.notion.so/meet/officialbookone/call">
                      <span className="relative z-10">Schedule Call</span>
                    </Link>
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
