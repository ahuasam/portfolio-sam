import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--ff-serif" });
const sans = Geist({ subsets: ["latin"], variable: "--ff-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--ff-mono" });

export const viewport: Viewport = {
  themeColor: "#eef4fa",
};

export const metadata: Metadata = {
  title: "Samuel Ahua — Développeur web & solutions IA, Abidjan",
  description:
    "AHUA ANOH Auguste Samuel, ingénieur informatique basé à Abidjan. Sites web, applications, outils d'intelligence artificielle et identité visuelle pour les entreprises.",
  keywords:
    "développeur web Abidjan, expert IA Côte d'Ivoire, ingénieur informatique, création site web, chatbot, Samuel Ahua",
  openGraph: {
    title: "Samuel Ahua — Développeur web & solutions IA",
    description: "Sites, applications et outils IA pour les entreprises. Basé à Abidjan.",
    type: "website",
    images: ["/portrait.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body className="antialiased">
        <noscript>
          <style>{`[style*="opacity: 0"],[style*="opacity:0"]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
