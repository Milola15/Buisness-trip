// Illustrations de la bannière des pages intérieures : même univers que la carte de l'accueil,
// avec un modèle différent selon la page (variant : trips, chine, turquie, dubai, sourcing, devis, apropos, contact, temoignages).
import { Cadre, Trace, Point, Hub, Centre, Avion, ORIGINE, DEST, ALLER, RETOUR, OR, NUIT, surRoute } from "./CarteBase";

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

const cles = Object.keys(DEST);

function Destination({ cle }) {
  const cible = DEST[cle];
  const autres = cles.filter((k) => k !== cle);
  return (
    <Cadre label={`Des avions qui partent de votre position vers ${cible.nom}`}>
      {autres.map((k) => <Point key={k} {...DEST[k]} delay={0.4} r={4} o={0.35} />)}
      <Trace d={ALLER[cle]} w={2.6} dur={2.4} />
      <Avion d={ALLER[cle]} delay={2.6} cycle={5.5} echelle={1.4} />
      <Avion d={ALLER[cle]} delay={5.35} cycle={5.5} echelle={1.4} />
      <Point {...cible} delay={2.2} r={8} taille={22} dy={-22} anneau />
      <Hub />
    </Cadre>
  );
}

// Business Trips : un éventail de routes depuis « Votre position » vers les trois destinations
const O2 = { x: 70, y: 170 };
const EVENTAIL = [
  { nom: "Turquie", x: 540, y: 60, d: "M70 170 Q300 105 540 60" },
  { nom: "Dubaï", x: 540, y: 170, d: "M70 170 Q300 150 540 170" },
  { nom: "Chine", x: 540, y: 280, d: "M70 170 Q300 235 540 280" },
];

const ETAPES = [
  { nom: "Projet", x: 70, y: 260 },
  { nom: "Réponse", x: 230, y: 150 },
  { nom: "Devis", x: 400, y: 215 },
  { nom: "Suivi", x: 570, y: 90 },
];
const RESEAU = [
  { nom: "Turquie", x: 470, y: 60, dy: -14 },
  { nom: "Dubaï", x: 530, y: 170, dy: -14 },
  { nom: "Chine", x: 470, y: 280, dy: 28 },
];
// Boutons de lecture placés sur les routes (témoignages)
const LECTEURS = [["turquie", 0.5], ["dubai", 0.55], ["chine", 0.7]];

export default function HeroArt({ variant }) {
  switch (variant) {
    case "trips":
      return (
        <Cadre label="Des avions qui partent de votre position vers les Business Trips en Turquie, à Dubaï et en Chine">
          {EVENTAIL.map((e, i) => <Trace key={e.nom} d={e.d} delay={0.3 + i * 0.3} />)}
          {EVENTAIL.map((e, i) => <Avion key={e.nom} d={e.d} delay={2.6 + i * 1.3} cycle={6.5} />)}
          {EVENTAIL.map((e, i) => <Point key={e.nom} {...e} delay={2.2 + i * 0.2} r={7} taille={18} dy={-18} anneau />)}
          <Hub x={O2.x} y={O2.y} dy={40} />
        </Cadre>
      );
    case "chine":
    case "turquie":
    case "dubai":
      return <Destination cle={variant} />;
    case "sourcing":
      return (
        <Cadre label="Des avions qui partent des marchés de Turquie, de Dubaï et de Chine vers votre position">
          {cles.map((k) => <Point key={k} {...DEST[k]} delay={0.2} />)}
          {cles.map((k, i) => <Trace key={k} d={RETOUR[k]} delay={0.6 + i * 0.3} />)}
          {cles.map((k, i) => <Avion key={k} d={RETOUR[k]} delay={2.8 + i * 1.4} cycle={[6, 6.6, 8.4][i]} />)}
          <Hub anneaux={2} />
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
        <Cadre label="Notre équipe relie votre position à la Turquie, à Dubaï et à la Chine">
          <g fill="none" stroke={OR} strokeOpacity=".22">
            <circle cx="300" cy="170" r="70" />
            <circle cx="300" cy="170" r="140" />
          </g>
          <Trace d="M110 170 L300 170" delay={0.2} dur={1.2} />
          {RESEAU.map((n, i) => <Trace key={n.nom} d={`M300 170 L${n.x} ${n.y}`} delay={1.2 + i * 0.3} dur={1.4} />)}
          <Point x={110} y={170} nom="Votre position" delay={0.2} dy={-14} />
          {RESEAU.map((n, i) => <Point key={n.nom} {...n} delay={2 + i * 0.3} />)}
          <Centre x={300} y={170} />
        </Cadre>
      );
    case "contact":
      return (
        <Cadre label="Un échange entre vous et notre équipe">
          <Trace d="M120 230 Q300 40 520 100" dur={2} w={2} />
          <Trace d="M520 100 Q360 270 120 230" delay={2.2} dur={2} o={0.45} />
          <Avion d="M520 100 Q360 270 120 230" delay={4.4} cycle={6} />
          <Point x={520} y={100} nom="Vous" delay={1.9} r={8} taille={18} dy={-20} anneau />
          <Centre x={120} y={230} anneaux={1} />
        </Cadre>
      );
    case "temoignages":
      return (
        <Cadre label="Des voyageurs qui partagent en vidéo leur expérience vers la Turquie, Dubaï et la Chine">
          {cles.map((k, i) => <Trace key={k} d={ALLER[k]} delay={0.3 + i * 0.3} />)}
          {cles.map((k, i) => <Point key={k} {...DEST[k]} delay={2.3 + i * 0.2} />)}
          {LECTEURS.map(([k, t], i) => {
            const l = surRoute(k, t);
            return (
              <g key={k} className="pt" style={{ animationDelay: `${1.6 + i * 0.3}s` }}>
                <circle cx={l.x} cy={l.y} r="14" fill={OR} />
                <path d={`M${l.x - 4} ${l.y - 6}L${l.x + 7} ${l.y}L${l.x - 4} ${l.y + 6}Z`} fill={NUIT} />
              </g>
            );
          })}
          <Hub />
        </Cadre>
      );
    default:
      return null;
  }
}