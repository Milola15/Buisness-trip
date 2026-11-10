"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const montrer = (el) => {
  el.style.opacity = "1";
  el.style.transform = "none";
};

// Fait apparaître en douceur les blocs de chaque page quand ils entrent à l'écran.
// Les listes et grilles apparaissent élément par élément. Le premier bloc (hero) a sa propre animation en CSS.
export default function ScrollReveal() {
  const pathname = usePathname();
  useEffect(() => {
    const cibles = [];
    document.querySelectorAll("main > section:not(:first-of-type) .wrap > *").forEach((el) => {
      if (el.matches("ul, ol, .grid")) {
        [...el.children].forEach((c, i) => {
          c.style.setProperty("--d", `${Math.min(i, 5) * 90}ms`);
          cibles.push(c);
        });
      } else cibles.push(el);
    });
    if (!("IntersectionObserver" in window)) {
      cibles.forEach(montrer);
      return;
    }
    const io = new IntersectionObserver(
      (entrees) => entrees.forEach((e) => { if (e.isIntersecting) { montrer(e.target); io.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    cibles.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
