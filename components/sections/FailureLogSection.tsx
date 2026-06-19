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
  }
];

export default function FailureLogSection() {
  const { triggerReadFailureLog } = useAchievements();

  // Trigger achievement if viewed
  useEffect(() => {
    triggerReadFailureLog();
  }, [triggerReadFailureLog]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const getCardVariants = (isEven: boolean): Variants => ({
    hidden: { opacity: 0, x: isEven ? 40 : -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 14,
      },
    },
  });

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Red Warning Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF5F56]/3 rounded-full filter blur-[100px] pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Timeline Reports */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:md:left-1/2 before:w-[1px] before:bg-glass-border"
        >
          {INCIDENTS.map((report, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={report.id}
                className={`flex flex-col md:flex-row items-stretch md:justify-between relative ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full bg-[#0D1017] border border-glass-border flex items-center justify-center z-10 text-xs font-mono font-bold text-accent shadow-md select-none">
                  {idx + 1}
                </div>

                {/* Card Container */}
                <motion.div
                  variants={getCardVariants(isEven)}
                  className="w-full md:w-[46%] ml-12 md:ml-0"
                >
                  <SpotlightCard className="p-5 rounded-xl space-y-4 failure-spotlight">
                    
                    {/* Header */}
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <span className="text-[10px] font-mono text-accent font-bold tracking-wider">{report.id}</span>
                        <h3 className="text-sm font-bold text-text mt-0.5">{report.title}</h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] bg-white/5 border border-glass-border px-2 py-0.5 rounded text-muted font-mono select-none">
                          {report.date}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border select-none ${
                            report.impact === "CRITICAL"
                              ? "bg-red-500/10 border-red-500/25 text-red-400"
                              : report.impact === "HIGH"
                              ? "bg-orange-500/10 border-orange-500/25 text-orange-400"
                              : "bg-yellow-500/10 border-yellow-500/25 text-yellow-400"
                          }`}
                        >
                          {report.impact}
                        </span>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="text-xs space-y-2">
                      <div className="flex items-start gap-2 bg-[#FF5F56]/5 border border-[#FF5F56]/10 p-2.5 rounded-lg text-muted">
                        <AlertTriangle className="w-4 h-4 text-[#FF5F56] shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-text">Symptom:</strong> {report.summary}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-white/5 border border-glass-border p-2.5 rounded-lg text-muted font-mono text-[11px]">
                        <Terminal className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-text">Root Cause:</strong> {report.rootCause}
                        </div>
                      </div>

                      <div className="flex items-start gap-2 bg-green-500/5 border border-green-500/10 p-2.5 rounded-lg text-muted">
                        <ShieldCheck className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="text-text">Resolution:</strong> {report.resolution}
                        </div>
                      </div>
                    </div>

                  </SpotlightCard>
                </motion.div>

                {/* Spacer for MD screens to align timeline */}
                <div className="hidden md:block w-[46%]" />
              </div>
            );
          })}
        </motion.div>

      </div>
    </div>
  );
}
