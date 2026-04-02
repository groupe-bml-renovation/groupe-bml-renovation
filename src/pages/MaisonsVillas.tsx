import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';
import { maisonFAQs } from '../data/service-faqs';


const createSeoSchema = (isGrenoble: boolean) => ({
// ... rest of schema ...
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Groupe BML Rénovation',
  description: isGrenoble
    ? 'Rénovation maisons et villas à Grenoble - Entreprise spécialisée en rénovation complète maison Grenoble, extensions, surélévations, travaux intérieur extérieur.'
    : 'Entreprise de rénovation maison complète - Travaux de rénovation intérieure et extérieure, peinture bâtiment, artisan rénovation.',
  url: isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble/maisons-et-villas' : 'https://groupe-bml-renovation.fr/maisons-et-villas',
  telephone: '+33',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Grenoble',
    addressRegion: 'Isère',
    addressCountry: 'FR'
  },
  serviceArea: isGrenoble
    ? ['Grenoble', 'Échirolles', 'Meylan', 'Fontaine', 'Saint-Martin-d\'Hères', 'Voiron']
    : ['Grenoble', 'Isère', 'Rhône', 'Drôme', 'Var', 'Bouches-du-Rhône'],
  services: [
    {
      '@type': 'Service',
      name: 'Rénovation Maison Complète',
      description: 'Travaux de rénovation maison - rénovation complète pour maisons anciennes et modernes'
    },
    {
      '@type': 'Service',
      name: 'Travaux de Peinture Bâtiment',
      description: 'Peintre en bâtiment - travaux de peinture intérieure et extérieure'
    },
    {
      '@type': 'Service',
      name: 'Rénovation Intérieure et Extérieure',
      description: 'Artisan rénovation maison - extensions, surélévations, aménagements'
    }
  ]
});

