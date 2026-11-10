import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX = 8 * 1024 * 1024;
const TYPES = ["image/jpeg", "image/png", "application/pdf"];
const champsParType = {
  sourcing: [
    ["nom", "Nom et prénom"], ["email", "E-mail"], ["telephone", "Téléphone"], ["residence", "Pays de résidence"],
    ["formule", "Formule"], ["pays-sourcing", "Pays de sourcing"], ["budget", "Budget"], ["pays-livraison", "Pays de livraison"], ["besoin", "Besoin"],
  ],
  preinscription: [["nom", "Nom et prénom"], ["email", "E-mail"], ["telephone", "Téléphone"], ["destination", "Destination"], ["message", "Message"]],
};
const optionnels = ["telephone"];

const tentatives = new Map();
function trop(ip) {
  const now = Date.now();
  const liste = (tentatives.get(ip) || []).filter((t) => now - t < 10 * 60 * 1000);
  const bloque = liste.length >= 5;
  if (!bloque) liste.push(now);
  tentatives.set(ip, liste);
  return bloque;
}
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const erreur = (message, status = 400) => Response.json({ message }, { status });

export async function POST(req) {
  const ip = (req.headers.get("x-forwarded-for") || "inconnu").split(",")[0].trim();
  if (trop(ip)) return erreur("Trop de demandes envoyées. Réessayez dans quelques minutes.", 429);

  let fd;
  try { fd = await req.formData(); } catch { return erreur("Demande invalide."); }
  if (fd.get("bot-field")) return Response.json({ ok: true });

  const type = fd.get("type") === "preinscription" ? "preinscription" : "sourcing";
  const champs = champsParType[type];
  const valeurs = {};
  for (const [cle, label] of champs) {
    const v = String(fd.get(cle) ?? "").trim().slice(0, 5000);
    if (!v && !optionnels.includes(cle)) return erreur(`Le champ « ${label} » est obligatoire.`);
    valeurs[cle] = v;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valeurs.email)) return erreur("Adresse e-mail invalide.");
  if (fd.get("accord-contact") !== "oui") return erreur("Vous devez accepter d’être contacté(e) pour envoyer la demande.");

  const attachments = [];
  const fichier = fd.get("reference-produit");
  if (type === "sourcing" && fichier && typeof fichier === "object" && fichier.size > 0) {
    if (fichier.size > MAX) return erreur("Le fichier dépasse 8 Mo.");
    if (!TYPES.includes(fichier.type)) return erreur("Format de fichier non accepté (JPG, PNG ou PDF).");
    attachments.push({ filename: fichier.name, content: Buffer.from(await fichier.arrayBuffer()), contentType: fichier.type });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !MAIL_TO) return erreur("L’envoi des demandes n’est pas encore configuré sur ce site.", 500);

  const sujet = type === "sourcing" ? `Demande de devis sourcing : ${valeurs.nom}` : `Préinscription Business Trip : ${valeurs.nom}`;
  const texte = champs.map(([c, l]) => `${l} : ${valeurs[c] || "-"}`).join("\n");
  const html = `<h2>${esc(sujet)}</h2><table cellpadding="6">${champs.map(([c, l]) => `<tr><td><strong>${esc(l)}</strong></td><td>${esc(valeurs[c] || "-").replace(/\n/g, "<br>")}</td></tr>`).join("")}</table>`;

  try {
    const transport = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT) || 465, secure: (Number(SMTP_PORT) || 465) === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
    await transport.sendMail({ from: MAIL_FROM || SMTP_USER, to: MAIL_TO, replyTo: valeurs.email, subject: sujet, text: texte, html, attachments });
    return Response.json({ ok: true });
  } catch (e) {
    console.error("Erreur d’envoi e-mail", e);
    return erreur("L’envoi a échoué. Réessayez dans un instant.", 502);
  }
}
