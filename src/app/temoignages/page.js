import Link from "next/link";
import PageHero from "@/components/PageHero";
import VideoTemoignage from "@/components/VideoTemoignage";
import { temoignages } from "@/lib/temoignages";
import { btnGold, btnLine } from "@/lib/ui";

export const metadata = {
  title: "Témoignages",
  description: "Les expériences de nos participants en vidéo : Business Trips en Chine, en Turquie et à Dubaï, rencontres professionnelles et premiers pas à l’international.",
  alternates: { canonical: "/temoignages" },
  // Page non indexée tant qu'aucun témoignage n'est publié
  ...(temoignages.length === 0 ? { robots: { index: false } } : {}),
};

export default function Temoignages() {
  return (
    <>
      <PageHero titre="Ils ont voyagé avec nous." intro="Leurs expériences en vidéo : voyages d’affaires, rencontres professionnelles et premiers pas à l’international." />

      <section className="py-20">
        <div className="wrap">
          {temoignages.length > 0 ? (
            <ul className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-3">
              {temoignages.map((t) => (
                <li key={`${t.nom}-${t.youtube || t.fichier}`} className="bg-white">
                  <VideoTemoignage t={t} />
                  <div className="border-b-4 border-or p-6">
                    <h2 className="font-display text-xl font-semibold text-marine">{t.nom}</h2>
                    {(t.profil || t.voyage) && (
                      <p className="mt-1 text-sm text-or-fonce">{[t.profil, t.voyage].filter(Boolean).join(" · ")}</p>
                    )}
                    {t.citation && <p className="mt-3 text-brume">« {t.citation} »</p>}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border border-dashed border-marine/30 bg-ivoire p-10 text-center">
              <h2 className="font-display text-3xl font-semibold text-marine">Les témoignages arrivent bientôt.</h2>
              <p className="mx-auto mt-3 max-w-xl text-brume">Nos participants partagent leur expérience en vidéo. Revenez très vite pour les découvrir.</p>
            </div>
          )}
        </div>
      </section>

      <section className="sombre bg-nuit py-20 text-center text-white">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Et si c’était votre tour ?</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Dites-nous quelle destination vous intéresse. La préinscription est gratuite et sans engagement, et nous nous occupons de vos démarches de visa.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={btnGold}>Me préinscrire gratuitement</Link>
            <Link href="/business-trips" className={btnLine}>Voir les Business Trips</Link>
          </div>
        </div>
      </section>
    </>
  );
}
