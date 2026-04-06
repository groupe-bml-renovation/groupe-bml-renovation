import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';

interface ChauffageProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1669725341213-7379ff6c90d5?w=800&q=80',
    'https://images.unsplash.com/photo-1669722820990-2801092c0986?w=800&q=80',
    'https://images.unsplash.com/photo-1738168299283-4117c3dfb8ac?w=800&q=80'
  ];

  const IMAGE_WIDTH = 368;
  const GAP = 24;
  const IMAGE_SET_WIDTH = (IMAGE_WIDTH + GAP) * images.length;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;

      if (currentScroll <= 0) {
        container.scrollTo({ left: IMAGE_SET_WIDTH, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -400, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (currentScroll >= maxScroll - 50) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
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
                  <img
                    src={img}
                    alt={`Installation chauffage ${index + 1}`}
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
                    alt={`Installation chauffage ${index + 1}`}
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

const Chauffage: React.FC<ChauffageProps> = ({ onBack, onNavigate }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const seoConfig = isGrenoble ? {
    title: 'Rénovation Chauffage Grenoble - Chauffagiste Isère | Groupe BML',
    description: 'Chauffagiste à Grenoble. Rénovation et installation chauffage (chaudière, pompe à chaleur, radiateurs). Entreprise BML spécialisée en travaux de chauffage à Grenoble et Isère. Devis gratuit.',
    keywords: 'chauffage grenoble, chauffagiste grenoble, installation chauffage grenoble, pompe à chaleur grenoble, chaudière grenoble, rénovation chauffage isère, travaux chauffage grenoble, entreprise chauffage grenoble, radiateur grenoble',
    ogTitle: 'Chauffagiste Grenoble - Installation Chauffage & Rénovation | Groupe BML',
    ogDescription: 'Installation et rénovation chauffage à Grenoble. Chauffagiste professionnel en Isère. Chaudières, pompes à chaleur, radiateurs. Devis gratuit et gratuit.',
    ogUrl: 'https://groupe-bml-renovation.fr/grenoble/chauffage',
    canonicalUrl: 'https://groupe-bml-renovation.fr/grenoble/chauffage',
    geoRegion: 'FR-38'
  } : {
    title: 'Rénovation Maison Chauffage - Travaux de Rénovation Complète | Groupe BML',
    description: 'Rénovation maison avec travaux de chauffage professionnel. Entreprise de rénovation spécialisée en rénovation complète, intérieure et extérieure. Artisan rénovation maison, rénovation maison ancienne, coût et prix rénovation maison compétitifs. Devis gratuit.',
    keywords: 'rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation',
    ogTitle: 'Rénovation Maison Chauffage - Entreprise de Rénovation Complète | Groupe BML',
    ogDescription: 'Travaux de rénovation maison incluant chauffage professionnel. Entreprise de rénovation expert en rénovation intérieure, extérieure et maison ancienne.',
    ogUrl: 'https://groupe-bml-renovation.fr/chauffage',
    canonicalUrl: 'https://groupe-bml-renovation.fr/chauffage',
    geoRegion: 'FR'
  };

  const scrollToContactForm = () => {
    onBack();
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{seoConfig.title}</title>
        <meta name="description" content={seoConfig.description} />
        <meta name="keywords" content={seoConfig.keywords} />
        <meta property="og:title" content={seoConfig.ogTitle} />
        <meta property="og:description" content={seoConfig.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={seoConfig.ogUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoConfig.ogTitle} />
        <meta name="twitter:description" content={seoConfig.ogDescription} />
        <link rel="canonical" href={seoConfig.canonicalUrl} />
        <meta name="language" content="fr" />
        <meta name="geo.region" content={seoConfig.geoRegion} />
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1649797375414-613144f2d124?w=1600&q=80"
            alt="Travaux de Chauffage"
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
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide">
              {isGrenoble ? (
                <>Chauffage<br />Grenoble</>
              ) : (
                <>Travaux<br />de chauffage</>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble
                ? 'Chauffagiste professionnel à Grenoble - Installation, rénovation et maintenance'
                : 'Solutions performantes pour votre confort thermique et vos économies d\'énergie'}
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
                {isGrenoble ? 'Chauffagiste Grenoble - Isère' : 'TRAVAUX DE CHAUFFAGE'}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                {isGrenoble ? (
                  <>
                    <span className="text-[#38bdf8] font-normal">Votre chauffagiste de confiance</span>{' '}
                    <span className="text-slate-900">à</span><br />
                    <span className="text-slate-900">Grenoble et en Isère</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#38bdf8] font-normal">Des installations de chauffage</span>{' '}
                    <span className="text-slate-900">qui</span><br />
                    <span className="text-slate-900">garantissent confort et économies.</span>
                  </>
                )}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble
                  ? 'Depuis plus de 15 ans, Groupe BML Rénovation intervient à Grenoble et en Isère pour tous vos besoins de chauffage. Nos chauffagistes professionnels vous proposent des solutions adaptées à votre budget et vos attentes.'
                  : 'Optimisez votre confort thermique et réduisez vos factures énergétiques grâce à des installations de chauffage modernes, performantes et adaptées à vos besoins spécifiques.'}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble ? (
                  <>
                    <strong>Installation chauffage Grenoble</strong> - Notre équipe intervient à Grenoble, Échirolles, Saint-Ismier, Vizille et dans toute l'Isère pour l'installation, la rénovation et l'entretien de vos systèmes de chauffage.
                  </>
                ) : (
                  <>
                    <strong>Groupe BML Rénovation</strong> vous accompagne dans tous vos <strong>travaux de chauffage</strong>. Notre équipe de chauffagistes qualifiés <strong>vous conseille et vous accompagne</strong> pour choisir la solution la plus efficace et économique.
                  </>
                )}
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? 'Que vous souhaitiez installer une chaudière performante, une pompe à chaleur écologique, des radiateurs modernes ou un plancher chauffant réversible à Grenoble, notre expertise en chauffage vous garantit une installation de qualité, durable et optimisée pour maximiser vos économies d\'énergie en Isère.'
                  : 'Que vous souhaitiez remplacer une chaudière ancienne, installer une pompe à chaleur économique, moderniser vos radiateurs ou mettre en place un plancher chauffant, nos experts en chauffage mettent leur savoir-faire à votre service pour réaliser des installations fiables, durables et optimisées qui vous garantissent un confort thermique optimal tout en réduisant significativement votre consommation énergétique.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1669725807131-a518ee3ec1cc?w=1200&q=80"
                alt="Travaux de Chauffage Professionnel"
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
                INSTALLATION CHAUFFAGE
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Optimiser votre<br />confort thermique
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Groupe BML Rénovation tout corps d'état conçoit et réalise l'installation complète de systèmes de chauffage performants. Du diagnostic énergétique à la mise en service, nos chauffagistes vous accompagnent tout au long de votre projet pour une solution sur mesure garantissant confort et économies.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : analyse de vos besoins thermiques, conseil sur les systèmes les plus adaptés et économiques, installation professionnelle et suivi rigoureux pour une performance énergétique optimale.
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
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de chaudières à condensation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pompes à chaleur air/eau</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Planchers chauffants hydrauliques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Radiateurs basse température</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Systèmes de régulation connectés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Remplacement de chaudières anciennes</span>
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
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en chauffage, que ce soit pour installer un système moderne et économique ou remplacer une installation vétuste par une solution performante et écologique.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour optimiser votre confort thermique.
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
                Notre savoir-faire à<br />votre service
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans l'installation et la rénovation de tous types de systèmes de chauffage. Notre expertise couvre l'ensemble des technologies : chaudières à condensation, pompes à chaleur, planchers chauffants, radiateurs modernes, régulation intelligente et optimisation énergétique pour un confort optimal et des économies durables.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" />
                  <path d="M9 22V12H15V22" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Espaces</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Maisons individuelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Appartements et copropriétés</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Locaux commerciaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bureaux professionnels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chauffage collectif et individuel</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Métiers</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Installation chaudières gaz</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Pompes à chaleur aérothermiques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Planchers chauffants réversibles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Radiateurs design et performants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Régulation et domotique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Entretien et maintenance</span>
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
                    <span>Diagnostic thermique complet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Conseil en économies d'énergie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Installation et mise en service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Contrats d'entretien annuel</span>
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

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 bg-slate-50">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Optimisez Votre Système de Chauffage ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Réduisez vos factures énergétiques avec des installations de chauffage modernes et performantes.
            </p>
            <p className="text-base mb-8 opacity-90">
              Contactez nos chauffagistes experts pour un devis gratuit et personnalisé.
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

      <FooterSection onNavigate={onNavigate} onNavigateToServices={onNavigate} />
    </div>
  );
};

export default Chauffage;
