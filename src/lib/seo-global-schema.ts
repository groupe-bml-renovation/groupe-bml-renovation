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
    name: 'Groupe BML Rénovation',
    alternateName: 'BML Rénovation',
    url: 'https://groupe-bml-renovation.fr',
    logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+33756915997',
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: 'French'
    },
    sameAs: socialLinks
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Groupe BML Rénovation',
    description: 'Expert en rénovation complète d’appartements et de maisons depuis 10 ans. Travaux de rénovation clé en main, intérieure et extérieure partout en France.',
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
    priceRange: '$$$',
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
      reviewCount: '127'
    }
  };

  const serviceCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Services de Rénovation Complète',
    provider: {
      '@id': 'https://groupe-bml-renovation.fr/#organization'
    },
    areaServed: {
      '@type': 'Country',
      name: 'France'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catalogue de Rénovation',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Rénovation Résidentielle',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rénovation Maison'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Rénovation Appartement'
              }
            }
          ]
        },
        {
          '@type': 'OfferCatalog',
          name: 'Rénovation Technique',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Plomberie & Chauffage'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Électricité'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Peinture & Revêtements'
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
