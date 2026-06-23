"use client";

import React, { useEffect } from "react";
import { AlertTriangle, ShieldCheck, Terminal } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useAchievements } from "../AchievementContext";
import SpotlightCard from "../SpotlightCard";

interface IncidentReport {
  id: string;
  title: string;
  date: string;
  impact: "CRITICAL" | "HIGH" | "MEDIUM";
  summary: string;
  rootCause: string;
  resolution: string;
}

const INCIDENTS: IncidentReport[] = [
  {
    id: "INCIDENT-101",
    title: "Ultrasonic Sensor Threshold Drift",
    date: "Robotics Phase",
    impact: "HIGH",
    summary: "The autonomous bot consistently collided with dark, sound-absorbing surfaces (like fabric panels) during initial navigation runs.",
    rootCause: "Ultrasonic waves were absorbed by textures rather than bouncing back. Our threshold limits were hardcoded to rigid walls, ignoring surface acoustic impedance.",
    resolution: "Added supplementary infrared distance telemetry to verify sensor readings and wrote a Kalman filter to fuse ultrasonic and IR sensor data, eliminating blind spots."
  },
  {
    id: "INCIDENT-203",
    title: "AWS Lambda Timeout on CNN Inference",
    date: "Cloud Integration",
    impact: "CRITICAL",
    summary: "Cloud image classification request spikes caused API Gateway timeouts (504 Gateway Timeout) on serverless invoke endpoints.",
    rootCause: "Loading the large machine learning weights into RAM on each cold start exceeded the 30-second Lambda timeout window.",
    resolution: "Optimized model weights using quantization, moved models to pre-warmed container endpoints using AWS ECS, and implemented client-side image downscaling prior to upload."
  },
  {
    id: "INCIDENT-308",
    title: "Assembly Interrupt Stack Crash",
    date: "Embedded Systems",
    impact: "HIGH",
    summary: "Microcontroller completely locked up and rebooted randomly when receiving high-frequency clock cycles from the encoder sensor.",
    rootCause: "The Interrupt Service Routine (ISR) took longer to execute than the sensor's frequency period, causing stack overflow as new interrupts piled up.",
    resolution: "Optimized the assembly ISR by moving heavy logs to the main thread. The ISR now only sets a volatile flag register, reducing run cycles from 120 to 8."
  },
  {
    id: "INCIDENT-404",
    title: "Wild Hardware Modding Incident: VRAM Upgrade & CPU Voltage Miscalculation",
    date: "Hardware Frontier Lab",
    impact: "CRITICAL",
    summary: "Attempted to double the VRAM capacity of a GPU by soldering an additional GDDR6 die directly onto the PCB, paired with a custom BIOS voltage tune pushing the VRMs 40% beyond rated load. The GPU displayed a beautiful single white frame, then nothing. The CPU, feeling left out, decided to fry the motherboard for moral support. The acrid smell of burned FR4 confirmed that physics had won. Again.",
    rootCause: "The voltage regulators on the board were simply not rated to supply stable power to twice the VRAM capacity under full memory bandwidth load. The custom BIOS raised VCore limits past what the VRM thermal headroom could sustain. Within 11 seconds of boot, the VRM MOSFETs hit thermal runaway, scorched the PCB traces, and backfed an unregulated spike into the CPU socket. The CPU, being an honourable piece of silicon, did not survive this betrayal.",
    resolution: "Lesson painfully learned: always validate VRM phase count and thermal ratings before touching BIOS voltage curves. Ordered a proper power delivery board, added inline current sensing, and now test every BIOS mod in 10mV increments with a thermal camera pointed at the VRMs. Also learned that 'it might just work' is not an engineering methodology — it is optimism with a body count (of hardware)."
  }
];

const IMPACT_CONFIG = {
  CRITICAL: { color: "#EF4444", bg: "rgba(239,68,68,0.08)", border: "rgba(239,68,68,0.25)" },
  HIGH: { color: "#F97316", bg: "rgba(249,115,22,0.08)", border: "rgba(249,115,22,0.25)" },
  MEDIUM: { color: "#EAB308", bg: "rgba(234,179,8,0.08)", border: "rgba(234,179,8,0.25)" },
};

