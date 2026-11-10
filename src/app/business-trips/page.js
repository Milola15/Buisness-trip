import Link from "next/link";
import PageHero from "@/components/PageHero";
import { destinations, experiences, etapesTrip } from "@/lib/data";
import { btnDark } from "@/lib/ui";

export const metadata = {
  title: "Business Trips : Chine, Turquie et Dubaï",
  description: "Séjours professionnels en Chine, en Turquie et à Dubaï pour découvrir des marchés, rencontrer des fournisseurs et développer votre réseau. Préinscription gratuite.",
  alternates: { canonical: "/business-trips" },
};

export default function BusinessTrips() {
  return (
    <>
      <PageHero titre="Explorez le monde. Découvrez des opportunités." intro="Vous n’avez pas encore d’entreprise ou de projet précis ? Vous avez aussi votre place. Nos groupes accueillent aussi bien les professionnels expérimentés que les personnes qui souhaitent découvrir, s’inspirer et envisager de nouvelles perspectives." />
      <section className="py-16">
        <div className="wrap">
          <ul className="divide-y divide-marine/15 border-y border-marine/15">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link href={`/business-trips/${d.slug}`} className="group grid gap-2 py-7 transition-colors hover:bg-ivoire md:grid-cols-[12rem_1fr_auto] md:items-baseline md:px-3">
                  <span className="font-display text-3xl font-semibold text-marine transition-transform duration-300 group-hover:translate-x-2">{d.nom}</span>
                  <span className="text-brume">{d.resume}</span>
                  <span className="text-sm font-semibold text-marine underline decoration-or decoration-2 underline-offset-4">Explorer la destination</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="bg-ivoire py-16">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine">Ce que vous pourrez vivre</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {experiences.map((x) => (
              <div key={x.titre}><h3 className="font-semibold text-marine">{x.titre}</h3><p className="mt-1 text-brume">{x.texte}</p></div>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-sm text-brume">Séjours jusqu’à 8 jours, trajets compris. Les offres sur devis prévoient les vols aller-retour, l’hébergement et les prestations précisées dans la proposition. Les dates, activités, inclusions et exclusions sont confirmées avant toute réservation définitive.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine">Comment rejoindre un Business Trip ?</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-4">
            {etapesTrip.map((e, i) => (
              <li key={e.titre} className="border-t-2 border-or pt-4">
                <span className="font-display text-2xl text-or-fonce">{i + 1}</span>
                <h3 className="mt-1 font-semibold text-marine">{e.titre}</h3>
                <p className="mt-1 text-sm text-brume">{e.texte}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-sm text-brume">La préinscription est gratuite et sans engagement ; elle ne constitue pas une réservation. Les conditions de confirmation, de report et d’annulation seront précisées dans les documents contractuels.</p>
          <Link href="/contact" className={`${btnDark} mt-6`}>Me préinscrire ou demander des informations</Link>
        </div>
      </section>
    </>
  );
}
