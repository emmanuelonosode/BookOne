"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1];

/**
 * Rotating hero phrases (Grain & Mortar–style). Cycles through `items`.
 * Under reduced-motion it shows the first item statically.
 */
export default function RotatingText({ items = [], interval = 2800, className = "" }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || items.length <= 1) return;
    const id = setInterval(() => setI((p) => (p + 1) % items.length), interval);
    return () => clearInterval(id);
  }, [items.length, interval, reduce]);

  if (reduce || items.length <= 1) {
    return <span className={className}>{items[0]}</span>;
  }

  return (
    <span className={`relative inline-flex overflow-hidden align-bottom ${className}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={i}
          initial={{ opacity: 0, y: "0.5em" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-0.5em" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-block"
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
