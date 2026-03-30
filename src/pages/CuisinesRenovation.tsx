import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';

interface CuisinesRenovationProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/0113%20(2).mp4',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80'
  ];

  const imageWidth = 320 + 24;
  const totalImagesWidth = images.length * imageWidth;

  const handleScroll = () => {
    if (!scrollContainerRef.current || !innerDivRef.current) return;

    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const scrollWidth = innerDivRef.current.scrollWidth;
    const clientWidth = scrollContainerRef.current.clientWidth;

    if (scrollLeft + clientWidth >= scrollWidth - 100) {
      scrollContainerRef.current.scrollLeft = totalImagesWidth / 2;
    } else if (scrollLeft <= 100) {
      scrollContainerRef.current.scrollLeft = totalImagesWidth / 2;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      setTimeout(handleScroll, 600);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      setTimeout(handleScroll, 600);
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
            ref={innerDivRef}
            className="infinite-scroll flex gap-6 w-max"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {[...Array(5)].map((_, setIndex) => (
              <div key={`set-${setIndex}`} className="flex gap-6">
                {images.map((media, imgIndex) => (
                  <div key={`${setIndex}-${imgIndex}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
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
                        alt={`Travaux de rénovation maison cuisine ${imgIndex + 1} - Rénovation maison complète par artisan rénovation`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CuisinesRenovation: React.FC<CuisinesRenovationProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Rénovation Cuisines à Grenoble | Travaux de Rénovation Complète | Groupe BML' : 'Rénovation Maison Cuisines | Travaux de Rénovation Complète | Entreprise BML'}</title>
        <meta name="description" content={isGrenoble ? "Rénovation cuisines à Grenoble et Isère. Travaux de rénovation complète de cuisines par Groupe BML. Agencement sur mesure, plans de travail, électroménager. Devis gratuit." : "Rénovation maison et travaux de rénovation complète de cuisines. Entreprise de rénovation spécialisée en rénovation intérieure et extérieure. Artisan rénovation maison, peintre en bâtiment. Coût et prix rénovation compétitifs. Devis gratuit."} />
        <meta name="keywords" content={isGrenoble ? "rénovation cuisines Grenoble, rénovation cuisine Isère, agencement cuisine Grenoble, rénovation maison Grenoble, travaux rénovation Grenoble, entreprise rénovation cuisine, devis cuisine gratuit, cuisine sur mesure Grenoble" : "rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation"} />
        <meta name="geo.region" content={isGrenoble ? "FR-38" : undefined} />
        <meta name="geo.placename" content={isGrenoble ? "Grenoble" : undefined} />
        <meta property="og:title" content={isGrenoble ? "Rénovation Cuisines à Grenoble | Travaux de Rénovation Complète | Groupe BML" : "Rénovation Maison Cuisines | Travaux de Rénovation Complète | Groupe BML"} />
        <meta property="og:description" content={isGrenoble ? "Rénovation cuisines à Grenoble. Agencement sur mesure, plans de travail, électroménager. Entreprise spécialisée en travaux de rénovation intérieure." : "Entreprise de rénovation spécialisée en travaux de rénovation maison complète. Rénovation intérieure et extérieure, cuisine, artisan rénovation."} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? "Rénovation Cuisines à Grenoble | Travaux de Rénovation BML" : "Rénovation Maison Cuisines | Travaux de Rénovation BML"} />
        <meta name="twitter:description" content={isGrenoble ? "Rénovation cuisines à Grenoble et Isère. Agencement sur mesure, devis gratuit." : "Travaux de rénovation complète : rénovation maison, rénovation intérieure, extérieure. Peintre en bâtiment, artisan rénovation maison."} />
        <link rel="canonical" href={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/cuisines" : "https://groupe-bml-renovation.fr/cuisines"} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation",
            "description": isGrenoble ? "Entreprise de rénovation à Grenoble spécialisée en rénovation complète de cuisines, agencement sur mesure, travaux tous corps d'état" : "Entreprise de rénovation spécialisée en rénovation maison complète, travaux de rénovation intérieure et extérieure, peinture en bâtiment",
            "url": "https://groupe-bml-renovation.fr",
            "telephone": "+33",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR",
              ...(isGrenoble && { "addressLocality": "Grenoble", "addressRegion": "Isère" })
            },
            "areaServed": isGrenoble ? "Grenoble, Isère" : "France",
            "service": [
              {
                "@type": "Service",
                "name": isGrenoble ? "Rénovation Cuisines à Grenoble" : "Rénovation Maison Complète",
                "description": isGrenoble ? "Rénovation complète de cuisines à Grenoble avec agencement sur mesure, plans de travail, électroménager" : "Travaux de rénovation maison complète incluant rénovation intérieure et extérieure"
              },
              {
                "@type": "Service",
                "name": "Agencement et Design Intérieur",
                "description": isGrenoble ? "Conception et agencement cuisines personnalisées à Grenoble" : "Rénovation maison ancienne et moderne, rénovation maison prix et coût compétitifs"
              },
              {
                "@type": "Service",
                "name": "Installation Électroménager",
                "description": "Installation professionnelle d'électroménager encastrable et équipements"
              },
              {
                "@type": "Service",
                "name": "Plomberie et Électricité",
                "description": "Services de plomberie et électricité aux normes pour rénovation cuisines"
              },
              {
                "@type": "Service",
                "name": "Plans de Travail",
                "description": "Fourniture et pose de plans de travail sur mesure"
              },
              {
                "@type": "Service",
                "name": "Finitions",
                "description": "Carrelage, crédences, peinture et finitions haut de gamme"
              }
            ]
          })}
        </script>
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden pb-12" aria-label="Section de rénovation maison cuisines - Travaux de rénovation complète">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80"
            alt="Rénovation maison cuisines - Travaux de rénovation complète par entreprise de rénovation"
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
              Rénovations de<br />cuisines{isGrenoble && <span> à Grenoble</span>}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Transformez votre cuisine à Grenoble' : 'Créez la cuisine de vos rêves'}
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
                CUISINES
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Créer la cuisine</span>{' '}
                <span className="text-slate-900">qui correspond</span><br />
                <span className="text-slate-900">à vos envies{isGrenoble && ' à Grenoble'}.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Transformez votre cuisine en un espace fonctionnel et esthétique,
                parfaitement adapté à vos habitudes culinaires et vos moments de partage en famille.
                {isGrenoble && ' À Grenoble, Groupe BML Rénovation conçoit des cuisines sur mesure pour les résidents de la métropole.'}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous accompagne dans la <strong>rénovation
                complète</strong> de votre cuisine{isGrenoble && ' à Grenoble et en Isère'}. Notre équipe <strong>vous conseille et vous
                accompagne</strong> dans le choix des matériaux, des équipements et de l'agencement pour créer l'espace culinaire idéal.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous souhaitiez créer une cuisine moderne et équipée, installer un îlot central,
                optimiser l'espace de rangement ou créer une cuisine ouverte sur le salon, nos experts en rénovation
                {isGrenoble && ' grenoblois'} mettent leur savoir-faire à votre service pour réaliser un projet sur mesure qui transforme
                votre cuisine en un lieu à la fois pratique et convivial.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/0113%20(2).mp4"
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
                RÉNOVATION CUISINES
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Transformer votre<br />espace culinaire{isGrenoble && <span className="text-slate-900"> à Grenoble</span>}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                Groupe BML Rénovation tout corps d'état conçoit et réalise des rénovations complètes de cuisines{isGrenoble && ' à Grenoble et en Isère'}. De l'étude de conception à la réalisation, nos équipes vous accompagnent tout au long de votre projet personnalisé pour créer un espace harmonieux qui allie fonctionnalité et esthétisme.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : analyse de vos besoins et de vos habitudes culinaires, conseils en aménagement et ergonomie, recommandations sur les équipements, l'électroménager et les finitions, et suivi rigoureux de chaque étape de réalisation{isGrenoble && ' dans la région grenobloise'}.
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
                      <span>Rénovation complète de cuisine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation d'îlots centraux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Création de cuisines ouvertes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Optimisation des rangements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation d'électroménager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Plans de travail sur mesure</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en rénovation de cuisines, que ce soit pour créer un espace contemporain et high-tech ou une cuisine chaleureuse et conviviale parfaitement adaptée à votre mode de vie.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet {isGrenoble && '? à Grenoble'}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour transformer votre cuisine{isGrenoble && ' à Grenoble et en Isère'}.
                </p>
                <p className="text-base mb-8 opacity-90">
                  Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé.
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="inline-flex items-center gap-2 bg-white text-[#38bdf8] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                  aria-label="Demander un devis gratuit pour travaux de rénovation maison - Rénovation maison complète par entreprise de rénovation"
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
                Notre savoir-faire à<br />votre service{isGrenoble && <span className="text-[#38bdf8]"> à Grenoble</span>}
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la rénovation complète de cuisines{isGrenoble && ' à Grenoble et en Isère'}. Notre expertise couvre tous les aspects de la transformation : conception d'agencement sur mesure, installation d'îlots centraux, pose de plans de travail nobles, optimisation de l'éclairage LED, installation d'électroménager encastrable, création de rangements intelligents, plomberie et électricité aux normes, et finitions haut de gamme.
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
                    <span>Cuisines modernes et équipées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Cuisines ouvertes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Cuisines avec îlot central</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Cuisinettes et kitchenettes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Cuisines professionnelles</span>
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
                    <span>Plans de travail sur mesure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Meubles et rangements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Électroménager encastrable</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Plomberie et robinetterie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Électricité et éclairage LED</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Carrelage et crédences</span>
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
                    <span>Conseils aménagement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Coordination tous corps d'état</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Installation équipements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Gestion projet clés en main</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 bg-white" aria-label={isGrenoble ? "Devis gratuit rénovation cuisine Grenoble - Rénovation Isère" : "Devis gratuit rénovation maison - Artisan rénovation et entreprise bâtiment rénovation"}>
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Inspiré par Nos Rénovations de Cuisines {isGrenoble && '? à Grenoble'}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble ? 'À Grenoble et en Isère, chaque cuisine que nous rénovons devient un véritable espace de vie convivial et fonctionnel.' : 'Chaque cuisine que nous créons devient un véritable espace de vie convivial et fonctionnel.'}
            </p>
            <p className="text-base mb-8 opacity-90">
              Créons ensemble votre cuisine idéale{isGrenoble && ' à Grenoble'} avec des équipements modernes, un agencement optimisé et un devis gratuit personnalisé.
            </p>
            <button
              onClick={scrollToContactForm}
              className="inline-flex items-center gap-2 bg-white text-[#38bdf8] px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              aria-label="Obtenir un devis pour rénovation maison complète - Prix et coût rénovation maison - Peintre en bâtiment et travaux de rénovation"
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

export default CuisinesRenovation;
