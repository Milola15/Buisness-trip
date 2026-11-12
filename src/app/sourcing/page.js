import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { destinations, offres, etapesSourcing } from "@/lib/data";
import { btnDark, btnGold, btnLine } from "@/lib/ui";

export const metadata = {
  title: "Sourcing international sur devis",
  description: "Sourcing en Chine, en Turquie et à Dubaï : recherche de fournisseurs, comparaison des offres et coordination des achats. Formules Essentiel et Intégral, devis gratuit.",
  alternates: { canonical: "/sourcing" },
};

const details = {
  Essentiel: {
    inclus: [
      "Analyse de votre demande",
      "Recherche pour une catégorie de produits",
      "Présélection de trois fournisseurs maximum",
      "Comparaison des propositions",
      "Synthèse avec les coordonnées des fournisseurs, après règlement des honoraires convenus",
    ],
    precision: "Vous effectuez directement vos achats et organisez votre transport.",
  },
  Intégral: {
    inclus: [
      "Recherche et négociation avec les fournisseurs",
      "Coordination des commandes validées",
      "Suivi des échanges",
      "Préparation de l’expédition",
      "Correspondants locaux lorsque nécessaire",
    ],
    precision: "Les achats peuvent être organisés au nom et pour le compte du client, selon un mandat et des modalités de paiement juridiquement validés.",
  },
};

const faits = [
  { valeur: "48 à 72 h", texte: "pour une première réponse, en heures ouvrées" },
  { valeur: "10 à 20 jours", texte: "ouvrés pour la recherche standard de fournisseurs" },
  { valeur: "Dès 1 000 €", texte: "de budget marchandises, avec le Sourcing Essentiel" },
  { valeur: "Gratuite", texte: "la demande de devis, sans engagement" },
];

const horsHonoraires = ["Les marchandises", "Le transport", "Les assurances éventuelles", "Les droits de douane et les taxes"];

const questions = [
  { q: "Combien de temps faut-il pour obtenir une réponse ?", r: "Notre équipe vous répond dans un délai indicatif de 48 à 72 heures ouvrées après l’envoi de votre demande." },
  { q: "Quand les recherches commencent-elles ?", r: "Les recherches approfondies débutent après validation du devis et paiement des honoraires fixes convenus. La demande de devis, elle, est gratuite et sans engagement." },
  { q: "Combien de temps dure la recherche de fournisseurs ?", r: "Comptez 10 à 20 jours ouvrés pour la recherche et la présentation des fournisseurs. Ce délai ne comprend ni la fabrication ni la livraison." },
  { q: "Quel budget faut-il prévoir ?", r: "Le budget de marchandises commence à 1 000 € pour le Sourcing Essentiel et à 1 500 € pour le Sourcing Intégral. Les honoraires, et la commission pour la formule Intégral, sont communiqués sur devis." },
  { q: "Que se passe-t-il si je ne passe pas commande ?", r: "Les honoraires de recherche rémunèrent le travail réalisé, même sans commande ultérieure, dans le respect des droits légaux applicables. Aucune commission sur achat n’est due en l’absence de commande." },
  { q: "Puis-je utiliser mon propre transitaire ?", r: "Oui. Vous pouvez faire appel à votre propre transitaire ou demander une mise en relation avec un partenaire logistique." },
  { q: "Cherchez-vous aussi dans d’autres pays ?", r: "Nos marchés prioritaires sont la Chine, la Turquie et Dubaï. Nous étudions aussi les demandes hors de ces marchés, sous réserve de faisabilité et de conformité réglementaire." },
];

const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: questions.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.r } })),
};

const Coche = () => (
  <svg viewBox="0 0 24 24" className="mt-1 h-5 w-5 shrink-0 text-or" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12l4 4 10-10" /></svg>
);

