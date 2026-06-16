"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * Magnetic wrapper — the child gently pulls toward the cursor while hovered.
 * Disabled under reduced-motion (renders a plain span).
 *
 * Props: strength (px of travel), className. Renders an inline-block wrapper.
 */
export default function Magnetic({ children, strength = 18, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.3 });

  if (reduce) {
    return <span className={`inline-block ${className}`}>{children}</span>;
  }

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
    setActive(false);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={reset}
      style={{ x: springX, y: springY, display: "inline-block" }}
      className={className}
      data-magnetic={active ? "" : undefined}
    >
      {children}
    </motion.span>
  );
}
