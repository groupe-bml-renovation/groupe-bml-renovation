import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { FooterSection } from './footer-section';
import PartnersSection from './PartnersSection';

interface AmenagementProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1260&q=80',
    'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1260&q=80',
    'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=1260&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1260&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1260&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1260&q=80',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1260&q=80'
  ];

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = 344;
      scrollContainerRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
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
                  <img
                    src={img}
                    alt={`Exemple de rénovation intérieure avec aménagement sur mesure - Travaux maison ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll" aria-hidden="true">
              {images.map((img, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={img}
                    alt={`Exemple de rénovation intérieure avec aménagement sur mesure - Travaux maison ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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

const Amenagement: React.FC<AmenagementProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  const handleNavigateToServices = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Aménagement Sur Mesure & Rénovation Intérieure | Dressings Personnalisés | Travaux Maison | BML</title>
        <meta name="description" content="Aménagement sur mesure intégré à votre rénovation maison. Dressings, placards, rangements personnalisés. Entreprise de rénovation complète - Groupe BML. Rénover votre intérieur avec nos experts en travaux maison." />
        <meta name="keywords" content="rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation, aménagement sur mesure" />
        <meta property="og:title" content="Aménagement Sur Mesure & Rénovation Maison Intérieure | BML Rénovation" />
        <meta property="og:description" content="Aménagement sur mesure intégré à votre rénovation maison. Dressings, rangements personnalisés et travaux de rénovation complète par entreprise spécialisée." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Aménagement & Rénovation Maison Intérieure | BML" />
        <meta name="twitter:description" content="Rénovation maison complète avec aménagement sur mesure. Travaux de rénovation intérieure et prix compétitifs. Devis gratuit." />
        <link rel="canonical" href="https://groupe-bml-renovation.fr/amenagement" />
        <meta name="language" content="fr" />
        <meta name="geo.region" content="FR" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation",
            "description": "Entreprise de rénovation maison spécialisée en aménagement sur mesure, travaux de rénovation intérieure, rénovation maison complète et rénovation maison ancienne",
            "url": "https://groupe-bml-renovation.fr",
            "areaServed": "FR",
            "serviceArea": {
              "@type": "City",
              "name": "France"
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Aménagement et Rénovation Intérieure",
            "description": "Aménagement sur mesure et rénovation intérieure - travaux maison complète pour rénover votre maison ancienne ou moderne",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Groupe BML Rénovation"
            },
            "areaServed": "FR",
            "availableLanguage": "fr"
          })}
        </script>
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=1920&q=80"
            alt="Aménagement sur mesure pour rénovation intérieure - Travaux maison"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide capitalize" title="Aménagement sur mesure - Rénovation maison intérieure et travaux maison">
              Aménagement
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              Optimisez chaque espace avec intelligence
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
                AMÉNAGEMENT
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight" title="Rénovation intérieure - Travaux de rénovation maison pour optimiser vos espaces">
                <span className="text-[#38bdf8] font-normal">Concevoir des espaces</span>{' '}
                <span className="text-slate-900">qui optimisent</span><br />
                <span className="text-slate-900">votre quotidien.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Transformez vos espaces de vie en lieux parfaitement organisés et fonctionnels,
                conçus pour répondre à vos besoins spécifiques et améliorer votre confort au quotidien.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> crée des <strong>aménagements
                sur mesure</strong> parfaitement adaptés à votre mode de vie. Notre équipe vous conseille et vous
                accompagne dans la conception d'espaces qui allient esthétique et praticité.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous souhaitiez installer un dressing walk-in, créer une bibliothèque murale,
                optimiser vos rangements sous combles, aménager un bureau fonctionnel ou concevoir
                un cellier organisé, nos experts en aménagement intérieur mettent leur créativité
                à votre service pour réaliser des solutions personnalisées qui maximisent l'espace
                disponible tout en créant un environnement harmonieux et accueillant.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1260&q=80"
                alt="Aménagement intérieur sur mesure - Rénovation maison avec rangements personnalisés"
                className="w-full h-[450px] object-cover"
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
                AMÉNAGEMENT SUR MESURE
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight" title="Travaux de rénovation maison - Entreprise de rénovation spécialisée en optimisation d'espace">
                Optimiser chaque<br />centimètre carré
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Groupe BML Rénovation tout corps d'état conçoit et réalise des aménagements sur mesure intelligents. De l'étude ergonomique à l'installation finale, nos équipes vous accompagnent tout au long de votre projet personnalisé pour créer des espaces organisés qui simplifient votre vie quotidienne.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : analyse de vos besoins de rangement et d'organisation, conseils en optimisation d'espace et agencement, recommandations sur les matériaux, les finitions et les accessoires, et suivi rigoureux de chaque étape de fabrication et d'installation.
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
                    <h3 className="text-xl font-bold text-[#38bdf8]" title="Travaux de rénovation maison - Services de rénovation intérieure">Votre projet</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#4a5568]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Dressings walk-in et penderies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Placards sur mesure et coulissants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Bibliothèques et étagères murales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Bureaux intégrés et espaces télétravail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Rangements sous combles et sous escalier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Celliers et caves à vin organisés</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]" title="Rénovation maison complète - Artisan rénovation spécialisé">Nos solutions</h3>
                  </div>
                  <p className="text-sm text-[#4a5568] leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en aménagement intérieur, que ce soit pour optimiser un petit espace ou créer un aménagement complet totalement personnalisé qui transforme votre manière de vivre.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" title="Rénovation intérieure - Entreprise de rénovation maison pour vos travaux">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour transformer votre intérieur.
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

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight" title="Rénovation maison complète - Artisan rénovation maison avec expertise bâtiment travaux">
                Notre savoir-faire à<br />votre service
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la conception et la réalisation d'aménagements intérieurs sur mesure. Notre expertise couvre tous les aspects de l'agencement : menuiserie haut de gamme, systèmes de rangement modulables, portes coulissantes et systèmes d'ouverture, éclairage LED intégré, finitions soignées en bois massif ou panneaux stratifiés, et solutions d'organisation intelligentes pour maximiser chaque espace disponible.
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
                <h3 className="text-lg font-bold uppercase tracking-wider" title="Rénovation intérieure - Travaux maison pour tous vos espaces">Espaces</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Dressings et penderies sur mesure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Placards muraux et coulissants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bibliothèques et meubles TV</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bureaux et espaces télétravail</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Rangements sous pente et escalier</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider" title="Peintre en bâtiment - Bâtiment travaux publics et menuiserie">Métiers</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Menuiserie et ébénisterie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bois massif et panneaux stratifiés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Portes coulissantes et miroirs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Systèmes de rangement modulables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Éclairage LED intégré</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Quincaillerie haut de gamme</span>
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
                <h3 className="text-lg font-bold uppercase tracking-wider" title="Entreprise de rénovation - Travaux de rénovation maison complète">Services</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Étude et conception 3D</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Conseils en organisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Fabrication sur mesure en atelier</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Installation professionnelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Gestion clés en main</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" title="Prix rénovation maison - Coût rénovation maison avec devis gratuit">
              Inspiré par Nos Aménagements Sur Mesure ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Chaque aménagement que nous réalisons optimise intelligemment votre espace tout en reflétant votre style de vie.
            </p>
            <p className="text-base mb-8 opacity-90">
              Concevons ensemble vos rangements personnalisés qui allient esthétique et fonctionnalité avec un devis gratuit.
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
      </section>

      <PartnersSection />

      <FooterSection onNavigateToServices={handleNavigateToServices} onNavigate={onNavigate} />
    </div>
  );
};

export default Amenagement;
