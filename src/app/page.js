import Link from "next/link";
import RouteMap from "@/components/RouteMap";
import Fondatrice from "@/components/Fondatrice";
import { destinations, etapesSourcing } from "@/lib/data";
import { btnGold, btnLine } from "@/lib/ui";

export const metadata = {
  title: { absolute: "N&K Global Business | Business Trips et sourcing international" },
  alternates: { canonical: "/" },
};

export default function Accueil() {
  return (
    <>
      <section className="sombre bg-nuit text-ivoire">
        <div className="wrap grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_1fr] lg:py-28">
          <div>
            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">Vos ambitions n’ont pas de frontières.</h1>
            <p className="mt-6 max-w-xl text-lg text-ivoire/80">Votre partenaire pour développer votre activité à l’international. Business Trips et sourcing : découvrez des marchés, rencontrez des professionnels et explorez de nouvelles opportunités.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/business-trips" className={btnGold}>Découvrir nos Business Trips</Link>
              <Link href="/contact" className={btnLine}>Parler de mon projet</Link>
            </div>
          </div>
          <RouteMap />
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-marine sm:text-4xl">Deux façons de faire avancer vos ambitions.</h2>
          <p className="mt-4 max-w-2xl text-brume">Entrepreneur, porteur de projet ou simplement curieux du monde des affaires : nous vous accompagnons dans votre exploration des opportunités internationales.</p>
          <div className="mt-12 grid gap-px bg-marine/15 md:grid-cols-2">
            <article className="bg-white p-8 transition-colors duration-300 hover:bg-ivoire md:pr-12">
              <h3 className="font-display text-2xl font-semibold text-marine">Business Trips</h3>
              <p className="mt-3 text-brume">Des séjours professionnels pour découvrir de nouveaux marchés, rencontrer des fournisseurs, développer votre réseau et explorer des pistes d’activité.</p>
              <Link href="/business-trips" className="mt-6 inline-block font-semibold text-marine underline decoration-or decoration-2 underline-offset-4">Découvrir les voyages</Link>
            </article>
            <article className="bg-white p-8 transition-colors duration-300 hover:bg-ivoire md:pl-12">
              <h3 className="font-display text-2xl font-semibold text-marine">Sourcing international</h3>
              <p className="mt-3 text-brume">Une démarche d’accompagnement pour identifier des fournisseurs, comparer les possibilités et préparer vos projets d’approvisionnement.</p>
              <Link href="/sourcing" className="mt-6 inline-block font-semibold text-marine underline decoration-or decoration-2 underline-offset-4">Découvrir le sourcing</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-ivoire py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine sm:text-4xl">Trois destinations, un même objectif.</h2>
          <p className="mt-4 max-w-2xl text-brume">Vous n’avez pas encore d’entreprise ou de projet précis ? Vous avez aussi votre place : nos groupes accueillent les professionnels expérimentés comme ceux qui veulent découvrir et s’inspirer.</p>
          <ul className="mt-10 divide-y divide-marine/15 border-y border-marine/15">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/business-trips/${d.slug}`} className="group grid gap-2 py-7 transition-colors hover:bg-white/60 md:grid-cols-[12rem_1fr_auto] md:items-baseline md:px-3">
                  <span className="font-display text-3xl font-semibold text-marine transition-transform duration-300 group-hover:translate-x-2">{d.nom}</span>
                  <span className="text-brume">{d.resume}</span>
                  <span className="text-sm font-semibold text-marine underline decoration-or decoration-2 underline-offset-4">Voir la destination</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-marine sm:text-4xl">Un sourcing clair, du premier échange au suivi des achats.</h2>
          <ol className="mt-10 grid gap-8 md:grid-cols-4">
            {etapesSourcing.map((e, i) => (
              <li key={e.titre} className="border-t-2 border-or pt-4">
                <span className="font-display text-2xl text-or-fonce">{i + 1}</span>
                <h3 className="mt-1 font-semibold text-marine">{e.titre}</h3>
                <p className="mt-1 text-sm text-brume">{e.texte}</p>
              </li>
            ))}
          </ol>
          <Link href="/sourcing" className="mt-10 inline-block font-semibold text-marine underline decoration-or decoration-2 underline-offset-4">Voir les formules de sourcing</Link>
        </div>
      </section>

      <section className="bg-ivoire py-20"><div className="wrap"><Fondatrice /></div></section>

      <section className="sombre bg-marine py-20 text-center text-white">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Votre prochaine opportunité commence ici.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Un Business Trip, une préinscription gratuite ou un besoin de sourcing : présentez-nous votre projet.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/sourcing/devis" className={btnGold}>Demander un devis de sourcing</Link>
            <Link href="/contact" className={btnLine}>Me préinscrire à un voyage</Link>
          </div>
        </div>
      </section>
    </>
  );
}
