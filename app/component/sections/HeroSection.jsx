"use client";
import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FancyCtaButton } from "../Btn";

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create smooth spring animations for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Convert mouse position to values between -1 and 1
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
      mouseX.set(x * 50); // Multiply for desired movement range
      mouseY.set(y * 50);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  // Variants for the main container to control staggering of its children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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

  const orbVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pt-20 from-gray-100 via-gray-50 to-white relative overflow-hidden">
      {/* Main Content */}
      <motion.div
        className="container mx-auto px-6 md:px-8 relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-4xl md:text-6xl  font-light text-gray-800 ">
                Transform Your Business Online <br />
                <span className="text-gray-600">
                  with Our Digital Solutions.
                </span>
              </h1>

              <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
                Attract quality leads, and achieve sustainable growth through
                bespoke web design, advanced SEO, powerful AI automation, and
                compelling content.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <FancyCtaButton text="Propel Your Business Forward" />
            </motion.div>
          </div>

          {/* Right Content */}
          <div className="relative flex flex-col items-center space-y-8">
            {/* Glowing Orb */}
            <div className="relative">
              <motion.div
                variants={orbVariants}
                animate={floatingAnimation}
                style={{
                  x: springX,
                  y: springY,
                }}
                className="w-80 h-80 md:w-96 md:h-96 relative"
              >
                {/* Main orb with gradient */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/35 via-primary/35 to-primary/35 opacity-80 blur-sm"></div>
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-white via-primary/15 to-primary/15 opacity-90"></div>

                {/* Particle effects */}
                <div className="absolute inset-0 rounded-full">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        x: mousePosition.x * (10 + i * 2),
                        y: mousePosition.y * (10 + i * 2),
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      }}
                    />
                  ))}
                </div>

                {/* Outer glow */}
                <motion.div
                  className="absolute -inset-8 rounded-full bg-gradient-to-br from-orange-200 to-transparent opacity-30 blur-xl"
                  style={{
                    x: mousePosition.x * -10,
                    y: mousePosition.y * -10,
                  }}
                ></motion.div>
              </motion.div>
            </div>

            {/* Bottom Text */}
            <motion.div
              variants={itemVariants}
              className="text-center space-y-4 max-w-md"
            >
              <p className="text-gray-600 leading-relaxed">
                Whether through intuitive interfaces, immersive AI Automation,
                or bold visual storytelling,
                <span className="text-gray-800 font-medium">
                  {" "}
                  we design moments that people don't just see, they feel.
                </span>
              </p>

              <div className="flex flex-wrap justify-center gap-3 text-sm">
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  UI/UX
                </span>
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  AI Automation
                </span>
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  SEO Optimization
                </span>
                <span className="px-4 py-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
                  +
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-30 blur-xl"
          style={{
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-100 to-transparent rounded-full opacity-20 blur-lg"
          style={{
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
        ></motion.div>

        {/* Additional floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-200 rounded-full opacity-40"
            style={{
              left: `${20 + Math.random() * 60}%`,
              top: `${20 + Math.random() * 60}%`,
              x: mousePosition.x * (15 + i * 5),
              y: mousePosition.y * (15 + i * 5),
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
