import Link from "next/link";
import { btnDark } from "@/lib/ui";

export const metadata = { title: "Merci", robots: { index: false } };

export default function Merci() {
  return (
    <section className="py-24">
      <div className="wrap max-w-xl border-t-4 border-or bg-ivoire p-10">
        <h1 className="font-display text-4xl font-semibold text-marine">Merci pour votre demande.</h1>
        <p className="mt-4 text-brume">Votre demande a bien été transmise. Notre équipe vous répondra dans un délai indicatif de 48 à 72 heures ouvrées.</p>
        <Link href="/" className={`${btnDark} mt-8`}>Retour à l’accueil</Link>
      </div>
    </section>
  );
}
