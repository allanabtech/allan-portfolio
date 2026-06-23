"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareCode, RefreshCcw, Zap } from "lucide-react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import Terminal from "../Terminal";
import RPSGame from "../RPSGame";
import XOGame from "../XOGame";
import Quiz from "../Quiz";
import SpotlightCard from "../SpotlightCard";

const QUOTES = [
  "There is nothing more permanent than a temporary solution.",
  "The cloud is just someone else's computer.",
  "It worked yesterday. I have witnesses.",
  "Debugging is like being the detective and the criminal at the same time.",
  "Software is the only product we sell where the client is excited when we fix our own mistakes.",
  "To err is human, but to really foul things up you need a computer.",
  "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?'",
  "There are 10 types of people in the world: those who understand binary, and those who don't.",
  "If at first you don't succeed, call it version 1.0.",
  "Programming is 10% writing code and 90% understanding why it doesn't work.",
  "Before software can be reusable it first has to be usable.",
  "Computers are good at following instructions, but not at reading your mind.",
  "Deleted code is debugged code.",
  "Walk softly and carry a big private key.",
  "One man's constant is another man's variable.",
  "There are two ways to write error-free programs; only the third one works.",
  "The best thing about a boolean is even if you are wrong, you are only off by a bit.",
  "Real programmers count from 0.",
  "Copy-paste is a design pattern if you do it with confidence.",
  "In a room full of top software engineers, the person with the most git commits is usually the quietest.",
  "Documentation is like insurance: everyone agrees it's important, but nobody wants to pay for it.",
  "A compiler is a device that turns coffee into syntax errors.",
  "A good programmer is someone who always looks both ways before crossing a one-way street.",
  "Weeks of coding can save you hours of planning.",
  "Testing leads to failure, and failure leads to understanding.",
  "The sooner you start to code, the longer the program will take.",
  "Hardware eventually breaks. Software eventually works.",
  "Fixing bugs is like eating sunflower seeds: you think you're done, but there's always one more shell.",
  "In theory, there is no difference between theory and practice. In practice, there is.",
  "Measuring programming progress by lines of code is like measuring aircraft building progress by weight.",
  "A clear line of communication is worth 10,000 lines of code.",
  "If java had true garbage collection, most programs would delete themselves upon execution.",
  "Computers are fast, but they are incredibly stupid. Humans are slow, but they are brilliant.",
  "Make it work, make it right, make it fast.",
  "You can't have a great software system without great people, but you can definitely have a bad one with them.",
  "Always code as if the guy who ends up maintaining your code will be a violent psychopath who knows where you live.",
  "Adding manpower to a late software project makes it later.",
  "Simplicity is the soul of efficiency.",
  "There are only two hard things in Computer Science: cache invalidation and naming things.",
  "No code is faster than no code.",
  "The most disastrous thing that you can ever learn is your first programming language.",
  "Optimism is an occupational hazard of programming: feedback is the treatment.",
  "A program that is 99% complete still has 90% of the work remaining.",
  "Most software today is very much like an Egyptian pyramid with millions of stones piled on top of each other, with no structural integrity.",
  "Software undergoes beta testing shortly before it's released. If it survives, it's called a release candidate.",
  "Don't comment bad code—rewrite it.",
  "Every great developer you know got there by solving problems they were unqualified to solve.",
  "First, solve the problem. Then, write the code.",
  "Complexity is easy; simplicity is hard.",
  "Java is to JavaScript what car is to Carpet.",
  "It's not a bug – it's an undocumented feature.",
  "The best error message is the one that never shows up.",
];

