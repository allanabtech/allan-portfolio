"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { X, Bot, Cpu, CloudLightning, Construction, HelpCircle, BookOpen, Cloud, Infinity, ChevronLeft, ChevronRight, Images } from "lucide-react";
import SpotlightCard from "../SpotlightCard";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  status?: string;
  isLifeGoal?: boolean;
  images?: { src: string; caption: string }[];
  tech: string[];
  challenges: string;
  lessons: string;
  icon: React.ReactNode;
  svgGraphic: React.ReactNode;
  metrics: {
    loc: string;
    speed: string;
    memory: string;
  };
}

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Autonomous Navigation Bot",
    subtitle: "Obstacle avoidance with sensor fusion on Arduino",
    description: "Built a two-wheeled crawling robot on Arduino Uno that uses ultrasonic and IR sensors to navigate around obstacles. The bot maps a room incrementally and makes turn decisions in real time without any external input. No pre-programmed routes — it figures it out as it goes.",
    images: [
      { src: "/assets/proj_bot_1.jpg", caption: "Final assembled bot — sensors mounted and wired up, ready for the navigation demo" },
      { src: "/assets/proj_bot_2.jpg", caption: "Mid-build stage at the lab — positioning the ultrasonic module and routing cables" },
      { src: "/assets/proj_bot_3.jpg", caption: "Underside view showing the Arduino Uno, L298N motor driver, and full wiring harness" },
    ],
    tech: ["Arduino Uno", "Ultrasonic HC-SR04", "IR Sensors", "C++", "PID Control"],
    challenges: "IR sensors turned completely unreliable near dark surfaces or under fluorescent lighting — readings would swing by 30–40% with no physical change in distance. This caused the bot to spin randomly in corners.",
    lessons: "Added a 5-sample moving average per sensor and cross-validated readings between the ultrasonic and IR before making any turn decision. Noisy input stopped causing actual movement errors after that.",
    icon: <Bot className="w-5 h-5 text-accent" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-accent opacity-80" fill="none">
        <style>{`
          @keyframes bot-bounce {
            0%, 100% { transform: translateY(0) rotate(0deg); filter: drop-shadow(0 0 0px rgba(94, 234, 212, 0)); }
            25% { transform: translateY(-3px) rotate(-2deg); filter: drop-shadow(0 4px 6px rgba(94, 234, 212, 0.2)); }
            75% { transform: translateY(-3px) rotate(2deg); filter: drop-shadow(0 4px 6px rgba(94, 234, 212, 0.2)); }
          }
          @keyframes wheel-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes antenna-ping {
            0% { r: 2.5; opacity: 1; stroke-width: 1.5; }
            50% { r: 8; opacity: 0.6; stroke-width: 1; stroke: #5EEAD4; }
            100% { r: 14; opacity: 0; stroke-width: 0; stroke: #5EEAD4; }
          }
          @keyframes sensor-sweep {
            0% { stroke-dashoffset: 10; opacity: 0.3; }
            50% { opacity: 1; stroke: #5EEAD4; filter: drop-shadow(0 0 4px #5EEAD4); }
            100% { stroke-dashoffset: 0; opacity: 0.3; }
          }
          .group:hover .bot-chassis {
            animation: bot-bounce 1s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
            transform-origin: 50px 20px;
          }
          .group:hover .bot-wheel-left {
            animation: wheel-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: 40px 45px;
          }
          .group:hover .bot-wheel-right {
            animation: wheel-spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: 60px 45px;
          }
          .bot-antenna-pulse {
            animation: antenna-ping 1.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
            transform-origin: 50px 8px;
          }
          .group:hover .bot-sensor {
            stroke-dasharray: 4 4;
            animation: sensor-sweep 0.8s linear infinite;
          }
        `}</style>
        <g className="bot-chassis">
          <rect x="30" y="20" width="40" height="25" rx="4" stroke="currentColor" strokeWidth="1.5" />
          <path d="M 50 20 L 50 10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="50" cy="8" r="2.5" fill="currentColor" />
          <circle cx="50" cy="8" r="2.5" stroke="currentColor" strokeWidth="1" className="bot-antenna-pulse" />
          <path d="M 33 28 L 67 28" stroke="currentColor" strokeWidth="1.5" className="bot-sensor" />
        </g>
        {/* Left Wheel */}
        <g className="bot-wheel-left">
          <circle cx="40" cy="45" r="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="37" x2="40" y2="53" stroke="currentColor" strokeWidth="1" />
          <line x1="32" y1="45" x2="48" y2="45" stroke="currentColor" strokeWidth="1" />
        </g>
        {/* Right Wheel */}
        <g className="bot-wheel-right">
          <circle cx="60" cy="45" r="8" stroke="currentColor" strokeWidth="1.5" />
          <line x1="60" y1="37" x2="60" y2="53" stroke="currentColor" strokeWidth="1" />
          <line x1="52" y1="45" x2="68" y2="45" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
    ),
    metrics: {
      loc: "1,240 LOC",
      speed: "16 MHz clock",
      memory: "1.8 KB SRAM"
    }
  },
  {
    id: 2,
    title: "Multi-Sensor Embedded Framework",
    subtitle: "Interrupt-driven I2C/SPI sensor hub on STM32",
    description: "Wrote a lightweight sensor abstraction layer for STM32 microcontrollers that handles multiple I2C and SPI devices sharing the same bus. The framework manages interrupt priorities, debounces digital inputs, and exposes a clean API so sensor reads don't block the main loop.",
    tech: ["STM32", "I2C / SPI", "C / Assembly", "GPIO Interrupts", "HAL Layer"],
    challenges: "When two sensors triggered interrupts within microseconds of each other, the ISR for the slower one would get preempted repeatedly and never complete — effectively starving it.",
    lessons: "Implemented a priority-tagged volatile flag register system. ISRs now only set a flag and return immediately. The main loop reads flags and dispatches handlers in sequence, which eliminated the starvation entirely.",
    icon: <Cpu className="w-5 h-5 text-[#27C93F]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#27C93F] opacity-80" fill="none">
        <style>{`
          @keyframes core-pulse {
            0%, 100% { opacity: 0.2; transform: scale(1); filter: drop-shadow(0 0 0px #27C93F); }
            50% { opacity: 0.9; transform: scale(1.15); filter: drop-shadow(0 0 8px #27C93F); fill: #27C93F; }
          }
          @keyframes flow-in {
            0% { stroke-dashoffset: 10; opacity: 0.3; }
            50% { opacity: 1; stroke: #27C93F; stroke-width: 2.5; filter: drop-shadow(0 0 4px #27C93F); }
            100% { stroke-dashoffset: 0; opacity: 0.3; }
          }
          @keyframes box-glow {
            0%, 100% { stroke: currentColor; filter: drop-shadow(0 0 0px transparent); }
            50% { stroke: #27C93F; filter: drop-shadow(0 0 3px rgba(39, 201, 63, 0.4)); }
          }
          .emb-core {
            animation: core-pulse 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: 50px 30px;
          }
          .group:hover .emb-box {
            animation: box-glow 2s ease-in-out infinite;
          }
          .group:hover .pin-l1 { stroke-dasharray: 4 4; animation: flow-in 0.6s linear infinite 0s; }
          .group:hover .pin-l2 { stroke-dasharray: 4 4; animation: flow-in 0.6s linear infinite 0.2s; }
          .group:hover .pin-l3 { stroke-dasharray: 4 4; animation: flow-in 0.6s linear infinite 0.4s; }
          .group:hover .pin-r1 { stroke-dasharray: 4 4; animation: flow-in 0.6s linear infinite 0.1s; direction: rtl; }
          .group:hover .pin-r2 { stroke-dasharray: 4 4; animation: flow-in 0.6s linear infinite 0.3s; direction: rtl; }
          .group:hover .pin-r3 { stroke-dasharray: 4 4; animation: flow-in 0.6s linear infinite 0.5s; direction: rtl; }
        `}</style>
        <rect x="25" y="15" width="50" height="30" rx="3" stroke="currentColor" strokeWidth="1.5" className="emb-box" />
        <rect x="40" y="25" width="20" height="10" rx="1" fill="currentColor" stroke="currentColor" strokeWidth="1" className="emb-core" />
        <line x1="15" y1="20" x2="25" y2="20" stroke="currentColor" strokeWidth="1.5" className="pin-l1" />
        <line x1="15" y1="30" x2="25" y2="30" stroke="currentColor" strokeWidth="1.5" className="pin-l2" />
        <line x1="15" y1="40" x2="25" y2="40" stroke="currentColor" strokeWidth="1.5" className="pin-l3" />
        <line x1="75" y1="20" x2="85" y2="20" stroke="currentColor" strokeWidth="1.5" className="pin-r1" />
        <line x1="75" y1="30" x2="85" y2="30" stroke="currentColor" strokeWidth="1.5" className="pin-r2" />
        <line x1="75" y1="40" x2="85" y2="40" stroke="currentColor" strokeWidth="1.5" className="pin-r3" />
      </svg>
    ),
    metrics: {
      loc: "2,800 LOC",
      speed: "ISR latency < 8µs",
      memory: "STM32 + HAL"
    }
  },
  {
    id: 3,
    title: "ML Model Deployment Pipeline",
    subtitle: "Serverless inference on AWS with async job queuing",
    description: "Set up an end-to-end pipeline that takes a trained PyTorch model, packages it, and deploys it to AWS for inference. Users submit images through an API, jobs get queued via SQS, and a worker on EC2 runs inference and writes results back. The Lambda just handles the API layer — it doesn't touch the model.",
    tech: ["Python", "PyTorch", "AWS Lambda", "SQS", "EC2", "S3"],
    challenges: "First version had Lambda trying to load the model and run inference directly. Cold starts alone were taking 18–22 seconds, and anything above a batch size of 4 hit the timeout wall.",
    lessons: "Separated concerns completely — Lambda only validates the request and pushes a job to SQS. An EC2 worker with the model already warm in memory picks it up and returns results asynchronously. Latency dropped to under 3 seconds for standard requests.",
    icon: <CloudLightning className="w-5 h-5 text-[#FFBD2E]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#FFBD2E] opacity-80" fill="none">
        <style>{`
          @keyframes ml-cloud-drift {
            0%, 100% { transform: translateY(0) scale(1); filter: drop-shadow(0 0 0px transparent); }
            50% { transform: translateY(-3px) scale(1.02); filter: drop-shadow(0 4px 8px rgba(255, 189, 46, 0.15)); }
          }
          @keyframes ml-flash {
            0%, 100% { opacity: 0; transform: scaleY(0.8) translateY(-10px); }
            10%, 15% { opacity: 1; transform: scaleY(1.1) translateY(0); stroke-width: 2.5; stroke: #FFBD2E; filter: drop-shadow(0 0 6px #FFBD2E); }
            20% { opacity: 0; }
            25%, 30% { opacity: 0.8; transform: scaleY(1) translateY(0); stroke-width: 2; stroke: #FFBD2E; filter: drop-shadow(0 0 4px #FFBD2E); }
            40% { opacity: 0; }
          }
          @keyframes data-drops {
            0% { transform: translateY(0); opacity: 0; }
            50% { opacity: 0.8; fill: #FFBD2E; }
            100% { transform: translateY(15px); opacity: 0; }
          }
          .group:hover .ml-cloud {
            animation: ml-cloud-drift 3s ease-in-out infinite;
            stroke: #FFBD2E;
          }
          .group:hover .ml-lightning {
            animation: ml-flash 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
            transform-origin: 50px 38px;
          }
          .group:hover .data-drop {
            animation: data-drops 1.5s ease-in infinite;
          }
          .drop-1 { animation-delay: 0.2s !important; }
          .drop-2 { animation-delay: 0.7s !important; }
          .drop-3 { animation-delay: 1.1s !important; }
        `}</style>
        <path d="M 30 35 C 30 25, 45 20, 50 25 C 55 20, 70 25, 70 35 C 75 35, 80 40, 75 48 C 70 48, 30 48, 25 45 C 20 40, 25 35, 30 35 Z" stroke="currentColor" strokeWidth="1.5" className="ml-cloud transition-colors duration-500" />
        <path d="M 50 38 L 45 46 L 52 46 L 48 54" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-lightning opacity-0" />
        <circle cx="35" cy="45" r="1.5" fill="currentColor" className="data-drop drop-1 opacity-0" />
        <circle cx="65" cy="45" r="1.5" fill="currentColor" className="data-drop drop-2 opacity-0" />
        <circle cx="58" cy="48" r="1.5" fill="currentColor" className="data-drop drop-3 opacity-0" />
      </svg>
    ),
    metrics: {
      loc: "3,400 LOC",
      speed: "< 3s p95 latency",
      memory: "EC2 + SQS + S3"
    }
  },
  {
    id: 4,
    title: "Pothole Detection & Severity Mapping",
    subtitle: "Edge CV pipeline on Raspberry Pi with GPS logging",
    description: "Mounted a camera and GPS module on a vehicle and built a pipeline that detects potholes from the live feed, classifies severity (shallow / deep / edge-damage), and logs the GPS coordinates with each detection. Intended for use by local road maintenance teams who don't have budget for LiDAR rigs.",
    tech: ["PyTorch", "OpenCV", "Raspberry Pi 4", "GPS Module", "AWS S3"],
    challenges: "MobileNetV2 was still too slow on the Pi's ARM CPU — we were getting around 4–5 FPS, which meant detections were being missed between frames at normal driving speed.",
    lessons: "Switched to a quantized INT8 model and offloaded post-processing to a separate thread. Got to ~14 FPS, which is workable. Also added overlap detection between frames to catch anything the model missed on a single pass.",
    icon: <Construction className="w-5 h-5 text-[#FF5F56]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#FF5F56] opacity-80" fill="none">
        <style>{`
          @keyframes sweep-horizontal {
            0% { transform: translateX(0px) rotate(-10deg); opacity: 0; }
            10% { opacity: 1; }
            45% { stroke: #FF5F56; filter: drop-shadow(0 0 6px #FF5F56); stroke-width: 2; }
            50% { transform: translateX(35px) rotate(0deg); opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateX(70px) rotate(15deg); opacity: 0; }
          }
          @keyframes detect-ping {
            0% { r: 1; opacity: 1; fill: #FF5F56; filter: drop-shadow(0 0 0px #FF5F56); }
            50% { r: 5; opacity: 0.6; fill: #FF5F56; filter: drop-shadow(0 0 4px #FF5F56); }
            100% { r: 8; opacity: 0; fill: #FF5F56; filter: drop-shadow(0 0 8px #FF5F56); }
          }
          @keyframes camera-focus {
            0%, 100% { transform: scaleX(1); stroke: currentColor; }
            50% { transform: scaleX(1.2); stroke: #FF5F56; filter: drop-shadow(0 0 2px #FF5F56); }
          }
          .group:hover .pothole-sweep {
            animation: sweep-horizontal 2.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: 22.5px 15px;
          }
          .group:hover .pothole-scope {
            animation: camera-focus 2.5s ease-in-out infinite;
            transform-origin: 22.5px 15px;
          }
          .group:hover .ping-1 { animation: detect-ping 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite 1.1s; }
          .group:hover .ping-2 { animation: detect-ping 2.5s cubic-bezier(0.1, 0.8, 0.3, 1) infinite 1.9s; }
        `}</style>
        <path d="M 10 45 C 25 45, 30 32, 45 32 C 60 32, 65 50, 80 50 C 90 50, 95 45, 100 45" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Pothole 1 */}
        <circle cx="45" cy="32" r="1" fill="currentColor" />
        <circle cx="45" cy="32" r="1" className="ping-1 opacity-0" />
        
        {/* Pothole 2 */}
        <circle cx="80" cy="50" r="1" fill="currentColor" />
        <circle cx="80" cy="50" r="1" className="ping-2 opacity-0" />
        
        {/* Camera */}
        <path d="M 15 15 L 30 15 L 26 10 L 19 10 Z" stroke="currentColor" strokeWidth="1.5" fill="transparent" className="pothole-scope" />
        
        {/* Laser Sweep */}
        <polygon points="22.5,15 12,45 33,45" fill="rgba(255, 95, 86, 0.15)" className="pothole-sweep opacity-0" />
        <line x1="22.5" y1="15" x2="22.5" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" className="pothole-sweep opacity-0" />
      </svg>
    ),
    metrics: {
      loc: "3,900 LOC",
      speed: "~14 FPS on Pi 4",
      memory: "INT8 Quantised"
    }
  },
  {
    id: 5,
    title: "Cloud File Storage System",
    subtitle: "React + FastAPI + PostgreSQL + AWS S3",
    description: "A file storage web app where users can upload, organise, and download files backed by S3. Built the backend with FastAPI and PostgreSQL for metadata — filenames, sizes, upload timestamps, owner IDs. The frontend is React. Auth is JWT-based and every S3 operation goes through a presigned URL generated server-side.",
    images: [
      { src: "/assets/proj_cloud_1.jpg", caption: "Dashboard sidebar view — storage usage at 0.2%, file type breakdown visible" },
      { src: "/assets/proj_cloud_2.jpg", caption: "Full dashboard — total files, recent uploads, storage by type chart, and recent file list" },
    ],
    tech: ["React", "FastAPI", "PostgreSQL", "AWS S3", "JWT Auth", "Python"],
    challenges: "Concurrent uploads from the same user were occasionally writing duplicate metadata records because two requests would pass the uniqueness check at nearly the same time before either committed.",
    lessons: "Added a database-level unique constraint on (user_id, file_hash) and handled the constraint violation in the API layer to return a deduplicate response instead of a 500. Also moved to a transactional insert-then-upload order so metadata is never written for a file that fails to reach S3.",
    icon: <Cloud className="w-5 h-5 text-[#38BDF8]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#38BDF8] opacity-80" fill="none">
        <style>{`
          @keyframes cloud-pulse {
            0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px transparent); }
            50% { transform: scale(1.03); filter: drop-shadow(0 5px 15px rgba(56, 189, 248, 0.2)); stroke: #38BDF8; }
          }
          @keyframes data-stream-up {
            0% { stroke-dashoffset: 12; opacity: 0.3; }
            50% { opacity: 1; stroke: #38BDF8; filter: drop-shadow(0 0 3px #38BDF8); stroke-width: 2; }
            100% { stroke-dashoffset: 0; opacity: 0.3; }
          }
          @keyframes server-activity {
            0%, 100% { fill: transparent; stroke: currentColor; opacity: 0.5; }
            20% { fill: rgba(56, 189, 248, 0.2); stroke: #38BDF8; opacity: 1; filter: drop-shadow(0 0 5px #38BDF8); }
            40% { fill: transparent; stroke: currentColor; opacity: 0.5; }
          }
          @keyframes file-upload {
            0% { transform: translateY(10px) scale(0.5); opacity: 0; }
            30% { transform: translateY(0px) scale(1); opacity: 1; fill: #38BDF8; filter: drop-shadow(0 0 4px #38BDF8); }
            70% { transform: translateY(-15px) scale(1); opacity: 1; fill: #38BDF8; }
            100% { transform: translateY(-25px) scale(0.5); opacity: 0; }
          }
          .group:hover .cloud-body {
            animation: cloud-pulse 3s ease-in-out infinite;
            transform-origin: 50px 33px;
          }
          .group:hover .db-stream {
            stroke-dasharray: 4 4;
            animation: data-stream-up 1s linear infinite;
          }
          .group:hover .server-left { animation: server-activity 2.5s infinite; }
          .group:hover .server-right { animation: server-activity 2.5s infinite 1.25s; }
          .group:hover .file-node-1 { animation: file-upload 2s cubic-bezier(0.4, 0, 0.2, 1) infinite 0s; }
          .group:hover .file-node-2 { animation: file-upload 2s cubic-bezier(0.4, 0, 0.2, 1) infinite 1s; }
        `}</style>
        <path d="M 28 38 C 28 28, 42 22, 50 27 C 55 20, 72 22, 72 33 C 78 33, 82 38, 78 44 C 74 44, 26 44, 22 41 C 18 37, 22 33, 28 38 Z" stroke="currentColor" strokeWidth="1.5" className="cloud-body transition-colors duration-300" />
        
        {/* Upload Files */}
        <rect x="35" y="40" width="4" height="5" rx="1" stroke="none" className="file-node-1 opacity-0" />
        <rect x="61" y="42" width="4" height="5" rx="1" stroke="none" className="file-node-2 opacity-0" />

        <g className="db-stack">
          <ellipse cx="50" cy="55" rx="10" ry="3" stroke="currentColor" strokeWidth="1.5" />
          <line x1="40" y1="55" x2="40" y2="49" stroke="currentColor" strokeWidth="1.5" />
          <line x1="60" y1="55" x2="60" y2="49" stroke="currentColor" strokeWidth="1.5" />
          <ellipse cx="50" cy="49" rx="10" ry="3" stroke="currentColor" strokeWidth="1.5" />
        </g>
        
        <path d="M 50 44 L 50 49" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2,2" className="db-stream" />
        
        <rect x="13" y="27" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" className="server-left" />
        <line x1="15" y1="31" x2="19" y2="31" stroke="currentColor" strokeWidth="1" />
        <line x1="15" y1="35" x2="19" y2="35" stroke="currentColor" strokeWidth="1" />
        
        <rect x="79" y="27" width="8" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5" className="server-right" />
        <line x1="81" y1="31" x2="85" y2="31" stroke="currentColor" strokeWidth="1" />
        <line x1="81" y1="35" x2="85" y2="35" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    metrics: {
      loc: "4,200 LOC",
      speed: "Presigned URL auth",
      memory: "PostgreSQL + S3"
    }
  },
  {
    id: 7,
    title: "DevOps CI/CD Automation Pipeline",
    subtitle: "GitHub Actions + Docker + EC2 self-hosted runners",
    description: "Set up a full CI/CD pipeline for a Python web service — lint, test, build Docker image, push to ECR, and deploy to EC2 on every merge to main. Used GitHub Actions with a self-hosted runner on a t3.micro. Added a rollback stage that re-deploys the previous image tag if the health check fails post-deploy.",
    tech: ["GitHub Actions", "Docker", "AWS ECR", "EC2", "Nginx", "Bash"],
    challenges: "The self-hosted runner on the t3.micro kept running out of memory mid-build because Docker was pulling large base images and building in parallel with the running app. The instance would OOM-kill the runner process.",
    lessons: "Switched to sequential job steps instead of parallel, added a docker image prune step at the start of each run to clear old layers, and set a build memory limit via DOCKER_BUILD_ARGS. Builds now complete cleanly under 4 minutes.",
    icon: <CloudLightning className="w-5 h-5 text-[#A78BFA]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#A78BFA] opacity-80" fill="none">
        <style>{`
          @keyframes process-glow {
            0% { stroke: currentColor; fill: transparent; transform: scale(1); filter: drop-shadow(0 0 0px transparent); }
            10%, 30% { stroke: #A78BFA; fill: rgba(167, 139, 250, 0.2); transform: scale(1.1); filter: drop-shadow(0 0 8px #A78BFA); stroke-width: 1.5px; }
            40%, 100% { stroke: currentColor; fill: transparent; transform: scale(1); filter: drop-shadow(0 0 0px transparent); stroke-width: 1.3px; }
          }
          @keyframes link-flow {
            0% { stroke-dashoffset: 12; opacity: 0.3; stroke: currentColor; }
            10%, 30% { opacity: 1; stroke: #A78BFA; stroke-width: 2px; filter: drop-shadow(0 0 4px #A78BFA); }
            40%, 100% { stroke-dashoffset: 0; opacity: 0.3; stroke: currentColor; stroke-width: 1px; }
          }
          @keyframes rollback-flow {
            0% { stroke-dashoffset: 24; opacity: 0.2; }
            50% { opacity: 1; stroke: #EF4444; filter: drop-shadow(0 0 5px #EF4444); stroke-width: 1.5px; }
            100% { stroke-dashoffset: 0; opacity: 0.2; }
          }
          .group:hover .devops-box1 { animation: process-glow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite 0s; transform-origin: 13px 30px; }
          .group:hover .link-1 { stroke-dasharray: 4 4; animation: link-flow 4s linear infinite 0.4s; }
          .group:hover .devops-box2 { animation: process-glow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.8s; transform-origin: 35px 30px; }
          .group:hover .link-2 { stroke-dasharray: 4 4; animation: link-flow 4s linear infinite 1.2s; }
          .group:hover .devops-box3 { animation: process-glow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite 1.6s; transform-origin: 57px 30px; }
          .group:hover .link-3 { stroke-dasharray: 4 4; animation: link-flow 4s linear infinite 2.0s; }
          .group:hover .devops-box4 { animation: process-glow 4s cubic-bezier(0.4, 0, 0.2, 1) infinite 2.4s; transform-origin: 79px 30px; }
          
          .group:hover .rollback-path {
            stroke-dasharray: 4 4;
            animation: rollback-flow 2s linear infinite 3.5s;
            direction: rtl;
          }
        `}</style>
        {/* Pipeline flow: boxes connected by arrows */}
        <rect x="5" y="23" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" className="devops-box1" />
        <text x="13" y="31.5" textAnchor="middle" fontSize="4.5" fill="currentColor" opacity="0.9" className="font-mono">lint</text>
        <path d="M 21 30 L 27 30" stroke="currentColor" strokeWidth="1" className="link-1" />
        
        <rect x="27" y="23" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" className="devops-box2" />
        <text x="35" y="31.5" textAnchor="middle" fontSize="4.5" fill="currentColor" opacity="0.9" className="font-mono">test</text>
        <path d="M 43 30 L 49 30" stroke="currentColor" strokeWidth="1" className="link-2" />
        
        <rect x="49" y="23" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" className="devops-box3" />
        <text x="57" y="31.5" textAnchor="middle" fontSize="4.5" fill="currentColor" opacity="0.9" className="font-mono">build</text>
        <path d="M 65 30 L 71 30" stroke="currentColor" strokeWidth="1" className="link-3" />
        
        <rect x="71" y="23" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" className="devops-box4" />
        <text x="79" y="31.5" textAnchor="middle" fontSize="4.5" fill="currentColor" opacity="0.9" className="font-mono">deploy</text>
        
        {/* Rollback arrow */}
        <path d="M 79 37 Q 79 50 57 50 Q 35 50 35 37" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" opacity="0.3" className="rollback-path transition-colors duration-300" />
        <text x="57" y="56" textAnchor="middle" fontSize="4" fill="currentColor" opacity="0.5" className="font-mono">rollback</text>
      </svg>
    ),
    metrics: {
      loc: "~900 LOC config",
      speed: "< 4 min build",
      memory: "EC2 t3.micro"
    }
  },
  {
    id: 6,
    title: "Project ∞ — Hardware Frontier Lab",
    subtitle: "Lifelong pursuit of pushing silicon to its absolute limits",
    isLifeGoal: true,
    description: "A never-ending personal research initiative dedicated to breaking the boundaries of consumer hardware. From transplanting additional VRAM dies onto GPU PCBs, to booting custom microprocessors on hand-etched substrates, testing unlocked multipliers on locked CPUs via modified BIOSes, designing custom voltage regulators, and reverse-engineering proprietary firmware — this is the lab where physics meets obsession.",
    tech: ["VRAM Die Transplant", "Custom BIOS Mod", "CPU Unlocking", "PCB Design", "Microarch Research", "Firmware RE", "Voltage Modding", "JTAG Debugging", "Custom Microprocessors", "Silicon Validation"],
    challenges: "Every experiment is the challenge — from desoldering BGA packages under a hot-air rework station without killing the die, to writing bare-metal bootloaders for microarchitectures with zero public documentation.",
    lessons: "The goal is not a finish line — it's the accumulation of deep hardware intuition. Every burned chip, every failed BIOS flash, and every successful multiplier unlock is a lesson in how computing truly works at the transistor level.",
    icon: <Infinity className="w-5 h-5 text-[#F59E0B]" />,
    svgGraphic: (
      <svg viewBox="0 0 100 60" className="w-full h-full text-[#F59E0B] opacity-85" fill="none">
        <style>{`
          @keyframes draw-flow {
            to { stroke-dashoffset: -40; }
          }
          @keyframes infinity-glow {
            0%, 100% { filter: drop-shadow(0 0 2px rgba(245, 158, 11, 0.4)); stroke: currentColor; }
            50% { filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.8)); stroke: #F59E0B; }
          }
          @keyframes particle-orbit {
            0% { transform: rotate(0deg) translateX(12px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; fill: #FCD34D; filter: drop-shadow(0 0 4px #FCD34D); }
            90% { opacity: 1; }
            100% { transform: rotate(360deg) translateX(12px) rotate(-360deg); opacity: 0; }
          }
          @keyframes component-flash {
            0%, 100% { opacity: 0.2; transform: scale(1); filter: drop-shadow(0 0 0px transparent); }
            50% { opacity: 1; fill: #F59E0B; transform: scale(1.5); filter: drop-shadow(0 0 6px #F59E0B); }
          }
          @keyframes power-line {
            0% { stroke-dashoffset: 20; opacity: 0.1; }
            50% { opacity: 0.8; stroke: #F59E0B; }
            100% { stroke-dashoffset: 0; opacity: 0.1; }
          }
          .group:hover .infinity-flow {
            stroke-dasharray: 8 6;
            animation: draw-flow 1.2s linear infinite, infinity-glow 3s ease-in-out infinite;
          }
          .group:hover .led-soc1 {
            animation: component-flash 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: 30px 30px;
          }
          .group:hover .led-soc2 {
            animation: component-flash 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.75s;
            transform-origin: 70px 30px;
          }
          .group:hover .power-track {
            stroke-dasharray: 4 4;
            animation: power-line 1.5s linear infinite;
          }
          .group:hover .orbit-1 { animation: particle-orbit 2s linear infinite; transform-origin: 30px 30px; }
          .group:hover .orbit-2 { animation: particle-orbit 2s linear infinite 1s; transform-origin: 70px 30px; }
        `}</style>
        <path
          d="M 50 30 C 50 22, 38 16, 30 22 C 22 28, 22 32, 30 38 C 38 44, 50 38, 50 30 C 50 22, 62 16, 70 22 C 78 28, 78 32, 70 38 C 62 44, 50 38, 50 30 Z"
          stroke="currentColor"
          strokeWidth="1.8"
          fill="none"
          className="infinity-flow transition-colors duration-500"
        />
        
        {/* Orbital particles */}
        <circle cx="30" cy="30" r="1.5" className="orbit-1 opacity-0" />
        <circle cx="70" cy="30" r="1.5" className="orbit-2 opacity-0" />
        
        <circle cx="30" cy="30" r="2.5" fill="currentColor" className="led-soc1" />
        <circle cx="70" cy="30" r="2.5" fill="currentColor" className="led-soc2" />
        
        <line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" strokeWidth="1" className="power-track opacity-30" />
        <line x1="10" y1="10" x2="90" y2="10" stroke="currentColor" strokeWidth="1" className="power-track opacity-30" />
        <rect x="8" y="7" width="6" height="6" rx="1" fill="transparent" stroke="currentColor" strokeWidth="1" className="opacity-50" />
        <rect x="86" y="47" width="6" height="6" rx="1" fill="transparent" stroke="currentColor" strokeWidth="1" className="opacity-50" />
      </svg>
    ),
    metrics: {
      loc: "∞ Experiments",
      speed: "Beyond Spec",
      memory: "Timeline: ∞"
    }
  }
];

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const openProject = (proj: Project) => {
    setGalleryIndex(0);
    setSelectedProject(proj);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <div className="py-20 container mx-auto px-6 relative overflow-hidden">
      
      {/* Sonar Radar Background Waves */}
      <div className="absolute top-10 right-10 w-40 h-40 rounded-full border border-accent/15 -z-10 pointer-events-none animate-sonar-wave" />
      <div className="absolute bottom-10 left-10 w-52 h-52 rounded-full border border-accent/10 -z-10 pointer-events-none animate-sonar-wave" style={{ animationDelay: "3s" }} />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* Telemetry Subtitle */}
        <div className="flex items-center gap-6 mb-10 text-[10px] text-muted font-mono select-none">
          <span>DEPLOYED SERVICES: 5</span>
          <span>•</span>
          <span>ON EDGE TARGETS: 1</span>
          <span>•</span>
          <span>LIFE GOAL PROJECTS: ∞</span>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {PROJECTS.map((proj) => (
            <motion.div
              key={proj.id}
              variants={cardVariants}
              className={proj.isLifeGoal ? "md:col-span-2" : ""}
            >
              <SpotlightCard
                onClick={() => openProject(proj)}
                glowColor={proj.isLifeGoal ? "#F59E0B" : undefined}
                className={`rounded-xl p-6 cursor-pointer flex flex-col justify-between group h-80 relative overflow-hidden ${
                  proj.isLifeGoal
                    ? "border border-[#F59E0B]/20 shadow-[0_0_40px_rgba(245,158,11,0.06)] hover:shadow-[0_0_60px_rgba(245,158,11,0.12)] hover:border-[#F59E0B]/40"
                    : ""
                }`}
              >
                {/* Graphic Illustration */}
                <div className="w-full h-24 mb-4 bg-[#0D1017]/80 rounded-lg flex items-center justify-center border border-glass-border/40 overflow-hidden relative">
                  {proj.isLifeGoal ? (
                    <div className="w-full h-full flex items-center justify-center relative">
                      {proj.svgGraphic}
                      {/* Infinity badge */}
                      <span className="absolute top-2 right-2 text-[11px] font-extrabold tracking-widest bg-[#F59E0B]/15 border border-[#F59E0B]/40 text-[#F59E0B] px-2.5 py-0.5 rounded-full animate-pulse select-none">
                        ∞
                      </span>
                      <span className="absolute top-2 left-2 text-[8px] uppercase tracking-wider font-bold text-[#F59E0B]/60 select-none">LIFE GOAL</span>
                    </div>
                  ) : (
                    <>
                      {proj.svgGraphic}
                      {proj.status && (
                        <span className="absolute top-2 right-2 text-[9px] uppercase tracking-wider font-extrabold bg-[#FF5F56]/15 border border-[#FF5F56]/30 text-[#FF5F56] px-2 py-0.5 rounded-full">
                          {proj.status}
                        </span>
                      )}
                    </>
                  )}
                </div>

                <div className={proj.isLifeGoal ? "flex flex-row items-start justify-between gap-6" : ""}>
                  <div className={proj.isLifeGoal ? "flex-1" : ""}>
                    {/* Meta details */}
                    <div className="flex items-center gap-2.5 mb-1.5">
                      <div className={`p-1.5 rounded-md border border-glass-border ${
                        proj.isLifeGoal ? "bg-[#F59E0B]/10 border-[#F59E0B]/20" : "bg-white/5"
                      }`}>
                        {proj.icon}
                      </div>
                      <h3 className={`text-base font-bold transition-colors ${
                        proj.isLifeGoal
                          ? "text-[#F59E0B] group-hover:text-[#FCD34D]"
                          : "text-text group-hover:text-accent"
                      }`}>
                        {proj.title}
                      </h3>
                    </div>
                    <p className="text-xs text-muted font-medium mb-4">{proj.subtitle}</p>
                  </div>

                  {/* Tech Tags */}
                  <div className={`flex flex-wrap gap-1.5 ${
                    proj.isLifeGoal ? "mt-0 max-w-sm" : "mt-auto"
                  }`}>
                    {proj.tech.slice(0, proj.isLifeGoal ? 6 : 3).map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`text-[10px] border px-2 py-0.5 rounded font-medium ${
                          proj.isLifeGoal
                            ? "bg-[#F59E0B]/5 border-[#F59E0B]/20 text-[#F59E0B]/80"
                            : "bg-white/5 border-glass-border text-muted"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                    {proj.tech.length > (proj.isLifeGoal ? 6 : 3) && (
                      <span className={`text-[10px] font-semibold px-1 py-0.5 ${
                        proj.isLifeGoal ? "text-[#F59E0B]" : "text-accent"
                      }`}>
                        +{proj.tech.length - (proj.isLifeGoal ? 6 : 3)} more
                      </span>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Project Details Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-[#0D1017]/90 backdrop-blur-sm"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="glass-panel w-full max-w-xl rounded-xl border-glass-border overflow-hidden relative shadow-2xl z-10 flex flex-col max-h-[85vh] bg-[#0D1017]/95"
              >
                {/* Header */}
                <div className="p-5 border-b border-glass-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white/5 border border-glass-border">
                      {selectedProject.icon}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-bold text-text">{selectedProject.title}</h3>
                      <p className="text-xs text-muted">{selectedProject.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-muted hover:text-text p-1.5 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-5 text-sm leading-relaxed text-muted">
                  
                  {/* Life Goal Banner */}
                  {selectedProject.isLifeGoal && (
                    <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/25 p-3 rounded-lg text-xs text-[#F59E0B] font-medium flex items-center gap-2">
                      <Infinity className="w-4 h-4 flex-shrink-0" />
                      <span>This is a lifelong pursuit — no end date. Timeline: <strong>∞</strong></span>
                    </div>
                  )}

                  {/* Status Banner */}
                  {selectedProject.status && !selectedProject.isLifeGoal && (
                    <div className="bg-[#FF5F56]/10 border border-[#FF5F56]/20 p-2.5 rounded-lg text-xs text-[#FF5F56] font-medium flex items-center gap-2">
                      <Construction className="w-4 h-4" /> Currently in Development phase
                    </div>
                  )}

                  {/* Telemetry Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 bg-[#0D1017]/60 border border-glass-border/40 p-3.5 rounded-lg text-center font-mono select-none">
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Scale</span>
                      <span className={`text-xs font-bold ${selectedProject.isLifeGoal ? "text-[#F59E0B]" : "text-accent"}`}>{selectedProject.metrics.loc}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Performance</span>
                      <span className="text-xs font-bold text-[#27C93F]">{selectedProject.metrics.speed}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase text-muted mb-0.5">Infrastructure</span>
                      <span className="text-xs font-bold text-[#FFBD2E]">{selectedProject.metrics.memory}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-2">Overview</h4>
                    <p>{selectedProject.description}</p>
                  </div>

                  {/* Photo Gallery */}
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <div>
                      <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5" /> Project Photos
                      </h4>
                      <div className="relative rounded-xl overflow-hidden border border-glass-border/40 bg-[#0D1017]/60">
                        {/* Main Image */}
                        <div className="relative w-full" style={{ aspectRatio: '16/10' }}>
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={galleryIndex}
                              src={selectedProject.images[galleryIndex].src}
                              alt={selectedProject.images[galleryIndex].caption}
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -20 }}
                              transition={{ duration: 0.25 }}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </AnimatePresence>
                          {/* Nav arrows */}
                          {selectedProject.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); setGalleryIndex(i => (i - 1 + selectedProject.images!.length) % selectedProject.images!.length); }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0D1017]/70 border border-glass-border/50 flex items-center justify-center text-text hover:bg-[#0D1017] transition-colors backdrop-blur-sm"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); setGalleryIndex(i => (i + 1) % selectedProject.images!.length); }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#0D1017]/70 border border-glass-border/50 flex items-center justify-center text-text hover:bg-[#0D1017] transition-colors backdrop-blur-sm"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                        {/* Caption + dots */}
                        <div className="px-3 py-2.5 border-t border-glass-border/30">
                          <p className="text-[11px] text-muted leading-relaxed">{selectedProject.images[galleryIndex].caption}</p>
                          {selectedProject.images.length > 1 && (
                            <div className="flex gap-1.5 mt-2">
                              {selectedProject.images.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setGalleryIndex(i)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    i === galleryIndex ? "bg-accent w-4" : "bg-white/20 hover:bg-white/40"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* No-photo joke placeholder — for projects without images that aren't the life goal */}
                  {!selectedProject.images && !selectedProject.isLifeGoal && (
                    <div>
                      <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <Images className="w-3.5 h-3.5" /> Project Photos
                      </h4>
                      <div className="rounded-xl border border-dashed border-glass-border/50 bg-[#0D1017]/40 overflow-hidden">
                        {/* Empty frame */}
                        <div className="w-full flex flex-col items-center justify-center gap-3 py-8 px-6">
                          <span className="text-4xl select-none">📷</span>
                          <p className="text-xs text-center text-muted/70 leading-relaxed max-w-xs italic">
                            "I never had the brilliant idea to photograph any of these projects after I built them, so... when I get a photo I'll update this 😅 lol"
                          </p>
                          <span className="text-[10px] font-mono text-muted/40 border border-glass-border/30 px-2 py-0.5 rounded">photos: null // TODO: own a camera</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Challenges Section */}
                  <div className="bg-[#FFBD2E]/5 border border-[#FFBD2E]/10 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-[#FFBD2E] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <HelpCircle className="w-4 h-4" /> Challenge Faced
                    </h4>
                    <p className="text-xs text-[#FFBD2E]/90">{selectedProject.challenges}</p>
                  </div>

                  {/* Lessons Learned Section */}
                  <div className="bg-[#27C93F]/5 border border-[#27C93F]/10 p-4 rounded-lg">
                    <h4 className="text-xs font-bold text-[#27C93F] uppercase tracking-wider flex items-center gap-1.5 mb-2">
                      <BookOpen className="w-4 h-4" /> Engineering Lesson
                    </h4>
                    <p className="text-xs text-[#27C93F]/90">{selectedProject.lessons}</p>
                  </div>

                  {/* Full Tech Stack */}
                  <div>
                    <h4 className="text-xs font-bold text-text uppercase tracking-wider mb-2.5">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-[#0D1017] border border-glass-border px-3 py-1 rounded-md text-text font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
