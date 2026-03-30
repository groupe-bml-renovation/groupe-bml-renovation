export const SITE_CONFIG = {
  domain: 'groupe-bml-renovation.fr',
  businessName: 'Groupe BML Rénovation',
  phone: '+33123456789',
  email: 'contact@groupe-bml-renovation.fr',
  address: {
    streetAddress: 'Adresse à définir',
    addressLocality: 'Paris',
    postalCode: '75000',
    addressCountry: 'FR'
  },
  socialMedia: {
    facebook: 'https://facebook.com/groupebml',
    instagram: 'https://instagram.com/groupebml',
    linkedin: 'https://linkedin.com/company/groupebml'
  },
  defaultImage: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Playfair%20Display-3%20copie%202.png'
};

export function getCanonicalUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `https://${SITE_CONFIG.domain}/${cleanPath}`;
}

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.businessName,
    url: `https://${SITE_CONFIG.domain}`,
    logo: SITE_CONFIG.defaultImage,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE_CONFIG.phone,
      contactType: 'customer service',
      areaServed: 'FR',
      availableLanguage: 'French'
    },
    sameAs: [
      SITE_CONFIG.socialMedia.facebook,
      SITE_CONFIG.socialMedia.instagram,
      SITE_CONFIG.socialMedia.linkedin
    ]
  };
}

export function getLocalBusinessSchema(additionalData?: {
  name?: string;
  description?: string;
  services?: Array<{ '@type': string; name: string; description: string }>;
  priceRange?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: additionalData?.name || SITE_CONFIG.businessName,
    description: additionalData?.description || 'Expert en rénovation et transformation de vos espaces',
    image: SITE_CONFIG.defaultImage,
    '@id': `https://${SITE_CONFIG.domain}`,
    url: `https://${SITE_CONFIG.domain}`,
    telephone: SITE_CONFIG.phone,
    priceRange: additionalData?.priceRange || '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.8566,
      longitude: 2.3522
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00'
      }
    ],
    ...(additionalData?.services && { service: additionalData.services })
  };
}

export function getServiceSchema(service: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: service.provider || SITE_CONFIG.businessName,
      url: `https://${SITE_CONFIG.domain}`
    },
    areaServed: {
      '@type': 'City',
      name: service.areaServed || 'Paris'
    },
    url: service.url,
    serviceType: service.serviceType || 'Rénovation'
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image || SITE_CONFIG.defaultImage,
    author: {
      '@type': 'Organization',
      name: article.author || SITE_CONFIG.businessName
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.businessName,
      logo: {
        '@type': 'ImageObject',
        url: SITE_CONFIG.defaultImage
      }
    },
    url: article.url,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    }
  };
}

export function getFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

export function getWebPageSchema(page: {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: page.url,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_CONFIG.businessName,
      url: `https://${SITE_CONFIG.domain}`
    }
  };

  if (page.breadcrumbs && page.breadcrumbs.length > 0) {
    schema.breadcrumb = getBreadcrumbSchema(page.breadcrumbs);
  }

  return schema;
}

export interface SEOMetaProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  keywords?: string;
}

export function getSEOMeta(props: SEOMetaProps) {
  const canonicalUrl = getCanonicalUrl(props.path);
  const ogImage = props.image || SITE_CONFIG.defaultImage;
  const fullTitle = `${props.title} | ${SITE_CONFIG.businessName}`;

  return {
    title: fullTitle,
    meta: [
      { name: 'description', content: props.description },
      { name: 'keywords', content: props.keywords || 'rénovation, transformation, aménagement' },

      { property: 'og:type', content: props.type || 'website' },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: props.description },
      { property: 'og:url', content: canonicalUrl },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: SITE_CONFIG.businessName },
      { property: 'og:locale', content: 'fr_FR' },

      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: props.description },
      { name: 'twitter:image', content: ogImage },

      ...(props.type === 'article' && props.publishedTime
        ? [{ property: 'article:published_time', content: props.publishedTime }]
        : []),
      ...(props.type === 'article' && props.modifiedTime
        ? [{ property: 'article:modified_time', content: props.modifiedTime }]
        : []),
      ...(props.type === 'article' && props.author
        ? [{ property: 'article:author', content: props.author }]
        : [])
    ],
    link: [
      { rel: 'canonical', href: canonicalUrl }
    ]
  };
}
