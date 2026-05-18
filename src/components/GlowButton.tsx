"use client";

import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  glowColor?: string;
}

export default function GlowButton({
  children,
  className = "",
  href,
  onClick,
  glowColor = "rgba(255,255,255,0.12)",
}: GlowButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spotPosition, setSpotPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setSpotPosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.12, y: -2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={`relative inline-block ${className}`}
    >
      {isHovered && (
        <div
          className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${spotPosition.x}% ${spotPosition.y}%, ${glowColor}, transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
