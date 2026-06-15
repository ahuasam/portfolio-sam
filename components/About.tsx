"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, Brain, Target, Users } from "lucide-react";

const traits = [
  { icon: Rocket, title: "Vision Innovante",   desc: "Toujours à la pointe des dernières technologies pour proposer des solutions avant-gardistes." },
  { icon: Brain,  title: "Expert IA",           desc: "Maîtrise des algorithmes d'apprentissage automatique et des outils d'intelligence artificielle." },
  { icon: Target, title: "Orienté Résultats",   desc: "Chaque projet est mené avec précision pour atteindre les objectifs définis." },
  { icon: Users,  title: "Partenaire Fiable",   desc: "Un accompagnement personnalisé tout au long de votre transformation digitale." },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-24 overflow-hidden" style={{ background: "#070b14" }}>
      {/* Divider line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.15), transparent)" }} />
      {/* Ambient */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(0,180,255,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block glass-cyan text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            À Propos
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Qui suis-<span className="gradient-text">je</span> ?
          </h2>
          <div className="section-divider max-w-xs mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-5 text-gray-300 text-base leading-relaxed">
              <p>
                Passionné par le digital et la technologie depuis toujours, je suis{" "}
                <span className="text-cyan-400 font-semibold">AHUA ANOH AUGUSTE SAMUEL</span>,
                ingénieur informatique et expert en intelligence artificielle.
              </p>
              <p>
                Ma <span className="text-blue-400 font-semibold">vision</span> est claire :
                exploiter la puissance du digital et de l&apos;IA pour aider les entreprises à se
                transformer, gagner en efficacité et se démarquer dans un monde compétitif.
              </p>
              <p>
                Que ce soit pour créer votre présence en ligne, automatiser vos processus grâce
                à l&apos;IA, former vos équipes ou gérer votre infrastructure — je suis votre{" "}
                <span className="text-cyan-400 font-semibold">partenaire technologique de confiance</span>.
              </p>
            </div>

            {/* Progress bars */}
            <div className="mt-8 space-y-4">
              {[
                { label: "Développement Web",       value: 95 },
                { label: "Intelligence Artificielle", value: 88 },
                { label: "Génie Informatique",        value: 92 },
                { label: "Stratégie Digitale",        value: 85 },
              ].map((skill, i) => (
                <div key={skill.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-gray-300 font-medium">{skill.label}</span>
                    <span className="gradient-text font-bold">{skill.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.05)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={inView ? { width: `${skill.value}%` } : {}}
                      transition={{ duration: 1.2, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: "linear-gradient(90deg, #0066ff, #00d4ff)" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — trait cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {traits.map((trait, i) => (
              <motion.div
                key={trait.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="glass rounded-2xl p-5 transition-all duration-300 group cursor-default hover-lift"
                style={{ border: "1px solid rgba(255,255,255,0.06)" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300"
                  style={{ background: "linear-gradient(135deg, rgba(0,100,255,0.3), rgba(0,212,255,0.2))" }}>
                  <trait.icon size={20} className="text-cyan-400" />
                </div>
                <h3 className="text-white font-bold text-sm mb-2">{trait.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{trait.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
