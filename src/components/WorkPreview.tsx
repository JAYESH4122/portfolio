"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  title: string;
  role: string;
  description: string;
  tech: string[];
  assetCode: string;
  status: string;
  demoUrl: string;
  sourceUrl: string;
}

const projects: ProjectItem[] = [
  {
    title: "Nexus Commerce",
    role: "Lead Frontend Architect",
    description:
      "End-to-end headless commerce platform with real-time inventory sync, AI-driven product recommendations, and sub-200ms page transitions across 12k+ SKUs.",
    tech: ["Next.js", "TypeScript", "Stripe", "Prisma", "Tailwind CSS", "Vercel"],
    assetCode: "OP_NEXUS.001",
    status: "DEPLOYED",
    demoUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Sentinel Dashboard",
    role: "Full Stack Engineer",
    description:
      "Real-time observability suite processing 2M+ events/day with interactive D3 visualizations, anomaly detection pipelines, and role-based access across distributed teams.",
    tech: ["React", "Node.js", "PostgreSQL", "D3.js", "Docker", "Redis"],
    assetCode: "OP_SNTL.002",
    status: "PRODUCTION",
    demoUrl: "#",
    sourceUrl: "#",
  },
  {
    title: "Phantom Studio",
    role: "Creative Technologist",
    description:
      "AI-powered content generation platform combining GPT-4 orchestration with custom fine-tuned models for brand-consistent copy, imagery, and video storyboards at scale.",
    tech: ["Python", "OpenAI", "Next.js", "MongoDB", "AWS Lambda", "GSAP"],
    assetCode: "OP_PHNTM.003",
    status: "BETA",
    demoUrl: "#",
    sourceUrl: "#",
  },
];

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-project-card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="project-card relative flex-shrink-0 w-full md:w-[50vw] lg:w-[40vw] md:h-[75vh] md:min-h-[480px] md:max-h-[620px] rounded-lg border border-white/[0.06] bg-white/[0.01] backdrop-blur-md overflow-hidden group cursor-crosshair"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Radial hover glow */}
      <motion.div
        animate={hovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(600px circle at 50% 30%, rgba(139,92,246,0.06), transparent 60%)",
        }}
      />

      {/* Corner tactical markers */}
      <span className="absolute top-3 left-3 text-[9px] font-mono text-white/30 leading-none">+</span>
      <span className="absolute top-3 right-3 text-[9px] font-mono text-white/30 leading-none">+</span>
      <span className="absolute bottom-3 left-3 text-[9px] font-mono text-white/30 leading-none">+</span>
      <span className="absolute bottom-3 right-3 text-[9px] font-mono text-white/30 leading-none">+</span>

      {/* Asset code top-right */}
      <span className="absolute top-5 right-6 text-[8px] font-mono text-white/10 tracking-[0.3em]">
        {project.assetCode}
      </span>

      {/* Card content */}
      <div className="relative h-full flex flex-col p-6 sm:p-8 md:p-10">
        {/* Header meta */}
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-emerald-400/70">
              {project.status}
            </span>
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-white/8 to-transparent" />
          <span className="text-[9px] font-mono text-white/20 tracking-[0.15em]">
            [{String(index + 1).padStart(2, "0")}/03]
          </span>
        </div>

        {/* Project image/mockup block */}
        <div data-card-image className="relative w-full h-[35%] min-h-[160px] rounded-md border border-white/[0.06] overflow-hidden mb-6 bg-black/30">
          <div
            className="absolute inset-0 transition-all duration-700 ease-out"
            style={{
              filter: hovered ? "grayscale(0%) brightness(1.1)" : "grayscale(100%) brightness(0.7)",
              transform: hovered ? "scale(1.05)" : "scale(1)",
            }}
          >
            <div className="w-full h-full bg-linear-to-br from-violet-900/20 via-pink-900/10 to-cyan-900/20 flex items-center justify-center">
              <span className="text-[10px] text-white/20 font-mono uppercase tracking-[0.3em]">
                [Mockup // {project.title}]
              </span>
            </div>
          </div>

          {/* Colour aura on hover */}
          <motion.div
            animate={hovered ? { opacity: 0.6 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute -inset-4 rounded-xl pointer-events-none blur-2xl"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(139,92,246,0.3), rgba(236,72,153,0.15), transparent 70%)",
            }}
          />

          {/* Scan line */}
          <motion.div
            animate={hovered ? { y: ["-100%", "200%"] } : { y: "-100%" }}
            transition={{ duration: 2, ease: "linear", repeat: hovered ? Infinity : 0 }}
            className="absolute inset-x-0 h-px pointer-events-none bg-violet-400/30"
          />
        </div>

        {/* Title & role */}
        <div data-card-text>
          <h3
            style={{ fontFamily: "var(--font-passero), sans-serif" }}
            className="text-xl sm:text-2xl md:text-3xl text-white/90 group-hover:text-white transition-colors duration-300 mb-1"
          >
            {project.title}
          </h3>
          <span
            style={{ fontFamily: "var(--font-geo), sans-serif" }}
            className="text-[11px] sm:text-xs text-violet-400/70 tracking-wide mb-4 block"
          >
            {project.role}
          </span>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-white/40 leading-relaxed font-mono mb-auto max-w-md">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-6 mt-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded border border-white/[0.06] bg-white/[0.02] text-[9px] font-mono uppercase tracking-wider text-white/35 group-hover:text-white/55 group-hover:border-white/10 transition-all duration-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 pt-4 border-t border-white/[0.05]">
          <a
            href={project.demoUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-violet-500/30 bg-violet-500/5 text-[10px] font-mono uppercase tracking-[0.2em] text-violet-300/80 hover:bg-violet-500/10 hover:border-violet-500/50 hover:text-violet-200 transition-all duration-300"
          >
            <span className="w-1 h-1 rounded-full bg-violet-400 shadow-[0_0_4px_rgba(139,92,246,0.8)]" />
            Live Application
          </a>
          <a
            href={project.sourceUrl}
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-white/[0.08] bg-white/[0.02] text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 hover:bg-white/[0.05] hover:border-white/20 hover:text-white/70 transition-all duration-300"
          >
            <span className="w-1 h-1 rounded-full bg-white/40" />
            View Source
          </a>
        </div>
      </div>
    </div>
  );
}

