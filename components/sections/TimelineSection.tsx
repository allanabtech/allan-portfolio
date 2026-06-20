"use client";

import React, { useState } from "react";
import { Calendar, Layers, ShieldCheck, Cpu, HardDrive, Compass, Activity, Clock, Award, Star, BookOpen } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SpotlightCard from "../SpotlightCard";

interface TelemetryItem {
  label: string;
  value: string;
  icon: string;
  colorClass: string;
}

interface TimelineEvent {
  id: number;
  year: string;
  title: string;
  category: "EDUCATION" | "PROJECTS" | "EXPERTISE" | "FUTURE";
  description: string;
  skills: string[];
  progress: number;
  statusLabel: string;
  statusColorClass: string;
  milestoneTitle: string;
  milestoneDesc: string;
  objectivesTitle: string;
  objectivesDesc: string;
  telemetry: TelemetryItem[];
  startYear: number;
  endYear: number;
}

const EVENTS: TimelineEvent[] = [
  {
    id: 1,
    year: "2023 - 2026",
    title: "BCA (AI, CC & DevOps)",
    category: "EDUCATION",
    description: "Bachelor of Computer Applications specializing in Artificial Intelligence, Cloud Computing, and DevOps, completed at Yenepoya University, Bangalore Campus, delivered in partnership with IBM. Acquired strong theoretical foundations and practical competencies in engineering scalable, intelligent systems.",
    skills: ["Java OOP", "Linux System", "Python ML", "AWS Cloud", "Docker CI/CD", "NLP"],
    progress: 93.96,
    statusLabel: "IBM PARTNERED // GRADUATED",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Yenepoya University (Bangalore Campus)",
    milestoneDesc: "• IBM Partnered Program: Specially curated curriculum in AI, Cloud Computing, and DevOps.\n• Academic Record: 4557 / 4850 total marks (93.96% aggregate).\n• CGPA (9.5 Scale): 9.89 / 10 (Standard conversion method).\n• CGPA (10.0 Scale): 9.40 / 10 (Linear grade point mapping).",
    objectivesTitle: "Semester Breakdown & Core Subjects",
    objectivesDesc: "• Sem VI (95.28% | 667/700): NLP, Semantic Web & Social Networks, Mobile App Dev\n• Sem V (93.63% | 749/800): Deep Learning, Progressive Web, Principles of Authorization\n• Sem IV (95.75% | 766/800): Intro to IoT, Cloud Services & Models, Cyber Security\n• Sem III (93.88% | 798/850): Intro to AI, Statistics for ML, Software Engineering\n• Sem II (92.32% | 877/950): Operating System with Linux, Networking & Communication, Data Structures & Algorithms\n• Sem I (93.33% | 700/750): OOP with Java, Foundation of Cloud Technology, Public Administration & Business",
    telemetry: [
      { label: "CGPA INDEX", value: "9.89 CGPA", icon: "award", colorClass: "text-accent" },
      { label: "TOTAL MARKS", value: "4557 / 4850", icon: "book", colorClass: "text-[#FFBD2E]" },
      { label: "CAMPUS", value: "Yenepoya, Bangalore", icon: "compass", colorClass: "text-[#27C93F]" },
      { label: "OVERALL RATIO", value: "93.96%", icon: "activity", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2023,
    endYear: 2026
  },
  {
    id: 2,
    year: "2017 - Present",
    title: "Project ∞ — Hardware Frontier Lab",
    category: "PROJECTS",
    description: "A lifelong research initiative dedicated to breaking the boundaries of consumer hardware. Pushing silicon beyond stock specifications through BGA component transplants, BIOS modding, and bare-metal firmware reverse engineering.",
    skills: ["BGA Soldering", "BIOS Modification", "Microarch RE", "Oscilloscopes", "JTAG Debugging"],
    progress: 100,
    statusLabel: "ONGOING // LIFELONG",
    statusColorClass: "text-amber-400 bg-amber-500/10 border-amber-500/20",
    milestoneTitle: "Transistor-Level Silicon Exploration",
    milestoneDesc: "Transplanting double VRAM capacity onto graphics cards, flashing customized BIOSes to unlock clock multipliers, and designing custom voltage regulation modules.",
    objectivesTitle: "Core Areas of Research",
    objectivesDesc: "• BGA Soldering & PCB mods: desoldering/reballing memory chips under hot-air rework\n• BIOS & Firmware mods: flashing microcode modifications to override security tables\n• Bare-metal architecture testing: probing clock cycles and latency using logic analyzers",
    telemetry: [
      { label: "EXPERIMENTS", value: "∞ Projects", icon: "activity", colorClass: "text-[#FFBD2E]" },
      { label: "SUBSTRATES", value: "Custom BIOS", icon: "cpu", colorClass: "text-accent" },
      { label: "REGULATORS", value: "Volt Modded", icon: "shield", colorClass: "text-[#27C93F]" },
      { label: "LIFETIME", value: "2017 - Future", icon: "clock", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2017,
    endYear: 9999
  },
  {
    id: 3,
    year: "2026",
    title: "Pothole Detection & Severity Mapping",
    category: "PROJECTS",
    description: "Designed an edge-computing computer vision pipeline mounted on vehicles to detect, classify, and map road anomalies in real time using a custom-quantized neural network.",
    skills: ["PyTorch", "OpenCV", "Raspberry Pi 4", "INT8 Quantization", "GPS Logging"],
    progress: 100,
    statusLabel: "DEPLOYED // RUNNING",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Edge Inference Acceleration",
    milestoneDesc: "Quantized MobileNetV2 to INT8 to boost inference frame rates from 4 FPS to 14 FPS on the Raspberry Pi 4 CPU, preventing skipped frames at driving speeds.",
    objectivesTitle: "Key Implementation Details",
    objectivesDesc: "• Multi-threaded post-processing: offloaded coordinate mapping and file uploads to background threads\n• GPS coordinate logging: cross-referenced detection times with GPS receiver inputs\n• Spatial deduplication: added overlap filters to merge duplicate records of the same road pothole",
    telemetry: [
      { label: "FPS RATE", value: "14 FPS", icon: "activity", colorClass: "text-accent" },
      { label: "INFERENCE", value: "INT8 Quantized", icon: "cpu", colorClass: "text-[#FFBD2E]" },
      { label: "STORAGE", value: "AWS S3 Logs", icon: "harddrive", colorClass: "text-[#27C93F]" },
      { label: "PLATFORM", value: "Raspberry Pi 4", icon: "layers", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2026,
    endYear: 2026
  },
  {
    id: 4,
    year: "2025 - 2026",
    title: "DevOps CI/CD Automation Pipeline",
    category: "EXPERTISE",
    description: "Orchestrated a highly resilient self-hosted CI/CD cycle deploying a Python microservice backend onto EC2. Integrated automated testing, linting, Docker builds, and rollback recovery.",
    skills: ["GitHub Actions", "Docker", "AWS ECR", "EC2 Runner", "Nginx", "Bash"],
    progress: 100,
    statusLabel: "STABLE // PRODUCTION",
    statusColorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    milestoneTitle: "OOM Resolution & Cache Optimization",
    milestoneDesc: "Resolved build memory crashes on t3.micro runner instances by executing sequential steps, pruning unused Docker layers, and establishing build-time RAM boundaries.",
    objectivesTitle: "Key Pipelines Constructed",
    objectivesDesc: "• Linting & Testing: automated flake8 checks and pytest runs on every pull request\n• ECR Registry Push: multi-stage docker builds pushed to secure AWS container storage\n• Automated Rollbacks: self-monitoring script triggers regression rollback if web app health check fails",
    telemetry: [
      { label: "BUILD SPEED", value: "< 4 mins", icon: "clock", colorClass: "text-accent" },
      { label: "HOST RUNNER", value: "EC2 t3.micro", icon: "cpu", colorClass: "text-[#FFBD2E]" },
      { label: "CONTAINER", value: "Docker ECR", icon: "harddrive", colorClass: "text-[#27C93F]" },
      { label: "RECOVERY", value: "Auto-Rollback", icon: "shield", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2025,
    endYear: 2026
  },
  {
    id: 5,
    year: "2025",
    title: "Cloud File Storage System",
    category: "PROJECTS",
    description: "Engineered a secure, full-stack cloud storage application featuring a React dashboard and FastAPI backend, using AWS S3 for storage and PostgreSQL for metadata logging.",
    skills: ["React.js", "FastAPI", "PostgreSQL", "AWS S3", "JWT Auth", "Python"],
    progress: 100,
    statusLabel: "VERIFIED // DEPLOYED",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Secure Transactions & Presigned URLs",
    milestoneDesc: "Designed the backend to generate time-limited S3 presigned URLs, ensuring users download or upload files securely without exposing API credentials.",
    objectivesTitle: "Key Implementation Details",
    objectivesDesc: "• Metadata deduplication: added unique hash constraints to prevent duplicate file records\n• Transact-then-upload: transactions revert metadata inserts if file fails to upload to S3\n• JWT authorization: secure session tokens mapped to user metadata rows",
    telemetry: [
      { label: "SECURITY", value: "Presigned URL", icon: "shield", colorClass: "text-accent" },
      { label: "METADATA", value: "PostgreSQL", icon: "harddrive", colorClass: "text-[#FFBD2E]" },
      { label: "FRONTEND", value: "React Tailwind", icon: "layers", colorClass: "text-[#27C93F]" },
      { label: "VOLUMES", value: "AWS S3 Bucket", icon: "cloud", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2025,
    endYear: 2025
  },
  {
    id: 6,
    year: "2024 - 2025",
    title: "ML Model Deployment Pipeline",
    category: "EXPERTISE",
    description: "Built an asynchronous serverless machine learning inference backend using AWS SQS and EC2 worker instances, resolving timeout bottlenecks during high concurrency.",
    skills: ["Python", "PyTorch", "AWS Lambda", "SQS Queuing", "EC2 Workers", "S3"],
    progress: 100,
    statusLabel: "ONLINE // RUNNING",
    statusColorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    milestoneTitle: "Cold Start Mitigation",
    milestoneDesc: "Migrated model loading away from AWS Lambda to a dedicated EC2 worker pool, dropping cold start delay from 22 seconds to under 3 seconds.",
    objectivesTitle: "Architecture Workflows",
    objectivesDesc: "• Job Queuing: AWS Lambda accepts requests and pushes task descriptors to SQS\n• Worker Inference: EC2 instance polls SQS and runs PyTorch models warm in VRAM\n• Storage Bucket: stores input raw images and output prediction metadata in S3",
    telemetry: [
      { label: "RESPONSE", value: "< 3s latency", icon: "activity", colorClass: "text-accent" },
      { label: "INFERENCE", value: "PyTorch EC2", icon: "cpu", colorClass: "text-[#FFBD2E]" },
      { label: "MESSAGE QUEUE", value: "AWS SQS", icon: "layers", colorClass: "text-[#27C93F]" },
      { label: "STORAGE", value: "AWS S3", icon: "harddrive", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2024,
    endYear: 2025
  },
  {
    id: 7,
    year: "2023 - 2024",
    title: "Autonomous Navigation Bot",
    category: "PROJECTS",
    description: "Constructed a custom two-wheeled robotics platform utilizing ultrasonic and infrared sensor arrays to complete real-time room navigation.",
    skills: ["Arduino Uno", "C++", "Sensor Fusion", "PID Control", "Hardware Wiring"],
    progress: 100,
    statusLabel: "COMPLETE // ARCHIVED",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Sensor Fusion & Filtering",
    milestoneDesc: "Designed moving-average data filters to smooth out erratic infrared sensor readings, preventing false wall detections on dark floors.",
    objectivesTitle: "Key Achievements",
    objectivesDesc: "• Non-blocking Arduino loops: processed sensor feedback and drove motors concurrently\n• Hardware Assembly: wired an L298N dual-H-bridge motor driver to coordinate motor speeds\n• Autonomous Logic: room mapping algorithm calculating obstacles without pre-programmed pathways",
    telemetry: [
      { label: "MCU SPEED", value: "16 MHz clock", icon: "cpu", colorClass: "text-accent" },
      { label: "MEMORY", value: "1.8 KB SRAM", icon: "harddrive", colorClass: "text-[#FFBD2E]" },
      { label: "COMPILER", value: "C++ AVR-GCC", icon: "book", colorClass: "text-[#27C93F]" },
      { label: "CHASSIS", value: "2-Wheel Custom", icon: "layers", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2023,
    endYear: 2024
  },
  {
    id: 8,
    year: "2022",
    title: "Multi-Sensor Embedded Framework",
    category: "EXPERTISE",
    description: "Authored an interrupt-driven sensor abstraction layer in C and Assembly for STM32 microcontrollers, managing concurrent I2C/SPI communications.",
    skills: ["STM32", "I2C / SPI Protocols", "C / Assembly", "Interrupts", "HAL Layer"],
    progress: 100,
    statusLabel: "STABLE // ARCHIVED",
    statusColorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    milestoneTitle: "Interrupt Starvation Fix",
    milestoneDesc: "Created a priority-tagged volatile flag register system, replacing blocking nested interrupts with main-loop event dispatching.",
    objectivesTitle: "Core Architecture Specs",
    objectivesDesc: "• Shared Bus Driver: robust locks for multiple SPI and I2C sensors sharing bus lines\n• ISR Execution Optimization: interrupt handlers execution completed in under 8 microseconds\n• Digital Debouncing: custom software-level filtering for mechanical switches and sensory GPIO lines",
    telemetry: [
      { label: "LATENCY", value: "< 8µs latency", icon: "clock", colorClass: "text-accent" },
      { label: "CHIP CORE", value: "ARM Cortex-M", icon: "cpu", colorClass: "text-[#FFBD2E]" },
      { label: "PROTOCOLS", value: "I2C / SPI", icon: "layers", colorClass: "text-[#27C93F]" },
      { label: "ARCH", value: "STM32 HAL", icon: "harddrive", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2022,
    endYear: 2022
  },
  {
    id: 9,
    year: "2019 - 2021",
    title: "12th Grade (Science // PCM)",
    category: "EDUCATION",
    description: "Completed senior secondary school education in the Science stream (Physics, Chemistry, Mathematics) with a 92% aggregate score. Studied at Jaswant Modern Sr. Sec. School, a heritage institution in Dehradun.",
    skills: ["Physics", "Chemistry", "Mathematics", "Scientific Methodology", "Calculus"],
    progress: 92.00,
    statusLabel: "DISTINCTION // 92.00%",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Jaswant Modern Sr. Sec. School (JMS)",
    milestoneDesc: "• Founded in 1949 under Parson's Estate, Rajpur Road, Dehradun.\n• A historic institution established in the sacred memory of Shri Jaswant Rai Khosala with the blessings of Swami Sivanandaji Maharaj (Divine Life Society).\n• Housed in a beautiful British Neo-Colonial campus with rich heritage, serving as a landmark boarding and day-boarding center in Doon Valley.",
    objectivesTitle: "Academic Performance Summary",
    objectivesDesc: "• Major Stream: Science (PCM - Physics, Chemistry, Mathematics)\n• Percentage: 92% Aggregate\n• Core Competency: Advanced algebra, calculus, electromagnetism, and organic/inorganic chemistry analytics.",
    telemetry: [
      { label: "GPA INDEX", value: "9.20 GPA Index", icon: "award", colorClass: "text-accent" },
      { label: "SCORE", value: "92.00% Aggregate", icon: "activity", colorClass: "text-[#27C93F]" },
      { label: "ESTABLISHED", value: "1949 (Heritage)", icon: "shield", colorClass: "text-[#FFBD2E]" },
      { label: "LOCATION", value: "Dehradun, UK", icon: "compass", colorClass: "text-[#FF5F56]" }
    ],
    startYear: 2019,
    endYear: 2021
  }
];

export default function TimelineSection() {
  const [activeEvent, setActiveEvent] = useState<number>(1); // active on BCA degree by default
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedEvents = (() => {
    const nonBcaEvents = EVENTS.filter(e => e.id !== 1);
    const sortedNonBca = [...nonBcaEvents].sort((a, b) => {
      if (sortOrder === "desc") {
        if (b.endYear !== a.endYear) return b.endYear - a.endYear;
        return b.startYear - a.startYear;
      } else {
        if (a.startYear !== b.startYear) return a.startYear - b.startYear;
        return a.endYear - b.endYear;
      }
    });

    const bcaEvent = EVENTS.find(e => e.id === 1)!;
    return sortOrder === "desc" 
      ? [bcaEvent, ...sortedNonBca]
      : [...sortedNonBca, bcaEvent];
  })();

  const activeIndex = sortedEvents.findIndex(e => e.id === activeEvent);
  const currentEvent = sortedEvents[activeIndex >= 0 ? activeIndex : 0] || sortedEvents[0];

  const renderTelemetryIcon = (iconName: string) => {
    switch (iconName) {
      case "cpu":
        return <Cpu className="w-3.5 h-3.5" />;
      case "harddrive":
        return <HardDrive className="w-3.5 h-3.5" />;
      case "compass":
        return <Compass className="w-3.5 h-3.5" />;
      case "activity":
        return <Activity className="w-3.5 h-3.5" />;
      case "clock":
        return <Clock className="w-3.5 h-3.5" />;
      case "award":
        return <Award className="w-3.5 h-3.5" />;
      case "star":
        return <Star className="w-3.5 h-3.5" />;
      case "book":
        return <BookOpen className="w-3.5 h-3.5" />;
      case "layers":
        return <Layers className="w-3.5 h-3.5" />;
      default:
        return <ShieldCheck className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Drifting Chronological Particles */}
      <div className="absolute inset-0 -z-10 opacity-[0.02] overflow-hidden pointer-events-none select-none">
        <div className="absolute left-1/4 top-10 w-2 h-2 rounded-full bg-accent animate-ping" />
        <div className="absolute right-1/4 bottom-10 w-3 h-3 rounded-full bg-accent animate-ping" style={{ animationDelay: "2s" }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Telemetry Subtitle */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none flex-wrap">
          <span>DEGREE: BCA (AI, CC, DevOps) - Yenepoya University (Bangalore)</span>
          <span>•</span>
          <div className="flex items-center gap-2">
            <span>CHRONOLOGY:</span>
            <select
              value={sortOrder}
              onChange={(e) => {
                const newOrder = e.target.value as "asc" | "desc";
                setSortOrder(newOrder);
                
                const nonBca = EVENTS.filter(event => event.id !== 1);
                const sortedNonBca = [...nonBca].sort((a, b) => {
                  if (newOrder === "desc") {
                    if (b.endYear !== a.endYear) return b.endYear - a.endYear;
                    return b.startYear - a.startYear;
                  } else {
                    if (a.startYear !== b.startYear) return a.startYear - b.startYear;
                    return a.endYear - b.endYear;
                  }
                });

                const bca = EVENTS.find(event => event.id === 1)!;
                const newSorted = newOrder === "desc"
                  ? [bca, ...sortedNonBca]
                  : [...sortedNonBca, bca];

                setActiveEvent(newSorted[0].id);
              }}
              className="bg-[#0D1017] border border-glass-border/40 text-accent text-[10px] font-mono px-2 py-0.5 rounded focus:outline-none focus:border-accent/80 cursor-pointer transition-colors"
            >
              <option value="desc">LATEST ON TOP (DESC)</option>
              <option value="asc">OLDEST ON TOP (ASC)</option>
            </select>
          </div>
          <span>•</span>
          <span>OVERALL MARKS: 4557 / 4850 (93.96%)</span>
          <span>•</span>
          <span>OVERALL CGPA: 9.89 (9.5 Scale) / 9.40 (10 Scale)</span>
        </div>

        {/* Timeline Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Vertical Event List (5 cols) with Drifting Connector */}
          <div className="md:col-span-5 space-y-3 relative pl-6">
            {/* Timeline vertical connector track */}
            <div className="absolute left-2.5 top-3 bottom-3 w-[1px] bg-glass-border/60" />
            
            {/* Drifting Indicator Node */}
            <motion.div
              layout
              className="absolute left-[7px] w-2 h-2 rounded-full bg-accent z-20 shadow-[0_0_10px_rgba(88,166,255,0.8)]"
              style={{
                top: `${((activeIndex >= 0 ? activeIndex : 0) / (sortedEvents.length - 1)) * 88}%`,
                transform: 'translateY(16px)',
              }}
              transition={{ type: "spring", stiffness: 35, damping: 20 }}
            >
              <div className="absolute -inset-1 rounded-full bg-accent/40 animate-ping" />
            </motion.div>

            {sortedEvents.map((evt) => (
              <button
                key={evt.id}
                onClick={() => setActiveEvent(evt.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between group select-none relative z-10 ${
                  activeEvent === evt.id
                    ? "bg-[#0D1017] border-accent/40 shadow-lg"
                    : "bg-transparent border-glass-border/30 hover:bg-[#0D1017]/30 hover:border-glass-border"
                }`}
              >
                <div>
                  <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                    evt.category === "FUTURE" 
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/25"
                      : evt.category === "EDUCATION" || evt.title.includes("Pothole")
                      ? "bg-green-500/10 text-green-400 border border-green-500/25"
                      : evt.title.includes("Frontier") || evt.title.includes("∞")
                      ? "bg-amber-500/10 text-amber-400 border border-amber-500/25"
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
              </button>
            ))}
          </div>

          {/* Active Event Showcase Dashboard (7 cols) */}
          <div className="md:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEvent}
                initial={{ opacity: 0, scale: 0.97, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -15 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full"
              >
                <SpotlightCard className="p-6 rounded-2xl flex flex-col gap-6 shadow-2xl relative overflow-hidden bg-[#0D1017]/85">
                {/* Decorative accent glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full filter blur-2xl pointer-events-none animate-pulse" />

                {/* Dashboard Header */}
                <div className="flex items-center justify-between flex-wrap gap-4 z-10 select-none border-b border-glass-border/40 pb-4">
                  <div>
                    <span className="text-[9px] font-mono text-accent font-bold tracking-wider">MILESTONE-COMMAND // R&D LOG</span>
                    <h3 className="text-base md:text-lg font-extrabold text-text mt-0.5">
                      {currentEvent.title}
                    </h3>
                  </div>
                  <div>
                    <span className={`flex items-center gap-1.5 text-[10px] ${currentEvent.statusColorClass} px-3 py-1 rounded-full font-mono font-semibold`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-status-pulse" />
                      {currentEvent.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Progress Bar & Description Detail Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-stretch z-10">
                  
                  {/* SVG Circle Progress */}
                  <div className="sm:col-span-4 flex flex-col items-center justify-center text-center p-4 bg-[#0D1017]/80 rounded-xl border border-glass-border relative select-none">
                    <div className="relative w-28 h-28 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="56"
                          cy="56"
                          r="46"
                          stroke="rgba(240, 246, 252, 0.05)"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <circle
                          cx="56"
                          cy="56"
                          r="46"
                          stroke="#00F0FF"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={290}
                          strokeDashoffset={290 * (1 - currentEvent.progress / 100)}
                          strokeLinecap="round"
                          className="accent-glow transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Inner text */}
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-sm font-extrabold text-text font-mono">{currentEvent.progress}%</span>
                        <span className="text-[8px] text-muted tracking-wider uppercase">
                          {currentEvent.category === "EDUCATION" ? "Result" : "Progress"}
                        </span>
                      </div>
                    </div>
                    <span className="text-[9px] text-muted font-mono mt-2 font-bold tracking-widest uppercase">YEAR: {currentEvent.year}</span>
                  </div>

                  {/* Descriptions block */}
                  <div className="sm:col-span-8 space-y-3">
                    <div className="bg-[#0D1017]/60 p-3 rounded-lg border border-glass-border/30">
                      <span className="text-[9px] uppercase font-bold text-accent tracking-wider flex items-center gap-1.5 mb-1 select-none">
                        <Calendar className="w-3.5 h-3.5 text-accent" /> {currentEvent.category === "FUTURE" ? "Current Objective" : "Key Milestone"}
                      </span>
                      <p className="text-xs font-bold text-text leading-snug">
                        {currentEvent.milestoneTitle}
                      </p>
                      <p className="text-[11px] text-muted mt-1 leading-relaxed whitespace-pre-line">
                        {currentEvent.milestoneDesc}
                      </p>
                    </div>

                    <div className="bg-[#0D1017]/60 p-3 rounded-lg border border-glass-border/30">
                      <span className="text-[9px] uppercase font-bold text-[#FFBD2E] tracking-wider flex items-center gap-1.5 mb-1 select-none">
                        <Layers className="w-3.5 h-3.5 text-[#FFBD2E]" /> Targets
                      </span>
                      <p className="text-xs font-bold text-text leading-snug">
                        {currentEvent.objectivesTitle}
                      </p>
                      <p className="text-[11px] text-muted mt-1 leading-relaxed whitespace-pre-line">
                        {currentEvent.objectivesDesc}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Focus Competency Tags */}
                <div className="z-10 bg-[#0D1017]/40 p-3 rounded-xl border border-glass-border/20">
                  <h4 className="text-[10px] font-bold text-text uppercase tracking-wider flex items-center gap-1.5 mb-2 select-none">
                    <Layers className="w-3.5 h-3.5 text-accent" /> Focus Competencies
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {currentEvent.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-[#0D1017]/80 border border-glass-border/60 px-2 py-0.5 rounded text-text font-medium font-mono hover:border-accent/40 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Telemetry Sensor Dashboard Grid */}
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-glass-border/40 z-10 font-mono">
                  {currentEvent.telemetry.map((tel, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0D1017]/50 p-2.5 rounded-lg border border-glass-border/30 flex flex-col select-none hover:bg-[#0D1017]/85 transition-colors"
                    >
                      <span className="text-[8px] text-muted font-bold tracking-wider">{tel.label}</span>
                      <span className="text-xs font-bold text-text mt-1.5 flex items-center gap-1.5">
                        <span className={tel.colorClass}>{renderTelemetryIcon(tel.icon)}</span>
                        {tel.value}
                      </span>
                    </div>
                  ))}
                </div>

                </SpotlightCard>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
