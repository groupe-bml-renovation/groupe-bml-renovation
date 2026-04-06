import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface ClimatisationProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1603872921216-b500ee404467?w=800&q=80',
    'https://images.unsplash.com/photo-1603872921358-66a01ded4300?w=800&q=80',
    'https://images.unsplash.com/photo-1636641359537-c434b3bfc9f4?w=800&q=80',
    'https://images.unsplash.com/photo-1665522557947-bfcdbe97e567?w=800&q=80',
    'https://images.unsplash.com/photo-1654880821975-681bd2ff42ae?w=800&q=80'
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
                  <OptimizedImage
                    src={img}
                    alt={`Installation climatisation ${index + 1}`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll" aria-hidden="true">
              {images.map((img, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <OptimizedImage
                    src={img}
                    alt={`Installation climatisation ${index + 1}`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="eager"
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

const Climatisation: React.FC<ClimatisationProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    const baseUrl = isGrenoble ? '/grenoble' : '';
    navigate(`${baseUrl}/?scrollTo=contact-form`);
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>
          {isGrenoble
            ? 'Installation Climatisation Grenoble | Climatisation Isère | BML Rénovation'
            : 'Climatisation Rénovation Maison - Entreprise Bâtiment Travaux - Groupe BML'}
        </title>
        <meta
          name="description"
          content={
            isGrenoble
              ? 'Installation climatisation à Grenoble et en Isère. Climatisation réversible, pompes à chaleur, systèmes multi-splits. Devis gratuit pour votre projet de climatisation.'
              : 'Rénovation maison complète avec climatisation performante. Entreprise de rénovation bâtiment. Travaux rénovation maison ancienne, coût et prix rénovation intérieure extérieure. Devis gratuit.'
          }
        />
        {isGrenoble && (
          <>
            <meta name="keywords" content="climatisation grenoble, installation climatisation grenoble, climatisation isère, pompes à chaleur grenoble, climatisation réversible" />
            <link rel="canonical" href="https://votre-domaine.com/grenoble/climatisation" />
            <meta name="geo.region" content="FR-38" />
          </>
        )}
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1761330440311-16e160cad236?w=1920&q=80"
            alt="Installation de Climatisation"
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
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide" aria-label={isGrenoble ? "Installation climatisation Grenoble - Pompes à chaleur Isère" : "Installation de climatisation - Rénovation maison - Travaux de rénovation maison - Entreprise bâtiment"}>
              Installation de<br />climatisation{isGrenoble && <><br /><span className="text-white">à Grenoble</span></>}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble
                ? 'Solutions performantes pour un confort thermique optimal à Grenoble et en Isère'
                : 'Solutions performantes pour un confort thermique optimal toute l\'année'}
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
                CLIMATISATION
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight" title={isGrenoble ? "Climatisation Grenoble - Installation climatisation Isère" : "Rénovation maison avec climatisation - Peintre en bâtiment - Travaux maison - Rénovation intérieure"}>
                <span className="text-[#38bdf8] font-normal">Climatisation performante</span>{' '}
                <span className="text-slate-900">pour votre</span><br />
                <span className="text-slate-900">confort {isGrenoble ? 'à Grenoble et en Isère' : 'toute l\'année'}.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Bénéficiez d'une température agréable en toutes saisons grâce à des systèmes de climatisation
                modernes, performants et économes en énergie qui s'adaptent parfaitement à vos besoins{isGrenoble && ' dans votre région'}.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous accompagne dans tous vos <strong>projets
                d'installation de climatisation {isGrenoble && 'à Grenoble et en Isère'}</strong>. L'équipe <strong>vous conseille et vous
                accompagne</strong> dans le choix du système le plus adapté à votre logement et à vos besoins spécifiques.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous souhaitiez {isGrenoble ? 'installer une climatisation réversible à Grenoble, climatiser votre maison ou votre entreprise en Isère,' : 'installer une climatisation réversible, rafraîchir des bureaux,'} améliorer
                votre confort thermique ou réduire votre consommation énergétique, nos techniciens qualifiés
                mettent leur expertise à votre service pour réaliser des installations fiables et performantes
                qui améliorent votre qualité de vie au quotidien.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1737369284265-c249f9503b0e?w=1920&q=80"
                alt="Installation de Climatisation"
                className="w-full h-[450px] object-cover"
                loading="eager"
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
                INSTALLATION DE CLIMATISATION
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight" title={isGrenoble ? "Climatisation Grenoble - Entreprise climatisation Isère" : "Artisan rénovation maison - Prix rénovation maison - Coût rénovation - Entreprise bâtiment rénovation"}>
                Optimiser votre<br />confort thermique {isGrenoble && <><br /><span className="text-slate-900">à Grenoble</span></>}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Groupe BML Rénovation tout corps d'état conçoit et réalise tous types d'installations de climatisation{isGrenoble && ' en Isère et à Grenoble'}. De l'étude thermique à la mise en service, nos techniciens qualifiés vous accompagnent tout au long de votre projet pour garantir un confort optimal et une efficacité énergétique maximale.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : diagnostic personnalisé, dimensionnement du système, conseil sur les équipements les plus adaptés{isGrenoble && ' adaptés au climat de Grenoble et la région'}, et suivi rigoureux de chaque étape d'installation pour un résultat performant et durable.
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
                    <h3 className="text-xl font-bold text-[#38bdf8]" title="Rénover une maison - Rénovation maison complète - Rénovation maison ancienne">Votre projet</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Climatisation réversible chaud/froid</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pompes à chaleur air-air</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Systèmes mono et multi-splits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Climatisation gainable invisible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation en neuf et rénovation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Entretien et maintenance préventive</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]" title="Travaux de peinture bâtiment - Rénovation extérieure - Rénovations maison">Nos solutions</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en climatisation, que ce soit pour installer un système performant, améliorer votre confort thermique ou optimiser votre consommation énergétique avec des équipements haute performance et respectueux de l'environnement.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour transformer votre confort.
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

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight" title={isGrenoble ? "Climatisation Isère - Savoir-faire climatisation Grenoble" : "Peintre dans le bâtiment - Travaux rénovation maison - Rénovation intérieure extérieure"}>
                Notre savoir-faire à<br />votre service {isGrenoble && <><br /><span className="text-[#38bdf8]">à Grenoble</span></>}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans tous types d'installations de climatisation{isGrenoble && ' en Isère et à Grenoble'}. Notre expertise couvre tous les aspects : étude thermique et dimensionnement, climatisation réversible et pompes à chaleur, systèmes mono et multi-splits, climatisation gainable, raccordements frigorifiques certifiés, et maintenance préventive pour un rendement optimal.
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
                  <h3 className="text-lg font-bold uppercase tracking-wider" title="Rénovations complètes - Bâtiment travaux publics - Entreprise bâtiment">Espaces</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Maisons individuelles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Appartements et studios</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Bureaux et espaces professionnels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Commerces et boutiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Bâtiments neufs et en rénovation</span>
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
                  <h3 className="text-lg font-bold uppercase tracking-wider" title="Artisan rénovation - Prix maison - Rénovation ancienne">Métiers</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Étude thermique et dimensionnement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Climatisation réversible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Pompes à chaleur air-air</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Systèmes mono et multi-splits</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Climatisation gainable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Raccordements frigorifiques</span>
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
                  <h3 className="text-lg font-bold uppercase tracking-wider" title="Travaux peinture - Rénovation - Rénover maison">Services</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Diagnostic et conseil personnalisé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Installation complète certifiée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Mise en service et tests</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Maintenance préventive</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Garantie constructeur et décennale</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4" title={isGrenoble ? "Installation climatisation Grenoble - Devis climatisation Isère" : "Entreprise rénovation - Devis travaux - Rénovation complète"}>
              Vous Souhaitez Installer une Climatisation {isGrenoble && 'à Grenoble'} ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Profitez d'un confort thermique optimal {isGrenoble ? 'à Grenoble et en Isère' : 'toute l\'année'} avec nos solutions performantes.
            </p>
            <p className="text-base mb-8 opacity-90">
              Nos techniciens qualifiés vous proposent un devis gratuit adapté à vos besoins.
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

      <FooterSection 
        onNavigate={(page) => onNavigate?.(page || '')} 
        onNavigateToServices={onBack} 
      />
    </div>
  );
};

export default Climatisation;
