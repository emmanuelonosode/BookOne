"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { Chart, registerables } from "chart.js";
import Tagline from "../tagline";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Target } from "lucide-react";
import Link from "next/link";
import { AnimatedButton, FancyCtaButton } from "../Btn";
import Image from "next/image";

// Register all Chart.js components
Chart.register(...registerables);

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2000, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef();

  // Memoize the numeric value extraction
  const numericValue = useMemo(() => {
    if (value.includes("K")) {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    } else if (value.includes("x")) {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    } else if (value.includes("$")) {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    } else {
      return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
    }
  }, [value]);

  // Memoize the format value function
  const formatValue = useCallback(
    (num) => {
      if (value.includes("$")) {
        if (value.includes("K")) {
          return `$${num}K+`;
        }
        return `$${num}`;
      }

      if (value.includes("x")) {
        return `${num}x`;
      }

      if (value.includes("K")) {
        const suffix = value.replace(/[\dK]/g, "");
        return `${num}K${suffix}`;
      }

      if (value.includes("%")) {
        return `${num}%`;
      }

      if (value.includes("+")) {
        return `${num}+`;
      }

      const suffix = value.replace(/[\d]/g, "");
      return `${num}${suffix}`;
    },
    [value]
  );

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (!hasStarted) {
        setHasStarted(true);

        if (numericValue === 0) {
          setCount(0);
          return;
        }

        let start = 0;
        const increment = numericValue / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else {
            setCount(Math.round(start * 10) / 10);
          }
        }, 16);

        return () => clearInterval(timer);
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [hasStarted, numericValue, duration, delay]);

  // Fallback: if animation hasn't started after 3 seconds, show the final value
  useEffect(() => {
    const fallbackTimeout = setTimeout(() => {
      if (!hasStarted) {
        setCount(numericValue);
        setHasStarted(true);
      }
    }, 3000);

    return () => clearTimeout(fallbackTimeout);
  }, [hasStarted, numericValue]);

  return (
    <span ref={ref} aria-label={`${formatValue(count)}`}>
      {formatValue(count)}
    </span>
  );
};

// Enhanced ROI Chart with animations
const RoiChart = ({ className }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const chartContainerRef = useRef(null);
  const isInView = useInView(chartContainerRef, { once: true, amount: 0.3 });

  const { scrollYProgress: chartScrollYProgress } = useScroll({
    target: chartContainerRef,
    offset: ["start end", "end start"],
  });
  const chartY = useTransform(chartScrollYProgress, [0, 1], [-20, 20]);

  // Memoize chart data
  const chartData = useMemo(
    () => ({
      labels: [
        "Lead Generation (40%)",
        "Conversion Optimization (30%)",
        "Efficiency Gains (20%)",
        "Brand Equity (10%)",
      ],
      datasets: [
        {
          label: "ROI Contribution",
          data: [40, 30, 20, 10],
          backgroundColor: [
            "#3B82F6", // Blue
            "#8B5CF6", // Purple
            "#10B981", // Green
            "#F59E0B", // Amber
          ],
          borderColor: "#FFFFFF",
          borderWidth: 3,
          hoverBorderWidth: 5,
          hoverOffset: 10,
        },
      ],
    }),
    []
  );

  // Memoize chart options
  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      animation: {
        animateRotate: true,
        animateScale: true,
        duration: 1500, // Reduced from 2000
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
            font: {
              family: "'Inter', sans-serif",
              size: 14,
            },
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          titleFont: {
            family: "'Inter', sans-serif",
            weight: "600",
            size: 16,
          },
          bodyFont: {
            family: "'Inter', sans-serif",
            size: 14,
          },
          padding: 12,
          cornerRadius: 8,
          backgroundColor: "rgba(0,0,0,0.9)",
          titleColor: "#FFFFFF",
          bodyColor: "#E5E7EB",
          callbacks: {
            label: function (context) {
              return context.parsed + "% of total ROI impact";
            },
          },
        },
      },
    }),
    []
  );

  React.useEffect(() => {
    if (chartRef.current && isInView) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }

        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: chartData,
          options: chartOptions,
        });
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [isInView, chartData, chartOptions]);

  return (
    <motion.div
      ref={chartContainerRef}
      style={{ y: chartY }}
      initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Reduced duration
      className={`chart-container h-80 md:h-96 max-w-lg mx-auto ${className} relative`}
      aria-label="ROI Contribution Breakdown Chart"
      role="img"
    >
      <canvas ref={chartRef} aria-label="Interactive ROI Chart Canvas"></canvas>

      {/* Center text overlay */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.4 }} // Reduced delay and duration
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-gray-800">
            ROI
          </div>
          <div className="text-sm text-gray-600">Impact</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Process Step Component
