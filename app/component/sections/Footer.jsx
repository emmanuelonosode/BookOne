"use client";
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Link from "next/link";

// Mock data - replace with your actual imports
const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-started", label: "Get Quote" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
];

const resources = [
  { href: "/blogs", label: "Blogs" },
  { href: "mailto:officialbookone@gmail.com", label: "Support" },
  { href: "tel:+2348077080903", label: "Call Us" },
  { href: "/#faqs", label: "FAQs" },
];

// Memoize social links data
const socialLinks = [
  {
    platform: "Twitter",
    icon: <FaTwitter />,
    href: "https://twitter.com/@Emmanuelonosod1",
  },
  {
    platform: "LinkedIn",
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/emmanuelonosode",
  },
  {
    platform: "Instagram",
    icon: <FaInstagram />,
    href: "https://instagram.com/emmanuelonosode",
  },
  {
    platform: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com/emmanuelonosode",
  },
];

// Memoize footer links data
const footerLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
  { href: "/cookies-policy", label: "Cookie Settings" },
];

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Memoize the submit handler to prevent unnecessary re-renders
  const handleSubmit = useCallback(async () => {
    if (!email.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const result = await res.json();
      setSubmitStatus(result.message || "Successfully subscribed!");
      if (res.ok) {
        setEmail("");
      }
    } catch (error) {
      setSubmitStatus("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [email]);

  // Memoize animation variants to prevent recreation on every render
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  // Memoize current year to prevent recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Background Elements - Reduced for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-transparent rounded-full blur-xl"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl"></div>
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 py-20 px-6 md:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Link
                href="/"
                className="inline-block"
                aria-label="BookOne - Home"
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    BookOne
                  </h2>
                  <p className="text-gray-300 text-lg">Unlock digital profit</p>
                </motion.div>
              </Link>

              {/* Social Links - Optimized animations */}
              <div className="flex space-x-4 mt-8">
                {socialLinks.map(({ platform, icon, href }, index) => (
                  <motion.a
                    aria-label={`Follow us on ${platform}`}
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.03, duration: 0.2 }}
                  >
                    <span className="text-white text-xs font-medium">
                      {icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links - Simplified animations */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Quick Links
              </h3>
              {quickLinks.map(({ href, label }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={href}
                    aria-label={`Navigate to ${label}`}
                    className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 group"
                  >
                    <span className="inline-flex items-center">
                      <span className="w-0 h-px bg-white transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-1"></span>
                      {label}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Resources - Simplified animations */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Resources
              </h3>
              <div className="space-y-3">
                {resources.map(({ href, label }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Link
                      href={href}
                      className="block text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2 group"
                    >
                      <span className="inline-flex items-center">
                        <span className="w-0 h-px bg-white transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-1"></span>
                        {label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <h3 className="text-lg font-semibold text-white mb-6">
                Stay Updated
              </h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Join our newsletter for the latest updates, insights, and
                exclusive content delivered to your inbox.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-primary to-blue-500 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Subscribe to newsletter"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
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
                      </svg>
                      Subscribing...
                    </span>
                  ) : (
                    "Subscribe"
                  )}
                </motion.button>

                {submitStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-xs ${
                      submitStatus.includes("Successfully")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitStatus}
                  </motion.p>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-4 leading-relaxed">
                By subscribing, you consent to our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-primary-400 hover:text-primary-300 transition-colors"
                  aria-label="View privacy policy"
                >
                  Privacy Policy
                </Link>{" "}
                and agree to receive updates.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Footer Bottom - Simplified animations */}
      <div className="relative z-10 border-t border-white/10 backdrop-blur-sm">
        <motion.div
          className="container mx-auto px-6 md:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} BookOne. All rights reserved.
            </p>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {footerLinks.map(({ href, label }, index) => (
                <Link
                  key={index}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
                  aria-label={`View ${label.toLowerCase()}`}
                >
                  <motion.div whileHover={{ y: -1 }}>
                    {label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary-400 transition-all duration-300 group-hover:w-full"></span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;
