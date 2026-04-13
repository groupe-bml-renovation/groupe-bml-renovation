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

interface ClimatisationProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80',
    'https://images.unsplash.com/photo-1599814202151-3e47952eb0b4?w=1200&q=80',
    'https://images.unsplash.com/photo-1636137681404-03460f9ed6cd?w=1200&q=80',
    'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=1200&q=80',
    'https://images.unsplash.com/photo-1621905252507-b354bcadc0e1?w=1200&q=80',
    'https://images.unsplash.com/photo-1636137681404-03460f9ed6cd?w=1200&q=80',
    'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80',
    'https://images.unsplash.com/photo-1599814202151-3e47952eb0b4?w=1200&q=80'
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
                    alt={`Expertise Climatisation ${index + 1}`}
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
                    alt={`Expertise Climatisation ${index + 1}`}
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

const Climatisation: React.FC<ClimatisationProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? "Climatisation Réversible Grenoble | Installation & Entretien | Groupe BML" : "Rénovation Thermique | Climatisation & Pompes à Chaleur | Groupe BML Rénovation"}</title>
        <meta name="description" content={isGrenoble ? "Installateurs de climatisation à Grenoble. Systèmes réversibles, gainables and multi-splits. Devis gratuit and installation certifiée en Isère." : "Travaux de climatisation pour votre rénovation intérieure. Confort thermique été/hiver and économies d'énergie. Entreprise de rénovation experte."} />
        <meta name="keywords" content={isGrenoble ? "climatisation grenoble, clim réversible isère, pompe à chaleur grenoble, entretien clim 38, installation climatisation grenoble" : "climatisation rénovation, pompe à chaleur, confort thermique, clim réversible, artisan climaticien"} />
        <meta property="og:title" content={isGrenoble ? "Climatisation & Confort Thermique Grenoble | Qualité Optimale" : "Climatisation & PAC Premium | Groupe BML"} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920&q=80"
            alt="Groupe extérieur climatisation haute performance"
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
                  Climatisation<br />à Grenoble
                </>
              ) : (
                <>
                  Confort thermique<br />premium
                </>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "L'assurance d'une température idéale toute l'année en Isère" : "L'excellence énergétique au service de votre bien-être"}
            </p>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto mb-8" />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-6"
            >
              <motion.a
                href="https://www.google.com/search?q=groupe+bml+renovation"
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

      {/* Intro Section */}
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
                CLIMATISATION & ÉNERGIE
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble 
                    ? "Votre expert génie climatique à Grenoble" 
                    : "L'intelligence thermique au service de votre habitat"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                Une climatisation performante ne se contente plus de refroidir. Elle régule l'hygrométrie, purifie l'air and chauffe vos espaces avec une efficacité énergétique record grâce aux pompes à chaleur air-air.
              </p>

              <p className="text-slate-700 leading-relaxed mb-6">
                <span className="text-black font-semibold">Groupe BML Rénovation</span> {isGrenoble ? "à Grenoble " : ""}maîtrise l'intégralité des systèmes thermodynamiques. Du split mural discret au système gainable invisible, nous concevons des installations silencieuses and économes.
              </p>

              <p className="text-slate-700 leading-relaxed mb-8">
                {isGrenoble
                  ? "Nos techniciens interviennent dans toute la métropole grenobloise pour vos projets de rénovation complète. Nous coordonnons la pose de vos unités avec nos autres corps d'état pour une intégration parfaite dans vos plafonds and cloisons."
                  : "Qu'il s'agisse de restructurer le confort d'un plateau de bureaux ou d'équiper une villa contemporaine, nous appliquons une rigueur absolue pour une installation thermodynamique pérenne."}
              </p>

              <button
                onClick={scrollToContactForm}
                className="group relative inline-flex items-center gap-3 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(56,189,248,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Démarrer mon étude thermique
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
                src="https://images.unsplash.com/photo-1599814202151-3e47952eb0b4?w=1200&q=80"
                alt="Expertise technique climatisation"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="py-8 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <ImageCarousel />
        </div>
      </section>

      {/* Detail Section */}
      <section className="py-8 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
            <div className="bg-[#f5f5f5] p-8">
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                {isGrenoble ? "EXPERTISE ISÈRE" : "SAVOIR-FAIRE THERMIQUE"}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble ? "Confort climatique à Grenoble" : "La précision thermodynamique"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                Nous n'installons pas seulement des climatiseurs, nous créons des environnements sains. Nos systèmes intègrent des filtres haute performance and une régulation inverter pour un silence total and une consommation maîtrisée.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Notre approche intègre le calcul des déperditions, l'optimisation des flux d'air and la domotique pour un pilotage à distance de votre confort thermique.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                       <svg className="w-6 h-6 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Mises en œuvre</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pose de systèmes Multi-split design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de gainables invisibles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pompes à chaleur Air-Air Air-Eau</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Consoles double flux & plafonniers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise en service certifiée (Fluides)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Entretien & Contrats de maintenance</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Nos engagements</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Groupe BML Rénovation assure des installations certifiées avec attestation de capacité (fluides frigorigènes). Nous utilisons exclusivement des marques de référence (Daikin, Mitsubishi, Panasonic) pour garantir la qualité and la performance sonore.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-slate-800 to-black rounded-3xl p-12 text-white mt-8 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Chaleur ou Fraîcheur à Grenoble ?" : "Votre Confort Toute l'Année"}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble
                    ? "Profitez d'une expertise reconnue en Isère pour sécuriser votre installation génie climatique."
                    : "Une seule équipe pour la climatisation, l'électricité and les finitions."}
                </p>
                <p className="text-base mb-8 opacity-90 italic">
                  Bilan thermique and devis technique détaillé fournis sous 24h.
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="group inline-flex items-center gap-2 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_15px_30px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-105"
                >
                  Étudier mon projet thermique
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

      {/* 4-Step Process Section */}
      <section className="pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              LOGISTIQUE TECHNIQUE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Votre rénovation thermique en 4 phases expertes
              </span>
            </h2>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Bilan Thermique",
                desc: "Analyse des volumes, calcul des déperditions and étude de l'ensoleillement des pièces."
              },
              {
                step: "02",
                title: "Étude Implantation",
                desc: "Calcul des flux d'air, positionnement des unités and passage des liaisons frigorifiques."
              },
              {
                step: "03",
                title: "Installation & Pose",
                desc: "Montage des unités intérieures/extérieures, dudgeonnage and mise sous vide du réseau."
              },
              {
                step: "04",
                title: "Mise en Service",
                desc: "Charge de fluide, tests de performance, formation à l'usage and remise du certif."
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

      {/* Architect Partnership Section */}
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
                  DESIGN & ACCOMPAGNEMENT
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                    L'œil d'un architecte offert pour l'intégration visuelle
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                <p>
                  Une climatisation réussie est une climatisation invisible. Grâce à notre <span className="text-black font-semibold">partenariat exclusif avec Espaces Alpins</span>, nous vous offrons le meilleur de l'intégration architecturale.
                </p>
                <p>
                  Pour tout projet de rénovation complète, un <span className="text-black font-semibold">architecte d'intérieur collabore</span> avec vous pour l'intégration des unités gainables en plafonds, le choix des grilles design and l'harmonisation avec vos finitions. C'est l'assurance d'un confort de palace and luxueux.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 pb-8">
                {[
                  { title: "Architecte Offert", desc: "Conseil design & agencement", icon: "📐" },
                  { title: "Expertise TCE", desc: "Equipes clim & plomberie internes", icon: "🛠️" },
                  { title: "Réponse 24h", desc: "Réactivité maximale en Isère", icon: "⚡" },
                  { title: "Garantie Totale", desc: "Assurance décennale centralisée", icon: "🛡️" },
                  { title: "Gestion Déchets", desc: "Chantier propre & tri sélectif", icon: "♻️" },
                  { title: "Suivi Local", desc: "Interlocuteur unique à Grenoble", icon: "🏡" }
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

              <button
                onClick={scrollToContactForm}
                className="group relative inline-flex items-center gap-3 bg-[#38bdf8] text-white px-10 py-5 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Lancer mon projet technique
                <div className="flex flex-col items-center ml-1">
                  <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                  <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                </div>
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#38bdf8]/10 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-black">
                <OptimizedImage
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg"
                  alt="Design Thermique Espaces Alpins"
                  className="w-full h-auto object-contain opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Signature Design</p>
                    <p className="text-xl font-semibold">"Le confort invisible au service de l'architecture."</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise Grid Section */}
      <section className="pt-10 pb-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                {isGrenoble ? "EXPERTS DE L'ISÈRE" : "VOTRE PROJET TCE"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  L'excellence à chaque calorie
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Choisir Groupe BML Rénovation, c'est choisir la tranquillité d'un interlocuteur unique. Nous coordonnons nos experts internes pour que la partie thermique de votre chantier se déroule sans aucun accroc technique.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  ),
                  title: "Technique",
                  items: ["Systèmes gainables", "Cassettes multi-flux", "Technologie Inverter", "Régulation Airzone", "Filtration Nano-X"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                    </svg>
                  ),
                  title: "Marques",
                  items: ["Daikin Premium", "Mitsubishi Electric", "Panasonic Etherea", "Atlantic Fujitsu", "Samsung WindFree"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Engagement",
                  items: ["Certif. Capacité (ADS)", "Audit Thermique", "Garantie décennale", "Contrat Maintenance", "Marques Premium"]
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

      {/* Certifications Section */}
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              LABELS & GARANTIES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Une sécurité certifiée pour votre air
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {[
              { name: 'RGE', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', desc: 'Savoir-Faire Qualité' },
              { name: 'Électricité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', desc: 'Conformité Élec' },
              { name: 'Bâtiment', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', desc: 'Artisan BTP' },
              { name: 'Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', desc: 'Engagement Q' },
              { name: 'Artisan', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', desc: 'Excellence Pro' },
              { name: 'Accessibilité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', desc: 'Local Isère' },
              { name: 'Pompe Chaleur', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', desc: 'Expert PAC' },
              { name: 'Gaz', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png', desc: 'Qualité Gaz' },
              { name: 'Solar', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png', desc: 'Énergie Vert' },
              { name: 'Ventilation', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png', desc: 'Flux & Air' },
              { name: 'Fluid Control', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', desc: 'Certifié Fluides' },
              { name: 'Chauffage HP', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png', desc: 'HP Qualité' },
              { name: 'Gaz Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png', desc: 'Installation G' },
              { name: 'Fluides Control', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', desc: 'Technique Pro' },
              { name: 'Heat System', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png', desc: 'Artisan Chauff' },
              { name: 'PMR', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', desc: 'Artisan PMR' }
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

      {/* Partners Section */}
      <PartnersSection />

      {/* FAQ Section */}
      <ServiceFAQ
        title="FAQ Climatisation"
        description="Les réponses de nos techniciens pour sécuriser votre installation haut de gamme."
        items={[
          {
            id: "cl1",
            question: "Qu'est-ce qu'une climatisation réversible ?",
            answer: "Une climatisation réversible est une pompe à chaleur (PAC) air-air. Elle capte les calories de l'air extérieur pour chauffer votre intérieur en hiver, and inverse le cycle en été pour évacuer la chaleur vers l'extérieur. C'est l'un des systèmes les plus économes car il restitue environ 4 fois plus d'énergie qu'il n'en consomme."
          },
          {
            id: "cl2",
            question: "Un système gainable est-il vraiment invisible ?",
            answer: "Oui, c'est la solution premium par excellence. L'unité intérieure est installée dans un faux-plafond (souvent dans un couloir). L'air est ensuite distribué dans chaque pièce via des gaines isolées aboutissant à des grilles de diffusion design. Seules ces grilles sont visibles en plafond."
          },
          {
            id: "cl3",
            question: "Quelle est la durée de vie d'une installation ?",
            answer: "Avec un entretien régulier effectué par nos techniciens, une climatisation de grande marque (Daikin, Mitsubishi) a une durée de vie comprise entre 15 and 20 ans. La qualité de la mise en service (tirage au vide, étanchéité) est le facteur n°1 de longévité."
          },
          {
            id: "cl4",
            question: "Est-ce que l'installation fait du bruit ?",
            answer: "Les unités modernes sont extrêmement silencieuses. En mode 'nuit', le niveau sonore descend autour de 19dB(A), ce qui est à peine perceptible (plus silencieux qu'un chuchotement). Nous sélectionnons les emplacements pour éviter toute nuisance sonore vis-à-vis des voisins."
          },
          {
            id: "cl5",
            question: "Faut-il une autorisation pour installer une unité extérieure ?",
            answer: "En copropriété ou en lotissement, une déclaration préalable de travaux (DP) en mairie est généralement nécessaire car l'unité extérieure modifie l'aspect de la façade. Nous vous accompagnons dans la constitution de ce dossier technique."
          }
        ]}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Climatisation;
