"use client";
import { motion, type HTMLMotionProps } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ delay = 0, y = 28, ...props }: HTMLMotionProps<"div"> & { delay?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      {...props}
    />
  );
}

export function SplitWords({ text, className, delay = 0, as = "span" }: { text: string; className?: string; delay?: number; as?: "span" | "h1" | "h2" }) {
  const Tag = motion[as];
  return (
    <Tag className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span
            className="inline-block"
            variants={{ hidden: { y: "110%" }, show: { y: 0 } }}
            transition={{ duration: 0.9, delay: delay + i * 0.05, ease: EASE }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function SectionHead({ index, label, title }: { index: string; label: string; title: string }) {
  return (
    <div className="grid md:grid-cols-12 gap-6 border-t border-line pt-6 mb-14 md:mb-20">
      <Reveal className="md:col-span-3 flex gap-6 eyebrow text-mute">
        <span>{index}</span>
        <span className="text-ink">{label}</span>
      </Reveal>
      <SplitWords as="h2" text={title} className="md:col-span-9 font-serif text-[clamp(2.2rem,5.5vw,4.6rem)] leading-[1.02] tracking-[-0.02em]" />
    </div>
  );
}
