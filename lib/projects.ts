import "server-only";
import { list, put } from "@vercel/blob";

export type Project = {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  desc: string;
  tags: string[];
  image?: string;
  video?: string;
  link?: string;
};

export const CATEGORIES = ["Web", "IA", "Design", "Affiches", "Vidéo", "Logiciels"];

const FILE = "data/projects.json";

const defaults: Project[] = [
  { id: "giga", title: "GIGA Festival de la Mode 3.0", client: "Dabou", category: "Affiches", year: "2025", desc: "Affiche officielle et déclinaisons pour les réseaux sociaux.", tags: ["Photoshop", "Illustrator", "Print"], image: "/projets/projet-campagne.webp" },
  { id: "ecom", title: "Boutique en ligne", client: "Commerce de détail", category: "Web", year: "2025", desc: "E-commerce complet avec paiement mobile money et back-office.", tags: ["Next.js", "Stripe", "MongoDB"], image: "/projets/projet-ecommerce.jpg" },
  { id: "chatbot", title: "Assistant client IA", client: "PME de services", category: "IA", year: "2025", desc: "Chatbot qui répond 24 h/24 aux questions fréquentes et transfère les cas complexes.", tags: ["Python", "OpenAI", "FastAPI"], image: "/projets/projet-chatbot.png" },
  { id: "korha", title: "Korha Création", client: "Mode & lifestyle", category: "Design", year: "2024", desc: "Identité visuelle complète : logo, charte, packaging.", tags: ["Branding", "Illustrator"], image: "/projets/projet-brand.webp" },
  { id: "medecin", title: "Cabinet médical", client: "Santé", category: "Web", year: "2024", desc: "Site responsive avec prise de rendez-vous en ligne.", tags: ["Next.js", "Tailwind", "Prisma"], image: "/projets/projet-medecin.png" },
  { id: "video", title: "Lancement produit", client: "Start-up tech", category: "Vidéo", year: "2024", desc: "Motion design et montage pour la campagne de lancement.", tags: ["After Effects", "Premiere Pro"], video: "/projets/projet-video.mp4" },
  { id: "dashboard", title: "Tableau de bord analytique", client: "Distribution", category: "Web", year: "2024", desc: "Visualisation des ventes et des stocks en temps réel.", tags: ["React", "D3.js", "Node.js"], image: "/projets/projet-dashboard.jpg" },
  { id: "vision", title: "Contrôle qualité par vision", client: "Industrie", category: "IA", year: "2023", desc: "Détection automatique des défauts sur chaîne de production.", tags: ["Python", "TensorFlow", "OpenCV"], image: "/projets/projet-ia-detection.jpg" },
  { id: "rh", title: "Application RH", client: "PME", category: "Logiciels", year: "2023", desc: "Gestion des congés, présences et fiches de paie sur mobile.", tags: ["React Native", "Firebase"], image: "/projets/projet-mobile.jpg" },
];

export const storageReady = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export async function getProjects(): Promise<Project[]> {
  if (!storageReady()) return defaults;
  try {
    const { blobs } = await list({ prefix: FILE });
    if (!blobs[0]) return defaults;
    const res = await fetch(`${blobs[0].url}?v=${blobs[0].uploadedAt.getTime()}`);
    return (await res.json()) as Project[];
  } catch {
    return defaults;
  }
}

export async function saveProjects(projects: Project[]) {
  await put(FILE, JSON.stringify(projects), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
    cacheControlMaxAge: 60,
  });
}

export async function uploadMedia(file: File) {
  const safe = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const blob = await put(`projets/${safe}`, file, { access: "public", addRandomSuffix: true });
  return blob.url;
}
