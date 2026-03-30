import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';

interface ChambresProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80',
    'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=1200&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=80',
    'https://images.unsplash.com/photo-1600494603989-9650cf6ddd3d?w=1200&q=80',
    'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=1200&q=80',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=1200&q=80'
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
              {images.map((img, index) => {
                const altTexts = [
                  "Rénovation maison chambre - Travaux de rénovation intérieure complète",
                  "Rénovation maison ancienne chambre - Artisan rénovation maison",
                  "Prix rénovation maison chambre - Entreprise de rénovation travaux",
                  "Rénovation extérieure chambre - Rénover une maison"
                ];
                return (
                  <div key={`set1-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src={img}
                      alt={altTexts[index % altTexts.length]}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex gap-6 animate-scroll" aria-hidden="true">
              {images.map((img, index) => {
                const altTexts = [
                  "Rénovation maison chambre - Travaux de rénovation intérieure complète",
                  "Rénovation maison ancienne chambre - Artisan rénovation maison",
                  "Prix rénovation maison chambre - Entreprise de rénovation travaux",
                  "Rénovation extérieure chambre - Rénover une maison"
                ];
                return (
                  <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <img
                      src={img}
                      alt={altTexts[index % altTexts.length]}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Chambres: React.FC<ChambresProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/chambres');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Rénovation Chambres Grenoble - Isère | BML Rénovation' : 'Rénovation Maison Chambres - Entreprise de Rénovation Complète | BML'}</title>
        <meta name="description" content={isGrenoble ? "Rénovation complète de chambres à Grenoble et en Isère. Travaux de rénovation intérieure par artisan qualifié. Devis gratuit personnalisé pour votre projet." : "Rénovation maison complète de chambres : travaux de rénovation intérieure par artisan rénovation maison. Prix rénovation compétitifs. Rénovez votre maison ancienne avec devis gratuit."} />
        <meta name="keywords" content={isGrenoble ? "rénovation chambres Grenoble, rénovation chambre Isère, artisan rénovation Grenoble, travaux rénovation chambres Grenoble, rénovation maison Grenoble, prix rénovation Grenoble, entreprise rénovation Grenoble, rénovation intérieure Grenoble, rénover chambre Grenoble, devis rénovation Grenoble" : "rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, travaux de rénovation maison, entreprise de rénovation, rénovation maison complète, rénovation maison ancienne, rénovation intérieure, artisan rénovation maison, entreprise bâtiment rénovation, travaux maison, prix rénovation maison, coût rénovation maison, rénovation extérieure, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de peinture bâtiment"} />
        <meta name="og:title" content={isGrenoble ? "Rénovation Chambres Grenoble - Artisan Qualifié Isère" : "Rénovation Complète Maison Chambres - Entreprise de Rénovation BML"} />
        <meta name="og:description" content={isGrenoble ? "Rénovation professionnelle de chambres à Grenoble. Équipe expérimentée pour transformer votre espace. Devis gratuit et suivi personnalisé." : "Travaux de rénovation maison complète pour chambres. Artisan rénovation maison avec prix transparents. Rénovation intérieure et extérieure."} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href={isGrenoble ? "https://groupebmlrenovation.com/grenoble/chambres" : "https://groupebmlrenovation.com/chambres"} />

        {/* Hidden SEO headings for search engine visibility */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation",
            "description": isGrenoble ? "Rénovation chambres à Grenoble et Isère - Artisan qualifié en travaux de rénovation intérieure" : "Entreprise de rénovation maison complète : travaux de rénovation intérieure et extérieure, artisan rénovation maison",
            "url": isGrenoble ? "https://groupebmlrenovation.com/grenoble/chambres" : "https://groupebmlrenovation.com",
            "telephone": "+33000000000",
            "areaServed": isGrenoble ? "FR-38" : "FR",
            "knowsAbout": isGrenoble ? ["rénovation chambres Grenoble", "travaux rénovation Isère", "artisan rénovation Grenoble", "rénovation intérieure Grenoble", "rénover chambre Grenoble", "entreprise rénovation Grenoble"] : ["rénovation maison", "travaux de rénovation maison", "rénovation maison complète", "rénovation maison ancienne", "rénovation intérieure", "rénovation extérieure", "bâtiment travaux publics", "peintre en bâtiment", "travaux de peinture bâtiment", "entreprise de rénovation", "artisan rénovation maison"],
            "serviceArea": {
              "@type": "GeoShape",
              "areaServed": isGrenoble ? "FR-38" : "FR"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": isGrenoble ? "Rénovation Chambres Grenoble" : "Rénovation Maison Chambres",
            "description": isGrenoble ? "Service de rénovation de chambres à Grenoble et en Isère : travaux de rénovation complète, intérieure, suites parentales et dressings personnalisés" : "Entreprise de rénovation maison offrant travaux de rénovation complète pour chambres : rénovation intérieure, rénovation extérieure, rénovation maison ancienne",
            "provider": {
              "@type": "LocalBusiness",
              "name": "Groupe BML Rénovation"
            },
            "areaServed": isGrenoble ? "FR-38" : "FR",
            "keywords": isGrenoble ? "rénovation chambres Grenoble, rénovation Isère, artisan Grenoble, travaux rénovation chambres, suites parentales Grenoble" : "rénovation maison, travaux de rénovation maison, rénovation maison complète, rénovation intérieure, rénovation extérieure, artisan rénovation maison"
          })}
        </script>
      </Helmet>

      {/* Hidden SEO content for search engines */}
      <div className="hidden" aria-hidden="true">
        <h2>Rénovation Maison Complète - Entreprise de Rénovation Chambres</h2>
        <h2>Travaux de Rénovation Maison Intérieure et Extérieure</h2>
        <h2>Rénovation Maison Ancienne - Artisan Rénovation Maison</h2>
        <h2>Prix Rénovation Maison - Coût Rénovation Maison</h2>
        <h2>Bâtiment Travaux Publics - Peintre en Bâtiment - Peintre dans le Bâtiment</h2>
        <h2>Travaux de Peinture Bâtiment - Entreprise Bâtiment Rénovation</h2>
        <p>Découvrez nos services de rénovation maison : rénovation complète, rénover une maison ancienne, travaux de rénovation maison pour rénovations intérieures et extérieures.</p>
        <p>Groupe BML Rénovation : entreprise de rénovation bâtiment, artisan rénovation maison, travaux maison avec prix compétitif.</p>
      </div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1920&q=80"
            alt="Rénovation maison complète de chambres - Entreprise de rénovation travaux de rénovation maison"
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
              Rénovations de<br />{isGrenoble ? 'chambres à Grenoble' : 'chambres'}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Transformez votre chambre en havre de paix à Grenoble' : 'Créez votre havre de paix et de sérénité'}
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
                CHAMBRES
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Créer la chambre</span>{' '}
                <span className="text-slate-900">de vos rêves</span><br />
                <span className="text-slate-900">pour un repos optimal.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Transformez votre chambre en un sanctuaire de tranquillité et de confort,
                parfaitement conçu pour vos moments de repos, de détente et de ressourcement.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>{isGrenoble ? 'Groupe BML Rénovation à Grenoble' : 'Groupe BML Rénovation'}</strong> vous accompagne dans la <strong>rénovation
                complète</strong> de votre chambre{isGrenoble ? ' en Isère' : ''}. Notre équipe <strong>vous conseille et vous
                accompagne</strong> dans le choix des couleurs apaisantes, des matériaux nobles et de l'aménagement optimal pour créer une atmosphère propice au sommeil.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous souhaitiez créer une suite parentale avec dressing intégré, installer un éclairage
                tamisé et modulable, optimiser l'isolation acoustique pour un sommeil paisible ou créer un
                espace cocooning contemporain, nos experts en rénovation mettent leur savoir-faire à votre
                service pour réaliser un projet sur mesure qui transforme votre chambre en un véritable
                refuge personnel.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80"
                alt="Rénovation intérieure chambre maison - Coût rénovation maison complète"
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
                RÉNOVATION CHAMBRES
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Transformer votre<br />espace de repos
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                {isGrenoble ? 'Basée à Grenoble, notre' : 'Groupe BML Rénovation'} équipe tout corps d'état conçoit et réalise des rénovations complètes de chambres{isGrenoble ? ' en Isère et alentours' : ''}. De l'étude de conception à la réalisation, nous vous accompagnons tout au long de votre projet personnalisé pour créer un espace apaisant qui favorise le repos et reflète votre style personnel.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : analyse de vos besoins en termes de confort et de rangement, conseils en aménagement et décoration d'intérieur, recommandations sur les matériaux, l'éclairage et l'isolation acoustique, et suivi rigoureux de chaque étape de réalisation.
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
                      <span>Rénovation complète de chambre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Création de suites parentales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de dressings intégrés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Optimisation de l'éclairage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pose de parquets nobles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Isolation acoustique et thermique</span>
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
                    {isGrenoble ? 'Notre équipe à Grenoble' : 'Groupe BML Rénovation Tout Corps D\'état'} vous propose une expertise complète en rénovation de chambres, que ce soit pour créer un espace zen et minimaliste ou une chambre chaleureuse et cocooning parfaitement adaptée à vos besoins de repos.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
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

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                Notre savoir-faire à<br />votre service
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble ? 'À Grenoble, notre entreprise' : 'Groupe BML Rénovation Tout Corps D\'état'} possède une solide expérience dans la rénovation complète de chambres. Notre expertise couvre tous les aspects de la transformation : création de dressings sur mesure, pose de parquets et revêtements nobles, optimisation de l'éclairage naturel et artificiel, isolation acoustique et thermique, menuiserie personnalisée, et solutions domotiques pour un confort optimal.
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
                <h3 className="text-lg font-bold uppercase tracking-wider">Espaces</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chambres parentales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Suites avec dressing intégré</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chambres d'enfants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chambres d'amis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chambres cocooning</span>
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
                    <span>Dressings sur mesure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Parquets et revêtements nobles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Éclairage LED et variateurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Menuiserie personnalisée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Isolation acoustique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Peinture et papiers peints</span>
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
                    <span>Conseils décoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Coordination multi-corps d'état</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Solutions thermiques</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isGrenoble ? 'Prêt à Rénover Votre Chambre à Grenoble ?' : 'Inspiré par Nos Rénovations de Chambres ?'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble ? 'Transformez votre chambre en un refuge personnel à Grenoble avec notre équipe d\'experts.' : 'Chaque chambre que nous créons devient un véritable havre de paix et de confort.'}
            </p>
            <p className="text-base mb-8 opacity-90">
              {isGrenoble ? 'Contactez notre équipe Grenobloise pour un devis gratuit et un suivi personnalisé.' : 'Créons ensemble votre espace de repos idéal avec des finitions sur mesure et un devis gratuit personnalisé.'}
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

      <FooterSection onNavigate={onNavigate} onNavigateToServices={onBack} />
    </div>
  );
};

export default Chambres;
