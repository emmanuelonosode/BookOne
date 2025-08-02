"use client";
import React, { useState, useEffect } from "react";
import { Mail, Phone } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

// Mock contact data
const contact = [
  {
    src: <Mail />,
    label: "Email Us",
    description: "Send us an email and we'll get back to you within 24 hours",
    value: "officialbookone@gmail.com",
  },
  {
    src: <Phone />,
    label: "Call Us",
    description: "Speak directly with our team during business hours",
    value: "+234 807 708 0903",
  },
];

function Contact() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse tracking for interactive elements
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
      mouseX.set(x * 30);
      mouseY.set(y * 30);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        once: true,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        once: true,
      },
    },
  };

  return (
    <section
      id="contact"
      className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 relative overflow-hidden py-20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-purple-300/30 to-transparent rounded-full blur-3xl"
          style={{
            x: springX,
            y: springY,
          }}
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{ duration: 8, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-40 left-20 w-48 h-48 bg-gradient-to-br from-indigo-300/30 to-transparent rounded-full blur-2xl"
          style={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          initial={{ y: 10 }}
          animate={{ y: -10 }}
          transition={{ duration: 8, delay: 2, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-violet-200/20 to-transparent rounded-full blur-3xl"
          style={{
            x: mousePosition.x * 15,
            y: mousePosition.y * 15,
          }}
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{ duration: 8, delay: 4, ease: "easeInOut" }}
        />

        {/* Interactive floating particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/40 rounded-full"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              x: mousePosition.x * (10 + i * 3),
              y: mousePosition.y * (10 + i * 3),
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            whileHover={{ scale: 2, opacity: 1 }}
          />
        ))}
      </div>

      {/* Header Section */}
      <motion.div
        className="container mx-auto px-6 md:px-8 text-center mb-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-800 mb-6 leading-tight"
        >
          Ready to bring your{" "}
          <motion.span
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600"
            whileHover={{
              backgroundImage:
                "linear-gradient(45deg, #6b46c1, #8b5cf6, #a855f7)",
              transition: { duration: 0.3 },
            }}
          >
            business
          </motion.span>{" "}
          online?
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed mb-8"
        >
          Let's talk about how BookOne can help you launch smarter and faster.
          We're here to transform your digital presence.
        </motion.p>

        {/* Main CTA Button */}
        {/* <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-medium text-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <Link href="/get-started">
              <span className="relative z-10 flex items-center gap-2">
                View Our Pricing
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                </svg>
              </span>
            </Link>
          </motion.button>

          <motion.button
            className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-medium text-lg hover:bg-purple-600 hover:text-white transition-all duration-300 relative overflow-hidden group"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="https://calendar.notion.so/meet/officialbookone/call">
              <span className="relative z-10 flex items-center gap-2">
                Schedule Free Call
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
              </span>
            </Link>
          </motion.button>
        </motion.div> */}
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Contact Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0, once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              {contact.map(({ src, label, description, value }, index) => (
                <motion.a
                  href={
                    value === "officialbookone@gmail.com"
                      ? "mailto:officialbookone@gmail.com"
                      : `tel:${value}`
                  }
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0, once: true }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/30 cursor-pointer group transition-all duration-300 hover:shadow-2xl relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                  <div className="flex items-start space-x-4 relative z-10">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                      transition={{ duration: 0.6 }}
                    >
                      {src}
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                        {label}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {description}
                      </p>
                      <p className="text-purple-600 font-medium group-hover:text-purple-700 transition-colors text-lg">
                        {value}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0, once: true }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl p-12 text-white relative overflow-hidden mt-12"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-transparent"
                animate={{
                  background: [
                    "linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%)",
                    "linear-gradient(225deg, rgba(99, 102, 241, 0.2) 0%, transparent 100%)",
                    "linear-gradient(315deg, rgba(168, 85, 247, 0.2) 0%, transparent 100%)",
                    "linear-gradient(45deg, rgba(99, 102, 241, 0.2) 0%, transparent 100%)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <div className="relative z-10 text-center">
                <h4 className="text-3xl font-semibold mb-4">
                  Ready to Get Started?
                </h4>
                <p className="text-purple-100 mb-8 leading-relaxed text-lg max-w-2xl mx-auto">
                  Explore our transparent pricing plans and find the perfect fit
                  for your business needs. Start your digital transformation
                  journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    className="bg-white text-purple-600 px-8 py-4 rounded-xl font-medium text-lg hover:bg-purple-50 transition-colors relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-purple-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Link href="/get-started">
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                        </svg>
                      </span>
                    </Link>
                  </motion.button>
                  <motion.button
                    className="border-2 border-white text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link href="https://calendar.notion.so/meet/officialbookone/call">
                      <span className="relative z-10 flex items-center gap-2">
                        Schedule Free Consultation
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform"
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
                      </span>
                    </Link>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
