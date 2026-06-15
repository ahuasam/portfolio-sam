"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Download, ChevronDown } from "lucide-react";
import Image from "next/image";

const WA_LINK = "https://api.whatsapp.com/send/?phone=2250161863212&text&type=phone_number&app_absent=0";

const titles = [
  "Digital Business Developer",
  "Développeur Web Full Stack",
  "Ingénieur Informatique",
  "Expert en Intelligence Artificielle",
];

const stats = [
  { value: "5+",   label: "Années d'Expérience" },
  { value: "100+", label: "Projets Réalisés" },
  { value: "50+",  label: "Clients Satisfaits" },
  { value: "10+",  label: "Solutions IA" },
];

/* ── Particles ── */
function ParticlesCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    type P = { x: number; y: number; vx: number; vy: number; r: number };
    const pts: P[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.4 + 0.3,
    }));
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,212,255,0.5)"; ctx.fill();
      });
      pts.forEach((a, i) => {
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,180,255,${0.07 * (1 - d / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}

/* ── Typewriter ── */
function TypewriterText() {
  const [idx, setIdx]         = useState(0);
  const [text, setText]       = useState("");
  const [deleting, setDel]    = useState(false);

  useEffect(() => {
    const current = titles[idx];
    const t = deleting
      ? setTimeout(() => {
          setText(d => d.slice(0, -1));
          if (text.length <= 1) { setDel(false); setIdx(i => (i + 1) % titles.length); }
        }, 35)
      : setTimeout(() => {
          setText(current.slice(0, text.length + 1));
          if (text.length === current.length) setTimeout(() => setDel(true), 2200);
        }, 70);
    return () => clearTimeout(t);
  }, [text, deleting, idx]);

  return (
    <span className="text-white font-bold">
      {text}
      <span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

/* ── Social links ── */
const socials = [
  { label: "Facebook",  href: "#", svg: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" fill="none" /> },
  { label: "Instagram", href: "#", svg: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" strokeWidth="2" stroke="currentColor" fill="none" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" strokeWidth="2" stroke="currentColor" fill="none" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2" strokeLinecap="round" stroke="currentColor" /></> },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/ahua-anoh/", svg: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" strokeWidth="2" stroke="currentColor" fill="none" /><rect x="2" y="9" width="4" height="12" strokeWidth="2" stroke="currentColor" fill="none" /><circle cx="4" cy="4" r="2" strokeWidth="2" stroke="currentColor" fill="none" /></> },
];

export default function Hero() {
  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#070b14" }}>
      <ParticlesCanvas />

      {/* ── Smoke / fog effects ── */}
      <div className="smoke-left" />
      <div className="smoke-right" />

      {/* Extra ambient glow top-left */}
      <div className="absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,160,255,0.12) 0%, transparent 65%)", filter: "blur(40px)" }} />
      {/* Bottom right */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,100,220,0.09) 0%, transparent 65%)", filter: "blur(50px)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── LEFT — Photo ── */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex justify-center lg:justify-start order-2 lg:order-1"
          >
            <div className="relative">
              {/* Outer smoke ring */}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(0,180,255,0.22) 0%, transparent 68%)", filter: "blur(30px)", transform: "scale(1.3)" }} />

              {/* Rotating decorative arc */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "conic-gradient(from 0deg, transparent 65%, rgba(0,212,255,0.6) 78%, transparent 92%)",
                  borderRadius: "50%",
                }}
              />

              {/* Counter-rotating inner arc */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full pointer-events-none"
                style={{
                  background: "conic-gradient(from 180deg, transparent 65%, rgba(0,150,255,0.4) 78%, transparent 92%)",
                  borderRadius: "50%",
                }}
              />

              {/* Solid outer ring */}
              <div className="absolute inset-0 rounded-full pointer-events-none"
                style={{ border: "2px solid rgba(0,212,255,0.25)", borderRadius: "50%", boxShadow: "0 0 40px rgba(0,212,255,0.2), inset 0 0 40px rgba(0,212,255,0.05)" }} />

              {/* Decorative semi-circle shape (from reference) */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: "rgba(0,180,255,0.12)", border: "2px solid rgba(0,212,255,0.3)", filter: "blur(2px)" }} />

              {/* Main photo container */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden"
                style={{ border: "3px solid rgba(0,212,255,0.4)", boxShadow: "0 0 60px rgba(0,212,255,0.3), 0 0 120px rgba(0,100,255,0.15), inset 0 0 40px rgba(0,212,255,0.08)" }}
              >
                <Image
                  src="/photo.png"
                  alt="AHUA ANOH AUGUSTE SAMUEL — Digital Business Developer & Expert IA"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 400px"
                />
                {/* Bottom fade */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-[#070b14]/50 via-transparent to-transparent pointer-events-none" />
                {/* Scan line */}
                <motion.div
                  animate={{ y: ["0%", "100%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                  className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none"
                />
                {/* Inner vignette */}
                <div className="absolute inset-0 rounded-full pointer-events-none"
                  style={{ boxShadow: "inset 0 0 50px rgba(0,212,255,0.12)" }} />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-4 glass-cyan rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-[11px] font-bold">Expert IA</span>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -right-6 glass rounded-xl px-3 py-1.5 flex items-center gap-1.5 shadow-lg"
                style={{ border: "1px solid rgba(0,212,255,0.2)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span className="text-blue-300 text-[11px] font-bold">Dev Web</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ── RIGHT — Content ── */}
          <div className="order-1 lg:order-2">
            {/* Hello */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-gray-400 text-lg font-medium mb-1"
            >
              Hello, I&apos;m
            </motion.p>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-3 text-white text-glow-white"
            >
              AHUA ANOH
              <br />
              <span className="gradient-text">AUGUSTE SAMUEL</span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl mb-5 h-8 flex items-center"
            >
              <span className="text-gray-400 mr-2">And I&apos;m a</span>
              <TypewriterText />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-400 text-sm sm:text-base leading-relaxed mb-7 max-w-lg"
            >
              Je conçois des solutions digitales innovantes et des systèmes d&apos;intelligence
              artificielle qui transforment les entreprises. Votre partenaire tech de confiance
              en Côte d&apos;Ivoire et à l&apos;international.
            </motion.p>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.38 }}
              className="flex items-center gap-3 mb-8"
            >
              <a href="mailto:ahuaanoh@gmail.com" className="social-icon" aria-label="Email" title="ahuaanoh@gmail.com">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </a>
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="social-icon" aria-label={s.label} target="_blank" rel="noopener noreferrer">
                  <svg width="16" height="16" viewBox="0 0 24 24">{s.svg}</svg>
                </a>
              ))}
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="WhatsApp" title="WhatsApp">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                onClick={() => scrollTo("contact")}
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,212,255,0.4)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-lg text-white font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                style={{ background: "linear-gradient(135deg, #0066ff, #00aaff)", boxShadow: "0 4px 20px rgba(0,150,255,0.35)" }}
              >
                Engagez-moi
              </motion.button>

              <motion.button
                onClick={() => scrollTo("contact")}
                whileHover={{ scale: 1.05, background: "rgba(0,212,255,0.1)" }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-lg text-cyan-400 font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300"
                style={{ border: "2px solid rgba(0,212,255,0.5)" }}
              >
                Me Contacter
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* ── Stats bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-20 grid grid-cols-2 sm:grid-cols-4"
          style={{ borderTop: "1px solid rgba(0,212,255,0.1)" }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -4 }}
              className={`py-6 text-center cursor-default transition-all duration-300 ${
                i < stats.length - 1 ? "border-r border-white/5" : ""
              }`}
            >
              <div className="text-3xl sm:text-4xl font-black gradient-text mb-1">{stat.value}</div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollTo("about")}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500 hover:text-cyan-400 transition-colors cursor-pointer"
      >
        <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
        <ChevronDown size={16} />
      </motion.button>
    </section>
  );
}
