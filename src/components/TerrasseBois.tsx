import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from './PartnersSection';

interface TerrasseBoisProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1746343365763-3a93c74e0e86?w=1200&q=80',
    'https://images.unsplash.com/photo-1760286834265-d5d840f076e3?w=1200&q=80',
    'https://images.unsplash.com/photo-1762857995839-62cf8587f542?w=1200&q=80',
    'https://images.unsplash.com/photo-1762195804066-2fece9b24496?w=1200&q=80',
    'https://images.unsplash.com/photo-1742747868122-676f3de02bd9?w=1200&q=80'
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
                  <img
                    src={img}
                    alt={`Rénovation De Terrasse bois ${index + 1}`}
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
                    alt={`Rénovation De Terrasse bois ${index + 1}`}
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

const TerrasseBois: React.FC<TerrasseBoisProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  const handleNavigateToServices = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Terrasse Bois Grenoble | Rénovation Extérieure | BML Rénovation' : 'Rénovation Maison Terrasse Bois | Entreprise Rénovation | Travaux Artisan BML'}</title>
        <meta name="description" content={isGrenoble ? 'Rénovation et construction de terrasse en bois à Grenoble et en Isère. Terrasses durables et esthétiques. Devis gratuit pour votre projet à Grenoble.' : 'Rénovation maison complète avec terrasse bois durable. Entreprise de rénovation spécialisée en travaux de rénovation maison ancienne. Peintre en bâtiment. Devis gratuit.'} />
        <meta name="keywords" content={isGrenoble ? 'terrasse bois Grenoble, rénovation terrasse Grenoble, construction terrasse Isère, artisan terrasse Grenoble, terrasse bois Isère, rénovation maison Grenoble, entrepreneur rénovation Grenoble' : 'rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation'} />
        {isGrenoble && <meta name="geo.region" content="FR-38" />}
        {isGrenoble && <link rel="canonical" href={`${window.location.origin}/grenoble/terrasse-bois`} />}
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1760067537956-a206c6181f56?w=1600&q=80"
            alt="Terrasse en bois"
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
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide" title={isGrenoble ? 'Terrasse bois Grenoble - Rénovation extérieure en Isère' : 'Rénovation maison - Terrasse bois - Entreprise de rénovation - Travaux de rénovation'}>
              {isGrenoble ? (
                <>Terrasse bois<br />à Grenoble</>
              ) : (
                <>Rénovation de<br />terrasse bois</>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble
                ? 'Construction et rénovation de terrasses en bois dans l\'Isère, pour un espace de vie extérieur idéal à Grenoble'
                : 'Créez votre espace extérieur de rêve avec une terrasse en bois durable et élégante'
              }
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
                {isGrenoble ? 'TERRASSE BOIS GRENOBLE' : 'RÉNOVATION DE TERRASSE BOIS'}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight" title={isGrenoble ? 'Terrasse bois Grenoble - Construction et rénovation en Isère' : 'Rénovation maison - Travaux de rénovation - Artisan rénovation maison'}>
                <span className="text-[#38bdf8] font-normal">{isGrenoble ? 'Votre terrasse en bois' : 'Créer votre terrasse'}</span>{' '}
                <span className="text-slate-900">{isGrenoble ? 'à Grenoble' : 'en bois'}</span><br />
                <span className="text-slate-900">{isGrenoble ? 'réalisée par des experts' : 'idéale pour la détente.'}</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble
                  ? 'À Grenoble et en Isère, Groupe BML Rénovation crée des terrasses en bois sur mesure qui transforment vos espaces extérieurs. Nous combinons expertise locale, matériaux de qualité et design adapté au climat alpin pour vous offrir une terrasse durable et élégante.'
                  : 'Transformez votre espace extérieur en un lieu de vie agréable avec une terrasse en bois sur mesure, combinant l\'authenticité naturelle avec la durabilité et le confort.'
                }
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous propose une <strong>{isGrenoble ? 'expertise complète en construction et rénovation de terrasses en bois à Grenoble' : 'expertise complète en construction et rénovation de terrasses en bois'}</strong>. Notre équipe <strong>sélectionne les meilleurs bois</strong>
                et vous <strong>conseille sur les finitions</strong> pour créer une terrasse {isGrenoble ? 'de Grenoble' : ''} à votre image.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? 'Depuis plus de 10 ans, nous accompagnons les habitants de Grenoble et de l\'Isère pour créer leurs espaces extérieurs de rêve. Que vous souhaitiez construire une nouvelle terrasse, rénover une terrasse existante ou traiter et protéger votre bois, nos experts en construction extérieure mettent leur savoir-faire local à votre service pour réaliser un projet durable qui valorise votre propriété grenobloise.'
                  : 'Que vous souhaitiez construire une nouvelle terrasse, rénover une terrasse existante ou traiter et protéger votre bois, nos experts en construction extérieure mettent leur savoir-faire à votre service pour réaliser un projet durable qui valorise votre maison et crée l\'espace extérieur parfait pour vous détendre en famille.'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1575517111478-7f6afd0973db?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
                alt="Terrasse en bois"
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
                {isGrenoble ? 'TERRASSE BOIS GRENOBLE' : 'CONSTRUCTION TERRASSE'}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight" title={isGrenoble ? 'Construction terrasse bois à Grenoble - BML Rénovation' : 'Entreprise de rénovation - Rénovation maison complète - Travaux de rénovation maison'}>
                {isGrenoble ? 'Terrasse en bois\nà Grenoble' : 'Créer votre terrasse\nen bois'}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {isGrenoble
                  ? 'Groupe BML Rénovation conçoit et réalise des terrasses en bois de qualité professionnelle à Grenoble et en Isère. De la conception à la finition, nos équipes expertes vous accompagnent pour créer un espace extérieur durables qui correspond à votre style et aux conditions climatiques locales.'
                  : 'Groupe BML Rénovation conçoit et réalise des terrasses en bois de qualité professionnelle. De la conception à la finition, nos équipes vous accompagnent pour créer un espace extérieur qui correspond à votre style et à vos besoins.'
                }
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? 'Notre approche adaptée à Grenoble garantit la qualité : sélection des bois résistants à l\'humidité alpine, étude personnalisée, respect des normes de sécurité, et suivi rigoureux de chaque étape de la construction. Nous intégrons les spécificités de la région Isère pour une terrasse durable et belle.'
                  : 'Notre approche globale garantit la qualité : sélection des bois, étude personnalisée, respect des normes de sécurité, et suivi rigoureux de chaque étape de la construction.'
                }
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
                    <h3 className="text-xl font-bold text-[#38bdf8]" title="Travaux de rénovation - Rénovation maison complète - Peintre dans le bâtiment">Vos projets</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Construction de terrasse en bois</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Rénovation et restauration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Traitement et protection du bois</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de pergolas et structures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Escaliers et rampes en bois</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Aménagement d'espaces extérieurs</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]" title="Rénovation - Artisan rénovation maison - Entreprise rénovation bâtiment">Nos solutions</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Groupe BML Rénovation vous propose une expertise complète en construction de terrasses en bois,
                    en utilisant des matériaux de qualité premium et des techniques éprouvées pour garantir durabilité
                    et esthétique exceptionnelle.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4" title="Rénovation intérieure - Rénovation extérieure - Prix rénovation maison - Devis rénovation">
                  Prêt à Créer Votre Terrasse en Bois ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour concrétiser votre projet.
                </p>
                <p className="text-base mb-8 opacity-90">
                  Contactez-nous dès aujourd'hui pour un devis gratuit et une consultation personnalisée.
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
                {isGrenoble ? 'EXPERTISE GRENOBLE' : 'COMPÉTENCES'}
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight" title={isGrenoble ? 'Expertise terrasse bois à Grenoble - Construction professionnelle' : 'Peintre en bâtiment - Bâtiment travaux publics - Rénovation maison ancienne - Coût rénovation'}>
                {isGrenoble ? 'Notre expertise à\nGrenoble' : 'Notre savoir-faire à\nvotre service'}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? 'Groupe BML Rénovation possède une solide expérience depuis plus de 10 ans dans la construction et la rénovation de terrasses en bois à Grenoble et en Isère. Notre expertise couvre tous les aspects : sélection des bois résistants au climat alpin, conception structurelle adaptée, traitement de protection performant, aménagement d\'espaces et finitions haut de gamme pour créer une terrasse durable et élégante dans la région Rhône-Alpes.'
                  : 'Groupe BML Rénovation possède une solide expérience dans la construction et la rénovation de terrasses en bois. Notre expertise couvre tous les aspects : sélection des bois, conception structurelle, traitement de protection, aménagement d\'espaces et finitions haut de gamme pour créer une terrasse durable et élégante.'
                }
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
                <h3 className="text-lg font-bold uppercase tracking-wider" title="Rénovation maison - Travaux de rénovation - Rénovation intérieure extérieure">Types</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Terrasses surélevées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Terrasses au sol</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Pergolas et tonnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Escaliers extérieurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Terrasses mixtes</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider" title="Peintre en bâtiment - Rénovation maison ancienne - Prix rénovation maison - Coût rénovation">Matériaux</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bois exotiques durables</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bois traités haute performance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bois composites premium</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Systèmes de drainage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Finitions et revêtements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Systèmes de protection</span>
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
                <h3 className="text-lg font-bold uppercase tracking-wider" title="Bâtiment travaux publics - Entreprise de rénovation - Travaux maison - Rénover une maison">Services</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Conception et étude</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Construction complète</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Traitement du bois</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Maintenance annuelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Rénovation et restauration</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" title="Travaux de peinture bâtiment - Entreprise bâtiment rénovation - Rénover une maison - Travaux maison">
              Votre Terrasse en Bois Mérite une Création d'Exception
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Découvrez comment nos réalisations de terrasses peuvent inspirer votre prochain projet.
            </p>
            <p className="text-base mb-8 opacity-90">
              Contactez-nous pour recevoir un devis personnalisé et gratuit adapté à votre vision.
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

export default TerrasseBois;
