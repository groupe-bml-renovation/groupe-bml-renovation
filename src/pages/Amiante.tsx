import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import PartnersSection from '../components/PartnersSection';
import { FooterSection } from '../components/footer-section';

interface AmianteProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://plus.unsplash.com/premium_photo-1663090722153-120cf71c908d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1587527893189-8ed2d3edd54b?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1620633464616-648f7aeb109b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://plus.unsplash.com/premium_photo-1663088651379-95c21dfbf72c?q=80&w=2099&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1649083047668-e57d682e5749?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1700074817217-65c4191d5f9c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 400;
      const gap = 24;
      const itemWithGap = itemWidth + gap;

      const newPosition = container.scrollLeft - itemWithGap;
      const firstSetWidth = itemWithGap * images.length;

      if (newPosition <= 0) {
        container.scrollLeft = firstSetWidth - itemWithGap;
      } else {
        container.scrollBy({ left: -itemWithGap, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 400;
      const gap = 24;
      const itemWithGap = itemWidth + gap;
      const firstSetWidth = itemWithGap * images.length;
      const maxScroll = container.scrollWidth - container.clientWidth;

      const newPosition = container.scrollLeft + itemWithGap;

      if (newPosition >= firstSetWidth - itemWithGap) {
        container.scrollLeft = 0;
      } else if (newPosition >= maxScroll) {
        container.scrollLeft = 0;
      } else {
        container.scrollBy({ left: itemWithGap, behavior: 'smooth' });
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
                    alt={`Travaux de rénovation maison - Entreprise bâtiment rénovation ${index + 1}`}
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
                    alt={`Travaux de rénovation maison - Entreprise bâtiment rénovation ${index + 1}`}
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

const Amiante: React.FC<AmianteProps> = ({ onBack, onNavigate }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    onBack();
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Désamiantage Grenoble - Désamiantage Professionnel Isère' : 'Rénovation Maison - Entreprise de Rénovation & Travaux de Désamiantage'}</title>
        <meta name="description" content={isGrenoble ? "Désamiantage professionnel à Grenoble et en Isère. Diagnostic d'amiante certifié, désamiantage sécurisé et conforme. Experts qualifiés, interventions réglementaires. Devis gratuit pour diagnostiquer et éliminer l'amiante." : "Entreprise de rénovation complète pour vos travaux maison. Rénovation intérieure, extérieure et travaux de désamiantage. Artisans qualifiés, prix compétitifs. Devis gratuit pour rénovation maison ancienne et travaux bâtiment."} />
        <meta name="keywords" content={isGrenoble ? "désamiantage Grenoble, désamiantage Isère, diagnostic amiante Grenoble, enlèvement amiante, désamiantage professionnel, encapsulation amiante, confinement amiante, expert amiante" : "rénovation maison, travaux de rénovation, entreprise de rénovation, travaux maison, rénovation intérieure, rénovation extérieure, artisan rénovation, peintre en bâtiment, bâtiment travaux publics"} />
        {isGrenoble && (
          <>
            <meta name="geo.region" content="FR-38" />
            <meta name="geo.placename" content="Grenoble" />
            <link rel="canonical" href="https://groupebmlrenovation.fr/grenoble/amiante" />
          </>
        )}
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1636791013127-37effd526316?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Rénovation maison - Travaux bâtiment - Entreprise de rénovation"
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
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide capitalize">
              {isGrenoble ? 'Désamiantage Grenoble' : 'Rénovation maison - travaux bâtiment'}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Désamiantage professionnel - diagnostic amiante - experts certifiés Isère' : 'Entreprise de rénovation - artisan rénovation - désamiantage'}
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
                {isGrenoble ? 'SERVICE GRENOBLE & ISÈRE' : 'DÉSAMIANTAGE PROFESSIONNEL'}
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">
                  {isGrenoble ? 'Désamiantage sécurisé à Grenoble' : 'Rénovation maison complète'}
                </span>
                {' '}
                <span className="text-slate-900">
                  {isGrenoble ? 'diagnostic et élimination' : 'travaux de'}
                </span>
                <br />
                <span className="text-slate-900">
                  {isGrenoble ? 'conformes à la réglementation.' : 'rénovation maison ancienne.'}
                </span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble
                  ? "L'amiante présent dans les bâtiments anciens à Grenoble et en Isère nécessite une intervention professionnelle certifiée et réglementée. Groupe BML Rénovation dispose de l'expertise et de toutes les certifications requises pour l'identification, le diagnostic et l'élimination sécurisée de l'amiante dans vos bâtiments résidentiels et commerciaux."
                  : "L'amiante est un matériau dangereux qui nécessite une intervention professionnelle certifiée. Groupe BML Rénovation dispose de l'expertise et de toutes les certifications requises pour l'identification, le diagnostic et l'élimination sécurisée de l'amiante dans vos bâtiments."
                }
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation intervient à Grenoble et dans toute la région Isère</strong> pour tous vos <strong>travaux de désamiantage</strong>. Notre équipe qualifiée <strong>réalise des diagnostics précis</strong> et met en œuvre <strong>des procédures strictes et conformes</strong> pour garantir une élimination sans risque pour votre santé et votre environnement.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous ayez besoin d'un diagnostic d'amiante, d'une encapsulation, d'un confinement ou d'une élimination complète, nos experts certifiés appliquent les protocoles de sécurité les plus rigoureux pour protéger votre famille, vos collaborateurs et les intervenants, tout en respectant la réglementation en vigueur applicable à Grenoble et en Isère.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1637052368045-555146753f5c?q=80&w=2195&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Travaux de rénovation maison - Artisan rénovation maison"
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
                {isGrenoble ? 'EXPERTISE GRENOBLE' : 'DÉSAMIANTAGE PROFESSIONNEL'}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                {isGrenoble ? "Diagnostics et élimination d'amiante à Grenoble" : "Travaux maison et rénovation intérieure"}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {isGrenoble
                  ? "Groupe BML Rénovation réalise tous types de travaux de désamiantage à Grenoble et en Isère selon les normes strictes en vigueur. De l'identification minutieuse des matériaux à leur élimination sécurisée, nos équipes certifiées vous accompagnent pour une complète tranquillité d'esprit et la conformité réglementaire."
                  : "Groupe BML Rénovation réalise tous types de travaux de désamiantage selon les normes strictes en vigueur. De l'identification minutieuse des matériaux à leur élimination sécurisée, nos équipes certifiées vous accompagnent pour une complète tranquillité d'esprit."
                }
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? "Notre approche globale pour les chantiers à Grenoble garantit une prise en charge complète : diagnostic exhaustif et certifié, évaluation précise des risques, mise en place de zones de confinement réglementaires, désamiantage sécurisé avec procédures d'encapsulation ou d'enlèvement, décontamination professionnelle, et élimination légale des déchets d'amiante conformément à la législation Isérienne."
                  : "Notre approche globale garantit une prise en charge complète de votre projet : diagnostic exhaustif, évaluation des risques, mise en place de zones de confinement, désamiantage avec procédures de sécurité, décontamination, et elimination légale des déchets d'amiante."
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
                    <h3 className="text-xl font-bold text-[#38bdf8]">Votre projet</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Diagnostic d'amiante certifié</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Désamiantage de bâtiments résidentiels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Élimination dans locaux commerciaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Encapsulation et confinement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Gestion sécurisée des déchets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Contrôle des fibres d'amiante</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">
                      {isGrenoble ? 'Sécurité à Grenoble' : 'Nos solutions'}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {isGrenoble
                      ? "Groupe BML Rénovation vous propose une expertise complète en désamiantage à Grenoble, avec toutes les certifications requises pour intervenir en toute légalité, protéger votre santé et celle de vos proches, et garantir la conformité à la réglementation Isérienne."
                      : "Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en désamiantage, avec toutes les certifications requises pour intervenir en toute légalité et protéger votre santé et celle de vos proches."
                    }
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? 'Sécurisez Votre Bien à Grenoble' : 'Prêt à Sécuriser Votre Bien ?'}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble
                    ? 'Notre équipe d\'experts certifiés à Grenoble est prête à vous accompagner dans votre projet de désamiantage.'
                    : 'Notre équipe d\'experts certifiés est prête à vous accompagner dans votre projet de désamiantage.'
                  }
                </p>
                <p className="text-base mb-8 opacity-90">
                  {isGrenoble
                    ? 'Contactez-nous dès aujourd\'hui pour un diagnostic d\'amiante gratuit et une évaluation sans engagement sur votre bien en Isère.'
                    : 'Contactez-nous dès aujourd\'hui pour un diagnostic gratuit et une évaluation sans engagement.'
                  }
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="inline-flex items-center gap-2 bg-white text-[#38bdf8] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5" />
                  Demander un diagnostic gratuit
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
                {isGrenoble ? 'EXPERTISE LOCALE' : 'COMPÉTENCES'}
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                {isGrenoble
                  ? "Désamiantage professionnel à Grenoble et Isère"
                  : "Rénovation extérieure et travaux de rénovation maison"
                }
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? "Groupe BML Rénovation intervient à Grenoble et en Isère avec une solide expérience dans le désamiantage professionnel. Notre expertise locale couvre l'ensemble des techniques certifiées : diagnostic exhaustif, confinement réglementaire, désamiantage sécurisé, encapsulation protectrice, traitement légal des déchets d'amiante, et nettoyage post-intervention pour un résultat entièrement conforme à la réglementation française."
                  : "Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans le désamiantage professionnel. Notre expertise couvre l'ensemble des techniques certifiées : diagnostic préalable, confinement, désamiantage sécurisé, encapsulation, traitement des déchets d'amiante, et nettoyage post-intervention pour un résultat conforme à la réglementation."
                }
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
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Maisons et appartements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Bâtiments collectifs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Locaux commerciaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Établissements recevant public</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Bâtiments industriels</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 3 L3 8 L6 10 L6 21 L3 21 L3 3 Z M21 3 L21 8 L18 10 L18 21 L21 21 L21 3 Z" strokeLinejoin="round" />
                    <rect x="8" y="8" width="8" height="8" />
                    <line x1="8" y1="12" x2="16" y2="12" />
                    <line x1="12" y1="8" x2="12" y2="16" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Techniques</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Diagnostic et évaluation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Confinement sécurisé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Désamiantage certifié</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Encapsulation protectrice</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Évacuation réglementaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Mesures de contrôle post-travaux</span>
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
                      <span>Audit amiante complet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Documentation légale</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Décontamination professionnelle</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Traçabilité du chantier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Garantie de conformité</span>
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
              {isGrenoble ? 'Votre Sécurité à Grenoble est Notre Priorité' : 'Votre Sécurité est Notre Priorité'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble
                ? "Découvrez comment nos experts à Grenoble et en Isère réalisent des désamiantages sécurisés et conformes à la réglementation pour protéger votre environnement et celui de vos proches."
                : "Découvrez comment nos experts réalisent des désamiantages sécurisés et conformes pour protéger votre environnement."
              }
            </p>
            <p className="text-base mb-8 opacity-90">
              {isGrenoble
                ? "Contactez-nous pour recevoir un diagnostic gratuit et une évaluation personnalisée de vos besoins en désamiantage dans la région Grenoble-Isère."
                : "Contactez-nous pour recevoir un diagnostic gratuit et une évaluation personnalisée de vos besoins en désamiantage."
              }
            </p>
            <button
              onClick={scrollToContactForm}
              className="inline-flex items-center gap-2 bg-white text-[#38bdf8] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="w-5 h-5" />
              Demander un diagnostic gratuit
            </button>
          </div>
        </div>
      </section>

      <PartnersSection
        subtitle={isGrenoble ? "PARTENAIRES CERTIFIÉS GRENOBLE" : "NOS PARTENAIRES DE CONFIANCE"}
        title="Nos Partenaires"
        description={isGrenoble
          ? "Groupe BML Rénovation collabore avec les partenaires certifiés de Grenoble et d'Isère pour garantir la sécurité, la qualité, et la conformité réglementaire de vos projets de désamiantage."
          : "Groupe BML Rénovation collabore avec les plus grandes enseignes de matériaux et d'équipements pour garantir la sécurité et la qualité de vos projets de désamiantage."
        }
        partners={[
          {
            name: 'Tollens',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/tollens%402x%20(2).jpg'
          },
          {
            name: 'Thermor',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/thermor%402x%20(2).jpg'
          },
          {
            name: 'Jacob',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/jacob%402x%20(1).jpg'
          },
          {
            name: 'Grohe',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/grohe%402x%20(1).jpg'
          },
          {
            name: 'Geberit',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/geberit%402x%20(1).jpg'
          },
          {
            name: 'Atlantic',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/atlantic%402x%20(2).jpg'
          }
        ]}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Amiante;
