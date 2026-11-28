"use client";
import { useId, useState } from "react";

// Thèmes cliquables : un clic ouvre une courte définition sous la rangée, un second clic la referme.
export default function TagsDefinitions({ tags, definitions = {} }) {
  const [actif, setActif] = useState(null);
  const [dernier, setDernier] = useState(null); // garde le texte affiché pendant la fermeture
  const id = useId();

  function basculer(t) {
    const ouvre = actif !== t;
    setActif(ouvre ? t : null);
    if (ouvre) setDernier(t);
  }

  return (
    <div>
      <p className="mb-3 text-sm text-brume">Cliquez sur un thème pour voir sa définition.</p>
      <ul className="flex flex-wrap gap-2">
        {tags.map((t) => {
          const ouvert = actif === t;
          const classes = `rounded-full border px-4 py-1.5 text-sm transition-colors duration-200 ${ouvert ? "border-marine bg-marine text-white" : "border-marine/20 bg-white text-marine hover:border-or-fonce hover:bg-white"}`;
          return (
            <li key={t}>
              {definitions[t] ? (
                <button type="button" onClick={() => basculer(t)} aria-expanded={ouvert} aria-controls={`${id}-def`} className={`${classes} cursor-pointer`}>
                  {t}
                  <span aria-hidden="true" className={`ml-2 inline-block transition-transform duration-300 ${ouvert ? "rotate-45 text-or" : "text-or-fonce"}`}>+</span>
                </button>
              ) : (
                <span className={classes}>{t}</span>
              )}
            </li>
          );
        })}
      </ul>
      <div id={`${id}-def`} role="region" aria-live="polite" className={`grid transition-all duration-300 ease-out ${actif ? "mt-4 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          {dernier && (
            <div className="max-w-2xl border-l-4 border-or bg-white p-5">
              <p className="font-display text-lg font-semibold text-marine">{dernier}</p>
              <p className="mt-1 text-brume">{definitions[dernier]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
