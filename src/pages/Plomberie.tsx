import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface PlomberieProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1676210134188-4c05dd172f89?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1676210133055-eab6ef033ce3?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1676210134190-3f2c0d5cf58d?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1723257892379-270639bac995?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500',
    'https://images.unsplash.com/photo-1722764372505-f601d7df783b?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=500'
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
                    alt={`Rénovation maison - Travaux de rénovation intérieure et plomberie ${index + 1}`}
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
                    alt={`Rénovation maison - Travaux de rénovation intérieure et plomberie ${index + 1}`}
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

const Plomberie: React.FC<PlomberieProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? "Plomberie Grenoble - Travaux de Rénovation | Groupe BML" : "Plomberie Rénovation Maison - Travaux de Rénovation | Groupe BML"}</title>
        <meta name="description" content={isGrenoble ? "Travaux de plomberie à Grenoble (Isère) par Groupe BML. Installation sanitaire, chauffage, réparation de fuites. Entreprise de plomberie rénovation maison à Grenoble. Devis gratuit." : "Travaux de rénovation maison incluant plomberie complète. Entreprise de rénovation expert en rénovation intérieure et extérieure. Artisan rénovation maison, devis gratuit pour rénovation maison ancienne et rénovation maison complète. Coût et prix rénovation maison."} />
        <meta name="keywords" content={isGrenoble ? "plomberie grenoble, plombier grenoble, travaux plomberie grenoble, installation sanitaire grenoble, chauffage grenoble, rénovation maison grenoble, dépannage plomberie grenoble, plomberie isère" : "rénovation maison, travaux de rénovation maison, entreprise de rénovation, rénover une maison, rénovation maison complète, rénovation maison ancienne, artisan rénovation maison, prix rénovation maison, coût rénovation maison, rénovation intérieure, rénovation extérieure, travaux maison, bâtiment travaux publics, peintre en bâtiment, travaux de peinture bâtiment, entreprise bâtiment rénovation"} />
        <meta property="og:title" content={isGrenoble ? "Plomberie Grenoble - Travaux de Rénovation | Groupe BML" : "Plomberie & Rénovation Maison Complète - Groupe BML Rénovation"} />
        <meta property="og:description" content={isGrenoble ? "Travaux de plomberie professionnels à Grenoble. Installation sanitaire, chauffage, dépannage d'urgence. Groupe BML vous accompagne pour tous vos travaux de plomberie en Isère. Devis gratuit." : "Entreprise de rénovation maison spécialisée en travaux de rénovation complets. Artisan rénovation maison avec expertise en rénovation intérieure, extérieure et aménagements."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/plomberie" : "https://groupe-bml-renovation.fr/plomberie"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? "Plomberie Grenoble | Travaux de Rénovation" : "Plomberie & Rénovation Maison | Travaux de Rénovation"} />
        <meta name="twitter:description" content={isGrenoble ? "Plomberie à Grenoble : installation sanitaire, chauffage, dépannage. Groupe BML rénovation en Isère. Devis gratuit." : "Travaux de rénovation maison et plomberie. Entreprise de rénovation offrant services complets de rénovation maison ancienne et moderne. Devis gratuit."} />
        <link rel="canonical" href={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/plomberie" : "https://groupe-bml-renovation.fr/plomberie"} />
        {isGrenoble && <meta name="geo.region" content="FR-38" />}
        {isGrenoble && <meta name="geo.placename" content="Grenoble" />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": isGrenoble ? "Groupe BML - Plomberie Grenoble" : "Groupe BML - Rénovation Maison",
            "description": isGrenoble ? "Entreprise de plomberie spécialisée à Grenoble. Installation sanitaire, chauffage, dépannage d'urgence et rénovation maison en Isère." : "Entreprise de rénovation maison spécialisée en travaux de rénovation complète, rénovation intérieure et extérieure",
            "url": "https://groupebml.com",
            "telephone": "+33...",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "",
              "addressLocality": isGrenoble ? "Grenoble" : "",
              "postalCode": isGrenoble ? "38" : "",
              "addressCountry": "FR"
            },
            "areaServed": [
              {
                "@type": "AdministrativeArea",
                "name": isGrenoble ? "Isère" : "France"
              }
            ],
            "knowsAbout": isGrenoble ? [
              "Plomberie",
              "Installation sanitaire",
              "Chauffage",
              "Dépannage plomberie",
              "Rénovation maison",
              "Travaux de rénovation",
              "Installations extérieures",
              "Réparation de fuites",
              "Débouchage canalisations"
            ] : [
              "Rénovation maison",
              "Rénovation maison complète",
              "Rénovation maison ancienne",
              "Rénovation intérieure",
              "Rénovation extérieure",
              "Travaux de rénovation maison",
              "Travaux maison",
              "Plomberie",
              "Chauffage",
              "Installations sanitaires"
            ]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": isGrenoble ? "Travaux de Plomberie à Grenoble" : "Travaux de Rénovation Maison et Plomberie",
            "description": isGrenoble ? "Service de plomberie professionnel à Grenoble incluant installation sanitaire, chauffage, dépannage d'urgence et rénovation maison en Isère" : "Service de rénovation maison complet incluant plomberie, chauffage, installations sanitaires et aménagements intérieurs",
            "provider": {
              "@type": "LocalBusiness",
              "name": isGrenoble ? "Groupe BML - Plomberie Grenoble" : "Groupe BML - Entreprise de Rénovation"
            },
            "areaServed": {
              "@type": isGrenoble ? "AdministrativeArea" : "Country",
              "name": isGrenoble ? "Grenoble, Isère" : "France"
            },
            "serviceType": isGrenoble ? [
              "Plomberie",
              "Installation sanitaire",
              "Chauffage",
              "Dépannage d'urgence",
              "Rénovation salle de bain",
              "Installations extérieures"
            ] : [
              "Rénovation maison",
              "Rénovation intérieure",
              "Rénovation extérieure",
              "Plomberie",
              "Chauffage",
              "Installations sanitaires"
            ],
            "offers": {
              "@type": "Offer",
              "priceCurrency": "EUR",
              "price": "Sur devis"
            }
          })}
        </script>
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1761330440311-16e160cad236?w=1920&q=80"
            alt="Travaux de rénovation maison - Plomberie et installations sanitaires for rénovation intérieure"
            className="w-full h-full"
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
              Travaux de<br />plomberie{isGrenoble && <span> à Grenoble</span>}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "Plomberie professionnelle à Grenoble - Installations fiables et interventions rapides" : "Des installations fiables et des interventions rapides for votre confort"}
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
                PLOMBERIE
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                {isGrenoble ? (
                  <>
                    <span className="text-[#38bdf8] font-normal">Plomberie et rénovation à Grenoble</span> <span className="text-slate-900">pour</span><br />
                    <span className="text-slate-900">vos installations sanitaires performantes</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#38bdf8] font-normal">Assurer votre confort au quotidien</span> <span className="text-slate-900">avec</span><br />
                    <span className="text-slate-900">des installations sanitaires performantes.</span>
                  </>
                )}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                {isGrenoble
                  ? "À Grenoble and en Isère, Groupe BML Rénovation vous offre des solutions de plomberie fiables et durables. Garantissez la qualité de vos installations sanitaires avec des interventions professionnelles qui allient expertise technique and service de proximité."
                  : "Garantissez la fiabilité and la durabilité de vos installations sanitaires avec des interventions professionnelles qui allient expertise technique and qualité de service."}
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                <strong>{isGrenoble ? "Groupe BML Rénovation à Grenoble" : "Groupe BML Rénovation"}</strong> vous accompagne dans tous vos <strong>travaux
                de plomberie</strong>. Notre équipe {isGrenoble && "grenobloise"} <strong>vous conseille and vous
                accompagne</strong> dans l'installation, la réparation and l'entretien de vos équipements sanitaires.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                {isGrenoble
                  ? "À Grenoble, que vous souhaitiez moderniser votre salle de bain, installer un nouveau système de chauffage, réparer une fuite urgente ou optimiser votre réseau de distribution d'eau, nos plombiers professionnels en Isère mettent leur expertise à votre service for réaliser des installations conformes and durables qui améliorent votre confort au quotidien."
                  : "Que vous souhaitiez moderniser votre salle de bain, installer un nouveau système de chauffage, réparer une fuite urgente ou optimiser votre réseau de distribution d'eau, nos plombiers professionnels mettent leur expertise à votre service for réaliser des installations conformes and durables qui améliorent votre confort au quotidien."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/flagged/photo-1600002368144-444430d3f3ca?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070"
                alt="Expert en rénovation maison - Entreprise de rénovation spécialisée en travaux de rénovation intérieure"
                className="w-full h-[450px]"
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
                TRAVAUX DE PLOMBERIE
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                {isGrenoble ? "Plomberie à Grenoble :\nOptimiser vos installations" : "Optimiser vos\ninstallations"}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                <strong>{isGrenoble ? "Groupe BML Rénovation Grenoble" : "Groupe BML Rénovation Tout Corps D'état"}</strong> réalise tous types de <strong>travaux de plomberie</strong>. De l'<strong>installation d'équipements neufs</strong> à la <strong>réparation d'urgence</strong>, nos plombiers professionnels {isGrenoble && "en Isère"} vous accompagnent pour un <strong>résultat fiable et conforme aux normes</strong> qui garantit votre confort et votre sécurité.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                {isGrenoble
                  ? "Notre expertise technique à Grenoble garantit une qualité d'exécution irréprochable : diagnostic des installations existantes, choix des équipements adaptés, conseil en optimisation énergétique, installation selon les normes en vigueur, et tests de fonctionnement rigoureux pour des installations parfaites. Nous veillons à ce que chaque intervention respecte les réglementations et améliore votre confort quotidien."
                  : "Notre expertise technique garantit une qualité d'exécution irréprochable : diagnostic des installations existantes, choix des équipements adaptés, conseil en optimisation énergétique, installation selon les normes en vigueur, et tests de fonctionnement rigoureux pour des installations parfaites. Nous veillons à ce que chaque intervention respecte les réglementations et améliore votre confort quotidien."}
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                <strong>Spécialistes de la plomberie sanitaire et du chauffage</strong> {isGrenoble && "à Grenoble"}, nous intervenons sur <strong>tous types de projets</strong> : installation de salles de bain complètes, remplacement de chaudières, création de réseaux d'eau, réparation de fuites, débouchage de canalisations, installation de chauffe-eau, et mise en conformité des installations. Chaque projet bénéficie de <strong>notre savoir-faire et notre disponibilité</strong>.
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
                      <span>Installation de salle de bain complète</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Remplacement de chaudière</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Réparation de fuites et débouchage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de chauffe-eau</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Création de réseaux d'eau</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise en conformité des installations</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en plomberie, que ce soit pour créer une nouvelle installation sanitaire, moderniser vos équipements ou intervenir en urgence sur une panne.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Besoin de Plomberie à Grenoble ?" : "Prêt à Démarrer Votre Projet ?"}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble ? "Notre équipe de plombiers grenoblois est à votre écoute pour tous vos travaux de plomberie et rénovation." : "Notre équipe d'experts est à votre écoute pour transformer votre intérieur."}
                </p>
                <p className="text-base mb-8 opacity-90">
                  {isGrenoble ? "Contactez-nous dès aujourd'hui à Grenoble pour un devis gratuit et personnalisé." : "Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé."}
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
                {isGrenoble ? "Plombier à Grenoble :\nNotre savoir-faire à votre service" : "Notre savoir-faire à\nvotre service"}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed">
                {isGrenoble
                  ? "Groupe BML Rénovation à Grenoble possède une solide expérience dans tous types de travaux de plomberie en Isère. Notre expertise couvre l'ensemble des techniques : installation sanitaire, chauffage central, traitement de l'eau, dépannage d'urgence, et entretien préventif pour un résultat qui allie performance et fiabilité durable."
                  : "Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans tous types de travaux de plomberie. Notre expertise couvre l'ensemble des techniques : installation sanitaire, chauffage central, traitement de l'eau, dépannage d'urgence, et entretien préventif pour un résultat qui allie performance et fiabilité durable."}
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
                    <span>Salles de bain et sanitaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Cuisines et espaces de vie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Buanderies et caves</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Systèmes de chauffage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Installations extérieures</span>
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
                    <span>Installation sanitaire complète</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Chauffage et climatisation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Réparation et dépannage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Détection et réparation de fuites</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Débouchage de canalisations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Traitement de l'eau</span>
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
                    <span>Diagnostic et conseil technique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Installation selon normes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Intervention d'urgence 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Entretien préventif</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Garantie décennale</span>
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isGrenoble ? "Plomberie à Grenoble - Installation et Dépannage" : "Besoin d'une Installation de Plomberie ?"}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble ? "Groupe BML vous propose des installations sanitaires fiables et conformes à Grenoble qui garantissent votre confort au quotidien." : "Des installations sanitaires fiables et conformes qui garantissent votre confort au quotidien."}
            </p>
            <p className="text-base mb-8 opacity-90">
              {isGrenoble ? "Confiez vos travaux de plomberie à nos experts grenoblois et bénéficiez d'un devis gratuit personnalisé." : "Confiez vos travaux de plomberie à nos experts et bénéficiez d'un devis gratuit personnalisé."}
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

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Plomberie;
