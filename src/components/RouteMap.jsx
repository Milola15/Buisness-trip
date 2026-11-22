import { Cadre, Trace, Point, Hub, Avion, DEST, ALLER } from "./CarteBase";

// Carte de l'accueil : depuis « Votre position », des avions rejoignent la Turquie, Dubaï et la Chine.
export default function RouteMap() {
  const cles = Object.keys(DEST);
  return (
    <Cadre label="Des avions qui partent de votre position vers la Turquie, Dubaï et la Chine">
      {cles.map((k, i) => <Trace key={k} d={ALLER[k]} delay={0.3 + i * 0.3} />)}
      {cles.map((k, i) => <Avion key={k} d={ALLER[k]} delay={2.7 + i * 1.4} cycle={[6, 6.6, 8.4][i]} />)}
      {cles.map((k, i) => <Point key={k} {...DEST[k]} delay={2.2 + i * 0.2} />)}
      <Hub />
    </Cadre>
  );
}