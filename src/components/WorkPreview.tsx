"use client";

import { useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiD3,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPython,
  SiReact,
  SiStripe,
} from "react-icons/si";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type StackEntry = {
  label: string;
  Icon: IconType;
  /** Brand color for icon */
  color: string;
};

const projects: {
  title: string;
  id: string;
  status: string;
  stack: StackEntry[];
}[] = [
  {
    title: "E-Commerce Platform",
    id: "PRJ_001",
    status: "Deployed",
    stack: [
      { label: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
      { label: "Stripe", Icon: SiStripe, color: "#635BFF" },
    ],
  },
  {
    title: "SaaS Dashboard",
    id: "PRJ_002",
    status: "Production",
    stack: [
      { label: "React", Icon: SiReact, color: "#61DAFB" },
      { label: "D3.js", Icon: SiD3, color: "#F9A03C" },
    ],
  },
  {
    title: "AI Content Studio",
    id: "PRJ_003",
    status: "Beta",
    stack: [
      { label: "Python", Icon: SiPython, color: "#3776AB" },
      { label: "OpenAI", Icon: SiOpenai, color: "#10A37F" },
    ],
  },
  {
    title: "Mobile Banking App",
    id: "PRJ_004",
    status: "Shipped",
    stack: [
      { label: "React Native", Icon: SiReact, color: "#61DAFB" },
      { label: "Node.js", Icon: SiNodedotjs, color: "#339933" },
    ],
  },
];

function ProjectStack({ stack }: { stack: StackEntry[] }) {
  return (
    <div className="relative mt-6">
      <div className="mb-2 flex items-center gap-2">
        <span className="h-px flex-1 max-w-[72px] bg-linear-to-r from-white/25 to-transparent" />
        <span className="text-[8px] uppercase tracking-[0.35em] text-white/30 font-mono">
          stack trace
        </span>
      </div>

      <div
        className="relative overflow-hidden rounded-lg border border-white/6 bg-linear-to-br from-white/4 via-white/1 to-transparent p-3 backdrop-blur-[2px] before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(800px_circle_at_80%_-20%,rgba(255,255,255,0.06),transparent_55%)] before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100"
      >
        <div className="relative flex flex-wrap items-center gap-2">
          {stack.map((tech, i) => {
            const Icon = tech.Icon;
            return (
              <div
                key={`${tech.label}-${i}`}
                className="group/pill relative flex items-center gap-1.5 rounded-md border border-white/7 bg-black/20 px-2 py-1 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:border-white/18 hover:bg-white/4"
              >
                <span
                  className="absolute -inset-px rounded-md opacity-0 blur-sm transition-opacity duration-300 group-hover/pill:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${tech.color}33, transparent 60%)`,
                  }}
                  aria-hidden
                />
                <Icon
                  aria-hidden
                  className="relative size-3.5 shrink-0 opacity-95 transition-transform duration-300 group-hover/pill:scale-110"
                  style={{ color: tech.color }}
                />
                <span className="relative text-[9px] font-mono uppercase tracking-[0.14em] text-white/50 transition-colors duration-300 group-hover/pill:text-white/80">
                  {tech.label}
                </span>
              </div>
            );
          })}

          <span
            className="pointer-events-none ml-auto hidden text-[8px] font-mono uppercase tracking-[0.2em] text-white/15 sm:block"
            aria-hidden
          >
            ···
          </span>
        </div>
      </div>
    </div>
  );
}

export default function WorkPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 85%",
          end: "top 65%",
          scrub: 1,
        },
      });

      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.from(Array.from(cards), {
          y: 80,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "top 45%",
            scrub: 1,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative min-h-screen w-full py-32 px-6 md:px-12 flex flex-col items-center"
    >
      <div className="max-w-[1100px] w-full">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-mono">
            // Section_B: Project Archive
          </span>
        </div>
        <div className="h-px bg-linear-to-r from-white/15 to-transparent mb-12" />

        <h2
          ref={headingRef}
          className="text-[clamp(2rem,5vw,3.5rem)] font-bold tracking-tight text-white mb-16 uppercase"
        >
          Selected Work
        </h2>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative border border-white/6 bg-white/1 p-6 cursor-pointer hover:border-white/15 hover:bg-white/3 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-mono">
                  {project.id}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-emerald-400/60 font-mono">
                  {project.status}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-white/80 group-hover:text-white transition-colors duration-300 mb-2">
                {project.title}
              </h3>

              <ProjectStack stack={project.stack} />

              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
