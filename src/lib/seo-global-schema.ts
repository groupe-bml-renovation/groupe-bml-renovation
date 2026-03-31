export const generateGlobalSeoSchemas = () => {
  const socialLinks = [
    'https://www.facebook.com/profile.php?id=61583239311358',
    'https://x.com/BML_Renovation',
    'https://www.instagram.com/groupe_bml_renovation_tce/',
    'https://www.linkedin.com/in/groupe-bml-r%C3%A9novation-tout-corps-d-%C3%A9tat-86aa693b1/',
    'https://www.youtube.com/@GroupeBMLR%C3%A9novation',
    'https://fr.pinterest.com/38000bml/',
    'https://www.tiktok.com/@groupe_bml_renovation'
  ];

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://groupe-bml-renovation.fr/#organization',
    name: 'Groupe BML Rénovation',
    alternateName: 'BML Rénovation',
    url: 'https://groupe-bml-renovation.fr',
    logo: {
      '@type': 'ImageObject',
      url: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo.png',
      width: '512',
      height: '512'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33756915997',
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: 'French'
    },
    sameAs: socialLinks,
    foundingDate: '2014',
    description: 'Entreprise de rénovation haut de gamme opérant à Grenoble et dans toute la France. Spécialiste de la rénovation de maisons et appartements clés en main.',
    knowsAbout: [
      'Rénovation immobilière',
      'Architecture d\'intérieur',
      'Maîtrise d\'œuvre',
      'Rénovation énergétique',
      'Design d\'espace'
    ]
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://groupe-bml-renovation.fr/#localbusiness',
    name: 'Groupe BML Rénovation',
    description: 'Expert en rénovation complète d’appartements et de maisons depuis plus de 10 ans. Travaux de rénovation clé en main avec interlocuteur unique, artisans qualifiés RGE et garantie décennale.',
    url: 'https://groupe-bml-renovation.fr',
    telephone: '+33756915997',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5 Av. Paul Verlaine',
      addressLocality: 'Grenoble',
      postalCode: '38100',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.1607,
      longitude: 5.7031
    },
    image: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo.png',
    priceRange: '€€€',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday'
        ],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    brand: {
      '@id': 'https://groupe-bml-renovation.fr/#organization'
    },
    hasCertification: [
      'Qualibat RGE',
      'Garantie Décennale'
    ]
  };

  const serviceCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rénovation de Maison et Appartement Clé en Main',
    provider: {
      '@id': 'https://groupe-bml-renovation.fr/#organization'
    },
    areaServed: {
      '@type': 'Country',
      name: 'France'
    },
    description: 'Solutions de rénovation globale : conception, pilotage de chantier et réalisation tous corps d\'état.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catalogue de Rénovation Haut de Gamme',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Rénovation Résidentielle',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rénovation Complète Maison',
                description: 'Transformation intégrale de villas et maisons anciennes.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rénovation Appartement',
                description: 'Rénovation d\'appartements haussmanniens et contemporains.'
              }
            }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Rénovation Spécialisée',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rénovation de Salle de Bain',
                description: 'Création d\'espaces bien-être et douches à l\'italienne.'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rénovation de Cuisine',
                description: 'Conception et pose de cuisines sur mesure.'
              }
            }
          ]
        }
      ]
    }
  };

  return {
    organizationSchema,
    localBusinessSchema,
    serviceCatalogSchema
  };
};

