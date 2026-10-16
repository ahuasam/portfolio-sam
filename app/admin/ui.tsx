"use client";
import { useActionState, useRef, useState, useTransition } from "react";
import type { Project } from "@/lib/projects";
import { addProject, deleteProject, login, moveProject } from "./actions";

const input = "w-full rounded-md border border-line bg-white/60 px-3 py-2.5 outline-none focus:border-royal transition-colors";
const btn = "rounded-full bg-ink text-paper px-6 py-2.5 hover:bg-royal transition-colors disabled:opacity-50";

export function LoginForm() {
  const [error, action, pending] = useActionState(login, null);
  return (
    <form action={action} className="space-y-4">
      <input type="password" name="password" required autoFocus placeholder="Mot de passe" className={input} />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button disabled={pending} className={btn}>{pending ? "Connexion…" : "Se connecter"}</button>
    </form>
  );
}

export function AddForm({ categories, disabled }: { categories: string[]; disabled: boolean }) {
  const [preview, setPreview] = useState<{ url: string; video: boolean } | null>(null);
  const ref = useRef<HTMLFormElement>(null);
  const [msg, action, pending] = useActionState(async (prev: string | null, form: FormData) => {
    const res = await addProject(prev, form);
    if (res === "ok") {
      ref.current?.reset();
      setPreview(null);
    }
    return res;
  }, null);

  return (
    <form ref={ref} action={action} className="space-y-4">
      <label className="block">
        <span className="text-sm text-ink-2">Image ou vidéo * (4 Mo max)</span>
        <input
          type="file"
          name="media"
          accept="image/*,video/mp4,video/webm"
          required
          className="mt-1 block w-full text-sm file:mr-3 file:rounded-full file:border-0 file:bg-ink file:px-4 file:py-2 file:text-paper"
          onChange={(e) => {
            const f = e.target.files?.[0];
            setPreview(f ? { url: URL.createObjectURL(f), video: f.type.startsWith("video/") } : null);
          }}
        />
      </label>
      {preview && (
        <div className="aspect-[4/3] overflow-hidden rounded-md bg-paper-2">
          {preview.video ? (
            <video src={preview.url} muted autoPlay loop className="h-full w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.url} alt="" className="h-full w-full object-cover" />
          )}
        </div>
      )}
      <input name="title" required placeholder="Titre du projet *" className={input} />
      <div className="grid grid-cols-2 gap-3">
        <select name="category" className={input} defaultValue="Web">
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <input name="year" placeholder="Année" defaultValue={new Date().getFullYear()} className={input} />
      </div>
      <input name="client" placeholder="Client / secteur" className={input} />
      <input name="link" type="url" placeholder="Lien du projet (https://…)" className={input} />
      <textarea name="desc" rows={3} placeholder="Description courte" className={`${input} resize-none`} />
      <input name="tags" placeholder="Outils, séparés par des virgules (React, Figma…)" className={input} />
      <div className="flex items-center gap-4">
        <button disabled={pending || disabled} className={btn}>{pending ? "Envoi…" : "Publier"}</button>
        {msg === "ok" && <span className="text-sm text-emerald-700">Réalisation publiée.</span>}
        {msg && msg !== "ok" && <span className="text-sm text-red-600">{msg}</span>}
      </div>
    </form>
  );
}

export function ProjectRow({ project: p, first, last, disabled }: { project: Project; first: boolean; last: boolean; disabled: boolean }) {
  const [pending, start] = useTransition();
  const media = p.image ?? p.video;
  return (
    <li className={`flex items-center gap-4 py-3 ${pending ? "opacity-50" : ""}`}>
      <div className="h-14 w-20 shrink-0 overflow-hidden rounded bg-paper-2">
        {p.video && !p.image ? (
          <video src={media} muted className="h-full w-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={media} alt="" className="h-full w-full object-cover" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{p.title}</p>
        <p className="truncate text-sm text-mute">
          {p.category} · {p.year}
          {p.link && <> · <a href={p.link} target="_blank" rel="noopener noreferrer" className="link-u">{p.link.replace(/^https?:\/\//, "")}</a></>}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1 text-sm">
        <button disabled={disabled || first || pending} onClick={() => start(() => moveProject(p.id, -1))} className="px-2 py-1 disabled:opacity-30" aria-label="Monter">↑</button>
        <button disabled={disabled || last || pending} onClick={() => start(() => moveProject(p.id, 1))} className="px-2 py-1 disabled:opacity-30" aria-label="Descendre">↓</button>
        <button
          disabled={disabled || pending}
          onClick={() => confirm(`Supprimer « ${p.title} » ?`) && start(() => deleteProject(p.id))}
          className="ml-2 rounded-full border border-red-300 px-3 py-1 text-red-700 hover:bg-red-50 disabled:opacity-30"
        >
          Supprimer
        </button>
      </div>
    </li>
  );
}
