import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import CTASection from './CTASection';
import { FooterSection } from '../components/footer-section';
import { ScrollingFeatureShowcase } from './ScrollingFeatureShowcase';

interface EtapesProjetProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260',
    'https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260',
    'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg?auto=compress&cs=tinysrgb&w=1260'
  ];

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
                    alt={`Étape de projet ${index + 1}`}
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
                    alt={`Étape de projet ${index + 1}`}
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

const EtapesProjet: React.FC<EtapesProjetProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=1260"
            alt="Les étapes clés de votre projet"
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
              Les étapes clés de<br />votre projet
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              Un accompagnement sur mesure de A à Z
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
                NOTRE DÉMARCHE
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Un processus éprouvé</span>{' '}
                <span className="text-slate-900">pour une réalisation</span><br />
                <span className="text-slate-900">sans surprise.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Chez Groupe BML Rénovation, nous avons développé une méthodologie claire et structurée
                pour garantir le succès de chaque projet de rénovation.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>De la première prise de contact à la remise des clés</strong>, nous assurons un accompagnement
                personnalisé et transparent. Notre objectif : vous offrir une expérience fluide et sereine,
                avec des résultats qui dépassent vos attentes.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Chaque étape est pensée pour optimiser le déroulement du chantier, respecter les délais
                et votre budget, tout en garantissant une qualité irréprochable. Découvrez comment nous
                transformons vos idées en réalité, étape par étape, avec rigueur et professionnalisme.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260"
                alt="Gestion de projet de rénovation"
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

      <section className="pt-0 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-4">
              NOTRE DÉMARCHE
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Votre projet en 6 étapes</span>
            </h2>
            <p className="text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Qu'il s'agisse d'un projet personnel ou professionnel, chaque chantier mérite une attention minutieuse.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <ScrollingFeatureShowcase />
      </section>

      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
            <div className="bg-[#f5f5f5] p-8">
              <span className="inline-block text-[#38bdf8] text-xs font-bold uppercase tracking-[0.2em] mb-4">
                PROCESSUS PROJET
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Trois phases clés<br />pour votre réussite
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                Notre approche structurée en trois phases majeures assure la qualité et la réussite de chaque projet.
                De l'étude initiale à la livraison finale, chaque détail est soigneusement planifié et exécuté.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Cette méthodologie éprouvée nous permet de garantir des délais maîtrisés, un budget respecté
                et une qualité irréprochable. Votre satisfaction est au cœur de chacune de nos interventions.
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
                    <h3 className="text-xl font-bold text-[#38bdf8]">Phase 1</h3>
                  </div>
                  <ul className="space-y-2 text-base text-[#4a5568]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Prise de contact sous 48h-72h</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Visite technique du site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Analyse de vos besoins</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Établissement du devis détaillé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Présentation des solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Validation du projet</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Nos garanties</h3>
                  </div>
                  <p className="text-base text-[#4a5568] leading-relaxed">
                    Chaque étape de notre processus est conçue pour vous offrir transparence, réactivité et qualité.
                    Nous nous engageons à respecter les délais, le budget et vos exigences tout au long du projet.
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
                NOTRE EXPERTISE
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                Un suivi professionnel<br />à chaque étape
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation met en place un suivi rigoureux tout au long de votre projet.
                Notre coordination multi-corps d'état garantit une exécution fluide, des finitions soignées
                et le respect de vos attentes à chaque phase du chantier.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Étude</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-base text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Rendez-vous sur site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Analyse technique complète</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Dessins et plans 3D</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Devis détaillé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Choix des matériaux</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Conseil</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-base text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Proposition de matériaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Conseils décoration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Démarche écoresponsable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Projection 3D (option)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Planning de chantier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Validation finale</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Réalisation</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-base text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Installation de chantier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Coordination des corps d'état</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Suivi hebdomadaire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Contrôle qualité continu</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Réception et remise des clés</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default EtapesProjet;
