"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Custom trailing cursor (Awwwards / nacreous-style).
 * - A soft ring follows the pointer with spring smoothing.
 * - Grows + shows a label over elements marked with [data-cursor] / [data-cursor-label].
 * - Disabled entirely on touch / coarse pointers and under prefers-reduced-motion.
 * Additive (native cursor stays visible) so it never breaks usability.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target.closest?.("[data-cursor], a, button");
      if (target) {
        setHovering(true);
        setLabel(target.getAttribute?.("data-cursor-label") || "");
      } else {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        mixBlendMode: label ? "normal" : "difference",
      }}
      animate={{
        width: label ? 72 : hovering ? 48 : 16,
        height: label ? 72 : hovering ? 48 : 16,
        backgroundColor: label ? "#15803D" : hovering ? "rgba(255,255,255,0.15)" : "#ffffff",
        border: hovering && !label ? "1px solid rgba(255,255,255,0.6)" : "1px solid rgba(255,255,255,0)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.4 }}
    >
      <AnimatePresence>
        {label && (
          <motion.span
            key={label}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
            className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
