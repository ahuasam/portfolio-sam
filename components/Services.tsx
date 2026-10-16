"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE, Reveal, SectionHead } from "./Motion";

const services = [
  {
    title: "Sites & plateformes web",
    desc: "Sites vitrines, e-commerce avec paiement mobile money, landing pages. Rapides, responsive et pensés pour être trouvés sur Google.",
    items: ["Design sur mesure", "Next.js / React", "SEO technique", "Hébergement & suivi"],
  },
  {
    title: "Applications & logiciels métier",
    desc: "Applications mobiles iOS / Android et outils internes (ERP, CRM, gestion RH) qui remplacent les fichiers Excel et les tâches répétitives.",
    items: ["React Native / Flutter", "Bases de données", "API & intégrations", "Maintenance évolutive"],
  },
  {
    title: "Intelligence artificielle",
    desc: "Chatbots de support client, automatisation de processus, analyse de documents et vision par ordinateur, branchés sur vos outils existants.",
    items: ["Assistants conversationnels", "Automatisation", "Vision / détection", "Analyse de données"],
  },
  {
    title: "Identité visuelle & contenus",
    desc: "Logo, charte graphique, affiches événementielles, motion design et montage vidéo pour les réseaux sociaux.",
    items: ["Branding", "Affiches print & web", "Montage vidéo", "Community management"],
  },
  {
    title: "Infrastructure & maintenance",
    desc: "Installation et sécurisation de réseaux, diagnostic et maintenance du parc informatique, mise en place du cloud.",
    items: ["LAN / Wi-Fi", "Cybersécurité", "Cloud", "Contrat de maintenance"],
  },
  {
    title: "Formation",
    desc: "Sessions pratiques pour vos équipes : outils numériques, développement web, usage de l'IA au quotidien. En présentiel ou en ligne.",
    items: ["Sur mesure", "Supports fournis", "Cas réels", "Attestation"],
  },
];

export default function Services() {
  const [open, setOpen] = useState(0);

  return (
    <section id="services" className="py-24 md:py-36 bg-paper-2">
      <div className="container-x">
        <SectionHead index="02" label="Expertise" title="Ce que je peux faire pour votre entreprise." />

        <ul className="border-t border-ink">
          {services.map((s, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={s.title} delay={i * 0.04} className="border-b border-ink/20">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="group w-full grid grid-cols-12 items-baseline gap-4 py-6 md:py-8 text-left"
                >
                  <span className="col-span-2 md:col-span-1 eyebrow text-mute">0{i + 1}</span>
                  <span className={`col-span-8 md:col-span-9 font-serif text-3xl md:text-5xl tracking-tight transition-all duration-500 group-hover:translate-x-3 ${isOpen ? "text-royal" : ""}`}>
                    {s.title}
                  </span>
                  <span className="col-span-2 justify-self-end text-2xl">
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE }} className="inline-block">+</motion.span>
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-12 gap-4 pb-10">
                        <p className="col-span-12 md:col-start-2 md:col-span-6 text-ink-2 text-lg leading-relaxed">{s.desc}</p>
                        <ul className="col-span-12 md:col-start-9 md:col-span-4 flex flex-wrap gap-2 content-start">
                          {s.items.map((it) => (
                            <li key={it} className="rounded-full border border-ink/25 px-3 py-1 text-sm">{it}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
