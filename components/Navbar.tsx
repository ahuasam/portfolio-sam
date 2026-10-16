"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { EASE } from "./Motion";

const links = [
  { label: "Profil", href: "#about" },
  { label: "Expertise", href: "#services" },
  { label: "Stack", href: "#stack" },
  { label: "Projets", href: "#work" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${scrolled ? "bg-paper/85 backdrop-blur-md border-b border-line" : ""}`}
      >
        <div className="container-x flex h-16 items-center justify-between">
          <a href="#top" className="font-serif text-2xl leading-none">
            Samuel Ahua<span className="text-royal">.</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="link-u text-ink-2 hover:text-ink transition-colors">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            <a href="/CV-AHUA-ANOH-AUGUSTE-SAMUEL.pdf" download className="text-sm link-u">CV ↓</a>
            <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm text-paper hover:bg-royal transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Disponible
            </a>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden eyebrow" aria-expanded={open} aria-label="Menu">
            {open ? "Fermer" : "Menu"}
          </button>
        </div>
        <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 right-0 h-px origin-left bg-royal" />
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
            className="fixed inset-0 z-40 bg-ink text-paper md:hidden pt-24"
          >
            <div className="container-x flex flex-col gap-2">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: EASE }}
                  className="font-serif text-5xl py-2 border-b border-white/10"
                >
                  <span className="eyebrow text-white/40 mr-4 align-middle">0{i + 1}</span>
                  {l.label}
                </motion.a>
              ))}
              <a href="/CV-AHUA-ANOH-AUGUSTE-SAMUEL.pdf" download className="mt-8 eyebrow text-white/70">Télécharger le CV ↓</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
