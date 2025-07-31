"use client";
import React, { useState, useRef, useEffect } from "react";
import { faq } from "../../Commons/details";
import { motion, AnimatePresence } from "framer-motion";

function FAQ() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const faqRefs = useRef([]);

  // Handle keyboard navigation
  const handleKeyDown = (e, title, idx) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        setSelectedTest(selectedTest === title ? null : title);
        break;
      case "ArrowDown":
        e.preventDefault();
        const nextIndex = idx < faq.length - 1 ? idx + 1 : 0;
        faqRefs.current[nextIndex]?.focus();
        setFocusedIndex(nextIndex);
        break;
      case "ArrowUp":
        e.preventDefault();
        const prevIndex = idx > 0 ? idx - 1 : faq.length - 1;
        faqRefs.current[prevIndex]?.focus();
        setFocusedIndex(prevIndex);
        break;
      case "Home":
        e.preventDefault();
        faqRefs.current[0]?.focus();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        const lastIndex = faq.length - 1;
        faqRefs.current[lastIndex]?.focus();
        setFocusedIndex(lastIndex);
        break;
      case "Escape":
        if (selectedTest === title) {
          setSelectedTest(null);
        }
        break;
    }
  };

  // Animation variants
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
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        opacity: { duration: 0.3 },
        height: { duration: 0.4 },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 45 },
  };

  const hoverVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  return (
    <section
      className="container py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
      aria-label="Frequently Asked Questions"
      role="region"
    >
      {/* Enhanced Header */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="text-center mb-12"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-medium text-blue-800 mb-6"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Got Questions? We Have Answers
        </motion.div>

        <h2
          className="text-4xl md:text-5xl font-black text-gray-800 mb-4 leading-tight"
          tabIndex={0}
        >
          WE KNOW{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            WHAT YOU THINK
          </span>
        </h2>

        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find quick answers to the most common questions about our services and
          processes.
        </p>
      </motion.div>

      {/* Instructions for screen readers */}
      <div className="sr-only" aria-live="polite">
        Use arrow keys to navigate between questions. Press Enter or Space to
        expand answers. Press Escape to collapse.
      </div>

      {/* FAQ List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-4"
        role="list"
        aria-label="Frequently Asked Questions List"
      >
        {faq.map(({ title, desc }, idx) => {
          const isOpen = selectedTest === title;
          const panelId = `faq-panel-${idx}`;
          const headingId = `faq-heading-${idx}`;

          return (
            <motion.div
              key={title}
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
              {...hoverVariants}
              className={`
                group bg-white rounded-2xl border-2 transition-all duration-300 overflow-hidden
                ${
                  isOpen
                    ? "border-blue-500 shadow-xl bg-gradient-to-r from-blue-50 to-purple-50"
                    : "border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
                }
                ${
                  focusedIndex === idx
                    ? "ring-2 ring-blue-500 ring-offset-2"
                    : ""
                }
              `}
              role="listitem"
            >
              <motion.button
                ref={(el) => (faqRefs.current[idx] = el)}
                className={`
                  w-full p-6 text-left focus:outline-none transition-all duration-300
                  ${
                    isOpen
                      ? "bg-gradient-to-r from-blue-50 to-purple-50"
                      : "hover:bg-gray-50"
                  }
                `}
                onClick={() => setSelectedTest(isOpen ? null : title)}
                onKeyDown={(e) => handleKeyDown(e, title, idx)}
                onFocus={() => setFocusedIndex(idx)}
                onBlur={() => setFocusedIndex(null)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-describedby={isOpen ? panelId : undefined}
                type="button"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Question Number */}
                    <motion.div
                      className={`
                        flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300
                        ${
                          isOpen
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                        }
                      `}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </motion.div>

                    {/* Question Title */}
                    <h3
                      id={headingId}
                      className={`
                        text-lg md:text-xl font-bold transition-colors duration-300
                        ${
                          isOpen
                            ? "text-blue-800"
                            : "text-gray-800 group-hover:text-blue-600"
                        }
                      `}
                    >
                      {title}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <motion.div
                    variants={iconVariants}
                    animate={isOpen ? "open" : "closed"}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`
                      flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                      ${
                        isOpen
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                      }
                    `}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.button>

              {/* Answer Panel */}
              <AnimatePresence mode="wait">
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={headingId}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        className="pl-14 pr-4"
                      >
                        <div className="h-px bg-gradient-to-r from-blue-200 to-purple-200 mb-4"></div>
                        <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                          {desc}
                        </p>

                        {/* Additional helpful info */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="mt-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400"
                        >
                          <p className="text-sm text-blue-800 font-medium">
                            💡 Still have questions?
                            <a
                              href="#contact"
                              className="ml-2 underline hover:no-underline transition-all duration-200"
                              tabIndex={0}
                            >
                              Contact us for personalized help
                            </a>
                          </p>
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200"
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Didn't find what you were looking for?
        </h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Our team is here to help! Get in touch with us for personalized
          answers to your specific questions.
        </p>
        <motion.a
          href="mailto:officialbookone@gmail.com"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
          tabIndex={0}
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          Get Personal Support
        </motion.a>
      </motion.div>

      {/* Live region for screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {selectedTest && `Answer expanded for: ${selectedTest}`}
      </div>
    </section>
  );
}

export default FAQ;
