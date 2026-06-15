"use client";
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Globe, Layout, Code, Video, Bot, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const categories = ["Tous", "Web", "Design", "Logiciels", "IA", "Vidéo", "Affiches"];

const projects = [
  {
    id: 1,
    title: "Plateforme E-Commerce",
    category: "Web",
    desc: "Application web e-commerce complète avec paiement mobile money intégré.",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    tags: ["Next.js", "Stripe", "MongoDB"],
    image: "/projets/projet-ecommerce.jpg",
  },
  {
    id: 2,
    title: "Campagne Publicitaire",
    category: "Affiches",
    desc: "Affiche événementielle pour le GIGA Festival de la Mode 3.0 — Dabou.",
    icon: ImageIcon,
    color: "from-amber-500 to-orange-500",
    tags: ["Photoshop", "Illustrator", "Print"],
    image: "/projets/projet-campagne.png",
  },
  {
    id: 3,
    title: "Chatbot IA Entreprise",
    category: "IA",
    desc: "Assistant IA intelligent pour automatiser le support client 24/7.",
    icon: Bot,
    color: "from-violet-500 to-purple-600",
    tags: ["Python", "OpenAI", "FastAPI"],
    image: "/projets/projet-chatbot.png",
  },
  {
    id: 4,
    title: "Dashboard Analytics",
    category: "Web",
    desc: "Tableau de bord de visualisation de données en temps réel.",
    icon: Layout,
    color: "from-cyan-500 to-blue-500",
    tags: ["React", "D3.js", "Node.js"],
    image: "/projets/projet-dashboard.jpg",
  },
  {
    id: 5,
    title: "Application Mobile RH",
    category: "Logiciels",
    desc: "Système de gestion des ressources humaines pour PME.",
    icon: Code,
    color: "from-green-500 to-emerald-500",
    tags: ["React Native", "Firebase"],
    image: "/projets/projet-mobile.jpg",
  },
  {
    id: 6,
    title: "Identité Visuelle Brand",
    category: "Design",
    desc: "Création complète de l'identité visuelle de Korha Création — brand élégant mode & lifestyle.",
    icon: Layout,
    color: "from-fuchsia-500 to-violet-500",
    tags: ["Photoshop", "Illustrator", "Branding"],
    image: "/projets/projet-brand.png",
  },
  {
    id: 7,
    title: "Vidéo Promotionnelle",
    category: "Vidéo",
    desc: "Motion design et montage vidéo professionnel pour le lancement d'un produit tech.",
    icon: Video,
    color: "from-orange-500 to-red-500",
    tags: ["After Effects", "Premiere Pro"],
    image: null,
    video: "/projets/projet-video.mp4",
  },
  {
    id: 8,
    title: "Système IA de Détection",
    category: "IA",
    desc: "Modèle de vision artificielle pour contrôle qualité et détection IA en temps réel.",
    icon: Bot,
    color: "from-teal-500 to-cyan-500",
    tags: ["Python", "TensorFlow", "OpenCV"],
    image: "/projets/projet-ia-detection.jpg",
  },
  {
    id: 9,
    title: "Site Portfolio Médecin",
    category: "Web",
    desc: "Site médical professionnel responsive avec système de prise de rendez-vous en ligne.",
    icon: Globe,
    color: "from-blue-400 to-indigo-500",
    tags: ["Next.js", "Tailwind", "Prisma"],
    image: "/projets/projet-medecin.png",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeFilter, setActiveFilter] = useState("Tous");

  const filtered = activeFilter === "Tous" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="relative py-24 overflow-hidden" style={{ background: "#070b14" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.1), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block glass-cyan text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Mes <span className="gradient-text">Réalisations</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Une sélection de projets réalisés pour des clients et des entreprises de divers secteurs.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-4" />
        </motion.div>

        {/* Filter buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                activeFilter === cat
                  ? "text-white shadow-lg"
                  : "glass border border-white/10 text-gray-400 hover:text-white hover:border-cyan-500/30"
              }`}
              style={activeFilter === cat ? { background: "linear-gradient(135deg,#0066ff,#00d4ff)" } : {}}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35 }}
                whileHover={{ y: -6 }}
                className="group glass border border-white/5 hover:border-cyan-500/20 rounded-2xl overflow-hidden transition-all duration-300"
              >
                {/* Image / Video */}
                <div className="relative h-48 overflow-hidden">
                  {project.image ? (
                    <>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all duration-300" />
                    </>
                  ) : ("video" in project && project.video) ? (
                    <>
                      <video
                        src={(project as {video: string}).video}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                    </>
                  ) : (
                    <>
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10`} />
                      <div className="absolute inset-0 grid-bg opacity-30" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <project.icon size={48} className="text-white/30 group-hover:text-white/50 transition-all duration-300 group-hover:scale-110" />
                      </div>
                    </>
                  )}

                  {/* Hover overlay with button */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="glass border border-white/30 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 backdrop-blur-sm"
                    >
                      <ExternalLink size={12} />
                      Voir le projet
                    </motion.button>
                  </div>

                  {/* Category badge */}
                  <div className={`absolute top-3 left-3 bg-gradient-to-r ${project.color} text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg`}>
                    {project.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-white font-bold text-sm mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4">{project.desc}</p>
                  {project.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="glass text-gray-400 text-[10px] px-2.5 py-1 rounded-full border border-white/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-500 text-xs">
            Contactez-moi pour voir plus de réalisations et discuter de votre projet.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
