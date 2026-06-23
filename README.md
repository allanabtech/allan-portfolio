# 🌌 Allan's Engineering Portfolio & R&D Playground

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.0-F107A3?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Welcome to my personal portfolio—a high-performance, fully interactive web application showcasing my engineering journey across **Artificial Intelligence, Embedded Systems, Cloud/DevOps, and Robotics**. 

Rather than a static, resume-style page, this website serves as a live demonstration of modern web engineering, hardware design, and interactive system design, complete with custom terminal emulation, retro mini-games, dynamic micro-animations, and a gamified achievements engine.

---

## ⚡ Core Highlights & Architectural Features

### 🎮 Gamified Achievement Engine
* Includes a custom, global React-Context-based achievement system tracker.
* Visitors unlock badges (e.g., **Curious Explorer**, **Senior Debugger**, **Terminal Hacker**) by interacting with the site.
* Features native **Audio Synthesis (Web Audio API)** for rewarding retro sound indicators upon unlock, combined with dynamic `canvas-confetti` bursts.
* Persistent state management utilizing `localStorage` to save unlocked achievements across sessions.

### 💻 Retro R&D Terminal
* A functional, inline UNIX-like CLI shell (`allan-dev-terminal`) allowing command-line discovery of portfolio details.
* Supported commands: `help`, `about`, `skills`, `projects`, `certifications`, `mission`, `joke`, `clear`, and `portfolio --future`.
* Try executing `sudo hire-allan` to trigger a simulated cryptographic key check, loading bars, and status elevation.

### 🪲 Live Bug Squashing System
* To represent software debugging in a visual format, literal crawling bugs wander around the screen.
* Visitors can chase and click to squash them (playing a custom audio pop), updating local states to earn the **Senior Debugger** achievement after squashing 10 bugs.

### 📖 Post-Mortem Failure Log
* A dedicated workspace section documenting real engineering failures, lessons learned, and resolutions.
* Features details on sensor threshold drift, serverless timeout bottlenecks, interrupt stack crashes, and a notorious hardware modding incident (where an optimistic VRAM upgrade resulted in board meltdowns).

---

## 🛠️ Technology Stack & Engineering Design

This portfolio is built with modern framework components and styling strategies for sub-millisecond responsiveness and buttery-smooth FPS:

* **Next.js 16 (App Router)** & **React 19** for optimized routing and layout rendering.
* **Tailwind CSS v4** & **Vanilla CSS variables** for fluid styling, modern HSL-tailored colors, and glassmorphic layers.
* **Framer Motion 12** for smooth transitions and state-based visual entries.
* **Performance Optimizations**:
  * Offloads heavy background calculations to avoid main-thread blocking.
  * Employs GPU-accelerated css properties (`will-change: transform`, `transform: translateZ(0)`) to pre-promote animated elements to separate compositor layers, eliminating scroll jitter during complex transitions.

---

## 📁 Repository Structure

```src
├── app/
│   ├── globals.css           # Core styling tokens, responsive variables & compositor animations
│   ├── layout.tsx            # Global HTML wrappers & providers
│   └── page.tsx              # Application layout compiling sections into a single scroll flow
├── components/
│   ├── AchievementContext.tsx# Core state-machine tracking easter eggs & achievements
│   ├── AchievementToast.tsx  # Interactive pop-ups for achievement unlocks
│   ├── LoadingScreen.tsx     # Animated bootloader sequence bypassable after initial visit
│   ├── Navbar.tsx            # Floating glassmorphic navigation controller
│   ├── Terminal.tsx          # UNIX-style interactive terminal emulator
│   ├── XOGame.tsx            # Interactive Tic-Tac-Toe game with mini AI logic
│   ├── RPSGame.tsx           # Interactive Rock-Paper-Scissors game
│   ├── Quiz.tsx              # Interactive Technical Engineering Quiz
│   └── sections/             # Modular UI layouts:
│       ├── HeroSection.tsx   # Matrix code-rain & animated aurora landing page
│       ├── AboutSection.tsx  # Developer story & dynamic SVG circuit boards
│       ├── SkillsSection.tsx # Technical taxonomy organized by domain cards
│       ├── ProjectsSection.tsx# High-impact engineering project showcases
│       ├── LabSection.tsx    # Live & archived bench experiments logs
│       ├── FailureLogSection.tsx # Post-mortem incident registry
│       ├── TimelineSection.tsx# Interactive journey chronological index
│       ├── MissionSection.tsx# A day in the life schedule wheel
│       ├── CertificationsSection.tsx # Verified credentials log
│       └── PlaygroundSection.tsx # Portal hosting games & quizzes
```

---

## 🤖 Featured Projects Showcased

The website highlights real-world hardware, systems, and automation projects:

1. **Autonomous Navigation Bot**
   * *Stack*: Arduino Uno, C++, IR/Ultrasonic sensors, PID control.
   * *Concept*: A crawler robot executing obstacle avoidance and live path planning via sensor-fusion algorithms.
2. **Multi-Sensor Embedded Framework**
   * *Stack*: STM32, C/Assembly, GPIO interrupts, I2C/SPI bus.
   * *Concept*: An interrupt-driven sensor hub with custom stack management to avoid sensor starvation during microsecond priority collisions.
3. **ML Model Inference Pipeline**
   * *Stack*: PyTorch, AWS Lambda, Amazon SQS, EC2, S3.
   * *Concept*: A serverless-driven async job queuing system separating web request layers from heavy GPU inference jobs to drop latency under 3 seconds.
4. **Edge CV Pothole Severity Mapper**
   * *Stack*: PyTorch, OpenCV, Raspberry Pi 4, GPS module.
   * *Concept*: Real-time computer vision mapping road damage on quantized neural nets running at ~14 FPS at normal vehicle speeds.
5. **Cloud Storage Engine**
   * *Stack*: React, FastAPI, PostgreSQL, AWS S3.
   * *Concept*: A multi-tenant file cloud hosting dashboard using secure S3 presigned URLs, deduplication hashes, and transaction-safe database writes.
6. **Dockerized CI/CD Deployment Runner**
   * *Stack*: GitHub Actions, Docker ECR/ECS, Nginx, Linux Shell.
   * *Concept*: Self-hosted pipeline automation on EC2 instances with automatic layer caching and auto-rollback health check states.

---

## 🧬 Engineering Lab & Experiments

In the **Engineering Lab** section of the portfolio, I maintain logs of active research and experiments:
* **AI/ML Bench**: Local training logs, image classification, custom loss weight models.
* **AWS & Infrastructure**: Terraform scripts, CloudWatch log aggregation architectures, IAM policies simulation.
* **Linux Workspace Daily-Driver**: System kernel adjustments (`sysctl`), networking configuration modifications, socket buffers optimization.
* **Hardware Bench Work**: PCB soldering, logic analyzer timing charts, physical input signal debouncers (hardware capacitors + software filters).

---

## 🎯 Play & Interact (Playground Section)

To showcase React state coordination, I built the **Engineering Playground** holding three modular mini-games:
* **Tech Quiz**: A randomized 10-question technical challenge covering AI, Cloud, DevOps, and hardware internals.
* **Play Tic-Tac-Toe**: Fight against a Minimax-inspired AI agent block algorithm.
* **Rock, Paper, Scissors**: Relive classic hand battles against RNG algorithms.

---

*Compiled and engineered with passion. Feel free to explore the code, unlock all achievements, or run commands on the terminal.*
