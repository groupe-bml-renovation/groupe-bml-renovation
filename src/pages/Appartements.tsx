import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Pen } from 'lucide-react';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';
import { appartementFAQs } from '../data/service-faqs';

interface AppartementsProps {
  onBack: () => void;
  onNavigate?: (page: string, target?: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=1200&q=80',
    'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
    'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=80',
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
    'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80',
    'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80'
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
                  <OptimizedImage
                    src={img}
                    alt={`Rénovation Appartement ${index + 1}`}
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
                    alt={`Rénovation Appartement ${index + 1}`}
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

const Appartements: React.FC<AppartementsProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Rénovation Appartements à Grenoble | Entreprise Rénovation | BML' : 'Rénovation Appartements Complète | Entreprise Rénovation | BML Travaux'}</title>
        <meta name="description" content={isGrenoble ? "Rénovation d'appartements à Grenoble (38). Entreprise spécialisée en rénovation complète d'appartements anciens et modernes. Travaux intérieurs et aménagements sur mesure. Devis gratuit et estimation personnalisée." : "Rénovation d'appartements complète à Grenoble. Entreprise de rénovation spécialisée en travaux de rénovation intérieure, extérieure et aménagement d'appartements. Rénover votre appartement avec nos artisans. Prix et coût rénovation compétitifs. Devis gratuit."} />
        <meta name="keywords" content={isGrenoble ? "rénovation appartement Grenoble, rénovation Isère, rénover un appartement à Grenoble, rénovation complète Grenoble, aménagement appartement Grenoble, rénovation intérieure extérieure, travaux de rénovation Grenoble, entreprise rénovation Grenoble, artisan rénovation Grenoble, devis rénovation gratuit Grenoble" : "rénovation appartement, renovation appartement, rénover un appartement, rénovation, rénovations, entreprise de rénovation, travaux de rénovation appartement, rénovation appartement complète, rénovation appartement ancien, coût rénovation appartement, prix rénovation appartement, rénovation intérieure, rénovation extérieure, artisan rénovation appartement, aménagement appartement, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de peinture bâtiment, entreprise bâtiment rénovation"} />
        <meta property="og:title" content={isGrenoble ? "Rénovation Appartements à Grenoble - Entreprise Expert | BML Rénovation" : "Rénovation Appartements Complète - Entreprise Rénovation d'Appartements | BML"} />
        <meta property="og:description" content={isGrenoble ? "Transformez votre appartement à Grenoble avec notre expertise. Rénovation complète, intérieure et extérieure. Dévis gratuit. Satisfaction client garantie." : "Transformation complète de votre appartement. Rénovation intérieure et extérieure professionnelle. Travaux de rénovation clés en main. Devis gratuit."} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? "Rénovation Appartements à Grenoble | BML" : "Rénovation Appartements Complète | BML Rénovation"} />
        <meta name="twitter:description" content={isGrenoble ? "Rénovation d'appartements à Grenoble - Services complètes de rénovation. Demandez votre devis gratuit." : "Entreprise de rénovation d'appartements - Rénovation complète, intérieure et extérieure. Artisan professionnel. Devis gratuit."} />
        <link rel="canonical" href={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/appartements" : "https://groupe-bml-renovation.fr/appartements"} />
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1600&q=80"
            alt="Rénovation Appartements"
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
              {isGrenoble ? (
                <>
                  Rénovation d'appartements<br />à Grenoble
                </>
              ) : (
                <>
                  Rénovation d'appartements<br />en Isère
                </>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Rénover votre appartement à Grenoble en espace moderne et fonctionnel' : 'Transformez votre appartement en espace moderne et fonctionnel'}
            </p>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto mb-8" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.a
                href="https://www.google.com/search?q=groupe+bml+renovation&oq=groupe+bml+renovation&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPDIGCAQQRRg8MgYIBBBFGDwyBggFEEUYPDIGCAYQRRg8MgYIBxBFGDzSAQgzMTUyajBqN6gCALACAA&sourceid=chrome&ie=UTF-8#lrd=0x478af4894336bf9b:0x5e236531336e14ed,1,,,,"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-col items-center justify-center gap-4 group mt-8"
              >
                <svg className="h-10 w-auto" viewBox="0 0 272 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#EA4335" />
                  <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z" fill="#FBBC05" />
                  <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z" fill="#4285F4" />
                  <path d="M225 3v65h-9.5V3h9.5z" fill="#34A853" />
                  <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z" fill="#EA4335" />
                  <path d="M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c10.5 0 17.98 4.12 23.6 9.49l-6.64 6.64c-4.03-3.78-9.49-6.72-16.97-6.72-13.86 0-24.7 11.17-24.7 25.03 0 13.86 10.84 25.03 24.7 25.03 8.99 0 14.11-3.61 17.39-6.89 2.66-2.66 4.41-6.46 5.1-11.65l-22.49.01z" fill="#4285F4" />
                </svg>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-white font-semibold text-lg">Excellent</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="pt-16 pb-12 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 transform translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                RÉNOVATION APPARTEMENTS
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble 
                    ? "Rénovation d'appartements à Grenoble pour un intérieur sur mesure" 
                    : "Rénovation d'appartements en Isère pour sublimer votre espace"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                {isGrenoble
                  ? "À Grenoble, Groupe BML Rénovation excelle dans tous vos projets de rénovation complète d'appartements. Transformez votre appartement grenoblois en un espace de vie moderne, lumineux et parfaitement adapté à vos besoins."
                  : "Transformez votre appartement en un espace de vie moderne, lumineux et parfaitement adapté à vos besoins, tout en respectant les contraintes de copropriété."}
              </p>

              <p className="text-slate-700 leading-relaxed mb-6">
                <span className="text-black font-semibold">Groupe BML Rénovation</span> {isGrenoble ? "à Grenoble " : ""}possède une expertise reconnue dans la <span className="text-black font-semibold">rénovation complète d'appartements</span>. Notre équipe locale <span className="text-black font-semibold">vous conseille et vous accompagne</span> dans le choix des matériaux et des aménagements.
              </p>

              <p className="text-slate-700 leading-relaxed mb-8">
                {isGrenoble
                  ? "Que vous occupiez un T3 en copropriété à Grenoble, un studio au centre-ville ou un loft à rénover, nos experts mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui valorise votre investissement immobilier en Isère."
                  : "Que vous souhaitiez moderniser un appartement ancien, réaménager les espaces de vie ou optimiser chaque mètre carré, nos experts réalisent un projet sur mesure qui valorise votre patrimoine."}
              </p>

              <button
                onClick={scrollToContactForm}
                className="group relative inline-flex items-center gap-3 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(56,189,248,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Demander un devis gratuit
                <div className="flex flex-col items-center ml-1">
                  <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                  <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl"
            >
              <video
                src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Pour%20appartement.mp4"
                className="w-full h-full object-cover"
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

      <section className="py-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <ImageCarousel />
        </div>
      </section>

      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
            <div className="bg-[#f5f5f5] p-8">
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                {isGrenoble ? "EXPERTISE À GRENOBLE" : "NOTRE SAVOIR-FAIRE"}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble ? "Expert rénovation à Grenoble" : "Expertise en rénovation complète"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                {isGrenoble ? "Groupe BML Rénovation conçoit et réalise des rénovations complètes d'appartements à Grenoble et en Isère. De l'étude de conception à la réalisation, nos équipes greobloises vous accompagnent avec rigueur." : "Groupe BML Rénovation conçoit et réalise des rénovations complètes d'appartements. De l'étude de conception à la réalisation, nos équipes vous accompagnent avec rigueur."}
              </p>

              <p className="text-slate-700 leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : analyse des besoins, étude architecturale, et suivi millimétré de chaque corps d'état.
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
                      <span>Optimisation des volumes et espaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Rénovation cuisine et salle de bain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise aux normes électriques & fluides</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Isolation acoustique & thermique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Revêtements sols & murs premium</span>
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
                    Nous vous proposons une expertise Tout Corps d'État (TCE) pour une rénovation sereine, conforme aux normes actuelles et aux contraintes de copropriété.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Prêt à Transformer Votre Appartement à Grenoble ?" : "Prêt pour votre Rénovation d'Appartement ?"}
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Contactez-nous pour un devis gratuit et personnalisé adapté à vos besoins et à votre budget.
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="group inline-flex items-center gap-2 bg-white text-[#38bdf8] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Demander un devis gratuit
                  <div className="flex flex-col items-center ml-2">
                    <Pen className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                    <div className="w-7 h-0.5 bg-current rounded-full mt-1"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              NOTRE MÉTHODE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                {isGrenoble ? "Votre projet rénovation à Grenoble en 4 étapes" : "Votre projet rénovation en 4 étapes"}
              </span>
            </h2>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Conception", desc: "Étude architecturale, plans 2D/3D et sélection des matériaux premium." },
              { step: "02", title: "Préparation", desc: "Organisation logistique, protection des parties communes et démolition." },
              { step: "03", title: "Réalisation", desc: "Exécution millimétrée par nos experts en électricité, plomberie et finitions." },
              { step: "04", title: "Livraison", desc: "Nettoyage soigné, contrôle qualité rigoureux et levée des réserves." }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 bg-white border border-slate-100 rounded-2xl group hover:shadow-[0_20px_50px_rgba(56,189,248,0.15)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#38bdf8] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="text-5xl font-black text-slate-100 absolute top-4 right-4 group-hover:text-[#38bdf8]/10 transition-colors">
                  {s.step}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed relative z-10">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#38bdf8]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-white rounded-[2.5rem] p-8 md:p-16 shadow-xl border border-slate-100 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                  NOTRE ENGAGEMENT EXCEPTIONNEL
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                    Accompagnement d'architecte offert pour votre décoration
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                <p>
                  Chez <span className="text-black font-semibold">Groupe BML Rénovation</span>, nous croyons qu'un appartement réussi repose sur une architecture intérieure cohérente. C'est pourquoi nous avons mis en place un <span className="text-black font-semibold">partenariat exclusif avec Espaces Alpins</span>.
                </p>
                <p>
                  Pour chaque projet de rénovation complète, nous vous offrons un <span className="text-black font-semibold">coaching décoration personnalisé</span>. Un architecte d'intérieur vous accompagne dans l'optimisation des volumes et le <span className="text-black font-semibold">choix des finitions</span>.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 pb-8">
                {[
                  { title: "Architecte Offert", desc: "Conseil déco & aménagement inclus", icon: "📐" },
                  { title: "Réponse 24h", desc: "Réactivité maximale Isère & Grenoble", icon: "⚡" },
                  { title: "TCE Intégré", desc: "Interlocuteur unique pour tous les lots", icon: "🏢" },
                  { title: "Garantie Décennale", desc: "Sérénité totale sur vos travaux", icon: "🛡️" },
                  { title: "Plans 3D", desc: "Visualisation avant travaux offerte", icon: "🖥️" },
                  { title: "Experts Locaux", desc: "Savoir-faire basé au cœur de l'Isère", icon: "📍" }
                ].map((usp, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="text-2xl">{usp.icon}</span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm italic uppercase tracking-wider">{usp.title}</h4>
                      <p className="text-xs text-slate-500 mt-1">{usp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-6 items-center">
                <button
                  onClick={scrollToContactForm}
                  className="group relative inline-flex items-center gap-3 bg-[#38bdf8] text-white px-10 py-5 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.5)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  Transformer mon appartement maintenant
                  <div className="flex flex-col items-center ml-1">
                    <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                    <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                  </div>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#38bdf8]/10 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg"
                  alt="Partenariat Espaces Alpins - Architecte d'intérieur"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Partenariat Espaces Alpins</p>
                    <p className="text-xl font-semibold">"L'excellence de l'architecture d'intérieur pour vos finitions."</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="pt-10 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                {isGrenoble ? "NOTRE SAVOIR-FAIRE" : "COMPÉTENCES"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble ? "Notre expertise appartement à Grenoble" : "Notre savoir-faire à votre service"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Groupe BML Rénovation possède une solide expérience dans tous les aspects de la rénovation d'appartements. De l'aménagement intérieur à la menuiserie sur mesure, nous coordonnons chaque lot pour une livraison clés en main.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Check className="w-10 h-10" />,
                  title: "Espaces",
                  items: ["Studios & T1", "Appartements familiaux", "Lofts & plateaux", "Duplex d'exception", "Vieux Grenoble"]
                },
                {
                  icon: <Check className="w-10 h-10" />,
                  title: "Métiers",
                  items: ["Plomberie & Sanitaires", "Électricité & Domotique", "Isolation & Cloisons", "Sols & Peintures", "Menuiserie sur mesure"]
                },
                {
                  icon: <Check className="w-10 h-10" />,
                  title: "Engagements",
                  items: ["Conseils matériaux", "Diagnostic technique", "Étude de copropriété", "Garantie décennale", "Respect des délais"]
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(56,189,248,0.1)] transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#38bdf8] mb-6 group-hover:scale-110 group-hover:bg-[#38bdf8] group-hover:text-white transition-all duration-500 shadow-inner">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{card.title}</h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] group-hover/item:scale-150 transition-transform" />
                        <span className="text-sm font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Nos Certifications Section */}
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              Nos certifications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Nos certifications et qualifications
              </span>
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Nous nous engageons sur la qualité et la sécurité de chacun de vos chantiers grâce à des labels reconnus et des assurances solides.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {[
              { name: 'RGE', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', desc: 'Qualité RGE' },
              { name: 'Pompe à chaleur', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', desc: 'Expert PAC' },
              { name: 'Solaire', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png', desc: 'Certifié Solaire' },
              { name: 'Chauffage bois', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png', desc: 'Spécialiste Bois' },
              { name: 'Chauffage HP', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png', desc: 'Chauffage HP' },
              { name: 'Ventilation', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png', desc: 'Expertise Vent' },
              { name: 'Fluides', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', desc: 'Agréé Fluides' },
              { name: 'Électricité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', desc: 'Artisan Élec' },
              { name: 'Manipulation fluide', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', desc: 'Certifié Fluides' },
              { name: 'Gaz', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png', desc: 'Agréé Gaz' },
              { name: 'Installation gaz', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png', desc: 'Conformité Gaz' },
              { name: 'Bâtiment', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', desc: 'Artisan Bâtiment' },
              { name: 'Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', desc: 'Engagement Qualité' },
              { name: 'Accessibilité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', desc: 'Accessibilité' },
              { name: 'PMR', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', desc: 'Spécialiste PMR' },
              { name: 'Artisan', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', desc: 'Artisan Qualifié' }
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-4 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <img src={cert.logo} alt={cert.name} className="h-10 md:h-12 w-auto mb-3 object-contain transition-transform duration-300 group-hover:scale-110" />
                <p className="text-[10px] md:text-xs font-semibold text-slate-600 leading-tight">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Partenaires - Static Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              NOS PARTENAIRES DE CONFIANCE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Nos partenaires pour des produits de qualité
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nous collaborons exclusivement avec les plus grandes enseignes pour garantir la perfection de vos projets.
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-6 md:gap-8 items-center justify-items-center">
            {[
              { name: 'Tollens', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/tollens%402x%20(1).jpg' },
              { name: 'Gauthier', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gauthier%402x.jpg' },
              { name: 'Zolpan', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/logo-partenaire-zolpan.png' },
              { name: 'Seigneurerie', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/seigneurerie%402x.jpg' },
              { name: 'Grohe', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/grohe%402x.jpg' },
              { name: 'Jacob', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/jacob%402x.jpg' },
              { name: 'Roca', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/roca%402x.jpg' },
              { name: 'Thermor', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/thermor%402x.jpg' },
              { name: 'Atlantic', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/atlantic%402x.jpg' },
              { name: 'Geberit', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/geberit%402x.jpg' },
              { name: 'Schneider', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/schneider%402x.jpg' },
              { name: 'Legrand', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/legrand%402x.jpg' },
              { name: 'Siemens', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/siemens%402x.jpg' },
              { name: 'Scrigno', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/scrigno%402x.jpg' },
              { name: 'Vachette', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/vachette%402x.jpg' },
              { name: 'Cuisinella', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/cuisinella%402x.jpg' },
              { name: 'Bricard', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/bricard%402x.jpg' },
              { name: 'Euro Wall', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/euro-wall%402x.jpg' },
              { name: 'Homs', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/homs%402x.jpg' },
              { name: 'Udirev', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/udirev%402x.jpg' },
              { name: 'Gerflor', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gerflor%402x.jpg' },
              { name: 'Quick-Step', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/quick-step%402x.jpg' },
              { name: 'Saloni', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/saloni%402x.jpg' },
              { name: 'Artens', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/artens%402x.jpg' },
              { name: 'Marazzi', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/marazzi%402x.jpg' },
              { name: 'Porcelanosa', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/porcellanosa%402x.jpg' },
              { name: 'Rexel', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/rexel-logo_mpyv5e.avif' },
              { name: 'Decoceram', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/decoceram-logo_dgsdlz.avif' },
              { name: 'Leroy Merlin', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/leroy-merlin-logo_tx0qpv.avif' },
              { name: 'Saint Maclou', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/saint-maclou-logo_nqvk1a.avif' },
              { name: 'Samse', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/samse-logo_mqsetl.avif' },
              { name: 'La Platforme', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/la-platforme-logo_zbjmrm.avif' },
              { name: 'Point P', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/point-p-logo_mq6r8c.avif' },
              { name: 'Cedeo', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/cedeo-logo_gulsqe.avif' },
              { name: 'Le Comptoir', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/le-comptoir-logo_dvd4rc.avif' },
              { name: 'Solmur', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/solmur-logo_ke5lve.avif' },
              { name: 'Forbo', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/forbo2_g4baag%20(1).jpg' },
              { name: 'LMS', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo_LMS_insta_Plan_de_travail_1_Plan_de_travail_1_c8ybfl%20(1).jpg' },
              { name: 'Brun', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/233f5492189448a4f76cf952714f_gmen2x%20(1).png' },
              { name: 'Espaces Alpins', logoUrl: 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20logo%20image.png' }
            ].map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: i * 0.015 }}
                viewport={{ once: true }}
                className="flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <img src={p.logoUrl} alt={p.name} className="max-h-11 md:max-h-12 w-auto object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQ 
        items={appartementFAQs} 
        title={isGrenoble ? "FAQ Rénovation Appartement Grenoble" : "FAQ Rénovation Appartement"}
        description={isGrenoble ? "Retrouvez les réponses à vos questions sur la rénovation d'appartements à Grenoble et en Isère." : "Retrouvez les réponses à vos questions sur la rénovation complète d'appartements."}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Appartements;