export default function Sourcing() {
  const marches = destinations.map((d) => ({ ...d, photo: d.photos[1] || d.photos[0] }));
  const credits = [...new Set(marches.map((m) => m.photo.credit))].join(", ");
  return (
    <>
      <PageHero titre="Vous avez un besoin ? Nous recherchons les solutions." intro="Marchandises destinées à la revente, équipements professionnels, machines, matériaux ou produits spécifiques : nous étudions votre projet et recherchons des solutions d’approvisionnement adaptées. Basée en Côte d’Ivoire, N&K Global Business accompagne les clients où qu’ils se trouvent.">
        <Link href="/sourcing/devis" className={`${btnGold} mt-8 mr-3`}>Demander un devis gratuit</Link>
        <Link href="#formules" className={`${btnLine} mt-8`}>Comparer les formules</Link>
      </PageHero>

      <section id="formules" className="scroll-mt-20 py-20">
        <div className="wrap">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-marine sm:text-4xl">Deux formules, selon votre degré d’autonomie.</h2>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {offres.map((o) => {
              const sombre = o.id === "Intégral";
              const det = details[o.id];
              return (
                <article key={o.id} className={`flex flex-col p-8 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${sombre ? "sombre bg-marine text-white" : "border border-marine/15 bg-white"}`}>
                  <h3 className={`font-display text-2xl font-semibold ${sombre ? "text-white" : "text-marine"}`}>{o.nom}</h3>
                  <p className={`mt-1 font-semibold ${sombre ? "text-or" : "text-or-fonce"}`}>{o.accroche}</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {det.inclus.map((t) => (
                      <li key={t} className="flex gap-3"><Coche /><span className={sombre ? "text-white/85" : "text-encre"}>{t}</span></li>
                    ))}
                  </ul>
                  <p className={`mt-6 text-sm ${sombre ? "text-white/70" : "text-brume"}`}>{det.precision}</p>
                  <p className={`mt-5 border-t pt-5 text-sm font-semibold ${sombre ? "border-white/20 text-white" : "border-marine/15 text-marine"}`}>{o.note}</p>
                  <Link href={`/sourcing/devis?formule=${encodeURIComponent(o.id)}`} className={`${sombre ? btnGold : btnDark} mt-6 self-start`}>Demander un devis {o.id}</Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-ivoire py-20">
        <div className="wrap">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-marine sm:text-4xl">Nos marchés prioritaires.</h2>
          <p className="mt-4 max-w-2xl text-brume">Des zones de production et de négoce que nous connaissons, pour trouver le bon fournisseur au bon endroit.</p>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {marches.map((m) => (
              <li key={m.slug} className="bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={m.photo.src} alt={m.photo.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className={`object-cover ${m.photo.h > m.photo.w ? "object-[center_62%]" : ""}`} />
                </div>
                <div className="border-b-4 border-or p-6">
                  <h3 className="font-display text-2xl font-semibold text-marine">{m.nom}</h3>
                  <p className="mt-2 text-brume">{m.secteurs}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-6 max-w-3xl text-brume">Vous recherchez des produits dans un autre pays ou un autre secteur ? Présentez-nous votre besoin : nous étudions aussi les demandes hors de nos marchés prioritaires, sous réserve de faisabilité et de conformité réglementaire.</p>
          <p className="mt-3 text-xs text-brume">Photos : {credits}, via Unsplash.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine sm:text-4xl">Notre méthode, du premier échange au suivi.</h2>
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {etapesSourcing.map((e, i) => (
              <li key={e.titre} className="relative pl-16 md:pl-0 md:pt-16">
                {i < etapesSourcing.length - 1 && <span aria-hidden="true" className="absolute left-5 top-10 h-[calc(100%-0.5rem)] w-px bg-or/60 md:left-10 md:top-5 md:h-px md:w-[calc(100%-0.5rem)]" />}
                <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-marine font-display text-lg text-white ring-4 ring-white">{i + 1}</span>
                <h3 className="font-semibold text-marine">{e.titre}</h3>
                <p className="mt-1 text-sm text-brume">{e.texte}</p>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-sm text-brume">Les délais de 10 à 20 jours ouvrés concernent la recherche et la présentation des fournisseurs, pas la fabrication ni la livraison.</p>
        </div>
      </section>

      <section className="sombre bg-marine py-16 text-white">
        <div className="wrap grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {faits.map((f) => (
            <div key={f.valeur} className="border-l-2 border-or pl-5">
              <p className="font-display text-3xl font-semibold text-or">{f.valeur}</p>
              <p className="mt-1 text-sm text-white/75">{f.texte}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-20">
        <div className="wrap">
          <h2 className="max-w-3xl font-display text-3xl font-semibold text-marine sm:text-4xl">Des honoraires clairs, des coûts distincts.</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="border border-marine/15 p-8">
              <h3 className="font-display text-2xl font-semibold text-marine">Nos honoraires</h3>
              <p className="mt-3 text-brume">Ils rémunèrent le travail réalisé, même sans commande ultérieure, dans le respect des droits légaux applicables. Aucune commission sur achat n’est due en l’absence de commande. Le détail figure dans votre devis.</p>
            </div>
            <div className="border border-marine/15 bg-ivoire p-8">
              <h3 className="font-display text-2xl font-semibold text-marine">Distingués de nos honoraires</h3>
              <ul className="mt-3 space-y-2 text-encre">
                {horsHonoraires.map((t) => <li key={t} className="flex gap-3"><Coche />{t}</li>)}
              </ul>
            </div>
          </div>
          <p className="mt-8 max-w-3xl text-brume">Vous pouvez faire appel à votre propre transitaire ou demander une mise en relation avec un partenaire logistique. Nous coordonnons les échanges selon les prestations prévues au devis.</p>
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
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Présentez-nous votre besoin.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Décrivez vos produits, vos quantités et joignez une photo de référence. Réponse sous 48 à 72 heures ouvrées.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/sourcing/devis" className={btnGold}>Demander un devis gratuit</Link>
            <Link href="/contact" className={btnLine}>Poser une question</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}