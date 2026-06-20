"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import LinkScrollManager from "@/components/LinkScrollManager";
import SectionWrapper from "@/components/SectionWrapper";
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
          <LinkScrollManager />
          <Navbar />
          
          <main className="flex-1 w-full relative">
            <SectionWrapper id="hero" showDivider={true}>
              <HeroSection />
            </SectionWrapper>

            <SectionWrapper id="about" title="01. About Me" showDivider={true}>
              <AboutSection />
            </SectionWrapper>

            <SectionWrapper id="skills" title="02. Skills & Expertise" showDivider={true}>
              <SkillsSection />
            </SectionWrapper>

            <SectionWrapper id="projects" title="03. Featured Projects" showDivider={true}>
              <ProjectsSection />
            </SectionWrapper>

            <SectionWrapper id="lab" title="04. Engineering Lab" showDivider={true}>
              <LabSection />
            </SectionWrapper>

            <SectionWrapper id="failures" title="05. Post-Mortem Failure Log" showDivider={true}>
              <FailureLogSection />
            </SectionWrapper>

            <SectionWrapper id="timeline" title="08. Journey So Far" showDivider={true}>
              <TimelineSection />
            </SectionWrapper>

            <SectionWrapper id="mission" title="06. A Day in the Life" showDivider={true}>
              <MissionSection />
            </SectionWrapper>

            <SectionWrapper id="certs" title="07. Certifications & Badges" showDivider={true}>
              <CertificationsSection />
            </SectionWrapper>

            <SectionWrapper id="playground" title="09. Engineering Playground" showDivider={true}>
              <PlaygroundSection />
            </SectionWrapper>

            <SectionWrapper id="contact" title="10. Establish Connection">
              <ContactSection />
            </SectionWrapper>
          </main>

          <footer className="py-8 text-center text-[10px] text-muted border-t border-glass-border/30 font-mono bg-[#0D1017]/80">
            © {new Date().getFullYear()} Allan Abraham. Compiled with hope, fueled by energy drinks, and engineered with Next.js, Tailwind v4 & Framer Motion.
          </footer>
        </div>
      )}
    </>
  );
}
