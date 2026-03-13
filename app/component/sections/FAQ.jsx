"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb } from "lucide-react";
import Link from "next/link";

function FAQ() {
  const [selectedTest, setSelectedTest] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const faqRefs = useRef([]);


  const faq = [
    {
      title: "Wait, so what exactly do you do?",
      desc: "We build high-performance websites and implement AI automation. We make sure your site loads instantly, looks premium, drives sales, and we automate the repetitive parts of your business (like lead nurturing and customer support) using AI.",
    },
    {
      title: "Who is your ideal client?",
      desc: "We partner with ambitious startups, aggressive local brands, and scaling creators. If you view your website as an investment to generate revenue—not just a digital business card—we're a match.",
    },
    {
      title: "Do I need to know how to code?",
      desc: "Zero coding required on your end. We handle all the technical heavy lifting, design, deployment, and optimization. You just focus on closing the leads we bring you.",
    },
    {
      title: "How fast do you ship?",
      desc: "Most MVPs and standard web projects go live within 2 to 4 weeks. Complex web applications with deep AI integrations take a bit longer, but we always prioritize speed to market.",
    },
    {
      title: "Do you offer post-launch support?",
      desc: "Yes. We don't just hand over the keys and vanish. We offer retainers for ongoing optimization, SEO growth, and infrastructure maintenance to ensure your growth never stalls.",
    },
  ];

  // Memoize the keyboard navigation handler
  const handleKeyDown = useCallback(
    (e, title, idx) => {
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
    },
    [selectedTest, faq.length]
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        // Make the stagger a bit faster
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150, // Snappier
        damping: 15,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150, // Snappier
        damping: 18,
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -5,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150, // Snappier accordion open
        damping: 20,
        opacity: { duration: 0.2 },
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -5,
      transition: {
        duration: 0.2, // Fast exit
        ease: "easeIn",
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
    <section className="bg-[#0B0B0E] w-full py-16">
      <div
        id="faqs"
        className="container px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
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
          className="inline-flex items-center px-4 py-2 bg-[#1A1A24]/60 backdrop-blur-md border border-white/10 rounded-full text-sm font-medium text-[#A78BFA] mb-6 shadow-sm"
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
          className="text-5xl md:text-6xl font-black text-white mb-4 leading-tight"
          tabIndex={0}
        >
          We Know{" "}
          <span className="text-[#8B5CF6]">
            What You Think
          </span>
        </h2>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
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
                group bg-[#1A1A24]/60 backdrop-blur-md rounded-2xl border transition-all duration-300 overflow-hidden relative
                ${
                  isOpen
                    ? "border-[#8B5CF6]/50 shadow-[0_0_20px_rgba(139,92,246,0.15)] bg-[#11111A]/80 text-white"
                    : "border-white/10 hover:border-white/20 hover:bg-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                }
                ${
                  focusedIndex === idx
                    ? "ring-2 ring-[#8B5CF6] ring-offset-2 ring-offset-[#0B0B0E]"
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
                      ? "bg-transparent"
                      : "group-hover:bg-white/5"
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
                    <div className="relative">
                      {isOpen && (
                        <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-md rounded-full"></div>
                      )}
                      <motion.div
                        className={`
                          relative z-10 flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm font-mono tracking-wider transition-all duration-300
                          ${
                            isOpen
                              ? "bg-[#1A1A24] border border-[#8B5CF6]/50 text-white shadow-[inset_0_0_10px_rgba(139,92,246,0.2)]"
                              : "bg-white/5 border border-white/10 text-slate-400 group-hover:bg-[#6B46C1]/10 group-hover:text-[#A78BFA] group-hover:border-[#6B46C1]/30"
                          }
                        `}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </motion.div>
                    </div>

                    {/* Question Title */}
                    <h3
                      id={headingId}
                      className={`
                        text-lg md:text-xl font-bold transition-colors duration-300
                        ${
                          isOpen
                            ? "text-white"
                            : "text-slate-300 group-hover:text-white"
                        }
                      `}
                    >
                      {title}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <div className="relative">
                    {isOpen && (
                      <div className="absolute inset-0 bg-[#8B5CF6]/30 blur-md rounded-full shadow-[0_0_15px_rgba(139,92,246,0.5)]"></div>
                    )}
                    <motion.div
                      variants={iconVariants}
                      animate={isOpen ? "open" : "closed"}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={`
                        relative z-10 flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                        ${
                          isOpen
                            ? "bg-[#6B46C1] text-white border border-[#8B5CF6]/50"
                            : "bg-white/5 border border-white/10 text-slate-400 group-hover:bg-[#6B46C1]/20 group-hover:text-[#A78BFA] group-hover:border-[#6B46C1]/30"
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
                    className="relative overflow-hidden"
                  >
                    {/* Laser Scan Effect */}
                    <motion.div
                      className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent z-0 opacity-70 shadow-[0_0_15px_rgba(139,92,246,0.8)]"
                      initial={{ top: 0, opacity: 1 }}
                      animate={{ top: "100%", opacity: 0 }}
                      transition={{ duration: 1.5, ease: "linear" }}
                    />
                    <div className="relative z-10 md:px-6 pb-6 pt-2">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="pl-20 pr-4 relative"
                      >
                        {/* Vertical line connection */}
                        <div className="absolute left-[34px] top-[-10px] bottom-6 w-[2px] bg-gradient-to-b from-[#8B5CF6]/50 to-transparent"></div>
                        <div className="absolute left-[31px] top-[-10px] w-[8px] h-[8px] rounded-full bg-[#8B5CF6] shadow-[0_0_10px_rgba(139,92,246,0.8)]"></div>
                        
                        <div className="h-px bg-[#8B5CF6]/20 mb-4 ml-[-20px] w-[20px]"></div>
                        <p className="text-slate-400 leading-relaxed text-base md:text-lg">
                          {desc}
                        </p>

                        {/* Additional helpful info */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.3 }}
                          className="mt-4 p-3 bg-[#6B46C1]/10 rounded-lg border-l-4 border-[#8B5CF6]/50"
                        >
                          <p className="text-sm text-[#A78BFA] font-medium">
                            <Lightbulb className="w-4 h-4 inline mr-1" /> Still
                            have questions?
                            <a
                              href="mailto:officialbookone@gmail.com"
                              className="ml-2 text-white underline hover:no-underline transition-all duration-200"
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
        className="mt-16 text-center bg-[#1A1A24]/60 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-lg"
      >
        <h3 className="text-2xl font-bold text-white mb-4">
          Didn't find what you were looking for?
        </h3>
        <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
          Our team is here to help! Get in touch with us for personalized
          answers to your specific questions.
        </p>
        <Link
          href="mailto:officialbookone@gmail.com"
       
          className="inline-flex items-center sm:px-8 p-3 bg-[#6b46c1] hover:bg-[#8B5CF6] text-white font-semibold rounded-xl shadow-[0_0_15px_rgba(107,70,193,0.3)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] transition-all duration-300 transform hover:-translate-y-1"
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
        </Link>
      </motion.div>

      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {selectedTest && `Answer expanded for: ${selectedTest}`}
      </div>
      </div>
    </section>
  );
}

export default FAQ;
