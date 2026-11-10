"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { btnDark } from "@/lib/ui";

const MAX = 8 * 1024 * 1024;

function useEnvoi() {
  const router = useRouter();
  const [erreur, setErreur] = useState("");
  const [envoi, setEnvoi] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    setErreur("");
    setEnvoi(true);
    try {
      const res = await fetch("/api/demande", { method: "POST", body: new FormData(form) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || "L’envoi a échoué. Réessayez dans un instant.");
      router.push("/merci");
    } catch (err) {
      setErreur(err.message);
      setEnvoi(false);
    }
  }
  function verifierFichier(e) {
    const f = e.target.files[0];
    if (f && f.size > MAX) {
      setErreur("Le fichier dépasse 8 Mo. Choisissez un fichier plus léger.");
      e.target.value = "";
    } else setErreur("");
  }
  return { erreur, envoi, onSubmit, verifierFichier };
}

const Cache = () => (
  <p className="honeypot" aria-hidden="true">
    <label>Ne pas remplir <input name="bot-field" tabIndex={-1} autoComplete="off" /></label>
  </p>
);
const Consentement = () => (
  <label className="mt-5 flex items-start gap-3 text-sm text-encre">
    <input type="checkbox" name="accord-contact" value="oui" required className="mt-1" />
    <span>J’accepte d’être contacté(e) au sujet de ma demande. Les informations transmises servent uniquement à étudier mon projet.</span>
  </label>
);
const Erreur = ({ texte }) => (
  <p role="alert" className="mt-4 min-h-6 text-sm font-medium text-red-700">{texte}</p>
);

export function FormulaireDevis({ formule = "" }) {
  const { erreur, envoi, onSubmit, verifierFichier } = useEnvoi();
  return (
    <form onSubmit={onSubmit} className="border border-marine/15 bg-ivoire/60 p-6 sm:p-8">
      <input type="hidden" name="type" value="sourcing" />
      <Cache />
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <label className="champ">Nom et prénom<input name="nom" required autoComplete="name" /></label>
        <label className="champ">Adresse e-mail<input name="email" type="email" required autoComplete="email" /></label>
        <label className="champ">WhatsApp ou téléphone<input name="telephone" type="tel" placeholder="Avec l’indicatif du pays" /></label>
        <label className="champ">Pays de résidence<input name="residence" required placeholder="Ex. : Côte d’Ivoire, France" /></label>
        <label className="champ">Formule souhaitée
          <select name="formule" required defaultValue={formule}>
            <option value="">Choisir une formule</option>
            <option value="Essentiel">Sourcing Essentiel</option>
            <option value="Intégral">Sourcing Intégral</option>
            <option value="À conseiller">Je souhaite être conseillé(e)</option>
          </select>
        </label>
        <label className="champ">Pays de sourcing
          <select name="pays-sourcing" required defaultValue="">
            <option value="">Choisir un pays</option>
            <option>Chine</option><option>Turquie</option><option>Dubaï / Émirats arabes unis</option><option>Autre / À définir</option>
          </select>
        </label>
        <label className="champ">Budget marchandises
          <select name="budget" required defaultValue="">
            <option value="">Choisir un budget</option>
            <option>Budget à définir</option><option>Moins de 1 000 €</option><option>1 000 à 1 499 €</option><option>1 500 à 2 999 €</option><option>3 000 à 4 999 €</option><option>5 000 à 9 999 €</option><option>10 000 € et plus</option>
          </select>
        </label>
        <label className="champ">Pays de livraison<input name="pays-livraison" required placeholder="Destination des marchandises" /></label>
      </div>
      <label className="champ mt-5">Produits recherchés, quantités et précisions
        <textarea name="besoin" rows={5} required placeholder="Décrivez votre projet, les quantités, les caractéristiques et les références souhaitées." />
      </label>
      <label className="champ mt-5">Photos ou document de référence (JPG, PNG ou PDF, 8 Mo maximum)
        <input name="reference-produit" type="file" accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" onChange={verifierFichier} />
      </label>
      <Consentement />
      <Erreur texte={erreur} />
      <button type="submit" disabled={envoi} className={`${btnDark} mt-2 w-full cursor-pointer disabled:opacity-60 sm:w-auto`}>
        {envoi ? "Envoi en cours…" : "Envoyer ma demande de devis"}
      </button>
    </form>
  );
}

export function FormulaireContact() {
  const { erreur, envoi, onSubmit } = useEnvoi();
  return (
    <form onSubmit={onSubmit} className="border border-marine/15 bg-ivoire/60 p-6 sm:p-8">
      <input type="hidden" name="type" value="preinscription" />
      <Cache />
      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <label className="champ">Nom et prénom<input name="nom" required autoComplete="name" /></label>
        <label className="champ">Adresse e-mail<input name="email" type="email" required autoComplete="email" /></label>
        <label className="champ">WhatsApp ou téléphone<input name="telephone" type="tel" placeholder="Avec l’indicatif du pays" /></label>
        <label className="champ">Destination qui vous intéresse
          <select name="destination" required defaultValue="">
            <option value="">Choisir une destination</option>
            <option>Chine</option><option>Turquie</option><option>Dubaï</option><option>Je ne sais pas encore</option>
          </select>
        </label>
      </div>
      <label className="champ mt-5">Votre message
        <textarea name="message" rows={5} required placeholder="Présentez votre projet ou vos centres d’intérêt, même s’ils ne sont pas encore précis." />
      </label>
      <Consentement />
      <Erreur texte={erreur} />
      <button type="submit" disabled={envoi} className={`${btnDark} mt-2 w-full cursor-pointer disabled:opacity-60 sm:w-auto`}>
        {envoi ? "Envoi en cours…" : "Envoyer ma préinscription"}
      </button>
    </form>
  );
}
