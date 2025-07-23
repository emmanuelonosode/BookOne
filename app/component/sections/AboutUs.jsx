"use client";

import React, { useRef } from "react";
import { Chart, registerables } from "chart.js";
import Tagline from "../tagline";
import { motion, useScroll, useTransform } from "framer-motion";

// Register all Chart.js components (important for Doughnut chart, legends, tooltips etc.)
Chart.register(...registerables);

const RoiChart = ({ className }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const chartContainerRef = useRef(null);
  const { scrollYProgress: chartScrollYProgress } = useScroll({
    target: chartContainerRef,
    offset: ["start end", "end start"],
  });
  const chartY = useTransform(chartScrollYProgress, [0, 1], [-50, 50]); // Subtle vertical parallax for the chart

  React.useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        if (chartInstance.current) {
          chartInstance.current.destroy(); // Destroy existing chart before creating a new one
        }
        chartInstance.current = new Chart(ctx, {
          type: "doughnut",
          data: {
            labels: [
              "Lead Generation",
              "Conversion Optimization",
              "Efficiency Gains",
              "Brand Equity",
            ],
            datasets: [
              {
                label: "Contribution to ROI",
                data: [40, 30, 20, 10],
                backgroundColor: [
                  "#6B46C1", // Primary Purple
                  "#805AD5",
                  "#9F7AEA",
                  "#B794F4",
                ],
                borderColor: "#FFFFFF",
                borderWidth: 4,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Important for respecting container dimensions
            cutout: "70%",
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  padding: 20,
                  font: {
                    family: "'Inter', sans-serif",
                  },
                },
              },
              tooltip: {
                titleFont: {
                  family: "'Montserrat', sans-serif",
                  weight: "bold",
                  size: 14,
                },
                bodyFont: {
                  family: "'Inter', sans-serif",
                },
                padding: 10,
                cornerRadius: 4,
                backgroundColor: "rgba(0,0,0,0.8)",
              },
            },
          },
        });
      }
    }
    // Cleanup function: destroy chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, []); // Empty dependency array ensures it runs once on mount and cleans up on unmount

  return (
    <motion.div
      ref={chartContainerRef}
      style={{ y: chartY }} // Apply parallax to the chart container
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`chart-container h-80 md:h-96 max-w-lg mx-auto ${className}`}
      aria-label="ROI Contribution Doughnut Chart"
      role="img"
    >
      <canvas ref={chartRef} aria-label="ROI Chart Canvas"></canvas>
    </motion.div>
  );
};

