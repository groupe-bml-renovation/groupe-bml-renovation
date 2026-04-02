import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Phone, Check, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface BorneElectriqueProps {
  onBack: () => void;
  onNavigate?: () => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const imageWidth = 320 + 24;
  const scrollAmount = 400;

  const images = [
    'https://images.unsplash.com/photo-1600490819528-42405785433a?w=800&q=80',
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069',
    'https://images.unsplash.com/photo-1576446468729-7674e99608f5?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1559027615-cd2628902d4a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070'
  ];

  const totalImageWidth = imageWidth * images.length;

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const threshold = 50;

      if (currentScroll <= threshold) {
        scrollContainerRef.current.scrollLeft = totalImageWidth - scrollAmount - 50;
      } else {
        scrollContainerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
      const threshold = 50;

      if (currentScroll >= maxScroll - threshold) {
        scrollContainerRef.current.scrollLeft = 50;
      } else {
        scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
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
                    alt={`Installation borne électrique - Véhicule électrique ${index + 1}`}
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
                    alt={`Installation borne électrique - Véhicule électrique ${index + 1}`}
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

const BorneElectrique: React.FC<BorneElectriqueProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();

  const electricalPartners = [
    {
      name: 'Legrand',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/legrand%402x.jpg'
    },
    {
      name: 'Siemens',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/siemens%402x.jpg'
    },
    {
      name: 'Schneider',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/schneider%402x.jpg'
    }
  ];

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Installation Borne Électrique | Recharge Véhicule Électrique | Groupe BML</title>
        <meta name="description" content="Installation de bornes de recharge pour véhicules électriques. Solutions complètes pour votre maison ou entreprise. Devis gratuit, installation conforme aux normes." />
        <meta name="keywords" content="borne électrique, borne recharge, véhicule électrique, installation borne, recharge voiture électrique, wallbox, charge rapide" />
        <meta property="og:title" content="Installation Borne Électrique | Groupe BML" />
        <meta property="og:description" content="Installation de bornes de recharge pour véhicules électriques. Solutions complètes et conformes aux normes. Devis gratuit." />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fr_FR" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Installation Borne Électrique | Groupe BML" />
        <meta name="twitter:description" content="Installation de bornes de recharge pour véhicules électriques. Entreprise qualifiée, devis gratuit." />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation",
            "description": "Installation de bornes de recharge pour véhicules électriques",
            "url": typeof window !== 'undefined' ? window.location.origin : '',
            "telephone": "+33123456789",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            },
            "areaServed": "FR",
            "serviceType": ["Installation Borne Électrique", "Recharge Véhicule Électrique"],
            "priceRange": "$$$"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": typeof window !== 'undefined' ? window.location.origin : ''
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": typeof window !== 'undefined' ? `${window.location.origin}/services` : ''
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Installation Borne Électrique",
                "item": typeof window !== 'undefined' ? window.location.href : ''
              }
            ]
          })}
        </script>
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1600490819528-42405785433a?w=1600&q=80"
            alt="Installation borne électrique pour véhicules électriques"
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
              Installation<br />borne électrique
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              Recharge de véhicules électriques sécurisée et conforme
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
                SOLUTIONS ÉLECTRIQUES
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Passez à l'électrique</span>{' '}
                <span className="text-slate-900">en toute sérénité.</span>
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                Groupe BML Rénovation vous propose une solution clé en main pour l'installation de bornes de recharge pour véhicules électriques. Profitez d'une recharge rapide et confortable à domicile ou en entreprise.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                <strong>Installation conforme aux normes</strong> les plus strictes, réalisée par des électriciens qualifiés et expérimentés. Nous gérons l'étude de faisabilité, les démarches administratives et l'installation complète.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Faites le choix de la mobilité électrique durable avec une borne de recharge adaptée à vos besoins, compatible avec tous les modèles de véhicules électriques et équipée des dernières technologies de charge intelligente.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2069"
                alt="Installation wallbox borne électrique"
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
                EXPERTISE ÉLECTRIQUE
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Bornes de recharge<br />pour tous les besoins
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                Groupe BML Rénovation vous propose une gamme complète de solutions de recharge. Du chargeur mural compacte aux bornes rapides, nous adaptons la solution à votre utilisation et à votre budget.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Bénéficiez également des aides et des crédits d'impôt disponibles pour l'installation de bornes de recharge. Notre équipe vous guide dans toutes vos démarches administratives.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Zap className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Votre projet</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#4a5568]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Diagnostic technique complet</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation wallbox 7kW ou 11kW</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Borne de recharge rapide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Recharge intelligente connectée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise en conformité électrique</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Nos avantages</h3>
                  </div>
                  <p className="text-sm text-[#4a5568] leading-relaxed">
                    Installation réalisée par électriciens qualifiés, conforme aux normes, avec assistance pour les aides gouvernementales, et garantie décennale sur les travaux.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Installer Votre Borne ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Franchissez le pas vers la mobilité électrique durable.
                </p>
                <p className="text-base mb-8 opacity-90">
                  Contactez-nous pour un diagnostic technique gratuit.
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

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 bg-slate-50">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Prêt pour la Recharge Électrique ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Installation de borne de recharge conforme et performante.
            </p>
            <p className="text-base mb-8 opacity-90">
              Nos experts vous accompagnent de A à Z pour votre projet.
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

      <PartnersSection partners={electricalPartners} />

      <FooterSection onNavigate={onBack} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default BorneElectrique;
