import React from "react";
import { motion } from "framer-motion";

const ProcessStep = ({ step, title, description, icon, delay = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03, y: -3 }}
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
      aria-labelledby={`step-${step}-title`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:from-purple-600 group-hover:to-blue-500 transition-all duration-300"
        aria-hidden="true"
      >
        <span className="text-2xl text-white font-bold">{step}</span>
      </motion.div>
      <h3
        id={`step-${step}-title`}
        className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300"
      >
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4, duration: 0.3 }}
        className="mt-4 flex items-center text-blue-500 font-medium text-sm"
        aria-hidden="true"
      >
        <span className="mr-2">Next</span>
        <motion.svg
          animate={{ x: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </motion.svg>
      </motion.div>
    </motion.article>
  );
};

export default ProcessStep;
