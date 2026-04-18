export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  pageId: string;
  image: string;
  icon: string;
  category: 'particuliers' | 'professionnels';
}

export const servicesCarouselConfig: ServiceItem[] = [
  {
    id: 'maisons-villas',
    title: 'Rénovation de Maison',
    description: '**Moderniser, réorganiser, transformer** : vous avez un projet de rénovation de maison ? Votre interlocuteur **Groupe BML Rénovation** prend le temps de vous écouter, vous conseille avec attention et constitue pour vous une équipe travaux sur mesure. Objectif : un chantier fluide, des artisans fiables, et un lieu de vie qui vous ressemble.',
    pageId: 'maisons-villas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    icon: 'Home',
    category: 'particuliers'
  },
  {
    id: 'appartements',
    title: 'Rénovation d\'Appartement',
    description: 'Une cuisine trop étroite, une chambre partagée entre ados, des pièces à réinventer ? Il est temps d\'oser la transformation. Votre expert **Groupe BML Rénovation** vous accompagne pour **rénover, réagencer ou remettre aux normes votre appartement**, en toute sérénité. À la clé : un lieu de vie lumineux, fonctionnel, adapté à votre quotidien.',
    pageId: 'appartements',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    icon: 'Building2',
    category: 'particuliers'
  },
  {
    id: 'salles-bain',
    title: 'Rénovation de Salle de Bain',
    description: 'Votre expert **Groupe BML Rénovation** vous aide à **imaginer un espace à la fois esthétique, fonctionnel et adapté à votre foyer**, même nombreux. En choisissant notre offre de service, vous bénéficiez d\'un suivi précis de votre projet jusqu\'à la réception des travaux et des finitions.',
    pageId: 'salles-de-bain',
    image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1920&q=80',
    icon: 'Droplets',
    category: 'particuliers'
  },
  {
    id: 'cuisines',
    title: 'Rénovation de Cuisine',
    description: 'Cœur battant de la maison, la cuisine mérite une attention particulière. Nous vous accompagnons pour **concevoir et réaliser une cuisine moderne et conviviale**. De l\'optimisation des rangements au choix des **matériaux durables**, nous créons un espace qui allie design et praticité pour vos moments de vie.',
    pageId: 'cuisines',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80',
    icon: 'UtensilsCrossed',
    category: 'particuliers'
  },
  {
    id: 'piscine',
    title: 'Rénovation Piscine',
    description: 'Grâce à nos services, vous allez pouvoir profiter de votre **piscine en toute simplicité**. De la réfection de l\'étanchéité à la modernisation des équipements, nous sommes à vos côtés pour que vous puissiez profiter rapidement de votre nouvel espace extérieur, parfaitement intégré à votre habitat.',
    pageId: 'piscine',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    icon: 'Waves',
    category: 'particuliers'
  },
  {
    id: 'menuiserie',
    title: 'Menuiserie et Portes',
    description: 'Une porte qui grince, des fenêtres mal isolées ou un besoin de rangements sur mesure ? Votre confort thermique et acoustique passe par une menuiserie de qualité. Nos experts vous guident dans le choix des **matériaux isolants (bois, PVC, aluminium)** et réalisent une pose soignée pour valoriser votre habitat.',
    pageId: 'menuiserie',
    image: 'https://images.unsplash.com/photo-1697538022268-c565529e616f?w=800&q=80',
    icon: 'Hammer',
    category: 'particuliers'
  },
  {
    id: 'peinture',
    title: 'Peinture & Décoration',
    description: 'Envie de changer d\'atmosphère ? La peinture est le moyen le plus efficace de transformer votre intérieur. Nous utilisons des **peintures premium, respectueuses de l\'environnement**, pour garantir un rendu impeccable, sans odeur et durable sur vos murs et plafonds.',
    pageId: 'peinture',
    image: 'https://images.unsplash.com/photo-1634822929331-ee4dc2c97fc4?w=1600&q=80',
    icon: 'Palette',
    category: 'particuliers'
  },
  {
    id: 'plomberie',
    title: 'Plomberie & Sanitaires',
    description: 'Indispensable au quotidien, votre installation de plomberie doit être irréprochable. De la création de réseaux neufs au remplacement de sanitaires, nos plombiers qualifiés assurent une **installation aux normes**, sécurisée et durable, pour votre confort.',
    pageId: 'plomberie',
    image: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi%20(1).jpg',
    icon: 'Wrench',
    category: 'particuliers'
  },
  {
    id: 'revetements-sols',
    title: 'Revêtements & Sols',
    description: 'Parquet massif, carrelage grand format ou sols souples techniques : le sol définit le style de vos pièces. Nous maîtrisons toutes les techniques de pose (collée, flottante, scellée) pour vous offrir un résultat à la fois **esthétique et résistant**.',
    pageId: 'revetements-sols',
    image: 'https://images.unsplash.com/photo-1722603931789-aea8bd4f5d01?w=1600&q=80',
    icon: 'SquareStack',
    category: 'particuliers'
  },
  {
    id: 'boutiques-bureaux',
    title: 'Rénovation bureaux',
    description: 'Le cadre de travail est un levier de performance majeur. Nous vous accompagnons pour **repenser vos bureaux : open-spaces, salles de réunion ou espaces détente**. De l\'acoustique à l\'éclairage, nous créons des environnements qui favorisent la productivité de vos équipes.',
    pageId: 'boutiques-bureaux',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&q=80',
    icon: 'ShoppingCart',
    category: 'professionnels'
  },
  {
    id: 'renovation-boutiques',
    title: 'Rénovation boutiques',
    description: 'Votre surface de vente est votre première vitrine. Nous réalisons la **transformation de vos boutiques et points de vente** pour optimiser le parcours client. Un accompagnement de la conception à la réalisation finale, avec un respect rigoureux de votre image de marque.',
    pageId: 'boutiques-bureaux',
    image: '/assets/remote/4c1d0534b09360c181e231e24c7b4210.jpg',
    icon: 'Store',
    category: 'professionnels'
  },
  {
    id: 'borne-electrique',
    title: 'Borne Électrique',
    description: 'Installation de bornes de recharge pour véhicules électriques.',
    pageId: 'borne-electrique',
    image: 'https://images.unsplash.com/photo-1600490819528-42405785433a?w=800&q=80',
    icon: 'Zap',
    category: 'particuliers'
  },
  {
    id: 'espace-verre',
    title: 'Espace Verre',
    description: 'Verrières et installations en verre pour bureaux et locaux commerciaux.',
    pageId: 'espace-verre',
    image: 'https://images.unsplash.com/photo-1672139664252-9e56a5c79ca6?w=1600&q=80',
    icon: 'Eye',
    category: 'particuliers'
  },
  {
    id: 'terrasse-bois',
    title: 'Terrasse Bois',
    description: 'Création et rénovation de terrasses en bois pour votre espace extérieur.',
    pageId: 'terrasse-bois',
    image: 'https://images.unsplash.com/photo-1760067537956-a206c6181f56?w=1600&q=80',
    icon: 'Trees',
    category: 'particuliers'
  },
  {
    id: 'revetements-muraux',
    title: 'Revêtements Muraux',
    description: 'Papiers peints, peintures et revêtements muraux modernes et durables.',
    pageId: 'revetements-muraux',
    image: 'https://images.unsplash.com/photo-1758548157276-00c54fd4a9fa?w=1600&q=80',
    icon: 'Layers',
    category: 'particuliers'
  },
  {
    id: 'climatisation',
    title: 'Climatisation',
    description: 'Systèmes de climatisation modernes pour votre confort optimal.',
    pageId: 'climatisation',
    image: '/assets/remote/2454a18ef5980d85fe1fed5f65baf47c.jpeg',
    icon: 'Wind',
    category: 'particuliers'
  },
  {
    id: 'chauffage',
    title: 'Chauffage',
    description: 'Solutions de chauffage efficaces et économiques pour votre habitation.',
    pageId: 'chauffage',
    image: 'https://images.unsplash.com/photo-1738168299283-4117c3dfb8ac?w=800&q=80',
    icon: 'Flame',
    category: 'particuliers'
  },
  {
    id: 'electricite',
    title: 'Électricité',
    description: 'Installations et rénovations électriques aux normes pour votre sécurité.',
    pageId: 'electricite',
    image: 'https://images.unsplash.com/photo-1660330589827-da8ab7dd3c02?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=3132',
    icon: 'Zap',
    category: 'particuliers'
  },
];

export const particuliersServices = servicesCarouselConfig.filter(s => s.category === 'particuliers');
export const professionnelsServices = servicesCarouselConfig.filter(s => s.category === 'professionnels');
