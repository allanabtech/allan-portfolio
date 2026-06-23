# 🌌 Allan's Engineering Portfolio & R&D Playground

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4.0-F107A3?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

Welcome to my portfolio! This is basically a live sandbox of things I've built, broken, and eventually fixed across **Artificial Intelligence, Embedded Systems, Cloud/DevOps, and Robotics**. 

Instead of a boring, static resume that just lists bullet points, I built this as a high-performance playground where you can run actual terminal commands, unlock achievements, play retro mini-games, and look at my real-world post-mortems (yes, including the time I set a motherboard on fire).

---

## ⚡ Interactive Easter Eggs & Features

### 🎮 Gamified Achievement Engine
* A global React-Context system that tracks what you do on the site.
* If you find hidden easter eggs, squash bugs, or hack the terminal, it triggers custom retro synth-audio alerts (synthesized using the Web Audio API because loading MP3s is bloat) and fires confetti at your screen.
* Unlocked badges save straight to your `localStorage` so you don't lose your hard-earned progress.

### 💻 Retro R&D Terminal
* An inline UNIX-like CLI shell (`allan-dev-terminal`) for people who hate clicking buttons.
* Supported commands: `help`, `about`, `skills`, `projects`, `certifications`, `mission`, `joke`, `clear`, and `portfolio --future`.
* Try running `sudo hire-allan` to trigger a simulated cryptographic key check, loading progress bars, and status elevation.

### 🪲 Live Bug Squashing System
* To make debugging visual (and frustrating), I have literal bugs crawling around the screen.
* You can chase and click to squash them (plays a satisfying pop sound). Squash 10 of them to earn the **Senior Debugger** badge. No JIRA ticket required.

### 📖 Post-Mortem Failure Log
* A section dedicated to things that did *not* go according to plan.
* Covers sensor threshold drift, serverless timeout bottlenecks, interrupt stack crashes, and the infamous hardware modding incident where a VRAM upgrade resulted in motherboard suicide.

---

## 🛠️ Technology Stack & Engineering Design

I designed this site to run at a smooth 60 FPS without turning your laptop fan into a jet engine:

* **Next.js 16 (App Router)** & **React 19** for overall structure.
* **Tailwind CSS v4** & **Vanilla CSS variables** for dark-mode colors, custom scrollbars, and frosted glass layers.
* **Framer Motion 12** for smooth transitions and state-based entries.
* **Scroll Jitter Prevention**: Reduced particle counts, streamlined rain columns, and added GPU-level CSS properties (`will-change: transform`, `transform: translateZ(0)`) to force the browser to pre-promote animated blocks to their own compositor layers before scroll starts. Smooth scrolling only.

---

## 📁 Repository Structure

```src
├── app/
│   ├── globals.css           # Custom theme tokens & performance-tuned CSS keyframes
│   ├── layout.tsx            # Global HTML wrappers & state providers
│   └── page.tsx              # Application layout compiling sections into a single scroll flow
├── components/
│   ├── AchievementContext.tsx# The state-machine tracking your easter eggs & achievements
│   ├── AchievementToast.tsx  # Dynamic pop-ups for achievement unlocks
│   ├── LoadingScreen.tsx     # Animated bootloader sequence (bypassed if you visit again)
│   ├── Navbar.tsx            # Floating glassmorphic navigation controller
│   ├── Terminal.tsx          # UNIX-style interactive terminal emulator
│   ├── XOGame.tsx            # Interactive Tic-Tac-Toe game with mini-AI logic
│   ├── RPSGame.tsx           # Interactive Rock-Paper-Scissors game
│   ├── Quiz.tsx              # Interactive Technical Engineering Quiz
│   └── sections/             # Modular UI layouts:
│       ├── HeroSection.tsx   # Matrix code-rain & animated aurora landing page
│       ├── AboutSection.tsx  # Developer story & dynamic SVG circuit boards
│       ├── SkillsSection.tsx # Technical skills categorized by card layouts
│       ├── ProjectsSection.tsx# High-impact engineering project showcases
│       ├── LabSection.tsx    # Live & archived bench experiments logs
│       ├── FailureLogSection.tsx # Post-mortem incident registry (the wall of mistakes)
│       ├── TimelineSection.tsx# Interactive journey timeline
│       ├── MissionSection.tsx# "A Day in the Life" routine & anime carousel
│       ├── CertificationsSection.tsx # Verified credentials log (43 real courses)
│       └── PlaygroundSection.tsx # Portal hosting games, quizzes & dev quotes
```

---

## 🤖 Featured Projects Showcased

Actual projects I've built (no generic templates or placeholders here):

1. **Autonomous Navigation Bot**
   * *Stack*: Arduino Uno, C++, IR/Ultrasonic sensors, PID control.
   * *Concept*: A two-wheeled robot executing obstacle avoidance and live path planning. Added a Kalman filter because IR sensors got confused by dark surfaces and fluorescent lights.
2. **Multi-Sensor Embedded Framework**
   * *Stack*: STM32, C/Assembly, GPIO interrupts, I2C/SPI bus.
   * *Concept*: An interrupt-driven sensor hub. Solved microsecond interrupt priority locks by replacing blocking loops with a volatile register flag system.
3. **ML Model Inference Pipeline**
   * *Stack*: PyTorch, AWS Lambda, Amazon SQS, EC2, S3.
   * *Concept*: A serverless-driven async job queuing system. Solved a 20-second Lambda cold start by moving the weights to warm EC2 containers fed via SQS. Latency dropped under 3 seconds.
4. **Edge CV Pothole Severity Mapper**
   * *Stack*: PyTorch, OpenCV, Raspberry Pi 4, GPS module.
   * *Concept*: Real-time computer vision mapping road damage. Runs a quantized INT8 MobileNet model at ~14 FPS on the road.
5. **Cloud Storage Engine**
   * *Stack*: React, FastAPI, PostgreSQL, AWS S3.
   * *Concept*: A file cloud hosting dashboard using secure S3 presigned URLs. Handled concurrent duplicate uploads via database-level unique constraints.
6. **Dockerized CI/CD Deployment Runner**
   * *Stack*: GitHub Actions, Docker ECR/ECS, Nginx, Linux Shell.
   * *Concept*: Automated pipeline deploying to AWS EC2. Had to limit build memory and prune old Docker layers on the runner because the self-hosted t3.micro kept running out of RAM and dying mid-build.

---

## 🧬 Engineering Lab & Experiments

A place where I log work-in-progress research and experiments:
* **AI/ML Bench**: Local training logs, class weight tuning, and YOLOv8 object detection.
* **AWS & Infrastructure**: Messing with IAM policies (using simulators to avoid breaking access) and automation via Terraform.
* **Linux Workspace Daily-Driver**: Tinkering with Ubuntu, bash scripts, and occasionally tweaking system socket buffer sizes (`sysctl`) until the connection drops.
* **Hardware Bench Work**: Soldering custom boards, using logic analyzers, and fixing noisy buttons with 100nF capacitors.

---

## 🎯 Play & Interact (Playground Section)

React state experiments masquerading as games:
* **Tech Quiz**: A randomized 5-question challenge pulled from a pool of 52 questions on AI, Cloud, DevOps, and hardware.
* **Play Tic-Tac-Toe**: Fight against a Minimax-inspired AI agent block algorithm.
* **Rock, Paper, Scissors**: Relive classic schoolyard fights against an RNG algorithm.

---

*Compiled and engineered with passion. Feel free to explore the code, unlock all achievements, or run commands on the terminal.*
