"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function EnhancedContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    previousWebsite: "",
    services: [],
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const services = [
    { id: "web-design", label: "Web Design & Development" },
    { id: "ai-automation", label: "AI Automation & Workflow" },
    { id: "seo", label: "SEO Optimization" },
    { id: "ecommerce", label: "E-commerce Solutions" },
    { id: "maintenance", label: "Website Maintenance" },
    { id: "consulting", label: "Digital Consulting" },
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
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit  (e)  {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

   const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const result = await res.json();
  if (result.success) {
    alert("Message sent successfully!");
  } else {
    alert("Something went wrong.");
  }
  };

  
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const socialLinks = [
    { name: "Facebook", url: "#" },
    { name: "Instagram", url: "#" },
    { name: "LinkedIn", url: "#" },
    { name: "X (Twitter)", url: "#" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-purple-600 text-white font-bold text-xl px-3 py-1 mr-1">
                E
              </div>
              <div className="text-black font-bold text-xl">MMS</div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                About
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Division
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Case Studies
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 transition-colors"
              >
                Blogs
              </a>
            </nav>
            <button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors">
              Contact Us
            </button>
          </div>
        </div>
      </motion.header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                LET'S TALK ABOUT
                <br />
                YOUR PROJECT
              </h1>
              <p className="text-xl text-gray-600 mb-12">
                Let's Build Something Brilliant Together
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Contact Info
              </h2>
              <div className="space-y-4">
                <motion.a
                  href="mailto:hello@bookone.dev"
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  hello@bookone.dev
                </motion.a>
                <motion.a
                  href="tel:+2348077080903
"
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  +2348077080903
                </motion.a>
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center text-gray-700"
                >
                  <MapPin className="w-5 h-5 mr-3" />
                  Allen Avenue, Lagos, Nigeria.
                </motion.div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Follow Our Social Platform
              </h2>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ scale: 1.05, backgroundColor: "#7c3aed" }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="px-5 py-2 border-2 border-gray-900 rounded-md text-gray-900 hover:text-white transition-colors"
                  >
                    {social.name}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12 space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-600"
              >
                <h3 className="font-bold text-gray-900 mb-2">
                  Quick Response Time
                </h3>
                <p className="text-gray-600">
                  We typically respond within 24 hours
                </p>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600"
              >
                <h3 className="font-bold text-gray-900 mb-2">
                  Free Consultation
                </h3>
                <p className="text-gray-600">
                  Get expert advice for your project
                </p>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <AnimatePresence mode="wait">
                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                    <p className="text-green-800">
                      Message sent successfully! We'll get back to you soon.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    } focus:border-purple-600 outline-none transition-colors bg-transparent`}
                  />
                  {errors.firstName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.firstName}
                    </motion.p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className={`w-full px-4 py-3 border-b-2 ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    } focus:border-purple-600 outline-none transition-colors bg-transparent`}
                  />
                  {errors.lastName && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-red-500 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.lastName}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border-b-2 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } focus:border-purple-600 outline-none transition-colors bg-transparent`}
                />
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.email}
                  </motion.p>
                )}
              </div>

              <div className="mb-6">
                <input
                  type="url"
                  placeholder="Previous Website (Optional)"
                  value={formData.previousWebsite}
                  onChange={(e) =>
                    handleInputChange("previousWebsite", e.target.value)
                  }
                  className="w-full px-4 py-3 border-b-2 border-gray-300 focus:border-purple-600 outline-none transition-colors bg-transparent"
                />
              </div>

              <div className="mb-6">
                <p className="text-gray-700 font-medium mb-3">
                  What service will you like to do
                </p>
                <div className="grid md:grid-cols-2 gap-3">
                  {services.map((service, index) => (
                    <motion.button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`px-4 py-3 border-2 rounded-md text-left transition-all ${
                        formData.services.includes(service.id)
                          ? "border-purple-600 bg-purple-50 text-purple-700"
                          : "border-gray-300 hover:border-purple-300"
                      }`}
                    >
                      <span className="text-sm">{service.label}</span>
                    </motion.button>
                  ))}
                </div>
                {errors.services && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-2 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.services}
                  </motion.p>
                )}
              </div>

              <div className="mb-6">
                <textarea
                  placeholder="Message/Project Description"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  className={`w-full px-4 py-3 border-2 ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:border-purple-600 outline-none transition-colors resize-none`}
                />
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <AlertCircle className="w-4 h-4 mr-1" />
                    {errors.message}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-purple-600 text-white py-4 rounded-md font-medium hover:bg-purple-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-6 h-6 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
