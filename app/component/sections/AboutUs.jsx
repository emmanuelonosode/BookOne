"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
  memo,
} from "react";
import Image from "next/image";
import { Chart, registerables } from "chart.js";
import { motion, useInView } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Target } from "lucide-react";

// Register only necessary Chart.js components
Chart.register(...registerables);

// Memoized AnimatedCounter with reduced complexity
const AnimatedCounter = memo(({ value, duration = 1500, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const numericValue = useMemo(() => {
    return parseFloat(value.replace(/[^\d.]/g, "")) || 0;
  }, [value]);

  const formatValue = useCallback(
    (num) => {
      if (value.includes("$")) {
        if (value.includes("K")) return `$${num}K+`;
        return `$${num}`;
      }
      if (value.includes("x")) return `${num}x`;
      if (value.includes("M")) {
        const suffix = value.replace(/[\dK]/g, "");
        return `${num}K${suffix}`;
      }
      if (value.includes("%")) return `${num}%`;
      if (value.includes("+")) return `${num}+`;

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
        const increment = numericValue / (duration / 32); // Reduced frequency

        const timer = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else {
            setCount(Math.round(start * 10) / 10);
          }
        }, 32); // Reduced frequency

        return () => clearInterval(timer);
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [hasStarted, numericValue, duration, delay]);

  return <span>{formatValue(count)}</span>;
});

// Simplified ROI Chart with reduced animations
const RoiChart = memo(({ className }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const chartContainerRef = useRef(null);
  const isInView = useInView(chartContainerRef, { once: true, amount: 0.3 });

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
          backgroundColor: ["#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"],
          borderColor: "#FFFFFF",
          borderWidth: 3,
          hoverBorderWidth: 4, // Reduced
          hoverOffset: 6, // Reduced
        },
      ],
    }),
    []
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      cutout: "65%",
      animation: {
        animateRotate: true,
        animateScale: false, // Disabled for performance
        duration: 1000, // Reduced
        easing: "easeOutQuart",
      },
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 15, // Reduced
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
          padding: 10, // Reduced
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

  useEffect(() => {
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
      initial={{ opacity: 0, scale: 0.95 }} // Simplified
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: "easeOut" }} // Reduced duration
      className={`chart-container max-w-lg mx-auto ${className} relative`}
    >
      <canvas ref={chartRef}></canvas>

      {/* Center text overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, duration: 0.3 }} // Reduced
        className="absolute inset-0 flex items-center justify-center py-4 my-4 pointer-events-none"
      ></motion.div>
    </motion.div>
  );
});

// Simplified ProcessStep with lighter animations
const ProcessStep = memo(({ step, title, description, delay = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }} // Reduced movement
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, delay }} // Reduced duration
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 group"
    >
      <motion.div
        initial={{ scale: 0.8 }} // Simplified
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: delay + 0.1, duration: 0.3 }} // Reduced
        className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 group-hover:from-purple-600 group-hover:to-blue-500 transition-all duration-200"
      >
        <span className="text-2xl text-white font-bold">{step}</span>
      </motion.div>

      <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>

      {/* Simplified arrow */}
      <div className="mt-4 flex items-center text-blue-500 font-medium text-sm">
        <span className="mr-2">Next</span>
        <svg
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
        </svg>
      </div>
    </motion.article>
  );
});

export default function AboutSection({
  storyParagraph = "At BookOne, we don't just build websites, we craft digital growth engines. Our data-driven approach has helped businesses achieve an average of 300% increase in online leads, 85% improvement in conversion rates, and 200% boost in operational efficiency. From stunning designs to intelligent automation, we create measurable impact that directly affects your bottom line.",

  statsHeadline = "Real Results, Real Impact",
  statsParagraph = "Numbers don't lie. Our systematic approach to digital transformation has consistently delivered exceptional results for businesses across Nigeria and beyond. Every project is a testament to our commitment to driving measurable growth and sustainable success.",
  statsData = [
    {
      value: "100+",
      description: "Successful Projects",
      subtext: "Average 4.9/5 rating",
    },
    {
      value: "300%",
      description: "Average Lead Increase",
      subtext: "Within 6 months",
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

  // Static data - memoized once
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

  const impactHighlights = useMemo(
    () => [
      {
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Lead Generation",
        value: "300%",
        description: "Average increase in qualified leads",
      },

      {
        icon: <Zap className="w-5 h-5" />,
        title: "Efficiency Boost",
        value: "95%",
        description: "Reduction in manual processes",
      },
      {
        icon: <Target className="w-5 h-5" />,
        title: "Conversion Rate",
        value: "4.2x",
        description: "Improvement in conversions",
      },
    ],
    []
  );

  // Simplified animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <section
      ref={sectionRef}
      className={`py-16 md:py-24 font-sans bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 ${className} overflow-hidden relative`}
    >
      {/* Simplified background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -right-48 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-1/4 -left-48 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20" />
      </div>

      <div className="container relative z-10">
        {/* Hero Story Section */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight"
          >
            We Don't Just Build,{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              We Transform
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed"
          >
            {storyParagraph}
          </motion.p>

          {/* Quick Impact Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10 max-w-4xl mx-auto">
            {impactHighlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/20 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="text-2xl mb-2">{highlight.icon}</div>
                <div className="text-xl md:text-2xl font-bold text-blue-600 mb-1">
                  <AnimatedCounter
                    value={highlight.value}
                    delay={index * 100}
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
          </div>
        </motion.div>

        {/* Enhanced Statistics Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Stats Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              {statsHeadline}
            </h2>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {statsParagraph}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-white/30 hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="text-2xl md:text-3xl font-black text-blue-600 mb-2">
                    <AnimatedCounter value={stat.value} delay={index * 150} />
                  </div>
                  <div className="text-base font-bold text-gray-800 mb-1">
                    {stat.description}
                  </div>
                  <div className="text-sm text-gray-600">{stat.subtext}</div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1">
                See Full Case Studies
                <svg
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
                </svg>
              </button>
            </div>
          </motion.div>

          {/* Stats Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <Image
              src={
                statsImageUrl && statsImageUrl.trim() !== ""
                  ? statsImageUrl
                  : "https://placehold.co/600x600/3B82F6/FFFFFF?text=Growth+Analytics"
              }
              alt={statsImageAlt}
              width={700}
              height={700}
              className="w-full max-w-md rounded-2xl shadow-2xl object-cover hover:shadow-3xl transition-shadow duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
