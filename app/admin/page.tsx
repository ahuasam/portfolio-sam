import type { Metadata } from "next";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { CATEGORIES, getProjects, storageReady } from "@/lib/projects";
import { logout } from "./actions";
import { AddForm, LoginForm, ProjectRow } from "./ui";

export const metadata: Metadata = { title: "Administration — Samuel Ahua", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return (
      <main className="min-h-screen grid place-items-center px-5">
        <div className="w-full max-w-sm">
          <p className="eyebrow text-mute mb-2">Espace privé</p>
          <h1 className="font-serif text-5xl mb-8">Administration</h1>
          <LoginForm />
        </div>
      </main>
    );
  }

  const projects = await getProjects();

  return (
    <main className="min-h-screen py-12">
      <div className="container-x">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6 mb-10">
          <div>
            <p className="eyebrow text-mute mb-2">Administration</p>
            <h1 className="font-serif text-5xl">Mes réalisations</h1>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/" className="link-u">Voir le site ↗</Link>
            <form action={logout}><button className="link-u text-mute">Se déconnecter</button></form>
          </div>
        </header>

        {!storageReady() && (
          <p className="mb-10 rounded-md border border-amber-400 bg-amber-50 p-4 text-sm text-amber-900">
            Le stockage n&apos;est pas encore connecté (variable <code>BLOB_READ_WRITE_TOKEN</code> absente). Crée un
            store Blob dans Vercel → Storage, relie-le au projet, puis redéploie.
          </p>
        )}

        <div className="grid lg:grid-cols-12 gap-12">
          <section className="lg:col-span-5">
            <h2 className="eyebrow text-mute mb-6">Ajouter une réalisation</h2>
            <AddForm categories={CATEGORIES} disabled={!storageReady()} />
          </section>

          <section className="lg:col-span-7">
            <h2 className="eyebrow text-mute mb-6">{projects.length} réalisations en ligne</h2>
            <ul className="divide-y divide-line border-y border-line">
              {projects.map((p, i) => (
                <ProjectRow key={p.id} project={p} first={i === 0} last={i === projects.length - 1} disabled={!storageReady()} />
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
