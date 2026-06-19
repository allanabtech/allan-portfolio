"use client";

import React from "react";
import { Cpu, Terminal, ShieldAlert, GitBranch, Settings, Network } from "lucide-react";
import { motion, Variants } from "framer-motion";

interface LabExperiment {
  title: string;
  description: string;
  status: "Active" | "Archived" | "Staging";
  metric: string;
  icon: React.ReactNode;
}

const EXPERIMENTS: LabExperiment[] = [
  {
    title: "AI Experiments",
    description: "Training neural network classifiers locally, testing gradient descent optimization rates, and writing object segmentation layers.",
    status: "Active",
    metric: "Loss: 0.042",
    icon: <Cpu className="w-5 h-5 text-accent" />,
  },
  {
    title: "Cloud Infrastructure Labs",
    description: "Configuring IaC templates, serverless API orchestration matrices, IAM policies, and VPC virtual networking topologies.",
    status: "Staging",
    metric: "Uptime: 99.98%",
    icon: <GitBranch className="w-5 h-5 text-[#27C93F]" />,
  },
  {
    title: "Linux Exploration",
    description: "Customizing kernel modules, testing socket performance constraints, and setting up secure shell sandbox environments.",
    status: "Active",
    metric: "OS: Ubuntu-LTS",
    icon: <Terminal className="w-5 h-5 text-[#FFBD2E]" />,
  },
  {
    title: "Hardware Modifications",
    description: "Solder-modding microcontrollers, wiring analog I/O relays, calibrating sensor logic boards, and testing digital hardware signals.",
    status: "Archived",
    metric: "Voltage: 5.0V",
    icon: <Settings className="w-5 h-5 text-[#FF5F56]" />,
  },
  {
    title: "Automation Scripts",
    description: "Creating custom shell scripts to auto-backup server nodes, bundle builds, test logs, and optimize deployment flows.",
    status: "Active",
    metric: "Runs: Daily",
    icon: <ShieldAlert className="w-5 h-5 text-[#9fcbff]" />,
  },
  {
    title: "Network Testing",
    description: "Sniffing packet routes, analyzing latency jitter across subnets, setting up firewalls, and auditing DNS record handshakes.",
    status: "Staging",
    metric: "Ping: 4ms",
    icon: <Network className="w-5 h-5 text-[#8B949E]" />,
  },
];

export default function LabSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
        stiffness: 100,
        damping: 15,
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

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text">04. Engineering Lab</h2>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>
        <p className="text-sm text-muted mb-6 max-w-lg leading-relaxed">
          My personal R&D department. This is a logging archive of experiments, technical sandbox explorations, and hardware modifications.
        </p>

        {/* Diagnostics Dashboard Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 mb-8 bg-[#161B22]/30 border border-glass-border/30 rounded-xl font-mono text-[10px] text-muted relative overflow-hidden select-none">
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
          {EXPERIMENTS.map((exp, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              className="glass-panel glass-panel-hover p-5 rounded-xl border-glass-border flex flex-col justify-between h-56"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
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
                <h3 className="text-sm font-bold text-text mb-1.5">{exp.title}</h3>
                <p className="text-[11px] text-muted leading-relaxed line-clamp-3">
                  {exp.description}
                </p>
              </div>

              {/* Footer Metric */}
              <div className="mt-4 pt-3 border-t border-glass-border/40 flex items-center justify-between text-[10px] font-mono text-muted">
                <span>METRIC:</span>
                <span className="text-text font-bold uppercase">{exp.metric}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  );
}
