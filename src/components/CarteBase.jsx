// Éléments communs des cartes : les voyageurs partent du monde entier vers la Turquie, Dubaï et la Chine.
export const OR = "#b69a67";
export const IVOIRE = "#f5f1e8";
export const NUIT = "#0c1b2c";

// Carte du monde simplifiée (zone affichée : de l'Amérique du Nord à la Chine)
export const DEST = {
  turquie: { nom: "Turquie", x: 346, y: 106 },
  dubai: { nom: "Dubaï", x: 421, y: 169 },
  chine: { nom: "Chine", x: 586, y: 178 },
};
export const ORIGINES = {
  montreal: { x: 53, y: 88 },
  haiti: { x: 56, y: 196 },
  dakar: { x: 214, y: 211 },
  abidjan: { x: 251, y: 249 },
  kinshasa: { x: 307, y: 287 },
  paris: { x: 270, y: 74 },
};
export const REGIONS = [
  { nom: "Votre position", x: 56, y: 66 },
  { nom: "Votre position", x: 270, y: 56 },
  { nom: "Votre position", x: 262, y: 322 },
];

// Arc entre deux points. lift > 0 : courbe vers le haut ; lift < 0 : vers le bas.
function controle(a, b, lift) {
  const h = Math.max(30, Math.abs(b.x - a.x) * Math.abs(lift)) * (lift < 0 ? -1 : 1);
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 - h };
}
export function arc(a, b, lift = 0.25) {
  const c = controle(a, b, lift);
  return `M${a.x} ${a.y} Q${Math.round(c.x)} ${Math.round(c.y)} ${b.x} ${b.y}`;
}
export function pointSur(a, b, lift = 0.25, t = 0.5) {
  const c = controle(a, b, lift);
  const u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
}

export function Cadre({ label, children }) {
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

export function Trace({ d, delay = 0, dur = 2.2, w = 1.4, o = 0.9 }) {
  return <path d={d} pathLength="1" className="route" fill="none" stroke={OR} strokeWidth={w} strokeOpacity={o} style={{ animationDelay: `${delay}s`, animationDuration: `${dur}s` }} />;
}

export const halo = { stroke: NUIT, strokeWidth: 4, paintOrder: "stroke", strokeLinejoin: "round" };

export function Point({ x, y, nom, delay = 1.8, r = 5, taille = 15, dy = -14, o = 1, anneau = false }) {
  return (
    <g className="pt" style={{ animationDelay: `${delay}s` }}>
      <circle cx={x} cy={y} r={r} fill={IVOIRE} fillOpacity={o} />
      {anneau && <circle cx={x} cy={y} r={r} fill="none" stroke={OR} strokeWidth="1.5" className="pulse" />}
      {nom && <text x={x} y={y + dy} textAnchor="middle" fill={IVOIRE} fillOpacity={o} fontSize={taille} fontWeight="600" {...halo} strokeOpacity={o}>{nom}</text>}
    </g>
  );
}

export function Origine({ x, y, delay = 0, r = 3.5 }) {
  return <circle className="pt" cx={x} cy={y} r={r} fill={IVOIRE} fillOpacity=".85" style={{ animationDelay: `${delay}s` }} />;
}

export function Regions() {
  return REGIONS.map((r, i) => (
    <text key={i} className="pt" x={r.x} y={r.y} textAnchor="middle" fill={IVOIRE} fillOpacity=".8" fontSize="12" fontWeight="500" {...halo} strokeOpacity=".8">{r.nom}</text>
  ));
}

export function Origines({ delay = 0 }) {
  return Object.entries(ORIGINES).map(([k, o], i) => <Origine key={k} {...o} delay={delay + i * 0.1} />);
}

// Point d'arrivée mis en valeur (suivi, centre du réseau)
export function Hub({ x, y, nom, dy = 34, anneaux = 1 }) {
  return (
    <g>
      <circle cx={x} cy={y} r="9" fill={OR} />
      <circle cx={x} cy={y} r="9" fill="none" stroke={OR} strokeWidth="1.5" className="pulse" />
      {anneaux > 1 && <circle cx={x} cy={y} r="9" fill="none" stroke={OR} strokeWidth="1.5" className="pulse" style={{ animationDelay: "1.3s" }} />}
      {nom && <text x={x} y={y + dy} textAnchor="middle" fill={IVOIRE} fontSize="15" fontWeight="600" {...halo}>{nom}</text>}
    </g>
  );
}

// Centre du réseau : l'équipe N&K
export function Centre({ x, y, anneaux = 2 }) {
  return (
    <g>
      <circle cx={x} cy={y} r="16" fill={OR} />
      <circle cx={x} cy={y} r="16" fill="none" stroke={OR} strokeWidth="1.5" className="pulse" />
      {anneaux > 1 && <circle cx={x} cy={y} r="16" fill="none" stroke={OR} strokeWidth="1.5" className="pulse" style={{ animationDelay: "1.3s" }} />}
      <text x={x} y={y + 4} textAnchor="middle" fill={NUIT} fontSize="11" fontWeight="700">N&amp;K</text>
    </g>
  );
}