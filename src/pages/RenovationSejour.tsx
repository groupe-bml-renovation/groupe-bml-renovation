import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface RenovationSejourProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1260&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1260&q=80',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1260&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1260&q=80',
    'https://images.unsplash.com/photo-1586372092335-fa3599cf7ff7?w=1260&q=80',
    'https://images.unsplash.com/photo-1630129477887-ebf2a9dbfdf5?w=1260&q=80',
    'https://images.unsplash.com/photo-1589223227221-db4f6064eee4?w=1260&q=80'
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
                  <OptimizedImage
                    src={img}
                    alt={`Rénovation séjour ${index + 1}`}
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
                    alt={`Rénovation séjour ${index + 1}`}
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

const RenovationSejour: React.FC<RenovationSejourProps> = ({ onBack, onNavigate }) => {
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
        <title>Rénovation Séjour Salon | Transformation d'Intérieur Premium | BML</title>
        <meta name="description" content="Rénovation complète de séjour et salon. Transformation d'espace de vie haut de gamme avec aménagement fonctionnel, éclairage premium et finitions modernes. Devis gratuit." />
        <meta name="keywords" content="rénovation séjour, rénovation salon, rénovation intérieure, aménagement séjour, salon moderne, rénovation pièce à vivre, travaux rénovation maison" />
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1920&q=80"
            alt="Rénovation de Séjour"
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
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide capitalize">
              Rénovation Séjour
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              Transformez votre espace de vie en lieu de vie privilégié
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
                RÉNOVATION SÉJOUR
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Entreprise de rénovation maison</span>{' '}
                <span className="text-slate-900">spécialisée dans la</span><br />
                <span className="text-slate-900">transformation de séjours et salons.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Transformez votre séjour en un espace convivial et fonctionnel, alliant design contemporain,
                luminosité optimale et aménagement sur mesure pour un lieu de vie vraiment privilégié.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous accompagne dans la <strong>rénovation
                complète</strong> de votre séjour. Notre équipe <strong>vous conseille et vous
                accompagne</strong> dans la reconfiguration d'espace, le choix des revêtements, l'installation
                d'éclairage premium et les aménagements intégrés pour créer un espace à la hauteur de vos attentes.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous souhaitiez ouvrir votre espace en abattant des cloisons, installer un éclairage LED sophistiqué,
                poser des revêtements de qualité ou créer des aménagements sur mesure, nos experts en rénovation
                mettent leur savoir-faire à votre service pour réaliser un projet qui transcende votre quotidien.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1260&q=80"
                alt="Rénovation de Séjour"
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
                RÉNOVATION SÉJOUR & SALON
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Rénovation complète et travaux<br />de transformation de séjour
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Groupe BML Rénovation tout corps d'état conçoit et réalise des rénovations complètes de séjours et salons. De l'étude de conception à la réalisation, nos équipes vous accompagnent tout au long de votre projet personnalisé pour créer un espace lumineux, fonctionnel et adapté à votre style de vie.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : étude d'optimisation d'espace et analyse de vos besoins, recommandations sur les aménagements, choix des revêtements et de l'éclairage, et suivi rigoureux de chaque étape de réalisation pour un résultat conforme à votre vision.
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
                      <span>Reconfiguration d'espace optimisée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Abattage de cloisons et création d'espaces ouverts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Éclairage LED sophistiqué et intégré</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Revêtements muraux et sols de qualité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Aménagements sur mesure intégrés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Peinture intérieure premium</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en rénovation de séjours, que ce soit pour moderniser votre intérieur existant ou créer un espace de vie entièrement repensé pour un confort optimal et une esthétique raffinée.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Rénovation ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts en rénovation est à votre écoute pour créer votre séjour idéal.
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
                Artisan rénovation maison :<br />notre savoir-faire en séjour
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la rénovation complète de séjours et salons. Notre expertise couvre tous les aspects de la transformation d'espace : restructuration de l'espace, abattage de cloisons, installation de systèmes électriques optimisés, éclairage LED intégré, revêtements haut de gamme, aménagements sur mesure, et finitions premium pour un résultat d'exception.
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
                      <span>Séjours et salons complets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Pièces à vivre ouvertes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Espaces cuisine-séjour intégrés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Zones de circulation optimisées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Espace fonctionnel et lumineux</span>
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
                      <span>Abattage de cloisons</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Électricité et éclairage LED</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Revêtements et peinture</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Aménagements sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Chauffage et climatisation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Menuiserie et portes coulissantes</span>
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
                      <span>Étude et conception sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Optimisation d'espace</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Coordination multi-corps d'état</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Conseil en aménagement et design</span>
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
              Prêt pour votre rénovation de séjour ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Chaque séjour que nous transformons devient un véritable lieu de vie privilégié.
            </p>
            <p className="text-base mb-8 opacity-90">
              Créons ensemble votre séjour idéal avec un accompagnement personnalisé et un devis gratuit.
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

export default RenovationSejour;