export default function AboutSection({
  storyHeadline = "Tell the story of how your company came about",
  storyParagraph = "At BookOne, we believe every business deserves a powerful online presence. Our journey began with a simple mission — to help small and growing businesses thrive through exceptional web design, development, and smart digital solutions. What started as a passion for building beautiful, functional websites has evolved into a full-service agency committed to innovation and excellence. From intuitive user experiences to seamless automation, we tailor every solution to fit our clients' unique needs. We're not just developers — we're partners in your growth, driven by creativity, strategy, and a deep understanding of the digital world.",
  storyImageUrl = "https://s3-us-west-2.amazonaws.com/public.notion-static.com/1f88cc90-92fd-4ce4-bfcd-25daec2ffbbe/5e659275-5b7b-4ed9-97a4-0316fccd1403/person.png",
  storyImageAlt = "About BookOne team member",
  statsHeadline = "Highlight achievements by the numbers",
  statsParagraph = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
  statsData = [
    { value: "500+", description: "Projects completed" },
    { value: "200%", description: "Year on year growth" },
    { value: "$50M", description: "Invested Value" },
    { value: "10K+", description: "Satisfied Clients" },
  ],
  statsImageUrl = "/chart.webp",
  statsImageAlt = "Statistics chart showing BookOne achievements",
  className = "",
}) {
  // Ref for the main section to track its scroll progress
  const sectionRef = useRef(null);

  // useScroll hook to track scroll progress within the section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax for story image
  const storyImageY = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Parallax for stats image
  const statsImageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Variants for staggered animation of text blocks and stat items
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

  const statsGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const statItemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      className={`py-16 md:py-28 font-sans bg-purple-50 ${className} overflow-hidden relative`}
      aria-label="About BookOne Section"
      role="region"
    >
      <div className="container mx-auto px-6">
        {/* About Us Story Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:space-x-12 mb-16 md:mb-24">
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/2 mb-8 md:mb-0"
            aria-label="Company Story"
          >
            <motion.div variants={textItemVariants}>
              <Tagline tag="About Us" />
            </motion.div>
            <motion.h2
              variants={textItemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight"
              tabIndex={0}
            >
              {storyHeadline}
            </motion.h2>
          </motion.div>
          <motion.div
            variants={textContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/2"
            aria-label="Company Story Description"
          >
            <motion.p
              variants={textItemVariants}
              className="text-lg text-gray-700 leading-relaxed"
              tabIndex={0}
            >
              {storyParagraph}
            </motion.p>
          </motion.div>
        </div>

        {/* Story Image with Parallax */}
        <div className="mb-16 md:mb-24 flex justify-center">
          <motion.img
            src={storyImageUrl}
            alt={storyImageAlt}
            width={800}
            height={450}
            style={{ y: storyImageY }} // Apply parallax
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-4xl rounded-xl shadow-lg md:aspect-video object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://placehold.co/800x450/6B46C1/FFFFFF?text=Image+Load+Error"; // Fallback
            }}
            aria-label="BookOne team member"
            role="img"
          />
        </div>

        {/* Statistics Section */}
        <div
          className="flex flex-col-reverse md:flex-row items-center md:space-x-12"
          aria-label="Company Statistics"
        >
          {/* Stats Image with Parallax */}
          <div className="w-full md:w-1/2 flex justify-center">
            <motion.img
              src={statsImageUrl}
              alt={statsImageAlt}
              // width={0}
              // height={0}
              // sizes="100vw"
              style={{ y: statsImageY }} // Apply parallax
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full  md:max-w-md rounded-xl shadow-lg object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/600x600/805AD5/FFFFFF?text=Stats+Error"; // Fallback
              }}
              aria-label="BookOne statistics chart"
              role="img"
            />
          </div>
          <motion.div
            variants={textContainerVariants} // Reuse text container variants for headline/paragraph
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/2 max-w-[600px] mb-12 md:mb-0"
            aria-label="Statistics Description"
          >
            <motion.h2
              variants={textItemVariants}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight"
              tabIndex={0}
            >
              {statsHeadline}
            </motion.h2>
            <motion.p
              variants={textItemVariants}
              className="text-lg text-gray-700 leading-relaxed"
              tabIndex={0}
            >
              {statsParagraph}
            </motion.p>
            {/* Staggered stats data */}
            <motion.div
              variants={statsGridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="grid grid-cols-2 mt-8 gap-x-8 gap-y-6"
              aria-label="Statistics Grid"
            >
              {statsData.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={statItemVariants}
                  className="flex flex-col"
                  aria-label={stat.description}
                  tabIndex={0}
                >
                  <h3 className="text-4xl md:text-5xl font-extrabold mb-1 text-primary">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 text-lg">{stat.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
        {/* ROI Chart Section */}
        <div
          className="mt-16 grid lg:grid-cols-5 gap-8 items-center"
          aria-label="ROI Chart Section"
        >
          <motion.div
            variants={textContainerVariants} // Reuse text container variants
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="lg:col-span-2"
            aria-label="Profitability Partner Description"
          >
            <motion.h3
              variants={textItemVariants}
              className="text-2xl font-bold text-gray-800 mb-4"
              tabIndex={0}
            >
              Your Profitability Partner
            </motion.h3>
            <motion.p
              variants={textItemVariants}
              className="text-gray-600"
              tabIndex={0}
            >
              At BookOne, every service is a component of a larger strategy
              aimed at increasing your revenue and efficiency. This chart
              illustrates our holistic approach, where every piece contributes
              to your bottom line. We don't just build; we build for growth.
            </motion.p>
          </motion.div>
          <div className="lg:col-span-3" aria-label="ROI Chart">
            <RoiChart />{" "}
            {/* RoiChart component already has its own framer-motion */}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
