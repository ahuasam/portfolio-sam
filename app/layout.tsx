import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#020209",
};

export const metadata: Metadata = {
  title: "AHUA ANOH AUGUSTE SAMUEL | Digital Business Developer & Expert IA",
  description:
    "Portfolio professionnel de AHUA ANOH AUGUSTE SAMUEL — Digital Business Developer, Développeur Web, Ingénieur Informatique, Expert IA. Solutions digitales innovantes pour entreprises.",
  keywords:
    "développeur web, expert IA, ingénieur informatique, digital business, Côte d'Ivoire, portfolio, intelligence artificielle",
  openGraph: {
    title: "AHUA ANOH AUGUSTE SAMUEL | Expert IA & Développeur Web",
    description: "Portfolio professionnel — Solutions digitales et IA pour entreprises",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
