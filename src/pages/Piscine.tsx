import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface PiscineProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const imageSetRef = useRef<HTMLDivElement>(null);

  const images = [
    'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80',
    'https://images.unsplash.com/photo-1675657144285-7daf131132de?w=1200&q=80',
    'https://images.unsplash.com/photo-1642371594014-b82c20ba4f50?w=1200&q=80',
    'https://images.unsplash.com/photo-1602774895754-2772f8a08f6b?w=1200&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80'
  ];

  React.useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const scrollLeft = container.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollLeft >= maxScroll - 100) {
        container.scrollLeft = images.length * 320;
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [images.length]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const maxScroll = scrollWidth - clientWidth;

      if (container.scrollLeft + 400 >= maxScroll - 100) {
        container.scrollLeft = images.length * 320;
        setTimeout(() => {
          container.scrollBy({ left: 400, behavior: 'smooth' });
        }, 50);
      } else {
        container.scrollBy({ left: 400, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center group">
      <button
        onClick={scrollLeft}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 hover:bg-white transition-all duration-300 shadow-lg"
        aria-label="Précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-800 hover:bg-white transition-all duration-300 shadow-lg"
        aria-label="Suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="relative z-10 w-full flex items-center justify-center py-0">
        <div
          ref={scrollContainerRef}
          className="scroll-container w-full max-w-6xl overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'smooth' }}
        >
          <div
            className="infinite-scroll flex gap-6 w-max"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            <div className="flex gap-6 animate-scroll">
              {images.map((img, index) => (
                <div key={`set1-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <OptimizedImage
                    src={img}
                    alt={`Travaux de rénovation maison - Rénovation ${index + 1} par entreprise de rénovation`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll" aria-hidden="true">
              {images.map((img, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <OptimizedImage
                    src={img}
                    alt={`Travaux de rénovation maison - Rénovation ${index + 1} par artisan rénovation`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Piscine: React.FC<PiscineProps> = ({ onBack, onNavigate }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    onBack();
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateToServices = () => {
    onBack();
  };

  const seoData = isGrenoble ? {
    title: 'Rénovation Piscine Grenoble | Entreprise Piscine Isère | Construction & Rénovation',
    description: 'Construction et rénovation de piscines à Grenoble et en Isère. Entreprise spécialisée en piscines sur mesure : enterrées, semi-enterrées, coque polyester. Devis gratuit.',
    keywords: 'rénovation piscine grenoble, construction piscine grenoble, piscine isère, piscine enterrée grenoble, piscine coque grenoble, devis piscine grenoble, entreprise piscine grenoble, bassin sur mesure grenoble',
    ogTitle: 'Rénovation Piscine Grenoble | Entreprise Spécialisée Piscines',
    ogDescription: 'Construction et rénovation de piscines sur mesure à Grenoble. Piscines enterrées, semi-enterrées, coques polyester. Accédez à nos solutions complètes.',
    canonicalUrl: 'https://groupe-bml-renovation.fr/grenoble/piscine',
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Groupe BML Rénovation - Construction & Rénovation Piscines",
      "description": "Entreprise spécialisée en construction et rénovation de piscines sur mesure à Grenoble et en Isère",
      "url": "https://groupe-bml-renovation.fr/grenoble/piscine",
      "telephone": "+33456789012",
      "areaServed": {
        "@type": "Place",
        "name": "Grenoble, Isère, France"
      },
      "priceRange": "$$",
      "service": [
        {
          "@type": "Service",
          "name": "Construction Piscines Grenoble",
          "description": "Construction de piscines enterrées, semi-enterrées et coques polyester à Grenoble"
        },
        {
          "@type": "Service",
          "name": "Rénovation Piscines Isère",
          "description": "Rénovation complète et modernisation de piscines existantes en Isère"
        }
      ]
    },
    h1: 'Rénovation & Construction Piscines Grenoble',
    h1Subtitle: 'Créez votre espace aquatique de détente à Grenoble'
  } : {
    title: 'Rénovation Maison - Piscines & Travaux Entreprise Bâtiment BML',
    description: 'Rénovation maison complète : piscines, travaux de rénovation, artisan rénovation bâtiment. Entreprise de rénovation spécialisée en travaux maison, rénovation intérieure et extérieure. Devis gratuit.',
    keywords: 'rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation',
    ogTitle: 'Rénovation Maison - Piscines & Travaux Entreprise Bâtiment',
    ogDescription: 'Entreprise de rénovation maison : travaux complets, rénovation intérieure et extérieure, artisan professionnel. Travaux maison de qualité avec garantie. Devis gratuit.',
    canonicalUrl: 'https://groupe-bml-renovation.fr/piscine',
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Groupe BML Rénovation - Entreprise de Rénovation Maison",
      "description": "Entreprise de rénovation maison complète spécialisée en travaux de rénovation, artisan rénovation, rénovation intérieure et extérieure",
      "url": "https://groupebml.fr",
      "telephone": "+33456789012",
      "areaServed": {
        "@type": "Place",
        "name": "Grenoble, France"
      },
      "priceRange": "$$",
      "service": [
        {
          "@type": "Service",
          "name": "Rénovation Maison Complète",
          "description": "Travaux de rénovation maison complets avec artisan rénovation professionnel"
        },
        {
          "@type": "Service",
          "name": "Travaux de Rénovation",
          "description": "Travaux maison et travaux de rénovation par entreprise bâtiment rénovation"
        },
        {
          "@type": "Service",
          "name": "Rénovation Intérieure et Extérieure",
          "description": "Rénovation intérieure et rénovation extérieure pour maison ancienne"
        },
        {
          "@type": "Service",
          "name": "Travaux de Peinture Bâtiment",
          "description": "Peintre en bâtiment et peintre dans le bâtiment professionnel"
        }
      ]
    },
    h1: 'Rénovation maison\n& travaux de rénovation',
    h1Subtitle: 'Créez votre espace de détente et de bien-être'
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={seoData.canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="French" />
        <meta name="author" content="Groupe BML Rénovation" />
        <script type="application/ld+json">
          {JSON.stringify(seoData.schema)}
        </script>
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1613977257365-aaae5a9817ff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=987"
            alt="Rénovation maison - Travaux de rénovation complète par entreprise de rénovation spécialisée"
            className="w-full h-full"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide">
              {isGrenoble ? 'Rénovation & Construction\nPiscines Grenoble' : 'Rénovation maison\n& travaux de rénovation'}
            </h1>
            <span className="sr-only">{isGrenoble ? 'Construction et rénovation de piscines sur mesure à Grenoble et en Isère. Piscines enterrées, semi-enterrées, coques polyester.' : 'Entreprise de rénovation maison complète, artisan rénovation spécialisé en travaux de rénovation maison, rénovation intérieure et extérieure'}</span>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Créez votre espace aquatique à Grenoble' : 'Créez votre espace de détente et de bien-être'}
            </p>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="pt-8 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-3">
                PISCINES
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                {isGrenoble ? (
                  <>
                    <span className="text-[#38bdf8] font-normal">Construction & Rénovation</span>{' '}
                    <span className="text-slate-900">Piscines</span><br />
                    <span className="text-slate-900">à Grenoble & Isère.</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#38bdf8] font-normal">Rénovation maison</span>{' '}
                    <span className="text-slate-900">& travaux</span><br />
                    <span className="text-slate-900">de rénovation complète.</span>
                  </>
                )}
              </h2>
              <span className="sr-only">{isGrenoble ? 'Construction et rénovation de piscines enterrées, semi-enterrées et coques polyester à Grenoble et en Isère' : 'Rénover une maison avec artisan rénovation professionnel spécialisé en travaux de rénovation maison ancienne et rénovation intérieure extérieure'}</span>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                {isGrenoble ? 'Transformez votre jardin à Grenoble en un véritable havre de paix avec une piscine sur mesure, alliant esthétique, qualité et durabilité pour des moments de détente inoubliables en famille.' : 'Transformez votre jardin en un véritable havre de paix avec une piscine sur mesure, alliant esthétique, qualité et durabilité pour des moments de détente inoubliables.'}
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous accompagne dans tous vos <strong>projets
                de construction et de rénovation de piscines</strong> {isGrenoble ? 'à Grenoble et en Isère' : ''}. Notre équipe <strong>vous conseille et vous
                accompagne</strong> dans la conception et la réalisation de votre espace aquatique.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                {isGrenoble ? 'Que vous souhaitiez construire une piscine enterrée, semi-enterrée ou hors-sol à Grenoble, rénover une piscine existante, installer un système de filtration moderne ou créer un espace piscine complet avec terrasse, nos experts en Isère mettent leur savoir-faire à votre service pour réaliser un projet de qualité qui valorise votre propriété et améliore votre qualité de vie.' : 'Que vous souhaitiez construire une piscine enterrée, semi-enterrée ou hors-sol, rénover une piscine existante, installer un système de filtration moderne ou créer un espace piscine complet avec terrasse, nos experts mettent leur savoir-faire à votre service pour réaliser un projet de qualité qui valorise votre propriété et améliore votre qualité de vie.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1673147056688-4df20283643b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=988"
                alt="Entreprise de rénovation maison - Travaux de rénovation maison complète et rénovation maison ancienne"
                className="w-full h-[450px] object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <ImageCarousel />
        </div>
      </section>

      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
            <div className="bg-[#f5f5f5] p-8">
              <span className="inline-block text-[#38bdf8] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                PISCINES SUR MESURE
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                {isGrenoble ? 'Entreprise spécialisée\nPiscines Grenoble' : 'Entreprise de\nrénovation maison'}
              </h2>
              <span className="sr-only">{isGrenoble ? 'Construction et rénovation de piscines sur mesure à Grenoble et en Isère avec garantie décennale' : 'Travaux de rénovation maison complète et rénovation maison ancienne avec coût et prix compétitifs'}</span>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                {isGrenoble ? 'Groupe BML Rénovation tout corps d\'état conçoit et réalise des projets de piscines sur mesure à Grenoble et en Isère. De l\'étude de conception au terrassement, de la construction à l\'aménagement, nos équipes vous accompagnent tout au long de votre projet personnalisé pour créer un espace piscine unique et durable.' : 'Groupe BML Rénovation tout corps d\'état conçoit et réalise des projets de piscines sur mesure. De l\'étude de conception au terrassement, de la construction à l\'aménagement, nos équipes vous accompagnent tout au long de votre projet personnalisé pour créer un espace piscine unique et durable.'}
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet {isGrenoble ? 'à Grenoble et en Isère' : ''} : étude de faisabilité et analyse du terrain, conseils en aménagement et choix des matériaux, recommandations sur les systèmes de filtration et de traitement, et suivi rigoureux de chaque étape de construction et d'installation.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <svg className="w-6 h-6 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Votre projet</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#4a5568]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Construction piscines enterrées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Piscines béton et coque polyester</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Rénovation et réparation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Terrasses et plages de piscine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Systèmes de filtration modernes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Éclairage et accessoires</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Nos solutions</h3>
                  </div>
                  <p className="text-sm text-[#4a5568] leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en construction et rénovation de piscines, que ce soit pour créer une nouvelle piscine ou moderniser une installation existante avec les dernières technologies.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Artisan Rénovation - Devis Travaux Maison
                </h2>
                <span className="sr-only">Demande de prix rénovation maison et coût travaux de rénovation avec peintre en bâtiment professionnel</span>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts piscines est à votre écoute pour créer votre espace aquatique.
                </p>
                <p className="text-base mb-8 opacity-90">
                  Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé.
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="inline-flex items-center gap-2 bg-white text-[#38bdf8] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Demander un devis gratuit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-8 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start">
            <div>
              <span className="inline-block text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-3">
                COMPÉTENCES
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                {isGrenoble ? 'Expertise complète\nPiscines Grenoble' : 'Rénovation intérieure\n& rénovation extérieure'}
              </h2>
              <span className="sr-only">{isGrenoble ? 'Expertise complète en construction et rénovation de piscines à Grenoble : terrassement, maçonnerie, filtration, traitement' : 'Travaux de peinture bâtiment et entreprise bâtiment rénovation spécialisée en rénovation maison ancienne'}</span>

              <p className="text-base text-[#4a5568] leading-relaxed">
                {isGrenoble ? 'Groupe BML Rénovation Tout Corps D\'état possède une solide expérience dans la construction et la rénovation de piscines à Grenoble et en Isère. Notre expertise couvre tous les aspects : terrassement, maçonnerie, étanchéité, revêtements, filtration, traitement de l\'eau, et aménagements extérieurs pour garantir qualité et durabilité dans votre région.' : 'Groupe BML Rénovation Tout Corps D\'état possède une solide expérience dans la construction et la rénovation de piscines. Notre expertise couvre tous les aspects : terrassement, maçonnerie, étanchéité, revêtements, filtration, traitement de l\'eau, et aménagements extérieurs pour garantir qualité et durabilité.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="7" height="7" />
                    <rect x="14" y="3" width="7" height="7" />
                    <rect x="14" y="14" width="7" height="7" />
                    <rect x="3" y="14" width="7" height="7" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Types</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Piscines enterrées béton</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Piscines coque polyester</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Piscines semi-enterrées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Bassins sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Piscines naturelles</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Équipements</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Systèmes de filtration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Pompes et électrolyseurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Chauffage et pompes à chaleur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Éclairage LED subaquatique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Couvertures et volets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Robots de nettoyage</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" strokeLinejoin="round" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Services</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Étude et conception 3D</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Construction clés en main</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Rénovation complète</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Aménagement paysager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Garantie décennale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />

      <FooterSection onNavigateToServices={handleNavigateToServices} onNavigate={onNavigate} />
    </div>
  );
};

export default Piscine;
