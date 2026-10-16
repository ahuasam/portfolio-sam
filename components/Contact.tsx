"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, Reveal, SplitWords } from "./Motion";

const WA_LINK = "https://api.whatsapp.com/send/?phone=2250161863212&text&type=phone_number&app_absent=0";
const EMAIL = "ahuaanoh@gmail.com";
const subjects = ["Site web", "Application / logiciel", "Solution IA", "Design & vidéo", "Réseaux / maintenance", "Formation", "Autre"];

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", subject: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
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
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, { method: "POST", headers: { Accept: "application/json" }, body: data });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", whatsapp: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const field = "w-full bg-transparent border-b border-white/25 py-3 text-lg outline-none placeholder:text-white/30 focus:border-white transition-colors";

  return (
    <section id="contact" className="bg-night text-paper pt-24 md:pt-36 pb-16">
      <div className="container-x">
        <p className="eyebrow text-white/50 mb-8">06 — Contact</p>
        <SplitWords as="h2" text="Parlons de votre projet." className="block font-serif text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-[-0.03em]" />

        <div className="mt-16 md:mt-24 grid lg:grid-cols-12 gap-14">
          <Reveal className="lg:col-span-4 space-y-10">
            <p className="text-white/70 text-lg leading-relaxed">
              Décrivez-moi votre besoin en quelques lignes. Je réponds sous 24 h, en général bien avant.
            </p>
            <div className="space-y-6">
              <div>
                <p className="eyebrow text-white/40 mb-1">Email</p>
                <a href={`mailto:${EMAIL}`} className="link-u text-xl">{EMAIL}</a>
              </div>
              <div>
                <p className="eyebrow text-white/40 mb-1">WhatsApp</p>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="link-u text-xl">+225 01 61 86 32 12</a>
              </div>
              <div>
                <p className="eyebrow text-white/40 mb-1">Réseaux</p>
                <a href="https://www.linkedin.com/in/ahua-anoh/" target="_blank" rel="noopener noreferrer" className="link-u text-xl">LinkedIn ↗</a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <form onSubmit={submit} className="space-y-8">
              <div className="grid sm:grid-cols-2 gap-8">
                <input required placeholder="Votre nom *" value={form.name} onChange={set("name")} className={field} />
                <input required type="email" placeholder="Email *" value={form.email} onChange={set("email")} className={field} />
              </div>
              <input type="tel" placeholder="WhatsApp (facultatif)" value={form.whatsapp} onChange={set("whatsapp")} className={field} />

              <fieldset>
                <legend className="eyebrow text-white/40 mb-4">Sujet</legend>
                <div className="flex flex-wrap gap-2">
                  {subjects.map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setForm({ ...form, subject: s })}
                      className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${form.subject === s ? "bg-paper text-ink border-paper" : "border-white/25 text-white/80 hover:border-white"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </fieldset>

              <textarea required rows={4} placeholder="Votre message *" value={form.message} onChange={set("message")} className={`${field} resize-none`} />

              <div className="flex flex-wrap items-center gap-6">
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-6 rounded-full bg-paper text-ink pl-7 pr-2 py-2 text-lg hover:bg-royal hover:text-paper transition-colors disabled:opacity-60"
                >
                  {status === "sending" ? "Envoi…" : "Envoyer"}
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                </motion.button>
                <AnimatePresence>
                  {status === "success" && (
                    <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ ease: EASE }} className="text-emerald-400">
                      Merci, message reçu. Je reviens vers vous rapidement.
                    </motion.p>
                  )}
                  {status === "error" && (
                    <motion.p initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="text-red-400">
                      L&apos;envoi a échoué. Écrivez-moi sur <a href={WA_LINK} className="underline">WhatsApp</a>.
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
