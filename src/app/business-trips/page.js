import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { destinations, experiences, etapesTrip } from "@/lib/data";
import { btnGold, btnLine } from "@/lib/ui";

export const metadata = {
  title: "Business Trips : Chine, Turquie et Dubaï",
  description: "Séjours professionnels en Chine, en Turquie et à Dubaï pour visiter des usines et des marchés, rencontrer des fournisseurs et développer votre réseau. Préinscription gratuite.",
  alternates: { canonical: "/business-trips" },
};

const faits = [
  { valeur: "8 jours", texte: "au maximum, trajets compris" },
  { valeur: "Gratuite", texte: "la préinscription, sans engagement" },
  { valeur: "3 destinations", texte: "Chine, Turquie et Dubaï" },
  { valeur: "Sur devis", texte: "vols, hébergement et prestations détaillés avant réservation" },
];

const icones = [
  "M3 9l1.5-5h15L21 9v11H3V9zM3 9h18M9 20v-6h6v6",
  "M16 11a3 3 0 100-6 3 3 0 000 6zM8 11a3 3 0 100-6 3 3 0 000 6zM2 20c0-3 3-5 6-5s6 2 6 5M14 15.2c.9-.5 1.8-.7 2.6-.7 3 0 5.4 2 5.4 5.5",
  "M12 3a9 9 0 100 18 9 9 0 000-18zM15.5 8.5l-2 5-5 2 2-5 5-2z",
  "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
];

const questions = [
  { q: "Faut-il avoir une entreprise pour participer ?", r: "Non. Nos groupes accueillent aussi bien les professionnels expérimentés que les personnes qui souhaitent découvrir, s’inspirer et envisager de nouvelles perspectives, même sans projet précis." },
  { q: "La préinscription m’engage-t-elle ?", r: "Non. La préinscription est gratuite et sans engagement ; elle ne constitue pas une réservation. Les conditions de confirmation, de report et d’annulation sont précisées dans les documents contractuels." },
  { q: "Quelle est la durée d’un Business Trip ?", r: "Les séjours durent jusqu’à 8 jours, trajets compris. Les dates et le programme détaillé vous sont communiqués dans la proposition, avant toute décision." },
  { q: "Que comprend le tarif ?", r: "Les offres sur devis prévoient les vols aller-retour, l’hébergement et les prestations précisées dans la proposition. Dates, activités, inclusions et exclusions sont confirmées avant toute réservation définitive." },
  { q: "Comment les villes et les activités sont-elles choisies ?", r: "Elles dépendent des besoins recueillis lors des préinscriptions et des possibilités d’organisation. Le programme est ensuite confirmé avec vous." },
];

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.r } })),
};

export default function BusinessTrips() {
  return (
    <>
      <PageHero titre="Explorez le monde. Découvrez des opportunités." intro="Vous n’avez pas encore d’entreprise ou de projet précis ? Vous avez aussi votre place. Nos groupes accueillent aussi bien les professionnels expérimentés que les personnes qui souhaitent découvrir, s’inspirer et envisager de nouvelles perspectives." />

      <section className="py-20">
        <div className="wrap">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-marine sm:text-4xl">Choisissez votre destination.</h2>
          <p className="mt-4 max-w-2xl text-brume">Chaque voyage associe visites, rencontres professionnelles et temps d’échange, selon le programme confirmé.</p>
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {destinations.map((d) => {
              const etiquettes = (d.tags.length ? d.tags : d.formats.map((f) => f.nom)).slice(0, 3);
              const photo = d.photos[0];
              return (
                <li key={d.slug}>
                  <Link href={`/business-trips/${d.slug}`} className="sombre group relative block aspect-[4/3] overflow-hidden bg-nuit md:aspect-[3/4]">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    <span className="absolute inset-0 bg-gradient-to-t from-nuit via-nuit/40 to-transparent" aria-hidden="true" />
                    <span className="absolute inset-x-0 bottom-0 block p-6 text-ivoire">
                      <span className="block font-display text-3xl font-semibold">{d.nom}</span>
                      <span className="mt-1 block text-ivoire/85">{d.resume}</span>
                      {etiquettes.length > 0 && (
                        <span className="mt-4 flex flex-wrap gap-2">
                          {etiquettes.map((t) => <span key={t} className="rounded-full border border-ivoire/40 px-3 py-1 text-xs">{t}</span>)}
                        </span>
                      )}
                      <span className="mt-5 inline-block border-b-2 border-or pb-0.5 text-sm font-semibold transition-all duration-300 group-hover:pr-4">Explorer la destination</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="bg-ivoire py-14">
        <div className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {faits.map((f) => (
            <div key={f.valeur} className="border-l-2 border-or pl-5">
              <p className="font-display text-3xl font-semibold text-marine">{f.valeur}</p>
              <p className="mt-1 text-sm text-brume">{f.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="sombre bg-marine py-20 text-white">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Ce que vous pourrez vivre.</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {experiences.map((x, i) => (
              <div key={x.titre} className="border-t border-white/15 pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-or text-or">
                  <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={icones[i % icones.length]} /></svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{x.titre}</h3>
                <p className="mt-2 text-white/75">{x.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine sm:text-4xl">Comment rejoindre un Business Trip ?</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {etapesTrip.map((e, i) => (
              <li key={e.titre} className="relative pl-16 md:pl-0 md:pt-16">
                {i < etapesTrip.length - 1 && <span aria-hidden="true" className="absolute left-5 top-10 h-[calc(100%-0.5rem)] w-px bg-or/60 md:left-10 md:top-5 md:h-px md:w-[calc(100%-0.5rem)]" />}
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-marine font-display text-lg text-white ring-4 ring-white">{i + 1}</span>
                <h3 className="font-semibold text-marine">{e.titre}</h3>
                <p className="mt-1 text-sm text-brume">{e.texte}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-sm text-brume">La préinscription est gratuite et sans engagement ; elle ne constitue pas une réservation. Les conditions de confirmation, de report et d’annulation seront précisées dans les documents contractuels.</p>
        </div>
      </section>

      <section className="bg-ivoire py-20">
        <div className="wrap max-w-3xl">
          <h2 className="font-display text-3xl font-semibold text-marine sm:text-4xl">Questions fréquentes</h2>
          <div className="mt-8 border-t border-marine/15">
            {questions.map((x) => (
              <details key={x.q} className="group border-b border-marine/15 py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-semibold text-marine [&::-webkit-details-marker]:hidden">
                  {x.q}
                  <span aria-hidden="true" className="text-2xl leading-none text-or-fonce transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-brume">{x.r}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sombre bg-nuit py-20 text-center text-white">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Votre prochaine étape commence par une préinscription.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Dites-nous quelle destination vous intéresse, même sans projet précis. C’est gratuit et sans engagement.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={btnGold}>Me préinscrire gratuitement</Link>
            <Link href="/sourcing" className={btnLine}>Découvrir le sourcing</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}