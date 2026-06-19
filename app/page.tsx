"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SectionWrapper from "@/components/SectionWrapper";
import SectionDivider from "@/components/SectionDivider";
import LoadingScreen from "@/components/LoadingScreen";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import LabSection from "@/components/sections/LabSection";
import FailureLogSection from "@/components/sections/FailureLogSection";
import TimelineSection from "@/components/sections/TimelineSection";
import MissionSection from "@/components/sections/MissionSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  // Quick initial client-side check to see if loading sequence can be bypassed
  useEffect(() => {
    const hasVisited = localStorage.getItem("allan_portfolio_visited");
    if (hasVisited) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-1 w-full relative">
            <SectionWrapper id="hero">
              <HeroSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="about">
              <AboutSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="skills">
              <SkillsSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="projects">
              <ProjectsSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="lab">
              <LabSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="failures">
              <FailureLogSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="timeline">
              <TimelineSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="mission">
              <MissionSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="certs">
              <CertificationsSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="playground">
              <PlaygroundSection />
            </SectionWrapper>

            <SectionDivider />

            <SectionWrapper id="contact">
              <ContactSection />
            </SectionWrapper>
          </main>

          <footer className="py-8 text-center text-[10px] text-muted border-t border-glass-border/30 font-mono bg-[#0D1117]/80">
            © {new Date().getFullYear()} Allan Abraham. Engineered with Next.js, Tailwind v4 & Framer Motion.
          </footer>
        </div>
      )}
    </>
  );
}
