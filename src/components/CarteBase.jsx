// Éléments communs des cartes : du point « Votre position » vers la Turquie, Dubaï et la Chine.
export const OR = "#b69a67";
export const IVOIRE = "#f5f1e8";
export const NUIT = "#0c1b2c";

export const ORIGINE = { x: 70, y: 274 };
export const DEST = {
  turquie: { nom: "Turquie", x: 200, y: 79 },
  dubai: { nom: "Dubaï", x: 321, y: 165 },
  chine: { nom: "Chine", x: 589, y: 177 },
};
// Routes depuis la position du visiteur (courbes de Bézier : point de départ, point de contrôle, arrivée)
export const CONTROLE = { turquie: { x: 120, y: 86 }, dubai: { x: 200, y: 105 }, chine: { x: 340, y: 40 } };
export const ALLER = {
  turquie: "M70 274 Q120 86 200 79",
  dubai: "M70 274 Q200 105 321 165",
  chine: "M70 274 Q340 40 589 177",
};
export const RETOUR = {
  turquie: "M200 79 Q120 86 70 274",
  dubai: "M321 165 Q200 105 70 274",
  chine: "M589 177 Q340 40 70 274",
};
// Point situé à la fraction t (0 à 1) de la route vers une destination
export function surRoute(cle, t) {
  const a = ORIGINE, c = CONTROLE[cle], b = DEST[cle], u = 1 - t;
  return { x: u * u * a.x + 2 * u * t * c.x + t * t * b.x, y: u * u * a.y + 2 * u * t * c.y + t * t * b.y };
}

export function Cadre({ label, children }) {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label={label} className="mx-auto h-auto w-full max-w-xl lg:max-w-none">
      <style>{"@media (prefers-reduced-motion: reduce){.avion{display:none}}"}</style>
      <g stroke={OR} strokeOpacity=".14" strokeWidth="1">
        {[60, 120, 180, 240, 300].map((y) => <line key={y} x1="20" x2="620" y1={y} y2={y} />)}
        {[110, 200, 290, 380, 470, 560].map((x) => <line key={x} y1="20" y2="320" x1={x} x2={x} />)}
      </g>
      {children}
    </svg>
  );
}

export function Trace({ d, delay = 0, dur = 2.2, w = 1.6, o = 1 }) {
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

// Point de départ ou d'arrivée mis en valeur
export function Hub({ x = ORIGINE.x, y = ORIGINE.y, nom = "Votre position", dy = 34, anneaux = 1 }) {
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

// Silhouette d'avion vue de dessus, le nez pointant vers la droite
const FORME = "M12 0 L4 -1.8 L1 -2 L-3 -9 L-5.5 -9 L-3.5 -2.2 L-8 -1.6 L-9.5 -4.5 L-11.5 -4.5 L-10.5 -0.8 L-11 0 L-10.5 0.8 L-11.5 4.5 L-9.5 4.5 L-8 1.6 L-3.5 2.2 L-5.5 9 L-3 9 L1 2 L4 1.8 Z";

// Avion qui décolle, suit la route puis atterrit, en boucle. cycle = durée totale, vol = part du cycle passée en l'air.
export function Avion({ d, delay = 2.6, cycle = 6, vol = 0.72, echelle = 1.15 }) {
  const t = `${cycle}s`;
  return (
    <g className="avion" opacity="0">
      <path d={FORME} transform={`scale(${echelle})`} fill={IVOIRE} stroke={NUIT} strokeWidth=".7" />
      <animateMotion path={d} rotate="auto" dur={t} begin={`${delay}s`} repeatCount="indefinite" calcMode="spline" keyPoints="0;1;1" keyTimes={`0;${vol};1`} keySplines="0.45 0 0.55 1;0 0 1 1" />
      <animate attributeName="opacity" values="0;1;1;0;0" keyTimes={`0;0.06;${(vol - 0.06).toFixed(2)};${vol};1`} dur={t} begin={`${delay}s`} repeatCount="indefinite" />
    </g>
  );
}