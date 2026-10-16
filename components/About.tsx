"use client";
import { Reveal, SectionHead } from "./Motion";

const facts = [
  ["Basé à", "Abidjan, Côte d'Ivoire"],
  ["Formation", "Ingénieur informatique"],
  ["Spécialités", "Web, IA, design, réseaux"],
  ["Langues", "Français, anglais"],
  ["Collaboration", "Sur site ou à distance"],
];

export default function About() {
  return (
    <section id="about" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHead index="01" label="Profil" title="Un seul interlocuteur, du code à l'image de marque." />

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-start-4 md:col-span-5 space-y-6 text-lg leading-relaxed text-ink-2">
            <Reveal>
              <p>
                <span className="font-serif text-3xl text-ink leading-none">J</span>&apos;ai commencé par réparer des ordinateurs
                et configurer des réseaux. Aujourd&apos;hui, je conçois des plateformes web, des logiciels métier et des
                assistants IA pour des PME, des marques et des institutions.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Ma conviction : un bon outil numérique doit faire gagner du temps ou de l&apos;argent, sinon il ne sert à
                rien. Je m&apos;intéresse donc autant à votre activité qu&apos;à la technique.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Comme je maîtrise aussi le design graphique et la vidéo, vous n&apos;avez pas à coordonner trois
                prestataires : le site, l&apos;affiche et la campagne parlent la même langue.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="md:col-start-10 md:col-span-3">
            <dl className="text-sm">
              {facts.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-4 border-b border-line py-3">
                  <dt className="text-mute">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
