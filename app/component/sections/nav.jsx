"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// Mock data - replace with actual imports
const navDetails = [
  { id: 1, name: "Portfolio", href: "/portfolio" },
  { id: 2, name: "About", href: "/about" },
  { id: 3, name: "Services", href: "/services" },
  { id: 4, name: "Blogs", href: "/blogs" },
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
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [consultationDropdownOpen, setConsultationDropdownOpen] =
    useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      let ticking = false;
      let lastScrollY = 0;
      let scrollThreshold = 5; // Minimum scroll distance to trigger nav change

      const handleScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const currentScrollY = window.scrollY;
            const scrollDelta = Math.abs(currentScrollY - lastScrollY);

            // Only update if scroll distance is significant enough
            if (scrollDelta > scrollThreshold) {
              // Check if scrolled past threshold for background change
              setScrolled(currentScrollY > 20);

              // Determine scroll direction and show/hide nav
              if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down - hide nav
                setIsVisible(false);
              } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show nav
                setIsVisible(true);
              }

              lastScrollY = currentScrollY;
            }

            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close consultation dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        consultationDropdownOpen &&
        !event.target.closest(".consultation-dropdown")
      ) {
        setConsultationDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [consultationDropdownOpen]);

  const menuVariants = {
    closed: {
      x: "100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.nav
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-white/100 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
            : "bg-white/40 backdrop-blur-xl"
        }`}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold text-black hover:text-gray-600 transition-colors"
              aria-label="BookOne - Home"
            >
              BookOne
            </Link>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-8">
              {navDetails.map(({ name, href, id }) => (
                <motion.li key={id}>
                  <Link
                    href={href}
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors relative group"
                    aria-label={`Navigate to ${name}`}
                  >
                    {name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* CTA & Hamburger */}
            <div className="flex items-center space-x-4">
              {/* Consultation Dropdown */}
              <div className="hidden sm:block relative consultation-dropdown">
                <motion.button
                  onClick={() =>
                    setConsultationDropdownOpen(!consultationDropdownOpen)
                  }
                  className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors text-sm font-medium flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Open consultation options dropdown"
                  aria-expanded={consultationDropdownOpen}
                  aria-haspopup="true"
                >
                  <span>Get a free consultation</span>
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
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
                    >
                      <div className="py-2">
                        <motion.a
                          href="https://calendar.notion.so/meet/officialbookone/call"
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors"
                          whileHover={{ x: 4 }}
                          onClick={() => setConsultationDropdownOpen(false)}
                          aria-label="Book a call - Schedule a free consultation"
                        >
                          <svg
                            className="w-5 h-5 mr-3 text-blue-600"
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
                          <div>
                            <div className="font-medium">Book a Call</div>
                            <div className="text-xs text-gray-500">
                              Schedule a free consultation
                            </div>
                          </div>
                        </motion.a>
                        <Link
                          href="/get-started"
                          aria-label="Get a quote - View pricing and get started"
                        >
                          <motion.div
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                            whileHover={{ x: 4 }}
                            onClick={() => setConsultationDropdownOpen(false)}
                          >
                            <svg
                              className="w-5 h-5 mr-3 text-purple-600"
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
                            <div>
                              <div className="font-medium">Get a Quote</div>
                              <div className="text-xs text-gray-500">
                                Request a custom proposal
                              </div>
                            </div>
                          </motion.div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Hamburger */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
              >
                <motion.div
                  className="w-6 h-5 flex flex-col justify-between"
                  animate={menuOpen ? "open" : "closed"}
                >
                  <motion.span
                    className="w-full h-0.5 bg-gray-800 origin-center"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 9 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="w-full h-0.5 bg-gray-800"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="w-full h-0.5 bg-gray-800 origin-center"
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -9 },
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Fullscreen Blur */}
            <motion.div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />

            {/* Mobile Sidebar */}
            <motion.div
              className="fixed top-20 right-0 h-screen w-full bg-white shadow-2xl border-l border-gray-200 z-50 md:hidden"
              style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255, 255, 255, 0.98)",
                WebkitBackdropFilter: "blur(10px)",
              }}
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-8 bg-white/100 backdrop-blur-sm rounded-lg ">
                {navDetails.map(({ name, href, id }) => (
                  <motion.div key={id} variants={itemVariants}>
                    <Link
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-gray-200/50 group"
                      aria-label={`Navigate to ${name}`}
                    >
                      <span className="text-lg font-medium text-gray-800 group-hover:text-gray-600 transition-colors">
                        {name}
                      </span>
                      <motion.div
                        className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all"
                        whileHover={{ x: 4 }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 6L15 12L9 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}

                {/* CTA Options */}
                <motion.div variants={itemVariants} className="mt-8 space-y-3">
                  <a
                    href="https://calendar.notion.so/meet/officialbookone/call"
                    onClick={() => setMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center bg-gray-800 text-white px-6 py-4 rounded-full hover:bg-gray-700 transition-colors font-medium"
                    aria-label="Book a call - Schedule a free consultation"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Book a Call
                  </a>
                  <Link
                    href="/get-started"
                    onClick={() => setMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center bg-white text-gray-800 px-6 py-4 rounded-full hover:bg-gray-50 transition-colors font-medium border border-gray-200"
                    aria-label="Get a quote - View pricing and get started"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
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
                    Get a Quote
                  </Link>
                </motion.div>

                {/* Social Links */}
                <motion.div variants={itemVariants} className="mt-12">
                  <h4 className="text-sm font-medium text-gray-600 mb-4 uppercase tracking-wider">
                    Follow us on all platforms
                  </h4>
                  <div className="flex space-x-6">
                    {socialIcons.map(({ src, alt, href }, index) => (
                      <motion.a
                        key={index}
                        href={href}
                        className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`Follow us on ${alt}`}
                      >
                        <img src={src} alt={alt} className="w-6 h-6" />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Nav;
