"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import GlowButton from "./GlowButton";
import ScrollIndicator from "./ScrollIndicator";
import TextReveal from "./TextReveal";

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "50% top",
            end: "bottom top",
            scrub: 1.2,
          },
        })
        .to(innerRef.current, {
          y: -50,
          scale: 0.96,
          opacity: 0,
          ease: "none",
        });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      data-section="hero"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <motion.div
        ref={innerRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12 py-20 md:py-0"
      >
        {/* Tactical HUD header */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-between mb-3 md:mb-4"
        >
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div className="relative flex-shrink-0 flex items-center justify-center w-4 h-4">
              <span className="absolute w-4 h-4 rounded-full border border-emerald-400/40 animate-ping" />
              <span className="absolute w-2.5 h-2.5 rounded-full border border-emerald-400/60" />
              <span className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
            </div>
            <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] text-emerald-400/70 font-mono truncate">
              Contractor_ID: Baba_Yaga
            </span>
          </div>
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.25em] text-white/20 font-mono flex-shrink-0 hidden xs:inline sm:inline">
            Clearance: Level_5
          </span>
        </motion.div>

        {/* Tactical border with crosshair markers */}
        <motion.div
          variants={lineReveal}
          className="relative mb-6 md:mb-10 origin-left"
        >
          <div className="h-px bg-linear-to-r from-white/5 via-violet-500/30 to-white/5" />
          <span className="absolute top-[-3px] left-0 text-[7px] text-violet-400/50 font-mono leading-none">
            +
          </span>
          <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 text-[7px] text-violet-400/40 font-mono leading-none">
            &#x25C6;
          </span>
          <span className="absolute top-[-3px] right-0 text-[7px] text-violet-400/50 font-mono leading-none">
            +
          </span>
        </motion.div>

        {/* Split layout: Left content + Right photo */}
        <div className="flex flex-col md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center">
          {/* Left side — Name & content */}
          <div className="order-2 md:order-1">
            {/* Status badges */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center gap-2 sm:gap-3 mb-5 md:mb-8"
            >
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/4 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                <span
                  style={{ fontFamily: "var(--font-geo), sans-serif" }}
                  className="text-[10px] sm:text-[11px] tracking-wide text-emerald-300/90"
                >
                  Pixel Perfect
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-white/10 bg-white/3 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-white/60 shadow-[0_0_8px_rgba(255,255,255,0.3)]" />
                <span
                  style={{ fontFamily: "var(--font-geo), sans-serif" }}
                  className="text-[10px] sm:text-[11px] tracking-wide text-white/60"
                >
                  Full Stack Scope
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-violet-400/20 bg-violet-400/4 backdrop-blur-sm">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.6)]" />
                <span
                  style={{ fontFamily: "var(--font-geo), sans-serif" }}
                  className="text-[10px] sm:text-[11px] tracking-wide text-violet-300/90"
                >
                  Fluid Interactions
                </span>
              </div>
            </motion.div>

            {/* Main title */}
            <motion.div variants={itemVariants}>
              <h1
                style={{
                  fontFamily: "var(--font-passero), sans-serif",
                  textShadow:
                    "0 0 80px rgba(139, 92, 246, 0.3), 0 0 40px rgba(236, 72, 153, 0.2), 0 4px 12px rgba(0, 0, 0, 0.5)",
                }}
                className="text-[clamp(2.75rem,12vw,7.5rem)] leading-[0.95] tracking-normal sm:tracking-wide bg-linear-to-r from-violet-300 via-pink-200 to-amber-200 bg-clip-text text-transparent"
              >
                Jayesh PJ
              </h1>
            </motion.div>

            {/* Divider */}
            <motion.div
              variants={lineReveal}
              className="h-px bg-linear-to-r from-violet-500/40 via-pink-500/20 to-transparent origin-left mt-5 sm:mt-8 mb-4 sm:mb-6"
            />

            {/* Description */}
            <motion.div variants={itemVariants}>
              <TextReveal
                text="A software engineer bridging the gap between high-end aesthetic design and robust full-stack architecture. Crafting immersive web applications, scalable platforms, and pixel-perfect interactive experiences from concept to production."
                style={{ fontFamily: "var(--font-geo), sans-serif" }}
                className="text-[13px] sm:text-base md:text-lg text-white/50 leading-relaxed max-w-2xl"
              />
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={itemVariants}
              className="mt-7 sm:mt-10 flex items-center gap-4 sm:gap-6"
            >
              <GlowButton
                href="https://github.com"
                glowColor="rgba(255,255,255,0.15)"
              >
                <div className="group p-2.5 sm:p-3 rounded-full border border-white/10 hover:border-white/30 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-white transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </GlowButton>
              <GlowButton
                href="https://linkedin.com"
                glowColor="rgba(10,102,194,0.25)"
              >
                <div className="group p-2.5 sm:p-3 rounded-full border border-white/10 hover:border-[#0a66c2]/50 hover:shadow-[0_0_20px_rgba(10,102,194,0.2)] transition-all duration-300">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-white/40 group-hover:text-[#0a66c2] transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
              </GlowButton>
            </motion.div>
          </div>

          {/* Right side — Photo */}
          <motion.div
            variants={itemVariants}
            className="relative flex items-center justify-center order-1 md:order-2 mb-8 md:mb-0"
          >
            <div className="relative w-[200px] h-[250px] sm:w-[260px] sm:h-[325px] md:w-[320px] md:h-[400px]">
              {/* Decorative frame */}
              <div className="absolute inset-0 border border-white/10" />
              <div className="absolute -inset-2 sm:-inset-3 border border-white/4" />
              <div className="absolute top-2 left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t border-l border-violet-500/50" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-t border-r border-violet-500/50" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b border-l border-violet-500/50" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 border-b border-r border-violet-500/50" />

              {/* Photo placeholder */}
              <div className="absolute inset-px bg-white/3 overflow-hidden">
                <div className="w-full h-full bg-linear-to-br from-white/5 to-transparent flex items-center justify-center">
                  <span className="text-[10px] text-white/20 font-mono uppercase tracking-widest">
                    [Photo]
                  </span>
                </div>
              </div>

              {/* Corner label */}
              <div className="absolute -bottom-5 sm:-bottom-6 left-0 right-0 text-center">
                <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/20 font-mono">
                  Verified // Active Agent
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom system status */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-16 md:mt-20 flex items-center justify-between border-t border-white/5 pt-3 sm:pt-4"
        >
          <span className="text-[9px] sm:text-[10px] text-white/30 font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase hidden md:block">
            Network: Continental_Grid
          </span>
          <span className="text-[9px] sm:text-[10px] text-emerald-400/60 font-mono tracking-[0.15em] sm:tracking-[0.2em] uppercase">
            Op_Sector: India
          </span>
        </motion.div>
      </motion.div>

      <ScrollIndicator />
    </section>
  );
}
