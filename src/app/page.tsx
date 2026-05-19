"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
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
  const heroConnectorRef = useRef<HTMLDivElement>(null);
  const heroConnectorGlowRef = useRef<HTMLDivElement>(null);
  const techConnectorRef = useRef<HTMLDivElement>(null);
  const techConnectorGlowRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const main = mainRef.current;
      if (!main) return;

      const hero = main.querySelector("[data-section='hero']");
      const techStack = main.querySelector("[data-section='tech-stack']");
      const projects = main.querySelector("[data-section='projects']");
      const contact = main.querySelector("[data-section='contact']");
      const heroConnector = heroConnectorRef.current;
      const heroConnectorGlow = heroConnectorGlowRef.current;
      const techConnector = techConnectorRef.current;
      const techConnectorGlow = techConnectorGlowRef.current;

      if (!hero || !techStack || !heroConnector || !heroConnectorGlow) return;

      // ─── HERO → TECH STACK CONNECTOR ───────────────────────────────────
      const heroExitTl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "60% top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      heroExitTl.fromTo(
        heroConnector,
        { scaleY: 0, opacity: 0 },
        { scaleY: 1, opacity: 1, duration: 1, ease: "none" },
        0
      );

      heroExitTl.fromTo(
        heroConnectorGlow,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: "power2.in" },
        0.3
      );

      // ─── TECH STACK ENTRANCE ───────────────────────────────────────────
      const techHeader = techStack.querySelector("[data-tech-header]");
      const techGrid = techStack.querySelector("[data-tech-grid]");

      if (techHeader) {
        gsap.fromTo(
          techHeader,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroConnector,
              start: "bottom 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (techGrid) {
        const cards = techGrid.querySelectorAll("[data-category]");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: techGrid,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ─── TECH STACK EXIT PARALLAX ──────────────────────────────────────
      if (techStack && techConnector && techConnectorGlow) {
        const techExitTl = gsap.timeline({
          scrollTrigger: {
            trigger: techStack,
            start: "70% center",
            end: "bottom top",
            scrub: 1,
          },
        });

        techExitTl.fromTo(
          techStack,
          { opacity: 1 },
          { opacity: 0.4, ease: "none" },
          0
        );

        techExitTl.fromTo(
          techConnector,
          { scaleY: 0, opacity: 0 },
          { scaleY: 1, opacity: 1, duration: 1, ease: "none" },
          0.2
        );

        techExitTl.fromTo(
          techConnectorGlow,
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.in" },
          0.4
        );
      }

      // ─── PROJECTS SECTION ENTRANCE ─────────────────────────────────────
      if (projects) {
        const projHeader = projects.querySelector("[data-proj-header]");
        if (projHeader) {
          gsap.fromTo(
            projHeader,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: projHeader,
                start: "top 88%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }

      // ─── CONTACT SECTION ENTRANCE ──────────────────────────────────────
      if (contact) {
        const contactInner = contact.querySelector("[data-contact-inner]");
        if (contactInner) {
          gsap.fromTo(
            contactInner,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: contact,
                start: "top 80%",
                toggleActions: "play none none none",
              },
            }
          );
        }
      }
    },
    { scope: mainRef }
  );

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <main ref={mainRef} className="relative">
      <ParticleField />
      <GlowCursor />
      <HeroSection />

      {/* ─── HERO → TECH CONNECTOR ─── */}
      <div className="relative flex justify-center">
        <div className="relative h-32 sm:h-40 md:h-48 flex flex-col items-center">
          <div
            ref={heroConnectorRef}
            className="w-px h-full origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(139,92,246,0.6), rgba(236,72,153,0.4), rgba(34,211,238,0.3))",
            }}
          />
          <div
            ref={heroConnectorGlowRef}
            className="absolute inset-0 w-[3px] -left-px opacity-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(139,92,246,0.3), rgba(236,72,153,0.2), rgba(34,211,238,0.15))",
              filter: "blur(4px)",
            }}
          />
          <div className="mt-1 w-1.5 h-1.5 rotate-45 bg-cyan-400/60 shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
        </div>
      </div>

      <TechStack />

      {/* ─── TECH → PROJECTS CONNECTOR ─── */}
      <div className="relative flex justify-center">
        <div className="relative h-24 sm:h-32 md:h-40 flex flex-col items-center">
          <div
            ref={techConnectorRef}
            className="w-px h-full origin-top"
            style={{
              background:
                "linear-gradient(to bottom, rgba(34,211,238,0.4), rgba(139,92,246,0.5), rgba(236,72,153,0.3))",
            }}
          />
          <div
            ref={techConnectorGlowRef}
            className="absolute inset-0 w-[3px] -left-px opacity-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(34,211,238,0.2), rgba(139,92,246,0.25), rgba(236,72,153,0.15))",
              filter: "blur(4px)",
            }}
          />
          <div className="mt-1 w-1.5 h-1.5 rotate-45 bg-violet-400/60 shadow-[0_0_8px_rgba(139,92,246,0.6)]" />
        </div>
      </div>

      <WorkPreview />
      <ContactSection />
    </main>
  );
}
