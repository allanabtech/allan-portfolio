"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bug, Sparkles, CheckCircle2 } from "lucide-react";
import { useAchievements } from "./AchievementContext";

interface Particle {
  id: number;
  x: number;
  y: number;
}

export default function BugSquasher() {
  const { bugsSquashed, squashBug, unlocked } = useAchievements();
  const [bugPos, setBugPos] = useState({ x: 50, y: 50, angle: 0 });
  const [splats, setSplats] = useState<Particle[]>([]);
  const [isSquashed, setIsSquashed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Random bug crawling logic
  useEffect(() => {
    if (isSquashed) return;

    const crawlInterval = setInterval(() => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const padding = 20;

      // Random target position within bounds
      const targetX = Math.random() * (rect.width - padding * 2) + padding;
      const targetY = Math.random() * (rect.height - padding * 2) + padding;

      setBugPos((prev) => {
        // Calculate angle of motion
        const dx = targetX - prev.x;
        const dy = targetY - prev.y;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90; // offset by 90deg for bug svg orientation

        return { x: targetX, y: targetY, angle };
      });
    }, 1800);

    return () => clearInterval(crawlInterval);
  }, [isSquashed]);

  const handleBugClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (isSquashed) return;

    setIsSquashed(true);
    squashBug();

    // Create custom particle bursts where the click happened
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      const newParticles = Array.from({ length: 6 }).map((_, i) => ({
        id: Date.now() + i,
        x: clickX,
        y: clickY,
      }));
      setSplats(newParticles);
    }

    // Respawn bug after 1 second
    setTimeout(() => {
      setIsSquashed(false);
      setSplats([]);
    }, 1000);
  };

  const isSeniorDebugger = bugsSquashed >= 10 || unlocked.includes("debugger");

  return (
    <div
      ref={containerRef}
      className="glass-panel w-full rounded-xl p-5 border-glass-border flex flex-col h-80 justify-between overflow-hidden relative select-none"
    >
      {/* Header Info */}
      <div className="z-10">
        <h3 className="text-base font-semibold text-text flex items-center gap-2">
          <Bug className="w-5 h-5 text-[#FFBD2E]" /> Bug Squash Sandbox
        </h3>
        <p className="text-xs text-muted mt-1 leading-relaxed">
          A system bug has escaped our compiler! Click the crawling bug to squash it.
        </p>
      </div>

      {/* Crawling Bug Container */}
      <div className="absolute inset-0 bg-[#0D1117]/20 cursor-crosshair">
        {/* Render splat particles */}
        <AnimatePresence>
          {splats.map((p, idx) => {
            const angle = (idx * 360) / splats.length;
            const rad = (angle * Math.PI) / 180;
            const dist = 35;
            const dx = Math.cos(rad) * dist;
            const dy = Math.sin(rad) * dist;

            return (
              <motion.div
                key={p.id}
                initial={{ x: p.x, y: p.y, scale: 1, opacity: 1 }}
                animate={{ x: p.x + dx, y: p.y + dy, scale: 0.1, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute w-2 h-2 rounded-full bg-green-500 z-10"
              />
            );
          })}
        </AnimatePresence>

        {/* The Bug itself */}
        <AnimatePresence>
          {!isSquashed && (
            <motion.div
              initial={{ x: bugPos.x, y: bugPos.y, rotate: bugPos.angle }}
              animate={{ x: bugPos.x, y: bugPos.y, rotate: bugPos.angle }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              onClick={handleBugClick}
              className="absolute w-8 h-8 flex items-center justify-center cursor-pointer z-20"
              style={{ originX: 0.5, originY: 0.5 }}
            >
              <Bug className="w-6 h-6 text-green-500 fill-green-500/20 filter drop-shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Score Tracker and Milestones */}
      <div className="z-10 bg-[#161B22]/80 backdrop-blur-sm p-3 rounded-lg border border-glass-border flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase font-semibold text-muted tracking-wider">Debugger Sandbox</span>
          <span className="text-sm font-bold text-text mt-0.5">
            Bugs Squashed: <span className="text-accent font-extrabold">{bugsSquashed}</span>
          </span>
        </div>
        <div>
          {isSeniorDebugger ? (
            <span className="text-xs text-green-400 font-medium flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> Senior Debugger
            </span>
          ) : (
            <span className="text-[10px] text-muted bg-white/5 border border-glass-border px-2.5 py-1 rounded-full">
              Goal: 10 squashed
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
