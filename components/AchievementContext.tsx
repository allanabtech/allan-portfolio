"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import confetti from "canvas-confetti";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Toast {
  id: string;
  achievement: Achievement;
}

interface AchievementContextType {
  unlocked: string[];
  bugsSquashed: number;
  viewedSections: string[];
  toasts: Toast[];
  futureCommandRun: boolean;
  quizCompleted: boolean;
  squashBug: () => void;
  trackSectionView: (sectionId: string) => void;
  triggerTerminalHack: () => void;
  triggerReadFailureLog: () => void;
  triggerViewContact: () => void;
  triggerFutureCommandRun: () => void;
  triggerQuizCompleted: () => void;
  dismissToast: (id: string) => void;
}

const ACHIEVEMENTS: Record<string, Achievement> = {
  explorer: {
    id: "explorer",
    title: "Curious Explorer",
    description: "Explored all sections of the portfolio.",
    icon: "🧭",
  },
  debugger: {
    id: "debugger",
    title: "Senior Debugger",
    description: "Squashed 10 crawling code bugs.",
    icon: "🪲",
  },
  hacker: {
    id: "hacker",
    title: "Terminal Hacker",
    description: "Discovered the command line and executed a command.",
    icon: "💻",
  },
  curious: {
    id: "curious",
    title: "Curious Engineer",
    description: "Read the engineering Failure Log.",
    icon: "📖",
  },
  recruit: {
    id: "recruit",
    title: "Future Recruit",
    description: "Explored the Contact section. Ready to hire?",
    icon: "🤝",
  },
  curiosity_pays: {
    id: "curiosity_pays",
    title: "Curiosity Pays",
    description: "Unlocked all hidden easter eggs on the site! (Hacked, Squashed, Solved, and Predicted)",
    icon: "🔑",
  },
};

const REQUIRED_SECTIONS = [
  "hero",
  "about",
  "skills",
  "projects",
  "lab",
  "failures",
  "mission",
  "certs",
  "timeline",
  "playground",
  "contact",
];

const AchievementContext = createContext<AchievementContextType | undefined>(undefined);

export function AchievementProvider({ children }: { children: React.ReactNode }) {
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const [bugsSquashed, setBugsSquashed] = useState(0);
  const [viewedSections, setViewedSections] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [futureCommandRun, setFutureCommandRun] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const savedUnlocked = localStorage.getItem("allan_portfolio_achievements");
      const savedBugs = localStorage.getItem("allan_portfolio_bugs");
      const savedFutureCmd = localStorage.getItem("allan_portfolio_future_cmd");
      const savedQuizDone = localStorage.getItem("allan_portfolio_quiz_done");

      if (savedUnlocked) setUnlocked(JSON.parse(savedUnlocked));
      if (savedBugs) setBugsSquashed(parseInt(savedBugs, 10) || 0);
      if (savedFutureCmd) setFutureCommandRun(true);
      if (savedQuizDone) setQuizCompleted(true);
    } catch (e) {
      console.error("Failed to load achievements", e);
    }
  }, []);

  const triggerUnlock = (id: string) => {
    if (unlocked.includes(id)) return;

    const newUnlocked = [...unlocked, id];
    setUnlocked(newUnlocked);
    
    try {
      localStorage.setItem("allan_portfolio_achievements", JSON.stringify(newUnlocked));
    } catch (e) {
      console.error(e);
    }

    // Trigger visual toast
    const achievement = ACHIEVEMENTS[id];
    if (achievement) {
      const toastId = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id: toastId, achievement }]);
      
      // Fire confetti!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.8, x: 0.8 },
        colors: ["#58A6FF", "#388bfd", "#E6EDF3"],
      });

      // Play audio synth beep
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.15);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.15);
      } catch (err) {
        // Fallback for browsers that block audio context before user interaction
      }
    }
  };

  // Check and unlock "Curiosity Pays" easter egg achievement
  useEffect(() => {
    const hasHacked = unlocked.includes("hacker");
    const hasSquashed = bugsSquashed > 0;
    const isCuriosityUnlocked = unlocked.includes("curiosity_pays");

    if (hasHacked && hasSquashed && quizCompleted && futureCommandRun && !isCuriosityUnlocked) {
      triggerUnlock("curiosity_pays");
    }
  }, [unlocked, bugsSquashed, quizCompleted, futureCommandRun]);

  const squashBug = () => {
    const nextBugs = bugsSquashed + 1;
    setBugsSquashed(nextBugs);
    try {
      localStorage.setItem("allan_portfolio_bugs", nextBugs.toString());
    } catch (e) {}

    if (nextBugs >= 10 && !unlocked.includes("debugger")) {
      triggerUnlock("debugger");
    }
  };

  const trackSectionView = (sectionId: string) => {
    if (!REQUIRED_SECTIONS.includes(sectionId)) return;
    if (viewedSections.includes(sectionId)) return;

    const nextViewed = [...viewedSections, sectionId];
    setViewedSections(nextViewed);

    // If all required sections are viewed, unlock explorer
    const allViewed = REQUIRED_SECTIONS.every((sec) => nextViewed.includes(sec));
    if (allViewed && !unlocked.includes("explorer")) {
      triggerUnlock("explorer");
    }
  };

  const triggerTerminalHack = () => {
    triggerUnlock("hacker");
  };

  const triggerReadFailureLog = () => {
    triggerUnlock("curious");
  };

  const triggerViewContact = () => {
    triggerUnlock("recruit");
  };

  const triggerFutureCommandRun = () => {
    setFutureCommandRun(true);
    try {
      localStorage.setItem("allan_portfolio_future_cmd", "true");
    } catch (e) {}
  };

  const triggerQuizCompleted = () => {
    setQuizCompleted(true);
    try {
      localStorage.setItem("allan_portfolio_quiz_done", "true");
    } catch (e) {}
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <AchievementContext.Provider
      value={{
        unlocked,
        bugsSquashed,
        viewedSections,
        toasts,
        futureCommandRun,
        quizCompleted,
        squashBug,
        trackSectionView,
        triggerTerminalHack,
        triggerReadFailureLog,
        triggerViewContact,
        triggerFutureCommandRun,
        triggerQuizCompleted,
        dismissToast,
      }}
    >
      {children}
    </AchievementContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementContext);
  if (!context) {
    throw new Error("useAchievements must be used within an AchievementProvider");
  }
  return context;
}
