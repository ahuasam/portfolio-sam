"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const CV_URL = "/CV-AHUA-ANOH-AUGUSTE-SAMUEL.pdf";

const navLinks = [
  { label: "Accueil",      href: "#home" },
  { label: "À Propos",     href: "#about" },
  { label: "Compétences",  href: "#skills" },
  { label: "Services",     href: "#services" },
  { label: "Portfolio",    href: "#portfolio" },
  { label: "Contact",      href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [active,    setActive]    = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
    setActive(id);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "py-3 backdrop-blur-xl border-b"
            : "py-5 bg-transparent"
        }`}
        style={scrolled ? { background: "rgba(7,11,20,0.85)", borderBottomColor: "rgba(0,212,255,0.1)" } : {}}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* Logo */}
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo("#home"); }}
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-black tracking-wide"
            style={{
              background: "linear-gradient(135deg, #00d4ff, #0099ff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Portfolio
          </motion.a>

          {/* Desktop links — centered */}
          <div className="hidden md:flex items-center gap-0">
            {navLinks.map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group ${
                    isActive ? "text-cyan-400" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300 ${
                      isActive ? "w-4/5" : "w-0 group-hover:w-4/5"
                    }`}
                    style={{ background: "linear-gradient(90deg, #00d4ff, #0066ff)" }}
                  />
                </motion.a>
              );
            })}
          </div>

          {/* Right — Download CV */}
          <div className="hidden md:flex items-center gap-3">
            <motion.a
              href={CV_URL}
              download="CV-AHUA-ANOH-AUGUSTE-SAMUEL.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="cv-btn flex items-center gap-2 px-5 py-2 rounded-lg text-white text-sm font-bold"
            >
              <Download size={15} />
              Download CV
            </motion.a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-white transition-colors"
            style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)" }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-40 md:hidden backdrop-blur-xl border-b"
            style={{ background: "rgba(7,11,20,0.95)", borderBottomColor: "rgba(0,212,255,0.15)" }}
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-cyan-400 transition-all"
                  style={{ background: active === link.href.replace("#", "") ? "rgba(0,212,255,0.08)" : "" }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href={CV_URL}
                download="CV-AHUA-ANOH-AUGUSTE-SAMUEL.pdf"
                className="mt-2 cv-btn px-4 py-3 rounded-lg text-center text-white text-sm font-bold flex items-center justify-center gap-2"
              >
                <Download size={15} />
                Download CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
