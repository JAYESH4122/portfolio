"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      rafId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 8;
        const y = (e.clientY / window.innerHeight - 0.5) * 8;
        container.style.transform = `perspective(1000px) rotateX(${-y}deg) rotateY(${x}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      <div
        ref={containerRef}
        className="absolute inset-[-50px] bg-grid transition-transform duration-700 ease-out opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-[#0a0a0a]" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 animate-scanline opacity-30" />
    </div>
  );
}
