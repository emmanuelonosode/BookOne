"use client";
import React, { useEffect, useRef } from "react";
import { motion, useAnimationControls, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1];

// Each slab drops in from above and settles — base first, lime cap last —
// so the mark visibly "stacks" itself together.
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};
const slab = {
  hidden: (y) => ({ opacity: 0, y }),
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/**
 * Animated layered-stack brand mark (inline SVG so each slab can move).
 * Plays its assemble when scrolled into view and re-stacks on hover.
 * Decorative by default (aria-hidden) — pair with the wordmark for the name.
 */
export default function LogoStack({ className = "", replayOnHover = true }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimationControls();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      controls.set("show");
      return;
    }
    if (inView) controls.start("show");
  }, [inView, reduce, controls]);

  const replay = () => {
    if (reduce || !replayOnHover) return;
    controls.set("hidden");
    controls.start("show");
  };

  return (
    <motion.svg
      ref={ref}
      className={className}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      variants={container}
      initial="hidden"
      animate={controls}
      onMouseEnter={replay}
      style={{ overflow: "visible" }}
    >
      {/* Base slab — cream */}
      <motion.g variants={slab} custom={-14}>
        <polygon points="32,112 68,148 68,164 32,128" fill="#DCD3BD" />
        <polygon points="68,148 132,148 132,164 68,164" fill="#ECE4D2" />
        <polygon points="132,148 168,112 168,128 132,164" fill="#C9BFA6" />
      </motion.g>

      {/* Middle slab — ink */}
      <motion.g variants={slab} custom={-28}>
        <polygon points="32,96 68,132 68,148 32,112" fill="#1C1917" />
        <polygon points="68,132 132,132 132,148 68,148" fill="#2A2622" />
        <polygon points="132,132 168,96 168,112 132,148" fill="#0E0C0A" />
      </motion.g>

      {/* Upper slab — lime body */}
      <motion.g variants={slab} custom={-42}>
        <polygon points="32,80 68,116 68,132 32,96" fill="#BBD133" />
        <polygon points="68,116 132,116 132,132 68,132" fill="#CFE53C" />
        <polygon points="132,116 168,80 168,96 132,132" fill="#A7BC2A" />
      </motion.g>

      {/* Top cap — lime + highlight */}
      <motion.g variants={slab} custom={-56}>
        <polygon points="68,44 132,44 168,80 132,116 68,116 32,80" fill="#E8FF47" />
        <polygon points="68,44 132,44 150,62 86,62" fill="#F2FF8C" opacity="0.55" />
      </motion.g>
    </motion.svg>
  );
}
