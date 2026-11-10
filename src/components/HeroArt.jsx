// Illustrations de la bannière des pages intérieures : même univers que la carte de l'accueil,
// avec un modèle différent selon la page.
const MAP = {
  "/business-trips": "trips",
  "/business-trips/chine": "chine",
  "/business-trips/turquie": "turquie",
  "/business-trips/dubai": "dubai",
  "/sourcing": "sourcing",
  "/sourcing/devis": "devis",
  "/a-propos": "apropos",
  "/contact": "contact",
};
export const varianteDe = (chemin) => MAP[(chemin || "").replace(/\/$/, "")] || null;

const OR = "#b69a67";
const IVOIRE = "#f5f1e8";
const NUIT = "#0c1b2c";
const A = { x: 48, y: 274 };
const PAYS = {
  turquie: { nom: "Turquie", x: 200, y: 79 },
  dubai: { nom: "Dubaï", x: 321, y: 165 },
  chine: { nom: "Chine", x: 589, y: 177 },
};
const ALLER = {
  turquie: "M48 274 Q108 86 200 79",
  dubai: "M48 274 Q190 105 321 165",
  chine: "M48 274 Q330 40 589 177",
};

function Cadre({ label, children }) {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label={label} className="mx-auto h-auto w-full max-w-xl lg:max-w-none">
      <g stroke={OR} strokeOpacity=".14" strokeWidth="1">
        {[60, 120, 180, 240, 300].map((y) => <line key={y} x1="20" x2="620" y1={y} y2={y} />)}
        {[110, 200, 290, 380, 470, 560].map((x) => <line key={x} y1="20" y2="320" x1={x} x2={x} />)}
      </g>
      {children}
    </svg>
  );
}

function Trace({ d, delay = 0, dur = 2.2, w = 1.6, o = 1 }) {
  return <path d={d} pathLength="1" className="route" fill="none" stroke={OR} strokeWidth={w} strokeOpacity={o} style={{ animationDelay: `${delay}s`, animationDuration: `${dur}s` }} />;
}

const halo = { stroke: NUIT, strokeWidth: 4, paintOrder: "stroke", strokeLinejoin: "round" };

function Point({ x, y, nom, delay = 1.8, r = 5, taille = 15, dy = -14, o = 1, anneau = false }) {
  return (
    <g className="pt" style={{ animationDelay: `${delay}s` }}>
      <circle cx={x} cy={y} r={r} fill={IVOIRE} fillOpacity={o} />
      {anneau && <circle cx={x} cy={y} r={r} fill="none" stroke={OR} strokeWidth="1.5" className="pulse" />}
      {nom && <text x={x} y={y + dy} textAnchor="middle" fill={IVOIRE} fillOpacity={o} fontSize={taille} fontWeight="600" {...halo} strokeOpacity={o}>{nom}</text>}
    </g>
  );
}

function Hub({ x = A.x, y = A.y, nom = "Abidjan", dy = 34, anneaux = 1 }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill={OR} />
      <circle cx={x} cy={y} r="9" fill="none" stroke={OR} strokeWidth="1.5" className="pulse" />
      {anneaux > 1 && <circle cx={x} cy={y} r="9" fill="none" stroke={OR} strokeWidth="1.5" className="pulse" style={{ animationDelay: "1.3s" }} />}
      {nom && <text x={x} y={y + dy} textAnchor="middle" fill={IVOIRE} fontSize="15" fontWeight="600" {...halo}>{nom}</text>}
    </g>
  );
}

function Destination({ cle }) {
  const cible = PAYS[cle];
  const autres = Object.entries(PAYS).filter(([k]) => k !== cle);
  return (
    <Cadre label={`Route d’Abidjan vers ${cible.nom}`}>
      {autres.map(([k, p]) => <Point key={k} {...p} delay={0.4} r={4} o={0.35} />)}
      <Trace d={ALLER[cle]} w={2.6} dur={2.4} />
      <Point {...cible} delay={2.2} r={8} taille={22} dy={-22} anneau />
      <Hub />
    </Cadre>
  );
}

const NOEUDS = [
  { nom: "Europe", x: 320, y: 50, dy: -14 },
  { nom: "Chine", x: 510, y: 133, dy: -14 },
  { nom: "Dubaï", x: 438, y: 267, dy: 28 },
  { nom: "Turquie", x: 202, y: 267, dy: 28 },
  { nom: "Afrique", x: 130, y: 133, dy: -14 },
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
        <Cadre label="Itinéraire des Business Trips : Abidjan, puis la Turquie, Dubaï et la Chine">
          <Trace d="M48 274 Q108 86 200 79" delay={0.2} dur={1.2} />
          <Trace d="M200 79 Q290 60 321 165" delay={1.4} dur={1.2} />
          <Trace d="M321 165 Q450 90 589 177" delay={2.6} dur={1.2} />
          <Point {...PAYS.turquie} delay={1.3} />
          <Point {...PAYS.dubai} delay={2.5} />
          <Point {...PAYS.chine} delay={3.7} />
          <Hub />
        </Cadre>
      );
    case "chine":
    case "turquie":
    case "dubai":
      return <Destination cle={variant} />;
    case "sourcing":
      return (
        <Cadre label="Des fournisseurs de Turquie, de Dubaï et de Chine vers Abidjan">
          <Point {...PAYS.turquie} delay={0.2} />
          <Point {...PAYS.dubai} delay={0.2} />
          <Point {...PAYS.chine} delay={0.2} />
          <Trace d="M200 79 Q190 230 48 274" delay={0.6} dur={2} />
          <Trace d="M321 165 Q240 290 48 274" delay={0.9} dur={2} />
          <Trace d="M589 177 Q400 340 48 274" delay={1.2} dur={2.4} />
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
        <Cadre label="Un réseau international organisé autour d’Abidjan">
          <g fill="none" stroke={OR} strokeOpacity=".22">
            <ellipse cx="320" cy="170" rx="100" ry="60" />
            <ellipse cx="320" cy="170" rx="200" ry="120" />
          </g>
          {NOEUDS.map((n, i) => <Trace key={n.nom} d={`M320 170 L${n.x} ${n.y}`} delay={0.2 + i * 0.3} dur={1.4} />)}
          {NOEUDS.map((n, i) => <Point key={n.nom} {...n} delay={1.2 + i * 0.3} />)}
          <Hub x={320} y={170} dy={42} anneaux={2} />
        </Cadre>
      );
    case "contact":
      return (
        <Cadre label="Un échange entre vous et Abidjan">
          <Trace d="M120 230 Q300 40 520 100" dur={2} w={2} />
          <Trace d="M520 100 Q360 270 120 230" delay={2.2} dur={2} o={0.45} />
          <Point x={520} y={100} nom="Vous" delay={1.9} r={8} taille={18} dy={-20} anneau />
          <Hub x={120} y={230} />
        </Cadre>
      );
    default:
      return null;
  }
}