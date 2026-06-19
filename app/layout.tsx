import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AchievementProvider } from "@/components/AchievementContext";
import ParticleBackground from "@/components/ParticleBackground";
import AchievementToast from "@/components/AchievementToast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allan Abraham | AI, Cloud & DevOps Solutions",
  description:
    "Professional portfolio of Allan Abraham, software engineer specializing in AI/ML, Cloud Computing, DevOps automation, and robotics solutions.",
  keywords: [
    "Allan Abraham",
    "DevOps Engineer",
    "Cloud Solutions Architect",
    "Artificial Intelligence",
    "Robotics",
    "Embedded Systems",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-text">
        <AchievementProvider>
          <ParticleBackground />
          {children}
          <AchievementToast />
        </AchievementProvider>
      </body>
    </html>
  );
}
