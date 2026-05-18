"use client";

import { useRef, useState, useCallback } from "react";

interface MagneticState {
  x: number;
  y: number;
}

export function useMagneticEffect(strength: number = 0.3) {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState<MagneticState>({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;
      setOffset({ x: deltaX, y: deltaY });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    setOffset({ x: 0, y: 0 });
  }, []);

  return { ref, offset, handleMouseMove, handleMouseLeave };
}
