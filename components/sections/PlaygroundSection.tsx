"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareCode, RefreshCcw } from "lucide-react";
import { motion, Variants } from "framer-motion";
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
  "The best error message is the one that never shows up."
];

export default function PlaygroundSection() {
  const [quote, setQuote] = useState("");

  const rotateQuote = () => {
    const remaining = QUOTES.filter((q) => q !== quote);
    const rand = remaining[Math.floor(Math.random() * remaining.length)];
    setQuote(rand || QUOTES[0]);
  };

  useEffect(() => {
    rotateQuote();
  }, []);

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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 22, damping: 20 },
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

      <div className="max-w-5xl mx-auto relative z-10">
        
        <p className="text-sm text-muted mb-10 max-w-lg leading-relaxed">
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
          {/* Terminal (7 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col justify-stretch">
            <Terminal />
          </motion.div>

          {/* Quiz (5 cols) */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-stretch">
            <Quiz />
          </motion.div>
        </motion.div>

        {/* Grid Row 2: RPS Game & XO Game side by side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch mb-6"
        >
          {/* RPS Game */}
          <motion.div variants={itemVariants} className="flex flex-col justify-stretch">
            <RPSGame />
          </motion.div>

          {/* XO Game */}
          <motion.div variants={itemVariants} className="flex flex-col justify-stretch">
            <XOGame />
          </motion.div>
        </motion.div>

        {/* Grid Row 3: Quotes Banner (full width) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="w-full"
        >
          <motion.div variants={itemVariants} className="w-full">
            <SpotlightCard className="p-5 rounded-xl bg-[#0D1017]/50 relative flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="absolute top-3 right-3 text-muted/10 pointer-events-none select-none">
              <MessageSquareCode className="w-12 h-12" />
            </div>
            <div className="z-10 select-none flex-1">
              <span className="text-[9px] uppercase font-bold text-accent tracking-wider">Dev Thought</span>
              <p className="text-xs text-text italic leading-relaxed mt-1 select-text">
                "{quote}"
              </p>
            </div>
            <button
              onClick={rotateQuote}
              className="whitespace-nowrap text-[10px] text-muted hover:text-text flex items-center gap-1.5 hover:bg-white/5 border border-glass-border/40 px-2.5 py-1 rounded transition-colors active:scale-95 z-10 cursor-pointer"
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
