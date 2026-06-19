"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle, Search, ArrowUpRight, Award, ExternalLink, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";

interface Certificate {
  title: string;
  issuer: string;
  id: string;
  category: "AI & ML" | "Cloud & DevOps" | "Programming" | "Design & Data";
  isProfessional: boolean;
  driveLink: string;
  imageFileName: string;
}

// 11 Professional Certifications
const PROFESSIONAL_CERTS: Certificate[] = [
  {
    title: "Microsoft Power BI Data Analyst",
    issuer: "Microsoft / Coursera",
    id: "CERT-PBI-101",
    category: "Design & Data",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/10ctfNcxdhsFx0HxEt4zN0Ej-dmdC31ta/view?usp=drivesdk",
    imageFileName: "pbi.png",
  },
  {
    title: "AI ML with Deep Learning and Supervised Models",
    issuer: "Simplilearn / Coursera",
    id: "CERT-AIML-102",
    category: "AI & ML",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/10_CXVDtCuXFSB997IxNkROZJpTMs0YJZ/view?usp=drivesdk",
    imageFileName: "aiml.png",
  },
  {
    title: "People & Soft Skills: Essential for Professional Success",
    issuer: "IBM / Coursera",
    id: "CERT-IBM-103",
    category: "Design & Data",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/1xwWTZA0y_hRIzUmv3_2LzN0NnmuT0Tts/view?usp=drivesdk",
    imageFileName: "softskills.png",
  },
  {
    title: "UI Design for Web Developers",
    issuer: "Scrimba / Coursera",
    id: "CERT-UID-104",
    category: "Design & Data",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/10kvCPDCR5fYaYCNphE3rXJ2pl5_ysLtQ/view?usp=drivesdk",
    imageFileName: "uidesign.png",
  },
  {
    title: "Strategic Leadership and Management",
    issuer: "Illinois / Coursera",
    id: "CERT-SLM-105",
    category: "Design & Data",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/10jvNGjbEKZtQbAVibR7LPCKIOHMQeWxI/view?usp=drivesdk",
    imageFileName: "leadership.png",
  },
  {
    title: "Digital Application Fundamentals",
    issuer: "FutureSkills Prime",
    id: "CERT-DAF-106",
    category: "Programming",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/14rl1Cvv-skdAYG8JdEXn5rUSoA-NiCq3/view?usp=drivesdk",
    imageFileName: "digital_app.png",
  },
  {
    title: "Digital 101 Journey",
    issuer: "FutureSkills Prime",
    id: "CERT-D101-107",
    category: "Programming",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/1S_OPU1AQaqxXnyfrkoTaIa5E9IIKDOBg/view?usp=drivesdk",
    imageFileName: "digital_101.png",
  },
  {
    title: "Generative AI Literacy",
    issuer: "FutureSkills Prime",
    id: "CERT-GAIL-108",
    category: "AI & ML",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/14aMufQCfkiyaUQSzcZ-o8gvJQ7qQYFwS/view?usp=drivesdk",
    imageFileName: "genai.png",
  },
  {
    title: "Cloud Computing with AWS",
    issuer: "Internshala Training",
    id: "CERT-AWS-109",
    category: "Cloud & DevOps",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/1USngPcID3JqdL4UA5ByHzHhJdk4-imi8/view?usp=drivesdk",
    imageFileName: "aws_cloud.png",
  },
  {
    title: "Internship & Job Preparation",
    issuer: "Internshala Training",
    id: "CERT-IJP-110",
    category: "Design & Data",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/1ESRxuugzdcO83WpsmDHX44jGILFOrOLT/view?usp=drivesdk",
    imageFileName: "jobprep.png",
  },
  {
    title: "Fake News Detection Using Social Media Data",
    issuer: "TCS iON",
    id: "CERT-TCS-111",
    category: "AI & ML",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/1hcoMqmq0qLo4ct8lPrdKkrllI5WbQAXE/view?usp=drivesdk",
    imageFileName: "tcs_fakenews.png",
  }
];

