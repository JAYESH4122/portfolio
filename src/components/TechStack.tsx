"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
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
  code: string;
}

interface TechCategory {
  title: string;
  sysCode: string;
  accent: string;
  accentRgb: string;
  items: TechItem[];
}

const categories: TechCategory[] = [
  {
    title: "Frontend Architecture",
    sysCode: "FE_SYS",
    accent: "text-violet-400",
    accentRgb: "167,139,250",
    items: [
      { name: "Next.js", icon: SiNextdotjs, color: "#ffffff", code: "NXT.15" },
      { name: "React", icon: SiReact, color: "#61DAFB", code: "RCT.19" },
      { name: "Remix", icon: SiRemix, color: "#ffffff", code: "RMX.02" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6", code: "TS.5.4" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", code: "JS.ES6" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4", code: "TW.4.0" },
    ],
  },
  {
    title: "Motion & 3D",
    sysCode: "MO_SYS",
    accent: "text-emerald-400",
    accentRgb: "52,211,153",
    items: [
      { name: "GSAP", icon: SiGreensock, color: "#88CE02", code: "GS.3.12" },
      { name: "Framer Motion", icon: SiFramer, color: "#0055FF", code: "FM.11" },
      { name: "Three.js", icon: SiThreedotjs, color: "#ffffff", code: "3JS.R16" },
      { name: "React Three Fiber", icon: SiReact, color: "#61DAFB", code: "R3F.8.0" },
    ],
  },
  {
    title: "Backend & Runtime",
    sysCode: "BE_SYS",
    accent: "text-amber-400",
    accentRgb: "251,191,36",
    items: [
      { name: "Node.js", icon: SiNodedotjs, color: "#339933", code: "ND.22" },
      { name: "Express.js", icon: SiExpress, color: "#ffffff", code: "EX.4.19" },
      { name: "Java", icon: FaJava, color: "#ED8B00", code: "JV.21" },
      { name: "REST API", icon: TbApi, color: "#FF6C37", code: "API.V2" },
    ],
  },
  {
    title: "Databases & ORM",
    sysCode: "DB_SYS",
    accent: "text-pink-400",
    accentRgb: "244,114,182",
    items: [
      { name: "MongoDB", icon: SiMongodb, color: "#47A248", code: "MG.7.0" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", code: "PG.16" },
      { name: "Mongoose", icon: SiMongoose, color: "#880000", code: "MGS.8" },
      { name: "Prisma", icon: SiPrisma, color: "#2D3748", code: "PRM.5" },
    ],
  },
  {
    title: "DevOps & Tooling",
    sysCode: "OP_SYS",
    accent: "text-cyan-400",
    accentRgb: "34,211,238",
    items: [
      { name: "Git", icon: SiGit, color: "#F05032", code: "GIT.2.4" },
      { name: "GitHub", icon: SiGithub, color: "#ffffff", code: "GH.ENT" },
      { name: "Docker", icon: SiDocker, color: "#2496ED", code: "DKR.25" },
      { name: "Vercel", icon: SiVercel, color: "#ffffff", code: "VCL.PRO" },
    ],
  },
];

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";

function useTextScramble(text: string, isActive: boolean) {
  const [display, setDisplay] = useState(text);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!isActive) {
      setDisplay(text);
      return;
    }

    let iteration = 0;
    const maxIterations = text.length;

    const scramble = () => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (i < iteration) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );

      iteration += 1 / 2;

      if (iteration <= maxIterations) {
        frameRef.current = requestAnimationFrame(scramble);
      }
    };

    frameRef.current = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(frameRef.current);
  }, [isActive, text]);

  return display;
}

function Crosshairs({ visible }: { visible: boolean }) {
  return (
    <>
      <motion.span
        initial={{ opacity: 0, x: 4, y: 4 }}
        animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 4, y: 4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-1 left-1 text-[10px] font-mono text-white/60 leading-none pointer-events-none"
      >
        +
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -4, y: 4 }}
        animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -4, y: 4 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.03 }}
        className="absolute top-1 right-1 text-[10px] font-mono text-white/60 leading-none pointer-events-none"
      >
        +
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: 4, y: -4 }}
        animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 4, y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.06 }}
        className="absolute bottom-1 left-1 text-[10px] font-mono text-white/60 leading-none pointer-events-none"
      >
        +
      </motion.span>
      <motion.span
        initial={{ opacity: 0, x: -4, y: -4 }}
        animate={visible ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -4, y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut", delay: 0.09 }}
        className="absolute bottom-1 right-1 text-[10px] font-mono text-white/60 leading-none pointer-events-none"
      >
        +
      </motion.span>
    </>
  );
}

