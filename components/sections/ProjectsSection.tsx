"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Bot, Cpu, CloudLightning, Construction, HelpCircle, BookOpen } from "lucide-react";
import SpotlightCard from "../SpotlightCard";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  status?: string;
  tech: string[];
  challenges: string;
  lessons: string;
  icon: React.ReactNode;
  svgGraphic: React.ReactNode;
  metrics: {
    loc: string;
    speed: string;
    memory: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "AI-Powered Navigation Bot",
    subtitle: "Autonomous obstacle avoidance and path planning",
    description: "Built an autonomous crawling robot that utilizes ultrasonic and infrared sensors to detect obstacles and map layouts. It runs localized pathfinding algorithms to navigate rooms without human intervention.",
    tech: ["Arduino Uno", "Ultrasonic Sensors", "IR Sensors", "Obstacle Detection", "C++", "Autonomous Navigation"],
    challenges: "Calibrating the IR sensors under varying light conditions was highly problematic. The sensor values fluctuated significantly, causing erratic turn actions.",
    lessons: "Designed a software-level threshold buffer matrix and moving average noise filter to smooth out signal telemetry, resulting in steady navigation.",
    icon: <Bot className="w-5 h-5 text-accent" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-accent opacity-80" fill="none">
        <rect x="30" y="20" width="40" height="25" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="40" cy="45" r="8" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="60" cy="45" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 50 20 L 50 10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="50" cy="8" r="2.5" fill="currentColor" />
        <path d="M 33 28 L 67 28" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
      </svg>
    ),
    metrics: {
      loc: "1,240 LOC",
      speed: "16 MHz clock",
      memory: "1.8 KB SRAM"
    }
  },
  {
    id: 2,
    title: "Robotics & Embedded Systems",
    subtitle: "Hardware-software integration framework",
    description: "An open framework mapping high-level software logic to low-level microcontroller operations. Handles asynchronous interrupts, register state reads, and multi-sensor interfaces.",
    tech: ["Hardware Software Integration", "Sensor Systems", "Embedded Development", "I2C/SPI", "C/Assembly"],
    challenges: "Handling real-time interrupt requests (IRQs) from multiple fast-firing sensors without causing thread locks or buffer overflows on limited RAM.",
    lessons: "Implemented a ring-buffer queue architecture with volatile flag registers, ensuring asynchronous logs do not overflow stack operations.",
    icon: <Cpu className="w-5 h-5 text-[#27C93F]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#27C93F] opacity-80" fill="none">
        <rect x="25" y="15" width="50" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="40" y="25" width="20" height="10" rx="1" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="1" />
        <line x1="20" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="30" x2="25" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="20" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="1.5" />
        <line x1="75" y1="20" x2="80" y2="20" stroke="currentColor" strokeWidth="1.5" />
        <line x1="75" y1="30" x2="80" y2="30" stroke="currentColor" strokeWidth="1.5" />
        <line x1="75" y1="40" x2="80" y2="40" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    metrics: {
      loc: "3,150 LOC",
      speed: "IRQ latency < 8µs",
      memory: "Volatile Registers"
    }
  },
  {
    id: 3,
    title: "AI & Cloud Computing Projects",
    subtitle: "Automated neural net deploy pipeline",
    description: "A hybrid framework that deploys trained machine learning model files into AWS cloud nodes. Automates instance provisioning, bucket data pipelines, and serverless compute triggers.",
    tech: ["AI Models", "Cloud Solutions", "Automation", "AWS Lambda", "S3", "Python"],
    challenges: "AWS Lambda timeout limitations when parsing large image payloads for inference models during peak trigger request spikes.",
    lessons: "Separated payload tasks: user triggers instantly write files to S3 buckets, firing a lightweight SQS queue which processes inference asynchronously in dedicated EC2 clusters.",
    icon: <CloudLightning className="w-5 h-5 text-[#FFBD2E]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#FFBD2E] opacity-80" fill="none">
        <path d="M 30 35 C 30 25, 45 20, 50 25 C 55 20, 70 25, 70 35 C 75 35, 80 40, 75 48 C 70 48, 30 48, 25 45 C 20 40, 25 35, 30 35 Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 50 38 L 45 46 L 52 46 L 48 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    metrics: {
      loc: "8,900 LOC",
      speed: "EC2 Autoscale",
      memory: "S3 Data Buckets"
    }
  },
  {
    id: 4,
    title: "Pothole Detection & Severity Analysis",
    subtitle: "Computer vision mapping on edge devices",
    description: "Currently in development. Real-time video stream processor detecting road damage, potholes, and classifying severity index for municipal maintenance prioritizing pipelines.",
    status: "In Development",
    tech: ["PyTorch", "OpenCV", "Raspberry Pi", "AWS Cloud", "GPS Telemetry"],
    challenges: "Achieving double-digit framerate processing on low-spec edge compute hardware (Raspberry Pi) when running raw convolutional layers.",
    lessons: "Moving from heavy ResNet models to custom lightweight MobileNet topologies, leveraging edge TPU coprocessors for hardware-level acceleration.",
    icon: <Construction className="w-5 h-5 text-[#FF5F56]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#FF5F56] opacity-80" fill="none">
        <path d="M 15 45 C 30 45, 35 32, 45 32 C 55 32, 60 50, 70 50 C 80 50, 85 45, 90 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="45" cy="32" r="3" fill="currentColor" className="animate-ping" />
        <circle cx="70" cy="50" r="3" fill="currentColor" className="animate-ping" />
        <line x1="10" y1="15" x2="35" y2="15" stroke="currentColor" strokeWidth="1.5" />
        <line x1="22.5" y1="15" x2="22.5" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
      </svg>
    ),
    metrics: {
      loc: "4,600 LOC",
      speed: "~45ms latency",
      memory: "RPi Edge TPU"
    }
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Sonar Radar Background Waves */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full border border-accent/15 -z-10 pointer-events-none animate-sonar-wave" />
      <div className="absolute bottom-10 left-10 w-52 h-52 rounded-full border border-accent/10 -z-10 pointer-events-none animate-sonar-wave" style={{ animationDelay: "3s" }} />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Telemetry Subtitle */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none">
          <span>DEPLOYED SERVICES: 3</span>
          <span>•</span>
          <span>ON EDGE TARGETS: 1</span>
          <span>•</span>
          <span>COMPILATION ROUTE: OPT-B2</span>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROJECTS.map((proj) => (
            <motion.div
              key={proj.id}
              variants={cardVariants}
            >
              <SpotlightCard
                onClick={() => setSelectedProject(proj)}
                className="rounded-xl p-6 cursor-pointer flex flex-col justify-between group h-80 relative overflow-hidden"
              >
                {/* Graphic Illustration */}
                <div className="w-full h-24 mb-4 bg-[#0D1017]/80 rounded-lg flex items-center justify-center border border-glass-border/40 overflow-hidden relative">
                  {proj.svgGraphic}
                  {proj.status && (
                    <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider font-extrabold bg-[#FF5F56]/15 border border-[#FF5F56]/30 text-[#FF5F56] px-2 py-0.5 rounded-full">
                      {proj.status}
                    </span>
                  )}
                </div>

                <div>
                  {/* Meta details */}
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="p-1.5 rounded-md bg-white/5 border border-glass-border">
                      {proj.icon}
                    </div>
                    <h3 className="text-base font-bold text-text group-hover:text-accent transition-colors">
                      {proj.title}
                    </h3>
                  </div>
                  <p className="text-xs text-muted font-medium mb-4">{proj.subtitle}</p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {proj.tech.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] bg-white/5 border border-glass-border px-2 py-0.5 rounded text-muted font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                  {proj.tech.length > 3 && (
                    <span className="text-[10px] text-accent font-semibold px-1 py-0.5">
                      +{proj.tech.length - 3} more
                    </span>
                  )}
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#0D1017]/90 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="glass-panel w-full max-w-xl rounded-xl border-glass-border overflow-hidden relative shadow-2xl z-10 flex flex-col max-h-[85vh] bg-[#0D1017]/95"
              >
                {/* Header */}
                <div className="p-5 border-b border-glass-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-glass-border">
                      {selectedProject.icon}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-text">{selectedProject.title}</h3>
                      <p className="text-xs text-muted">{selectedProject.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-muted hover:text-text p-1.5 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed text-muted">
                  
                  {/* Status Banner */}
                  {selectedProject.status && (
                    <div className="bg-[#FF5F56]/10 border border-[#FF5F56]/20 p-2.5 rounded-lg text-xs text-[#FF5F56] font-medium flex items-center gap-2">
                      <Construction className="w-4 h-4" /> Currently in Development phase
                    </div>
                  )}

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-[#0D1017]/60 border border-glass-border/40 p-3.5 rounded-lg text-center font-mono select-none">
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Lines of Code</span>
                      <span className="text-xs font-bold text-accent">{selectedProject.metrics.loc}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Speed/Clock</span>
                      <span className="text-xs font-bold text-[#27C93F]">{selectedProject.metrics.speed}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">MCU/Host Spec</span>
                      <span className="text-xs font-bold text-[#FFBD2E]">{selectedProject.metrics.memory}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-2">Overview</h4>
                    <p>{selectedProject.description}</p>
                  </div>

                  {/* Challenges Section */}
                  <div className="bg-[#FFBD2E]/5 border border-[#FFBD2E]/10 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-[#FFBD2E] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <HelpCircle className="w-4 h-4" /> Challenge Faced
                    </h4>
                    <p className="text-xs text-[#FFBD2E]/90">{selectedProject.challenges}</p>
                  </div>

                  {/* Lessons Learned Section */}
                  <div className="bg-[#27C93F]/5 border border-[#27C93F]/10 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-[#27C93F] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <BookOpen className="w-4 h-4" /> Engineering Lesson
                    </h4>
                    <p className="text-xs text-[#27C93F]/90">{selectedProject.lessons}</p>
                  </div>

                  {/* Full Tech Stack */}
                  <div>
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-2.5">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#0D1017] border border-glass-border px-3 py-1 rounded-md text-text font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
