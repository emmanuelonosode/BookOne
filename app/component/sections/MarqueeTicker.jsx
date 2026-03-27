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
    <div className="border-y border-white/[0.06] bg-[#0D0D0D] overflow-hidden py-4 select-none">
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {TRACK.map((item, i) => (
          <span
            key={i}
            className={`text-[10px] sm:text-xs tracking-[0.22em] uppercase font-medium shrink-0 ${
              item === "✦" ? "text-[#E8FF47]" : "text-white/30"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
