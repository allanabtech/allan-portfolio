"use client";

import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const NAV_LINKS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Lab", href: "#lab", id: "lab" },
  { label: "Playground", href: "#playground", id: "playground" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionsLayout = useRef<{ id: string; top: number; bottom: number }[]>([]);

  const calculateSectionLayouts = () => {
    const sections = ["hero", "about", "skills", "projects", "lab", "playground", "contact"];
    const layouts = [];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        layouts.push({
          id,
          top,
          bottom: top + height
        });
      }
    }
    sectionsLayout.current = layouts;
  };

  useEffect(() => {
    calculateSectionLayouts();

    const handleResize = () => {
      calculateSectionLayouts();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  }, []);

  useEffect(() => {
    calculateSectionLayouts();

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Navbar transparent vs glassmorphic transition
      if (scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // 2. Reading scroll progress bar percentage calculation
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((scrollY / totalHeight) * 100);
      }

      // 3. Spying active section using cached layouts
      const scrollPos = scrollY + 160;
      for (const layout of sectionsLayout.current) {
        if (scrollPos >= layout.top && scrollPos < layout.bottom) {
          setActiveSection(layout.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-accent z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0D1017]/80 backdrop-blur-md border-b border-glass-border/40 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#"
            className="font-mono text-base font-extrabold tracking-tight text-text hover:text-accent transition-colors flex items-center gap-1"
          >
            <span className="text-accent">&lt;</span>
            <span>Allan.dev</span>
            <span className="text-accent">/&gt;</span>
          </a>

          {/* Desktop Navigation links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={idx}
                  href={link.href}
                  className={`text-xs font-semibold uppercase tracking-wider transition-all relative py-1 ${
                    isActive ? "text-accent" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute bottom-0 inset-x-0 h-[1.5px] bg-accent rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile menu toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-text hover:text-accent transition-colors p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

        {/* Mobile Drawer Overlay */}
        {isOpen && (
          <div className="md:hidden absolute top-full inset-x-0 bg-[#0D1017]/95 backdrop-blur-lg border-b border-glass-border p-6 flex flex-col gap-5 z-40">
            {NAV_LINKS.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={idx}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-xs font-bold uppercase tracking-widest py-2 transition-all ${
                    isActive ? "text-accent" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}
