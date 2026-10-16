"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkPassword, endSession, isAdmin, startSession } from "@/lib/auth";
import { getProjects, saveProjects, uploadMedia, type Project } from "@/lib/projects";

export async function login(_: string | null, form: FormData) {
  if (!process.env.ADMIN_PASSWORD) return "ADMIN_PASSWORD n'est pas configuré sur le serveur.";
  if (!checkPassword(String(form.get("password") ?? ""))) return "Mot de passe incorrect.";
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

async function guard() {
  if (!(await isAdmin())) throw new Error("Non autorisé");
}

export async function addProject(_: string | null, form: FormData) {
  await guard();
  const title = String(form.get("title") ?? "").trim();
  if (!title) return "Le titre est obligatoire.";

  const file = form.get("media");
  let image: string | undefined;
  let video: string | undefined;
  if (file instanceof File && file.size > 0) {
    if (file.size > 4 * 1024 * 1024) return "Fichier trop lourd (4 Mo maximum).";
    const url = await uploadMedia(file);
    if (file.type.startsWith("video/")) video = url;
    else image = url;
  }
  if (!image && !video) return "Ajoute une image ou une vidéo.";

  const link = String(form.get("link") ?? "").trim();
  if (link && !/^https?:\/\//i.test(link)) return "Le lien doit commencer par http:// ou https://";

  const project: Project = {
    id: crypto.randomUUID(),
    title,
    client: String(form.get("client") ?? "").trim(),
    category: String(form.get("category") ?? "Web"),
    year: String(form.get("year") ?? new Date().getFullYear()),
    desc: String(form.get("desc") ?? "").trim(),
    tags: String(form.get("tags") ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    image,
    video,
    link: link || undefined,
  };

  await saveProjects([project, ...(await getProjects())]);
  revalidatePath("/");
  revalidatePath("/admin");
  return "ok";
}

export async function deleteProject(id: string) {
  await guard();
  await saveProjects((await getProjects()).filter((p) => p.id !== id));
  revalidatePath("/");
  revalidatePath("/admin");
}

export async function moveProject(id: string, dir: -1 | 1) {
  await guard();
  const list = await getProjects();
  const i = list.findIndex((p) => p.id === id);
  const j = i + dir;
  if (i < 0 || j < 0 || j >= list.length) return;
  [list[i], list[j]] = [list[j], list[i]];
  await saveProjects(list);
  revalidatePath("/");
  revalidatePath("/admin");
}
