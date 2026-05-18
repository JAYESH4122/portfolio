"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlowCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { damping: 25, stiffness: 200 });
  const springY = useSpring(cursorY, { damping: 25, stiffness: 200 });

  const isVisible = useRef(false);
  const opacityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      if (!isVisible.current && opacityRef.current) {
        opacityRef.current.style.opacity = "1";
        isVisible.current = true;
      }
    };

    const handleMouseLeave = () => {
      if (opacityRef.current) {
        opacityRef.current.style.opacity = "0";
        isVisible.current = false;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      ref={opacityRef}
      className="fixed pointer-events-none z-50 hidden md:block"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
        opacity: 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <div className="w-[400px] h-[400px] rounded-full bg-gradient-radial from-violet-500/[0.06] via-pink-500/[0.02] to-transparent blur-3xl" />
    </motion.div>
  );
}
