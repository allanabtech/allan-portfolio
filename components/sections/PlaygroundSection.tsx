"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareCode, Trophy, Lock, CheckCircle2, RefreshCcw } from "lucide-react";
import { motion, Variants } from "framer-motion";
import Terminal from "../Terminal";
import BugSquasher from "../BugSquasher";
import Quiz from "../Quiz";
import { useAchievements } from "../AchievementContext";

const QUOTES = [
  "There is nothing more permanent than a temporary solution.",
  "The cloud is just someone else's computer.",
  "It worked yesterday. I have witnesses.",
  "Debugging is like being the detective and the criminal at the same time.",
  "Software is the only product we sell where the client is excited when we fix our own mistakes.",
  "To err is human, but to really foul things up you need a computer.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'"
];

export default function PlaygroundSection() {
  const { unlocked } = useAchievements();
  const [quote, setQuote] = useState("");

  const rotateQuote = () => {
    const remaining = QUOTES.filter((q) => q !== quote);
    const rand = remaining[Math.floor(Math.random() * remaining.length)];
    setQuote(rand || QUOTES[0]);
  };

  useEffect(() => {
    rotateQuote();
  }, []);

  const badgeList = [
    { id: "explorer", label: "Curious Explorer", desc: "Viewed all sections of the site", icon: "🧭" },
    { id: "debugger", label: "Senior Debugger", desc: "Squash 10 bugs in the sandbox", icon: "🪲" },
    { id: "hacker", label: "Terminal Hacker", desc: "Discovered and used the dev terminal", icon: "💻" },
    { id: "curious", label: "Curious Engineer", desc: "Read the post-mortem failure logs", icon: "📖" },
    { id: "recruit", label: "Future Recruit", desc: "Visited the contact details", icon: "🤝" },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 85, damping: 15 },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Cyberpunk Circuit PCB Traces Background */}
      <div className="absolute inset-0 -z-10 opacity-[0.035] overflow-hidden pointer-events-none select-none">
        <svg className="w-full h-full text-accent" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 100 L 300 100 L 350 150 L 500 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5,5" className="animate-pcb-blink" />
          <path d="M 800 200 L 700 200 L 650 250 L 500 250" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 200 400 L 400 400 L 450 450 L 700 450" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3,3" className="animate-pcb-blink" style={{ animationDelay: "1s" }} />
          <circle cx="100" cy="100" r="4" fill="currentColor" />
          <circle cx="500" cy="150" r="4" fill="currentColor" />
          <circle cx="800" cy="200" r="4" fill="currentColor" />
          <circle cx="200" cy="400" r="4" fill="currentColor" />
          <circle cx="700" cy="450" r="4" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text">09. Engineering Playground</h2>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>
        <p className="text-sm text-muted mb-10 max-w-lg leading-relaxed">
          Interactive sandboxes. Try typing commands in the mock terminal, squashing code bugs, testing your AI discernment skills, or tracking achievements.
        </p>

        {/* Grid Row 1: Terminal & Achievements/Quotes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6"
        >
          {/* Terminal (8 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-stretch">
            <Terminal />
          </motion.div>

          {/* Side Panels: Achievements & Quotes (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Achievements Dashboard */}
            <div className="glass-panel p-5 rounded-xl border-glass-border flex-1">
              <h3 className="text-sm font-bold text-text flex items-center justify-between mb-3.5 border-b border-glass-border/40 pb-2 select-none">
                <span className="flex items-center gap-2">
                  <Trophy className="w-4.5 h-4.5 text-[#FFBD2E]" /> Achievements
                </span>
                {unlocked.includes("curiosity_pays") && (
                  <span className="text-[9px] bg-accent/20 border border-accent/40 text-accent font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
                    🔑 CURIOSITY PAYS
                  </span>
                )}
              </h3>
              <div className="space-y-2.5">
                {badgeList.map((badge) => {
                  const isUnlocked = unlocked.includes(badge.id);
                  return (
                    <div
                      key={badge.id}
                      className={`flex items-center gap-3 p-2.5 rounded-lg border text-xs transition-all ${
                        isUnlocked
                          ? "bg-green-500/5 border-green-500/15"
                          : "bg-white/5 border-glass-border/30 opacity-60"
                      }`}
                    >
                      <div className="text-2xl select-none">{badge.icon}</div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-text truncate">{badge.label}</h4>
                        <p className="text-[10px] text-muted truncate mt-0.5">{badge.desc}</p>
                      </div>
                      <div>
                        {isUnlocked ? (
                          <CheckCircle2 className="w-4 h-4 text-green-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-muted" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Random Quotes Panel */}
            <div className="glass-panel p-5 rounded-xl border-glass-border h-36 bg-[#161B22]/50 relative flex flex-col justify-between">
              <div className="absolute top-3 right-3 text-muted/10 pointer-events-none select-none">
                <MessageSquareCode className="w-12 h-12" />
              </div>
              <div className="z-10 select-none">
                <span className="text-[9px] uppercase font-bold text-accent tracking-wider">Dev Thought</span>
                <p className="text-xs text-text italic leading-relaxed mt-2 select-text max-w-[280px]">
                  “{quote}”
                </p>
              </div>
              <button
                onClick={rotateQuote}
                className="self-end text-[10px] text-muted hover:text-text flex items-center gap-1.5 hover:bg-white/5 border border-glass-border/40 px-2.5 py-1  rounded transition-colors active:scale-95 z-10 cursor-pointer"
              >
                <RefreshCcw className="w-3 h-3" /> Refresh Quote
              </button>
            </div>

          </motion.div>
        </motion.div>

        {/* Grid Row 2: Bug Squasher & AI Quiz */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div variants={itemVariants}>
            <BugSquasher />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Quiz />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
