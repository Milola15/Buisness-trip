"use client";
import { useState } from "react";

function idYoutube(valeur) {
  if (!valeur) return null;
  const m = String(valeur).match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
  if (m) return m[1];
  return /^[\w-]{11}$/.test(valeur) ? valeur : null;
}

export default function VideoTemoignage({ t }) {
  const [lecture, setLecture] = useState(false);
  const id = idYoutube(t.youtube);
  const format = t.vertical ? "aspect-[9/16] max-w-xs mx-auto" : "aspect-video";

  if (id) {
    return (
      <div className={`relative w-full overflow-hidden bg-nuit ${format}`}>
        {lecture ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={`Témoignage de ${t.nom}`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <button type="button" onClick={() => setLecture(true)} aria-label={`Lire le témoignage de ${t.nom}`} className="group absolute inset-0 block h-full w-full cursor-pointer">
            <img src={t.affiche || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <span className="absolute inset-0 bg-nuit/30" aria-hidden="true" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-or text-nuit shadow-lg transition-transform duration-300 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
            </span>
          </button>
        )}
      </div>
    );
  }

  if (t.fichier) {
    return (
      <video controls playsInline preload="metadata" poster={t.affiche} aria-label={`Témoignage de ${t.nom}`} className={`w-full bg-nuit ${format}`}>
        <source src={t.fichier} type="video/mp4" />
      </video>
    );
  }
  return null;
}
