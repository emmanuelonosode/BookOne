"use client"; // This directive ensures the component is rendered on the client side

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
// Assuming you have SVG icon components or a utility for them
// Replace these with your actual icon imports (e.g., from a custom /icons folder or a library like 'lucide-react', 'react-icons')
import { Brain, Settings, ChartBar } from "lucide-react"; // Example: using lucide-react for icons
// You might need to install lucide-react: npm install lucide-react

// Optional: If you have a custom Tagline component like the one in AboutSection
// import Tagline from "./Tagline"; // Adjust path if necessary

export default function AiAutomationSection({ className = "" }) {
  const sectionRef = useRef(null);

  // useScroll hook to track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // Triggers when section enters/leaves viewport
  });

  // Parallax for the main image (subtle up/down movement on scroll)
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Variants for staggered animation of text blocks
  const textContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Delay between each child animation
        delayChildren: 0.05, // Delay before the first child starts animating
      },
    },
  };

  const textItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
      },
    },
  };

  // Variants for staggered animation of the feature cards
  const featureGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each feature card
        delayChildren: 0.3, // Delay before the first feature card animates
      },
    },
  };

  const featureCardVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`py-16 md:py-28 font-sans bg-gray-50 ${className} overflow-hidden relative`}
      aria-label="BookOne AI Automation Solutions"
      role="region"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 mb-16 md:mb-24">
          {/* Left Column: Image with Parallax */}
          <motion.div
            className="md:w-1/2 flex justify-center order-2 md:order-1" // Order for mobile vs desktop
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ y: imageY }} // Apply parallax effect
          >
            <img
              src="/ai.jpg" // Replace with your actual image URL
              alt="AI Automation for Business Transformation"
              width={600}
              height={400}
              className="w-full max-w-lg rounded-xl shadow-2xl object-cover transform hover:scale-[1.01] transition-transform duration-300 ease-in-out"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x400/6B46C1/FFFFFF?text=AI+Image+Error"; // Fallback
              }}
              aria-label="A person interacting with AI interface, representing business automation"
              role="img"
            />
          </motion.div>

          {/* Right Column: Main Text Content */}
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="md:w-1/2 text-center md:text-left order-1 md:order-2" // Order for mobile vs desktop
            aria-label="AI Automation Description"
          >
            {/* Optional: If you have a Tagline component */}
            {/* <motion.div variants={textItemVariants}>
                <Tagline tag="AI Solutions" />
            </motion.div> */}

            <motion.h2
              variants={textItemVariants}
              className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6"
              tabIndex={0}
            >
              Harness the Power of AI for Business Transformation
            </motion.h2>
            <motion.p
              variants={textItemVariants}
              className="text-lg text-gray-700 leading-relaxed mb-8"
              tabIndex={0}
            >
              At BookOne, we integrate artificial intelligence to redefine
              efficiency and growth for your enterprise. From automating routine
              tasks to deploying intelligent agents for customer support and
              data analysis, our AI solutions are designed to optimize every
              facet of your operations, freeing up your team to focus on
              strategic initiatives and innovation.
            </motion.p>
          </motion.div>
        </div>

        {/* AI Solutions Features Grid */}
        <div className="mt-16 md:mt-24 text-center">
          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-10"
            tabIndex={0}
          >
            Our AI Solutions Include:
          </motion.h3>

          <motion.div
            variants={featureGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            aria-label="Key AI features"
          >
            {/* AI Feature 1: Workflow Automation */}
            <motion.div
              variants={featureCardVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-transparent hover:border-primary/30"
              tabIndex={0}
            >
              <div className="mb-4 flex justify-center">
                <div className="icon-background p-4 rounded-full bg-primary/10">
                  <Brain className="h-10 w-10 text-primary" strokeWidth={1.5} />
                  {/* Replace with your actual icon component */}
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Workflow Automation
              </h4>
              <p className="text-gray-600">
                Automate repetitive tasks, data processing, and internal
                communications to enhance productivity and significantly reduce
                operational costs.
              </p>
            </motion.div>

            {/* AI Feature 2: Intelligent Agent Setup */}
            <motion.div
              variants={featureCardVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-transparent hover:border-primary/30"
              tabIndex={0}
            >
              <div className="mb-4 flex justify-center">
                <div className="icon-background p-4 rounded-full bg-primary/10">
                  <Settings
                    className="h-10 w-10 text-primary"
                    strokeWidth={1.5}
                  />
                  {/* Replace with your actual icon component */}
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Intelligent Agent Setup
              </h4>
              <p className="text-gray-600">
                Deploy custom AI agents for 24/7 customer support, efficient
                lead qualification, and personalized user experiences that drive
                satisfaction.
              </p>
            </motion.div>

            {/* AI Feature 3: Data-Driven Insights */}
            <motion.div
              variants={featureCardVariants}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out border border-transparent hover:border-primary/30"
              tabIndex={0}
            >
              <div className="mb-4 flex justify-center">
                <div className="icon-background p-4 rounded-full bg-primary/10">
                  <ChartBar
                    className="h-10 w-10 text-primary"
                    strokeWidth={1.5}
                  />
                  {/* Replace with your actual icon component */}
                </div>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-3">
                Data-Driven Insights
              </h4>
              <p className="text-gray-600">
                Utilize AI to analyze vast datasets, uncover actionable
                insights, and inform strategic business decisions for sustained,
                exponential growth.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
