import PageHero from "@/components/PageHero";
import { FormulaireDevis } from "@/components/Formulaires";

export const metadata = {
  title: "Demander un devis de sourcing",
  description: "Décrivez votre besoin de sourcing international : demande gratuite et sans engagement, réponse sous 48 à 72 heures ouvrées.",
  alternates: { canonical: "/sourcing/devis" },
};

export default async function Devis({ searchParams }) {
  const { formule } = await searchParams;
  const valide = ["Essentiel", "Intégral"].includes(formule) ? formule : "";
  return (
    <>
      <PageHero titre="Demandez votre devis personnalisé." intro="Votre demande est gratuite et sans engagement. Joignez des photos ou des fiches techniques pour nous aider à comprendre votre besoin. Les recherches approfondies ne commencent qu’après validation du devis." />
      <section className="py-16"><div className="wrap max-w-4xl"><FormulaireDevis formule={valide} /></div></section>
    </>
  );
}
