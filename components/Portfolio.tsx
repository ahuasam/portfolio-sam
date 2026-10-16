"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { EASE, SectionHead } from "./Motion";

type Project = { title: string; client: string; category: string; year: string; desc: string; tags: string[]; image?: string; video?: string };

const projects: Project[] = [
  { title: "GIGA Festival de la Mode 3.0", client: "Dabou", category: "Affiches", year: "2025", desc: "Affiche officielle et déclinaisons pour les réseaux sociaux.", tags: ["Photoshop", "Illustrator", "Print"], image: "/projets/projet-campagne.png" },
  { title: "Boutique en ligne", client: "Commerce de détail", category: "Web", year: "2025", desc: "E-commerce complet avec paiement mobile money et back-office.", tags: ["Next.js", "Stripe", "MongoDB"], image: "/projets/projet-ecommerce.jpg" },
  { title: "Assistant client IA", client: "PME de services", category: "IA", year: "2025", desc: "Chatbot qui répond 24 h/24 aux questions fréquentes et transfère les cas complexes.", tags: ["Python", "OpenAI", "FastAPI"], image: "/projets/projet-chatbot.png" },
  { title: "Korha Création", client: "Mode & lifestyle", category: "Design", year: "2024", desc: "Identité visuelle complète : logo, charte, packaging.", tags: ["Branding", "Illustrator"], image: "/projets/projet-brand.png" },
  { title: "Cabinet médical", client: "Santé", category: "Web", year: "2024", desc: "Site responsive avec prise de rendez-vous en ligne.", tags: ["Next.js", "Tailwind", "Prisma"], image: "/projets/projet-medecin.png" },
  { title: "Lancement produit", client: "Start-up tech", category: "Vidéo", year: "2024", desc: "Motion design et montage pour la campagne de lancement.", tags: ["After Effects", "Premiere Pro"], video: "/projets/projet-video.mp4" },
  { title: "Tableau de bord analytique", client: "Distribution", category: "Web", year: "2024", desc: "Visualisation des ventes et des stocks en temps réel.", tags: ["React", "D3.js", "Node.js"], image: "/projets/projet-dashboard.jpg" },
  { title: "Contrôle qualité par vision", client: "Industrie", category: "IA", year: "2023", desc: "Détection automatique des défauts sur chaîne de production.", tags: ["Python", "TensorFlow", "OpenCV"], image: "/projets/projet-ia-detection.jpg" },
  { title: "Application RH", client: "PME", category: "Logiciels", year: "2023", desc: "Gestion des congés, présences et fiches de paie sur mobile.", tags: ["React Native", "Firebase"], image: "/projets/projet-mobile.jpg" },
];

const filters = ["Tout", "Web", "IA", "Design", "Affiches", "Vidéo", "Logiciels"];

function Card({ p, i }: { p: Project; i: number }) {
  const tall = i % 3 === 0;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit={{ opacity: 0, scale: 0.96 }}
      variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group"
    >
      <div className={`relative overflow-hidden bg-paper-2 ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        <motion.div
          variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, show: { clipPath: "inset(0 0 0% 0)" } }}
          transition={{ duration: 1.1, ease: EASE }}
          className="absolute inset-0"
        >
          {p.video ? (
            <video src={p.video} autoPlay muted loop playsInline className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
          ) : (
            <Image src={p.image!} alt={p.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
          )}
        </motion.div>
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 eyebrow">{p.category}</span>
        <span className="absolute right-4 bottom-4 grid h-12 w-12 place-items-center rounded-full bg-paper text-ink opacity-0 translate-y-3 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">↗</span>
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-2xl md:text-3xl">{p.title}</h3>
        <span className="eyebrow text-mute shrink-0">{p.year}</span>
      </div>
      <p className="mt-1 text-ink-2">{p.desc}</p>
      <p className="mt-2 eyebrow text-mute">{p.client} · {p.tags.join(" / ")}</p>
    </motion.article>
  );
}

export default function Portfolio() {
  const [filter, setFilter] = useState("Tout");
  const list = filter === "Tout" ? projects : projects.filter((p) => p.category === filter);
  const cols = [list.filter((_, i) => i % 2 === 0), list.filter((_, i) => i % 2 === 1)];

  return (
    <section id="work" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index="04" label="Projets" title="Une sélection de travaux récents." />

        <div className="flex flex-wrap gap-2 mb-12">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative rounded-full border px-4 py-1.5 text-sm transition-colors ${filter === f ? "border-ink text-paper" : "border-line text-ink-2 hover:border-ink"}`}
            >
              {filter === f && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-ink" transition={{ duration: 0.5, ease: EASE }} />}
              <span className="relative">{f}</span>
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16">
          {cols.map((col, ci) => (
            <div key={ci} className={`space-y-16 ${ci === 1 ? "md:mt-32" : ""}`}>
              <AnimatePresence>
                {col.map((p) => (
                  <Card key={p.title} p={p} i={projects.indexOf(p)} />
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
