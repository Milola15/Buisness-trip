# N&K Global Business (Next.js)

1. `npm install`
2. Copier `.env.example` en `.env.local` et remplir les valeurs (SMTP pour les formulaires, URL du site).
3. `npm run dev`, puis `npm run build && npm start` pour la production.

Déploiement : Vercel (variables d’environnement dans le tableau de bord) ou un serveur Node/VPS (`output: "standalone"` activé).
Photo de la fondatrice : placer `eve-konan.jpg` dans `public/`.

Bouton WhatsApp : renseigner `NEXT_PUBLIC_WHATSAPP` (ex. 2250700000000) avant le build.
