"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { EASE } from "./Motion";

const stats = [
  { value: "5+", label: "ans de pratique" },
  { value: "100+", label: "projets livrés" },
  { value: "50+", label: "clients accompagnés" },
  { value: "10+", label: "outils IA déployés" },
];

function AbidjanClock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = () =>
      setTime(new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Africa/Abidjan" }).format(new Date()));
    fmt();
    const id = setInterval(fmt, 15000);
    return () => clearInterval(id);
  }, []);
  return <span suppressHydrationWarning>{time || "--:--"}</span>;
}

const line = (delay: number) => ({
  initial: { y: "105%" },
  animate: { y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section id="top" ref={ref} className="relative pt-28 md:pt-32 pb-16 md:pb-24">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-between gap-y-2 eyebrow text-mute border-b border-line pb-4"
        >
          <span>Ingénieur informatique — Développeur — IA</span>
          <span>Abidjan, CI · <AbidjanClock /> GMT</span>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mt-10 md:mt-14 items-end">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-[clamp(3rem,8.4vw,7.6rem)] leading-[0.95] tracking-[-0.03em]">
              <span className="block overflow-hidden"><motion.span className="block" {...line(0.1)}>Des sites, des apps</motion.span></span>
              <span className="block overflow-hidden"><motion.span className="block" {...line(0.18)}>et de l&apos;<em className="text-royal">IA</em> qui servent</motion.span></span>
              <span className="block overflow-hidden"><motion.span className="block" {...line(0.26)}>votre business.</motion.span></span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="mt-10 grid sm:grid-cols-2 gap-8 max-w-2xl"
            >
              <p className="text-ink-2 leading-relaxed">
                Je suis <strong className="font-medium text-ink">AHUA ANOH Auguste Samuel</strong>. J&apos;aide les entreprises
                ivoiriennes et internationales à se digitaliser : produits web, automatisation, image de marque.
              </p>
              <div className="flex flex-col gap-3 sm:items-start">
                <a href="#work" className="group inline-flex items-center justify-between gap-6 rounded-full bg-ink text-paper pl-6 pr-2 py-2 hover:bg-royal transition-colors">
                  Voir les projets
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-paper text-ink transition-transform duration-500 group-hover:rotate-[-45deg]">→</span>
                </a>
                <a href="#contact" className="link-u text-sm ml-6">Démarrer un projet</a>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              animate={{ clipPath: "inset(0% 0 0 0)" }}
              transition={{ duration: 0.9, delay: 0, ease: EASE }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm bg-paper-2"
            >
              <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
                <Image
                  src="/portrait.jpg"
                  alt="Portrait de Samuel Ahua"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-[50%_20%]"
                />
              </motion.div>
              <div className="absolute bottom-4 left-4 right-4 flex justify-between eyebrow text-white/90 mix-blend-difference">
                <span>Samuel Ahua</span>
                <span>Portrait — 2026</span>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.dl
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.6 } } }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 border-t border-line"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.8, ease: EASE }}
              className={`pt-6 pb-2 ${i % 2 === 0 ? "pr-4" : "pl-4 md:pl-6"} ${i > 0 ? "md:border-l md:border-line md:pl-6" : ""}`}
            >
              <dt className="eyebrow text-mute order-2">{s.label}</dt>
              <dd className="font-serif text-5xl md:text-6xl mt-2">{s.value}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