function TechIcon({
  item,
  accentRgb,
  index,
}: {
  item: TechItem;
  accentRgb: string;
  index: number;
}) {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  const scrambledName = useTextScramble(item.name, hovered);

  const floatDelay = index * 0.7;
  const floatDuration = 3 + (index % 3) * 0.8;

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{
        y: [0, -3, 0],
        opacity: [0.85, 1, 0.85],
      }}
      transition={{
        y: { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        opacity: { duration: floatDuration + 1, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
      }}
      className="group relative flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 cursor-crosshair"
    >
      {/* Icon container with target-lock */}
      <div className="relative">
        {/* Radial glow on hover */}
        <motion.div
          animate={hovered ? { opacity: 1, scale: 1.4 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${accentRgb}, 0.25) 0%, transparent 70%)`,
          }}
        />

        {/* Main icon box */}
        <motion.div
          animate={hovered ? { borderColor: `rgba(${accentRgb}, 0.4)` } : { borderColor: "rgba(255,255,255,0.06)" }}
          transition={{ duration: 0.2 }}
          className="relative z-10 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg bg-white/2 border backdrop-blur-sm overflow-hidden"
        >
          {/* Crosshair corners */}
          <Crosshairs visible={hovered} />

          {/* Scan line on hover */}
          <motion.div
            animate={hovered ? { y: ["−100%", "200%"] } : { y: "-100%" }}
            transition={{ duration: 1.2, ease: "linear", repeat: hovered ? Infinity : 0 }}
            className="absolute inset-x-0 h-px pointer-events-none"
            style={{ background: `rgba(${accentRgb}, 0.3)` }}
          />

          <Icon
            className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300 relative z-10"
            style={{
              color: hovered ? item.color : "rgba(255,255,255,0.5)",
              filter: hovered ? `drop-shadow(0 0 8px ${item.color}40)` : "none",
            }}
          />

          {/* Asset code micro-text */}
          <span className="absolute bottom-0.5 right-1 text-[6px] font-mono text-white/10 group-hover:text-white/30 transition-colors duration-300 pointer-events-none">
            {item.code}
          </span>
        </motion.div>
      </div>

      {/* Label with scramble effect */}
      <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-white/40 group-hover:text-white/90 transition-colors duration-300 uppercase text-center min-w-[48px]">
        {scrambledName}
      </span>
    </motion.div>
  );
}

function CategoryCard({
  category,
  index,
  inView,
}: {
  category: TechCategory;
  index: number;
  inView: boolean;
}) {
  const isPrimary = category.sysCode === "FE_SYS";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative p-4 sm:p-5 md:p-6 rounded-xl border border-white/5 bg-white/1 backdrop-blur-md overflow-hidden ${
        isPrimary ? "sm:col-span-2" : ""
      }`}
    >
      {/* Corner brackets */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-white/10 rounded-tl-sm pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-white/10 rounded-tr-sm pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-white/10 rounded-bl-sm pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-white/10 rounded-br-sm pointer-events-none" />

      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top-right system code */}
      <span className="absolute top-3 right-4 text-[7px] font-mono text-white/10 tracking-[0.3em] pointer-events-none">
        {category.sysCode}
      </span>

      {/* Category header */}
      <div className="relative flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5 md:mb-6">
        {/* Status indicator */}
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${category.accent.replace("text-", "bg-")}`}
          />
          <span
            className={`relative inline-flex rounded-full h-1.5 w-1.5 ${category.accent.replace("text-", "bg-")}`}
          />
        </span>

        <span
          className={`text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] ${category.accent} opacity-80`}
        >
          {category.title}
        </span>

        <div className="flex-1 h-px bg-linear-to-r from-white/8 to-transparent" />

        <span className="text-[7px] font-mono text-white/20 tracking-widest">
          [{String(category.items.length).padStart(2, "0")} MODULES]
        </span>
      </div>

      {/* Icons grid */}
      <div
        className={`grid gap-1 ${
          isPrimary
            ? "grid-cols-3 sm:grid-cols-6"
            : "grid-cols-2 sm:grid-cols-4"
        }`}
      >
        {category.items.map((item, i) => (
          <TechIcon key={item.name} item={item} accentRgb={category.accentRgb} index={i} />
        ))}
      </div>

      {/* Bottom classification bar */}
      <div className="mt-4 pt-3 border-t border-white/4 flex items-center justify-between">
        <span className="text-[7px] font-mono text-white/15 tracking-widest">
          SYS.LNK // {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-[7px] font-mono text-white/15 tracking-widest">
          STATUS: ACTIVE
        </span>
      </div>
    </motion.div>
  );
}

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      data-section="tech-stack"
      className="relative w-full py-16 sm:py-24 md:py-32 lg:py-40 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-16 bg-linear-to-r from-transparent to-white/20" />
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono">
              Technical // Stack Overview
            </span>
            <div className="h-px flex-1 max-w-16 bg-linear-to-l from-transparent to-white/20" />
          </div>

          <h2
            style={{ fontFamily: "var(--font-passero), sans-serif" }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-center bg-linear-to-r from-white/90 via-white/70 to-white/50 bg-clip-text text-transparent"
          >
            Tech Stack
          </h2>

          <p className="text-center text-[10px] sm:text-[11px] font-mono text-white/20 mt-3 tracking-[0.15em] uppercase">
            Tools of the trade &mdash; production-tested & deployment-ready
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
          {categories.map((category, i) => (
            <CategoryCard
              key={category.sysCode}
              category={category}
              index={i}
              inView={isInView}
            />
          ))}
        </div>

        {/* Bottom classification line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 sm:mt-12 flex items-center justify-center gap-4"
        >
          <div className="h-px w-12 bg-linear-to-r from-transparent to-white/10" />
          <span className="text-[7px] font-mono text-white/15 tracking-[0.4em] uppercase">
            End of Stack Overview
          </span>
          <div className="h-px w-12 bg-linear-to-l from-transparent to-white/10" />
        </motion.div>
      </div>
    </section>
  );
}

