"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Trophy } from "lucide-react";
import { useAchievements, Toast } from "./AchievementContext";

function ToastItem({ toast }: { toast: Toast }) {
  const { dismissToast } = useAchievements();

  useEffect(() => {
    const timer = setTimeout(() => {
      dismissToast(toast.id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast.id, dismissToast]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
      className="glass-panel w-80 p-4 rounded-xl flex items-start gap-3 shadow-2xl relative border-accent/20 accent-glow overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent/5 before:to-transparent"
    >
      <div className="text-3xl select-none">{toast.achievement.icon}</div>
      <div className="flex-1 min-w-0">
        <span className="text-[10px] uppercase font-bold tracking-wider text-accent flex items-center gap-1 mb-0.5">
          <Trophy className="w-3 h-3" /> Achievement Unlocked
        </span>
        <h4 className="text-sm font-semibold text-text truncate">{toast.achievement.title}</h4>
        <p className="text-xs text-muted mt-1 leading-relaxed">{toast.achievement.description}</p>
      </div>
      <button
        onClick={() => dismissToast(toast.id)}
        className="text-muted hover:text-text transition-colors p-1 rounded-md hover:bg-white/5"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function AchievementToast() {
  const { toasts } = useAchievements();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
