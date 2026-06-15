"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Brain, Cpu, Wrench, Network, TrendingUp, Share2, Palette, Code, Building2 } from "lucide-react";

const skills = [
  { icon: Globe,     title: "Développement Web",       desc: "Sites et applications web modernes, rapides et responsive",      color: "from-cyan-500 to-blue-500",       delay: 0 },
  { icon: Brain,     title: "Intelligence Artificielle", desc: "Chatbots, automatisation IA, machine learning, NLP",            color: "from-blue-500 to-indigo-600",     delay: 0.05 },
  { icon: Cpu,       title: "Génie Informatique",       desc: "Architecture systèmes, algorithmique, optimisation",             color: "from-cyan-400 to-blue-600",       delay: 0.1 },
  { icon: Wrench,    title: "Maintenance Informatique", desc: "Diagnostic, réparation et maintenance de systèmes",              color: "from-orange-500 to-red-500",      delay: 0.15 },
  { icon: Network,   title: "Réseaux Informatiques",    desc: "Configuration, sécurité et gestion des réseaux",                 color: "from-green-500 to-emerald-500",   delay: 0.2 },
  { icon: TrendingUp,title: "Développement Digital",    desc: "Stratégie digitale, SEO, growth hacking",                       color: "from-pink-500 to-rose-500",       delay: 0.25 },
  { icon: Share2,    title: "Gestion Réseaux Sociaux",  desc: "Community management, contenu, publicité",                      color: "from-blue-400 to-cyan-500",       delay: 0.3 },
  { icon: Palette,   title: "Design Graphique",         desc: "Identité visuelle, UI/UX, motion design",                       color: "from-fuchsia-500 to-violet-500",  delay: 0.35 },
  { icon: Code,      title: "Création de Logiciels",    desc: "Applications desktop, ERP, CRM sur mesure",                    color: "from-teal-500 to-cyan-500",       delay: 0.4 },
  { icon: Building2, title: "Solutions Entreprises",    desc: "Transformation digitale, conseil, intégration",                 color: "from-amber-500 to-yellow-500",    delay: 0.45 },
];

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="relative py-24 overflow-hidden" style={{ background: "#080c16" }}>
      <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,150,255,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,200,255,0.06) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block glass-cyan text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            Compétences
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Mes <span className="gradient-text">Expertises</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Un arsenal complet de compétences techniques et digitales pour répondre à tous vos besoins.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: skill.delay }}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group glass rounded-2xl p-5 cursor-default transition-all duration-300 relative overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.25)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)")}
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${skill.color} bg-opacity-20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative`}>
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${skill.color} opacity-15`} />
                <skill.icon size={22} className="text-white relative z-10" />
              </div>
              <h3 className="text-white font-bold text-sm mb-2 leading-tight">{skill.title}</h3>
              <p className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-400 transition-colors">{skill.desc}</p>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300 rounded-b-2xl`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
