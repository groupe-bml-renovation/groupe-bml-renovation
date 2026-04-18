export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  budget: string;
  duration: string;
  description: string;
  route?: string;
}

export const featuredProjects: Project[] = [
  {
    id: 13,
    title: "Rénovation bureau complet avec WC et salle de bain",
    category: "Rénovation Complète",
    image: "/assets/remote/be19994d3f2be82d4404c909bd97f058.png",
    budget: "62 000€",
    duration: "4 mois",
    description: "Rénovation complète de bureau professionnel avec aménagement de WC et salle de bain, revêtements haut de gamme, éclairage LED intégré et aménagements ergonomiques pour un espace de travail moderne.",
    route: "/projet-renovation-bureau"
  },
  {
    id: 11,
    title: "Salle de bain PMR",
    category: "Salle de Bain",
    image: "/assets/remote/068ca7999c6e3ce53606da94c02f0575.png",
    budget: "13 000€",
    duration: "1 mois",
    description: "Rénovation salle de bain PMR (Personnes à Mobilité Réduite) avec aménagements accessibles, douche sécurisée, sanitaires adaptés et normes de conformité respectées.",
    route: "/projet-salle-bain-pmr"
  },
  {
    id: 16,
    title: "Façade de maison",
    category: "Rénovation Façade",
    image: "/assets/remote/6066d403820afb31e6aee989adfebbc4.png",
    budget: "3 500€",
    duration: "1 semaine",
    description: "Rénovation complète de façade avec ravalement, nettoyage haute pression, jointoiement, peinture premium et finitions de qualité pour une maison comme neuve.",
    route: "/projet-facade-maison"
  },
  {
    id: 12,
    title: "Rénovation séjour",
    category: "Rénovation Intérieure",
    image: "/assets/remote/10db985a7efa1e15cf326e74d5a171ed.png",
    budget: "42 000€",
    duration: "2 mois et demi",
    description: "Rénovation complète du séjour avec reconfiguration d'espace, revêtements modernes, éclairage LED intégré et aménagement fonctionnel pour un intérieur haut de gamme.",
    route: "/projet-renovation-sejour"
  },
  {
    id: 1,
    title: "Rénovation Maison Complète",
    category: "Rénovation Complète",
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod%20(2).jpg",
    budget: "68 000€",
    duration: "3 mois",
    description: "Rénovation complète incluant ouverture cuisine-salon, suite parentale, 2 salles de bain, installation domotique et isolation thermique renforcée."
  },
  {
    id: 2,
    title: "Rénovation Cuisine",
    category: "Rénovation Cuisine",
    image: "/assets/remote/a86eb69490834e9fc9e90bacee5a818d.jpg",
    budget: "18 500€",
    duration: "6 semaines",
    description: "Cuisine moderne avec îlot central, électroménager encastré, plan de travail quartz et éclairage LED intégré pour une cuisine haut de gamme."
  },
  {
    id: 3,
    title: "Rénovation Salle de Bain",
    category: "Salle de Bain",
    image: "/assets/remote/a413e46ed51f75c4d67214145dc613db.jpg",
    budget: "16 800€",
    duration: "3 semaines",
    description: "Salle de bain rénovée avec douche à l'italienne XXL, baignoire îlot design, carrelage grand format et chauffage au sol pour une expérience spa."
  },
  {
    id: 4,
    title: "Rénovation Électrique Maison",
    category: "Électricité",
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-09-30_at_22.00.36_g9akl6%20(1).jpg",
    budget: "7 300€",
    duration: "2 semaines",
    description: "Installation électrique complète avec mise aux normes NF, borne de recharge électrique et système d'éclairage LED moderne et certifié Consuel."
  },
  {
    id: 5,
    title: "Rénovation énergétique appartement T5",
    category: "Isolation et Chauffage",
    image: "/assets/remote/89df86769b6c800c14093ed74c0bc067.jpg",
    budget: "36 000€",
    duration: "5 semaines",
    description: "Rénovation énergétique avec isolation des murs, combles et extérieur, matériaux écologiques pour réaliser des économies d'énergie significatives."
  },
  {
    id: 6,
    title: "Aménagement piscine et terrasse bois",
    category: "Aménagement Extérieur",
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/a4a23d2a-e60e-48a4-aceb-a8996afb580c_htgckp%20(1).jpg",
    budget: "41 800€",
    duration: "10 semaines",
    description: "Piscine 8x4m chauffée avec terrasse bois exotique, pool house équipé, éclairage LED immergé et aménagement paysager harmonieux."
  },
  {
    id: 7,
    title: "Rénovation Terrasse Extérieure",
    category: "Verrière et Verre",
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-13_at_12.53.51_1_mpbczz%20(1).jpg",
    budget: "18 500€",
    duration: "15 jours",
    description: "Verrières et parois vitrées pour créer de la luminosité, portes coulissantes verre et garde-corps pour moderniser les espaces intérieurs."
  },
  {
    id: 9,
    title: "Rénovation plomberie complète T4",
    category: "Plomberie",
    image: "https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-02_at_16.56.52_5_hxjyyi.jpg?updatedAt=1761309551624",
    budget: "4 850€",
    duration: "3 semaines",
    description: "Réfection complète du réseau de plomberie avec remplacement des canalisations, sanitaires neufs et système anti-calcaire performant."
  },
  {
    id: 10,
    title: "Système Ventilation et Chauffage Maison",
    category: "Ventilation",
    image: "https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-10-02_at_16.52.32_zqjemo.jpg?updatedAt=1761332396884",
    budget: "1 200€",
    duration: "3 semaines",
    description: "Installation VMC double flux, pompe à chaleur et chauffage au sol pour un confort optimal et des économies d'énergie garanties."
  },
  {
    id: 15,
    title: "Rénovation salle de bain",
    category: "Salle de Bain",
    image: "/assets/remote/8c9c9d635db069f930a4c1a821e2c41b.png",
    budget: "7 900€",
    duration: "7 Jours",
    description: "Transformation complète d'une salle de bain avec modernisation, aménagement optimisé et finitions premium",
    route: "/projet-renovation-salle-de-bain"
  },
];

export const featuredProjects_sorted = [
  featuredProjects[3],
  featuredProjects[1],
  featuredProjects[0],
  featuredProjects[2],
  featuredProjects[13],
  ...featuredProjects.slice(4, 13),
  ...featuredProjects.slice(14)
];
