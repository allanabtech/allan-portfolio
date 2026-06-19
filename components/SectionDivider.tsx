"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <div className="w-full flex items-center justify-center h-20 relative overflow-hidden select-none pointer-events-none">
      {/* Vertical Connecting Line */}
      <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-glass-border via-accent/30 to-glass-border" />
      
      {/* Glowing Pulsing Node */}
      <motion.div
        animate={{
          scale: [0.9, 1.15, 0.9],
          opacity: [0.35, 0.7, 0.35],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        }}
        className="w-2 h-2 rounded-full bg-accent relative z-10"
      >
        <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
      </motion.div>
    </div>
  );
}
