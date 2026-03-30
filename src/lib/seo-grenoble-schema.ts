export const generateGrenobleSeoSchemas = () => {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Groupe BML Rénovation',
    description: 'Rénovation maison et appartement à Grenoble en Isère - 300+ projets réalisés, 10 ans d\'expérience. Devis gratuit, disponibilité sous 24h. Expert rénovation clé en main pour particuliers et petits commerces.',
    url: 'https://groupe-bml-renovation.fr',
    telephone: '+33438526787',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Grenoble',
      addressLocality: 'Grenoble',
      addressRegion: 'Isère',
      postalCode: '38000',
      addressCountry: 'FR'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 45.1885,
      longitude: 5.7245
    },
    serviceArea: [
      {
        '@type': 'City',
        name: 'Grenoble',
        areaServed: {
          '@type': 'State',
          name: 'Isère'
        }
      },
      {
        '@type': 'State',
        name: 'Isère'
      }
    ],
    areaServed: [
      {
        '@type': 'Place',
        name: 'Grenoble',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.1885,
          longitude: 5.7245
        }
      },
      {
        '@type': 'Place',
        name: 'Échirolles',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.1667,
          longitude: 5.7333
        }
      },
      {
        '@type': 'Place',
        name: 'Meylan',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.2167,
          longitude: 5.7667
        }
      },
      {
        '@type': 'Place',
        name: 'Fontaine',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.1917,
          longitude: 5.6750
        }
      },
      {
        '@type': 'Place',
        name: 'Saint-Martin-d\'Hères',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.1500,
          longitude: 5.7667
        }
      },
      {
        '@type': 'Place',
        name: 'Voiron',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 45.3667,
          longitude: 5.5833
        }
      }
    ],
    priceRange: '$$',
    image: 'https://groupe-bml-renovation.fr/logo.png',
    sameAs: [
      'https://www.google.com/maps/place/Grenoble',
      'https://www.facebook.com/groupebml'
    ],
    knowsAbout: [
      'Rénovation maison à Grenoble',
      'Rénovation appartement à Grenoble',
      'Travaux rénovation en Isère',
      'Rénovation clé en main Grenoble',
      'Rénovation intérieure Isère',
      'Rénovation extérieure Grenoble'
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: 4.8,
      ratingCount: 127,
      bestRating: 5,
      worstRating: 1
    }
  };

  const maisionServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rénovation Maison à Grenoble et Isère',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Groupe BML Rénovation',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Grenoble',
        addressRegion: 'Isère',
        addressCountry: 'FR'
      }
    },
    description: 'Rénovation maison clé en main à Grenoble et en Isère - Entreprise spécialisée en rénovation complète maison, rénovation intérieure et extérieure, extensions, surélévations. Devis gratuit pour tous les projets de rénovation en Isère.',
    areaServed: [
      { '@type': 'City', name: 'Grenoble' },
      { '@type': 'City', name: 'Échirolles' },
      { '@type': 'City', name: 'Meylan' },
      { '@type': 'City', name: 'Fontaine' },
      { '@type': 'City', name: 'Saint-Martin-d\'Hères' },
      { '@type': 'City', name: 'Voiron' },
      { '@type': 'State', name: 'Isère' }
    ],
    serviceType: 'Rénovation',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de Rénovation Maison à Grenoble',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rénovation Complète Maison'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rénovation Clé en Main'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Travaux Intérieur Extérieur'
          }
        }
      ]
    }
  };

  const appartementServiceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Rénovation Appartement à Grenoble et Isère',
    provider: {
      '@type': 'LocalBusiness',
      name: 'Groupe BML Rénovation',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Grenoble',
        addressRegion: 'Isère',
        addressCountry: 'FR'
      }
    },
    description: 'Rénovation appartement clé en main à Grenoble et en Isère - Entreprise spécialisée rénovation appartement, rénovation intérieure, travaux sans déménagement. Devis gratuit et rapide pour tous vos projets de rénovation en Isère.',
    areaServed: [
      { '@type': 'City', name: 'Grenoble' },
      { '@type': 'City', name: 'Échirolles' },
      { '@type': 'City', name: 'Meylan' },
      { '@type': 'City', name: 'Fontaine' },
      { '@type': 'City', name: 'Saint-Martin-d\'Hères' },
      { '@type': 'City', name: 'Voiron' },
      { '@type': 'State', name: 'Isère' }
    ],
    serviceType: 'Rénovation',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services de Rénovation Appartement à Grenoble',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rénovation Appartement Clé en Main'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Rénovation sans Déménagement'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Travaux Rénovation Intérieure'
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
        name: 'Combien coûte une rénovation maison à Grenoble en Isère ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Le coût de rénovation maison à Grenoble varie selon l\'envergure des travaux, les finitions et la surface. Groupe BML Rénovation offre un devis gratuit et détaillé pour votre projet spécifique à Grenoble et en Isère.'
        }
      },
      {
        '@type': 'Question',
        name: 'Quelle est la meilleure entreprise rénovation à Grenoble ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Groupe BML Rénovation propose des services de qualité avec 300+ projets réalisés et 10 ans d\'expérience à Grenoble et en Isère. Devis gratuit sous 24h pour comparer nos tarifs compétitifs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Combien de temps pour rénover un appartement à Grenoble en Isère ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'La durée dépend du scope de rénovation. Un planning détaillé est établi lors du devis. Notre équipe à Grenoble respecte les délais convenus et assure un suivi régulier pour tous projets en Isère.'
        }
      },
      {
        '@type': 'Question',
        name: 'Rénovation appartement occupé à Grenoble : est-ce possible ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Oui, les rénovations d\'appartements occupés sont courantes à Grenoble. Nous organisons le chantier par phases pour minimiser les nuisances et maintenir le confort résidentiel pour nos clients en Isère.'
        }
      },
      {
        '@type': 'Question',
        name: 'Entreprise rénovation Grenoble Isère : rénovation clé en main, qu\'est-ce que c\'est ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Rénovation clé en main signifie que Groupe BML Rénovation gère tout : études, démarches, travaux, suivi, finition pour votre maison ou appartement à Grenoble. Vous avez un interlocuteur unique du début à la fin.'
        }
      },
      {
        '@type': 'Question',
        name: 'Interventions dans quelles communes en Isère ?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Groupe BML Rénovation intervient notamment à Grenoble, Échirolles, Meylan, Fontaine, Saint-Martin-d\'Hères et Voiron. Nous couvrons également l\'ensemble de l\'Isère. Contactez-nous pour connaître la disponibilité dans votre commune.'
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
