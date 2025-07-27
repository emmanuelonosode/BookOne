"use client";
import { motion } from "framer-motion";

function  Btn({ label, sec, className = "", type = "button" }) {
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

  return (
    <motion.button
      whileHover={hoverVariant}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className={`inline-block py-3 px-6 rounded-full font-bold shadow-lg border transition-all duration-300 ${secondary} ${className}`}
    >
      {label}
    </motion.button>
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
