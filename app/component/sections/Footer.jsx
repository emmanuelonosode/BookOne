"use client";
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

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

  // Memoize current year to prevent recalculation
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      role="contentinfo"
      aria-label="Footer"
      className="relative bg-gradient-to-br from-slate-900  to-zinc-900 text-white"
    >
      {/* Inspiring Quote Section */}
      <div className="relative z-10 text-center py-16 px-6 md:px-8 border-b border-white/10">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed mb-6">
              <span className="bg-gradient-to-r from-purple-200 via-white to-blue-200 bg-clip-text text-transparent dark:from-purple-900 dark:via-black dark:to-blue-900">
                "Every great business was once just an idea waiting for the
                right partner to bring it to life."
              </span>
            </blockquote>
            <p className="text-lg text-gray-300 font-medium">
              Let's build something extraordinary together.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-16 px-6 md:px-8">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <a href="/" className="inline-block" aria-label="BookOne - Home">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 hover:text-purple-200 transition-colors duration-300">
                  BookOne
                </h2>
                <p className="text-gray-300 text-lg mb-4">
                  Unlock digital profit
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Transforming dreams into digital reality, one project at a
                  time.
                </p>
              </a>

              {/* Social Links */}
              <div className="flex space-x-4 mt-8">
                {socialLinks.map(({ platform, icon, href }) => (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-purple-600/30 transition-all duration-300 border border-white/20 group"
                    aria-label={`Follow us on ${platform}`}
                  >
                    <span className="text-white text-base group-hover:scale-110 transition-transform duration-200">
                      {icon}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Navigate
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 mt-2"></div>
              </h3>
              <div className="space-y-4">
                {quickLinks.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                    aria-label={`Navigate to ${label}`}
                  >
                    <span className="inline-flex items-center">
                      <span className="w-0 h-px bg-purple-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-3"></span>
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Connect
                <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 mt-2"></div>
              </h3>
              <div className="space-y-4">
                {resources.map(({ href, label }) => (
                  <a
                    key={label}
                    href={href}
                    className="block text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                  >
                    <span className="inline-flex items-center">
                      <span className="w-0 h-px bg-blue-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-3"></span>
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter - More Inspiring */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                Join the Journey
                <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mt-2"></div>
              </h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Be part of a community that turns visions into victories. Get
                exclusive insights, success stories, and actionable tips
                delivered weekly.
              </p>

              <div className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email for success stories"
                    required
                    className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 focus:bg-white/15"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                  aria-label="Subscribe to newsletter"
                >
                  <span className="relative z-10">
                    {isSubmitting
                      ? "Starting Your Journey..."
                      : "Start Your Success Journey"}
                  </span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                </button>

                {submitStatus && (
                  <p
                    className={`text-sm text-center ${
                      submitStatus.includes("confirmation")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitStatus}
                  </p>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-6 leading-relaxed">
                🚀 Join 1000+ entrepreneurs who trust us with their digital
                transformation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="relative z-10 border-t border-white/10">
        <div className="container mx-auto px-6 md:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © {currentYear} BookOne. Crafted with passion for your success.
            </p>

            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              {footerLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gray-400 hover:text-white transition-colors duration-300 relative group"
                  aria-label={`View ${label.toLowerCase()}`}
                >
                  {label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
