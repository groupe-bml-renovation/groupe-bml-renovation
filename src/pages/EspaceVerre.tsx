import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Pen, Sun } from 'lucide-react';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';

interface EspaceVerreProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1722936082032-f68388a67b00?w=1200&q=80',
    'https://images.unsplash.com/photo-1753596727275-15b5abc2b53d?w=1200&q=80',
    'https://images.unsplash.com/photo-1715934514077-4684c381f05a?w=1200&q=80',
    'https://images.unsplash.com/photo-1697538022665-e170c3616c5b?w=1200&q=80',
    'https://images.unsplash.com/photo-1723206524904-d61dd645c5ff?w=1200&q=80',
    'https://images.unsplash.com/photo-1644898554223-35728a90138b?w=1200&q=80',
    'https://images.unsplash.com/photo-1685514823717-7e1ff6ee0563?w=1200&q=80'
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
                    alt={`Expertise Espace Verre ${index + 1}`}
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
                    alt={`Expertise Espace Verre ${index + 1}`}
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

const EspaceVerre: React.FC<EspaceVerreProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? "Conception Espace Verre & Verrières Grenoble | Groupe BML" : "Espace Verre & Solutions de Vitrage Design | Verrière & Baie Vitrée | Groupe BML"}</title>
        <meta name="description" content={isGrenoble ? "Experts en vitrages and espaces verre à Grenoble. Installation de verrières intérieures, baies panoramiques and jardins d'hiver en Isère. Design épuré step-by-step." : "Solutions d'espace verre haute couture. Maximisez la lumière avec nos verrières sur mesure, cloisons vitrées and vitrages techniques haute performance."} />
        <meta name="keywords" content={isGrenoble ? "espace verre grenoble, verrière atelier isère, baie vitrée 38, jardin d'hiver grenoble, cloison vitrée" : "espace verre, verrière sur mesure, baie vitrée panoramique, vitrage acoustique, transparence intérieure"} />
        <meta property="og:title" content={isGrenoble ? "Espace Verre & Transparence Grenoble | Design Lumineux" : "Espace Verre Premium | Groupe BML"} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1672139664252-9e56a5c79ca6?w=1920&q=80"
            alt="Intérieur moderne avec vaste espace verre and lumière naturelle"
            className="w-full h-full object-cover"
            priority={true}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-900/30 to-slate-900/40" />
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
                  L'Art du Verre<br />à Grenoble
                </>
              ) : (
                <>
                  Capturer la<br />lumière pure
                </>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "Conception de structures vitrées d'exception en Isère" : "La transparence au service de l'architecture intérieure"}
            </p>
            <div className="w-24 h-0.5 bg-[#0ea5e9] mx-auto mb-8 shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
            
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
              <span className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
                LUMIÈRE & TRANSPARENCE
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#0ea5e9] bg-clip-text text-transparent">
                  {isGrenoble 
                    ? "Votre expert vitrages à Grenoble" 
                    : "L'intelligence du vitrage sur mesure"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                Le verre n'est pas qu'une barrière, c'est un créateur d'espace. Il efface les limites entre intérieur and extérieur, laisse circuler la lumière and apporte une sophistication structurelle immédiate.
              </p>

              <p className="text-slate-700 leading-relaxed mb-6">
                <span className="text-black font-semibold">Groupe BML Rénovation</span> {isGrenoble ? "à Grenoble " : ""}maîtrise la haute technologie du vitrage. Nous installons des verrières de type atelier, des baies panoramiques à profilés minimalistes and des cloisons vitrées phoniques pour un confort absolu.
              </p>

              <p className="text-slate-700 leading-relaxed mb-8">
                {isGrenoble
                  ? "Nos miroitier-poseurs interviennent dans toute l'Isère pour vos projets de rénovation premium. Nous coordonnons la pose de menuiseries aluminium haute performance avec des vitrages techniques (anti-effraction, contrôle solaire) pour garantir une isolation optimale sous le climat grenoblois."
                  : "Qu'il s'agisse d'un jardin d'hiver or d'une paroi de douche format XXL, nous appliquons une rigueur de pose chirurgicale pour une étanchéité and une esthétique parfaites."}
              </p>

              <button
                onClick={scrollToContactForm}
                className="group relative inline-flex items-center gap-3 bg-[#0ea5e9] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(14,165,233,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Ouvrir mon espace
                <div className="flex flex-col items-center ml-1">
                  <Sun className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
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
                src="https://images.unsplash.com/photo-1753596727275-15b5abc2b53d?w=1200&q=80"
                alt="Verrière intérieure design and lumière traversante"
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
              <span className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
                {isGrenoble ? "EXPERTISE ISÈRE" : "SAVOIR-FAIRE TECHNIQUE"}
              </span>
              <div className="w-24 h-px bg-[#0ea5e9] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-black to-[#0ea5e9] bg-clip-text text-transparent">
                  {isGrenoble ? "Transparence à Grenoble" : "La science du verre"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                Un espace verre réussi combine esthétique and performance thermique. Nous utilisons des vitrages à faible émissivité and des intercalaires warm-edge pour supprimer toute sensation de paroi froide en hiver.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Notre approche intègre la gestion des ponts thermiques, la sécurité des usagers (verre securit) and des solutions de motorisation pour vos ouvertures connectées.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#0ea5e9] flex items-center justify-center bg-white">
                       <svg className="w-6 h-6 text-[#0ea5e9]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 10h16M10 4v16" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#0ea5e9]">Mises en œuvre</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0ea5e9]">–</span>
                      <span>Verrières de style "Art Déco" or "Atelier"</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0ea5e9]">–</span>
                      <span>Baies vitrées à levage & seuils encastrés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0ea5e9]">–</span>
                      <span>Cloisons vitrées acoustiques pour bureaux</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0ea5e9]">–</span>
                      <span>Jardins d'hiver & Extensions de verre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0ea5e9]">–</span>
                      <span>Vitrages à opacité commandée (Smart Glass)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0ea5e9]">–</span>
                      <span>Dalles de verre circulables & Puits de lumière</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#0ea5e9] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#0ea5e9]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#0ea5e9]">Nos engagements</h3>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Groupe BML Rénovation assure des installations certifiées CEKAL and conformes à la RE2020. Nous collaborons avec des fabricants de profilés premium (Schüco, Technal) pour une durabilité mécanique exceptionnelle.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-sky-900 to-black rounded-3xl p-12 text-white mt-8 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Un projet vitré à Grenoble ?" : "Votre Horizon de Verre"}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble
                    ? "Profitez d'une expertise reconnue en Isère pour illuminer vos volumes."
                    : "Une seule équipe pour la structure aluminium and le vitrage haute couture."}
                </p>
                <p className="text-base mb-8 opacity-90 italic">
                  Étude d'ensoleillement and devis technique fournis sous 48h.
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="group inline-flex items-center gap-2 bg-[#0ea5e9] text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_15px_30px_rgba(14,165,233,0.4)] transition-all duration-300 hover:scale-105"
                >
                  Concevoir mon espace verre
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
            <span className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
              PROCESSUS DE RÉALISATION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#0ea5e9] bg-clip-text text-transparent">
                Votre structure vitrée en 4 étapes clés
              </span>
            </h2>
            <div className="w-24 h-0.5 bg-[#0ea5e9] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Prise de Cotes Laser",
                desc: "Mesures millimétrées de vos ouvertures pour une fabrication sur mesure sans aucun jeu."
              },
              {
                step: "02",
                title: "Cahier Technique",
                desc: "Définition des vitrages (thermique, acoustique, solaire) and choix des profilés (Isère/France)."
              },
              {
                step: "03",
                title: "Pose Structurelle",
                desc: "Installation du châssis and calage de précision pour assurer la fluidité des coulissants."
              },
              {
                step: "04",
                title: "Étanchéité & Finition",
                desc: "Injection de mousses isolantes, joints silicone de finition and réglage des quincailleries."
              }
            ].map((s, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative p-8 bg-white border border-slate-100 rounded-2xl group hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1 h-full bg-[#0ea5e9] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                <span className="text-5xl font-black text-slate-100 absolute top-4 right-4 group-hover:text-[#0ea5e9]/10 transition-colors">
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
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0ea5e9]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
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
                <span className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
                  DESIGN & ACCOMPAGNEMENT
                </span>
                <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-black to-[#0ea5e9] bg-clip-text text-transparent">
                    L'œil d'un architecte offert pour votre espace lumière
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                <p>
                  Trop de vitrage peut créer un effet de serre or un manque d'intimité. Grâce à notre <span className="text-black font-semibold">partenariat exclusif avec Espaces Alpins</span>, nous vous offrons le meilleur du conseil architectural.
                </p>
                <p>
                  Pour tout projet de rénovation complète, un <span className="text-black font-semibold">architecte d'intérieur collabore</span> avec vous pour placer stratégiquement les apports de lumière, choisir le rythme des menuiseries and intégrer des solutions d'ombrage (stores zip, brise-soleil orientables). C'est l'atout design de votre rénovation.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 pb-8">
                {[
                  { title: "Architecte Offert", desc: "Conseil design & agencement", icon: "📐" },
                  { title: "Expertise TCE", desc: "Equipes miroitier & élec internes", icon: "🛠️" },
                  { title: "Réponse 24h", desc: "Réactivité maximale en Isère", icon: "⚡" },
                  { title: "Garantie Totale", desc: "Assurance décennale centralisée", icon: "🛡️" },
                  { title: "Matériaux Pro", desc: "Verres de grandes manufactures", icon: "💎" },
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
                className="group relative inline-flex items-center gap-3 bg-[#0ea5e9] text-white px-10 py-5 rounded-full font-bold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_25px_50px_-12px_rgba(14,165,233,0.5)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Lancer mon projet vitré
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
              <div className="absolute -inset-4 bg-gradient-to-br from-[#0ea5e9]/10 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-black">
                <OptimizedImage
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg"
                  alt="Design Architectural Espaces Alpins"
                  className="w-full h-auto object-contain opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Signature Lumière</p>
                    <p className="text-xl font-semibold">"La lumière n'est pas un luxe, c'est l'essence même de l'espace."</p>
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
              <span className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
                {isGrenoble ? "EXPERTS DE L'ISÈRE" : "VOTRE PROJET TCE"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#0ea5e9] bg-clip-text text-transparent">
                  L'excellence à chaque millimètre
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Choisir Groupe BML Rénovation, c'est s'offrir la précision d'un artisan miroitier couplée à la puissance d'un groupe TCE. Nous gérons les reprises de plâtrerie and d'électricité (stores) pour un projet 100% maîtrisé.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" strokeLinecap="round" />
                      <path d="M4 10h16M10 4v16" strokeLinecap="round" />
                    </svg>
                  ),
                  title: "Technique",
                  items: ["Contrôle Solaire", "Isolation Acoustique", "Vitrages FE (basse émissivité)", "Profilés minimalistes", "Seuils PMR"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  ),
                  title: "Domaines",
                  items: ["Verrières Atelier", "Baies Coulissantes", "Dalles de Verre", "Cloisons de Bureaux", "Façades VEC"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  ),
                  title: "Engagement",
                  items: ["Label CEKAL", "Garantie Décennale", "Suivi Maintenance", "Intervention Rapide", "Marques Premium"]
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(14,165,233,0.1)] transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0ea5e9] mb-6 group-hover:scale-110 group-hover:bg-[#0ea5e9] group-hover:text-white transition-all duration-500 shadow-inner">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">{card.title}</h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] group-hover/item:scale-150 transition-transform" />
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
            <span className="text-sm font-semibold uppercase tracking-wide text-[#0ea5e9]">
              LABELS & GARANTIES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#0ea5e9] bg-clip-text text-transparent">
                Des vitrages certifiés pour votre sécurité
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
        title="FAQ Espace Verre"
        description="Les réponses de nos techniciens pour illuminer vos intérieurs."
        items={[
          {
            id: "ev1",
            question: "Est-ce qu'une verrière intérieure demande beaucoup d'entretien ?",
            answer: "C'est une idée reçue. Nos verrières sont thermolaquées, ce qui rend la structure très facile à nettoyer. Pour les vitrages, si vous choisissez l'option 'verre autonettoyant' or un vitrage 'anti-trace', un simple coup de chiffon microfibre suffit une fois par mois."
          },
          {
            id: "ev2",
            question: "Peut-on mettre une baie vitrée géante sans perdre en chauffage ?",
            answer: "Absolument. Grâce aux triples vitrages avec gaz Argon and aux profilés aluminium à rupture de pont thermique complète, la performance d'une baie vitrée moderne est proche de celle d'un mur isolé. Elle permet même de faire des économies grâce aux apports solaires gratuits en hiver."
          },
          {
            id: "ev3",
            question: "Qu'est-ce que le verre feuilleté 'Stadip' ?",
            answer: "C'est un verre de sécurité composé de deux feuilles de verre collées par un film plastique invisible. En cas de choc, le verre se fissure mais reste en place, protégeant contre les chutes and les tentatives d'effraction. C'est obligatoire pour les dalles de sol or les toitures de véranda."
          },
          {
            id: "ev4",
            question: "Est-il possible de motoriser des stores dans une verrière ?",
            answer: "Oui, nous intégrons systématiquement des solutions de motorisation Somfy or équivalent, pilotables par smartphone. Les stores peuvent être dissimulés dans le châssis pour un rendu invisible lorsqu'ils sont relevés."
          },
          {
            id: "ev5",
            question: "Proposez-vous des vitrages acoustiques ?",
            answer: "Oui, si votre logement donne sur une rue bruyante, nous installons des vitrages dits 'asymétriques' qui cassent les ondes sonores. Cela permet d'obtenir un calme absolu même avec une très grande surface vitrée."
          }
        ]}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default EspaceVerre;
