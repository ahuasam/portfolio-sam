"use client";
import { motion } from "framer-motion";
import { EASE, Reveal, SectionHead } from "./Motion";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons";

type Tool = { name: string; icon: string; invert?: boolean };

const groups: { label: string; tools: Tool[] }[] = [
  {
    label: "Front-end",
    tools: [
      { name: "HTML5", icon: "html5/html5-original" },
      { name: "CSS3", icon: "css3/css3-original" },
      { name: "JavaScript", icon: "javascript/javascript-original" },
      { name: "TypeScript", icon: "typescript/typescript-original" },
      { name: "React", icon: "react/react-original" },
      { name: "Next.js", icon: "nextjs/nextjs-original", invert: true },
      { name: "Tailwind", icon: "tailwindcss/tailwindcss-original" },
      { name: "Flutter", icon: "flutter/flutter-original" },
    ],
  },
  {
    label: "Back-end & données",
    tools: [
      { name: "Node.js", icon: "nodejs/nodejs-original" },
      { name: "Python", icon: "python/python-original" },
      { name: "PHP", icon: "php/php-original" },
      { name: "FastAPI", icon: "fastapi/fastapi-original" },
      { name: "MongoDB", icon: "mongodb/mongodb-original" },
      { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
      { name: "MySQL", icon: "mysql/mysql-original" },
      { name: "Firebase", icon: "firebase/firebase-original" },
      { name: "Prisma", icon: "prisma/prisma-original", invert: true },
    ],
  },
  {
    label: "IA & infrastructure",
    tools: [
      { name: "TensorFlow", icon: "tensorflow/tensorflow-original" },
      { name: "OpenCV", icon: "opencv/opencv-original" },
      { name: "Docker", icon: "docker/docker-original" },
      { name: "Linux", icon: "linux/linux-original" },
      { name: "Git", icon: "git/git-original" },
      { name: "GitHub", icon: "github/github-original", invert: true },
      { name: "WordPress", icon: "wordpress/wordpress-plain" },
    ],
  },
  {
    label: "Design & vidéo",
    tools: [
      { name: "Figma", icon: "figma/figma-original" },
      { name: "Photoshop", icon: "photoshop/photoshop-original" },
      { name: "Illustrator", icon: "illustrator/illustrator-plain" },
      { name: "Premiere Pro", icon: "premierepro/premierepro-original" },
      { name: "After Effects", icon: "aftereffects/aftereffects-original" },
    ],
  },
];

const all = groups.flatMap((g) => g.tools);

function Logo({ t, size = 28 }: { t: Tool; size?: number }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`${CDN}/${t.icon}.svg`} alt="" width={size} height={size} loading="lazy" className={t.invert ? "invert" : ""} />
  );
}

export default function Skills() {
  return (
    <section id="stack" className="py-24 md:py-36 bg-night text-paper overflow-hidden">
      <div className="container-x [&_.border-line]:border-white/15 [&_.text-ink]:text-paper">
        <SectionHead index="03" label="Stack" title="Les outils avec lesquels je travaille chaque jour." />
      </div>

      <div className="marquee-wrap space-y-4 -rotate-1 my-4">
        {[false, true].map((rev) => (
          <div key={String(rev)} className="flex overflow-hidden">
            <div className={`marquee ${rev ? "reverse" : ""}`}>
              {[...all, ...all].map((t, i) => (
                <div key={i} className="mx-2 flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 whitespace-nowrap">
                  <Logo t={t} size={26} />
                  <span className="text-sm text-white/80">{t.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="container-x mt-20 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
        {groups.map((g, gi) => (
          <Reveal key={g.label} delay={gi * 0.08} className="bg-night p-6 md:p-8">
            <p className="eyebrow text-white/50 mb-8">{g.label}</p>
            <ul className="grid grid-cols-3 gap-y-7 gap-x-3">
              {g.tools.map((t, i) => (
                <motion.li
                  key={t.name}
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: gi * 0.08 + i * 0.04, ease: EASE }}
                  whileHover={{ y: -6 }}
                  className="flex flex-col items-center gap-2 text-center"
                >
                  <Logo t={t} size={36} />
                  <span className="text-[11px] text-white/60">{t.name}</span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
