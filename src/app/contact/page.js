import PageHero from "@/components/PageHero";
import { FormulaireContact } from "@/components/Formulaires";

export const metadata = {
  title: "Contact et préinscription Business Trips",
  description: "Contactez N&K Global Business : préinscription gratuite à un Business Trip, question sur le sourcing ou présentation de votre projet.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero titre="Votre prochaine opportunité commence ici." intro="Intéressé par un Business Trip, une préinscription gratuite ou un besoin de sourcing ? Présentez-nous votre projet. Pour un devis de sourcing détaillé, utilisez plutôt le formulaire dédié." />
      <section className="py-16"><div className="wrap max-w-4xl"><FormulaireContact /></div></section>
    </>
  );
}