// 43 Normal Certifications
const NORMAL_CERTS: Certificate[] = [
  // AI & ML (12)
  { title: "Supervised Machine Learning: Regression", issuer: "Coursera / Stanford", id: "ML-REG-01", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Advanced Learning Algorithms", issuer: "Coursera / Stanford", id: "ML-ALA-02", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Unsupervised Learning & Recommenders", issuer: "Coursera / Stanford", id: "ML-UNS-03", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Neural Networks & Deep Learning", issuer: "DeepLearning.AI", id: "DL-NN-04", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Structuring Machine Learning Projects", issuer: "DeepLearning.AI", id: "DL-STR-05", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Convolutional Neural Networks", issuer: "DeepLearning.AI", id: "DL-CNN-06", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Sequence Models", issuer: "DeepLearning.AI", id: "DL-SEQ-07", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Introduction to Computer Vision", issuer: "OpenCV Academy", id: "CV-INT-08", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "PyTorch Basics for Machine Learning", issuer: "Udemy", id: "PYT-BSC-09", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Data Analysis with Python", issuer: "freeCodeCamp", id: "FCC-DAP-10", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Applied Plotting & Data Representation", issuer: "University of Michigan", id: "UM-APD-11", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "AI Foundations for Everyone", issuer: "IBM", id: "IBM-AIF-12", category: "AI & ML", isProfessional: false, driveLink: "#", imageFileName: "" },

  // Cloud & DevOps (10)
  { title: "AWS Cloud Practitioner Essentials", issuer: "AWS Training", id: "AWS-CP-13", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Docker for Absolute Beginners", issuer: "Udemy", id: "DKR-BEG-14", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "CI/CD Pipelines with GitHub Actions", issuer: "Udemy", id: "GH-ACT-15", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Introduction to Terraform", issuer: "HashiCorp", id: "HC-TF-16", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Linux Command Line Fundamentals", issuer: "Udemy", id: "LNX-CMD-17", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Shell Scripting & Bash Automation", issuer: "Udemy", id: "SH-SCR-18", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Kubernetes for Beginners", issuer: "KodeKloud", id: "K8S-BEG-19", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Nginx Web Server Setup & Config", issuer: "Udemy", id: "NGX-CFG-20", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Version Control with Git", issuer: "Atlassian / Coursera", id: "GIT-VCS-21", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Prometheus & Grafana Monitoring Basics", issuer: "Udemy", id: "MON-PROM-22", category: "Cloud & DevOps", isProfessional: false, driveLink: "#", imageFileName: "" },

  // Programming Languages (11)
  { title: "Python Masterclass for Developers", issuer: "Udemy", id: "PY-MAS-23", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Java Programming Masterclass", issuer: "Udemy", id: "JV-MAS-24", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Scientific Computing with Python", issuer: "freeCodeCamp", id: "FCC-SCP-25", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Modern JavaScript (ES6+)", issuer: "Udemy", id: "JS-MOD-26", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "TypeScript Core Concepts", issuer: "Udemy", id: "TS-COR-27", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Responsive Web Design (HTML/CSS)", issuer: "freeCodeCamp", id: "FCC-RWD-28", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "C++ Programming Fundamentals", issuer: "Udemy", id: "CPP-FUN-29", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "SQL & Relational Databases Boot Camp", issuer: "freeCodeCamp", id: "FCC-SQL-30", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Bash Scripting for System Admins", issuer: "Udemy", id: "BSH-ADM-31", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Algorithms and Data Structures Course", issuer: "freeCodeCamp", id: "FCC-ADS-32", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Introduction to Programming in C", issuer: "Udemy", id: "C-PROG-33", category: "Programming", isProfessional: false, driveLink: "#", imageFileName: "" },

  // Design & Data (10)
  { title: "Introduction to Power BI", issuer: "Microsoft Training", id: "PBI-INT-34", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "UI/UX Design Fundamentals", issuer: "Udemy", id: "UIX-FUN-35", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Figma Masterclass for Web Designers", issuer: "Udemy", id: "FIG-MAS-36", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Data Visualization with Power BI", issuer: "Udemy", id: "PBI-VIS-37", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Advanced DAX Formulas in Power BI", issuer: "Udemy", id: "DAX-ADV-38", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Product Design Principles", issuer: "Coursera", id: "PRD-DSN-39", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Google Analytics Certification", issuer: "Google Academy", id: "GG-ANL-40", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Typography and Color Theory Basics", issuer: "Coursera", id: "DSN-TYP-41", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Excel for Data Analysts Masterclass", issuer: "Udemy", id: "EXL-ANL-42", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" },
  { title: "Design Systems & Component Library Dev", issuer: "Udemy", id: "DS-COMP-43", category: "Design & Data", isProfessional: false, driveLink: "#", imageFileName: "" }
];

// Helper to return corporate SVG logos for the respective issuers
function renderIssuerLogo(issuer: string) {
  const norm = issuer.toLowerCase();
  
  if (norm.includes("microsoft")) {
    return (
      <svg viewBox="0 0 23 23" className="w-5.5 h-5.5 shrink-0" fill="currentColor">
        <rect x="0" y="0" width="10" height="10" fill="#F25022" />
        <rect x="12" y="0" width="10" height="10" fill="#7FBA00" />
        <rect x="0" y="12" width="10" height="10" fill="#00A4EF" />
        <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
      </svg>
    );
  }
  
  if (norm.includes("ibm")) {
    return (
      <svg role="img" viewBox="0 0 24 24" className="w-6 h-6 shrink-0 text-[#0f62fe]" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.544 15.993c.038 0 .06-.017.06-.053v-.036c0-.035-.022-.052-.06-.052h-.09v.14zm-.09.262h-.121v-.498h.225c.112 0 .169.066.169.157 0 .079-.036.129-.09.15l.111.19h-.133l-.092-.17h-.07zm.434-.222v-.062c0-.2-.157-.357-.363-.357a.355.355 0 00-.363.357v.062c0 .2.156.358.363.358a.355.355 0 00.363-.358zm-.838-.03c0-.28.212-.492.475-.492.264 0 .475.213.475.491 0 .279-.211.491-.475.491a.477.477 0 01-.475-.49zM16.21 8.13l-.216-.624h-3.56v.624zm.413 1.19l-.216-.623h-3.973v.624zm2.65 7.147h3.107v-.624h-3.108zm0-1.192h3.107v-.623h-3.108zm0-1.19h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-1.865zm0-1.191h1.864v-.624h-3.555l-.175.504-.175-.504h-3.555v.624h1.865v-.574l.2.574h3.33l.2-.574zm1.864-1.815h-3.142l-.217.624h3.359zm-7.46 3.006h1.865v-.624h-1.865zm0 1.19h1.865v-.623h-1.865zm-1.243 1.191h3.108v-.623h-3.108zm0 1.192h3.108v-.624h-3.108zm6.386-8.961l-.216.624h3.776v-.624zm-.629 1.815h4.19v-.624h-3.974zm-4.514 1.19h3.359l-.216-.623h-3.143zm2.482 2.383h2.496l.218-.624h-2.932zm.417 1.19h1.662l.218-.623h-2.098zm.416 1.191h.83l.218-.623h-1.266zm.414 1.192l.217-.624h-.432zm-12.433-.006l4.578.006c.622 0 1.18-.237 1.602-.624h-6.18zm4.86-3v.624h2.092c0-.216-.03-.425-.083-.624zm-3.616.624h1.865v-.624H6.217zm3.617-3.573h2.008c.053-.199.083-.408.083-.624H9.834zm-3.617 0h1.865v-.624H6.217zM9.55 7.507H4.973v.624h6.18a2.36 2.36 0 00-1.602-.624zm2.056 1.191H4.973v.624h6.884a2.382 2.382 0 00-.25-.624zm-5.39 2.382v.624h4.87c.207-.176.382-.387.519-.624zm4.87 1.191h-4.87v.624h5.389a2.39 2.39 0 00-.519-.624zm-6.114 3.006h6.634c.11-.193.196-.402.25-.624H4.973zM0 8.13h4.352v-.624H0zm0 1.191h4.352v-.624H0zm1.243 1.191h1.865v-.624H1.243zm0 1.191h1.865v-.624H1.243zm0 1.19h1.865v-.623H1.243zm0 1.192h1.865v-.624H1.243zM0 15.276h4.352v-.623H0zm0 1.192h4.352v-.624H0Z"/>
      </svg>
    );
  }

  if (norm.includes("simplilearn")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#FF5722" strokeWidth="2.5" />
        <path d="M12 6v6l4 2" fill="none" stroke="#00A4EF" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("scrimba")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0 text-[#FF0055]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M7 8l-4 4 4 4" />
        <path d="M17 8l4 4-4 4" />
        <line x1="13" y1="7" x2="11" y2="17" />
      </svg>
    );
  }

  if (norm.includes("illinois")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0" fill="currentColor">
        <path d="M4 2h16v4h-6v12h6v4H4v-4h6V6H4V2z" fill="#E84A27" />
      </svg>
    );
  }

  if (norm.includes("futureskills")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0" fill="none">
        {/* Left Green Chevron */}
        <path d="M 1.5 8.5 L 5 12 L 1.5 15.5" stroke="#3CA93F" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Top Blue Chevron */}
        <path d="M 10 2 L 13.5 5.5 L 10 9" stroke="#0069B4" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Bottom Yellow Chevron */}
        <path d="M 10 15 L 13.5 18.5 L 10 22" stroke="#F4B218" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right Red Chevron */}
        <path d="M 19 8.5 L 22.5 12 L 19 15.5" stroke="#D73C3E" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (norm.includes("internshala")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0 text-[#008BD2]" fill="currentColor">
        <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
        <path d="M6 12.5v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>
    );
  }

  if (norm.includes("tcs")) {
    return (
      <svg viewBox="0 0 60 22" className="h-5.5 w-auto shrink-0 select-none" fill="currentColor">
        {/* TCS in Blue */}
        <text x="0" y="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" fill="#0056D2" letterSpacing="-0.3">TCS</text>
        {/* i in Orange */}
        <text x="29" y="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" fill="#FF6C00">i</text>
        {/* O (Power Button icon) in Orange and Blue */}
        <path d="M 37.2 8.2 A 3.8 3.8 0 1 0 41.8 8.2" fill="none" stroke="#FF6C00" strokeWidth="2.2" strokeLinecap="round" />
        <line x1="39.5" y1="5.5" x2="39.5" y2="9.5" stroke="#0056D2" strokeWidth="2.2" strokeLinecap="round" />
        {/* N in Orange */}
        <text x="47" y="16" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="900" fontSize="14" fill="#FF6C00">N</text>
      </svg>
    );
  }

  return <Award className="w-5.5 h-5.5 text-accent shrink-0" />;
}

