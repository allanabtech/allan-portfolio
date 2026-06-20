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
    title: "AI / ML Experiments",
    description: "Training image classifiers locally on my GPU, tuning learning rates, and experimenting with different architectures. Currently working through object detection with YOLOv8 and poking at custom loss functions for imbalanced datasets.",
    status: "Active",
    metric: "Loss: 0.038",
    icon: <Cpu className="w-5 h-5 text-accent" />,
    tech: ["Python", "PyTorch", "YOLOv8", "OpenCV", "NumPy", "Matplotlib"],
    challenges: "Training on my own dataset with very few samples for certain classes — the model would completely ignore the minority class and still report 94% accuracy because the majority class dominated everything.",
    lessons: "Switched to focal loss and added class weights based on sample frequency. Also started augmenting the minority class with flips, crops, and brightness shifts. Got the minority class recall from ~12% to ~68% after that.",
    metrics: {
      parameter: "YOLOv8-nano",
      rate: "Loss: 0.038",
      device: "RTX local GPU"
    }
  },
  {
    id: 2,
    title: "AWS & Cloud Setup",
    description: "Setting up and breaking AWS infrastructure for practice — EC2 instances, S3 buckets, Lambda functions, IAM roles. Mostly used for backend APIs and storage for my projects. Also experimenting with Terraform to stop clicking around the console manually.",
    status: "Active",
    metric: "EC2: t3.micro",
    icon: <GitBranch className="w-5 h-5 text-[#27C93F]" />,
    tech: ["AWS EC2", "S3", "Lambda", "IAM", "API Gateway", "Terraform"],
    challenges: "IAM permissions were a constant headache — too permissive felt wrong, too restrictive broke everything silently. Lambda would just return a 403 with no useful error message, which made debugging feel like guessing.",
    lessons: "Started testing IAM policies with the AWS Policy Simulator before deploying. Also learned to always check CloudWatch logs first — 90% of the time the actual error is buried in there, not in the API response.",
    metrics: {
      parameter: "Free Tier + t3",
      rate: "~$4/mo avg cost",
      device: "ap-south-1 region"
    }
  },
  {
    id: 3,
    title: "Linux Daily Driver",
    description: "Running Ubuntu as my primary OS for development. Mostly bash scripting, setting up dev environments, SSH key management, and occasionally going too deep into sysctl settings trying to squeeze performance out of my machine.",
    status: "Active",
    metric: "Ubuntu 24.04 LTS",
    icon: <Terminal className="w-5 h-5 text-[#FFBD2E]" />,
    tech: ["Ubuntu 24.04", "Bash", "SSH", "tmux", "ufw", "sysctl"],
    challenges: "Set net.core.rmem_max too aggressively once while trying to improve socket throughput for a local server test — ended up with unstable TCP connections that dropped randomly. Took a while to realise the kernel was rejecting the allocation.",
    lessons: "Now always test sysctl changes in a VM first and read the kernel docs for valid ranges before applying. Also keeps a backup of working sysctl.conf before touching anything.",
    metrics: {
      parameter: "Ubuntu 24.04 LTS",
      rate: "Uptime: weeks",
      device: "Ryzen host machine"
    }
  },
  {
    id: 4,
    title: "Hardware Bench Work",
    description: "Soldering sensors onto custom breakout boards, wiring relay modules for GPIO control, and using a logic analyzer to debug signal timing issues. Also where most of the robot builds happen before they make it into a proper project.",
    status: "Archived",
    metric: "3.3V / 5V logic",
    icon: <Settings className="w-5 h-5 text-[#FF5F56]" />,
    tech: ["Soldering Iron", "Arduino", "GPIO Relays", "Logic Analyzer", "Multimeter", "Breadboard"],
    challenges: "Mechanical switch bounce was causing the microcontroller to read a single button press as 4–6 rapid triggers. The ISR would fire multiple times before the signal settled, causing the code to behave completely unexpectedly.",
    lessons: "Wired a 100nF capacitor across the switch pins as a hardware filter and added a 20ms software debounce timer in the ISR. Both together eliminated false triggers completely — either one alone wasn't enough.",
    metrics: {
      parameter: "3.3V / 5V rails",
      rate: "4-ch relay module",
      device: "Logic analyzer + scope"
    }
  },
  {
    id: 5,
    title: "Automation & Shell Scripts",
    description: "Writing bash scripts to automate stuff I got tired of doing manually — deploying Docker containers, rotating logs, running tests, syncing files to S3. Most of these run via cron and I only notice them when something breaks at 2am.",
    status: "Active",
    metric: "Cron: 02:00 daily",
    icon: <ShieldAlert className="w-5 h-5 text-[#9fcbff]" />,
    tech: ["Bash", "Cron", "Docker CLI", "rsync", "logrotate", "jq"],
    challenges: "A backup script I wrote was doing a full pg_dump while the database had active connections. It wasn't locking the DB but the I/O spike was bad enough to cause visible latency on the running app for about 30 seconds every night.",
    lessons: "Moved the backup to 2am when traffic is near zero, added ionice -c3 to the dump command to drop its I/O priority, and piped output straight into gzip rather than dumping then compressing. Backup time went from 48s to 19s and the latency spike disappeared.",
    metrics: {
      parameter: "Cron: daily 02:00",
      rate: "~19s avg runtime",
      device: "Local + S3 backup"
    }
  },
  {
    id: 6,
    title: "Networking & Packet Analysis",
    description: "Using Wireshark to see what's actually happening on the network, setting up basic firewall rules with ufw and iptables, and tracing where latency comes from. Mostly done out of curiosity but useful when debugging connectivity issues in projects.",
    status: "Staging",
    metric: "LAN ping: ~1ms",
    icon: <Network className="w-5 h-5 text-[#8B949E]" />,
    tech: ["Wireshark", "ufw", "iptables", "nmap", "traceroute", "netstat"],
    challenges: "Was getting intermittent 200–400ms latency spikes to a local server that I couldn't reproduce on demand. Standard ping showed everything normal. Took ages to figure out it was ARP cache expiring and causing re-resolution delays every few minutes.",
    lessons: "Captured a timed Wireshark session during the spike window and spotted the ARP requests immediately. Extended the ARP cache timeout via sysctl and the spikes stopped. Wireshark makes invisible problems visible — should have used it from the start.",
    metrics: {
      parameter: "LAN: ~1ms avg",
      rate: "WAN: 45ms avg",
      device: "Wireshark + ufw"
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
          Personal experiments, side setups, and things I built or broke while learning. Click any card for the full breakdown.
        </p>

        {/* Diagnostics Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 mb-8 bg-[#0D1017]/30 border border-glass-border/30 rounded-xl font-mono text-[10px] text-muted relative overflow-hidden select-none">
          <div className="flex flex-col gap-1">
            <span>HOST: INTEL-WS</span>
            <span className="font-bold text-accent">CPU: i9-10900K</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>GPU: Quadro RTX 5000</span>
            <span className="font-bold text-accent">VRAM: 16 GB GDDR6</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>OS: Win 11 Pro</span>
            <span className="font-bold text-[#27C93F]">/ Bazzite Linux</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>ACTIVE LABS: 4 / 6</span>
            <span className="font-bold text-[#FFBD2E]">ARCHIVED: 1</span>
          </div>
          <div className="flex flex-col gap-1">
            <span>CLOUD: AWS free tier</span>
            <span className="font-bold text-[#FF5F56]">REGION: ap-south-1</span>
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
