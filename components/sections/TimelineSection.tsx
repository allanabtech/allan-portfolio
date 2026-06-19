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
}

const EVENTS: TimelineEvent[] = [
  {
    id: 1,
    year: "2023 - 2024",
    title: "Started BCA Degree",
    category: "EDUCATION",
    description: "Began academic studies in Computer Applications. Focused on building strong programming foundations in Python, Java, systems architecture, and core databases.",
    skills: ["Java", "Python", "Data Structures", "SQL"],
    progress: 100,
    statusLabel: "ARCHIVED // COMPLETE",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Academic Foundation Core",
    milestoneDesc: "Acquired core fundamentals of software engineering, object-oriented concepts, relational databases, and multi-paradigm programming models.",
    objectivesTitle: "First Degree Milestones",
    objectivesDesc: "Completed initial command-line utility tools, set up database triggers/procedures, and established solid theoretical computing foundations.",
    telemetry: [
      { label: "GPA INDEX", value: "9.2 CGPA", icon: "award", colorClass: "text-accent" },
      { label: "HOURS INVESTED", value: "850 Hrs", icon: "clock", colorClass: "text-[#FFBD2E]" },
      { label: "VERIFICATION", value: "100% Passed", icon: "shield", colorClass: "text-[#27C93F]" },
      { label: "REPOS CREATED", value: "48 Repos", icon: "harddrive", colorClass: "text-[#FF5F56]" }
    ]
  },
  {
    id: 2,
    year: "2024",
    title: "Robotics & Hardware Systems",
    category: "PROJECTS",
    description: "Tinkered with microcontrollers, Arduino Uno systems, sensor telemetry, and wired obstacle avoidance navigation bots in C++.",
    skills: ["Arduino", "Embedded C++", "Hardware Wiring", "Sensor Telemetry"],
    progress: 100,
    statusLabel: "VERIFIED // DEPLOYED",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Embedded Logic Systems",
    milestoneDesc: "Wrote real-time loop structures to process distance data from ultrasonic sensors and drive dual-channel motor shields.",
    objectivesTitle: "Hardware Integration Test",
    objectivesDesc: "Successfully built physical robot chassis, completed sensor wire mappings, and configured PWM speeds for tight corner movements.",
    telemetry: [
      { label: "BAUD RATE", value: "9600 bps", icon: "activity", colorClass: "text-accent" },
      { label: "MCU CLOCK", value: "16 MHz", icon: "cpu", colorClass: "text-[#FFBD2E]" },
      { label: "INPUT VOLTAGE", value: "5.0 Volts", icon: "shield", colorClass: "text-[#27C93F]" },
      { label: "I/O CHANNELS", value: "14 Channels", icon: "layers", colorClass: "text-[#FF5F56]" }
    ]
  },
  {
    id: 3,
    year: "2024 - 2025",
    title: "Deep Dive into AI & ML",
    category: "EXPERTISE",
    description: "Shifted focus towards predictive algorithms, training machine learning classifiers, model parsing, computer vision using OpenCV, and PyTorch.",
    skills: ["PyTorch", "OpenCV", "Machine Learning", "Deep Learning"],
    progress: 100,
    statusLabel: "INTELLIGENCE // TRAINED",
    statusColorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    milestoneTitle: "CNN Models & Image Classification",
    milestoneDesc: "Constructed deep convolutional neural network layers, adjusted batch normalization layers, and trained weights on custom image classes.",
    objectivesTitle: "Computer Vision Pipelines",
    objectivesDesc: "Completed facial classification pipelines, applied image augmentation filters, and set up live stream frame analysis modules.",
    telemetry: [
      { label: "TRAINED FRAMEWORK", value: "PyTorch v2", icon: "cpu", colorClass: "text-accent" },
      { label: "MODEL ACCURACY", value: "94.2% mAP", icon: "activity", colorClass: "text-[#27C93F]" },
      { label: "COMPUTE PLATFORM", value: "CUDA v12", icon: "harddrive", colorClass: "text-[#FFBD2E]" },
      { label: "CLASSIFIERS", value: "12 Custom", icon: "shield", colorClass: "text-[#FF5F56]" }
    ]
  },
  {
    id: 4,
    year: "2025",
    title: "Cloud Infrastructure Setup",
    category: "EXPERTISE",
    description: "Began deploying models serverlessly, hosting data pipelines, configuring virtual networking structures, IAM roles, and storage buckets in AWS.",
    skills: ["AWS", "VPC Networking", "Serverless Architecture", "S3 & EC2"],
    progress: 100,
    statusLabel: "ONLINE // ORCHESTRATED",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Virtual Private Cloud Topology",
    milestoneDesc: "Designed dual-subnet VPC network layout with customized security groups, routing policies, and NAT gateways.",
    objectivesTitle: "AWS Serverless Deployment",
    objectivesDesc: "Integrated API gateway endpoints with backend lambda microservices and configured reliable file storing layers in S3 buckets.",
    telemetry: [
      { label: "VPC SUBNETS", value: "6 Multi-AZ", icon: "layers", colorClass: "text-accent" },
      { label: "API RESP TIME", value: "45ms Avg", icon: "activity", colorClass: "text-[#27C93F]" },
      { label: "GATEWAY UPTIME", value: "99.9% Ratio", icon: "shield", colorClass: "text-[#FFBD2E]" },
      { label: "PROVISIONED", value: "IaC Terraform", icon: "compass", colorClass: "text-[#FF5F56]" }
    ]
  },
  {
    id: 5,
    year: "2025 - 2026",
    title: "DevOps & Automation Pipelines",
    category: "EXPERTISE",
    description: "Focused on automating development workflows. Configured Docker container boxes, CI/CD pipeline triggers, Linux kernel configurations, and custom scripting.",
    skills: ["Docker", "CI/CD", "Linux Shell", "Automation Scripting"],
    progress: 100,
    statusLabel: "STABLE // AUTOMATED",
    statusColorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    milestoneTitle: "Containerization & Registry Setup",
    milestoneDesc: "Compiled multi-stage docker images, optimized final size profiles, and configured local registry pipelines.",
    objectivesTitle: "Automated Build Sequences",
    objectivesDesc: "Set up GitHub actions checks to lint code, run automated tests, compile source files, and deploy container clusters.",
    telemetry: [
      { label: "DOCKER IMAGES", value: "12 Containers", icon: "harddrive", colorClass: "text-accent" },
      { label: "CI PIPELINES", value: "150+ Runs", icon: "activity", colorClass: "text-[#27C93F]" },
      { label: "BUILD SPEED", value: "1m 45s Avg", icon: "clock", colorClass: "text-[#FFBD2E]" },
      { label: "RAM CONSTRAINTS", value: "512MB Limit", icon: "cpu", colorClass: "text-[#FF5F56]" }
    ]
  },
  {
    id: 6,
    year: "Active",
    title: "Pothole Severity Analysis Project",
    category: "PROJECTS",
    description: "Combining computer vision with edge hardware (Raspberry Pi & TPU) and cloud storage to analyze road severity structures.",
    skills: ["Raspberry Pi", "Inference Opt", "Edge Computing", "GPS Mapping"],
    progress: 100,
    statusLabel: "ARCHIVED // CONCLUDED",
    statusColorClass: "text-green-400 bg-green-500/10 border-green-500/20",
    milestoneTitle: "Edge Model Inference Done",
    milestoneDesc: "Successfully completed model porting to edge device, optimized inference weights, and integrated live video feedback.",
    objectivesTitle: "System Handover Complete",
    objectivesDesc: "Completed sensor integration loops, tested coordinates mapping layers, and verified background cloud upload processes.",
    telemetry: [
      { label: "EDGE TEMP", value: "42°C Stable", icon: "cpu", colorClass: "text-[#FF5F56]" },
      { label: "INFERENCE SPEED", value: "35ms / Frame", icon: "activity", colorClass: "text-[#FFBD2E]" },
      { label: "STORAGE ALLOC", value: "14.8 GB", icon: "harddrive", colorClass: "text-accent" },
      { label: "HARDWARE TPU", value: "100% Deployed", icon: "shield", colorClass: "text-[#27C93F]" }
    ]
  },
  {
    id: 7,
    year: "Roadmap",
    title: "AWS Solutions Architect",
    category: "FUTURE",
    description: "Preparing for advanced AWS Solutions Architect Certification and deep diving into Kubernetes orchestration systems.",
    skills: ["AWS Architect Cert", "Kubernetes", "Advanced Systems Design"],
    progress: 45,
    statusLabel: "ROADMAP // ACTIVE STUDY",
    statusColorClass: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    milestoneTitle: "Solutions Architect Pro Syllabus",
    milestoneDesc: "Studying advanced network routing patterns, disaster recovery strategies, federated authorization services, and cloud optimization rules.",
    objectivesTitle: "Kubernetes & Orchestration",
    objectivesDesc: "Diving deep into cluster networks, pod replication systems, node scaling policies, and service mesh platforms.",
    telemetry: [
      { label: "STUDY RATIO", value: "45% Complete", icon: "layers", colorClass: "text-accent" },
      { label: "MOCK EXAM SCORES", value: "820 / 1000", icon: "activity", colorClass: "text-[#27C93F]" },
      { label: "K8S CONSTRUCTS", value: "Sandbox Level", icon: "cpu", colorClass: "text-[#FFBD2E]" },
      { label: "EST COMPLETION", value: "Q3 2026", icon: "clock", colorClass: "text-[#FF5F56]" }
    ]
  }
];

