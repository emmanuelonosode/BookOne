import React, { useRef, useMemo } from "react";
import { Chart, registerables } from "chart.js";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

Chart.register(...registerables);

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
          hoverBorderWidth: 5,
          hoverOffset: 10,
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
        animateScale: true,
        duration: 1500,
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
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className={`chart-container h-80 md:h-96 max-w-lg mx-auto ${className} relative`}
      aria-label="ROI Contribution Breakdown Chart"
      role="img"
    >
      <canvas ref={chartRef} aria-label="Interactive ROI Chart Canvas"></canvas>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.4 }}
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

export default RoiChart;
