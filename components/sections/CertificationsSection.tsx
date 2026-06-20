"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { CheckCircle, Search, ArrowUpRight, Award, ExternalLink, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";
import SpotlightCard from "../SpotlightCard";

interface Certificate {
  title: string;
  issuer: string;
  id: string;
  category: "AI & ML" | "Cloud & DevOps" | "Programming" | "Data Analytics" | "UI/UX Design" | "Business & Leadership" | "Humanities & Writing";
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
    category: "Data Analytics",
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
    category: "Humanities & Writing",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/1xwWTZA0y_hRIzUmv3_2LzN0NnmuT0Tts/view?usp=drivesdk",
    imageFileName: "softskills.png",
  },
  {
    title: "UI Design for Web Developers",
    issuer: "Scrimba / Coursera",
    id: "CERT-UID-104",
    category: "UI/UX Design",
    isProfessional: true,
    driveLink: "https://drive.google.com/file/d/10kvCPDCR5fYaYCNphE3rXJ2pl5_ysLtQ/view?usp=drivesdk",
    imageFileName: "uidesign.png",
  },
  {
    title: "Strategic Leadership and Management",
    issuer: "Illinois / Coursera",
    id: "CERT-SLM-105",
    category: "Business & Leadership",
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
    category: "Business & Leadership",
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
  // AI & ML
  {
    title: "Supervised Learning Regression Classification Clustering",
    issuer: "Simplilearn",
    id: "CRT-01",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11WGSyGhLaDlMSrl8okULTdGqWyJnMNAY/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "COVID19 Data Analysis Using Python",
    issuer: "Coursera Project Network",
    id: "CRT-02",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/10rUs8GJN1n6IQJilR5GLjNt8dhZBXNFw/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Probability & Statistics for Machine Learning & Data Science",
    issuer: "DeepLearning.AI",
    id: "CRT-03",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12edut-GCTZIMhzN8BtH10kGFyyM-hvrm/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Covid-19 Death Medical Analysis & Visualization using Plotly",
    issuer: "Coursera Project Network",
    id: "CRT-16",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/10r8Wgt7oiEVNHn1khFZeuhYbjeFTihsT/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Deep Learning Frameworks and Neural Networks Simplified",
    issuer: "Simplilearn",
    id: "CRT-17",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11jVWavC2bf7LedjrHEr8MzsCNmdjNlW-/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Matrix Algebra for Engineers",
    issuer: "The Hong Kong University of Science and Technology",
    id: "CRT-23",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11Tb35Q7Ww_Qb_UK59u7xAuN-J6pjmv5d/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Deep Learning",
    issuer: "Illinois Tech",
    id: "CRT-31",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/18usrLy-454DUqpmHTJDL8yxpaJq3oDtM/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Fake News Detection with Machine Learning",
    issuer: "Coursera Project Network",
    id: "CRT-36",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12BsVAbOFLOH2SI0JFts0MeZoEu-5-k1w/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "AI & Deep Learning Concepts and Applications",
    issuer: "Simplilearn",
    id: "CRT-39",
    category: "AI & ML",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11dlAzvl24y2SdOV2y8qqLDXkhO5FP_jo/view?usp=drivesdk",
    imageFileName: ""
  },

  // Cloud & DevOps
  {
    title: "Introduction to Cloud Computing",
    issuer: "IBM",
    id: "CRT-14",
    category: "Cloud & DevOps",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/10ptIW99amsK_-9k7qX8Iu-DnCfy-9gjN/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Introduction to Computers and Operating Systems and Security",
    issuer: "Microsoft",
    id: "CRT-33",
    category: "Cloud & DevOps",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/1120z9QdurPSIEiDKNI0d0ylLaOyUuB_r/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Introduction to Contemporary Operating Systems and Hardware 1b",
    issuer: "Illinois Tech",
    id: "CRT-40",
    category: "Cloud & DevOps",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12w_6LTSFPU9PIkgozJhA3eXoi1hDJT3g/view?usp=drivesdk",
    imageFileName: ""
  },

  // Programming Languages
  {
    title: "Build a Multi-Page Website with Frontend Mentor, HTML, and CSS",
    issuer: "Scrimba",
    id: "CRT-05",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11jZIi_DFf4_Zxng022oocIe2ZCcsM7Fx/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Getting Started with Cascading Style Sheet",
    issuer: "Grey crowned crane",
    id: "CRT-08",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/10ttoXSN3Tff3PE-52vufUJNSrcLCj_sa/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Programming Fundamentals",
    issuer: "Duke University",
    id: "CRT-09",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11SrNBFRUKbV7ndYatxmcLdnKHWRJtaSV/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Sql Joins",
    issuer: "Coursera Project Network",
    id: "CRT-19",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/1145fMLnx2NZ0CwqHYf7YTOwxe2lT_JWK/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Introduction to Relational Database and SQL",
    issuer: "Grey crowned crane",
    id: "CRT-20",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11A4ypJ-_3cbhMLsjf8ns2qZ5dWPmdNM0/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Foundations of Computer Science",
    issuer: "LearnQuest",
    id: "CRT-25",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11QRN5IHAjWXi8frOMxsvBKrdz9_AwrQz/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Build Websites with Figma, HTML, and CSS",
    issuer: "Scrimba",
    id: "CRT-28",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11W0y_Qn-naWTQ-ix0EJXFj1WP4TjfOoK/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Data Structures in C",
    issuer: "University of Michigan",
    id: "CRT-30",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/10thIWj0MEDZfunByEylsfN8dZlsQQQdo/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Fundamentals of Java Programming",
    issuer: "Board Infinity",
    id: "CRT-42",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/112lCJ6u3X_-DN2jLtxyykFFQPSXEgjba/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Pointers, Arrays, and Recursion",
    issuer: "Duke University",
    id: "CRT-43",
    category: "Programming",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11BSJX86uVtom6EzQt2KTUAd5bGKc0BBN/view?usp=drivesdk",
    imageFileName: ""
  },

  // Business & Leadership, Data Analytics, UI/UX Design, Humanities & Writing
  {
    title: "Business Strategy",
    issuer: "Illinois",
    id: "CRT-04",
    category: "Business & Leadership",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11zbyAuMwD9HGOymBWSjF8EG5np0Q0Daf/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Strategic Leadership and Management Capstone",
    issuer: "Illinois",
    id: "CRT-06",
    category: "Business & Leadership",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11lQrhtWnY3tLqDTBpVUBoQmaUnGEcMQc/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Deploy and Maintain Power BI Assets and Capstone project",
    issuer: "Microsoft",
    id: "CRT-07",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12avGuxNsJjsOv4dciD09CgrmqlBakoQk/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Leading Teams: Building Effective Team Cultures",
    issuer: "Illinois",
    id: "CRT-10",
    category: "Business & Leadership",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/127ukt1e706uDlhuAqSh5Atfsf0iK8uGL/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Gender Equality",
    issuer: "University of Western Australia",
    id: "CRT-11",
    category: "Humanities & Writing",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11DNtyJWQtbXHrbgmE3SuCI6k1Z9030Zg/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Learn UI Design",
    issuer: "Scrimba",
    id: "CRT-12",
    category: "UI/UX Design",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11ldlsfoVpkTgnirEd9lWS1Ac56pAVE6H/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Data Analysis and Visualization with Power BI",
    issuer: "Microsoft",
    id: "CRT-13",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12Eu81X1CmEDbeTbyu7HjPoqQhXs8D4wO/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Managing the Organization",
    issuer: "Illinois",
    id: "CRT-15",
    category: "Business & Leadership",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12CHakVPEjiGLUeo6XGBkG4rWAYoB_YG5/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Successful Presentation",
    issuer: "University of Colorado Boulder",
    id: "CRT-18",
    category: "Humanities & Writing",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11OuUJrb7a0F_uARofdQMwDBUn69faptX/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Corporate Strategy",
    issuer: "Illinois",
    id: "CRT-21",
    category: "Business & Leadership",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11seud0IQ9-mnYJ5x4poc00gPJV9WD1K0/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Designing the Organization",
    issuer: "Illinois",
    id: "CRT-22",
    category: "Business & Leadership",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11lsgHcw_aamARVibMpWou7Ugm1L9v4ne/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Data Modeling in Power BI",
    issuer: "Microsoft",
    id: "CRT-24",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12jfjMMGzp9lYCSp4_bbIhgY6hzEdLjxG/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Harnessing the Power of Data with Power BI",
    issuer: "Microsoft",
    id: "CRT-26",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12hKeF_Jk5VBbUUrQFv7vaqRuRQsbnecb/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Sharpened Visions: A Poetry Workshop",
    issuer: "CalArts",
    id: "CRT-27",
    category: "Humanities & Writing",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/11IXGRkj9mmVSL1IWfQv2h10NL3MKpdak/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Preparing Data for Analysis with Microsoft Excel",
    issuer: "Microsoft",
    id: "CRT-29",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12cvvxKJchKqc_nDXLeL4e1o6ohYXjmzW/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Extract, Transform and Load Data in Power BI",
    issuer: "Microsoft",
    id: "CRT-32",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12hUWy5OMnkQcBst0aHCJa7LLVyqV9B3z/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Creative Designing in Power BI",
    issuer: "Microsoft",
    id: "CRT-34",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12IjDmBJUzEb-84CYH6SlDHimJjZQYn8v/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Writing in English at University",
    issuer: "Lund University",
    id: "CRT-35",
    category: "Humanities & Writing",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/10pyyRMUdVL2lHvISDcPSI6Y-uh19WOmy/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Interactive Statistical Data Visualization 101",
    issuer: "Coursera Project Network",
    id: "CRT-37",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/120Euxay4_8WG3RzGPpoMfQRKn1bsYOtG/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Leading Teams: Developing as a Leader",
    issuer: "Illinois",
    id: "CRT-38",
    category: "Business & Leadership",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12W-SiUb81nmBIXEV2tMhE1oED88vq9sG/view?usp=drivesdk",
    imageFileName: ""
  },
  {
    title: "Microsoft PL-300 Exam Preparation and Practice",
    issuer: "Microsoft",
    id: "CRT-41",
    category: "Data Analytics",
    isProfessional: false,
    driveLink: "https://drive.google.com/file/d/12bJd4_Ppi2UzmRIOUHl4paOGeLpIj_eE/view?usp=drivesdk",
    imageFileName: ""
  }
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
      <svg viewBox="0 0 115 30" className="h-5.5 w-auto shrink-0 select-none" fill="currentColor">
        <text x="0" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="20" fill="#FF9900">simpli</text>
        <text x="53" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="20" fill="#FF9900">;</text>
        <text x="59" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="bold" fontSize="20" fill="#00AEEF">learn</text>
      </svg>
    );
  }

  if (norm.includes("scrimba")) {
    return (
      <svg viewBox="0 0 160 30" className="h-5.5 w-auto shrink-0 select-none" fill="#000000">
        <rect x="5" y="15" width="12" height="7" rx="0.5" />
        <rect x="17" y="8" width="12" height="7" rx="0.5" />
        <rect x="34" y="15" width="12" height="7" rx="0.5" />
        <rect x="46" y="8" width="12" height="7" rx="0.5" />
        <text x="68" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" letterSpacing="1">SCRIMBA</text>
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

  if (norm.includes("coursera")) {
    return (
      <svg viewBox="0 0 100 100" className="h-6.5 w-6.5 shrink-0 rounded select-none">
        <rect x="0" y="0" width="100" height="100" fill="#3B2E9F" />
        <text x="50" y="44" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="17" fill="#FFFFFF" letterSpacing="-0.3">coursera</text>
        <text x="50" y="65" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="300" fontSize="13" fill="#FFFFFF" letterSpacing="-0.1">project</text>
        <text x="50" y="80" textAnchor="middle" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="300" fontSize="13" fill="#FFFFFF" letterSpacing="-0.1">network</text>
      </svg>
    );
  }

  if (norm.includes("deeplearning")) {
    return (
      <svg viewBox="0 0 160 30" className="h-5.5 w-auto shrink-0 select-none" fill="currentColor">
        <circle cx="15" cy="15" r="11" fill="#FF3366" />
        <circle cx="15" cy="15" r="8" fill="#FFFFFF" />
        <circle cx="15" cy="15" r="6" fill="#FF3366" />
        <circle cx="15" cy="15" r="4.5" fill="#FFFFFF" />
        <circle cx="15" cy="15" r="2.5" fill="#FF3366" />
        <text x="32" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="18" fill="#FF3366" letterSpacing="-0.3">DeepLearning.AI</text>
      </svg>
    );
  }

  if (norm.includes("illinois tech")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0 text-[#CC0000]" fill="currentColor">
        <path d="M4 2v20h16V2H4zm3 3h3v5H7V5zm0 7h3v5H7v-5zm10 5h-3v-5h3v5zm0-7h-3V5h3v5z" />
      </svg>
    );
  }

  if (norm.includes("duke")) {
    return (
      <svg viewBox="0 0 100 45" className="h-5.5 w-auto shrink-0 select-none" fill="#012169">
        <text x="50%" y="26" textAnchor="middle" fontFamily="Georgia, serif" fontSize="28" fontWeight="bold" letterSpacing="-0.5">Duke</text>
        <text x="50%" y="39" textAnchor="middle" fontFamily="system-ui, sans-serif" fontSize="8" letterSpacing="2.5" fontWeight="400">UNIVERSITY</text>
      </svg>
    );
  }

  if (norm.includes("grey crowned crane") || norm.includes("crane")) {
    return (
      <svg viewBox="0 0 40 40" className="h-6.5 w-auto shrink-0 select-none">
        <path d="M22 6c3-3 8-1 10 3-3 0-6-1-10-3z" fill="#FFC107" />
        <path d="M22 6c1.5-2 4-1.5 5 1-2.5 0-4-.5-5-1z" fill="#DC3545" />
        <path d="M20 7c1.5.5 3 2 2.5 4.5s-4 7-6 10" fill="none" stroke="#1A1A1A" strokeWidth="2.8" strokeLinecap="round" />
        <circle cx="21.5" cy="8.5" r="0.6" fill="#FFFFFF" />
        <path d="M22.5 9l-4 .5z" stroke="#1A1A1A" strokeWidth="1.5" />
        <path d="M19 11.5c-1 1-1 3 .5 3s2.5-2 .5-3z" fill="#DC3545" />
        <path d="M16.5 21.5c0 0-4 1-5 4.5s1 7 4.5 7h4c3.5 0 6.5-3.5 5.5-8s-5-3.5-9-3.5z" fill="#1A1A1A" />
        <path d="M15 23.5c1.5 1 5 1.5 7 4.5s1.5 4 .5 4.5-3.5-1-5.5-4-2-5-2-5z" fill="#708090" />
        <path d="M23 27.5c2 1 6 3 5.5 6s-4 2.5-6.5.5-2-5.5-1-6.5z" fill="#DC3545" />
        <path d="M16 32v7M16 34.5l-3 2.5" fill="none" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("calarts")) {
    return (
      <svg viewBox="0 0 120 30" className="h-6 w-auto shrink-0 select-none">
        <text x="2" y="22" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="22" fill="#00A5DB" stroke="#00A5DB" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" letterSpacing="0.5">CaLARTS</text>
      </svg>
    );
  }

  if (norm.includes("learnquest")) {
    return (
      <svg viewBox="0 0 135 30" className="h-5.5 w-auto shrink-0 select-none">
        <text x="2" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontStyle="italic" fontWeight="bold" fontSize="19" fill="#005B94">Learn</text>
        <text x="70" y="21" fontFamily="system-ui, -apple-system, sans-serif" fontStyle="italic" fontWeight="bold" fontSize="19" fill="#005B94">uest</text>
        <circle cx="60" cy="14" r="7.5" fill="none" stroke="#FF9900" strokeWidth="2.8" />
        <path d="M57 20h18" fill="none" stroke="#FF9900" strokeWidth="2.8" strokeLinecap="round" />
      </svg>
    );
  }

  if (norm.includes("board infinity") || norm.includes("boord infinity")) {
    return (
      <svg viewBox="0 0 135 55" className="h-7 w-auto shrink-0 select-none">
        <text x="2" y="33" fontFamily="'Arial Black', 'Impact', 'Inter', sans-serif" fontWeight="900" fontSize="28" fill="#FFFFFF">B</text>
        <path d="M 53,20.5 C 49,14.5 43,14.5 38.5,19 C 34,23.5 34,30.5 38.5,35 C 43,39.5 49,39.5 53,33.5 L 69,17.5 C 73,13 79,13 83.5,17.5 C 87.5,21.5 87.5,28 84,32 L 83.5,32.5 M 69,29 C 72,33.5 78.5,33.5 82,29.5 M 84,18 L 84,35.5 C 84,37.5 85.5,38.5 87.5,38.5" fill="none" stroke="#0067FF" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="93" y="33" fontFamily="'Arial Black', 'Impact', 'Inter', sans-serif" fontWeight="900" fontSize="28" fill="#FFFFFF">RD</text>
        <text x="3" y="49" fontFamily="'Arial Black', 'Inter', sans-serif" fontWeight="900" fontSize="12.5" fill="#FFFFFF" letterSpacing="4.1">INFINITY</text>
      </svg>
    );
  }

  if (norm.includes("lund")) {
    return (
      <svg viewBox="0 0 190 38" className="h-6.5 w-auto shrink-0 select-none">
        <circle cx="16" cy="18" r="14" fill="none" stroke="#C5A059" strokeWidth="1.5" />
        <circle cx="16" cy="18" r="11" fill="none" stroke="#C5A059" strokeWidth="0.8" />
        <rect x="11.5" y="18" width="9" height="7" rx="0.5" fill="none" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="16" y1="18" x2="16" y2="25" stroke="#C5A059" strokeWidth="0.8" />
        <line x1="12" y1="15" x2="8" y2="7" stroke="#C5A059" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="9" y1="12" x2="12" y2="13" stroke="#C5A059" strokeWidth="0.8" />
        <path d="M 17,20 C 18,17 19.5,15.5 22.5,15.5 C 23.5,15.5 24.5,16.5 25,17.5 C 24,19 22.5,19 22.5,20.5 C 22.5,21.5 24,21.5 25,22.5 C 23,24 19.5,24 17.5,22.5" fill="none" stroke="#C5A059" strokeWidth="0.8" />
        <path d="M 21.5,8 l 1,1.5 h -2 z M 24.5,8 l 1,1.5 h -2 z M 23,10 l 1,1.5 h -2 z" fill="#C5A059" />
        <text x="38" y="24" fontFamily="Georgia, serif" fontSize="15" fontWeight="500" fill="#E5E7EB" letterSpacing="1.2">LUND UNIVERSITY</text>
      </svg>
    );
  }

  if (norm.includes("michigan")) {
    return (
      <svg viewBox="0 0 170 38" className="h-6.5 w-auto shrink-0 select-none">
        <path d="M 2,4 H 13 V 8.5 H 9.5 V 10 L 17,25 L 24.5,10 V 8.5 H 21 V 4 H 32 V 8.5 H 28.5 V 27.5 H 32 V 32 H 21 V 27.5 H 24.5 V 14.5 L 17,29.5 L 9.5,14.5 V 27.5 H 13 V 32 H 2 V 27.5 H 5.5 V 8.5 H 2 Z" fill="#FFCB05" />
        <text x="38" y="15" fontFamily="Georgia, serif" fontSize="10.5" fontWeight="bold" fill="#FFFFFF" letterSpacing="0.2">UNIVERSITY OF</text>
        <text x="38" y="32" fontFamily="Georgia, serif" fontSize="18" fontWeight="bold" fill="#FFFFFF" letterSpacing="0.3">MICHIGAN</text>
      </svg>
    );
  }

  if (norm.includes("western australia") || norm.includes("uwa")) {
    return (
      <svg viewBox="0 0 180 55" className="h-7 w-auto shrink-0 select-none" fill="#002F6C">
        <g transform="scale(0.85)">
          <path d="M5 2h34v15c0 10-17 19-17 19S5 27 5 17V2z" fill="#002F6C" />
          <path d="M22 17l10 8-10 8-10-8z" fill="#FFC72C" />
          <path d="M21 21c-2 0-3 2-2 3.5s2 1.5 3 .5 1.5-1.5.5-2.5c1 1 2 2 1.5 3s-2.5 1-3.5 0" fill="#000000" />
          <rect x="9" y="5" width="10" height="7" fill="#FFFFFF" rx="0.5" />
          <rect x="25" y="5" width="10" height="7" fill="#FFFFFF" rx="0.5" />
        </g>
        <text x="42" y="18" fontFamily="Georgia, serif" fontSize="10.5" fontWeight="bold">THE UNIVERSITY OF</text>
        <text x="42" y="32" fontFamily="Georgia, serif" fontSize="13.5" fontWeight="bold" letterSpacing="0.2">WESTERN</text>
        <text x="42" y="46" fontFamily="Georgia, serif" fontSize="13.5" fontWeight="bold" letterSpacing="0.2">AUSTRALIA</text>
      </svg>
    );
  }

  if (norm.includes("hong kong") || norm.includes("hkust")) {
    return (
      <svg viewBox="0 0 200 42" className="h-6.5 w-auto shrink-0 select-none">
        <g transform="translate(2, 2)">
          <circle cx="15" cy="8" r="4.5" fill="#B58A30" />
          <path d="M13 14h4v15l-3 4-3-4z" fill="#B58A30" />
          <path d="M11 13h8l-1 2h-6z" fill="#B58A30" />
          <path d="M5 14c0 0 2-3 10-3s10 3 10 3v8c0 5-4 9-10 9S5 27 5 22v-8zm3 2v6c0 3 3 5 7 5s7-2 7-5v-6" fill="none" stroke="#003893" strokeWidth="2.5" />
        </g>
        <text x="38" y="14" fontFamily="system-ui, sans-serif" fontSize="9.5" fill="#003893" fontWeight="700" letterSpacing="0.2">THE HONG KONG</text>
        <text x="38" y="24" fontFamily="system-ui, sans-serif" fontSize="9.5" fill="#003893" fontWeight="700" letterSpacing="0.2">UNIVERSITY OF SCIENCE</text>
        <text x="38" y="34" fontFamily="system-ui, sans-serif" fontSize="9.5" fill="#003893" fontWeight="700" letterSpacing="0.2">AND TECHNOLOGY</text>
      </svg>
    );
  }

  if (norm.includes("colorado") || norm.includes("boulder")) {
    return (
      <svg viewBox="0 0 170 38" className="h-5.5 w-auto shrink-0 select-none">
        <g stroke="#D4AF37" strokeWidth="1.5" strokeLinejoin="miter">
          <path d="M18 6H8l-4 4v16l4 4h10v-5H9v-8h9z" fill="#1A1A1A" />
          <path d="M15 11v11l3 3h8l3-3V11h-5v10h-4V11z" fill="#1A1A1A" />
        </g>
        <text x="36" y="16" fontFamily="system-ui, sans-serif" fontSize="12" fill="#202020" fontWeight="400">University of Colorado</text>
        <text x="36" y="30" fontFamily="system-ui, sans-serif" fontSize="12" fill="#202020" fontWeight="400">Boulder</text>
      </svg>
    );
  }

  if (norm.includes("university") || norm.includes("college") || norm.includes("quest") || norm.includes("michigan") || norm.includes("stanford") || norm.includes("calarts")) {
    return (
      <svg viewBox="0 0 24 24" className="w-5.5 h-5.5 shrink-0 text-accent" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
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
      className="block cursor-pointer select-none"
    >
      <SpotlightCard
        className="p-5 rounded-xl h-56 relative overflow-hidden group flex flex-col justify-between"
        style={{
          boxShadow: "0 8px 30px -10px rgba(168, 85, 247, 0.12)",
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
            className="absolute inset-0 bg-[#0D1017]/95 flex flex-col p-2.5 z-20"
          >
            {/* If the image hasn't been uploaded yet, show fallback mockup vector with custom logo */}
            {imgError ? (
              <div className="flex-1 border border-dashed border-accent/25 rounded-lg flex flex-col items-center justify-center text-center p-4 bg-[#0D1017]/70 select-none">
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
      </SpotlightCard>
    </a>
  );
}

export default function CertificationsSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "AI & ML", "Cloud & DevOps", "Programming", "Data Analytics", "UI/UX Design", "Business & Leadership", "Humanities & Writing"];

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
        delayChildren: 0.4,
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
            className="bg-[#0A0A0C] border border-glass-border hover:border-accent/30 text-text hover:text-accent text-xs font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
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
              <div className="bg-[#0A0A0C]/50 border border-glass-border p-6 rounded-2xl space-y-6">
                
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
                            : "bg-[#000000]/60 border-glass-border/30 text-muted hover:text-text hover:bg-[#0A0A0C]"
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
                      className="w-full bg-[#000000]/60 border border-glass-border rounded-lg pl-9 pr-4 py-1.5 text-xs text-text placeholder:text-muted focus:outline-none focus:border-accent/40 font-mono"
                    />
                  </div>
                </div>

                {/* Grid of minor certificates */}
                {filteredNormalCerts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-2">
                    {filteredNormalCerts.map((cert) => (
                      <a
                        key={cert.id}
                        href={cert.driveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#000000]/50 border border-glass-border/40 p-4 rounded-xl flex flex-col justify-between min-h-[132px] h-auto hover:border-accent/40 hover:bg-[#0D1017]/50 transition-all group cursor-pointer w-full overflow-hidden"
                      >
                        {/* Row 1: Logo on left, tag and by who on right */}
                        <div className="flex items-center justify-between w-full gap-2 min-w-0">
                          <div className="p-1 bg-white/5 border border-glass-border/40 rounded flex items-center justify-center shrink-0">
                            {renderIssuerLogo(cert.issuer)}
                          </div>
                          <div className="flex items-center gap-2 text-right min-w-0 flex-1 justify-end">
                            <span className="text-[10px] text-muted font-medium truncate flex-1 min-w-0">
                              by {cert.issuer}
                            </span>
                            <span className="text-[8px] font-mono bg-accent/10 border border-accent/20 text-accent uppercase tracking-wider font-bold px-1.5 py-0.5 rounded shrink-0">
                              {cert.category}
                            </span>
                          </div>
                        </div>

                        {/* Row 2: Title and Verify link */}
                        <div className="flex items-end justify-between w-full mt-2 gap-4 min-w-0">
                          <div className="min-w-0 flex-1">
                            <h4 className="text-xs font-bold text-text group-hover:text-accent transition-colors leading-snug line-clamp-2">
                              {cert.title}
                            </h4>
                            <p className="text-[9px] text-muted/70 font-mono mt-0.5">ID: {cert.id}</p>
                          </div>
                          <span className="shrink-0 text-[10px] font-mono text-accent flex items-center gap-0.5 group-hover:underline">
                            Verify <ArrowUpRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </a>
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
