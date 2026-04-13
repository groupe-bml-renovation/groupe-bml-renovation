/**
 * GEO (Generative Engine Optimization) Schema Library
 * Provides structured data for specific renovation services.
 */

export const generatePaintingHowToSchema = (isGrenoble: boolean) => {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": isGrenoble ? "Comment se déroule une rénovation peinture à Grenoble" : "Comment se déroule une rénovation peinture",
    "description": "Les étapes clés pour une rénovation de peinture réussie avec Groupe BML Rénovation.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Diagnostic et préparation des supports",
        "text": "Analyse de l'état des murs, rebouchage des fissures, ponçage et lessivage pour une adhérence parfaite.",
        "url": isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/peinture" : "https://groupe-bml-renovation.fr/peinture"
      },
      {
        "@type": "HowToStep",
        "name": "Protection du chantier",
        "text": "Protection minutieuse des sols, meubles et menuiseries pour un chantier propre.",
        "url": isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/peinture" : "https://groupe-bml-renovation.fr/peinture"
      },
      {
        "@type": "HowToStep",
        "name": "Application du primaire",
        "text": "Pose d'une sous-couche adaptée au support pour fixer les fonds et optimiser le rendu finale.",
        "url": isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/peinture" : "https://groupe-bml-renovation.fr/peinture"
      },
      {
        "@type": "HowToStep",
        "name": "Finitions peinture",
        "text": "Application de deux couches de peinture de finition (mate, satinée ou veloutée) de haute qualité.",
        "url": isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/peinture" : "https://groupe-bml-renovation.fr/peinture"
      }
    ],
    "totalTime": "P3D",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "30-60 per m2"
    }
  };
};

export const generateServiceFAQSchema = (faqs: { q: string, a: string }[]) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };
};