function ProfessionalCertCard({ cert }: { cert: Certificate }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Path to local certificates. E.g. /assets/certs/pbi.png
  const imagePath = `/assets/certs/${cert.imageFileName}`;

  return (
    <a
      href={cert.driveLink}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="glass-panel glass-panel-hover p-5 rounded-xl border-glass-border flex flex-col justify-between h-56 relative overflow-hidden group block cursor-pointer select-none"
      style={{
        boxShadow: "0 8px 30px -10px rgba(88, 166, 255, 0.12)",
      }}
    >
      {/* 1. Default text/design state */}
      <div className="z-10 flex flex-col justify-between h-full transition-opacity duration-300">
        <div>
          {/* Top Row: Custom corporate logo & PRO CERT Badge */}
          <div className="flex items-center justify-between mb-4">
            <div className="p-2.5 rounded-lg bg-white/5 border border-glass-border flex items-center justify-center">
              {renderIssuerLogo(cert.issuer)}
            </div>
            <span className="text-[8px] tracking-wider uppercase font-bold bg-accent/15 border border-accent/30 text-accent px-2 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle className="w-2.5 h-2.5" /> PRO CERT
            </span>
          </div>

          {/* Title & Issuer */}
          <h3 className="text-sm font-bold text-text mb-1 leading-snug group-hover:text-accent transition-colors">
            {cert.title}
          </h3>
          <p className="text-[11px] text-muted">{cert.issuer}</p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-glass-border/40">
          <span className="text-[9px] font-mono text-muted tracking-wider">ID: {cert.id}</span>
          <span className="text-[10px] text-accent flex items-center gap-1 hover:underline font-semibold">
            Verify Link <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 2. Hover overlay preview showing the certificate picture */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="absolute inset-0 bg-[#0D1117]/95 flex flex-col p-2.5 z-20"
          >
            {/* If the image hasn't been uploaded yet, show fallback mockup vector with custom logo */}
            {imgError ? (
              <div className="flex-1 border border-dashed border-accent/25 rounded-lg flex flex-col items-center justify-center text-center p-4 bg-[#161B22]/70 select-none">
                <div className="mb-2 p-2 bg-accent/5 rounded-full border border-accent/20">
                  {renderIssuerLogo(cert.issuer)}
                </div>
                <span className="text-[9px] font-extrabold text-accent uppercase tracking-widest">OFFICIAL CREDENTIAL</span>
                <span className="text-xs font-bold text-text line-clamp-2 mt-1 leading-snug">{cert.title}</span>
                <span className="text-[10px] text-muted mt-0.5">{cert.issuer}</span>
                
                {/* Helpful prompt explaining how to add the image preview */}
                <div className="mt-3.5 py-1 px-2.5 bg-white/5 border border-glass-border rounded text-[9px] text-muted leading-relaxed max-w-[200px]">
                  💡 Put <code className="text-accent font-mono">{cert.imageFileName}</code> in <code className="font-mono">public/assets/certs/</code> to show screenshot.
                </div>

                <span className="text-[9px] text-accent/80 font-mono mt-3.5 border border-accent/25 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <ExternalLink className="w-2.5 h-2.5" /> Open Google Drive Link
                </span>
              </div>
            ) : (
              <div className="relative flex-1 rounded-lg overflow-hidden border border-glass-border bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imagePath}
                  alt={`Preview of ${cert.title}`}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover object-top filter contrast-[1.03]"
                />
                {/* Hover overlay hint */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-2.5 flex items-center justify-between text-[10px] font-semibold text-text">
                  <span className="flex items-center gap-1"><ImageIcon className="w-3.5 h-3.5 text-accent" /> Live Preview</span>
                  <span className="text-accent flex items-center gap-0.5">Click to Open <ExternalLink className="w-2.5 h-2.5" /></span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}

export default function CertificationsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI & ML", "Cloud & DevOps", "Programming", "Design & Data"];

  const filteredNormalCerts = useMemo(() => {
    return NORMAL_CERTS.filter((cert) => {
      const matchesSearch =
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory =
        activeCategory === "All" || cert.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 16,
      },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      {/* Orbiting particles halo background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] opacity-[0.025] -z-10 overflow-hidden pointer-events-none select-none">
        <div className="w-full h-full rounded-full border border-dashed border-accent/40 animate-[spin_40s_linear_infinite]" />
        <div className="absolute inset-10 rounded-full border border-dashed border-[#27C93F]/30 animate-[spin_25s_linear_infinite_reverse]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex items-center gap-4 mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-text">07. Certifications & Badges</h2>
          <div className="h-[1px] flex-1 bg-glass-border" />
        </div>
        <p className="text-sm text-muted mb-10 max-w-lg leading-relaxed">
          Showcasing verified engineering qualifications, TCS industry project milestones, and course credentials.
        </p>

        {/* 1. PROFESSIONAL CERTIFICATES GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {PROFESSIONAL_CERTS.map((cert, idx) => (
            <motion.div key={idx} variants={cardVariants}>
              <ProfessionalCertCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>

        {/* 2. EXPANDABLE DRAWER TRIGGER */}
        <div className="flex flex-col items-center justify-center my-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-[#161B22] border border-glass-border hover:border-accent/30 text-text hover:text-accent text-xs font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>{isExpanded ? "Collapse Additional Certificates" : "View 43 Course Certificates"}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* 3. ADDITIONAL CERTIFICATES EXPANSION DRAWER */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden mt-6"
            >
              <div className="bg-[#161B22]/50 border border-glass-border p-6 rounded-2xl space-y-6">
                
                {/* Search & Filter Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  {/* Category Buttons */}
                  <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          activeCategory === cat
                            ? "bg-accent/15 border-accent text-accent font-bold"
                            : "bg-[#0D1117]/60 border-glass-border/30 text-muted hover:text-text hover:bg-[#161B22]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Search Bar */}
                  <div className="relative w-full md:w-72">
                    <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      placeholder="Search credentials, ID, or course..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#0D1117]/60 border border-glass-border rounded-lg pl-9 pr-4 py-1.5 text-xs text-text placeholder:text-muted focus:outline-none focus:border-accent/40 font-mono"
                    />
                  </div>
                </div>

                {/* Grid of minor certificates */}
                {filteredNormalCerts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2">
                    {filteredNormalCerts.map((cert) => (
                      <div
                        key={cert.id}
                        className="bg-[#0D1117]/50 border border-glass-border/40 p-4 rounded-xl flex items-center justify-between gap-4 hover:border-glass-border transition-all group"
                      >
                        <div className="min-w-0 flex items-center gap-3">
                          <div className="p-1 bg-white/5 border border-glass-border/40 rounded flex items-center justify-center shrink-0">
                            {renderIssuerLogo(cert.issuer)}
                          </div>
                          <div className="min-w-0">
                            <span className="text-[8px] font-mono text-accent/60 uppercase tracking-widest font-bold">
                              {cert.category}
                            </span>
                            <h4 className="text-xs font-bold text-text truncate group-hover:text-accent transition-colors mt-0.5">
                              {cert.title}
                            </h4>
                            <p className="text-[10px] text-muted truncate">{cert.issuer} • ID: {cert.id}</p>
                          </div>
                        </div>
                        <a
                          href={cert.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-[10px] font-mono text-muted hover:text-accent flex items-center gap-0.5 hover:underline"
                        >
                          Verify <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-xs text-muted flex flex-col items-center gap-2">
                    <Search className="w-8 h-8 text-glass-border animate-pulse" />
                    <span>No certificates matches your query. Try clearing filters or search box.</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
