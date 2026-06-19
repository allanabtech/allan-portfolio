"use client";

import React, { useState } from "react";
import { Cpu, Terminal, ShieldAlert, GitBranch, Settings, Network, X, Construction, HelpCircle, BookOpen, Layers } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import SpotlightCard from "../SpotlightCard";

interface LabExperiment {
  id: number;
  title: string;
  description: string;
  status: "Active" | "Archived" | "Staging";
  metric: string;
  icon: React.ReactNode;
  tech: string[];
  challenges: string;
  lessons: string;
  metrics: {
    parameter: string;
    rate: string;
    device: string;
  };
}

const EXPERIMENTS: LabExperiment[] = [
  {
    id: 1,
    title: "AI Experiments",
    description: "Training neural network classifiers locally, testing gradient descent optimization rates, and writing object segmentation layers.",
    status: "Active",
    metric: "Loss: 0.042",
    icon: <Cpu className="w-5 h-5 text-accent" />,
    tech: ["Python", "PyTorch", "OpenCV", "Convolutional Neural Nets", "Gradient Descent", "NumPy"],
    challenges: "Training classifiers on highly imbalanced edge data caused overfitting in the minority classes, skewing telemetry scores.",
    lessons: "Applied class-weighted cross-entropy loss functions and focal loss layers, balancing gradients and increasing mAP by 8.4%.",
    metrics: {
      parameter: "1.2M Weights",
      rate: "Loss: 0.042",
      device: "CUDA Acceleration"
    }
  },
  {
    id: 2,
    title: "Cloud Infrastructure Labs",
    description: "Configuring IaC templates, serverless API orchestration matrices, IAM policies, and VPC virtual networking topologies.",
    status: "Staging",
    metric: "Uptime: 99.98%",
    icon: <GitBranch className="w-5 h-5 text-[#27C93F]" />,
    tech: ["AWS EC2 & S3", "IAM Security Policies", "VPC Subnets", "Terraform", "Serverless API Gateway"],
    challenges: "Configuring IAM role structures too loosely created security vectors, while locking them down too tight blocked Lambda handler writes.",
    lessons: "Mapped granular permissions and automated roles assembly using Terraform IaC templates, testing and securing access.",
    metrics: {
      parameter: "AWS Cloud",
      rate: "Uptime: 99.98%",
      device: "6 Multi-AZ Subnets"
    }
  },
  {
    id: 3,
    title: "Linux Exploration",
    description: "Customizing kernel modules, testing socket performance constraints, and setting up secure shell sandbox environments.",
    status: "Active",
    metric: "OS: Ubuntu-LTS",
    icon: <Terminal className="w-5 h-5 text-[#FFBD2E]" />,
    tech: ["Ubuntu Linux", "Bash Scripting", "Sysctl Tuning", "SSH Keys", "Socket Buffer Optimization"],
    challenges: "High traffic packet handling led to network buffer overflows, dropping active connections at the kernel level.",
    lessons: "Optimized TCP socket read/write limits using customized sysctl rules, increasing total bandwidth throughput.",
    metrics: {
      parameter: "Ubuntu LTS",
      rate: "Buffer: 4.0MB",
      device: "TCP Tuning Active"
    }
  },
  {
    id: 4,
    title: "Hardware Modifications",
    description: "Solder-modding microcontrollers, wiring analog I/O relays, calibrating sensor logic boards, and testing digital hardware signals.",
    status: "Archived",
    metric: "Voltage: 5.0V",
    icon: <Settings className="w-5 h-5 text-[#FF5F56]" />,
    tech: ["Arduino/MCU C++", "Soldering Iron", "Relays & GPIO", "Logic Analyzer", "Digital Signal Filters"],
    challenges: "Bounce noise from physical switch triggers created duplicate signal interrupts, crashing the microcode loop.",
    lessons: "Implemented both hardware RC filter networks and software debouncing timers to isolate clean signal rises.",
    metrics: {
      parameter: "5.0V Logic",
      rate: "Relays: 4 Channels",
      device: "MCU GPIO Wired"
    }
  },
  {
    id: 5,
    title: "Automation Scripts",
    description: "Creating custom shell scripts to auto-backup server nodes, bundle builds, test logs, and optimize deployment flows.",
    status: "Active",
    metric: "Runs: Daily",
    icon: <ShieldAlert className="w-5 h-5 text-[#9fcbff]" />,
    tech: ["Shell Scripting", "Docker Commands", "CI/CD Workflows", "Cron Schedulers", "Logrotate"],
    challenges: "Automated backups locked the primary databases briefly, causing latency spikes in active client operations.",
    lessons: "Redirected read queries to replicas during backup events, scripting asynchronous compression jobs to run off-peak.",
    metrics: {
      parameter: "Cron Runner",
      rate: "Runs: Daily 02:00",
      device: "Backup DB Replicas"
    }
  },
  {
    id: 6,
    title: "Network Testing",
    description: "Sniffing packet routes, analyzing latency jitter across subnets, setting up firewalls, and auditing DNS record handshakes.",
    status: "Staging",
    metric: "Ping: 4ms",
    icon: <Network className="w-5 h-5 text-[#8B949E]" />,
    tech: ["Wireshark", "Ping Telemetry", "IPtables Rules", "Subnets Setup", "Jitter Audits"],
    challenges: "Tracing localized network jitter proved complex due to varying router routing loops along external hops.",
    lessons: "Configured dedicated traceroute logging sequences and structured strict IPtables rules to filter diagnostic payloads.",
    metrics: {
      parameter: "Ping: 4ms Avg",
      rate: "Jitter: < 1ms",
      device: "Wireshark Audited"
    }
  }
];

