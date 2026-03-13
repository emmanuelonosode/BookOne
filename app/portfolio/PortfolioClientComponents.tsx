"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import React, { MouseEvent } from "react";

const useGlowEffect = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30, mass: 0.5 });

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(
    400px circle at ${springX}px ${springY}px,
    rgba(107, 70, 193, 0.1),
    transparent 80%
  )`;

  return { handleMouseMove, background };
};

export const GlowWrapper = ({
  children,
  className = "",
  delay = 0,
  gridColor = "#000",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  gridColor?: string;
}) => {
  const { handleMouseMove, background } = useGlowEffect();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay }}
      className={`group relative overflow-hidden bg-[#1A1A24]/60 backdrop-blur-md border border-white/10 rounded-[2rem] transition-all duration-500 shadow-sm hover:shadow-[0_0_20px_rgba(107,70,193,0.3)] hover:border-[#6b46c1]/50 ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen"
        style={{ background }}
      />
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none mix-blend-overlay bg-[url('/grid-pattern.svg')]"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridColor} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
