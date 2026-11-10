"use client";
import { usePathname } from "next/navigation";
import HeroArt, { varianteDe } from "./HeroArt";

export default function PageHero({ titre, intro, children }) {
  const variante = varianteDe(usePathname());
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