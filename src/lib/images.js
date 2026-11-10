import fs from "node:fs";
import path from "node:path";

// Cherche l'image d'une destination dans public/images/destinations/ (chine, turquie, dubai).
// Formats acceptés : jpg, jpeg, png, webp, avif. Renvoie null si aucune image n'est présente.
export function imageDe(slug) {
  for (const ext of ["jpg", "jpeg", "png", "webp", "avif"]) {
    const src = `/images/destinations/${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", src))) return src;
  }
  return null;
}