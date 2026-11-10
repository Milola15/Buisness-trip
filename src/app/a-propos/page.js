import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/site";
import { btnGold, btnLine } from "@/lib/ui";

export const metadata = {
  title: "À propos",
  description: "N&K Global Business, entité de N&K Group, facilite l’accès aux marchés, aux rencontres professionnelles et aux opportunités internationales. Fondatrice : Eve Konan.",
  alternates: { canonical: "/a-propos" },
};

const principes = [
  { titre: "L’écoute", texte: "Nous partons de votre projet et de vos attentes, que vous ayez déjà une activité ou que vous souhaitiez simplement découvrir et vous inspirer." },
  { titre: "La préparation", texte: "Chaque étape est cadrée avant de s’engager : programmes, dates et conditions sont confirmés avant toute réservation, et les recherches de sourcing commencent après validation du devis." },
  { titre: "Un accompagnement humain", texte: "Une approche adaptée à chaque ambition. Basée en Côte d’Ivoire, N&K Global Business accompagne ses clients où qu’ils se trouvent." },
];

const personne = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eve Konan",
  jobTitle: "Fondatrice",
  image: `${site.url}/eve-konan.jpg`,
  worksFor: { "@type": "Organization", name: site.name },
};

export default function APropos() {
  return (
    <>
      <PageHero titre="Une vision entrepreneuriale, une ouverture internationale." intro="N&K Global Business est une entité de N&K Group, un groupe entrepreneurial développant plusieurs activités de services et d’accompagnement." />

      <section className="py-20">
        <div className="wrap">
          <h2 className="max-w-3xl font-display text-3xl font-semibold text-marine sm:text-4xl">Notre mission : faciliter l’accès aux marchés, aux rencontres professionnelles et aux opportunités internationales.</h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {principes.map((p) => (
              <div key={p.titre} className="border-t-2 border-or pt-4">
                <h3 className="font-display text-xl font-semibold text-marine">{p.titre}</h3>
                <p className="mt-2 text-brume">{p.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sombre bg-marine py-20 text-white">
        <div className="wrap grid items-center gap-14 md:grid-cols-[.8fr_1fr]">
          <div className="relative mx-auto w-full max-w-sm before:absolute before:inset-0 before:translate-x-4 before:translate-y-4 before:border before:border-or md:max-w-none">
            <Image
              src="/eve-konan.jpg"
              width={1024}
              height={1536}
              sizes="(min-width: 768px) 40vw, 90vw"
              alt="Portrait d’Eve Konan, fondatrice de N&K Global Business, bras croisés, en tenue bordeaux sur fond bleu-vert"
              className="relative h-auto w-full"
            />
          </div>
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-semibold">Eve Konan</h2>
            <p className="mt-1 font-semibold text-or">Fondatrice de N&amp;K Global Business</p>
            <p className="mt-6 text-lg text-white/80">Une démarche nourrie par l’expérience entrepreneuriale, les échanges internationaux et la compréhension des besoins des porteurs de projets. Notre approche privilégie l’écoute, la préparation et un accompagnement humain adapté à chaque ambition.</p>
            <blockquote className="mt-8 border-l-4 border-or pl-5 font-display text-2xl leading-snug">Connecter les ambitions aux opportunités internationales.</blockquote>
          </div>
        </div>
      </section>

      <section className="bg-ivoire py-20">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold text-marine">Ce que nous faisons</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl font-semibold text-marine">Business Trips</h3>
              <p className="mt-2 text-brume">Des séjours professionnels en Chine, en Turquie et à Dubaï pour découvrir de nouveaux marchés, rencontrer des fournisseurs et développer votre réseau.</p>
              <Link href="/business-trips" className="mt-4 inline-block font-semibold text-marine underline decoration-or decoration-2 underline-offset-4">Découvrir les voyages</Link>
            </div>
            <div>
              <h3 className="font-display text-2xl font-semibold text-marine">Sourcing international</h3>
              <p className="mt-2 text-brume">Identification de fournisseurs, comparaison des propositions et coordination de vos achats, selon la formule choisie.</p>
              <Link href="/sourcing" className="mt-4 inline-block font-semibold text-marine underline decoration-or decoration-2 underline-offset-4">Découvrir le sourcing</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="sombre bg-nuit py-20 text-center text-white">
        <div className="wrap">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">Parlons de votre projet.</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/80">Vous avez une idée précise ou simplement l’envie de découvrir : présentez-nous votre situation, nous vous répondrons.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={btnGold}>Nous contacter</Link>
            <Link href="/sourcing/devis" className={btnLine}>Demander un devis de sourcing</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personne) }} />
    </>
  );
}