const pays = [
  { nom: "Turquie", x: 200, y: 79, d: "M48 274 Q108 86 200 79" },
  { nom: "Dubaï", x: 321, y: 165, d: "M48 274 Q190 105 321 165" },
  { nom: "Chine", x: 589, y: 177, d: "M48 274 Q330 40 589 177" },
];

export default function RouteMap() {
  return (
    <svg viewBox="0 0 640 340" role="img" aria-label="Itinéraires depuis Abidjan vers la Turquie, Dubaï et la Chine" className="h-auto w-full">
      <g stroke="#b69a67" strokeOpacity=".14" strokeWidth="1">
        {[60, 120, 180, 240, 300].map((y) => <line key={y} x1="20" x2="620" y1={y} y2={y} />)}
        {[110, 200, 290, 380, 470, 560].map((x) => <line key={x} y1="20" y2="320" x1={x} x2={x} />)}
      </g>
      {pays.map((p, i) => (
        <g key={p.nom}>
          <path d={p.d} pathLength="1" className="route" style={{ animationDelay: `${0.2 + i * 0.35}s` }} fill="none" stroke="#b69a67" strokeWidth="1.6" />
          <circle cx={p.x} cy={p.y} r="5" fill="#f5f1e8" className="pt" style={{ animationDelay: `${1.7 + i * 0.35}s` }} />
          <text x={p.x} y={p.y - 14} textAnchor="middle" fill="#f5f1e8" fontSize="15" fontWeight="600" className="pt" style={{ animationDelay: `${1.7 + i * 0.35}s` }}>{p.nom}</text>
        </g>
      ))}
      <circle cx="48" cy="274" r="9" fill="#b69a67" />
      <circle cx="48" cy="274" r="9" fill="none" stroke="#b69a67" strokeWidth="1.5" className="pulse" />
      <text x="48" y="308" textAnchor="middle" fill="#f5f1e8" fontSize="15" fontWeight="600">Abidjan</text>
    </svg>
  );
}
