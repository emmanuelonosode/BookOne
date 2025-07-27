"use client";
import React, { useState } from "react";
import { faq } from "../../Commons/details";
import { motion } from "framer-motion";

function FAQ() {
  const [selectedTest, setSelectedTest] = useState(null);

  return (
    <section
      className="container py-12"
      aria-label="Frequently Asked Questions"
      role="region"
    >
      <h2 className="mb-8 h3 text-gray-900 lowercase" tabIndex={0}>
        WE KNOW <span>WHAT YOU THINK</span>
      </h2>
      <motion.div
        transition={{
          ease: "anticipate",
          duration: 0.5,
        }}
        className="flex flex-col gap-4"
        aria-label="FAQ List"
      >
        {faq.map(({ title, desc }, idx) => {
          const isOpen = selectedTest === title;
          const panelId = `faq-panel-${idx}`;
          const headingId = `faq-heading-${idx}`;
          return (
            <motion.div
              key={title}
              className="border-b-2 border-gray-300 p-4 first:border-t-2 cursor-pointer"
              onClick={() => setSelectedTest(isOpen ? null : title)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedTest(isOpen ? null : title);
                }
              }}
              aria-label={`Toggle answer for: ${title}`}
            >
              <motion.div className="flex gap-5 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6 transition-transform duration-300"
                  style={{
                    transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <h4
                  className="h4 text-gray-800 font-semibold"
                  id={headingId}
                  tabIndex={0}
                >
                  {title}
                </h4>
              </motion.div>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headingId}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="md:mx-16 py-5"
                  tabIndex={0}
                >
                  <p className="text-gray-800">{desc}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}

export default FAQ;
