"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-40 px-6 md:px-12 py-5 border-b border-white/[0.06]"
    >
      <div className="flex items-center justify-between max-w-[1100px] mx-auto">
        <MagneticButton strength={0.2}>
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/60">
            [JAYESH.PJ]
          </span>
        </MagneticButton>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <MagneticButton key={link.label} href={link.href} strength={0.25}>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white/90 transition-colors duration-300">
                {link.label}
              </span>
            </MagneticButton>
          ))}
        </div>

        <MagneticButton href="#contact" strength={0.3} className="hidden md:block">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] px-4 py-2 border border-white/15 text-white/60 hover:bg-white/5 hover:text-white/90 hover:border-white/30 transition-all duration-300">
            Initiate Contact
          </span>
        </MagneticButton>

        <MagneticButton strength={0.2} className="md:hidden">
          <div className="flex flex-col gap-[4px] cursor-pointer">
            <span className="w-4 h-[1px] bg-white/60" />
            <span className="w-3 h-[1px] bg-white/60" />
          </div>
        </MagneticButton>
      </div>
    </motion.nav>
  );
}
