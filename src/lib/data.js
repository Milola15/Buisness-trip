export const destinations = [
  {
    slug: "chine",
    nom: "Chine",
    alt: "Vue de la Chine",
    resume: "Commerce, marchés et fournisseurs",
    titre: "La Chine, au cœur des opportunités commerciales.",
    description:
      "Business Trips en Chine : découverte des marchés, rencontres avec des fournisseurs et accompagnement sur place, en format multisectoriel ou spécialisé.",
    texte: "Deux formats complémentaires, tous deux accessibles selon votre profil et vos objectifs.",
    formats: [
      { nom: "Multisectoriel", tag: "Offre à la une", texte: "Découvrez plusieurs univers commerciaux : mode, beauté, décoration, équipements et autres secteurs selon le programme." },
      { nom: "Spécialisé", tag: "Accompagnement ciblé", texte: "Vous avez une activité ou un secteur précis ? Faites-nous part de vos besoins pour étudier des visites et rencontres ciblées." },
    ],
    tags: [],
    secteurs: "Mode, beauté, accessoires, décoration, équipements et machines.",
  },
  {
    slug: "turquie",
    nom: "Turquie",
    alt: "Vue de la Turquie",
    resume: "Mode, textile, construction et intérieur",
    titre: "Un carrefour d’opportunités pour vos ambitions.",
    description:
      "Business Trips en Turquie : mode, textile, construction et aménagement intérieur, avec un programme ciblé ou multisectoriel.",
    texte: "Mode, textile, construction et aménagement intérieur : le programme peut être ciblé ou combiner plusieurs secteurs selon les préinscriptions et la cohérence des visites.",
    formats: [],
    tags: ["Mode et textile", "Construction et aménagement"],
    secteurs: "Textile, prêt-à-porter, matériaux, construction et aménagement intérieur.",
  },
  {
    slug: "dubai",
    nom: "Dubaï",
    alt: "Vue de Dubaï",
    resume: "Networking, création et investissement",
    titre: "Là où les idées rencontrent les opportunités.",
    description:
      "Business Trip à Dubaï : rencontres professionnelles, écosystème entrepreneurial, création d’entreprise, implantation et pistes d’investissement.",
    texte: "Un séjour équilibré entre rencontres professionnelles, découverte de l’écosystème entrepreneurial, création d’entreprise, implantation et exploration de pistes d’investissement. Les interventions spécialisées sont soumises à confirmation.",
    formats: [],
    tags: ["Networking", "Découverte entrepreneuriale", "Implantation", "Investissement"],
    secteurs: "Commerce, distribution et approvisionnements selon votre projet.",
  },
];

export const experiences = [
  { titre: "Découverte de marchés", texte: "Visites de pôles commerciaux et immersion dans les secteurs d’intérêt." },
  { titre: "Rencontres professionnelles", texte: "Échanges avec des fournisseurs, entreprises ou intervenants selon le programme confirmé." },
  { titre: "Accompagnement sur place", texte: "Coordination et accompagnement des activités professionnelles prévues." },
  { titre: "Programme adapté", texte: "Les villes et les activités dépendent des besoins recueillis et des possibilités d’organisation." },
];

export const etapesTrip = [
  { titre: "Préinscription gratuite", texte: "Indiquez la destination et vos centres d’intérêt, même sans projet précis." },
  { titre: "Étude de votre demande", texte: "Nous recueillons les attentes et étudions un programme cohérent." },
  { titre: "Proposition détaillée", texte: "Recevez les dates, le programme et le tarif avant de décider." },
  { titre: "Confirmation", texte: "Votre réservation est validée selon les conditions communiquées." },
];

export const etapesSourcing = [
  { titre: "Présentez votre projet", texte: "Produits, quantités, budget et photos de référence." },
  { titre: "Recevez notre réponse", texte: "Première réponse sous 48 à 72 heures ouvrées." },
  { titre: "Validez votre devis", texte: "Les recherches débutent après validation du dossier et paiement des honoraires fixes convenus." },
  { titre: "Suivez votre sourcing", texte: "Recherche standard sous 10 à 20 jours ouvrés, puis accompagnement selon la formule choisie." },
];

export const offres = [
  {
    id: "Essentiel",
    nom: "Sourcing Essentiel",
    accroche: "Nous recherchons, vous achetez.",
    texte: [
      "Analyse de votre demande, recherche pour une catégorie de produits, présélection de trois fournisseurs maximum, comparaison des propositions et transmission d’une synthèse avec leurs coordonnées après règlement des honoraires convenus.",
      "Vous effectuez directement vos achats et organisez votre transport.",
    ],
    note: "Budget de marchandises à partir de 1 000 €. Honoraires communiqués sur devis.",
  },
  {
    id: "Intégral",
    nom: "Sourcing Intégral",
    accroche: "Un interlocuteur unique pour coordonner vos achats.",
    texte: [
      "Recherche et négociation avec les fournisseurs, coordination des commandes validées, suivi des échanges et préparation de l’expédition, avec des correspondants locaux lorsque nécessaire.",
      "Les achats peuvent être organisés au nom et pour le compte du client selon un mandat et des modalités de paiement juridiquement validés.",
    ],
    note: "Budget de marchandises à partir de 1 500 €. Honoraires et commission communiqués sur devis.",
  },
];