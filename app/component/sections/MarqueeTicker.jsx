"use client";
import { motion } from "framer-motion";

const ITEMS = [
  "Web Design",
  "✦",
  "AI Automation",
  "✦",
  "SEO",
  "✦",
  "Conversion Optimisation",
  "✦",
  "Done-for-You Builds",
  "✦",
  "Performance Engineering",
  "✦",
  "Brand Strategy",
  "✦",
];

// Duplicate for seamless loop
const TRACK = [...ITEMS, ...ITEMS];

export default function MarqueeTicker() {
  return (
    <div className="border-y border-[#1C1917]/[0.08] bg-[#FFFFFF] overflow-hidden py-4 select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            className={`text-[10px] sm:text-xs tracking-[0.22em] uppercase font-medium shrink-0 ${
              item === "✦" ? "text-[#C98A2B]" : "text-[#9C968C]"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
