"use client";
import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";

const footerLinks = [
  { label: "Accueil", href: "#home" },
  { label: "À Propos", href: "#about" },
  { label: "Compétences", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-start mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div>
                <span className="text-2xl font-black" style={{ background: "linear-gradient(135deg,#00d4ff,#0099ff)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Portfolio</span>
                <p className="gradient-text text-[10px] font-semibold tracking-widest uppercase">AHUA ANOH SAMUEL</p>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-xs">
              Expert en développement web, intelligence artificielle et solutions digitales pour entreprises. Votre partenaire technologique de confiance.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-center">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-gray-500 hover:text-cyan-400 text-xs transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Scroll to top */}
          <div className="flex md:justify-end">
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="glass-cyan border border-cyan-500/20 hover:border-cyan-500/50 w-10 h-10 rounded-full flex items-center justify-center text-cyan-400 transition-all duration-300"
              aria-label="Retour en haut"
            >
              <ArrowUp size={16} />
            </motion.button>
          </div>
        </div>

        <div className="section-divider mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} AHUA ANOH AUGUSTE SAMUEL. Tous droits réservés.</p>
          <p className="flex items-center gap-1">
            Conçu avec <Heart size={11} className="text-red-500 fill-red-500" /> &amp; passion pour le digital
          </p>
        </div>
      </div>
    </footer>
  );
}