export default function LabSection() {
  const [selectedExperiment, setSelectedExperiment] = useState<LabExperiment | null>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 22,
        damping: 20,
      },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Scrolling Console Log Background */}
      <div className="absolute inset-y-0 right-4 w-56 opacity-[0.025] -z-10 overflow-hidden font-mono text-[9px] text-[#27C93F] select-none pointer-events-none">
        <div className="absolute right-0 top-0 h-[200%] animate-drift-down leading-relaxed whitespace-pre">
          {`[OK] SYS_TEMP: 42C\n[OK] COR_VOLT: 1.15V\n[OK] INTR_LAT: 8us\n[OK] ETH_STATUS: UP\n[OK] MEM_LOAD: 34%\n[OK] GPU_UTIL: 0%\n[OK] IPC_BUF: OK\n[OK] PWM_OUT: 42%\n[OK] SPI_CLK: 4MHz\n[OK] UART_SYS: BAUD-115200\n[OK] HOST_PING: 1.2ms`}
        </div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        <p className="text-sm text-muted mb-6 max-w-lg leading-relaxed">
          My personal R&D department. Click on any experiment to view technical specs, challenges, lessons, and configuration metrics in detail.
        </p>

        {/* Diagnostics Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-8 bg-[#0D1017]/30 border border-glass-border/30 rounded-xl font-mono text-[10px] text-muted relative overflow-hidden select-none">
          <div className="flex flex-col gap-1">
            <span>R&D HOST: NODE-ALPHA</span>
            <span className="font-bold text-accent">CPU LOAD: 18%</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>SANDBOX: SECURE-VM</span>
            <span className="font-bold text-[#27C93F]">LATENCY: 1.2ms</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>ACTIVE JOBS: 6/6</span>
            <span className="font-bold text-[#FFBD2E]">JOBS: WAITING</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>ISOLATION: HYPER-V</span>
            <span className="font-bold text-[#FF5F56]">INTEGRITY: 100%</span>
          </div>
        </div>

        {/* Dashboard Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EXPERIMENTS.map((exp) => (
            <motion.div
              key={exp.id}
              variants={cardVariants}
            >
              <SpotlightCard
                onClick={() => setSelectedExperiment(exp)}
                className="p-5 rounded-xl flex flex-col justify-between h-56 cursor-pointer group relative overflow-hidden"
              >
                <div>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 relative z-10">
                    <div className="p-2 rounded-lg bg-white/5 border border-glass-border">
                      {exp.icon}
                    </div>
                    {/* Status indicator */}
                    <span
                      className={`text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-full border ${
                        exp.status === "Active"
                          ? "bg-green-500/10 border-green-500/25 text-green-400"
                          : exp.status === "Staging"
                          ? "bg-accent/10 border-accent/25 text-accent"
                          : "bg-white/5 border-glass-border text-muted"
                      }`}
                    >
                      ● {exp.status}
                    </span>
                  </div>

                  {/* Info */}
                  <h3 className="text-sm font-bold text-text mb-1.5 group-hover:text-accent transition-colors relative z-10">{exp.title}</h3>
                  <p className="text-[11px] text-muted leading-relaxed line-clamp-3 relative z-10">
                    {exp.description}
                  </p>
                </div>

                {/* Footer Metric */}
                <div className="mt-4 pt-3 border-t border-glass-border/40 flex items-center justify-between text-[10px] font-mono text-muted relative z-10">
                  <span>METRIC:</span>
                  <span className="text-text font-bold uppercase">{exp.metric}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Detailed Modal Overlay */}
        <AnimatePresence>
          {selectedExperiment && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedExperiment(null)}
                className="absolute inset-0 bg-[#0D1017]/90 backdrop-blur-sm cursor-pointer"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="glass-panel w-full max-w-xl rounded-xl border-glass-border overflow-hidden relative shadow-2xl z-10 flex flex-col max-h-[85vh] bg-[#0D1017]/95"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-glass-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-glass-border">
                      {selectedExperiment.icon}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-text">{selectedExperiment.title}</h3>
                      <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-accent">R&D Lab Log #{selectedExperiment.id}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedExperiment(null)}
                    className="text-muted hover:text-text p-1.5 rounded-md hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed text-muted">
                  
                  {/* Status & Scope tag */}
                  <div className="flex items-center justify-between text-xs font-mono bg-[#0D1017]/60 border border-glass-border/40 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Construction className="w-4 h-4 text-accent" />
                      <span>LOGGING STATE:</span>
                    </div>
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded border ${
                      selectedExperiment.status === "Active"
                        ? "bg-green-500/10 border-green-500/20 text-green-400"
                        : selectedExperiment.status === "Staging"
                        ? "bg-accent/10 border-accent/20 text-accent"
                        : "bg-white/5 border-glass-border text-muted"
                    }`}>
                      {selectedExperiment.status}
                    </span>
                  </div>

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-[#0D1017]/60 border border-glass-border/40 p-3.5 rounded-lg text-center font-mono select-none">
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Parameters</span>
                      <span className="text-xs font-bold text-accent">{selectedExperiment.metrics.parameter}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Rate / State</span>
                      <span className="text-xs font-bold text-[#27C93F]">{selectedExperiment.metrics.rate}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Deployment Target</span>
                      <span className="text-xs font-bold text-[#FFBD2E]">{selectedExperiment.metrics.device}</span>
                    </div>
                  </div>

                  {/* Overview */}
                  <div>
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-2">Experiment Overview</h4>
                    <p className="text-xs">{selectedExperiment.description}</p>
                  </div>

                  {/* Challenges Section */}
                  <div className="bg-[#FFBD2E]/5 border border-[#FFBD2E]/10 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-[#FFBD2E] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <HelpCircle className="w-4 h-4" /> Technical Challenge
                    </h4>
                    <p className="text-xs text-[#FFBD2E]/90">{selectedExperiment.challenges}</p>
                  </div>

                  {/* Lessons Learned Section */}
                  <div className="bg-[#27C93F]/5 border border-[#27C93F]/10 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-[#27C93F] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <BookOpen className="w-4 h-4" /> Resolution & Lesson
                    </h4>
                    <p className="text-xs text-[#27C93F]/90">{selectedExperiment.lessons}</p>
                  </div>

                  {/* Full Tech Stack */}
                  <div>
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-2.5">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExperiment.tech.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] bg-[#0D1017] border border-glass-border px-2.5 py-1 rounded text-text font-medium font-mono"
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
