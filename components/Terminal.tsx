"use client";

import React, { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import { useAchievements } from "./AchievementContext";
import SpotlightCard from "./SpotlightCard";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "warning";
}

const JOKES = [
  "There is nothing more permanent than a temporary solution.",
  "The cloud is just someone else's computer.",
  "It worked yesterday. I have witnesses.",
  "Debugging is like being the detective and the criminal at the same time.",
  "Why do programmers wear glasses? Because they can't C#.",
  "Hardware is the part of a computer that you can kick; software is the part you can only curse at.",
  "There are 10 types of people in the world: those who understand binary, and those who don't."
];

export default function Terminal() {
  const { triggerTerminalHack, triggerFutureCommandRun } = useAchievements();
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Welcome to Allan's R&D Terminal. Type 'help' to see available commands.", type: "warning" },
  ]);
  const [input, setInput] = useState("");
  const [isSudoLoading, setIsSudoLoading] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isSudoLoading]);

  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  const handleCommand = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    // Add command to history
    const newHistory = [...history, { text: `visitor@allan-dev:~$ ${trimmed}`, type: "input" as const }];
    setHistory(newHistory);
    setInput("");

    // Trigger achievement trigger
    triggerTerminalHack();

    const normalizedCmd = trimmed.toLowerCase();

    if (normalizedCmd === "help") {
      setHistory((prev) => [
        ...prev,
        {
          text: "Available commands: help, about, skills, projects, contact, certifications, mission, joke, sudo hire-allan",
          type: "output",
        },
      ]);
    } else if (normalizedCmd === "about") {
      setHistory((prev) => [
        ...prev,
        {
          text: "Allan Abraham is an engineer who enjoys understanding how things work and automating them. Specialties in AI, Cloud Computing, DevOps, and Robotics.",
          type: "output",
        },
      ]);
    } else if (normalizedCmd === "skills") {
      setHistory((prev) => [
        ...prev,
        {
          text: "AI/ML: Machine Learning, Deep Learning, Data Analysis\nCloud: AWS Solutions Architecture, Infrastructure as Code\nDevOps: Docker, CI/CD pipelines, Linux Shell\nProgramming: Python, Java, JavaScript, Bash",
          type: "output",
        },
      ]);
    } else if (normalizedCmd === "projects") {
      setHistory((prev) => [
        ...prev,
        {
          text: "1. AI-Powered Navigation Bot (Arduino, Autonomous Navigation)\n2. Robotics & Embedded Systems\n3. AI & Cloud Computing Projects\n4. Daily Operations & Interactive Milestones (Status: Active)",
          type: "output",
        },
      ]);
    } else if (normalizedCmd === "contact") {
      setHistory((prev) => [
        ...prev,
        {
          text: "Email: allanabraham271299@gmail.com\nGitHub: github.com/allanabtech\nLinkedIn: linkedin.com/in/abrahamallan",
          type: "output",
        },
      ]);
    } else if (normalizedCmd === "certifications") {
      setHistory((prev) => [
        ...prev,
        {
          text: "- AI ML with Deep Learning\n- UI Design for Web Developers\n- Microsoft Power BI Data Analyst",
          type: "output",
        },
      ]);
    } else if (normalizedCmd === "mission") {
      setHistory((prev) => [
        ...prev,
        {
          text: "Current Mission: Daily Operations Command Center\nProgress: 100% Active\nObjective: Explore new concepts in the morning, deploy cloud and coding projects in the afternoon, and discover open-source or watch anime at night.",
          type: "output",
        },
      ]);
    } else if (normalizedCmd === "joke") {
      const randomJoke = JOKES[Math.floor(Math.random() * JOKES.length)];
      setHistory((prev) => [...prev, { text: randomJoke, type: "output" }]);
    } else if (normalizedCmd === "sudo hire-allan") {
      setIsSudoLoading(true);
      
      // Simulate terminal loader
      setHistory((prev) => [
        ...prev,
        { text: "Permission granted.", type: "success" },
        { text: "Initializing future engineer...", type: "output" },
      ]);

      // Progress bar loading animation simulation
      for (let i = 1; i <= 4; i++) {
        await new Promise((resolve) => setTimeout(resolve, 400));
        const pct = i * 25;
        const barLength = Math.floor(pct / 10);
        const bar = "█".repeat(barLength) + "░".repeat(10 - barLength);
        setHistory((prev) => [
          ...prev,
          { text: `Loading... [${bar}] ${pct}%`, type: "output" },
        ]);
      }
      
      await new Promise((resolve) => setTimeout(resolve, 300));
      setHistory((prev) => [
        ...prev,
        { text: "Welcome aboard. Recruit status locked.", type: "success" },
      ]);
      setIsSudoLoading(false);
    } else if (normalizedCmd === "portfolio --future") {
      triggerFutureCommandRun();
      setHistory((prev) => [
        ...prev,
        {
          text: "Predicting future...\n\nCloud Engineer\nDevOps Engineer\nSolutions Architect\n\nProbability increasing...\n\nKeep learning.",
          type: "success",
        },
      ]);
    } else if (normalizedCmd === "clear") {
      setHistory([]);
    } else {
      setHistory((prev) => [
        ...prev,
        { text: `Command not found: '${trimmed}'. Type 'help' for a list of commands.`, type: "error" },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  return (
    <SpotlightCard
      onClick={focusInput}
      className="w-full max-w-2xl rounded-xl overflow-hidden font-mono text-sm border-accent/20 flex flex-col h-full min-h-[350px] cursor-text shadow-2xl"
    >
      {/* Terminal Title Bar */}
      <div className="bg-[#0D1017] border-b border-glass-border/40 px-4 py-2.5 flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>allan-dev-terminal</span>
        </div>
        <div className="w-14" /> {/* Spacer */}
      </div>

      {/* Terminal Lines Area */}
      <div
        ref={containerRef}
        className="flex-1 p-4 overflow-y-auto space-y-2.5 bg-[#0D1017]/95"
      >
        {history.map((line, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              line.type === "input"
                ? "text-text font-semibold"
                : line.type === "error"
                ? "text-red-400"
                : line.type === "success"
                ? "text-green-400"
                : line.type === "warning"
                ? "text-accent"
                : "text-muted"
            }`}
          >
            {line.text}
          </div>
        ))}

        {isSudoLoading && (
          <div className="text-accent animate-pulse">Running process...</div>
        )}

        {/* Input Line */}
        {!isSudoLoading && (
          <div className="flex items-center gap-1 text-text">
            <span className="text-accent font-semibold select-none">visitor@allan-dev:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none caret-accent text-text select-text"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        )}
      </div>
    </SpotlightCard>
  );
}
