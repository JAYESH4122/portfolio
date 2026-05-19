"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkPreview from "@/components/WorkPreview";
import TechStack from "@/components/TechStack";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const ParticleField = dynamic(() => import("@/components/ParticleField"), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-[#0a0a0a]" />,
});

const GlowCursor = dynamic(() => import("@/components/GlowCursor"), {
  ssr: false,
});

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);
  const connectorRef = useRef<HTMLDivElement>(null);
  const connectorGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = mainRef.current?.querySelector("[data-section='hero']");
      const techStack = mainRef.current?.querySelector("[data-section='tech-stack']");
      const connector = connectorRef.current;
      const connectorGlow = connectorGlowRef.current;

      if (!hero || !techStack || !connector || !connectorGlow) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "60% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // Draw the laser connector line as hero scrolls out
      tl.fromTo(
        connector,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1, ease: "none" },
        0,
      );

      // Pulse glow on the connector
      tl.fromTo(
        connectorGlow,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.in" },
        0.3,
      );

      // Tech stack entrance — tied to its own trigger for proper timing
      const techHeader = techStack.querySelector("[data-tech-header]");
      const techGrid = techStack.querySelector("[data-tech-grid]");

      if (techHeader) {
        gsap.fromTo(
          techHeader,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: connector,
              start: "bottom 90%",
              toggleActions: "play none none none",
            },
          },
        );
      }

      if (techGrid) {
        const cards = techGrid.querySelectorAll("[data-category]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: techGrid,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      }
    },
    { scope: mainRef },
  );

  return (
    <main ref={mainRef} className="relative">
      <ParticleField />
      <GlowCursor />
      <Navbar />
      <HeroSection />

      {/* Connecting laser line between Hero and Tech Stack */}
      <div className="relative flex justify-center">
        <div className="relative h-32 sm:h-40 md:h-48 flex flex-col items-center">
          {/* Main laser line */}
          <div
            ref={connectorRef}
            className="w-px h-full origin-top"
            style={{
              background: "linear-gradient(to bottom, rgba(139,92,246,0.6), rgba(236,72,153,0.4), rgba(34,211,238,0.3))",
            }}
          />
          {/* Glow effect around line */}
          <div
            ref={connectorGlowRef}
            className="absolute inset-0 w-[3px] -left-[1px] opacity-0"
            style={{
              background: "linear-gradient(to bottom, rgba(139,92,246,0.3), rgba(236,72,153,0.2), rgba(34,211,238,0.15))",
              filter: "blur(4px)",
            }}
          />
          {/* Terminal diamond */}
          <div className="mt-1 w-1.5 h-1.5 rotate-45 bg-cyan-400/60 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
        </div>
      </div>

      <TechStack />
      <WorkPreview />
      <ContactSection />
    </main>
  );
}
