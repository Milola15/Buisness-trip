import Link from "next/link";
import { navItems } from "./Header";

export default function Footer() {
  return (
    <footer className="sombre bg-nuit text-ivoire/75">
      <div className="wrap grid gap-8 py-12 text-sm md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-xl font-bold text-ivoire">N&amp;K Global Business</p>
          <p className="mt-3 max-w-sm">Entité de N&amp;K Group. Basée en Côte d’Ivoire, au service de clients partout dans le monde.</p>
        </div>
        <nav aria-label="Pied de page" className="flex flex-col gap-2">
          {navItems.map((n) => <Link key={n.href} href={n.href} className="hover:text-ivoire">{n.label}</Link>)}
        </nav>
        <nav aria-label="Informations légales" className="flex flex-col gap-2">
          <Link href="/mentions-legales" className="hover:text-ivoire">Mentions légales</Link>
          <Link href="/confidentialite" className="hover:text-ivoire">Politique de confidentialité</Link>
        </nav>
      </div>
      <p className="wrap border-t border-ivoire/10 py-5 text-xs">© 2026 N&amp;K Global Business, N&amp;K Group. Aucun paiement n’est demandé sur ce site.</p>
    </footer>
  );
}
