"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { FancyCtaButton } from "../Btn";
import Link from "next/link";

function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Create smooth spring animations for mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  // Optimize mouse move handler with useCallback and throttling
  const handleMouseMove = useCallback(
    (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      // Convert mouse position to values between -1 and 1
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setMousePosition({ x, y });
      mouseX.set(x * 20); // Further reduced movement range
      mouseY.set(y * 20);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Throttle mouse events for better performance
      let ticking = false;
      const throttledMouseMove = (e) => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleMouseMove(e);
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("mousemove", throttledMouseMove, {
        passive: true,
      });
      return () => window.removeEventListener("mousemove", throttledMouseMove);
    }
  }, [handleMouseMove]);

  // Memoize animation variants for better performance
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 10 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          damping: 25,
          stiffness: 60,
        },
      },
    }),
    []
  );

  const orbVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
        opacity: 1,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      },
    }),
    []
  );

  const floatingAnimation = useMemo(
    () => ({
      y: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    }),
    []
  );

  // Drastically reduce particle count and complexity
  const orbParticles = useMemo(
    () =>
      [...Array(6)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: Math.random() * 1,
        duration: 1 + Math.random() * 0.5,
      })),
    []
  );

  const backgroundParticles = useMemo(
    () =>
      [...Array(3)].map((_, i) => ({
        id: i,
        left: `${20 + Math.random() * 60}%`,
        top: `${20 + Math.random() * 60}%`,
        delay: Math.random() * 2,
        duration: 1.5 + Math.random() * 0.5,
      })),
    []
  );

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
              <h1 className="text-4xl md:text-6xl font-light text-gray-800">
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
              <Link
                href="/get-started"
                aria-label="Get started - View pricing and begin your project"
              >
                <FancyCtaButton text="Propel Your Business Forward" />
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Simplified */}
          <div className="relative flex flex-col items-center space-y-8">
            {/* Simplified Glowing Orb */}
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

                {/* Minimal particle effects */}
                <div className="absolute inset-0 rounded-full">
                  {orbParticles.map((particle) => (
                    <motion.div
                      key={particle.id}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-60"
                      style={{
                        left: particle.left,
                        top: particle.top,
                        x: mousePosition.x * (5 + particle.id * 1),
                        y: mousePosition.y * (5 + particle.id * 1),
                      }}
                      animate={{
                        opacity: [0.3, 1, 0.3],
                        scale: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        delay: particle.delay,
                      }}
                    />
                  ))}
                </div>

                {/* Simplified outer glow */}
                <motion.div
                  className="absolute -inset-6 rounded-full bg-gradient-to-br from-orange-200 to-transparent opacity-20 blur-lg"
                  style={{
                    x: mousePosition.x * -5,
                    y: mousePosition.y * -5,
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

      {/* Minimal Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full opacity-20 blur-xl"
          style={{
            x: mousePosition.x * 15,
            y: mousePosition.y * 15,
          }}
        ></motion.div>
        <motion.div
          className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-br from-purple-100 to-transparent rounded-full opacity-15 blur-lg"
          style={{
            x: mousePosition.x * -10,
            y: mousePosition.y * -10,
          }}
        ></motion.div>

        {/* Minimal floating particles */}
        {backgroundParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-orange-200 rounded-full opacity-30"
            style={{
              left: particle.left,
              top: particle.top,
              x: mousePosition.x * (8 + particle.id * 1.5),
              y: mousePosition.y * (8 + particle.id * 1.5),
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroSection;