export default function FailureLogSection() {
  const { triggerReadFailureLog } = useAchievements();

  useEffect(() => {
    triggerReadFailureLog();
  }, [triggerReadFailureLog]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.4 } },
  };

  const getCardVariants = (isEven: boolean): Variants => ({
    hidden: { opacity: 0, x: isEven ? 40 : -40 },
    visible: {
      opacity: 1, x: 0,
      transition: { type: "spring", stiffness: 80, damping: 14 },
    },
  });

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">

      {/* ── Red ambient atmosphere ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background: "radial-gradient(circle, rgba(239,68,68,0.05) 0%, rgba(239,68,68,0.02) 40%, transparent 70%)",
          animation: "red-glow-pulse 6s ease-in-out infinite",
        }}
      />

      {/* ── Corner warning glows ── */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)", animation: "aurora-drift 15s ease-in-out infinite" }} />
      <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(249,115,22,0.05) 0%, transparent 70%)", animation: "aurora-drift 18s ease-in-out infinite reverse" }} />

      {/* ── Static noise overlay ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Incident counter telemetry ── */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400">INCIDENTS LOGGED: {INCIDENTS.length}</span>
          </span>
          <span>•</span>
          <span>STATUS: POST-MORTEM COMPLETE</span>
          <span>•</span>
          <span>SYSTEM: RECOVERED</span>
        </div>

        {/* Timeline Reports */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8 relative"
        >
          {/* ── Animated timeline line ── */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 -z-10">
            <div className="w-full h-full"
              style={{
                background: "linear-gradient(to bottom, rgba(239,68,68,0.4), rgba(249,115,22,0.3), rgba(239,68,68,0.4))",
                animation: "hero-glow-breathe 4s ease-in-out infinite",
              }}
            />
            {/* Flowing dot along the line */}
            <div
              className="absolute w-1.5 h-1.5 rounded-full left-1/2 -translate-x-1/2 bg-red-400"
              style={{
                top: "0%",
                boxShadow: "0 0 8px rgba(239,68,68,0.8)",
                animation: "data-rain-drop 4s linear infinite",
              }}
            />
          </div>

          {INCIDENTS.map((report, idx) => {
            const isEven = idx % 2 === 0;
            const cfg = IMPACT_CONFIG[report.impact];
            return (
              <div
                key={report.id}
                className={`flex flex-col md:flex-row items-stretch md:justify-between relative ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline Dot */}
                <div
                  className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#0D1017] border flex items-center justify-center z-10 text-xs font-mono font-bold shadow-md select-none"
                  style={{
                    borderColor: cfg.border,
                    color: cfg.color,
                    animation: "timeline-dot-pulse 2.5s ease-in-out infinite",
                    animationDelay: `${idx * 0.6}s`,
                    boxShadow: `0 0 12px ${cfg.color}30`,
                  }}
                >
                  {idx + 1}
                </div>

                {/* Card */}
                <motion.div
                  variants={getCardVariants(isEven)}
                  className="w-full md:w-[46%] ml-12 md:ml-0"
                >
                  <SpotlightCard
                    className="p-5 rounded-xl space-y-4 failure-spotlight relative overflow-hidden"
                    style={{
                      borderColor: cfg.border,
                      animation: `card-breathe 6s ease-in-out infinite`,
                      animationDelay: `${idx * 0.8}s`,
                      ["--card-glow" as string]: `${cfg.color}15`,
                    }}
                  >
                    {/* Card shimmer */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                      <div
                        className="absolute top-0 left-0 w-1/3 h-full"
                        style={{
                          background: `linear-gradient(to right, transparent, ${cfg.color}08, transparent)`,
                          animation: `shimmer-sweep ${10 + idx * 2}s ease-in-out infinite`,
                          animationDelay: `${idx * 1.5}s`,
                        }}
                      />
                    </div>

                    {/* Header */}
                    <div className="flex items-start justify-between flex-wrap gap-2 relative z-10">
                      <div>
                        <span className="text-[10px] font-mono font-bold tracking-wider" style={{ color: cfg.color }}>{report.id}</span>
                        <h3 className="text-sm font-bold text-text mt-0.5">{report.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-white/5 border border-glass-border px-2 py-0.5 rounded text-muted font-mono select-none">
                          {report.date}
                        </span>
                        <span
                          className="text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border select-none"
                          style={{ background: cfg.bg, borderColor: cfg.border, color: cfg.color }}
                        >
                          {report.impact}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-xs space-y-2 relative z-10">
                      <div className="flex items-start gap-2 bg-[#FF5F56]/5 border border-[#FF5F56]/10 p-2.5 rounded-lg text-muted">
                        <AlertTriangle className="w-4 h-4 text-[#FF5F56] shrink-0 mt-0.5" />
                        <div><strong className="text-text">Symptom:</strong> {report.summary}</div>
                      </div>
                      <div className="flex items-start gap-2 bg-white/5 border border-glass-border p-2.5 rounded-lg text-muted font-mono text-[11px]">
                        <Terminal className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div><strong className="text-text">Root Cause:</strong> {report.rootCause}</div>
                      </div>
                      <div className="flex items-start gap-2 bg-green-500/5 border border-green-500/10 p-2.5 rounded-lg text-muted">
                        <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <div><strong className="text-text">Resolution:</strong> {report.resolution}</div>
                      </div>
                    </div>
                  </SpotlightCard>
                </motion.div>

                <div className="hidden md:block w-[46%]" />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
