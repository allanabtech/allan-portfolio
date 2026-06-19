"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Check if user has already visited in this browser session or local storage
    const hasVisited = localStorage.getItem("allan_portfolio_visited");
    if (hasVisited) {
      setIsVisible(false);
      onComplete();
      return;
    }

    const sequence = [
      { text: "Initializing Portfolio...", delay: 100 },
      { text: "", delay: 250 },
      { text: "Loading Projects", delay: 350 },
      { text: "██████████████ 100%", delay: 500 },
      { text: "", delay: 600 },
      { text: "Loading Cloud Infrastructure", delay: 700 },
      { text: "██████████████ 100%", delay: 850 },
      { text: "", delay: 950 },
      { text: "Loading AI Systems", delay: 1050 },
      { text: "██████████████ 100%", delay: 1200 },
      { text: "", delay: 1300 },
      { text: "Loading Engineering Lab", delay: 1400 },
      { text: "██████████████ 100%", delay: 1550 },
      { text: "", delay: 1650 },
      { text: "System Ready.", delay: 1750 },
    ];

    const timeouts = sequence.map((step) => {
      return setTimeout(() => {
        setLines((prev) => [...prev, step.text]);
      }, step.delay);
    });

    // Complete loading sequence and transition out
    const finishTimeout = setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("allan_portfolio_visited", "true");
      // Add slight delay to let fade-out animation play before triggering completion callback
      setTimeout(onComplete, 450);
    }, 2100);

    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="fixed inset-0 bg-[#0D1117] z-50 flex items-center justify-center font-mono text-xs md:text-sm p-6 select-none"
      >
        <div className="w-full max-w-sm space-y-2 text-left">
          {/* Simulated Terminal Header */}
          <div className="flex items-center gap-1.5 border-b border-glass-border pb-2.5 mb-4 text-[10px] text-muted">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-2">system-bootloader.sh</span>
          </div>

          {/* Loading Logs */}
          <div className="space-y-1 bg-[#161B22]/40 border border-glass-border/30 rounded-lg p-5 min-h-[290px] flex flex-col justify-center">
            {lines.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.12 }}
                className={`${
                  line === "System Ready."
                    ? "text-[#27C93F] font-bold text-sm mt-2"
                    : line === "Initializing Portfolio..."
                    ? "text-accent font-semibold"
                    : line.startsWith("Loading ")
                    ? "text-text"
                    : line.startsWith("█")
                    ? "text-accent/80 font-mono tracking-wider pl-4"
                    : "text-muted"
                } min-h-[12px]`}
              >
                {line === "System Ready." && "● "}
                {line}
              </motion.div>
            ))}
            
            {/* Blinking Cursor at the end of the logs */}
            {!lines.includes("System Ready.") && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-1.5 h-3 bg-accent ml-0.5 mt-1"
              />
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
