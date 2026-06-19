"use client";

import React, { useState } from "react";
import { Calendar, Layers } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  category: "EDUCATION" | "PROJECTS" | "EXPERTISE" | "FUTURE";
  description: string;
  skills: string[];
}

const EVENTS: TimelineEvent[] = [
  {
    id: 1,
    year: "2023 - 2024",
    title: "Started BCA Degree",
    category: "EDUCATION",
    description: "Began academic studies in Computer Applications. Focused on building strong programming foundations in Python, Java, systems architecture, and core databases.",
    skills: ["Java", "Python", "Data Structures", "SQL"],
  },
  {
    id: 2,
    year: "2024",
    title: "Robotics & Hardware Systems",
    category: "PROJECTS",
    description: "Tinkered with microcontrollers, Arduino Uno systems, sensor telemetry, and wired obstacle avoidance navigation bots in C++.",
    skills: ["Arduino", "Embedded C++", "Hardware Wiring", "Sensor Telemetry"],
  },
  {
    id: 3,
    year: "2024 - 2025",
    title: "Deep Dive into AI & ML",
    category: "EXPERTISE",
    description: "Shifted focus towards predictive algorithms, training machine learning classifiers, model parsing, computer vision using OpenCV, and PyTorch.",
    skills: ["PyTorch", "OpenCV", "Machine Learning", "Deep Learning"],
  },
  {
    id: 4,
    year: "2025",
    title: "Cloud Infrastructure Setup",
    category: "EXPERTISE",
    description: "Began deploying models serverlessly, hosting data pipelines, configuring virtual networking structures, IAM roles, and storage buckets in AWS.",
    skills: ["AWS", "VPC Networking", "Serverless Architecture", "S3 & EC2"],
  },
  {
    id: 5,
    year: "2025 - 2026",
    title: "DevOps & Automation Pipelines",
    category: "EXPERTISE",
    description: "Focused on automating development workflows. Configured Docker container boxes, CI/CD pipeline triggers, Linux kernel configurations, and custom scripting.",
    skills: ["Docker", "CI/CD", "Linux Shell", "Automation Scripting"],
  },
  {
    id: 6,
    year: "Active",
    title: "Pothole Severity Analysis Project",
    category: "PROJECTS",
    description: "Combining computer vision with edge hardware (Raspberry Pi & TPU) and cloud storage to analyze road severity structures.",
    skills: ["Raspberry Pi", "Inference Opt", "Edge Computing", "GPS Mapping"],
  },
  {
    id: 7,
    year: "Roadmap",
    title: "AWS Solutions Architect",
    category: "FUTURE",
    description: "Preparing for advanced AWS Solutions Architect Certification and deep diving into Kubernetes orchestration systems.",
    skills: ["AWS Architect Cert", "Kubernetes", "Advanced Systems Design"],
  },
];

export default function TimelineSection() {
  const [activeEvent, setActiveEvent] = useState<number>(6); // active on Current Mission project by default

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 90, damping: 15 },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Drifting Chronological Particles */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] overflow-hidden pointer-events-none select-none">
        <div className="absolute left-1/4 top-10 w-2 h-2 rounded-full bg-accent animate-ping" />
        <div className="absolute right-1/4 bottom-10 w-3 h-3 rounded-full bg-accent animate-ping" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text">08. Journey So Far</h2>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>

        {/* Telemetry Subtitle */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none">
          <span>MILESTONES RECORDED: {EVENTS.length}</span>
          <span>•</span>
          <span>CHRONOLOGY: ASCENDING</span>
          <span>•</span>
          <span>LOG: VERIFIED</span>
        </div>

        {/* Timeline Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Vertical Event List (5 cols) with Drifting Connector */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="md:col-span-5 space-y-3 relative pl-6"
          >
            {/* Timeline vertical connector track */}
            <div className="absolute left-2.5 top-3 bottom-3 w-[1px] bg-glass-border/60" />
            
            {/* Drifting Indicator Node */}
            <motion.div
              layout
              className="absolute left-[7px] w-2 h-2 rounded-full bg-accent z-20 shadow-[0_0_10px_rgba(88,166,255,0.8)]"
              style={{
                top: `${((activeEvent - 1) / (EVENTS.length - 1)) * 88}%`,
                transform: 'translateY(16px)',
              }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            >
              <div className="absolute -inset-1 rounded-full bg-accent/40 animate-ping" />
            </motion.div>

            {EVENTS.map((evt) => (
              <motion.button
                key={evt.id}
                variants={itemVariants}
                onClick={() => setActiveEvent(evt.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group select-none ${
                  activeEvent === evt.id
                    ? "bg-[#161B22] border-accent/40 shadow-lg"
                    : "bg-transparent border-glass-border/30 hover:bg-[#161B22]/30 hover:border-glass-border"
                }`}
              >
                <div>
                  <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                    evt.category === "FUTURE" 
                      ? "bg-purple-500/10 text-purple-400 border border-purple-500/25"
                      : evt.id === 6
                      ? "bg-green-500/10 text-green-400 border border-green-500/25"
                      : "bg-white/5 text-muted border border-glass-border"
                  }`}>
                    {evt.year}
                  </span>
                  <h3 className={`text-xs md:text-sm font-bold mt-2 transition-colors ${
                    activeEvent === evt.id ? "text-accent" : "text-text group-hover:text-accent"
                  }`}>
                    {evt.title}
                  </h3>
                </div>
                <span className="text-[9px] uppercase tracking-widest font-mono text-muted group-hover:text-text font-bold">
                  {evt.category}
                </span>
              </motion.button>
            ))}
          </motion.div>

          {/* Active Event Showcase (7 cols) */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                initial={{ opacity: 0, scale: 0.97, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.97, x: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="glass-panel p-6 rounded-2xl border-glass-border min-h-[300px] flex flex-col justify-between shadow-2xl relative overflow-hidden bg-[#161B22]/80"
              >
                {/* Decorative accent glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl pointer-events-none animate-pulse" />

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-xs text-accent font-semibold tracking-wider uppercase font-mono select-none">
                    <Calendar className="w-4 h-4" /> {EVENTS[activeEvent - 1].year}
                  </div>

                  <h3 className="text-lg md:text-xl font-extrabold text-text">
                    {EVENTS[activeEvent - 1].title}
                  </h3>
                  
                  <p className="text-sm leading-relaxed text-muted mt-2">
                    {EVENTS[activeEvent - 1].description}
                  </p>
                </div>

                {/* Skills nodes */}
                <div className="mt-8 pt-4 border-t border-glass-border/40">
                  <h4 className="text-xs font-bold text-text uppercase tracking-wider flex items-center gap-1.5 mb-3 select-none">
                    <Layers className="w-4 h-4 text-accent" /> Focus Competencies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {EVENTS[activeEvent - 1].skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-[#0D1117] border border-glass-border px-3 py-1 rounded-md text-text font-medium font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
