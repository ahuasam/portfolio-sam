"use client";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, MessageCircle } from "lucide-react";

const WA_LINK = "https://api.whatsapp.com/send/?phone=2250161863212&text&type=phone_number&app_absent=0";
const FORMSUBMIT_EMAIL = "ahuaanoh@gmail.com";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("_subject", `[Portfolio] ${form.subject || "Nouveau message"} — de ${form.name}`);
      data.append("whatsapp", form.whatsapp || "Non fourni");
      data.append("message", form.message);
      data.append("_captcha", "false");
      data.append("_template", "table");
      const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
        method: "POST", headers: { Accept: "application/json" }, body: data,
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", whatsapp: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 6000);
      } else throw new Error();
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const inputCls = "w-full glass rounded-xl px-4 py-3 text-white text-sm outline-none transition-all duration-300 placeholder:text-gray-600 bg-transparent";

  return (
    <section id="contact" className="relative py-24 overflow-hidden" style={{ background: "#080c16" }}>
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(0,150,255,0.1) 0%, transparent 70%)", filter: "blur(50px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block glass-cyan text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            Contact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Travaillons <span className="gradient-text">ensemble</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Un projet ? Une question ? Contactez-moi et recevez une réponse sous 24h.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-4" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <motion.a href="mailto:ahuaanoh@gmail.com" whileHover={{ x: 4 }}
              className="glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 group block"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
            >
              <div className="w-11 h-11 rounded-xl glass-cyan flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail size={18} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-0.5">Email</p>
                <p className="text-white text-sm font-semibold">ahuaanoh@gmail.com</p>
              </div>
            </motion.a>

            <motion.a href={WA_LINK} target="_blank" rel="noopener noreferrer" whileHover={{ x: 4 }}
              className="glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 group block"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(34,197,94,0.3)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                style={{ background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)" }}>
                <Phone size={18} className="text-green-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-0.5">WhatsApp</p>
                <p className="text-white text-sm font-semibold">(+225) 0161 863 212</p>
              </div>
            </motion.a>

            <motion.div whileHover={{ x: 4 }}
              className="glass rounded-2xl p-5 flex items-center gap-4 transition-all duration-300"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)" }}>
                <MapPin size={18} className="text-violet-400" />
              </div>
              <div>
                <p className="text-gray-500 text-xs font-medium mb-0.5">Localisation</p>
                <p className="text-white text-sm font-semibold">Côte d&apos;Ivoire, Abidjan</p>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}
              className="rounded-2xl p-5"
              style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-sm font-bold">Disponible maintenant</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mb-3">
                Disponible pour des missions freelance, partenariats et projets à long terme.
              </p>
              <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors w-full"
              >
                <MessageCircle size={13} />
                Contacter sur WhatsApp
              </a>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit}
              className="glass rounded-3xl p-6 sm:p-8 space-y-4"
              style={{ border: "1px solid rgba(0,212,255,0.1)" }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Nom complet *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Votre nom"
                    className={inputCls}
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,212,255,0.4)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="votre@email.com"
                    className={inputCls}
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,212,255,0.4)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">WhatsApp</label>
                  <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+225 01 XX XX XX XX"
                    className={inputCls}
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,212,255,0.4)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-xs font-medium mb-1.5 block">Sujet *</label>
                  <select name="subject" value={form.subject} onChange={handleChange} required
                    className={inputCls}
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(0,212,255,0.4)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                  >
                    <option value="" className="bg-gray-900">Choisir un sujet</option>
                    <option value="Création de site web" className="bg-gray-900">Création de site web</option>
                    <option value="Développement d'application" className="bg-gray-900">Développement d&apos;application</option>
                    <option value="Solution IA" className="bg-gray-900">Solution IA</option>
                    <option value="Maintenance informatique" className="bg-gray-900">Maintenance informatique</option>
                    <option value="Formation professionnelle" className="bg-gray-900">Formation professionnelle</option>
                    <option value="Design graphique" className="bg-gray-900">Design graphique</option>
                    <option value="Réseaux et systèmes" className="bg-gray-900">Réseaux et systèmes</option>
                    <option value="Autre demande" className="bg-gray-900">Autre demande</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-gray-400 text-xs font-medium mb-1.5 block">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} required rows={5}
                  placeholder="Décrivez votre projet ou votre demande..."
                  className={`${inputCls} resize-none`}
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(0,212,255,0.4)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                />
              </div>

              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 rounded-xl p-4 text-sm"
                  style={{ background: "rgba(34,197,94,0.05)", border: "1px solid rgba(34,197,94,0.3)", color: "#4ade80" }}
                >
                  <CheckCircle size={18} className="shrink-0" />
                  <div>
                    <p className="font-semibold">Message envoyé avec succès !</p>
                    <p className="text-xs mt-0.5 opacity-70">Je vous répondrai dans les plus brefs délais.</p>
                  </div>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 rounded-xl p-4 text-sm"
                  style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.3)", color: "#f87171" }}
                >
                  <AlertCircle size={18} className="shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Erreur d&apos;envoi</p>
                    <p className="text-xs mt-0.5 opacity-70">
                      Contactez-moi sur{" "}
                      <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="underline text-green-400">WhatsApp</a>
                      {" "}ou à{" "}
                      <a href="mailto:ahuaanoh@gmail.com" className="underline text-cyan-400">ahuaanoh@gmail.com</a>
                    </p>
                  </div>
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 rounded-xl text-white font-bold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                style={{ background: "linear-gradient(135deg, #0066ff, #00d4ff)", boxShadow: "0 4px 20px rgba(0,150,255,0.3)" }}
              >
                {status === "sending" ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Envoi en cours...</>
                ) : (
                  <><Send size={16} />Envoyer le message</>
                )}
              </motion.button>

              <p className="text-gray-600 text-xs text-center">
                Vos données sont protégées et ne seront jamais partagées avec des tiers.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
