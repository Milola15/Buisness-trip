"use client";
import { usePathname } from "next/navigation";
import HeroArt from "./HeroArt";

// Modèle d'illustration affiché dans la bannière, selon la page.
const VARIANTES = {
  "/business-trips": "trips",
  "/business-trips/chine": "chine",
  "/business-trips/turquie": "turquie",
  "/business-trips/dubai": "dubai",
  "/sourcing": "sourcing",
  "/sourcing/devis": "devis",
  "/temoignages": "temoignages",
  "/a-propos": "apropos",
  "/contact": "contact",
};

export default function PageHero({ titre, intro, children }) {
  const chemin = (usePathname() || "").replace(/\/$/, "");
  const variante = VARIANTES[chemin] || null;
  return (
    <section className="sombre bg-nuit text-ivoire">
      <div className={`wrap py-16 lg:py-24 ${variante ? "grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]" : ""}`}>
        <div>
          <h1 className="max-w-3xl font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">{titre}</h1>
          {intro && <p className="mt-5 max-w-2xl text-lg text-ivoire/80">{intro}</p>}
          {children && <div className="flex flex-wrap">{children}</div>}
        </div>
        {variante && <HeroArt variant={variante} />}
      </div>
    </section>
  );
}
