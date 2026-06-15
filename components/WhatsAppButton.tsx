"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

const WA_LINK = "https://api.whatsapp.com/send/?phone=2250161863212&text&type=phone_number&app_absent=0";

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="glass border border-green-500/30 rounded-2xl p-4 max-w-[220px] bg-green-500/5"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <p className="text-white text-xs font-semibold">Contacter sur WhatsApp</p>
              <button onClick={() => setShowTooltip(false)} aria-label="Fermer">
                <X size={12} className="text-gray-400 hover:text-white transition-colors" />
              </button>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed mb-3">
              (+225) 0161 863 212 — Réponse rapide garantie.
            </p>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
            >
              <MessageCircle size={12} />
              Démarrer la conversation
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating button */}
      <motion.button
        onClick={() => setShowTooltip(!showTooltip)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center shadow-2xl transition-colors"
        style={{ boxShadow: "0 0 30px rgba(34,197,94,0.4), 0 8px 30px rgba(0,0,0,0.4)" }}
        aria-label="Contacter sur WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20" />
        <span className="absolute inset-[-6px] rounded-full border border-green-500/20" />
        <MessageCircle size={24} className="text-white relative z-10" />
      </motion.button>
    </div>
  );
}