interface MaisonsVillasProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80',
    'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80'
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const newPosition = container.scrollLeft - 400;

      if (newPosition < 0) {
        const itemWidth = 400;
        const totalWidth = (itemWidth + 24) * images.length;
        container.scrollLeft = totalWidth;
        setTimeout(() => {
          container.scrollBy({ left: -400, behavior: 'smooth' });
        }, 10);
      } else {
        container.scrollBy({ left: -400, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      const newPosition = container.scrollLeft + 400;

      if (newPosition >= maxScroll) {
        container.scrollLeft = 0;
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
                    alt={`Rénovation ${index + 1} - Travaux de rénovation maison et bâtiment`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                    alt={`Rénovation ${index + 1} - Travaux de rénovation maison et bâtiment`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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

const MaisonsVillas: React.FC<MaisonsVillasProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = useMemo(() => location.pathname.startsWith('/grenoble'), [location.pathname]);

  const seoSchema = useMemo(() => createSeoSchema(isGrenoble), [isGrenoble]);

  const scrollToContactForm = () => {
    navigate(isGrenoble ? '/grenoble/?scrollTo=contact-form' : '/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Rénovation Maisons & Villas à Grenoble | Extensions & Surélévations' : 'Rénovation Maison Complète | Entreprise Rénovation Grenoble | Travaux Maison'}</title>
        <meta name="description" content={isGrenoble
          ? 'Rénovation maisons et villas à Grenoble - Extensions, surélévations, rénovation complète. Entreprise spécialisée en travaux maison Grenoble. Devis gratuit.'
          : 'Entreprise de rénovation maison : rénovation complète, travaux peinture bâtiment, rénovation intérieure/extérieure. Artisan rénovation maison ancienne. Prix rénovation maison compétitifs. Devis gratuit Grenoble.'} />
        <meta property="og:title" content={isGrenoble ? 'Rénovation Maisons & Villas à Grenoble' : 'Rénovation Maison Complète - Entreprise Rénovation Grenoble'} />
        <meta property="og:description" content={isGrenoble
          ? 'Extensions et surélévations à Grenoble - Rénovation complète maison, travaux intérieur/extérieur. Devis gratuit.'
          : 'Travaux de rénovation maison complète : extensions, peinture bâtiment, rénovation intérieure. Artisan rénovation expert en bâtiment travaux. Devis gratuit.'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? 'Rénovation Maisons à Grenoble' : 'Rénovation Maison - Groupe BML Rénovation'} />
        <meta name="twitter:description" content={isGrenoble
          ? 'Rénovation maisons à Grenoble : extensions, surélévations, travaux complets.'
          : 'Entreprise rénovation maison : travaux maison, rénovation complète, peintre bâtiment. Devis gratuit.'} />
        <link rel="canonical" href={isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble/maisons-et-villas' : 'https://groupe-bml-renovation.fr/maisons-et-villas'} />
        <script type="application/ld+json">
          {JSON.stringify(seoSchema)}
        </script>
      </Helmet>
      <h2 className="sr-only">{isGrenoble ? 'Rénovation maisons et villas à Grenoble - Rénovation complète maison Grenoble' : 'Rénovation maison complète - Entreprise de rénovation maison ancienne'}</h2>
      <h3 className="sr-only">{isGrenoble ? 'Extensions, surélévations et travaux maison à Grenoble' : 'Travaux de rénovation maison avec artisan rénovation professionnel'}</h3>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80"
            alt={isGrenoble ? 'Rénovation maison à Grenoble - Extensions et travaux maison' : 'Rénovation maison complète - Travaux de rénovation intérieure et extérieure'}
            className="w-full h-full object-cover"
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
              {isGrenoble ? <>Rénovations de maisons<br />et villas à Grenoble</> : <>Rénovations<br />de maisons et villas</>}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Extensions, surélévations et rénovation complète de votre patrimoine immobilier à Grenoble' : 'Transformation complète et extension de votre patrimoine immobilier'}
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
                MAISONS & VILLAS
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Créer la maison</span> <span className="text-slate-900">dont</span><br />
                <span className="text-slate-900">vous avez toujours rêvé.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble
                  ? 'À Grenoble, transformez votre maison ou villa en créant des espaces plus vastes et confortables. Agrandissez votre intérieur, optimisez chaque pièce et valorisez votre patrimoine immobilier dans l\'agglomération grenobloise.'
                  : 'Transformez votre maison ou villa en créant des espaces plus vastes et confortables, en optimisant chaque pièce et en valorisant votre patrimoine immobilier.'}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous accompagne dans la <strong>rénovation complète</strong> de votre maison ou villa {isGrenoble ? 'à Grenoble et en Isère' : ''}. <strong>Notre équipe vous conseille et vous accompagne</strong> dans le choix des éléments pour vous apporter la solution idéale.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble
                  ? 'Que vous souhaitiez rénover une maison ancienne grenobloise, créer une extension ou surélévation, réaménager les espaces de vie ou moderniser l\'ensemble de votre propriété, nos experts en rénovation mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui reflète vos aspirations.'
                  : 'Que vous souhaitiez rénover une maison ancienne, créer une extension ou surélévation, réaménager les espaces de vie ou moderniser l\'ensemble de votre propriété, nos experts en rénovation mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui reflète vos aspirations et répond à vos besoins quotidiens tout en valorisant votre bien.'}
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? 'Nous intervenons sur Grenoble et dans l\'agglomération : Échirolles, Meylan, Fontaine, Saint-Martin-d\'Hères, Voiron, Crolles, Voreppe et Sassenage. Spécialistes de la rénovation maison à Grenoble, nous réalisons également des projets en Isère et dans le sud-est.'
                  : 'Nous intervenons à Grenoble et dans les villes voisines (Échirolles, Meylan, Fontaine, Saint-Martin-d\'Hères, Voiron, Crolles, Voreppe, Sassenage), ainsi que dans plusieurs départements du sud-est de la France : <strong>l\'Isère, le Var, le Rhône, les Bouches-du-Rhône et la Drôme</strong>.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Pour%20maison.mp4"
                className="w-full h-[450px] object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
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
                RÉNOVATION MAISONS & VILLAS {isGrenoble ? '- GRENOBLE' : ''}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                {isGrenoble ? <>Transformer votre<br />maison à Grenoble</> : <>Transformer votre<br />maison ou villa</>}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                <strong>Groupe BML Rénovation Tout Corps D'état</strong> conçoit et réalise des <strong>rénovations complètes de maisons et villas</strong>{isGrenoble ? ' à Grenoble et en Isère' : ''}. De l'<strong>étude de conception</strong> à la <strong>réalisation</strong>, nos équipes vous accompagnent tout au long de votre <strong>projet personnalisé</strong>, incluant extensions, surélévations et aménagements extérieurs.
              </p>


              <p className="text-base text-slate-600 leading-relaxed">
                <strong>Spécialistes de la rénovation de maisons et villas {isGrenoble ? 'à Grenoble' : ''}</strong>, nous intervenons sur <strong>tous types de projets</strong> : rénovation complète, extension et surélévation, création de pièces supplémentaires, aménagement d'espaces extérieurs, installation de piscines et terrasses, amélioration de l\'isolation thermique et énergétique, et modernisation complète. Chaque détail est pensé pour <strong>valoriser votre patrimoine immobilier</strong>.
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
                      <span>Rénovation complète de maison</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Extension et surélévation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Aménagements extérieurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Création de pièces supplémentaires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Modernisation énergétique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Rénovation de façades et toitures</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en rénovation de maisons et villas, incluant extensions, aménagements intérieurs et extérieurs, pour créer un espace de vie exceptionnel et valoriser votre patrimoine immobilier.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? 'Prêt à Rénover Votre Maison à Grenoble ?' : 'Prêt à Démarrer Votre Projet ?'}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble ? 'Notre équipe grenobloise d\'experts est à votre écoute pour transformer votre maison.' : 'Notre équipe d\'experts est à votre écoute pour transformer votre intérieur.'}
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
                COMPÉTENCES {isGrenoble ? '- GRENOBLE' : ''}
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                {isGrenoble ? <>Notre expertise à<br />Grenoble</> : <>Notre savoir-faire à<br />votre service</>}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la rénovation complète de maisons et villas {isGrenoble ? 'à Grenoble et en Isère' : ''}. Notre expertise couvre tous les aspects de la transformation : gros œuvre, extensions et surélévations, second œuvre, menuiserie, électricité, plomberie, aménagements extérieurs, et solutions sur mesure pour créer un lieu de vie unique et valoriser votre patrimoine.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 21h18M3 7v1a3 3 0 003 3h0a3 3 0 003-3V7m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2m0 0v1a3 3 0 003 3h0a3 3 0 003-3V7m-9 4h2m-2 4h2m-6-4h2m-2 4h2m10-4h2m-2 4h2M6 13v8m6-8v8m6-8v8" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Espaces</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Extensions et surélévations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Espaces de vie et salons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Cuisines et salles à manger</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Suites parentales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Terrasses et jardins</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 3 L3 8 L6 10 L6 21 L3 21 L3 3 Z M21 3 L21 8 L18 10 L18 21 L21 21 L21 3 Z" strokeLinejoin="round" />
                  <rect x="8" y="8" width="8" height="8" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Métiers</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Gros œuvre et maçonnerie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Charpente et couverture</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Menuiseries extérieures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Isolation thermique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Plomberie et chauffage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Électricité générale</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="9" r="2" />
                  <circle cx="9" cy="14" r="2" />
                  <circle cx="15" cy="14" r="2" />
                  <line x1="12" y1="11" x2="12" y2="12" />
                  <line x1="12" y1="12" x2="9" y2="14" />
                  <line x1="12" y1="12" x2="15" y2="14" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Services</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Étude architecturale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Démarches administratives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Coordination tous corps d'état</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Performance énergétique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Gestion complète du projet</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
        <div className="w-full max-w-none">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isGrenoble ? 'Transformez Votre Maison Grenobloise en Lieu de Vie Exceptionnel' : 'Transformez Votre Maison en un Lieu de Vie Exceptionnel'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble ? 'Nos rénovations de maisons et villas à Grenoble illustrent notre expertise et notre engagement envers l\'excellence.' : 'Nos rénovations de maisons et villas illustrent notre expertise et notre engagement envers l\'excellence.'}
            </p>
            <p className="text-base mb-8 opacity-90">
              {isGrenoble ? 'Démarrez votre projet de transformation à Grenoble avec un devis gratuit et personnalisé.' : 'Démarrez votre projet de transformation avec un devis gratuit et personnalisé pour votre maison.'}
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

      <ServiceFAQ 
        items={maisonFAQs} 
        title={isGrenoble ? "FAQ Rénovation Maison Grenoble" : "FAQ Rénovation Maison"}
        description={isGrenoble ? "Retrouvez les réponses à vos questions sur la rénovation de maisons et villas à Grenoble." : "Retrouvez les réponses à vos questions sur la rénovation complète de maisons."}
      />

      <PartnersSection />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />

    </div>
  );
};

export default MaisonsVillas;
