import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { destinations } from "@/lib/data";
import { btnDark, btnGold } from "@/lib/ui";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}
const trouver = (slug) => destinations.find((d) => d.slug === slug);

export async function generateMetadata({ params }) {
  const d = trouver((await params).slug);
  if (!d) return {};
  const p = d.photos[0];
  return {
    title: `Business Trip ${d.nom}`,
    description: d.description,
    alternates: { canonical: `/business-trips/${d.slug}` },
    openGraph: { title: `Business Trip ${d.nom}`, description: d.description, images: [{ url: p.src, width: p.w, height: p.h, alt: p.alt }] },
  };
}

export default async function Destination({ params }) {
  const d = trouver((await params).slug);
  if (!d) notFound();
  const autres = destinations.filter((x) => x.slug !== d.slug);
  const [vedette, ...extras] = d.photos;
  const credits = [...new Set(d.photos.map((p) => p.credit))].join(", ");
  const ratio = (p) => (p.w > p.h ? (extras.length === 1 ? "aspect-[16/9]" : "aspect-[3/2]") : "aspect-[4/5]");
  return (
    <>
      <PageHero titre={d.titre} intro={d.texte}>
        <Link href="/contact" className={`${btnGold} mt-8`}>Me préinscrire pour {d.nom}</Link>
      </PageHero>

      <section>
        <div className="wrap pt-12">
          <div className="relative aspect-[16/9] overflow-hidden border-b-4 border-or sm:aspect-[21/9]">
            <Image src={vedette.src} alt={vedette.alt} fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
            <span className="absolute bottom-0 left-0 bg-nuit/85 px-4 py-2 font-display text-lg text-ivoire">{d.nom}</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          <h2 className="max-w-3xl font-display text-3xl font-semibold text-marine sm:text-4xl">{d.commerceTitre}</h2>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            {d.commerce.map((b) => (
              <div key={b.titre} className="border-t-2 border-or pt-4">
                <h3 className="font-display text-xl font-semibold text-marine">{b.titre}</h3>
                <p className="mt-2 text-brume">{b.texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {extras.length > 0 && (
        <section className="pb-16">
          <div className="wrap">
            <div className={`grid gap-6 ${extras.length === 1 ? "grid-cols-1" : "md:grid-cols-2"}`}>
              {extras.map((p) => (
                <figure key={p.src} className={`relative overflow-hidden ${ratio(p)}`}>
                  <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                </figure>
              ))}
            </div>
            <p className="mt-3 text-xs text-brume">Photos : {credits}, via Unsplash.</p>
          </div>
        </section>
      )}

      <section className="bg-ivoire py-16">
        <div className="wrap">
          {d.formats.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2">
              {d.formats.map((f) => (
                <article key={f.nom} className="border border-marine/15 bg-white p-7 hover:-translate-y-1 hover:shadow-lg">
                  <h2 className="font-display text-2xl font-semibold text-marine">{f.nom}</h2>
                  <p className="mt-2 text-brume">{f.texte}</p>
                  <p className="mt-4 inline-block border border-or-fonce/40 px-3 py-1 text-sm text-or-fonce">{f.tag}</p>
                </article>
              ))}
            </div>
          )}
          {d.tags.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {d.tags.map((t) => <li key={t} className="rounded-full border border-marine/20 bg-white px-4 py-1.5 text-sm text-marine">{t}</li>)}
            </ul>
          )}
          <h2 className="mt-12 font-display text-2xl font-semibold text-marine">Secteurs et marchés visés</h2>
          <p className="mt-2 max-w-2xl text-brume">{d.secteurs}</p>
          <p className="mt-6 max-w-3xl text-sm text-brume">Séjours jusqu’à 8 jours, trajets compris. Dates, activités, inclusions et exclusions sont confirmées avant toute réservation définitive. La préinscription est gratuite et sans engagement.</p>
          <Link href="/contact" className={`${btnDark} mt-8`}>Demander des informations</Link>
        </div>
      </section>

      <section className="py-12">
        <div className="wrap flex flex-wrap items-baseline gap-x-8 gap-y-2">
          <p className="font-semibold text-marine">Autres destinations</p>
          {autres.map((x) => <Link key={x.slug} href={`/business-trips/${x.slug}`} className="underline decoration-or decoration-2 underline-offset-4">{x.nom}</Link>)}
        </div>
      </section>
    </>
  );
}