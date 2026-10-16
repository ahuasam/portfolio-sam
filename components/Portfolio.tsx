"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import type { Project } from "@/lib/projects";
import { EASE, SectionHead } from "./Motion";

function Card({ p }: { p: Project }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const Wrap = p.link ? "a" : "div";

  return (
    <motion.article
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      exit={{ opacity: 0, scale: 0.96 }}
      variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group"
    >
      <Wrap {...(p.link ? { href: p.link, target: "_blank", rel: "noopener noreferrer" } : {})} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-paper-2">
          <motion.div
            variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, show: { clipPath: "inset(0 0 0% 0)" } }}
            transition={{ duration: 1, ease: EASE }}
            className="absolute inset-0"
          >
            {p.video && !p.image ? (
              <video src={p.video} autoPlay muted loop playsInline className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            ) : (
              <Image src={p.image!} alt={p.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
            )}
          </motion.div>
          <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-0.5 eyebrow text-[10px]">{p.category}</span>
          {p.link && (
            <span className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-paper text-ink text-sm opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">↗</span>
          )}
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="font-serif text-xl leading-tight group-hover:text-royal transition-colors">{p.title}</h3>
          <span className="eyebrow text-mute shrink-0">{p.year}</span>
        </div>
        {p.desc && <p className="mt-1 text-sm text-ink-2 line-clamp-2">{p.desc}</p>}
        <p className="mt-1.5 eyebrow text-[10px] text-mute truncate">{[p.client, p.tags.join(" / ")].filter(Boolean).join(" · ")}</p>
      </Wrap>
    </motion.article>
  );
}

export default function Portfolio({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState("Tout");
  const filters = ["Tout", ...Array.from(new Set(projects.map((p) => p.category)))];
  const list = filter === "Tout" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="work" className="py-24 md:py-32">
      <div className="container-x">
        <SectionHead index="04" label="Projets" title="Une sélection de travaux récents." />

        <div className="flex flex-wrap gap-2 mb-10">
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
          <AnimatePresence>
            {list.map((p) => <Card key={p.id} p={p} />)}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
