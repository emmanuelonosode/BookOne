"use client";
import React, { useState } from "react";
import { faq } from "../../Commons/details";
import { motion } from "framer-motion";

function FAQ() {
  const [selectedTest, setSelectedTest] = useState(null);

  return (
    <div className="container">
      <h2 className="mb-8 h3 text-gray-900 lowercase">
        WE KNOW <span>WHAT YOU THINK</span>{" "}
      </h2>
      <motion.div
        transition={{
          ease: "anticipate",
          duration: 0.5,
        }}
        className="flex flex-col gap-4"
      >
        {faq.map(({ title, desc }) => (
          <motion.div
            key={title}
            className="border-b-2 border-gray-300 p-4 first:border-t-2 cursor-pointer"
            onClick={
              () => setSelectedTest(selectedTest === title ? null : title) // Toggle logic
            }
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
                  transform:
                    selectedTest === title ? "rotate(45deg)" : "rotate(0deg)", // Rotate on expand
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              <h4 className="text-3xl text-gray-800 font-semibold">{title}</h4>
            </motion.div>
            {selectedTest === title && (
              <motion.p
                key={title}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mx-16 py-5"
              >
                <p className="pat text-gray-800">{desc}</p>
              </motion.p>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default FAQ;
