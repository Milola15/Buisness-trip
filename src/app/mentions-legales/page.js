import PageHero from "@/components/PageHero";

export const metadata = { title: "Mentions légales", robots: { index: false } };

export default function Page() {
  return (
    <>
      <PageHero titre="Mentions légales" />
      <section className="py-16">
        <div className="wrap max-w-3xl text-brume">
          <p>Cette page est à rédiger avec les informations juridiques de N&amp;K Group (raison sociale, adresse, responsable de publication, hébergeur, traitement des données personnelles). Elle est volontairement exclue des moteurs de recherche tant qu’elle n’est pas complétée.</p>
        </div>
      </section>
    </>
  );
}
