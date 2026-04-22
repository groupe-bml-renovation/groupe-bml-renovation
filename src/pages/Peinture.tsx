import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Pen } from 'lucide-react';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';

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
                    alt={`Travaux de Peinture ${index + 1}`}
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
        <title>{isGrenoble ? 'Travaux de peinture Grenoble | Peintre en Bâtiment | Rénovation Maison | Groupe BML' : 'Travaux de peinture | Peintre en Bâtiment | Travaux de Rénovation | Groupe BML'}</title>
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
            "url": "https://groupe-bml-renovation.com",
            "telephone": "+33756915997",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR",
              ...(isGrenoble && { "addressLocality": "Grenoble", "postalCode": "38000" })
            }
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": isGrenoble ? "Comment se déroule une rénovation peinture à Grenoble" : "Comment se déroule une rénovation peinture",
            "description": "Les étapes clés pour une rénovation de peinture réussie avec Groupe BML Rénovation.",
            "step": [
              {
                "@type": "HowToStep",
                "name": "Diagnostic et préparation",
                "text": "Analyse de l'état des murs, rebouchage et ponçage."
              },
              {
                "@type": "HowToStep",
                "name": "Protection du chantier",
                "text": "Protection des sols et meubles."
              },
              {
                "@type": "HowToStep",
                "name": "Primaire et Finition",
                "text": "Application des couches pour un rendu parfait."
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
            src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Travaux%20de%20peinture.png"
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
                  Travaux de<br />peinture à Grenoble
                </>
              ) : (
                <>
                  Travaux de<br />peinture en Isère
                </>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "Services professionnels de peinture à Grenoble et sa région" : "Services de peinture d'excellence en Isère et alentours"}
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
                  <span className="text-white font-semibold text-lg">
                    Excellent
                  </span>
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
                TRAVAUX DE PEINTURE
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble 
                    ? "Peinture à Grenoble pour transformer vos espaces" 
                    : "Peinture en Isère pour sublimer votre intérieur"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                {isGrenoble
                  ? "À Grenoble, Groupe BML Rénovation excelle dans tous vos travaux de peinture intérieure et extérieure. Redonnez vie à vos intérieurs et protégez vos façades avec des solutions adaptées à chaque surface et à votre environnement local."
                  : "Redonnez vie à vos intérieurs et protégez vos façades avec des solutions de peinture adaptées à chaque surface et chaque besoin, pour un résultat esthétique et durable."}
              </p>

              <p className="text-slate-700 leading-relaxed mb-6">
                <span className="text-black font-semibold">Groupe BML Rénovation</span> {isGrenoble ? "à Grenoble " : ""}vous accompagne dans tous vos <span className="text-black font-semibold">travaux de peinture intérieure et extérieure</span>. Notre équipe locale <span className="text-black font-semibold">vous conseille et vous accompagne</span> dans le choix des couleurs, des finitions et des produits pour sublimer votre intérieur.
              </p>

              <p className="text-slate-700 leading-relaxed mb-8">
                {isGrenoble
                  ? "À Grenoble et en Isère, que vous souhaitiez rafraîchir une pièce, créer une atmosphère chaleureuse avec des couleurs tendance, protéger une façade ou donner du caractère à vos murs avec des effets décoratifs, nos peintres grenoblois qualifiés mettent leur expertise à votre service pour des finitions soignées et un résultat à la hauteur de vos attentes."
                  : "Que vous souhaitiez rafraîchir une pièce, créer une atmosphère chaleureuse avec des couleurs tendance, protéger une façade ou donner du caractère à vos murs avec des effets décoratifs, nos peintres qualifiés mettent leur expertise à votre service pour des finitions soignées et un résultat à la hauteur de vos attentes."}
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
              className="relative rounded-2xl overflow-hidden shadow-2xl h-full"
            >
              <OptimizedImage
                src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Travaux%20de%20peinture.png"
                alt="Travaux de Peinture"
                className="w-full h-full object-cover"
                loading="eager"
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
                {isGrenoble ? "PEINTURE À GRENOBLE" : "PEINTURE EN ISÈRE"}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble ? "Peintre professionnel à Grenoble" : "Expertise peinture en Isère"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                {isGrenoble
                  ? "À Grenoble et en Isère, Groupe BML Rénovation réalise tous types de travaux de peinture intérieure et extérieure. De la préparation minutieuse des supports aux finitions soignées, nos peintres grenoblois professionnels vous accompagnent pour un résultat impeccable qui transforme et protège durablement vos espaces."
                  : "Groupe BML Rénovation réalise tous types de travaux de peinture intérieure et extérieure. De la préparation minutieuse des supports aux finitions soignées, nos peintres professionnels vous accompagnent pour un résultat impeccable qui transforme et protège durablement vos espaces."}
              </p>

              <p className="text-slate-700 leading-relaxed">
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
                  <ul className="space-y-2 text-sm text-slate-600">
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
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en peinture, que ce soit pour rafraîchir un intérieur, protéger durablement vos façades ou créer des ambiances personnalisées avec des finitions haut de gamme.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Prêt à Transformer Votre Maison à Grenoble ?" : "Prêt pour vos Travaux de Peinture en Isère ?"}
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
                {isGrenoble ? "Votre projet peinture à Grenoble en 4 étapes" : "Votre projet peinture en 4 étapes"}
              </span>
            </h2>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Diagnostic",
                desc: "Analyse approfondie de vos supports pour une tenue exemplaire dans le temps."
              },
              {
                step: "02",
                title: "Préparation",
                desc: "Protection minutieuse de vos sols et mobilier, suivie d'un ponçage haute précision."
              },
              {
                step: "03",
                title: "Mise en œuvre",
                desc: "Application par couches croisées avec des produits premium (Tollens, Zolpan)."
              },
              {
                step: "04",
                title: "Contrôle & Soin",
                desc: "Vérification sous lumière rase, nettoyage complet et remise en place."
              }
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
        {/* Background Decoration */}
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
                  Chez <span className="text-black font-semibold">Groupe BML Rénovation</span>, nous croyons que la peinture n'est pas seulement une question de couleur, mais une composante essentielle de votre architecture intérieure. C'est pourquoi nous avons mis en place un <span className="text-black font-semibold">partenariat exclusif avec Espaces Alpins</span>.
                </p>
                <p>
                  Pour chaque projet de peinture signé, nous vous offrons un <span className="text-black font-semibold">coaching décoration personnalisé</span>. Un architecte d'intérieur dédié vous accompagne dans l'étude de la luminosité, le <span className="text-black font-semibold">choix des finitions</span> et l'harmonisation globale de vos espaces.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 pb-8">
                {[
                  { title: "Architecte Offert", desc: "Conseil déco & matériaux inclus", icon: "🎨" },
                  { title: "Réponse 24h", desc: "Réactivité maximale Isère & Grenoble", icon: "⚡" },
                  { title: "Qualité Premium", desc: "Produits Tollens & Zolpan haut de gamme", icon: "✨" },
                  { title: "Garantie Décennale", desc: "Sérénité totale sur vos travaux", icon: "🛡️" },
                  { title: "Nettoyage Soigné", desc: "Remise en place & propreté de chantier", icon: "🧹" },
                  { title: "Proximité Locale", desc: "Experts basés au cœur de l'Isère", icon: "📍" }
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
                  Transformer mon intérieur maintenant
                  <div className="flex flex-col items-center ml-1">
                    <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                    <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                  </div>
                </button>
              </div>
              <p className="text-xs text-slate-400 italic mt-4">
                * Offre réservée aux projets de rénovation complète en Isère et Grenoble
              </p>
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
                {isGrenoble ? "EXPERTISE À GRENOBLE" : "COMPÉTENCES"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble ? "Notre expertise peinture à Grenoble" : "Notre savoir-faire à votre service"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed">
                {isGrenoble
                  ? "À Grenoble et en Isère, Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans tous types de travaux de peinture. Notre expertise couvre l'ensemble des techniques : préparation et traitement des supports, peintures acryliques et glycéro, enduits décoratifs, lasures et vernis, ravalement de façades, et finitions décoratives pour un résultat qui allie esthétique et protection durable."
                  : "Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans tous types de travaux de peinture. Notre expertise couvre l'ensemble des techniques : préparation et traitement des supports, peintures acryliques et glycéro, enduits décoratifs, lasures et vernis, ravalement de façades, et finitions décoratives pour un résultat qui allie esthétique et protection durable."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                  ),
                  title: "Espaces",
                  items: ["Appartements & Maisons", "Locaux commerciaux", "Bureaux professionnels", "Façades & Extérieurs", "Pièces humides"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M12 2L2 7L12 12L22 7L12 2Z" strokeLinejoin="round" />
                      <path d="M2 17L12 22L22 17" strokeLinejoin="round" />
                      <path d="M2 12L12 17L22 12" strokeLinejoin="round" />
                    </svg>
                  ),
                  title: "Métiers",
                  items: ["Préparation des supports", "Peintures Haute Qualité", "Enduits décoratifs", "Effets & Patines", "Peintures écologiques"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Engagements",
                  items: ["Conseil colorimétrique", "Diagnostic technique", "Protection des lieux", "Garantie décennale", "Respect des délais"]
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
                <img src={cert.logo} alt={cert.name} className="h-10 md:h-12 w-auto mb-3 object-contain transition-transform duration-300 group-hover:scale-110" width={120} height={48} loading="lazy" />
                <p className="text-[10px] md:text-xs font-semibold text-slate-600 leading-tight">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Partenaires de Confiance Section - Static Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              Nos partenaires de confiance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Nos partenaires pour des produits de qualité
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Nous collaborons exclusivement avec les plus grandes enseignes de matériaux et d'équipements pour garantir la perfection de vos projets.
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
                <img src={p.logoUrl} alt={p.name} className="max-h-11 md:max-h-12 w-auto object-contain" width={120} height={44} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <ServiceFAQ
        title="Vos questions sur la peinture"
        description="Tout ce qu'il faut savoir sur nos services de peinture et de décoration d'intérieur."
        items={[
          {
            id: "q1",
            question: "Quel est le délai moyen pour peindre un appartement de 80m² ?",
            answer: "Pour un appartement de 80m², il faut généralement compter entre 4 et 6 jours de travail. Ce délai inclut la protection minutieuse du mobilier et des sols, la préparation des supports (lessivage, rebouchage, ponçage) et l'application de deux couches de peinture de finition."
          },
          {
            id: "q2",
            question: "Quels types de peinture utilisez-vous pour vos chantiers ?",
            answer: "Nous travaillons exclusivement avec des peintures professionnelles haut de gamme (Tollens, Zolpan, Seigneurie) certifiées Écolabel ou NF Environnement. Elles garantissent un excellent pouvoir couvrant, une grande durabilité et un faible taux d'émissions de COV pour votre santé."
          },
          {
            id: "q3",
            question: "Est-ce que vous vous occupez de la protection des meubles et du sol ?",
            answer: "Absolument. La protection est l'étape la plus cruciale. Nous utilisons des bâches polyane, du ruban de masquage de précision et des tapis de protection réutilisables pour assurer qu'aucune trace de peinture ne vienne souiller votre intérieur. Nous déplaçons également les meubles lourds si nécessaire."
          },
          {
            id: "q4",
            question: "Proposez-vous un service de conseil pour le choix des couleurs ?",
            answer: "Oui, grâce à notre partenariat avec Espaces Alpins, nous vous proposons un accompagnement d'architecte d'intérieur offert pour tout devis signé. Cela inclut le conseil sur les harmonies colorées, les types de finitions (mat, velours, satin) et l'impact de la luminosité sur votre rendu final."
          },
          {
            id: "q5",
            question: "Pouvons-nous rester dans le logement pendant les travaux ?",
            answer: "Oui, c'est tout à fait possible. Nous organisons le chantier pièce par pièce pour minimiser les nuisances. L'utilisation de peintures à l'eau (acryliques) sans odeur permet d'occuper les lieux le soir même sans inconfort."
          }
        ]}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Peinture;
