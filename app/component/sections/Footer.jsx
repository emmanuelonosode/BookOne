"use client";
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { companySocialLinks } from "../../data";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

// Optimized data structures - memoized at module level
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
  { href: "/authors", label: "Authors" },
];

const footerLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
  { href: "/cookies-policy", label: "Cookie Settings" },
];

// Performance-optimized link component
const FooterLink = React.memo(({ href, label, className = "" }) => (
  <Link
    href={href}
    className={`text-gray-400 hover:text-purple-400 transition-colors duration-300 flex items-center group ${className}`}
    aria-label={`Navigate to ${label}`}
  >
    <span className="w-0 group-hover:w-2 h-0.5 bg-purple-500 mr-0 group-hover:mr-2 transition-all duration-300" />
    {label}
  </Link>
));

FooterLink.displayName = "FooterLink";

function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  // Optimized submit handler with proper error handling
  const handleSubmit = useCallback(async () => {
    if (!email.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const result = await res.json();

      if (res.ok) {
        setSubmitStatus(
          "Welcome to the journey! Check your email for confirmation."
        );
        setEmail("");
      } else {
        setSubmitStatus(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setSubmitStatus("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [email, isSubmitting]);

  // Memoized current year
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer
      role="contentinfo"
      aria-label="Site Footer"
      className="relative bg-[#0B0B0E] text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#6B46C1]/10 via-[#0B0B0E] to-[#0B0B0E]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      {/* Main Content */}
      <div className="relative z-10 px-6 lg:px-8 pt-20 pb-12">
        <div className="mx-auto max-w-7xl">
          {/* Top Section - Newsletter CTA */}
          <div className="relative rounded-3xl overflow-hidden mb-20 p-8 md:p-12 lg:p-16">
            {/* Glassmorphism Background */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border border-white/10" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10" />
            
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white">
                    Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">scale</span> your business?
                  </h2>
                  <p className="text-lg text-gray-300 max-w-xl">
                    Join 1,000+ entrepreneurs who trust us with their digital transformation. Get exclusive insights delivered to your inbox.
                  </p>
                </motion.div>
              </div>

              <div className="w-full max-w-md lg:ml-auto">
                <div className="flex gap-3 flex-col sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/50 focus:border-[#8B5CF6]/50 transition-all duration-300 backdrop-blur-sm"
                      disabled={isSubmitting}
                    />
                  </div>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !email.trim()}
                    className="px-8 py-4 bg-gradient-to-r from-[#6B46C1] to-blue-600 text-white font-semibold rounded-xl hover:shadow-[0_0_15px_rgba(107,70,193,0.5)] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#0B0B0E] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap flex items-center justify-center gap-2 group"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
                {submitStatus && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm mt-4 pl-1 ${
                      submitStatus.includes("Welcome")
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {submitStatus}
                  </motion.p>
                )}
              </div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand Section */}
            <div className="lg:col-span-4">
              <Link
                href="/"
                className="inline-flex items-center space-x-3 mb-6 group"
              >
                <div className="relative w-10 h-10">
                  <Image
                    src="/logo.svg"
                    fill
                    alt="BookOne logo"
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-bold tracking-wide text-white group-hover:text-purple-400 transition-colors duration-300">
                  BOOKONE
                </span>
              </Link>

              <p className="text-gray-400 leading-relaxed mb-8 max-w-sm">
                Transforming dreams into digital reality through innovative
                web design, strategic SEO, and intelligent automation
                solutions.
              </p>

              {/* Social Links */}
              <div className="flex gap-4">
                {companySocialLinks.map(({ name, url, icon }) => (
                  <Link
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:border-purple-600 hover:text-white transition-all duration-300 group"
                    aria-label={`Follow us on ${name}`}
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">
                      {icon}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:pl-12">
              {/* Quick Links */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-purple-500 rounded-full"></span>
                  Navigate
                </h3>
                <ul className="space-y-4">
                  {quickLinks.map(({ href, label }) => (
                    <li key={label}>
                      <FooterLink href={href} label={label} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-blue-500 rounded-full"></span>
                  Connect
                </h3>
                <ul className="space-y-4">
                  {resources.map(({ href, label }) => (
                    <li key={label}>
                      <FooterLink href={href} label={label} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-pink-500 rounded-full"></span>
                  Contact
                </h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-3 text-gray-400">
                    <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-1" />
                    <span>Lagos, Nigeria</span>
                  </li>
                  <li>
                    <a
                      href="tel:+2348077080903"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                    >
                      <Phone className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                      +234 807 708 0903
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:hello@bookone.dev"
                      className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 group"
                    >
                      <Mail className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-transform" />
                      hello@bookone.dev
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {currentYear} BookOne. Crafted with <span className="text-red-500">❤</span> for your success.
              </p>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {footerLinks.map(({ href, label }) => (
                  <Link 
                    key={label} 
                    href={href} 
                    className="text-gray-500 hover:text-purple-400 transition-colors duration-300"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
