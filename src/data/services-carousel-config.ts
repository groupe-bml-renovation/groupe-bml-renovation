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
    description: 'Transformez votre maison de A à Z avec nos experts en rénovation complète.',
    pageId: 'maisons-villas',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    icon: 'Home',
    category: 'particuliers'
  },
  {
    id: 'appartements',
    title: 'Rénovation d\'Appartement',
    description: 'Aménagements et rénovations spécialisés pour petits espaces optimisés.',
    pageId: 'appartements',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
    icon: 'Building2',
    category: 'particuliers'
  },
  {
    id: 'salles-bain',
    title: 'Rénovation de Salle de Bain',
    description: 'Créez votre espace bien-être avec aménagements premium et modernité.',
    pageId: 'salles-de-bain',
    image: 'https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1920&q=80',
    icon: 'Droplets',
    category: 'particuliers'
  },
  {
    id: 'cuisines',
    title: 'Rénovation de Cuisine',
    description: 'Cuisines modernes, fonctionnelles et élégantes, conçues à votre image.',
    pageId: 'cuisines',
    image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80',
    icon: 'UtensilsCrossed',
    category: 'particuliers'
  },
  {
    id: 'piscine',
    title: 'Rénovation Piscine',
    description: 'Rénovation et aménagement de piscine pour votre espace détente.',
    pageId: 'piscine',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80',
    icon: 'Waves',
    category: 'particuliers'
  },
  {
    id: 'menuiserie',
    title: 'Menuiserie et Portes',
    description: 'Portes, fenêtres et aménagements sur mesure pour votre habitat.',
    pageId: 'menuiserie',
    image: 'https://images.unsplash.com/photo-1697538022268-c565529e616f?w=800&q=80',
    icon: 'Hammer',
    category: 'particuliers'
  },
  {
    id: 'peinture',
    title: 'Peinture & Décoration',
    description: 'Services de peinture professionnelle pour donner vie à vos intérieurs.',
    pageId: 'peinture',
    image: 'https://images.unsplash.com/photo-1634822929331-ee4dc2c97fc4?w=1600&q=80',
    icon: 'Palette',
    category: 'particuliers'
  },
  {
    id: 'plomberie',
    title: 'Plomberie & Sanitaires',
    description: 'Solutions de plomberie modernes et durables pour votre confort.',
    pageId: 'plomberie',
    image: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi%20(1).jpg',
    icon: 'Wrench',
    category: 'particuliers'
  },
  {
    id: 'revetements-sols',
    title: 'Revêtements & Sols',
    description: 'Parquets, carrelages et sols souples pour vos espaces intérieurs.',
    pageId: 'revetements-sols',
    image: 'https://images.unsplash.com/photo-1722603931789-aea8bd4f5d01?w=1600&q=80',
    icon: 'SquareStack',
    category: 'particuliers'
  },
  {
    id: 'boutiques-bureaux',
    title: 'Rénovation bureaux',
    description: 'Aménagements commerciaux modernes et fonctionnels pour votre espace.',
    pageId: 'boutiques-bureaux',
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&q=80',
    icon: 'ShoppingCart',
    category: 'professionnels'
  },
  {
    id: 'renovation-boutiques',
    title: 'Rénovation boutiques',
    description: 'Transformation complète de vos espaces commerciaux pour attirer la clientèle.',
    pageId: 'boutiques-bureaux',
    image: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/blake-wisz.jpg',
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
    image: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/photo-1603872921216-b500ee404467.jpeg',
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
