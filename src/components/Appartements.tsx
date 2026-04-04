import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
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
                    alt={`Rénovation Appartement ${index + 1}`}
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
                    alt={`Rénovation Appartement ${index + 1}`}
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
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="twitter:title" content={isGrenoble ? "Rénovation Appartements à Grenoble | BML" : "Rénovation Appartements Complète | BML Rénovation"} />
        <meta name="twitter:description" content={isGrenoble ? "Rénovation d'appartements à Grenoble - Services complètes de rénovation. Demandez votre devis gratuit." : "Entreprise de rénovation d'appartements - Rénovation complète, intérieure et extérieure. Artisan professionnel. Devis gratuit."} />
        <link rel="canonical" href={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/appartements" : "https://groupe-bml-renovation.fr/appartements"} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation",
            "description": isGrenoble ? "Entreprise de rénovation d'appartements à Grenoble - Travaux complètes de rénovation intérieure et extérieure" : "Entreprise de rénovation complète d'appartements - Travaux de rénovation intérieure et extérieure",
            "url": isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/appartements" : "https://groupe-bml-renovation.fr/appartements",
            "areaServed": isGrenoble ? "Grenoble" : "FR",
            "address": isGrenoble ? {
              "@type": "PostalAddress",
              "addressLocality": "Grenoble",
              "addressRegion": "Isère",
              "addressCountry": "FR"
            } : undefined,
            "services": [
              {
                "@type": "Service",
                "name": "Rénovation Appartements Complète",
                "description": isGrenoble ? "Rénovation d'appartements anciens et modernes à Grenoble avec tous les corps de métier" : "Rénovation d'appartements anciens et complète avec tous les corps de métier"
              },
              {
                "@type": "Service",
                "name": "Travaux de Rénovation Appartement",
                "description": isGrenoble ? "Travaux de rénovation d'appartements intérieure et extérieure à Grenoble et région Isère" : "Travaux de rénovation d'appartements intérieure et extérieure"
              },
              {
                "@type": "Service",
                "name": "Rénovation Intérieure",
                "description": "Transformation d'intérieur et rénovation complète d'appartement"
              },
              {
                "@type": "Service",
                "name": "Travaux de Peinture Bâtiment",
                "description": "Travaux de peinture en bâtiment pour appartement"
              },
              {
                "@type": "Service",
                "name": "Artisan Rénovation Appartement",
                "description": "Artisan spécialisé en rénovation d'appartements et travaux bâtiment"
              }
            ]
          })}
        </script>
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
            alt="Rénovation Appartements"
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
              Rénovation<br />d'appartements{isGrenoble && ' à Grenoble'}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Rénover votre appartement à Grenoble en espace moderne et fonctionnel' : 'Transformez votre espace de vie en appartement moderne et fonctionnel'}
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
                APPARTEMENTS
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Rénovation d'appartements complète{isGrenoble && ' à Grenoble'}</span>{' '}
                <span className="text-slate-900">qui</span><br />
                <span className="text-slate-900">reflète votre style de vie.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble ? "Transformez votre appartement grenoblois en espace de vie moderne, lumineux et confortable, tout en respectant les contraintes de copropriété. À Grenoble, où le charme des immeubles anciens côtoie la vie urbaine dynamique, nous créons des appartements qui allient fonctionnalité et style." : "Transformez votre appartement en un espace de vie moderne, lumineux et parfaitement adapté à vos besoins, tout en respectant les contraintes de copropriété."}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble ? (
                  <>
                    <strong>Groupe BML Rénovation</strong> est implanté à Grenoble depuis plusieurs années et possède une expertise reconnue dans la rénovation d'appartements en Isère. Notre équipe <strong>vous conseille et vous accompagne</strong> dans le choix des matériaux et des aménagements adaptés au climat et aux styles grenoblois pour créer l'intérieur idéal.
                  </>
                ) : (
                  <>
                    <strong>Groupe BML Rénovation</strong> vous accompagne dans la <strong>rénovation complète</strong> de votre appartement. Notre équipe <strong>vous conseille et vous accompagne</strong> dans le choix des matériaux et des aménagements pour créer l'intérieur idéal.
                  </>
                )}
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble ? "Que vous occupiez un T3 en copropriété à Grenoble, un studio au centre-ville ou un loft à rénover, nos experts en rénovation mettent leur savoir-faire local à votre service pour réaliser un projet sur mesure qui transforme votre quotidien et valorise votre investissement immobilier en Isère." : "Que vous souhaitiez moderniser un appartement ancien, réaménager les espaces de vie ou optimiser chaque mètre carré, nos experts en rénovation mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui transforme votre quotidien et valorise votre patrimoine."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Pour%20appartement.mp4"
                className="w-full h-[450px] object-cover"
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
                RÉNOVATION APPARTEMENTS
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Entreprise rénovation<br />d'appartements{isGrenoble && ' à Grenoble'}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                {isGrenoble ? "Groupe BML Rénovation tout corps d'état conçoit et réalise des rénovations complètes d'appartements à Grenoble et en Isère. De l'étude de conception à la réalisation, nos équipes grenobloises vous accompagnent tout au long de votre projet personnalisé en respectant les contraintes de copropriété des immeubles isérois." : "Groupe BML Rénovation tout corps d'état conçoit et réalise des rénovations complètes d'appartements. De l'étude de conception à la réalisation, nos équipes vous accompagnent tout au long de votre projet personnalisé en respectant les contraintes de copropriété."}
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble ? "Notre approche globale à Grenoble garantit une prise en charge complète de votre projet : analyse de vos besoins spécifiques, recommandations sur les matériaux adaptés au climat alpin, visualisation 3D offerte, et suivi rigoureux de chaque étape de réalisation par nos artisans locaux." : "Notre approche globale garantit une prise en charge complète de votre projet : analyse de vos besoins, recommandations sur les matériaux et équipements, visualisation 3D offerte, et suivi rigoureux de chaque étape de réalisation."}
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
                  <ul className="space-y-2 text-base text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Rénovation complète d'appartement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Réaménagement des espaces de vie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Optimisation de la luminosité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Modernisation cuisine et salle de bain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Amélioration thermique et acoustique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise aux normes électriques</span>
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
                  <p className="text-base text-slate-600 leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en rénovation d'appartements, que ce soit pour moderniser un bien ancien ou créer des espaces de vie entièrement sur mesure et conformes aux attentes actuelles.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour transformer votre appartement.
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
                Travaux de rénovation<br />d'appartements à votre service
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la rénovation complète d'appartements. Notre expertise couvre tous les aspects de la transformation : aménagement intérieur, menuiserie sur mesure, électricité, plomberie, chauffage, climatisation, isolation acoustique et thermique, et revêtements sols et murs pour créer un espace de vie confortable et moderne.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white px-4 pb-6" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 21V9L12 3L21 9V21H3Z" strokeLinejoin="round" />
                  <rect x="9" y="11" width="6" height="10" />
                  <line x1="6" y1="14" x2="8" y2="14" />
                  <line x1="6" y1="17" x2="8" y2="17" />
                  <line x1="16" y1="14" x2="18" y2="14" />
                  <line x1="16" y1="17" x2="18" y2="17" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider text-center leading-tight">Rénovation intérieure</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-base text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Studios et appartements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Cuisines ouvertes et fermées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Salles de bain et sanitaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chambres et dressings</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Salons et espaces de vie</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white px-4 pb-6" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider text-center leading-tight">Artisan rénovation</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-base text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Aménagement et menuiserie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Électricité et domotique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Plomberie et sanitaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chauffage et climatisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Peinture et décoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Revêtements sols et murs</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-44 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white px-4 pb-6" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" strokeLinejoin="round" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider text-center leading-tight">Rénovation extérieure</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-base text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Étude et conception 3D</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Respect contraintes copropriété</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Coordination multi-corps d'état</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Isolation acoustique et thermique</span>
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
              Transformez Votre Appartement d'Exception
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Découvrez comment nos réalisations d'appartements peuvent inspirer votre prochain projet de rénovation.
            </p>
            <p className="text-base mb-8 opacity-90">
              Contactez-nous pour recevoir un devis personnalisé et gratuit adapté à votre appartement.
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

      <ServiceFAQ 
        items={appartementFAQs} 
        title={isGrenoble ? "FAQ Rénovation Appartement Grenoble" : "FAQ Rénovation Appartement"}
        description={isGrenoble ? "Retrouvez les réponses à vos questions sur la rénovation d'appartements à Grenoble et en Isère." : "Retrouvez les réponses à vos questions sur la rénovation complète d'appartements."}
      />

      <PartnersSection />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />

    </div>
  );
};

export default Appartements;