const ProcessStep = ({ step, title, description, icon, delay = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay, type: "spring", stiffness: 100 }} // Reduced duration
      whileHover={{ scale: 1.03, y: -3 }} // Reduced hover effect
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
      aria-labelledby={`step-${step}-title`}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.2, duration: 0.4 }} // Reduced delay and duration
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

      {/* Animated arrow for flow */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.4, duration: 0.3 }} // Reduced delay and duration
        className="mt-4 flex items-center text-blue-500 font-medium text-sm"
        aria-hidden="true"
      >
        <span className="mr-2">Next</span>
        <motion.svg
          animate={{ x: [0, 3, 0] }} // Reduced movement
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }} // Reduced duration
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

export default function AboutSection({
  storyHeadline = "How BookOne Transforms Businesses",
  storyParagraph = "At BookOne, we don't just build websites, we craft digital growth engines. Our data-driven approach has helped businesses achieve an average of 300% increase in online leads, 85% improvement in conversion rates, and 200% boost in operational efficiency. From stunning designs to intelligent automation, we create measurable impact that directly affects your bottom line.",

  storyImageUrl = "https://s3-us-west-2.amazonaws.com/public.notion-static.com/1f88cc90-92fd-4ce4-bfcd-25daec2ffbbe/5e659275-5b7b-4ed9-97a4-0316fccd1403/person.png",
  storyImageAlt = "BookOne team delivering results for clients",

  statsHeadline = "Real Results, Real Impact",
  statsParagraph = "Numbers don't lie. Our systematic approach to digital transformation has consistently delivered exceptional results for businesses across Nigeria and beyond. Every project is a testament to our commitment to driving measurable growth and sustainable success.",

  statsData = [
    {
      value: "50+",
      description: "Successful Projects",
      subtext: "Average 4.9/5 rating",
    },
    {
      value: "300%",
      description: "Average Lead Increase",
      subtext: "Within 6 months",
    },
    {
      value: "150K+",
      description: "Revenue Generated",
      subtext: "For our clients",
    },
    {
      value: "98%",
      description: "Client Retention Rate",
      subtext: "Long-term partnerships",
    },
  ],

  statsImageUrl = "/chart.webp",
  statsImageAlt = "Impact metrics and growth statistics",
  className = "",
}) {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const storyImageY = useTransform(scrollYProgress, [0, 1], [-30, 30]); // Reduced movement
  const statsImageY = useTransform(scrollYProgress, [0, 1], [30, -30]); // Reduced movement

  // Auto-advance process steps
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 4000); // Increased from 3000 for better performance
    return () => clearInterval(interval);
  }, []);

  // Memoize process steps
  const processSteps = useMemo(
    () => [
      {
        step: "01",
        title: "Discovery & Strategy",
        description:
          "We analyze your business, audience, and goals to create a data-driven roadmap for success.",
      },
      {
        step: "02",
        title: "Design & Development",
        description:
          "Our team crafts beautiful, conversion-focused solutions tailored to your unique needs.",
      },
      {
        step: "03",
        title: "Launch & Optimize",
        description:
          "We deploy your solution and continuously optimize based on real performance data.",
      },
      {
        step: "04",
        title: "Scale & Grow",
        description:
          "Ongoing support and enhancements ensure your digital presence evolves with your business.",
      },
    ],
    []
  );

  // Memoize impact highlights
  const impactHighlights = useMemo(
    () => [
      {
        icon: <TrendingUp className="w-5 h-5" aria-hidden="true" />, // Reduced size
        title: "Lead Generation",
        value: "300%",
        description: "Average increase in qualified leads",
      },
      {
        icon: <DollarSign className="w-5 h-5" aria-hidden="true" />, // Reduced size
        title: "Revenue Growth",
        value: "$150K+",
        description: "Generated for our clients",
      },
      {
        icon: <Zap className="w-5 h-5" aria-hidden="true" />, // Reduced size
        title: "Efficiency Boost",
        value: "85%",
        description: "Reduction in manual processes",
      },
      {
        icon: <Target className="w-5 h-5" aria-hidden="true" />, // Reduced size
        title: "Conversion Rate",
        value: "4.2x",
        description: "Improvement in conversions",
      },
    ],
    []
  );

  // Memoize animation variants
  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.08, // Reduced from 0.1
          delayChildren: 0.2,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 20, scale: 0.95 }, // Reduced y movement
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
        },
      },
    }),
    []
  );

  const statsGridVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.12, // Reduced from 0.15
          delayChildren: 0.3,
        },
      },
    }),
    []
  );

  const statItemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8, y: 15 }, // Reduced y movement
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 12,
        },
      },
    }),
    []
  );

  // Memoize ROI breakdown data
  const roiBreakdown = useMemo(
    () => [
      {
        color: "bg-blue-500",
        label: "Lead Generation",
        desc: "40% - Direct customer acquisition",
      },
      {
        color: "bg-purple-500",
        label: "Conversion Optimization",
        desc: "30% - Improved sales funnel",
      },
      {
        color: "bg-green-500",
        label: "Efficiency Gains",
        desc: "20% - Automated processes",
      },
      {
        color: "bg-amber-500",
        label: "Brand Equity",
        desc: "10% - Long-term value building",
      },
    ],
    []
  );

  return (
    <motion.section
      ref={sectionRef}
      className={`py-16 md:py-24 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 ${className} overflow-hidden relative`} // Reduced padding
      aria-label="About BookOne and Our Impact"
      role="region"
    >
      {/* Background decoration - reduced complexity */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.1, 1], // Reduced scale
            rotate: [0, 45, 0], // Reduced rotation
            opacity: [0.08, 0.04, 0.08], // Reduced opacity
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }} // Increased duration
          className="absolute top-1/4 -right-48 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl" // Reduced size
          aria-hidden="true"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1], // Reduced scale
            rotate: [45, 0, 45], // Reduced rotation
            opacity: [0.04, 0.08, 0.04], // Reduced opacity
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }} // Increased duration
          className="absolute bottom-1/4 -left-48 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl" // Reduced size
          aria-hidden="true"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Hero Story Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16" // Reduced margin
        >
          <motion.div variants={itemVariants}>
            <Tagline tag="Our Impact Story" />
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight" // Reduced text size
          >
            We Don't Just Build,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              We Transform
            </span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed" // Reduced text size
          >
            {storyParagraph}
          </motion.p>

          {/* Quick Impact Highlights */}
          <motion.div
            variants={statsGridVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 max-w-4xl mx-auto" // Reduced gap and margin
          >
            {impactHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                variants={statItemVariants}
                whileHover={{ scale: 1.03, y: -3 }} // Reduced hover effect
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20" // Reduced padding
              >
                <div className="text-2xl mb-2" aria-hidden="true">
                  {highlight.icon}
                </div>
                <div
                  className="text-xl md:text-2xl font-bold text-blue-600 mb-1"
                  aria-label={`${highlight.title}: ${highlight.value}`}
                >
                  <AnimatedCounter
                    value={highlight.value}
                    delay={index * 150} // Reduced delay
                  />
                </div>
                <div className="text-sm font-semibold text-gray-800 mb-1">
                  {highlight.title}
                </div>
                <div className="text-xs text-gray-600">
                  {highlight.description}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Process Flow Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} // Reduced y movement
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }} // Reduced duration
          className="mb-20" // Reduced margin
        >
          <div className="text-center mb-12">
            {" "}
            {/* Reduced margin */}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Proven Process
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {" "}
              {/* Reduced text size */}
              Every success story follows our systematic approach to digital
              transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {" "}
            {/* Reduced gap */}
            {processSteps.map((step, index) => (
              <ProcessStep
                key={index}
                step={step.step}
                title={step.title}
                description={step.description}
                delay={index * 0.15} // Reduced delay
              />
            ))}
          </div>

          {/* Process Progress Indicator */}
          <div className="flex justify-center mt-10">
            {" "}
            {/* Reduced margin */}
            <div
              className="flex space-x-2"
              role="tablist"
              aria-label="Process steps progress"
            >
              {processSteps.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeStep === index
                      ? "bg-blue-600 scale-125"
                      : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Step ${index + 1} of ${processSteps.length}`}
                  aria-selected={activeStep === index}
                  role="tab"
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Statistics Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {" "}
          {/* Reduced gap and margin */}
          {/* Stats Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight" // Reduced text size
            >
              {statsHeadline}
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-lg text-gray-700 mb-8 leading-relaxed" // Reduced text size
            >
              {statsParagraph}
            </motion.p>

            {/* Enhanced Stats Grid */}
            <motion.div
              variants={statsGridVariants}
              className="grid grid-cols-2 gap-4" // Reduced gap
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statItemVariants}
                  whileHover={{ scale: 1.03, y: -3 }} // Reduced hover effect
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30 group" // Reduced padding
                >
                  <div
                    className="text-2xl md:text-3xl font-black text-blue-600 mb-2 group-hover:text-purple-600 transition-colors duration-300"
                    aria-label={`${stat.description}: ${stat.value}`}
                  >
                    <AnimatedCounter value={stat.value} delay={index * 200} />{" "}
                    {/* Reduced delay */}
                  </div>
                  <div className="text-base font-bold text-gray-800 mb-1">
                    {" "}
                    {/* Reduced text size */}
                    {stat.description}
                  </div>
                  <div className="text-sm text-gray-600">{stat.subtext}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to Action */}
            <motion.div variants={itemVariants} className="mt-8">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                See Full Case Studies
                <motion.svg
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="inline-block w-5 h-5 ml-2"
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
              </motion.button>
            </motion.div>
          </motion.div>
          {/* Stats Image with Parallax */}
          <motion.div
            style={{ y: statsImageY }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <motion.img
              src={statsImageUrl}
              alt={statsImageAlt}
              initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x600/3B82F6/FFFFFF?text=Growth+Analytics";
              }}
            />
          </motion.div>
        </div>

        {/* Enhanced ROI Chart Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-white/30"
        >
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="lg:col-span-2"
            >
              <motion.h3
                variants={itemVariants}
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              >
                Your ROI,{" "}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Visualized
                </span>
              </motion.h3>

              <motion.p
                variants={itemVariants}
                className="text-lg text-gray-700 mb-6 leading-relaxed"
              >
                Every service we provide is strategically designed to maximize
                your return on investment. This breakdown shows how our holistic
                approach creates compounding value across all aspects of your
                digital presence.
              </motion.p>

              <motion.div variants={itemVariants} className="space-y-4">
                {[
                  {
                    color: "bg-blue-500",
                    label: "Lead Generation",
                    desc: "40% - Direct customer acquisition",
                  },
                  {
                    color: "bg-purple-500",
                    label: "Conversion Optimization",
                    desc: "30% - Improved sales funnel",
                  },
                  {
                    color: "bg-green-500",
                    label: "Efficiency Gains",
                    desc: "20% - Automated processes",
                  },
                  {
                    color: "bg-amber-500",
                    label: "Brand Equity",
                    desc: "10% - Long-term value building",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="flex items-center space-x-3"
                  >
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-600">{item.desc}</div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <div className="lg:col-span-3">
              <RoiChart />
            </div>
          </div>
        </motion.div>

        {/* Final Impact Statement */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Join Our Success Stories?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl mb-8 max-w-2xl mx-auto opacity-90"
          >
            Don't just take our word for it. Let's create measurable impact for
            your business too.
          </motion.p>
          <Link
            href="/get-started"
            className="flex justify-center"
            aria-label="Start your transformation - Begin your project"
          >
            <AnimatedButton
              label="Start Your Transformation"
              className="bg-white text-black font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              otherBg="bg-gray-100"
              otherText="text-white"
              formerText="text-black"
            />
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