export default function WorkPreview() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const pinSection = pinSectionRef.current;
        if (!track || !pinSection) return;

        const totalScroll = track.scrollWidth - window.innerWidth;

        const horizontalTween = gsap.to(track, {
          x: -totalScroll,
          ease: "none",
          scrollTrigger: {
            trigger: pinSection,
            pin: true,
            scrub: 1,
            end: () => `+=${totalScroll}`,
            invalidateOnRefresh: true,
          },
        });

        const cards = track.querySelectorAll("[data-project-card]");
        cards.forEach((card) => {
          const textBlock = card.querySelector("[data-card-text]");
          const imageBlock = card.querySelector("[data-card-image]");

          if (textBlock) {
            gsap.fromTo(
              textBlock,
              { x: 40, opacity: 0.5 },
              {
                x: 0,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 85%",
                  end: "left 35%",
                  scrub: 1,
                },
              }
            );
          }

          if (imageBlock) {
            gsap.fromTo(
              imageBlock,
              { scale: 1.06, opacity: 0.7 },
              {
                scale: 1,
                opacity: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 90%",
                  end: "left 25%",
                  scrub: 1.2,
                },
              }
            );
          }
        });
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} id="work" data-section="projects">
      {/* Section heading — scrolls naturally before pin */}
      <section data-proj-header className="relative w-full pt-24 sm:pt-32 md:pt-40 pb-10 sm:pb-14 md:pb-16">
        <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12">
          {/* Subtitle */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-12 bg-linear-to-r from-transparent to-white/20" />
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono">
              Portfolio // Selected Works
            </span>
            <div className="h-px flex-1 max-w-12 bg-linear-to-l from-transparent to-white/20" />
          </div>

          {/* Main title */}
          <h2
            style={{ fontFamily: "var(--font-passero), sans-serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center bg-linear-to-r from-white/90 via-white/70 to-white/50 bg-clip-text text-transparent mb-4"
          >
            Featured Projects
          </h2>

          <p className="text-center text-[10px] sm:text-[11px] font-mono text-white/20 tracking-[0.15em] uppercase mb-8 sm:mb-10">
            Production applications &mdash; concept to deployment
          </p>

          {/* Decorative border with tactical markers */}
          <div className="relative">
            <div className="h-px bg-linear-to-r from-white/5 via-violet-500/25 to-white/5" />
            <span className="absolute top-[-3px] left-0 text-[7px] text-violet-400/50 font-mono leading-none">
              +
            </span>
            <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 text-[7px] text-violet-400/40 font-mono leading-none">
              &#x25C6;
            </span>
            <span className="absolute top-[-3px] right-0 text-[7px] text-violet-400/50 font-mono leading-none">
              +
            </span>
          </div>
        </div>
      </section>

      {/* Pinned horizontal scroll viewport — desktop */}
      <div
        ref={pinSectionRef}
        data-pin-section
        className="hidden md:flex relative w-full h-screen items-center overflow-hidden"
      >
        <div
          ref={trackRef}
          data-project-track
          className="flex items-center gap-6 lg:gap-10 px-[5vw]"
          style={{ width: "max-content" }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.assetCode} project={project} index={i} />
          ))}

          {/* End marker */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center w-[200px]">
            <div className="w-px h-20 bg-linear-to-b from-transparent via-white/10 to-transparent mb-4" />
            <span className="text-[8px] font-mono text-white/15 tracking-[0.4em] uppercase">
              End of List
            </span>
            <div className="w-px h-20 bg-linear-to-b from-transparent via-white/10 to-transparent mt-4" />
          </div>
        </div>
      </div>

      {/* Vertical stack — mobile */}
      <div className="md:hidden relative w-full px-5 sm:px-6 pb-16 space-y-5">
        {projects.map((project, i) => (
          <ProjectCard key={project.assetCode} project={project} index={i} />
        ))}
      </div>

      {/* Bottom classification */}
      <div className="relative z-10 flex items-center justify-center gap-4 py-16 md:py-24">
        <div className="h-px w-12 bg-linear-to-r from-transparent to-white/10" />
        <span className="text-[7px] font-mono text-white/15 tracking-[0.4em] uppercase">
          Portfolio Status: Current
        </span>
        <div className="h-px w-12 bg-linear-to-l from-transparent to-white/10" />
      </div>
    </div>
  );
}
