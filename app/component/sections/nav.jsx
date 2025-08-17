"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Mock data - replace with actual imports
const navDetails = [
  { id: 1, name: "Portfolio", href: "/portfolio" },
  { id: 2, name: "About", href: "/about" },
  { id: 3, name: "Services", href: "/services" },
  { id: 4, name: "Blog", href: "/blogs" },
];

const socialIcons = [
  {
    src: "/social-1.svg",
    alt: "Twitter",
    href: "https://twitter.com/@Emmanuelonosod1",
  },
  {
    src: "/social-2.svg",
    alt: "LinkedIn",
    href: "https://www.linkedin.com/emmanuelonosode",
  },
  {
    src: "/social-3.svg",
    alt: "GitHub",
    href: "https://github.com/emmanuelonosode",
  },
];

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [consultationDropdownOpen, setConsultationDropdownOpen] =
    useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        consultationDropdownOpen &&
        !event.target.closest(".consultation-dropdown")
      ) {
        setConsultationDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [consultationDropdownOpen]);

  // Close mobile menu when window resizes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () =>
    setConsultationDropdownOpen(!consultationDropdownOpen);

  return (
    <header
      role="banner"
      aria-label="Main Navigation"
      className="fixed top-0 left-0 right-0 z-50"
    >
      <motion.nav
        className="transition-all duration-300 bg-white/80 backdrop-blur-sm"
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 ">
              <Link
                href="/"
                className="flex items-center space-x-2"
                role="BookOne Logo"
              >
                <Image
                  src="/logo.svg"
                  width={34}
                  height={34}
                  className="py-4"
                  alt="BookOne Logo"
                />
                <span className="hidden sm:block text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-gray-900 hover:text-gray-700 transition-colors">
                  BookOne
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav
              aria-roledescription="Main Navigation"
              role="navigation"
              aria-label="Main Navigation"
              className="hidden md:flex items-center space-x-1 lg:space-x-2"
            >
              {navDetails.map(({ name, href, id }) => (
                <Link
                  key={id}
                  href={href}
                  aria-label={name}
                  role="menuitem"
                  className="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200 relative group"
                >
                  {name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#6b46c1] transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
                </Link>
              ))}
            </nav>

            {/* CTA & Mobile Menu */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Desktop CTA Dropdown */}
              <div className="hidden sm:block relative consultation-dropdown">
                <motion.button
                  onClick={toggleDropdown}
                  className="bg-[#6b46c1] text-white px-4 lg:px-6 py-2 lg:py-3 rounded-full hover:bg-[#553c9a] transition-all duration-200 text-sm lg:text-base font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Get Free Consultation</span>
                  <motion.svg
                    className="w-4 h-4"
                    animate={{ rotate: consultationDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </motion.svg>
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {consultationDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        <a
                          href="https://calendar.notion.so/meet/officialbookone/call"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors group"
                          onClick={() => setConsultationDropdownOpen(false)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                            <svg
                              className="w-5 h-5 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              Book a Call
                            </div>
                            <div className="text-xs text-gray-500">
                              Free 30-min consultation
                            </div>
                          </div>
                        </a>

                        <Link
                          href="/get-started"
                          onClick={() => setConsultationDropdownOpen(false)}
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors">
                            <svg
                              className="w-5 h-5 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">
                              Get Quote
                            </div>
                            <div className="text-xs text-gray-500">
                              Custom project proposal
                            </div>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile CTA Button */}
              <div className="sm:hidden">
                <a
                  href="https://calendar.notion.so/meet/officialbookone/call"
                  className="bg-[#6b46c1] text-white px-4 py-2 rounded-full hover:bg-[#553c9a] transition-colors text-sm font-semibold shadow-lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Call
                </a>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors z-50 relative"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 bg-gray-800 transition-all duration-300 origin-center ${
                      menuOpen ? "rotate-45 translate-y-2" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-gray-800 transition-all duration-300 ${
                      menuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 bg-gray-800 transition-all duration-300 origin-center ${
                      menuOpen ? "-rotate-45 -translate-y-2" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={toggleMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-50 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <span className="text-xl font-bold text-gray-900">Menu</span>
                  <button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
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
                  </button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 py-6">
                  <nav className="px-6 space-y-2">
                    {navDetails.map(({ name, href, id }) => (
                      <Link
                        key={id}
                        href={href}
                        onClick={toggleMenu}
                        className="flex items-center justify-between py-4 text-lg font-medium text-gray-900 hover:text-[#6b46c1] transition-colors group"
                      >
                        <span>{name}</span>
                        <svg
                          className="w-5 h-5 text-gray-400 group-hover:text-[#6b46c1] transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    ))}
                  </nav>

                  {/* Mobile CTA Buttons */}
                  <div className="px-6 mt-8 space-y-4">
                    <a
                      href="https://calendar.notion.so/meet/officialbookone/call"
                      onClick={toggleMenu}
                      className="w-full bg-[#6b46c1] text-white py-4 px-6 rounded-2xl font-semibold text-center hover:bg-[#553c9a] transition-colors shadow-lg flex items-center justify-center space-x-2"
                      target="_blank"
                      rel="noopener noreferrer"
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
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>Book Free Consultation</span>
                    </a>

                    <Link
                      href="/get-started"
                      onClick={toggleMenu}
                      className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-2xl font-semibold text-center hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
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
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      <span>Get Custom Quote</span>
                    </Link>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100">
                  <p className="text-sm font-medium text-gray-600 mb-4">
                    Follow us
                  </p>
                  <div className="flex space-x-4">
                    {socialIcons.map(({ src, alt, href }, index) => (
                      <a
                        key={index}
                        href={href}
                        className="w-12 h-12 rounded-full bg-gray-100 hover:bg-[#6b46c1] hover:text-white transition-colors flex items-center justify-center group"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={src}
                          alt={alt}
                          width={24}
                          height={24}
                          className="group-hover:filter group-hover:brightness-0 group-hover:invert transition-all"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
