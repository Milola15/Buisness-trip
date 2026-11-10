import Image from "next/image";

export default function Fondatrice() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-[.7fr_1.2fr]">
      <Image
        src="/eve-konan.jpg"
        width={1024}
        height={1536}
        sizes="(min-width: 768px) 30vw, 90vw"
        alt="Portrait d’Eve Konan, fondatrice de N&K Global Business, bras croisés, en tenue bordeaux sur fond bleu-vert"
        className="mx-auto h-auto w-full max-w-sm"
      />
      <div className="max-w-xl">
        <h2 className="font-display text-3xl font-semibold text-marine">Eve Konan</h2>
        <p className="mt-1 font-semibold text-or-fonce">Fondatrice de N&amp;K Global Business</p>
        <p className="mt-5 text-brume">Une démarche nourrie par l’expérience entrepreneuriale, les échanges internationaux et la compréhension des besoins des porteurs de projets. Notre approche privilégie l’écoute, la préparation et un accompagnement humain adapté à chaque ambition.</p>
        <p className="mt-6 border-l-4 border-or pl-5 font-display text-2xl text-marine">Connecter les ambitions aux opportunités internationales.</p>
      </div>
    </div>
  );
}