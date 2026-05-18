"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiRemix,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiGreensock,
  SiFramer,
  SiThreedotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPrisma,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiMongoose,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { TbApi } from "react-icons/tb";
import type { IconType } from "react-icons";

interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

interface TechCategory {
  title: string;
  code: string;
  accent: string;
  accentGlow: string;
  items: TechItem[];
}

const categories: TechCategory[] = [
  {
    title: "Frontend",
    code: "FE",
    accent: "text-violet-400",
    accentGlow: "167,139,250",
    items: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Remix", icon: SiRemix, color: "#ffffff" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
    ],
  },
  {
    title: "Animation",
    code: "MO",
    accent: "text-emerald-400",
    accentGlow: "52,211,153",
    items: [
      { name: "GSAP", icon: SiGreensock, color: "#88CE02" },
      { name: "Framer", icon: SiFramer, color: "#0055FF" },
      { name: "Three.js", icon: SiThreedotjs, color: "#ffffff" },
      { name: "R3F", icon: SiReact, color: "#61DAFB" },
    ],
  },
  {
    title: "Backend",
    code: "BE",
    accent: "text-amber-400",
    accentGlow: "251,191,36",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
      { name: "Express", icon: SiExpress, color: "#ffffff" },
      { name: "Java", icon: FaJava, color: "#ED8B00" },
      { name: "REST", icon: TbApi, color: "#FF6C37" },
    ],
  },
  {
    title: "Database",
    code: "DB",
    accent: "text-pink-400",
    accentGlow: "244,114,182",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
      { name: "Mongoose", icon: SiMongoose, color: "#880000" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748" },
    ],
  },
  {
    title: "DevOps",
    code: "OPS",
    accent: "text-cyan-400",
    accentGlow: "34,211,238",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff" },
      { name: "Docker", icon: SiDocker, color: "#2496ED" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff" },
    ],
  },
];

function TechIcon({ item, accentGlow }: { item: TechItem; accentGlow: string }) {
  const Icon = item.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group relative flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 md:p-4 cursor-default"
    >
      {/* Glow backdrop on hover */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, rgba(${accentGlow}, 0.12) 0%, transparent 70%)`,
        }}
      />

      {/* Icon container */}
      <div className="relative z-10 flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg sm:rounded-xl bg-white/[0.04] border border-white/[0.08] group-hover:border-white/[0.2] group-hover:bg-white/[0.08] transition-all duration-300">
        <Icon
          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-all duration-300 opacity-70 group-hover:opacity-100"
          style={{ color: item.color }}
        />
      </div>

      {/* Label */}
      <span className="relative z-10 text-[8px] sm:text-[9px] md:text-[10px] font-mono text-white/40 group-hover:text-white/80 transition-colors duration-300 tracking-wide text-center leading-tight">
        {item.name}
      </span>
    </motion.div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      data-section="tech-stack"
      className="relative w-full py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1100px] mx-auto px-5 sm:px-6 md:px-12">
        {/* Section header */}
        <div data-tech-header className="mb-10 sm:mb-14 md:mb-20">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="h-px flex-1 max-w-8 sm:max-w-12 bg-linear-to-r from-transparent to-white/20" />
            <span className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/30 font-mono">
              Tech Stack
            </span>
            <div className="h-px flex-1 max-w-8 sm:max-w-12 bg-linear-to-l from-transparent to-white/20" />
          </div>

          <h2
            style={{ fontFamily: "var(--font-passero), sans-serif" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-linear-to-r from-white/90 via-white/70 to-white/50 bg-clip-text text-transparent"
          >
            Tools & Technologies
          </h2>
        </div>

        {/* Category grid */}
        <div data-tech-grid className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {categories.map((category) => (
            <div
              key={category.code}
              data-category
              className={`relative p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm ${
                category.code === "FE" ? "sm:col-span-2" : ""
              }`}
            >
              {/* Category label */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4 md:mb-5">
                <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${category.accent.replace("text-", "bg-")}`} />
                <span className={`text-[9px] sm:text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] ${category.accent} opacity-70`}>
                  {category.title}
                </span>
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-[7px] sm:text-[8px] font-mono text-white/15 tracking-widest">
                  {category.code}
                </span>
              </div>

              {/* Icons row */}
              <div className={`grid ${
                category.code === "FE"
                  ? "grid-cols-3 sm:grid-cols-6"
                  : "grid-cols-4"
              }`}>
                {category.items.map((item) => (
                  <TechIcon
                    key={item.name}
                    item={item}
                    accentGlow={category.accentGlow}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
