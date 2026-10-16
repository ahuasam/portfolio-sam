"use client";
import { Reveal, SectionHead } from "./Motion";

const steps = [
  { t: "Échange", d: "Un appel de 30 minutes pour comprendre votre activité, vos objectifs et votre budget.", w: "Semaine 1" },
  { t: "Proposition", d: "Un devis clair, un planning et des maquettes avant toute ligne de code.", w: "Semaine 1–2" },
  { t: "Réalisation", d: "Développement par étapes avec une démo à chaque jalon. Vous validez au fil de l'eau.", w: "Selon projet" },
  { t: "Lancement & suivi", d: "Mise en ligne, formation de vos équipes et maintenance si vous le souhaitez.", w: "En continu" },
];

export default function Process() {
  return (
    <section className="py-24 md:py-36 bg-paper-2">
      <div className="container-x">
        <SectionHead index="05" label="Méthode" title="Comment se déroule une collaboration." />
        <ol className="grid md:grid-cols-4 gap-px bg-line border-y border-line">
          {steps.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1} className="bg-paper-2 py-8 md:px-6 first:md:pl-0">
              <li className="list-none">
                <span className="font-serif text-7xl text-royal/90 leading-none">{i + 1}</span>
                <h3 className="mt-6 text-lg font-medium">{s.t}</h3>
                <p className="mt-2 text-ink-2 leading-relaxed">{s.d}</p>
                <p className="mt-6 eyebrow text-mute">{s.w}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