export default function TimelineSection() {
  const [activeEvent, setActiveEvent] = useState<number>(6); // active on Pothole project by default

  const listVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -15 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 22, damping: 20 },
    },
  };

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
              transition={{ type: "spring", stiffness: 35, damping: 20 }}
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
                    ? "bg-[#0D1017] border-accent/40 shadow-lg"
                    : "bg-transparent border-glass-border/30 hover:bg-[#0D1017]/30 hover:border-glass-border"
                }`}
              >
                <div>
                  <span className={`text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded ${
                    evt.category === "FUTURE" 
                      ? "bg-blue-500/10 text-blue-400 border border-blue-500/25"
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
                      {EVENTS[activeEvent - 1].title}
                    </h3>
                  </div>
                  <div>
                    <span className={`flex items-center gap-1.5 text-[10px] ${EVENTS[activeEvent - 1].statusColorClass} px-3 py-1 rounded-full font-mono font-semibold`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-status-pulse" />
                      {EVENTS[activeEvent - 1].statusLabel}
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
                          strokeDashoffset={290 * (1 - EVENTS[activeEvent - 1].progress / 100)}
                          strokeLinecap="round"
                          className="accent-glow transition-all duration-1000 ease-out"
                        />
                      </svg>
                      {/* Inner text */}
                      <div className="absolute flex flex-col items-center justify-center">
                        <span className="text-xl font-extrabold text-text font-mono">{EVENTS[activeEvent - 1].progress}%</span>
                        <span className="text-[8px] text-muted tracking-wider uppercase">Progress</span>
                      </div>
                    </div>
                    <span className="text-[9px] text-muted font-mono mt-2 font-bold tracking-widest uppercase">YEAR: {EVENTS[activeEvent - 1].year}</span>
                  </div>

                  {/* Descriptions block */}
                  <div className="sm:col-span-8 space-y-3">
                    <div className="bg-[#0D1017]/60 p-3 rounded-lg border border-glass-border/30">
                      <span className="text-[9px] uppercase font-bold text-accent tracking-wider flex items-center gap-1.5 mb-1 select-none">
                        <Calendar className="w-3.5 h-3.5 text-accent" /> {EVENTS[activeEvent - 1].category === "FUTURE" ? "Current Objective" : "Key Milestone"}
                      </span>
                      <p className="text-xs font-bold text-text leading-snug">
                        {EVENTS[activeEvent - 1].milestoneTitle}
                      </p>
                      <p className="text-[11px] text-muted mt-1 leading-relaxed">
                        {EVENTS[activeEvent - 1].milestoneDesc}
                      </p>
                    </div>

                    <div className="bg-[#0D1017]/60 p-3 rounded-lg border border-glass-border/30">
                      <span className="text-[9px] uppercase font-bold text-[#FFBD2E] tracking-wider flex items-center gap-1.5 mb-1 select-none">
                        <Layers className="w-3.5 h-3.5 text-[#FFBD2E]" /> Targets
                      </span>
                      <p className="text-xs font-bold text-text leading-snug">
                        {EVENTS[activeEvent - 1].objectivesTitle}
                      </p>
                      <p className="text-[11px] text-muted mt-1 leading-relaxed">
                        {EVENTS[activeEvent - 1].objectivesDesc}
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
                    {EVENTS[activeEvent - 1].skills.map((skill, idx) => (
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
                  {EVENTS[activeEvent - 1].telemetry.map((tel, idx) => (
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
