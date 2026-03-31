import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from './footer-section';
import PartnersSection from './PartnersSection';
import { OptimizedImage } from './OptimizedImage';

interface BoutiquesBureauxProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&q=80',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80',
    'https://images.unsplash.com/photo-1497366412874-3415097a27e7?w=1200&q=80',
    'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&q=80',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&q=80',
    'https://images.unsplash.com/photo-1497366858526-0766cadbe8fa?w=1200&q=80',
    'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80',
    'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=80'
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const maxScroll = container.scrollWidth - container.clientWidth;

    if (container.scrollLeft >= maxScroll - 50) {
      container.scrollLeft = container.scrollWidth / 2 - container.clientWidth;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
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
          onScroll={handleScroll}
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
                    alt={`Rénovation ${index + 1}`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll">
              {images.map((img, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <OptimizedImage
                    src={img}
                    alt={`Rénovation ${index + 1}`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll">
              {images.map((img, index) => (
                <div key={`set3-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <OptimizedImage
                    src={img}
                    alt={`Rénovation ${index + 1}`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
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

const BoutiquesBureaux: React.FC<BoutiquesBureauxProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    const target = isGrenoble ? '/?scrollTo=contact-form' : '/?scrollTo=contact-form';
    navigate(target);
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Rénovation Boutiques & Bureaux Grenoble | BML Rénovation' : 'Rénovation Boutiques & Bureaux - Groupe BML Rénovation'}</title>
        <meta name="description" content={isGrenoble ? 'Rénovation complète de boutiques et bureaux à Grenoble et en Isère. Agencement commercial, normes ERP, modernisation d\'espaces professionnels. Entreprise spécialisée. Devis gratuit.' : 'Rénovation complète de boutiques et bureaux. Agencement commercial, normes ERP, modernisation d\'espaces professionnels. Devis gratuit.'} />
        <meta name="keywords" content={isGrenoble ? 'rénovation boutiques bureaux grenoble, agencement commercial grenoble, rénovation espaces professionnels grenoble, normes ERP grenoble' : 'rénovation boutiques bureaux, agencement commercial, rénovation espaces professionnels, normes ERP'} />
        <meta property="og:title" content={isGrenoble ? 'Rénovation Boutiques & Bureaux Grenoble | BML Rénovation' : 'Rénovation Boutiques & Bureaux - Groupe BML Rénovation'} />
        <meta property="og:description" content={isGrenoble ? 'Rénovation professionnelle de boutiques et bureaux à Grenoble. Agencement, normes ERP et modernisation d\'espaces commerciaux.' : 'Rénovation complète de boutiques et bureaux avec expertise en agencement commercial et normes ERP.'} />
        <link rel="canonical" href={isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble/boutiques-bureaux' : 'https://groupe-bml-renovation.fr/boutiques-bureaux'} />
        <meta name="geo.region" content={isGrenoble ? 'FR-38' : 'FR'} />
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1517502884422-41eaead166d4?w=1200&q=80"
            alt="Rénovation Boutiques et Bureaux"
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
              Rénovations de<br />{isGrenoble ? 'boutiques et bureaux à Grenoble' : 'boutiques et bureaux'}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Interventions clés en main pour transformer vos espaces professionnels à Grenoble et en Isère' : 'Interventions clés en main pour transformer vos espaces professionnels'}
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
                BOUTIQUES ET BUREAUX
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Créer l'espace professionnel</span>{' '}
                <span className="text-slate-900">qui</span><br />
                <span className="text-slate-900">valorise votre activité.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble ? 'Transformez vos locaux commerciaux à Grenoble en espaces modernes et fonctionnels, optimisés pour accueillir vos clients et améliorer la productivité de vos équipes tout en respectant les normes ERP et d\'accessibilité.' : 'Transformez vos locaux commerciaux en espaces modernes et fonctionnels, optimisés pour accueillir vos clients et améliorer la productivité de vos équipes tout en respectant les normes ERP.'}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous accompagne {isGrenoble ? 'à Grenoble et en Isère ' : ''}dans la <strong>rénovation
                complète</strong> de vos boutiques et bureaux. <strong>Notre équipe vous conseille et vous
                accompagne</strong> dans le choix des éléments pour vous apporter la solution idéale.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble ? 'Que vous souhaitiez moderniser une boutique, réaménager des bureaux ou créer des espaces de coworking à Grenoble, nos experts en rénovation mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui reflète votre image de marque et répond à vos besoins professionnels.' : 'Que vous souhaitiez moderniser une boutique, réaménager des bureaux ou créer des espaces de coworking, nos experts en rénovation mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui reflète votre image de marque et répond à vos besoins professionnels.'}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl h-[450px]"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&q=80"
                alt="Rénovation Boutique et Bureau"
                className="w-full h-full"
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
                RÉNOVATION BOUTIQUES & BUREAUX
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Transformer vos<br />espaces professionnels
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {isGrenoble ? 'Groupe BML Rénovation, basée à Grenoble, conçoit et réalise des rénovations complètes d\'espaces professionnels en Isère et ses alentours. De l\'étude de conception à la réalisation, nos équipes vous accompagnent tout au long de votre projet personnalisé en respectant les normes ERP et d\'accessibilité.' : 'Groupe BML Rénovation tout corps d\'état conçoit et réalise des rénovations complètes d\'espaces professionnels. De l\'étude de conception à la réalisation, nos équipes vous accompagnent tout au long de votre projet personnalisé en respectant les normes ERP et d\'accessibilité.'}
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble ? 'Notre approche globale garantit une prise en charge complète de votre projet grenoblois : analyse de vos besoins, recommandations sur les matériaux et équipements, et suivi rigoureux de chaque étape de réalisation dans le respect des délais.' : 'Notre approche globale garantit une prise en charge complète de votre projet : analyse de vos besoins, recommandations sur les matériaux et équipements, et suivi rigoureux de chaque étape de réalisation.'}
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
                      <span>Rénovation complète de boutique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Réaménagement de bureaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Optimisation des espaces de travail</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Modernisation de l'agencement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Amélioration de l'accueil client</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise aux normes ERP</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en rénovation d'espaces professionnels, que ce soit pour moderniser une boutique existante ou créer des bureaux entièrement sur mesure et conformes aux normes actuelles.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? 'Prêt à Transformer Votre Espace Professionnel à Grenoble ?' : 'Prêt à Démarrer Votre Projet ?'}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble ? 'Notre équipe d\'experts à Grenoble est à votre écoute pour moderniser vos boutiques et bureaux.' : 'Notre équipe d\'experts est à votre écoute pour transformer votre intérieur.'}
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
                {isGrenoble ? 'Groupe BML Rénovation, fort de son expérience à Grenoble et en Isère, possède une solide expertise dans la rénovation complète d\'espaces professionnels. Notre savoir-faire couvre tous les aspects de la transformation : agencement commercial, menuiserie sur mesure, électricité et éclairage, plomberie, climatisation, revêtements sols et murs, et solutions adaptées pour optimiser l\'accueil et la fonctionnalité.' : 'Groupe BML Rénovation Tout Corps D\'état possède une solide expérience dans la rénovation complète d\'espaces professionnels. Notre expertise couvre tous les aspects de la transformation : agencement commercial, menuiserie sur mesure, électricité et éclairage, plomberie, climatisation, revêtements sols et murs, et solutions adaptées pour optimiser l\'accueil et la fonctionnalité.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 21V9L12 3L21 9V21H3Z" strokeLinejoin="round" />
                  <rect x="9" y="11" width="6" height="10" />
                  <line x1="6" y1="14" x2="8" y2="14" />
                  <line x1="6" y1="17" x2="8" y2="17" />
                  <line x1="16" y1="14" x2="18" y2="14" />
                  <line x1="16" y1="17" x2="18" y2="17" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Espaces</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Boutiques et commerces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bureaux et open spaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Salles de réunion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Espaces d'accueil</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Espaces de coworking</span>
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
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Agencement et menuiserie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Électricité et éclairage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Climatisation et VMC</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Plomberie et sanitaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Peinture décorative</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Revêtements sols et murs</span>
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
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Étude et conception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Respect des normes ERP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Coordination multi-corps d'état</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Travaux en horaires décalés</span>
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

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
        <div className="w-full max-w-none">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isGrenoble ? 'Créez un Espace Professionnel Qui Valorise Votre Activité à Grenoble' : 'Créez un Espace Professionnel Qui Valorise Votre Activité'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble ? 'Nos réalisations de boutiques et bureaux à Grenoble et en Isère témoignent de notre savoir-faire en aménagement professionnel.' : 'Nos réalisations de boutiques et bureaux témoignent de notre savoir-faire en aménagement professionnel.'}
            </p>
            <p className="text-base mb-8 opacity-90">
              Obtenez un devis gratuit et personnalisé pour transformer vos locaux commerciaux.
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

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />

    </div>
  );
};

export default BoutiquesBureaux;
