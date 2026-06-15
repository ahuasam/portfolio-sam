"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Code, Smartphone, Bot, Wrench, Network, TrendingUp, GraduationCap, Megaphone, Video } from "lucide-react";

const services = [
  { icon: Globe,        title: "Création de Sites Web",         desc: "Sites vitrine, e-commerce, landing pages — modernes, rapides et optimisés SEO.", price: "Sur devis", color: "from-cyan-500 to-blue-500", features: ["Design sur mesure", "Responsive mobile", "Optimisation SEO", "Performance maximale"] },
  { icon: Code,         title: "Création de Logiciels",         desc: "Applications desktop et ERP/CRM personnalisés pour automatiser vos processus.",  price: "Sur devis", color: "from-blue-500 to-indigo-600", features: ["Architecture scalable", "Interface intuitive", "Base de données", "Support continu"] },
  { icon: Smartphone,   title: "Développement d'Applications",  desc: "Applications mobiles iOS & Android natives ou cross-platform modernes.",          price: "Sur devis", color: "from-pink-500 to-rose-500",   features: ["iOS & Android", "UX premium", "Notifications push", "API integration"] },
  { icon: Bot,          title: "Solutions IA",                  desc: "Chatbots intelligents, automatisation, analyse de données et ML.",                price: "Sur devis", color: "from-cyan-400 to-blue-600",   features: ["Chatbots IA", "Automatisation", "Machine Learning", "NLP avancé"], featured: true },
  { icon: Wrench,       title: "Maintenance Informatique",      desc: "Diagnostic, réparation et maintenance préventive de vos équipements.",           price: "Sur devis", color: "from-orange-500 to-amber-500", features: ["Diagnostic complet", "Réparation rapide", "Contrat maintenance", "Support 24/7"] },
  { icon: Network,      title: "Réseaux & Systèmes",            desc: "Installation, configuration et sécurisation de vos infrastructures réseau.",     price: "Sur devis", color: "from-green-500 to-emerald-500",features: ["LAN/WAN", "Cybersécurité", "Cloud setup", "Monitoring"] },
  { icon: TrendingUp,   title: "Gestion Digitale",              desc: "Stratégie digitale, SEO, community management et publicité en ligne.",           price: "Sur devis", color: "from-indigo-500 to-blue-500",  features: ["Stratégie social", "SEO/SEA", "Analytics", "Growth hacking"] },
  { icon: GraduationCap,title: "Formations Professionnelles",   desc: "Formations en développement web, IA, outils digitaux et informatique.",          price: "Sur devis", color: "from-teal-500 to-cyan-500",    features: ["Présentiel/En ligne", "Certifications", "Supports inclus", "Projets pratiques"] },
  { icon: Megaphone,    title: "Branding Digital",              desc: "Identité visuelle complète, logo, charte graphique et positionnement de marque.",price: "Sur devis", color: "from-fuchsia-500 to-pink-500", features: ["Logo & charte", "Brand guide", "Cohérence visuelle", "Stratégie marque"] },
  { icon: Video,        title: "Affiches & Montage Vidéo",      desc: "Création d'affiches publicitaires et montage vidéo professionnel.",              price: "Sur devis", color: "from-red-500 to-orange-500",   features: ["Affiches print/web", "Montage vidéo", "Motion design", "Réseaux sociaux"] },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative py-24 overflow-hidden" style={{ background: "#070b14" }}>
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.3), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block glass-cyan text-cyan-300 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-4">
            Services
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Ce que je <span className="gradient-text">propose</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
            Des services professionnels adaptés aux besoins de votre entreprise, de la création web aux solutions IA.
          </p>
          <div className="section-divider max-w-xs mx-auto mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -8 }}
              className={`relative glass rounded-2xl p-5 transition-all duration-300 group cursor-default overflow-hidden ${
                service.featured ? "glow-cyan" : ""
              }`}
              style={{
                border: service.featured
                  ? "1px solid rgba(0,212,255,0.4)"
                  : "1px solid rgba(255,255,255,0.05)",
              }}
              onMouseEnter={e => { if (!service.featured) e.currentTarget.style.borderColor = "rgba(0,212,255,0.2)"; }}
              onMouseLeave={e => { if (!service.featured) e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"; }}
            >
              {service.featured && (
                <div className="absolute top-3 right-3 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "linear-gradient(135deg, #0066ff, #00d4ff)" }}>
                  POPULAIRE
                </div>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 relative">
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${service.color} opacity-20`} />
                <service.icon size={20} className="text-white relative z-10" />
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{service.title}</h3>
              <p className="text-gray-400 text-xs leading-relaxed mb-4">{service.desc}</p>
              <ul className="space-y-1.5 mb-4">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                    <span className={`w-1 h-1 rounded-full bg-gradient-to-r ${service.color}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="text-xs font-bold gradient-text">{service.price}</div>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-60 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg text-white font-bold text-sm transition-all duration-300"
            style={{ background: "linear-gradient(135deg, #0066ff, #00d4ff)", boxShadow: "0 4px 25px rgba(0,150,255,0.35)" }}
          >
            Discutons de votre projet →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
