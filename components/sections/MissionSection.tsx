"use client";

import React from "react";
import { ShieldCheck, Cpu, HardDrive, Compass, Activity, MapPin } from "lucide-react";
import { motion, Variants } from "framer-motion";

export default function MissionSection() {
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
      transition: { duration: 0.4 },
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
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text">06. Current Mission Control</h2>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>
        <p className="text-sm text-muted mb-10 max-w-lg leading-relaxed">
          Active mission telemetry. Tracking current objectives, design milestones, and deployment progress in real-time.
        </p>

        {/* Mission Dashboard Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="glass-panel w-full rounded-2xl border-glass-border p-6 md:p-8 flex flex-col gap-8 shadow-2xl relative overflow-hidden bg-[#161B22]/80"
        >
          
          {/* Dashboard Header */}
          <div className="flex items-center justify-between flex-wrap gap-4 z-10 select-none">
            <div>
              <span className="text-[10px] font-mono text-accent font-bold tracking-wider">PROJECT-MISSION // ACTIVE</span>
              <h3 className="text-lg md:text-xl font-extrabold text-text mt-1">
                Pothole Detection & Severity Analysis
              </h3>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3.5 py-1.5 rounded-full font-mono font-semibold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-status-pulse" />
                SYSTEM RUNNING
              </span>
            </div>
          </div>

          {/* Progress Bar & Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center z-10">
            
            {/* Progress Telemetry */}
            <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-[#0D1117]/80 rounded-xl border border-glass-border relative select-none">
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
                    stroke="#58A6FF"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={377}
                    strokeDashoffset={377 * (1 - 0.75)}
                    strokeLinecap="round"
                    className="accent-glow"
                  />
                </svg>
                {/* Inner Text */}
                <div className="absolute flex flex-col items-center justify-center">
                  <span className="text-3xl font-extrabold text-text font-mono">75%</span>
                  <span className="text-[10px] text-muted tracking-widest uppercase mt-0.5">Progress</span>
                </div>
              </div>
            </div>

            {/* Milestones Info */}
            <div className="md:col-span-8 space-y-5">
              <div className="bg-[#0D1117]/60 p-4 rounded-xl border border-glass-border/40">
                <span className="text-[9px] uppercase font-bold text-accent tracking-wider flex items-center gap-1.5 mb-1.5 select-none">
                  <ShieldCheck className="w-3.5 h-3.5" /> Current Milestone
                </span>
                <p className="text-sm font-semibold text-text leading-relaxed">
                  Model Porting & Inference Optimization
                </p>
                <p className="text-xs text-muted mt-1.5">
                  Porting neural models into Raspberry Pi hardware, configuring PyTorch Mobile dependencies, and benchmarking hardware accelerators.
                </p>
              </div>

              {/* Coordinates Mappings (High Density detail) */}
              <div className="bg-[#0D1117]/60 p-4 rounded-xl border border-glass-border/40 font-mono">
                <span className="text-[9px] uppercase font-bold text-[#27C93F] tracking-wider flex items-center gap-1.5 mb-2 select-none">
                  <MapPin className="w-3.5 h-3.5" /> ACTIVE GPS GEOMETRY
                </span>
                <div className="flex flex-wrap justify-between text-[10px] text-muted gap-2">
                  <span>LAT: 12.9716° N</span>
                  <span>LNG: 77.5946° E</span>
                  <span>HEADING: 184° S</span>
                  <span>DEV-ADDR: 0x7E-FF</span>
                </div>
              </div>

              <div className="bg-[#0D1117]/60 p-4 rounded-xl border border-glass-border/40">
                <span className="text-[9px] uppercase font-bold text-[#FFBD2E] tracking-wider flex items-center gap-1.5 mb-1.5 select-none">
                  <Compass className="w-3.5 h-3.5" /> Next Objective
                </span>
                <p className="text-sm font-semibold text-text leading-relaxed">
                  GPS coordinate tagging & Cloud Upload Pipeline
                </p>
                <p className="text-xs text-muted mt-1.5">
                  Adding coordinate mapping layers using GPS shields, packing severity payload logs, and automating background upload syncing to secure cloud buckets.
                </p>
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
            <motion.div variants={itemVariants} className="bg-[#0D1117]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">CPU TEMP</span>
              <span className="text-xs font-bold text-text mt-1 flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-[#FF5F56]" /> 42°C
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-[#0D1117]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">INFERENCE LATENCY</span>
              <span className="text-xs font-bold text-text mt-1 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 text-[#FFBD2E]" /> 35ms
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-[#0D1117]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">STORAGE CAPACITY</span>
              <span className="text-xs font-bold text-text mt-1 flex items-center gap-1">
                <HardDrive className="w-3.5 h-3.5 text-accent" /> 14.8 GB Free
              </span>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-[#0D1117]/40 p-3 rounded-lg border border-glass-border/30 flex flex-col select-none">
              <span className="text-[9px] text-muted font-bold">TPU CORE LOAD</span>
              <span className="text-xs font-bold text-[#27C93F] mt-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#27C93F] animate-status-pulse" /> 84% ACTIVE
              </span>
            </motion.div>
          </motion.div>

        </motion.div>

      </div>
    </div>
  );
}
