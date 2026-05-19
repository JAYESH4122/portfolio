"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { Mail, Send, CheckCircle2, Loader2, ArrowDownToLine } from "lucide-react";

type FormState = "idle" | "sending" | "sent";

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}

function TerminalField({ label, id, type = "text", placeholder, value, onChange, multiline }: FieldProps) {
  const [focused, setFocused] = useState(false);

  const shared =
    "relative w-full bg-white/[0.02] text-sm text-white/80 font-mono tracking-wide placeholder:text-white/15 border-b transition-colors duration-300 outline-none px-4 py-3 sm:py-3.5";
  const borderClass = focused ? "border-emerald-400/80" : "border-white/10";

  return (
    <div className="relative group">
      <label
        htmlFor={id}
        className="block text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] text-white/30 mb-2"
      >
        {label}
      </label>

      <div className="relative">
        {multiline ? (
          <textarea
            id={id}
            name={id}
            rows={5}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${shared} ${borderClass} resize-none`}
          />
        ) : (
          <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className={`${shared} ${borderClass}`}
          />
        )}

        {/* Active corner tracker */}
        <motion.span
          animate={focused ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 3, y: 3 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-0 left-0 text-[8px] font-mono text-emerald-400/80 leading-none pointer-events-none"
        >
          +
        </motion.span>
        <motion.span
          animate={focused ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -3, y: 3 }}
          transition={{ duration: 0.2, delay: 0.03 }}
          className="absolute bottom-0 right-0 text-[8px] font-mono text-emerald-400/80 leading-none pointer-events-none"
        >
          +
        </motion.span>

        {/* Glow underline */}
        <motion.div
          animate={focused ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute bottom-0 left-0 right-0 h-px origin-left bg-emerald-400/50 blur-[1px] pointer-events-none"
        />
      </div>
    </div>
  );
}

function MagneticButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.15);
    y.set((e.clientY - cy) * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.97 }}
      className="relative inline-flex items-center gap-3 px-6 py-3.5 sm:px-8 sm:py-4 rounded border border-emerald-400/30 bg-emerald-400/5 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.25em] text-emerald-300/90 hover:bg-emerald-400/10 hover:border-emerald-400/50 hover:text-emerald-200 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)] transition-all duration-300 disabled:opacity-40 disabled:pointer-events-none cursor-crosshair"
    >
      {children}
    </motion.button>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const channels = [
  {
    label: "E-mail",
    code: "Primary",
    href: "mailto:hello@jayeshpj.dev",
    icon: Mail,
    accent: "emerald",
  },
  {
    label: "LinkedIn",
    code: "Professional",
    href: "https://linkedin.com",
    icon: LinkedinIcon,
    accent: "blue",
  },
  {
    label: "GitHub",
    code: "Open Source",
    href: "https://github.com",
    icon: GithubIcon,
    accent: "white",
  },
];

function ChannelLink({ channel }: { channel: (typeof channels)[number] }) {
  const accentMap: Record<string, string> = {
    emerald: "hover:border-emerald-400/30 hover:text-emerald-300",
    blue: "hover:border-[#0a66c2]/40 hover:text-[#0a66c2]",
    white: "hover:border-white/25 hover:text-white/90",
  };

  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 p-4 rounded border border-white/[0.06] bg-white/[0.01] transition-all duration-300 ${accentMap[channel.accent]}`}
    >
      <div className="flex items-center justify-center w-10 h-10 rounded border border-white/[0.06] bg-white/[0.02] group-hover:bg-white/[0.04] transition-colors duration-300">
        <channel.icon className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors duration-300" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="block text-xs font-mono text-white/60 group-hover:text-white/80 transition-colors duration-300 tracking-wide">
          {channel.label}
        </span>
        <span className="block text-[8px] font-mono text-white/20 tracking-[0.2em] uppercase mt-0.5">
          {channel.code}
        </span>
      </div>
      <svg className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
      </svg>
    </a>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const handleSubmit = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setFormState("sending");
    setTimeout(() => setFormState("sent"), 2000);
  };

  const canSubmit = name.trim() && email.trim() && message.trim() && formState === "idle";

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section="contact"
      className="relative w-full py-24 sm:py-32 md:py-40 overflow-hidden"
    >
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-14 sm:mb-18 md:mb-20"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 max-w-12 bg-linear-to-r from-transparent to-white/20" />
            <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.3em] text-white/30 font-mono">
              Contact // Open for Work
            </span>
            <div className="h-px flex-1 max-w-12 bg-linear-to-l from-transparent to-white/20" />
          </div>

          <h2
            style={{ fontFamily: "var(--font-passero), sans-serif" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center bg-linear-to-r from-white/90 via-white/70 to-white/50 bg-clip-text text-transparent mb-4"
          >
            Get In Touch
          </h2>

          <p className="text-center text-[10px] sm:text-[11px] font-mono text-white/20 tracking-[0.15em] uppercase">
            Have a project in mind? &mdash; let&apos;s build something great
          </p>

          {/* Decorative border */}
          <div className="relative mt-8 sm:mt-10">
            <div className="h-px bg-linear-to-r from-white/5 via-violet-500/25 to-white/5" />
            <span className="absolute top-[-3px] left-0 text-[7px] text-violet-400/50 font-mono leading-none">+</span>
            <span className="absolute top-[-3px] left-1/2 -translate-x-1/2 text-[7px] text-violet-400/40 font-mono leading-none">&#x25C6;</span>
            <span className="absolute top-[-3px] right-0 text-[7px] text-violet-400/50 font-mono leading-none">+</span>
          </div>
        </motion.div>

        {/* Two-column grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-14"
        >
          {/* Left — Form */}
          <div className="relative">
            {/* Corner brackets */}
            <div className="absolute -top-3 -left-3 w-4 h-4 border-t border-l border-white/10 pointer-events-none hidden sm:block" />
            <div className="absolute -top-3 -right-3 w-4 h-4 border-t border-r border-white/10 pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-3 -left-3 w-4 h-4 border-b border-l border-white/10 pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-3 -right-3 w-4 h-4 border-b border-r border-white/10 pointer-events-none hidden sm:block" />

            {formState === "sent" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center min-h-[400px] text-center p-8"
              >
                <div className="w-14 h-14 rounded-full border border-emerald-400/30 bg-emerald-400/5 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-mono text-white/80 tracking-wide mb-2">
                  Message Sent
                </h3>
                <p className="text-[11px] font-mono text-white/30 tracking-wide max-w-sm">
                  Your message has been received successfully. Expect a response within 24 hours.
                </p>
                <span className="mt-6 text-[8px] font-mono text-emerald-400/50 tracking-[0.3em] uppercase">
                  STATUS: DELIVERED
                </span>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {/* Form header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[8px] font-mono text-white/20 tracking-[0.25em] uppercase">
                    New Message
                  </span>
                  <span className="text-[8px] font-mono text-emerald-400/40 tracking-[0.2em] uppercase">
                    ● Available
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <TerminalField
                    label="Full Name"
                    id="contact-name"
                    placeholder="Your name"
                    value={name}
                    onChange={setName}
                  />
                  <TerminalField
                    label="E-mail Address"
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    value={email}
                    onChange={setEmail}
                  />
                </div>

                <TerminalField
                  label="Subject / Project Scope"
                  id="contact-subject"
                  placeholder="What's this about?"
                  value={subject}
                  onChange={setSubject}
                />

                <TerminalField
                  label="Message"
                  id="contact-message"
                  placeholder="Tell me about your project..."
                  value={message}
                  onChange={setMessage}
                  multiline
                />

                {/* Submit */}
                <div className="pt-4 flex items-center gap-4">
                  <MagneticButton onClick={handleSubmit} disabled={!canSubmit}>
                    {formState === "sending" ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Send Message
                      </>
                    )}
                  </MagneticButton>

                  <span className="text-[8px] font-mono text-white/15 tracking-wider hidden sm:inline">
                    Secure // Verified
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right — Channels */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[8px] font-mono text-white/20 tracking-[0.25em] uppercase">
                Connect
              </span>
              <div className="h-px flex-1 bg-linear-to-r from-white/8 to-transparent" />
            </div>

            <div className="space-y-3">
              {channels.map((ch) => (
                <ChannelLink key={ch.code} channel={ch} />
              ))}
            </div>

            {/* Asset Dossier — Resume download */}
            <motion.a
              href="/resume.pdf"
              download
              whileHover="hover"
              className="group relative block mt-6 p-5 rounded-lg border border-white/[0.05] bg-white/[0.015] backdrop-blur-sm overflow-hidden cursor-crosshair transition-colors duration-300 hover:border-violet-400/20 hover:bg-white/[0.03]"
            >
              {/* Background grid */}
              <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* Corner file-size tag */}
              <span className="absolute top-3 right-3 text-[7px] font-mono text-white/15 tracking-[0.2em] pointer-events-none">
                FILE_SIZE // 142KB
              </span>

              <div className="relative flex items-center gap-4">
                {/* Icon container */}
                <div className="flex items-center justify-center w-11 h-11 rounded border border-violet-400/15 bg-violet-400/5 group-hover:border-violet-400/30 group-hover:bg-violet-400/10 transition-all duration-300">
                  <motion.div
                    variants={{ hover: { y: 2 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <ArrowDownToLine className="w-4.5 h-4.5 text-violet-400/70 group-hover:text-violet-300 transition-colors duration-300" />
                  </motion.div>
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <span className="block text-xs font-mono text-white/70 group-hover:text-white/90 transition-colors duration-300 tracking-wide">
                    Download Resume
                  </span>
                  <span className="block text-[9px] font-mono text-white/25 tracking-wide mt-0.5">
                    Complete curriculum vitae [PDF]
                  </span>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <motion.div
                variants={{ hover: { scaleX: 1, opacity: 1 } }}
                initial={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 h-px origin-left bg-violet-400/40"
              />
            </motion.a>

            {/* Terminal status block */}
            <div className="mt-8 p-4 rounded border border-white/[0.04] bg-white/[0.01]">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                <span className="text-[9px] font-mono text-emerald-400/70 tracking-[0.2em] uppercase">
                  System Online
                </span>
              </div>
              <div className="space-y-1.5 text-[8px] font-mono text-white/20 tracking-wider">
                <p>Response_Time: &lt; 24h</p>
                <p>Timezone: IST (UTC+5:30)</p>
                <p>Availability: Open_to_Work</p>
              </div>
            </div>

            {/* Bottom marker */}
            <div className="pt-4 flex items-center gap-2">
              <div className="h-px flex-1 bg-linear-to-r from-white/6 to-transparent" />
              <span className="text-[7px] font-mono text-white/10 tracking-[0.3em] uppercase">
                EOF
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
