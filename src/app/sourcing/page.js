import Link from "next/link";
import PageHero from "@/components/PageHero";
import { destinations, offres, etapesSourcing } from "@/lib/data";
import { btnDark } from "@/lib/ui";

export const metadata = {
  title: "Sourcing international sur devis",
  description: "Sourcing en Chine, en Turquie et à Dubaï : recherche de fournisseurs, comparaison des offres et coordination des achats. Formules Essentiel et Intégral, devis gratuit.",
  alternates: { canonical: "/sourcing" },
};

export default function Sourcing() {
  return (
    <>
      <PageHero titre="Vous avez un besoin ? Nous recherchons les solutions." intro="Marchandises destinées à la revente, équipements professionnels, machines, matériaux ou produits spécifiques : nous étudions votre projet et recherchons des solutions d’approvisionnement adaptées. Basée en Côte d’Ivoire, N&K Global Business accompagne les clients où qu’ils se trouvent." />
      <section className="py-16">
        <div className="wrap grid gap-6 md:grid-cols-2">
          {offres.map((o) => (
            <article key={o.id} className="flex flex-col border border-marine/15 p-8 hover:-translate-y-1 hover:shadow-lg">
              <h2 className="font-display text-2xl font-semibold text-marine">{o.nom}</h2>
              <p className="mt-1 font-semibold text-or-fonce">{o.accroche}</p>
              {o.texte.map((t) => <p key={t} className="mt-4 text-brume">{t}</p>)}
              <p className="mt-4 text-sm text-brume">{o.note}</p>
              <Link href={`/sourcing/devis?formule=${encodeURIComponent(o.id)}`} className={`${btnDark} mt-6 self-start`}>Demander un devis {o.id}</Link>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-ivoire py-16">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine">Nos marchés prioritaires</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {destinations.map((d) => <div key={d.slug}><h3 className="font-semibold text-marine">{d.nom}</h3><p className="mt-1 text-brume">{d.secteurs}</p></div>)}
          </div>
          <p className="mt-8 max-w-3xl text-brume">Vous recherchez des produits dans un autre pays ou un autre secteur ? Présentez-nous votre besoin : nous étudions aussi les demandes hors de nos marchés prioritaires, sous réserve de faisabilité et de conformité réglementaire.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine">Notre méthode</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-4">
            {etapesSourcing.map((e, i) => (
              <li key={e.titre} className="border-t-2 border-or pt-4">
                <span className="font-display text-2xl text-or-fonce">{i + 1}</span>
                <h3 className="mt-1 font-semibold text-marine">{e.titre}</h3>
                <p className="mt-1 text-sm text-brume">{e.texte}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-3xl text-sm text-brume">Les délais de 10 à 20 jours ouvrés concernent la recherche et la présentation des fournisseurs, pas la fabrication ni la livraison. Les honoraires de recherche rémunèrent le travail réalisé, même sans commande ultérieure, dans le respect des droits légaux applicables. Aucune commission sur achat n’est due en l’absence de commande.</p>
          <h2 className="mt-14 font-display text-2xl font-semibold text-marine">Une logistique adaptée à vos besoins</h2>
          <p className="mt-3 max-w-3xl text-brume">Vous pouvez faire appel à votre propre transitaire ou demander une mise en relation avec un partenaire logistique. Nous coordonnons les échanges selon les prestations prévues au devis. Les marchandises, le transport, les assurances éventuelles, les droits de douane et les taxes sont distingués de nos honoraires.</p>
        </div>
      </section>
    </>
  );
}