export default function PlaygroundSection() {
  const [quote, setQuote] = useState("");
  const [quoteKey, setQuoteKey] = useState(0);

  const rotateQuote = () => {
    const remaining = QUOTES.filter((q) => q !== quote);
    const rand = remaining[Math.floor(Math.random() * remaining.length)];
    setQuote(rand || QUOTES[0]);
    setQuoteKey((k) => k + 1);
  };

  useEffect(() => { rotateQuote(); }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 22, damping: 20 } },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">

      {/* ── Background: animated PCB traces ── */}
      <div className="absolute inset-0 -z-10 opacity-[0.05] overflow-hidden pointer-events-none select-none">
        <svg className="w-full h-full text-accent" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 100 100 L 300 100 L 350 150 L 600 150" stroke="currentColor" strokeWidth="1.5" strokeDasharray="200" style={{ animation: "circuit-flow 7s linear infinite" }} />
          <path d="M 1100 200 L 900 200 L 850 250 L 650 250" stroke="currentColor" strokeWidth="1.5" strokeDasharray="200" style={{ animation: "circuit-flow 9s linear infinite", animationDelay: "3s" }} />
          <path d="M 200 500 L 450 500 L 500 550 L 800 550" stroke="currentColor" strokeWidth="1.5" strokeDasharray="200" style={{ animation: "circuit-flow 8s linear infinite", animationDelay: "1s" }} />
          <circle cx="350" cy="150" r="5" fill="currentColor" style={{ animation: "skill-dot-blink 2s ease-in-out infinite" }} />
          <circle cx="850" cy="250" r="5" fill="currentColor" style={{ animation: "skill-dot-blink 2s ease-in-out infinite", animationDelay: "1.5s" }} />
          <circle cx="500" cy="550" r="5" fill="currentColor" style={{ animation: "skill-dot-blink 2s ease-in-out infinite", animationDelay: "3s" }} />
        </svg>
      </div>

      {/* ── Scanline effect ── */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute w-full h-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(to right, transparent, rgba(0,240,255,0.06) 30%, rgba(0,240,255,0.1) 50%, rgba(0,240,255,0.06) 70%, transparent)",
            animation: "scanline 10s linear infinite",
          }}
        />
      </div>

      {/* ── Ambient aurora ── */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[120px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", animation: "aurora-drift 20s ease-in-out infinite" }} />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ background: "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)", animation: "aurora-drift 25s ease-in-out infinite reverse" }} />

      <div className="max-w-5xl mx-auto relative z-10">

        <p className="text-sm text-muted mb-10 max-w-lg leading-relaxed flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 text-accent flex-shrink-0" style={{ animation: "hero-glow-breathe 2s ease-in-out infinite" }} />
          Interactive sandboxes. Try typing commands in the dev terminal, testing your AI discernment, or challenging the system core in hand duels and grids.
        </p>

        {/* Grid Row 1: Terminal & Quiz */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6"
        >
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-stretch">
            <Terminal />
          </motion.div>
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-stretch">
            <Quiz />
          </motion.div>
        </motion.div>

        {/* Grid Row 2: RPS & XO */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-6"
        >
          <motion.div variants={itemVariants} className="flex flex-col justify-stretch">
            <RPSGame />
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-col justify-stretch">
            <XOGame />
          </motion.div>
        </motion.div>

        {/* Grid Row 3: Dev Thought banner */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="w-full"
        >
          <motion.div variants={itemVariants} className="w-full">
            <SpotlightCard
              className="p-5 rounded-xl bg-[#0D1017]/50 relative flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden"
              style={{
                animation: "card-breathe 6s ease-in-out infinite",
                ["--card-glow" as string]: "rgba(0,240,255,0.12)",
              }}
            >
              {/* Shimmer sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                <div
                  className="absolute top-0 left-0 w-1/4 h-full"
                  style={{
                    background: "linear-gradient(to right, transparent, rgba(0,240,255,0.06), transparent)",
                    animation: "shimmer-sweep 8s ease-in-out infinite",
                  }}
                />
              </div>

              {/* Big decorative quote icon — pulsing */}
              <div
                className="absolute top-3 right-3 text-accent/8 pointer-events-none select-none"
                style={{ animation: "hero-glow-breathe 5s ease-in-out infinite" }}
              >
                <MessageSquareCode className="w-14 h-14" />
              </div>

              <div className="z-10 select-none flex-1">
                <span className="text-[9px] uppercase font-bold text-accent tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  Dev Thought
                </span>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={quoteKey}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3 }}
                    className="text-xs text-text italic leading-relaxed mt-1 select-text"
                  >
                    "{quote}"
                  </motion.p>
                </AnimatePresence>
              </div>

              <button
                onClick={rotateQuote}
                className="whitespace-nowrap text-[10px] text-muted hover:text-text flex items-center gap-1.5 hover:bg-white/5 border border-glass-border/40 px-2.5 py-1 rounded transition-colors active:scale-95 z-10 cursor-pointer hover:border-accent/30"
              >
                <RefreshCcw className="w-3 h-3" /> Refresh Quote
              </button>
            </SpotlightCard>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
