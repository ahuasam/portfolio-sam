export default function Footer() {
  return (
    <footer className="bg-night text-paper border-t border-white/10">
      <div className="container-x py-8 flex flex-col md:flex-row gap-4 justify-between eyebrow text-white/50">
        <span>© {new Date().getFullYear()} AHUA ANOH Auguste Samuel</span>
        <span>Conçu et développé à Abidjan</span>
        <a href="#top" className="link-u text-white/80">Retour en haut ↑</a>
      </div>
    </footer>
  );
}
