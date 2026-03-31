import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface PeintureProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1647152398270-298d7cc31ea1?w=1200&q=80',
    'https://images.unsplash.com/photo-1704428381312-0579346a779c?w=1200&q=80',
    'https://images.unsplash.com/photo-1647996179012-66b87eba3d17?w=1200&q=80',
    'https://images.unsplash.com/photo-1755433327834-0229e7946308?w=1200&q=80',
    'https://images.unsplash.com/photo-1718894070147-0c1e1921da93?w=1200&q=80',
    'https://images.unsplash.com/photo-1721739226205-de577527482f?w=1200&q=80',
    'https://images.unsplash.com/photo-1647152398270-298d7cc31ea1?w=1200&q=80',
    'https://images.unsplash.com/photo-1704428381312-0579346a779c?w=1200&q=80',
    'https://images.unsplash.com/photo-1647996179012-66b87eba3d17?w=1200&q=80',
    'https://images.unsplash.com/photo-1755433327834-0229e7946308?w=1200&q=80',
    'https://images.unsplash.com/photo-1718894070147-0c1e1921da93?w=1200&q=80',
    'https://images.unsplash.com/photo-1721739226205-de577527482f?w=1200&q=80',
    'https://images.unsplash.com/photo-1647152398270-298d7cc31ea1?w=1200&q=80',
    'https://images.unsplash.com/photo-1704428381312-0579346a779c?w=1200&q=80',
    'https://images.unsplash.com/photo-1647996179012-66b87eba3d17?w=1200&q=80',
    'https://images.unsplash.com/photo-1755433327834-0229e7946308?w=1200&q=80'
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
                    alt={`Travaux de Peinture ${index + 1}`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll" aria-hidden="true">
              {images.map((img, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <OptimizedImage
                    src={img}
                    alt={`Travaux de Peinture ${index + 1}`}
                    className="w-full h-full hover:scale-105 transition-transform duration-500"
                    loading="lazy"
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

const Peinture: React.FC<PeintureProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Peinture Grenoble | Peintre en Bâtiment | Rénovation Maison | Groupe BML' : 'Rénovation Maison Peinture | Peintre en Bâtiment | Travaux de Rénovation | Groupe BML'}</title>
        <meta name="description" content={isGrenoble ? "Travaux de peinture à Grenoble et région. Peintre en bâtiment professionnel, peintures intérieure et extérieure, ravalement de façade, devis gratuit. Spécialiste rénovation maison Grenoble." : "Rénovation maison avec travaux de peinture intérieure et extérieure. Peintre en bâtiment professionnel, peintures écologiques, ravalement de façade. Entreprise de rénovation, devis gratuit."} />
        <meta name="keywords" content={isGrenoble ? "peinture Grenoble, peintre Grenoble, travaux peinture Grenoble, rénovation Grenoble, rénovation maison Grenoble, peintre en bâtiment Grenoble, travaux rénovation Grenoble, peinture intérieure Grenoble, peinture extérieure Grenoble, ravalement façade Grenoble, devis peinture Grenoble" : "rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation"} />
        <meta property="og:title" content={isGrenoble ? "Peinture Grenoble | Peintre en Bâtiment | Rénovation Maison" : "Rénovation Maison Peinture | Peintre en Bâtiment | Groupe BML"} />
        <meta property="og:description" content={isGrenoble ? "Services de peinture à Grenoble - Peintre en bâtiment professionnel, peintures intérieure et extérieure, finitions impeccables, devis gratuit." : "Travaux de peinture professionnels pour rénovation maison. Peintre en bâtiment expert, peintures écologiques, ravalement de façade, finitions impeccables."} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? "Peinture Grenoble | Peintre en Bâtiment BML" : "Rénovation Maison Peinture | Peintre en Bâtiment BML"} />
        <meta name="twitter:description" content={isGrenoble ? "Travaux de peinture à Grenoble. Peintre professionnel, rénovation maison, travaux intérieur et extérieur, devis gratuit." : "Services de peinture pour rénovation maison. Peintre en bâtiment, travaux de rénovation intérieure et extérieure, devis gratuit."} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation",
            "description": isGrenoble ? "Entreprise de peinture à Grenoble spécialisée en travaux de peinture intérieure et extérieure, rénovation maison, peintre en bâtiment" : "Entreprise de rénovation spécialisée en peinture intérieure et extérieure, travaux de rénovation maison, peintre en bâtiment",
            "url": "https://groupe-bml-renovation.fr",
            "telephone": "+33756915997",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR",
              ...(isGrenoble && { "addressLocality": "Grenoble", "postalCode": "38000" })
            },
            "areaServed": isGrenoble ? "Grenoble, Isère" : "France",
            "service": [
              {
                "@type": "Service",
                "name": "Rénovation Maison Complète",
                "description": "Travaux de rénovation maison complète incluant peinture intérieure et extérieure"
              },
              {
                "@type": "Service",
                "name": "Travaux de Rénovation Maison",
                "description": "Rénovation maison ancienne et moderne avec peintre en bâtiment professionnel"
              },
              {
                "@type": "Service",
                "name": "Peintre en Bâtiment",
                "description": "Services de peintre en bâtiment, travaux de peinture bâtiment intérieure et extérieure"
              },
              {
                "@type": "Service",
                "name": "Peinture Intérieure et Extérieure",
                "description": "Rénovation intérieure et rénovation extérieure avec peintures écologiques"
              },
              {
                "@type": "Service",
                "name": "Artisan Rénovation Maison",
                "description": "Entreprise de rénovation - Rénover une maison avec peinture professionnelle"
              },
              {
                "@type": "Service",
                "name": "Ravalement de Façade",
                "description": "Travaux de rénovation extérieure incluant ravalement et peinture de façade"
              },
              {
                "@type": "Service",
                "name": "Travaux de Peinture Bâtiment",
                "description": "Peinture bâtiment avec coût et prix rénovation compétitifs"
              }
            ]
          })}
        </script>
      </Helmet>
      <div className="sr-only">
        <h2>Rénovation Maison Peinture</h2>
        <p>Peintre en bâtiment professionnel pour travaux de rénovation maison complète</p>
        <h3>Travaux de Rénovation Intérieure et Extérieure</h3>
        <h3>Entreprise de Rénovation Peinture</h3>
        <h3>Rénover une Maison avec Expertise</h3>
        <h3>Peintures Écologiques et Travaux Bâtiment</h3>
        <h3>Artisan Rénovation Maison avec Garantie</h3>
      </div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1634822929331-ee4dc2c97fc4?w=1600&q=80"
            alt="Travaux de Peinture"
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
                  Peinture<br />à Grenoble
                </>
              ) : (
                <>
                  Travaux de<br />peinture
                </>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "Services professionnels de peinture à Grenoble et région" : "Transformez vos espaces avec des finitions impeccables"}
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
                TRAVAUX DE PEINTURE
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                {isGrenoble ? (
                  <>
                    <span className="text-[#38bdf8] font-normal">Peinture à Grenoble</span>{' '}
                    <span className="text-slate-900">pour transformer</span><br />
                    <span className="text-slate-900">vos espaces.</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#38bdf8] font-normal">Transformer vos espaces</span>{' '}
                    <span className="text-slate-900">avec des</span><br />
                    <span className="text-slate-900">finitions impeccables.</span>
                  </>
                )}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                {isGrenoble
                  ? "À Grenoble, Groupe BML Rénovation excelle dans tous vos travaux de peinture intérieure et extérieure. Redonnez vie à vos intérieurs et protégez vos façades avec des solutions adaptées à chaque surface et à votre environnement local."
                  : "Redonnez vie à vos intérieurs et protégez vos façades avec des solutions de peinture adaptées à chaque surface et chaque besoin, pour un résultat esthétique et durable."}
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> {isGrenoble ? "à Grenoble " : ""}vous accompagne dans tous vos <strong>travaux de peinture intérieure et extérieure</strong>. Notre équipe locale <strong>vous conseille et vous accompagne</strong> dans le choix des couleurs, des finitions et des produits pour sublimer votre intérieur.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                {isGrenoble
                  ? "À Grenoble et en Isère, que vous souhaitiez rafraîchir une pièce, créer une atmosphère chaleureuse avec des couleurs tendance, protéger une façade ou donner du caractère à vos murs avec des effets décoratifs, nos peintres grenoblois qualifiés mettent leur expertise à votre service pour des finitions soignées et un résultat à la hauteur de vos attentes."
                  : "Que vous souhaitiez rafraîchir une pièce, créer une atmosphère chaleureuse avec des couleurs tendance, protéger une façade ou donner du caractère à vos murs avec des effets décoratifs, nos peintres qualifiés mettent leur expertise à votre service pour des finitions soignées et un résultat à la hauteur de vos attentes."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1678762200388-51e11225d4de?w=1200&q=80"
                alt="Travaux de Peinture"
                className="w-full h-[450px] object-cover"
                loading="lazy"
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
                {isGrenoble ? "PEINTURE À GRENOBLE" : "TRAVAUX DE PEINTURE"}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                {isGrenoble ? "Peinture professionnel à Grenoble" : "Donner vie à vos espaces"}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                {isGrenoble
                  ? "À Grenoble et en Isère, Groupe BML Rénovation réalise tous types de travaux de peinture intérieure et extérieure. De la préparation minutieuse des supports aux finitions soignées, nos peintres grenoblois professionnels vous accompagnent pour un résultat impeccable qui transforme et protège durablement vos espaces."
                  : "Groupe BML Rénovation réalise tous types de travaux de peinture intérieure et extérieure. De la préparation minutieuse des supports aux finitions soignées, nos peintres professionnels vous accompagnent pour un résultat impeccable qui transforme et protège durablement vos espaces."}
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                {isGrenoble
                  ? "Notre approche globale garantit une prise en charge complète de votre projet grenoblois : diagnostic des surfaces, conseil en harmonisation colorimétrique, sélection des peintures adaptées à l'usage et aux contraintes techniques de la région, préparation rigoureuse, et application professionnelle pour des finitions parfaites qui valorisent votre bien."
                  : "Notre approche globale garantit une prise en charge complète de votre projet : diagnostic des surfaces, conseil en harmonisation colorimétrique, sélection des peintures adaptées à l'usage et aux contraintes techniques, préparation rigoureuse, et application professionnelle pour des finitions parfaites qui valorisent votre bien."}
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
                      <span>Peinture intérieure murs et plafonds</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Peinture boiseries et menuiseries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Ravalement de façade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Enduits décoratifs et effets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Peintures écologiques sans COV</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Conseil en colorimétrie</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en peinture, que ce soit pour rafraîchir un intérieur, protéger durablement vos façades ou créer des ambiances personnalisées avec des finitions haut de gamme.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Prêt à Transformer Votre Maison à Grenoble ?" : "Prêt à Démarrer Votre Projet ?"}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble
                    ? "Notre équipe d'experts grenoblois est à votre écoute pour transformer votre intérieur."
                    : "Notre équipe d'experts est à votre écoute pour transformer votre intérieur."}
                </p>
                <p className="text-base mb-8 opacity-90">
                  {isGrenoble
                    ? "Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé adapté à Grenoble et sa région."
                    : "Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé."}
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
                {isGrenoble ? "EXPERTISE À GRENOBLE" : "COMPÉTENCES"}
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                {isGrenoble ? "Notre expertise peinture à Grenoble" : "Notre savoir-faire à votre service"}
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed">
                {isGrenoble
                  ? "À Grenoble et en Isère, Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans tous types de travaux de peinture. Notre expertise couvre l'ensemble des techniques : préparation et traitement des supports, peintures acryliques et glycéro, enduits décoratifs, lasures et vernis, ravalement de façades, et finitions décoratives pour un résultat qui allie esthétique et protection durable."
                  : "Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans tous types de travaux de peinture. Notre expertise couvre l'ensemble des techniques : préparation et traitement des supports, peintures acryliques et glycéro, enduits décoratifs, lasures et vernis, ravalement de façades, et finitions décoratives pour un résultat qui allie esthétique et protection durable."}
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
                    <span>Appartements et maisons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Locaux commerciaux</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Bureaux professionnels</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Façades et extérieurs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Pièces humides</span>
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
                <h3 className="text-lg font-bold uppercase tracking-wider">Métiers</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Préparation des supports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Peintures acryliques et glycéro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Enduits décoratifs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Effets et patines</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Ravalement de façades</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Peintures écologiques</span>
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
                    <span>Conseil en colorimétrie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Diagnostic des supports</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Application soignée</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Protection des lieux</span>
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

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
        <div className="w-full max-w-none">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {isGrenoble ? "Transformez Votre Maison à Grenoble" : "Vos Murs et Façades Méritent une Transformation d'Exception"}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {isGrenoble
                ? "Découvrez comment nos projets de peinture à Grenoble transforment vos espaces avec des finitions professionnelles et durables."
                : "Découvrez comment nos projets de peinture transforment vos espaces avec des finitions professionnelles et durables."}
            </p>
            <p className="text-base mb-8 opacity-90">
              {isGrenoble
                ? "Contactez-nous pour recevoir un devis personnalisé et gratuit adapté à vos travaux de peinture à Grenoble et en Isère."
                : "Contactez-nous pour recevoir un devis personnalisé et gratuit adapté à vos travaux de peinture."}
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

      <PartnersSection
        title="Nos Partenaires"
        description={isGrenoble ? "À Grenoble, Groupe BML Rénovation collabore avec les plus grands fabricants de peinture professionnelle pour garantir la qualité et la durabilité de vos travaux de peinture." : "Groupe BML Rénovation collabore avec les plus grands fabricants de peinture professionnelle pour garantir la qualité et la durabilité de vos travaux de peinture."}
        partners={[
          {
            name: 'Tollens',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/tollens%402x%20(1).jpg'
          },
          {
            name: 'Gauthier',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gauthier%402x.jpg'
          },
          {
            name: 'Zolpan',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/logo-partenaire-zolpan.png'
          },
          {
            name: 'Seigneurie',
            logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/seigneurerie%402x.jpg'
          }
        ]}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Peinture;
