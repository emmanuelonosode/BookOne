"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedBlobBg() {
  return (
    <motion.div className=" -z-10  w-full h-full overflow-hidden pointer-events-none">
      <motion.svg
        viewBox="0 0 800 800"
        className="w-[150vw] h-[150vh] absolute top-[-30%] left-[-25%] blur-3xl opacity-60"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          fill="#6B46C1"
          animate={{
            d: [
              "M607,502Q521,604,393,609Q265,614,188.5,524Q112,434,147.5,304Q183,174,323,138Q463,102,588,201Q713,300,607,502Z",
              "M636,488.5Q581,677,407.5,628.5Q234,580,191.5,462Q149,344,236.5,249.5Q324,155,457,177Q590,199,637,349.5Q684,500,636,488.5Z",
              "M584.5,521Q506,642,390,639.5Q274,637,208.5,535.5Q143,434,151.5,314.5Q160,195,285.5,137Q411,79,520.5,162Q630,245,584.5,521Z",
              "M607,502Q521,604,393,609Q265,614,188.5,524Q112,434,147.5,304Q183,174,323,138Q463,102,588,201Q713,300,607,502Z",
            ],
            fill: ["#6B46C1", "#800080", "#2E073F", "#6B46C1"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </motion.div>
  );
}
