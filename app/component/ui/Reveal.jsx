"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1];

/**
 * Scroll-triggered reveal — fade + rise as the element enters the viewport.
 * Reusable across sections. No-op (renders plain element) under reduced-motion.
 *
 * Props: as ("div"|"section"|"li"|...), delay, y, duration, once, margin, className
 */
export default function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 24,
  duration = 0.7,
  once = true,
  margin = "-12%",
  className = "",
  ...props
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin });
  const reduce = useReducedMotion();

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...props}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration, delay, ease: EASE }}
      {...props}
    >
      {children}
    </MotionTag>
  );
}
