"use client";
import React from "react";
import { motion } from "framer-motion";

export const NeonIcon = ({ icon: Icon, color = "purple" }) => {
  const getColors = () => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-500/10",
          border: "border-blue-500/30",
          glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]",
          iconContainer: "bg-blue-500/20",
          iconColor: "text-blue-400",
          halo: "border-blue-500/20",
        };
      case "purple":
      default:
        return {
          bg: "bg-[#6B46C1]/10",
          border: "border-[#8B5CF6]/30",
          glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]",
          iconContainer: "bg-[#8B5CF6]/20",
          iconColor: "text-[#A78BFA]",
          halo: "border-[#8B5CF6]/20",
        };
    }
  };

  const style = getColors();

  return (
    <div className="relative group/neon shrink-0">
      {/* Outer spinning halo */}
      <motion.div
        className={`absolute -inset-2 rounded-2xl border ${style.halo} border-dashed opacity-0 group-hover/neon:opacity-100 transition-opacity duration-300`}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main container */}
      <div
        className={`relative flex items-center justify-center w-14 h-14 rounded-2xl ${style.bg} border ${style.border} ${style.glow} group-hover/neon:scale-110 transition-transform duration-300`}
      >
        <div className={`absolute inset-0 rounded-2xl ${style.iconContainer} blur-md`} />
        {Icon && <Icon className={`w-7 h-7 relative z-10 ${style.iconColor}`} />}
      </div>
    </div>
  );
};
