// Illustrations de la bannière des pages intérieures : même univers que la carte de l'accueil,
// avec un modèle différent selon la page (variant : trips, chine, turquie, dubai, sourcing, devis, apropos, contact, temoignages).
import { Cadre, Trace, Point, Origines, Regions, Hub, Centre, ORIGINES, DEST, OR, NUIT, arc, pointSur } from "./CarteBase";

// Compatibilité : d'anciennes versions de PageHero.jsx importent encore varianteDe depuis ce fichier.
const CHEMINS = {
  "/business-trips": "trips",
  "/business-trips/chine": "chine",
  "/business-trips/turquie": "turquie",
  "/business-trips/dubai": "dubai",
  "/sourcing": "sourcing",
  "/sourcing/devis": "devis",
  "/temoignages": "temoignages",
  "/a-propos": "apropos",
  "/contact": "contact",
};
export const varianteDe = (chemin) => CHEMINS[(chemin || "").replace(/\/$/, "")] || null;

const O = ORIGINES;
const ids = Object.keys(O);

// Toutes les origines convergent vers une destination (les autres pays restent en retrait)
const LIFTS = {
  turquie: { montreal: 0.3, haiti: 0.3, dakar: 0.4, abidjan: 0.4, kinshasa: 0.5, paris: 0.4 },
  dubai: { montreal: 0.3, haiti: 0.3, dakar: 0.3, abidjan: 0.3, kinshasa: 0.5, paris: 0.3 },
  chine: { montreal: 0.35, haiti: 0.3, dakar: 0.12, abidjan: 0.15, kinshasa: 0.15, paris: 0.3 },
};

function Destination({ cle }) {
  const cible = DEST[cle];
  const autres = Object.entries(DEST).filter(([k]) => k !== cle);
  return (
    <Cadre label={`Des voyageurs partis du monde entier vers ${cible.nom}`}>
      <Regions />
      <Origines />
      {autres.map(([k, p]) => <Point key={k} {...p} delay={0.4} r={4} o={0.35} />)}
      {ids.map((o, i) => <Trace key={o} d={arc(O[o], cible, LIFTS[cle][o])} delay={0.3 + i * 0.25} w={1.8} />)}
      <Point {...cible} delay={2.2} r={8} taille={22} dy={-22} anneau />
    </Cadre>
  );
}

const TRIPS = [
  ["montreal", "turquie", -0.3],
  ["haiti", "chine", -0.2],
  ["dakar", "dubai", -0.25],
  ["abidjan", "chine", -0.2],
  ["kinshasa", "dubai", -0.4],
  ["paris", "chine", 0.4],
];
const SOURCING = [
  ["chine", "montreal", 0.35],
  ["chine", "abidjan", 0.15],
  ["turquie", "paris", 0.4],
  ["turquie", "dakar", 0.4],
  ["dubai", "haiti", 0.3],
  ["dubai", "kinshasa", 0.5],
];
const TEMOIGNAGES = [
  ["montreal", "chine", 0.35],
  ["haiti", "dubai", 0.3],
  ["dakar", "turquie", 0.4],
  ["abidjan", "chine", 0.15],
  ["kinshasa", "dubai", 0.5],
  ["paris", "turquie", 0.4],
];

const NOEUDS = [
  { nom: "Votre position", x: 320, y: 50, dy: -14 },
  { nom: "Chine", x: 493, y: 110, dy: -14 },
  { nom: "Dubaï", x: 493, y: 230, dy: 28 },
  { nom: "Turquie", x: 320, y: 290, dy: 28 },
  { nom: "Votre position", x: 147, y: 230, dy: 28 },
  { nom: "Votre position", x: 147, y: 110, dy: -14 },
];
const ETAPES = [
  { nom: "Projet", x: 70, y: 260 },
  { nom: "Réponse", x: 230, y: 150 },
  { nom: "Devis", x: 400, y: 215 },
  { nom: "Suivi", x: 570, y: 90 },
];

