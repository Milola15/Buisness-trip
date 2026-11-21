import { Cadre, Trace, Point, Origines, Regions, ORIGINES, DEST, arc } from "./CarteBase";

const LIAISONS = [
  ["montreal", "chine", 0.35],
  ["haiti", "dubai", 0.3],
  ["dakar", "turquie", 0.4],
  ["abidjan", "chine", 0.15],
  ["kinshasa", "dubai", 0.5],
  ["paris", "turquie", 0.4],
];

export default function RouteMap() {
  return (
    <Cadre label="Des voyageurs partis du monde entier vers la Turquie, Dubaï et la Chine">
      <Regions />
      <Origines />
      {LIAISONS.map(([o, d, l], i) => <Trace key={`${o}-${d}`} d={arc(ORIGINES[o], DEST[d], l)} delay={0.4 + i * 0.3} />)}
      {Object.values(DEST).map((p, i) => <Point key={p.nom} {...p} delay={2.3 + i * 0.2} anneau />)}
    </Cadre>
  );
}
