export const generateGrenobleSeoSchemas = () => {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    '@id': 'https://groupe-bml-renovation.com/grenoble/#localbusiness',
    name: 'Groupe BML Rénovation tout corps d\'état',
    description: 'Expert en rénovation complète maison et appartement à Grenoble (38). Plus de 10 ans d\'expérience, 300+ chantiers réalisés en Isère. Interlocuteur unique, devis gratuit 24h, garantie décennale et certification RGE.',
    url: 'https://groupe-bml-renovation.com/grenoble',
    telephone: '+33756915997',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '5 Av. Paul Verlaine',
      addressLocality: 'Grenoble',
      addressRegion: 'Isère',
      postalCode: '38100',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.1607,
      longitude: 5.7031
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00'
      }
    ],
    serviceArea: [
      { '@type': 'City', name: 'Grenoble' },
      { '@type': 'City', name: 'Meylan' },
      { '@type': 'City', name: 'Corenc' },
      { '@type': 'City', name: 'Saint-Ismier' },
      { '@type': 'City', name: 'Montbonnot-Saint-Martin' },
      { '@type': 'City', name: 'La Tronche' },
      { '@type': 'City', name: 'Échirolles' },
      { '@type': 'City', name: 'Saint-Martin-d\'Hères' },
      { '@type': 'City', name: 'Seyssinet-Pariset' },
      { '@type': 'City', name: 'Sassenage' },
      { '@type': 'City', name: 'Voiron' }
    ],
    priceRange: '€€€',
    image: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo.png',
    sameAs: [
      'https://www.facebook.com/profile.php?id=61583239311358',
      'https://www.instagram.com/groupe_bml_renovation_tce/',
      'https://www.linkedin.com/in/groupe-bml-r%C3%A9novation-tout-corps-d-%C3%A9tat-86aa693b1/',
      'https://www.google.com/maps?cid=6757121703080060012'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },
    hasCertification: [
      'Qualibat RGE',
      'Garantie Décennale AXA'
    ]
  };

  const maisionServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rénovation Maison Grenoble & Isère',
    provider: {
      '@id': 'https://groupe-bml-renovation.com/grenoble/#localbusiness'
    },
    description: 'Rénovation globale de villas et maisons individuelles en Isère. Maîtrise d\'œuvre, extension, isolation RGE et aménagement intérieur haut de gamme.',
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Isère'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Rénovation Maison Isère',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rénovation Énergétique Maison',
            description: 'Isolation, menuiseries et chauffage aux normes RGE.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Extension et Surélévation',
            description: 'Agrandissement de surface habitable.'
          }
        }
      ]
    }
  };

  const appartementServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rénovation Appartement Grenoble',
    provider: {
      '@id': 'https://groupe-bml-renovation.com/grenoble/#localbusiness'
    },
    description: 'Rénovation d\'appartements anciens (Haussmannien) et contemporains à Grenoble. Optimisation d\'espace, cuisines et salles de bain clé en main.',
    areaServed: {
      '@type': 'City',
      name: 'Grenoble'
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Rénovation Appartement Grenoble',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rénovation Studio & T2',
            description: 'Solutions d\'aménagement pour petites surfaces.'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rénovation Luxe & Prestige',
            description: 'Finitions haut de gamme pour appartements de standing.'
          }
        }
      ]
    }
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Quel est le prix moyen au m2 pour une rénovation à Grenoble ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'À Grenoble, le prix d\'une rénovation complète varie de 800€/m² pour un rafraîchissement à plus de 2000€/m² pour une rénovation lourde avec restructuration. Groupe BML fournit un chiffrage précis sous 24h.'
        }
      },
      {
        '@type': 'Question',
        name: 'Pourquoi choisir Groupe BML pour ses travaux en Isère ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Groupe BML offre un interlocuteur unique, une garantie décennale sur tous les lots et une expertise de 10 ans avec plus de 300 avis positifs à Grenoble. Nous gérons tout, de la démolition aux finitions.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quels sont les délais pour un devis de rénovation à Grenoble ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nous intervenons pour une visite technique à Grenoble sous 24h à 48h. Votre devis détaillé et gratuit vous est envoyé dans les 3 à 5 jours suivant la visite.'
        }
      },
      {
        '@type': 'Question',
        name: 'L\'entreprise Groupe BML est-elle certifiée RGE à Grenoble ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, Groupe BML possède les certifications Qualibat RGE, vous permettant de bénéficier des aides de l\'État (MaPrimeRénov\') pour vos travaux de rénovation énergétique en Isère.'
        }
      }
    ]
  };

  return {
    localBusinessSchema,
    maisionServiceSchema,
    appartementServiceSchema,
    faqSchema
  };
};