export default function HeroArt({ variant }) {
  switch (variant) {
    case "trips":
      return (
        <Cadre label="Des voyageurs partis du monde entier rejoignent les Business Trips en Turquie, à Dubaï et en Chine">
          <Regions />
          <Origines />
          {TRIPS.map(([o, d, l], i) => <Trace key={`${o}-${d}`} d={arc(O[o], DEST[d], l)} delay={0.3 + i * 0.3} />)}
          {Object.values(DEST).map((p, i) => <Point key={p.nom} {...p} delay={2.2 + i * 0.2} r={7} taille={18} dy={-18} anneau />)}
        </Cadre>
      );
    case "chine":
    case "turquie":
    case "dubai":
      return <Destination cle={variant} />;
    case "sourcing":
      return (
        <Cadre label="Des marchés de Turquie, de Dubaï et de Chine vers des clients du monde entier">
          <Regions />
          {Object.values(DEST).map((p) => <Point key={p.nom} {...p} delay={0.2} />)}
          {SOURCING.map(([d, o, l], i) => <Trace key={`${d}-${o}`} d={arc(DEST[d], O[o], l)} delay={0.6 + i * 0.3} />)}
          {ids.map((o, i) => <circle key={o} className="pt" cx={O[o].x} cy={O[o].y} r="5" fill={OR} style={{ animationDelay: `${1.6 + i * 0.3}s` }} />)}
        </Cadre>
      );
    case "devis":
      return (
        <Cadre label="Les étapes d’un devis : projet, réponse, devis, suivi">
          <Trace d="M70 260 C150 260 150 150 230 150 C310 150 320 215 400 215 C480 215 490 90 570 90" delay={0.2} dur={3.2} w={2} />
          {ETAPES.slice(0, 3).map((e, i) => <Point key={e.nom} {...e} delay={0.2 + i * 1.07} r={7} dy={32} taille={16} />)}
          <g className="pt" style={{ animationDelay: "3.4s" }}><Hub x={570} y={90} nom="Suivi" dy={34} /></g>
        </Cadre>
      );
    case "apropos":
      return (
        <Cadre label="Un réseau international qui relie le monde entier à la Turquie, à Dubaï et à la Chine">
          <g fill="none" stroke={OR} strokeOpacity=".22">
            <ellipse cx="320" cy="170" rx="100" ry="60" />
            <ellipse cx="320" cy="170" rx="200" ry="120" />
          </g>
          {NOEUDS.map((n, i) => <Trace key={i} d={`M320 170 L${n.x} ${n.y}`} delay={0.2 + i * 0.3} dur={1.4} />)}
          {NOEUDS.map((n, i) => <Point key={i} {...n} delay={1.2 + i * 0.3} />)}
          <Centre x={320} y={170} />
        </Cadre>
      );
    case "contact":
      return (
        <Cadre label="Un échange entre vous et notre équipe">
          <Trace d="M120 230 Q300 40 520 100" dur={2} w={2} />
          <Trace d="M520 100 Q360 270 120 230" delay={2.2} dur={2} o={0.45} />
          <Point x={520} y={100} nom="Vous" delay={1.9} r={8} taille={18} dy={-20} anneau />
          <Centre x={120} y={230} anneaux={1} />
        </Cadre>
      );
    case "temoignages": {
      const lecteurs = [0, 2, 4].map((i) => pointSur(O[TEMOIGNAGES[i][0]], DEST[TEMOIGNAGES[i][1]], TEMOIGNAGES[i][2], 0.55));
      return (
        <Cadre label="Des voyageurs du monde entier qui partagent leur expérience en vidéo">
          <Regions />
          <Origines />
          {TEMOIGNAGES.map(([o, d, l], i) => <Trace key={`${o}-${d}`} d={arc(O[o], DEST[d], l)} delay={0.3 + i * 0.3} />)}
          {Object.values(DEST).map((p, i) => <Point key={p.nom} {...p} delay={2.3 + i * 0.2} />)}
          {lecteurs.map((l, i) => (
            <g key={i} className="pt" style={{ animationDelay: `${1.6 + i * 0.3}s` }}>
              <circle cx={l.x} cy={l.y} r="14" fill={OR} />
              <path d={`M${l.x - 4} ${l.y - 6}L${l.x + 7} ${l.y}L${l.x - 4} ${l.y + 6}Z`} fill={NUIT} />
            </g>
          ))}
        </Cadre>
      );
    }
    default:
      return null;
  }
}