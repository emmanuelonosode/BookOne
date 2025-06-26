"use client";
import React from "react";
import { motion } from "framer-motion";
function Btn({ label, sec, light, className = "" }) {
  const baseStyles =
    "leading-[150%] text-[16px] tracking-normal rounded-lg px-6";
  const size = sec ? "py-[9px]" : "py-2.5";
  const color = sec ? "border" : "bg-primary text-light";

  const weight = light ? "font-normal" : "font-bold";

  return (
    <button
      className={`max-md:font-medium ${baseStyles} ${size} ${color} ${weight} ${className}`}
    >
      {label}
    </button>
  );
}

export default Btn;

export function AnimatedButton({ label }) {
  return (
    <motion.button
      className="relative overflow-hidden px-6 py-3 rounded-lg font-semibold text-white bg-primary"
      whileHover="hover"
    >
      <motion.span
        className="absolute left-0 top-0 h-full w-0  text-primary/50"
        variants={{
          hover: {
            width: "100%",
            transition: { duration: 0.5, ease: "easeInOut" },
          },
        }}
        initial={{ width: "0%" }}
      />
      <span className="relative z-10">{label}</span>
    </motion.button>
  );
}
