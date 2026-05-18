"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TextRevealProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
}

export default function TextReveal({
  text,
  className,
  style,
  delay = 1.2,
  stagger = 0.02,
}: TextRevealProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const chars = containerRef.current?.querySelectorAll<HTMLSpanElement>(".char");
      if (!chars?.length) return;

      gsap.set(chars, { opacity: 0, y: 4 });
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger,
        delay,
        ease: "power2.out",
      });
    },
    { scope: containerRef }
  );

  const words = text.split(" ");

  return (
    <p ref={containerRef} className={className} style={style} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char, ci) => (
            <span key={ci} className="char inline-block opacity-0">
              {char}
            </span>
          ))}
          {wi < words.length - 1 && <span className="inline-block w-[0.3em]">&nbsp;</span>}
        </span>
      ))}
    </p>
  );
}
