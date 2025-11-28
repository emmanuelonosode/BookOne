"use client";
import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

function Btn({
  label,
  sec,
  className = "",
  type = "button",
  as = "button",
  ...props
}) {
  const secondary = sec
    ? "bg-transparent text-purple-600 border-2 border-purple-600"
    : "bg-purple-600 text-white";

  const hoverVariant = sec
    ? {
        backgroundColor: "#f9fafb", // Tailwind's gray-50
        color: "#000000",
        borderColor: "#000000",
        scale: 1.05,
      }
    : {
        backgroundColor: "#ffffff",
        color: "#000000",
        borderColor: "#000000",
        scale: 1.05,
      };

  const Component = as === "link" ? motion.div : motion.button;

  return (
    <Component
      whileHover={hoverVariant}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`inline-block py-3 px-6 rounded-full font-bold shadow-lg border transition-all duration-300 cursor-pointer ${secondary} ${className}`}
      {...props}
    >
      {label}
    </Component>
  );
}

export default Btn;

export const FancyCtaButton = ({ text = "Get Started" }) => {
  const ref = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth motion values
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  // Transform for subtle movement toward cursor
  const translateX = useTransform(springX, (val) => (val - 75) / 10); // adjust divisor for stronger effect
  const translateY = useTransform(springY, (val) => (val - 25) / 10);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(75); // center X
    mouseY.set(25); // center Y
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: "translateZ(0)", // fixes subtle flickers
      }}
      className="group relative overflow-hidden px-8 py-4 rounded-full text-white font-semibold cursor-pointer flex items-center gap-3 shadow-2xl"
    >
      {/* Background Gradient Glow */}
      <motion.div
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background: "#6b46c1",
          x: translateX,
          y: translateY,
        }}
      />

      {/* Button Content */}
      <motion.span className="relative z-10">{text}</motion.span>
      <motion.span className="relative z-10 flex items-center translate-x-[-8px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <ArrowRight className="ml-1 w-5 h-5" />
      </motion.span>
    </motion.button>
  );
};

export function AnimatedButton({ label }) {
  return (
    <motion.button
      className="relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-white bg-primary"
      whileHover="hover"
    >
      <motion.span
        className="absolute left-0 top-0 h-full w-0 bg-purple-700 "
        variants={{
          hover: {
            width: "100%",
            transition: { duration: 0.5, ease: "easeInOut" },
          },
        }}
        initial={{ width: "0%" }}
      />
      <span className="relative z-10">{`${label}`}</span>
    </motion.button>
  );
}
