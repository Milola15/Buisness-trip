"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { btnDark, btnGold } from "@/lib/ui";

export default function NavBar({ items }) {
  const pathname = usePathname() || "/";
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);
  const burger = useRef(null);
  const fermer = useRef(null);

  const actif = (href) => pathname === href || pathname.startsWith(`${href}/`);

  // Ombre et réduction de la barre au défilement
  useEffect(() => {
    const f = () => setDefile(window.scrollY > 8);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  // Ferme le menu à chaque changement de page
  useEffect(() => { setOuvert(false); }, [pathname]);

  // Menu ouvert : blocage du défilement, touche Échap, gestion du focus
  useEffect(() => {
    if (!ouvert) return;
    const avant = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const touche = (e) => { if (e.key === "Escape") setOuvert(false); };
    window.addEventListener("keydown", touche);
    fermer.current?.focus();
    const bouton = burger.current;
    return () => {
      document.body.style.overflow = avant;
      window.removeEventListener("keydown", touche);
      bouton?.focus();
    };
  }, [ouvert]);

  return (
    <>
      <header className={`sticky top-0 z-20 border-b bg-white/95 backdrop-blur transition-shadow duration-300 ${defile ? "border-marine/10 shadow-sm" : "border-transparent"}`}>
        <div className={`wrap flex items-center justify-between transition-[padding] duration-300 ${defile ? "py-3" : "py-4 md:py-5"}`}>
          <Link href="/" className="font-display text-xl font-bold tracking-tight text-marine">
            N&amp;K <span className="ml-1 font-sans text-sm font-medium text-or-fonce">Global Business</span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-6 text-sm font-medium text-marine md:flex lg:gap-8">
            {items.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={actif(n.href) ? "page" : undefined}
                className={`relative py-1 after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-or after:transition-all after:duration-300 ${actif(n.href) ? "after:w-full" : "after:w-0 hover:after:w-full"}`}
              >
                {n.label}
              </Link>
            ))}
            <span className="hidden lg:block"><Link href="/sourcing/devis" className={btnDark}>Demander un devis</Link></span>
          </nav>

          <button
            ref={burger}
            type="button"
            onClick={() => setOuvert(true)}
            aria-label="Ouvrir le menu"
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-marine/25 text-marine md:hidden"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Panneau mobile : placé hors de l'en-tête pour couvrir tout l'écran */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-hidden={!ouvert}
        className={`sombre fixed inset-0 z-50 flex flex-col overflow-y-auto bg-nuit text-ivoire transition-[transform,visibility] duration-300 ease-out md:hidden ${ouvert ? "visible translate-x-0" : "invisible translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-5 pb-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <Link href="/" onClick={() => setOuvert(false)} className="font-display text-xl font-bold tracking-tight">
            N&amp;K <span className="ml-1 font-sans text-sm font-medium text-or">Global Business</span>
          </Link>
          <button
            ref={fermer}
            type="button"
            onClick={() => setOuvert(false)}
            aria-label="Fermer le menu"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-ivoire/40 text-ivoire hover:bg-white/10"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Navigation mobile" className="mt-4 flex-1 px-5">
          <ul className="border-t border-ivoire/15">
            {items.map((n) => (
              <li key={n.href} className="border-b border-ivoire/15">
                <Link
                  href={n.href}
                  onClick={() => setOuvert(false)}
                  aria-current={actif(n.href) ? "page" : undefined}
                  className={`flex items-center justify-between py-5 font-display text-3xl font-semibold ${actif(n.href) ? "text-or" : "text-ivoire"}`}
                >
                  {n.label}
                  {actif(n.href) && <span className="h-2 w-2 rounded-full bg-or" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-8">
          <Link href="/sourcing/devis" onClick={() => setOuvert(false)} className={`${btnGold} block w-full text-center`}>Demander un devis gratuit</Link>
          <p className="mt-4 text-center text-xs text-ivoire/60">Basée en Côte d’Ivoire, au service de clients partout dans le monde.</p>
        </div>
      </div>
    </>
  );
}
