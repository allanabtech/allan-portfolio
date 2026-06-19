"use client";

import React, { useState, useEffect } from "react";
import { ShieldCheck, Cpu, HardDrive, Compass, Activity, Coffee, Tv, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";
import SpotlightCard from "../SpotlightCard";
import AnimeCarousel from "../AnimeCarousel";

export default function MissionSection() {
  const [dayProgress, setDayProgress] = useState(75);
  const [activePhase, setActivePhase] = useState<"morning" | "afternoon" | "evening">("afternoon");
  const [currentTimeText, setCurrentTimeText] = useState("");

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const hrs = now.getHours();
      const mins = now.getMinutes();
      const totalMinutes = hrs * 60 + mins;
      
      const pct = Math.round((totalMinutes / 1440) * 100);
      setDayProgress(pct);

      const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      setCurrentTimeText(formattedTime);

      if (hrs >= 8 && hrs < 12) {
        setActivePhase("morning");
      } else if (hrs >= 12 && hrs < 18) {
        setActivePhase("afternoon");
      } else {
        setActivePhase("evening");
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000);
    return () => clearInterval(interval);
  }, []);

  const telemetryVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Mission Radar Scan overlay */}
      <div className="absolute right-4 top-1/4 w-64 h-64 opacity-[0.035] -z-10 overflow-hidden pointer-events-none select-none">
        <div className="w-full h-full rounded-full border border-accent/40 relative flex items-center justify-center">
          <div className="w-[80%] h-[80%] rounded-full border border-accent/20" />
          <div className="w-[50%] h-[50%] rounded-full border border-accent/15" />
          <div className="w-[20%] h-[20%] rounded-full border border-accent/10" />
          {/* Radar Sweep Needle */}
          <div className="absolute inset-0 rounded-full animate-radar-sweep bg-[conic-gradient(from_0deg,transparent_50%,rgba(88,166,255,0.25))] pointer-events-none" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Mission Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 22, damping: 20, delay: 0.4 }}
          className="w-full"
        >
          <SpotlightCard className="w-full rounded-2xl p-6 md:p-8 flex flex-col gap-8 shadow-2xl relative overflow-hidden bg-[#0D1017]/80">
          
          {/* Dashboard Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 z-10 select-none">
            <div>
              <span className="text-[10px] font-mono text-accent font-bold tracking-wider">ROUTINE-METRICS // DYNAMIC</span>
              <h3 className="text-lg md:text-xl font-extrabold text-text mt-1">
                Developer Daily Life Control
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full font-mono font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-status-pulse" />
                SYSTEM RUNNING // {currentTimeText || "LIVE"}
              </span>
            </div>
          </div>

          {/* Progress Bar & Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch z-10">
            
            {/* Progress Telemetry */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-[#0D1017]/80 rounded-xl border border-glass-border relative select-none">
              <div className="relative w-36 h-36 flex items-center justify-center">
                {/* SVG Progress Circle */}
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="rgba(240, 246, 252, 0.05)"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="60"
                    stroke="#00F0FF"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={377}
                    strokeDashoffset={377 * (1 - dayProgress / 100)}
                    strokeLinecap="round"
                    className="accent-glow transition-all duration-1000 ease-out"
                  />
                </svg>
                {/* Inner Text */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-text font-mono">{dayProgress}%</span>
                  <span className="text-[10px] text-muted tracking-widest uppercase mt-0.5">Day Elapsed</span>
                </div>
              </div>
              
              <div className="mt-4 font-mono text-[10px] text-muted space-y-1">
                <div>TIMEZONE: GMT+05:30</div>
                <div className="uppercase">ACTIVE: PHASE {activePhase === "morning" ? "01" : activePhase === "afternoon" ? "02" : "03"}</div>
              </div>
            </div>

            {/* Daily Routine Phases List */}
            <div className="md:col-span-8 space-y-4 flex flex-col justify-between">
              
              {/* Phase 1: Morning to Afternoon */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                activePhase === "morning"
                  ? "bg-accent/10 border-accent shadow-[0_0_15px_rgba(88,166,255,0.15)]"
                  : "bg-[#0D1017]/60 border-glass-border/40 hover:border-glass-border"
              }`}>
                <div className="flex items-center justify-between mb-1.5 select-none">
                  <span className="text-[9px] uppercase font-bold text-accent tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Phase 01 // 08:00 - 12:00
                  </span>
                  {activePhase === "morning" && (
                    <span className="text-[9px] px-2 py-0.5 rounded bg-accent/20 border border-accent/30 font-mono text-accent font-bold animate-pulse">ACTIVE NOW</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-text leading-relaxed">
                  Ideation, Concepts & Architecture R&D
                </p>
                <p className="text-xs text-muted mt-1">
                  Brainstorming algorithmic solutions, analyzing architecture whitepapers, drafting system flowcharts, and designing databases.
                </p>
              </div>

              {/* Phase 2: Afternoon to Evening */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                activePhase === "afternoon"
                  ? "bg-[#27C93F]/10 border-[#27C93F] shadow-[0_0_15px_rgba(39,201,63,0.15)]"
                  : "bg-[#0D1017]/60 border-glass-border/40 hover:border-glass-border"
              }`}>
                <div className="flex items-center justify-between mb-1.5 select-none">
                  <span className="text-[9px] uppercase font-bold text-[#27C93F] tracking-wider flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" /> Phase 02 // 12:00 - 18:00
                  </span>
                  {activePhase === "afternoon" && (
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[#27C93F]/20 border border-[#27C93F]/30 font-mono text-[#27C93F] font-bold animate-pulse">ACTIVE NOW</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-text leading-relaxed">
                  Deployment, Coding & CI/CD Pipelines
                </p>
                <p className="text-xs text-muted mt-1">
                  Writing Python and JavaScript modules, containerizing services with Docker, deploying serverless configurations to AWS cloud storage, and testing payloads.
                </p>
              </div>

              {/* Phase 3: Evening to Night */}
              <div className={`p-4 rounded-xl border transition-all duration-300 ${
                activePhase === "evening"
                  ? "bg-accent/10 border-accent shadow-[0_0_15px_rgba(88,166,255,0.15)]"
                  : "bg-[#0D1017]/60 border-glass-border/40 hover:border-glass-border"
              }`}>
                <div className="flex items-center justify-between mb-1.5 select-none">
                  <span className="text-[9px] uppercase font-bold text-accent tracking-wider flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5" /> Phase 03 // 18:00 - 23:00+
                  </span>
                  {activePhase === "evening" && (
                    <span className="text-[9px] px-2 py-0.5 rounded bg-accent/20 border border-accent/30 font-mono text-accent font-bold animate-pulse">ACTIVE NOW</span>
                  )}
                </div>
                <p className="text-sm font-semibold text-text leading-relaxed">
                  Rest, Anime & Open-Source Discoveries
                </p>
                <p className="text-xs text-muted mt-1">
                  Catching up on unwatched anime series, researching trending repositories on GitHub, auditing open-source packages, and winding down.
                </p>
                
                {/* Anime Poster Carousel — hover to scroll, alternates direction */}
                <AnimeCarousel className="mt-3" />
              </div>

            </div>

          </div>

          {/* Telemetry Sensor Dashboard Grid */}
          <motion.div
            variants={telemetryVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-glass-border/40 z-10 font-mono"
          >
            <motion.div variants={itemVariants} className="bg-[#0D1017]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">FOCUS INDEX</span>
              <span className="text-xs font-bold text-text mt-1 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-accent animate-pulse" /> 92%
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-[#0D1017]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">COFFEE INTAKE</span>
              <span className="text-xs font-bold text-text mt-1 flex items-center gap-1">
                <Coffee className="w-3.5 h-3.5 text-[#FFBD2E]" /> 2.0 Cups
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-[#0D1017]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">ANIME QUEUE</span>
              <span className="text-xs font-bold text-text mt-1 flex items-center gap-1">
                <Tv className="w-3.5 h-3.5 text-[#FF5F56]" /> 4 Unwatched
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-[#0D1017]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">ENERGY LEVEL</span>
              <span className="text-xs font-bold text-[#27C93F] mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-status-pulse" /> 78% ACTIVE
              </span>
            </motion.div>
          </motion.div>

          </SpotlightCard>
        </motion.div>

      </div>
    </div>
  );
}
