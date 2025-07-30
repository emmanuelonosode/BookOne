"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data - replace with actual imports
const navDetails = [
  { id: 1, name: "Portfolio", href: "/portfolio" },
  { id: 2, name: "About", href: "/about" },
  { id: 3, name: "Services", href: "/services" },
  { id: 4, name: "  Blogs", href: "/blogs" },
  { id: 5, name: "Contact", href: "#contact" },
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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleScroll = () => setScrolled(window.scrollY > 20);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

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
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.a
              href="/"
              className="text-2xl md:text-3xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              BookOne
            </motion.a>

            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-8">
              {navDetails.map(({ name, href, id }) => (
                <motion.li key={id}>
                  <a
                    href={href}
                    className="text-gray-700 hover:text-gray-900 font-medium transition-colors relative group"
                  >
                    {name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* CTA & Hamburger */}
            <div className="flex items-center space-x-4">
              <motion.a
                href="https://calendar.notion.so/meet/officialbookone/call"
                className="hidden sm:inline-flex bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition-colors text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get a free consultation
              </motion.a>

              {/* Hamburger */}
              <motion.button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                whileTap={{ scale: 0.95 }}
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
                <div className="space-y-6">
                  {navDetails.map(({ name, href, id }) => (
                    <motion.div key={id} variants={itemVariants}>
                      <a
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between py-4 border-b border-gray-200/50 group"
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
                      </a>
                    </motion.div>
                  ))}

                  {/* Blog Link */}
                  <motion.div variants={itemVariants}>
                    <a
                      href="/blogs"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between py-4 border-b border-gray-200/50 group"
                    >
                      <span className="text-lg font-medium text-gray-800 group-hover:text-gray-600 transition-colors">
                        Blogs
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
                    </a>
                  </motion.div>
                </div>

                {/* CTA */}
                <motion.div variants={itemVariants} className="mt-8">
                  <a
                    href="https://calendar.notion.so/meet/officialbookone/call"
                    onClick={() => setMenuOpen(false)}
                    className="w-full inline-flex items-center justify-center bg-gray-800 text-white px-6 py-4 rounded-full hover:bg-gray-700 transition-colors font-medium"
                  >
                    Get a free consultation
                  </a>
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
