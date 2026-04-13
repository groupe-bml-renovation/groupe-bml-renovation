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

interface SallesDeBainProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80',
    'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1200&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1200&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&q=80',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=80'
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
                    alt={`Rénovation Salle de Bain ${index + 1}`}
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
                    alt={`Rénovation Salle de Bain ${index + 1}`}
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

const SallesDeBain: React.FC<SallesDeBainProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Rénovation Salle de Bain Grenoble | Douche Italienne & Carrelage | Groupe BML' : 'Rénovation Salle de Bain | Installation Douche & Sanitaires | Groupe BML Rénovation'}</title>
        <meta name="description" content={isGrenoble ? "Experts en rénovation de salle de bain à Grenoble. Douche à l'italienne, carrelage tendance, plomberie certifiée and agencement sur mesure. Devis gratuit sous 24h." : "Rénovation complète de salle de bain. Installation de douches, robinetterie, meubles vasques and étanchéité garantie. Entreprise de rénovation experte."} />
        <meta name="keywords" content={isGrenoble ? "rénovation salle de bain Grenoble, douche italienne Grenoble, plombier Grenoble, carrelage Grenoble, travaux salle de bain Isère" : "rénovation salle de bain, douche italienne, entreprise plomberie, aménagement salle de bain, rénovation intérieure"} />
        <meta property="og:title" content={isGrenoble ? "Rénovation Salle de Bain Grenoble | Design & Qualité" : "Rénovation de Salle de Bain de Prestige | Groupe BML"} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/SDB%20PMR%2001.png"
            alt="Rénovation Salle de Bain Moderne"
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
                  Rénovation de<br />salle de bain à Grenoble
                </>
              ) : (
                <>
                  Rénovation de<br />salles de bain design
                </>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "L'élégance and le bien-être au cœur de l'Isère" : "Votre espace de détente réinventé par nos experts"}
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
                MAÎTRISE DE L'EAU & DU STYLE
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble 
                    ? "Votre salle de bain clé en main à Grenoble" 
                    : "L'art de la salle de bain d'exception"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                Transformer une salle de bain est l'un des projets de rénovation les plus complexes. Cela exige une coordination parfaite entre plomberie, électricité, étanchéité and finitions esthétiques.
              </p>

              <p className="text-slate-700 leading-relaxed mb-6">
                <span className="text-black font-semibold">Groupe BML Rénovation</span> {isGrenoble ? "à Grenoble " : ""}gère votre <span className="text-black font-semibold">rénovation globale de salle de bain</span>. De la dépose de l'ancien carrelage à la pose minutieuse de votre douche à l'italienne, nous garantissons un résultat durable and raffiné.
              </p>

              <p className="text-slate-700 leading-relaxed mb-8">
                {isGrenoble
                  ? "Nos artisans grenoblois interviennent avec une rapidité exemplaire pour minimiser l'indisponibilité de votre pièce d'eau. Nous maîtrisons les dernières tendances en carrelage grand format and sanitaires haut de gamme pour créer votre sanctuaire de bien-être."
                  : "Qu'il s'agisse d'optimiser une petite salle d'eau ou de créer une vaste pièce de détente, nous orchestrons tous les corps d'état sous une responsabilité unique pour une sérénité totale."}
              </p>

              <button
                onClick={scrollToContactForm}
                className="group relative inline-flex items-center gap-3 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(56,189,248,0.25)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                Démarrer mon projet salle de bain
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
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1200&q=80"
                alt="Expertise Salle de Bain"
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
                {isGrenoble ? "EXPERTISE TECHNIQUE" : "SAVOIR-FAIRE"}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble ? "Plomberie & Étanchéité Isère" : "L'excellence technique"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                Une salle de bain dure 20 ans si elle est techniquement irréprochable. Nous apportons une attention extrême à l'étanchéité sous carrelage (SPEC/SEL) and à la mise aux normes des volumes électriques.
              </p>

              <p className="text-slate-700 leading-relaxed">
                Notre approche intègre le choix de matériaux antidérapants, l'optimisation des débits d'eau and une ventilation (VMC) performante pour garantir un air sain and un entretien facilité.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-6 bg-white p-6 rounded-lg">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                       <svg className="w-6 h-6 text-[#38bdf8]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M12 21a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2H12z" />
                        <path d="M9 12h6" />
                        <path d="M12 16h3" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Mises en œuvre</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pose de carrelage, faïence and mosaïque</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Création de douches à l'italienne maçonnées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de colonnes de douche & balnéo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pose de meubles vasques and miroiterie</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Modification de plomberie and vidage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Eclairage basse tension (Volumes 1 & 2)</span>
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
                    Groupe BML Rénovation s'engage sur la propreté absolue du chantier. Nous protégeons vos sols and évacuons quotidiennement les gravats de démolition. Votre nouvelle salle de bain vous est livrée testée, étanche and prête à l'usage.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-slate-800 to-black rounded-3xl p-12 text-white mt-8 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Concevez votre Salle de Bain à Grenoble" : "Votre Projet Salle de Bain Clé en Main"}
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  {isGrenoble
                    ? "Bénéficiez du savoir-faire d'une entreprise générale pour une coordination plomberie-carrelage sans faute."
                    : "Un seul interlocuteur pour la dépose, les réseaux, la pose and les finitions."}
                </p>
                <p className="text-base mb-8 opacity-90 italic">
                  Visite technique and devis chiffré fournis sous 24h à 48h.
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="group inline-flex items-center gap-2 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_15px_30px_rgba(56,189,248,0.4)] transition-all duration-300 hover:scale-105"
                >
                  Demander une étude gratuite
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
              LOGISTIQUE CHANTIER
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Votre rénovation en 4 phases précises
              </span>
            </h2>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Diagnostic technique",
                desc: "Analyse des pressions, évacuations and plan d'implantation électrique (norme NF C 15-100)."
              },
              {
                step: "02",
                title: "Dépose & Réseaux",
                desc: "Retrait soigneux de l'existant, modification des tuyauteries and mise en place des structures de douche."
              },
              {
                step: "03",
                title: "Étanchéité & Pose",
                desc: "Application des membranes d'étanchéité, pose millimétrée du carrelage and des sanitaires."
              },
              {
                step: "04",
                title: "Finition & Tests",
                desc: "Jointoiement, installation des accessoires, tests d'étanchéité and mise en service immédiate."
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
                    Conseil d'architecte offert pour votre salle de bain
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg">
                <p>
                  Optimiser une petite surface ou choisir l'harmonie parfaite entre faïence and meubles vasques nécessite un œil expert. Grâce à notre <span className="text-black font-semibold">partenariat exclusif avec Espaces Alpins</span>, nous vous offrons le meilleur du design.
                </p>
                <p>
                  Pour tout projet de rénovation complète de salle de bain, un <span className="text-black font-semibold">architecte d'intérieur vous conseille</span> sur le choix des matériaux and l'agencement optimal des volumes. C'est la garantie d'une pièce d'eau d'exception.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-4 pb-8">
                {[
                  { title: "Coaching Déco", desc: "Conseils matériaux & couleurs", icon: "🎨" },
                  { title: "Expertise TCE", desc: "Plomberie & Elec intégrées", icon: "⚡" },
                  { title: "Plans Plans", desc: "Douches Italiennes & Sanitaires", icon: "🚿" },
                  { title: "Garantie Totale", desc: "Assurance décennale étanchéité", icon: "🛡️" },
                  { title: "Gestion Déchets", desc: "Évacuation propre & responsable", icon: "♻️" },
                  { title: "Proximité Isère", desc: "Équipes basées à proximité", icon: "🏡" }
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
                Lancer mon projet salle de bain
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
                  alt="Design Salle de Bain Espaces Alpins"
                  className="w-full h-auto object-contain opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Signature Design</p>
                    <p className="text-xl font-semibold">"Sublimer l'utile par l'exceptionnel."</p>
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
                {isGrenoble ? "ARTISANS DE L'ISÈRE" : "VOTRE PROJET TCE"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  L'excellence à chaque raccordement
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed">
                Choisir Groupe BML Rénovation, c'est choisir la tranquillité d'un interlocuteur unique. Nous coordonnons nos experts internes pour que la pose de votre salle de bain se déroule sans aucun accroc technique, en respectant les normes NF C 15-100.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M12 21l-8.228-3.085a2 2 0 01-1.272-1.834V5.618a2 2 0 011.272-1.834L12 1l8.228 2.784a2 2 0 011.272 1.834V16.08a2 2 0 01-1.272 1.834L12 21z" />
                    </svg>
                  ),
                  title: "Technique",
                  items: ["Plomberie certifiée", "Étanchéité SEL/SPEC", "Volumes électriques sécurisés", "Robinetterie thermostatique", "VMC performante"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
                      <path d="M7 8h10M7 12h10M7 16h4" />
                    </svg>
                  ),
                  title: "Matériaux",
                  items: ["Carrelage grand format", "Mosaïque & Faïence", "Receveurs extra-plats", "Plans Vasques Pierre/Quartz", "Miroiterie sur mesure"]
                },
                {
                  icon: (
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                  title: "Garantie",
                  items: ["Décennale étanchéité", "Pose au millimètre", "Chantier propre garanti", "Respect strict des délais", "Assurance RC Pro Isère"]
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

      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
              ASSURANCES & NORMES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Une sécurité certifiée pour vos pièces d'eau
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {[
              { name: 'RGE', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', desc: 'Expertise Qualité' },
              { name: 'Plomberie', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', desc: 'Certifié Fluides' },
              { name: 'Électricité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', desc: 'NF C 15-100' },
              { name: 'Bâtiment', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', desc: 'Assurance BTP' },
              { name: 'Gaz', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2011.png', desc: 'Conformité Gaz' },
              { name: 'Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', desc: 'Satisfaction +' },
              { name: 'PMR', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', desc: 'Accessibilité' },
              { name: 'Artisan', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', desc: 'Label Artisan' },
              { name: 'Solaire', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2001.png', desc: 'Eco Énergie' },
              { name: 'Chauffage', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', desc: 'PAC & Sanitaire' },
              { name: 'Ventilation', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2008.png', desc: 'Air Qualité' },
              { name: 'Fluide H', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2002.png', desc: 'Chauffage Haut' },
              { name: 'Gaz Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2009.png', desc: 'Installation G' },
              { name: 'PME Isère', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', desc: 'Local Isère' },
              { name: 'Fluid Handling', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', desc: 'Technique F' },
              { name: 'Heating', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2005.png', desc: 'Artisan Chauff' }
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

      <PartnersSection />

      <ServiceFAQ
        title="FAQ Rénovation Salle de Bain"
        description="Les réponses à vos questions techniques and budgétaires."
        items={[
          {
            id: "sb1",
            question: "Quel budget prévoir pour une rénovation complète de salle de bain ?",
            answer: "Une rénovation complète (plomberie, carrelage, sanitaires) oscille généralement entre 8 000€ and 18 000€ selon la surface and la gamme des matériaux. Nous fournissons un devis détaillé après une visite technique gratuite."
          },
          {
            id: "sb2",
            question: "Combien de temps durent les travaux ?",
            answer: "Pour une salle de bain standard, comptez entre 7 and 12 jours ouvrés. Ce délai comprend la démolition, la modification des réseaux, le temps de séchage de l'étanchéité and la pose finale."
          },
          {
            id: "sb3",
            question: "Gérez-vous la pose de douches à l'italienne ?",
            answer: "Oui, c'est notre spécialité. Nous réalisons des douches de plain-pied avec receveurs à carreler ou extra-plats, en assurant une étanchéité périphérique multicouche garantie par notre assurance décennale."
          },
          {
            id: "sb4",
            question: "Pouvez-vous transformer une baignoire en douche ?",
            answer: "Tout à fait. C'est une demande fréquente pour gagner de l'espace ou améliorer l'accessibilité. Nous gérons l'adaptation de l'évacuation and la reprise du carrelage mural and de sol pour un rendu invisible."
          },
          {
            id: "sb5",
            question: "Ma salle de bain sera-t-elle indisponible pendant les travaux ?",
            answer: "Oui, la pièce est généralement inutilisable pendant toute la durée du chantier. Si vous n'avez qu'une seule salle de bain, nous planifions les travaux de sorte à minimiser au maximum l'indisponibilité des WC si possible."
          }
        ]}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default SallesDeBain;
