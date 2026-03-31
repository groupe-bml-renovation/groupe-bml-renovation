import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';

interface SalonsProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    'https://images.unsplash.com/photo-1588471980726-8346cb477a33?w=1200&q=80',
    'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/0113%20(1).mp4',
    'https://images.unsplash.com/photo-1582582621959-48d27397dc69?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
    'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80',
    'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&q=80',
    'https://images.unsplash.com/photo-1554995207-c18c203602cb?w=1200&q=80'
  ];

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = 400;
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
              {images.map((media, index) => (
                <div key={`set1-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  {media.endsWith('.mp4') ? (
                    <video
                      src={media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <img
                      src={media}
                      alt={`Rénovation salon ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll" aria-hidden="true">
              {images.map((media, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  {media.endsWith('.mp4') ? (
                    <video
                      src={media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <img
                      src={media}
                      alt={`Rénovation salon ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Salons: React.FC<SalonsProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Rénovation Salons Grenoble - Groupe BML Rénovation' : 'Rénovation Salons - Groupe BML Rénovation'}</title>
        <meta name="description" content={isGrenoble ? 'Rénovation complète de salons à Grenoble. Création d\'espaces ouverts, cheminées, parquets, éclairage LED. Experts en rénovation intérieure à Grenoble et région. Devis gratuit.' : 'Rénovation complète de salons à Grenoble et région. Création d\'espaces ouverts, cheminées, parquets, éclairage LED. Ambiance chaleureuse et élégante. Devis gratuit.'} />
        {isGrenoble && <meta name="keywords" content="rénovation salon Grenoble, rénovation intérieur Grenoble, rénovation maison Grenoble, aménagement salon Grenoble" />}
        <link rel="canonical" href={isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble/salons' : 'https://groupe-bml-renovation.fr/salons'} />
        <meta property="og:title" content={isGrenoble ? 'Rénovation Salons Grenoble - Groupe BML' : 'Rénovation Salons - Groupe BML Rénovation'} />
        <meta property="og:description" content={isGrenoble ? 'Rénovation complète de salons à Grenoble. Devis gratuit.' : 'Rénovation complète de salons à Grenoble et région. Devis gratuit.'} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble/salons' : 'https://groupe-bml-renovation.fr/salons'} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1920&q=80"
            alt="Rénovation de Salons"
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
              {isGrenoble ? 'Rénovations de salons' : 'Rénovations de'}<br />{isGrenoble ? 'à Grenoble' : 'salons'}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              Créez le cœur chaleureux de votre maison
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
                SALONS
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                {isGrenoble
                  ? <>
                      <span className="text-[#38bdf8] font-normal">Votre salon de rêve</span> <span className="text-slate-900">à Grenoble</span><br />
                      <span className="text-slate-900">réalisé par les experts</span>
                    </>
                  : <>
                      <span className="text-[#38bdf8] font-normal">Créer le salon</span> <span className="text-slate-900">dont</span><br />
                      <span className="text-slate-900">vous avez toujours rêvé.</span>
                    </>
                }
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Transformez votre salon en un espace convivial et élégant,
                parfaitement adapté à vos moments de détente, de convivialité et de partage en famille.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> {isGrenoble ? 'à Grenoble ' : ''}vous accompagne dans la <strong>rénovation
                complète</strong> de votre salon. <strong>Notre équipe vous conseille et vous
                accompagne</strong> dans le choix des matériaux, des couleurs et de l'aménagement pour créer l'ambiance parfaite.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Que vous souhaitiez créer un salon moderne et lumineux, installer une cheminée ou un poêle,
                optimiser l'éclairage naturel ou créer un espace ouvert cuisine-salon, nos experts en rénovation
                mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui transforme
                votre lieu de vie en un espace chaleureux et accueillant.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble
                  ? 'Basés à Grenoble, nous intervenons dans la région de Grenoble (Échirolles, Meylan, Fontaine, Saint-Martin-d\'Hères, Voiron, Crolles, Voreppe, Sassenage) et dans plusieurs départements du sud-est de la France : l\'Isère, le Var, le Rhône, les Bouches-du-Rhône et la Drôme.'
                  : 'Nous intervenons à Grenoble et dans les villes voisines (Échirolles, Meylan, Fontaine, Saint-Martin-d\'Hères, Voiron, Crolles, Voreppe, Sassenage), ainsi que dans plusieurs départements du sud-est de la France : l\'Isère, le Var, le Rhône, les Bouches-du-Rhône et la Drôme.'
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/0113%20(1).mp4"
                autoPlay
                loop
                muted
                playsInline
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
                RÉNOVATION SALONS
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                {isGrenoble ? 'Votre salon d\'exception à Grenoble' : 'Transformer votre salon en espace d\'exception'}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                <strong>Groupe BML Rénovation Tout Corps D'état</strong> conçoit et réalise des <strong>rénovations complètes de salons</strong>. De l'<strong>étude de conception</strong> à la <strong>réalisation</strong>, nos équipes vous accompagnent tout au long de votre <strong>projet personnalisé</strong> pour créer un espace harmonieux qui reflète votre personnalité et votre mode de vie.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                Notre <strong>approche globale</strong> garantit une <strong>prise en charge complète</strong> de votre projet : analyse architecturale des espaces, étude des possibilités d'extension et d'abattage de cloisons, recommandations sur les matériaux haut de gamme, optimisation de l'éclairage naturel et artificiel, et <strong>suivi rigoureux</strong> de chaque étape de réalisation. Nous veillons à moderniser votre salon en optimisant les <strong>délais et la qualité</strong>.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                <strong>Spécialistes de la rénovation de salons</strong>, nous intervenons sur <strong>tous types de projets</strong> : rénovation complète du salon, création d'espaces ouverts salon-cuisine, installation de cheminées et poêles, pose de parquets nobles, optimisation de l'éclairage LED et domotique, menuiserie sur mesure, amélioration acoustique, et modernisation complète. Chaque détail est pensé pour <strong>créer un lieu de vie chaleureux et élégant</strong>.
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
                      <span>Rénovation complète de salon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Création d'espaces ouverts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de cheminées et poêles</span>
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
                      <span>Aménagements sur mesure</span>
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
                  <p className="text-base text-[#4a5568] leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en rénovation de salons, que ce soit pour créer un espace contemporain et épuré ou un salon chaleureux et traditionnel parfaitement adapté à votre style de vie.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? 'Rénovez Votre Salon à Grenoble' : 'Prêt à Démarrer Votre Projet ?'}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble
                    ? 'Notre équipe d\'experts à Grenoble est à votre écoute pour transformer votre salon.'
                    : 'Notre équipe d\'experts est à votre écoute pour transformer votre intérieur.'
                  }
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
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la rénovation complète de salons. Notre expertise couvre tous les aspects de la transformation : abattage de cloisons, création d'espaces ouverts, installation de cheminées et poêles, pose de parquets nobles, optimisation de l'éclairage naturel et artificiel, menuiserie sur mesure, et solutions domotiques pour un confort moderne.
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
                    <span>Salons et séjours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Espaces ouverts salon-cuisine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Salles de réception</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Coins lecture et détente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Espaces multimédias</span>
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
                    <span>Cheminées et poêles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Parquets et revêtements nobles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Éclairage LED et domotique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Menuiserie sur mesure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Plâtrerie et faux plafonds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Peinture et enduits décoratifs</span>
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
                    <span>Solutions acoustiques</span>
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
              {isGrenoble ? 'Transformez Votre Salon à Grenoble' : 'Donnez Vie à Votre Salon de Rêve'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble
                ? 'À Grenoble, nos experts en rénovation créent des espaces chaleureux et élégants adaptés à votre style de vie.'
                : 'Chaque rénovation de salon que nous réalisons démontre notre passion pour créer des espaces chaleureux et élégants.'
              }
            </p>
            <p className="text-base mb-8 opacity-90">
              Concrétisez votre vision avec un devis gratuit et personnalisé pour votre salon.
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

      <FooterSection onNavigateToServices={onBack} onNavigate={onNavigate} />
    </div>
  );
};

export default Salons;
