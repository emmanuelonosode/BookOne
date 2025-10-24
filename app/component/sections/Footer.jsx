"use client";
import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Optimized data structures - memoized at module level
const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/get-started", label: "Get Quote" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
] 

const resources = [
  { href: "/blogs", label: "Blogs" },
  { href: "mailto:officialbookone@gmail.com", label: "Support" },
  { href: "tel:+2348077080903", label: "Call Us" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/authors", label: "Authors" },
] 

const socialLinks = [
  {
    platform: "Twitter",
    href: "https://x.com/bookonedev",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: "LinkedIn",
    href: "https://www.linkedin.com/emmanuelonosode",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: "Instagram",
    href: "https://www.instagram.com/bookone.dev/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.175-1.297-.49-.368-.315-.49-.753-.49-1.243 0-.49.122-.928.49-1.243.369-.315.807-.49 1.297-.49s.928.175 1.297.49c.368.315.49.753.49 1.243 0 .49-.122.928-.49 1.243-.369.315-.807.49-1.297.49z" />
      </svg>
    ),
  },
  {
    platform: "GitHub",
    href: "https://github.com/emmanuelonosode",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
] 

const footerLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms of Service" },
  { href: "/cookies-policy", label: "Cookie Settings" },
] 

// Performance-optimized link component
const FooterLink = React.memo(({ href, label, className = "" }) => (
  <Link
    href={href}
    className={`text-gray-400 hover:text-white transition-colors duration-200 group ${className}`}
    aria-label={`Navigate to ${label}`}
  >
    {label}
    <span className="block h-0.5 w-0 bg-purple-400 transition-all duration-200 group-hover:w-full mt-1" />
  </Link>
));

FooterLink.displayName = 'FooterLink';

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
        setSubmitStatus("Welcome to the journey! Check your email for confirmation.");
        setEmail("");
      } else {
        setSubmitStatus(result.message || "Something went wrong. Please try again.");
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
      className="relative bg-black text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-linear-to-br from-black via-gray-900 to-black" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-linear-to-r from-transparent via-purple-500/50 to-transparent" />
      
      {/* Main Content */}
      <div className="relative z-10 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          
          {/* Top Section - Newsletter CTA */}
          <div className="border-b border-gray-800 py-16 lg:py-20">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                  Ready to <span className="text-purple-400">scale</span> your business?
                </h2>
                <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                  Join 1,000+ entrepreneurs who trust us with their digital transformation.
                </p>
                
                {/* Newsletter Form */}
                <div className="max-w-md mx-auto">
                  <div className="flex gap-3 max-md:flex-col max-md:items-center max-md:mb-4 ">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      disabled={isSubmitting}
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !email.trim()}
                      className="px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                      {isSubmitting ? "..." : "Join Now"}
                    </button>
                  </div>
                  
                  {submitStatus && (
                    <p className={`text-sm mt-3 ${submitStatus.includes('Welcome') ? 'text-green-400' : 'text-red-400'}`}>
                      {submitStatus}
                    </p>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Main Footer Content */}
          <div className="py-16 lg:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              
              {/* Brand Section */}
              <div className="lg:col-span-5">
                <Link href="/" className="inline-flex items-center space-x-3 mb-6 group">
                  <div className="flex items-center space-x-2">
                    <Image
                      src="/logo.svg"
                      width={40}
                      height={40}
                      alt="BookOne logo"
                      className="w-10 h-10"
                    />
                    <span className="text-3xl font-bold tracking-wide group-hover:text-purple-400 transition-colors duration-200">
                      BOOKONE
                    </span>
                  </div>
                </Link>
                
                <p className="text-lg text-gray-300 mb-2">Unlock digital profit</p>
                <p className="text-gray-400 leading-relaxed mb-8 max-w-md">
                  Transforming dreams into digital reality through innovative web design, 
                  strategic SEO, and intelligent automation solutions.
                </p>
                
                {/* Social Links */}
                <div className="flex space-x-4">
                  {socialLinks.map(({ platform, href, icon }) => (
                    <a
                      key={platform}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-purple-600 hover:text-white transition-all duration-200 group"
                      aria-label={`Follow us on ${platform}`}
                    >
                      <span className="group-hover:scale-110 transition-transform duration-200">
                        {icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
                
                {/* Quick Links */}
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Navigate
                  </h3>
                  <ul className="space-y-3">
                    {quickLinks.map(({ href, label }) => (
                      <li key={label}>
                        <FooterLink href={href} label={label} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Connect
                  </h3>
                  <ul className="space-y-3">
                    {resources.map(({ href, label }) => (
                      <li key={label}>
                        <FooterLink href={href} label={label} />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Company Info */}
                <div>
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                    Company
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <span className="text-gray-400">Lagos, Nigeria</span>
                    </li>
                    <li>
                      <a
                        href="tel:+2348077080903"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        +234 807 708 0903
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:info@bookone.dev"
                        className="text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        info@bookone.dev
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <p className="text-gray-400 text-sm">
                © {currentYear} BookOne. Crafted with passion for your success.
              </p>
              
              <div className="flex flex-wrap justify-center sm:justify-end space-x-6 text-sm">
                {footerLinks.map(({ href, label }) => (
                  <FooterLink key={label} href={href} label={label} />
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