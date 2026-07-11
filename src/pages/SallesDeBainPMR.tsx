import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Pen, Accessibility, Layout, ShieldCheck, Ruler, Grid3X3, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';
import { salleDeBainPMRFAQs } from '../data/service-faqs';

interface SallesDeBainPMRProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2007.png',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2005%20-%2002.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2005%20-%2003.jpeg',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&q=80',
    'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/G%20BML%20-%2001%20-%20Sdb%20pmr%201mois%2013000%E2%82%AC%20-%2005.png'
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 320;
      const gap = 24;
      const itemWithGap = itemWidth + gap;
      container.scrollBy({ left: -itemWithGap, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 320;
      const gap = 24;
      const itemWithGap = itemWidth + gap;
      container.scrollBy({ left: itemWithGap, behavior: 'smooth' });
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
                    alt={`Salle de Bain PMR Design ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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
                    alt={`Salle de Bain PMR Design ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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

const SallesDeBainPMR: React.FC<SallesDeBainPMRProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = useMemo(() => location.pathname.includes('/grenoble'), [location.pathname]);

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? "Salle de Bain PMR à Grenoble | Accessibilité & Sécurité | BML" : "Salles de Bain PMR & Accessibilité de Prestige | Rénovation Handicap | BML"}</title>
        <meta name="description" content="Sublimez votre autonomie. Rénovation PMR, douche sécurisée, agencement ergonomique haut de gamme with architecte offert for votre confort and sécurité." />
        <meta property="og:title" content="Salle de Bain PMR & Accessibilité | Groupe BML" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation tout corps d'état",
            "description": isGrenoble ? "Expert en adaptation de salle de bain PMR à Grenoble" : "Entreprise spécialisée en accessibilité salle de bain haut de gamme",
            "url": "https://groupe-bml-renovation.com",
            "telephone": "+33756915997",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            }
          })}
        </script>
      </Helmet>

      <div className="sr-only">
        <h2>Expertise Salle de Bain PMR & Senior</h2>
        <p>Adaptation and rénovation de salles de bains for Personnes à Mobilité Réduite and Seniors</p>
        <h3>Douche PMR Grenoble</h3>
        <h3>Installation MaPrimeAdapt'</h3>
        <h3>Accessibilité RGE Qualibat</h3>
        <h3>Architecte d'Intérieur Offert</h3>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2005%20-%20Hero%20-%20After.jpeg.png"
            alt="Salle de bain PMR d'exception"
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
                <>Salle de Bain PMR<br />à Grenoble</>
              ) : (
                <>Salles de Bain<br />PMR & Senior</>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "La sécurité and l'autonomie au cœur de l'Isère" : "L'excellence au service de votre indépendance and de votre confort"}
            </p>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto mb-8 shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
            
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

              <button
                onClick={scrollToContactForm}
                className="group relative inline-flex items-center gap-3 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(56,189,248,0.3)]"
              >
                Sécuriser mon autonomie
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
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
                ACCESSIBILITÉ & BIEN-ÊTRE
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  L'expertise ergonomique d'exception
                </span>
              </h2>

              <div className="space-y-6 text-slate-600 leading-relaxed text-lg italic">
                <p>
                  Rendre une salle de bain accessible ne signifie pas sacrifier l'esthétique. Nous concevons des espaces ergonomiques qui allient design contemporain and sécurité maximale. Chez <span className="text-slate-900 font-semibold italic">Groupe BML Rénovation</span>, nous redonnons du plaisir aux gestes du quotidien.
                </p>
                <p>
                  {isGrenoble 
                    ? "Nos experts en adaptation PMR à Grenoble maîtrisent les normes les plus strictes for sécuriser votre habitat. De la douche à l'italienne sans ressaut à l'installation de WC surélevés within Grenoble, nous orchestrons votre transformation with une propreté de chantier exemplaire and un accompagnement for les aides (MaPrimeAdapt')."
                    : "Qu'il s'agisse de transformer une baignoire encombrante en une douche de plain-pied sécurisée or d'agencer une suite parentale ergonomique, nous appliquons une rigueur absolue. Chaque barre d'appui est fixée with renfort, chaque sol est certifié antidérapant PN24."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-white transition-all duration-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Sols Antidérapants PN24</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-white transition-all duration-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Architecte d'Intérieur Offert</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#38bdf8]/10 to-blue-600/5 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2005%20-%20Hero%20-%20After.jpeg.png"
                  alt="Salle de bain PMR sécurisée design"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 italic">Nos Réalisations Adaptées</h2>
          <p className="text-slate-600 max-w-2xl mx-auto italic">Découvrez comment nous marions sécurité and élégance within nos projets PMR.</p>
        </div>
        <ImageCarousel />
      </section>

      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center flex-row-reverse">
            <div className="lg:pr-12 order-2 lg:order-1">
              <div className="space-y-10">
                {[
                  { 
                    icon: <Accessibility className="w-6 h-6" />, 
                    title: "Ergonomie Totale", 
                    desc: "Étude des rayons de giration and des hauteurs d'usage for une autonomie sans compromis." 
                  },
                  { 
                    icon: <Grid3X3 className="w-6 h-6" />, 
                    title: "Matériaux Sécurisés", 
                    desc: "Grès cérame antidérapant and profilés de douche extra-plats for limiter tout risque de chute." 
                  },
                  { 
                    icon: <Check className="w-6 h-6" />, 
                    title: "Domotique Confort", 
                    desc: "Détection de présence, éclairage nocturne automatique and robinetteries thermostatiques sécurisées." 
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#38bdf8] group-hover:bg-[#38bdf8] group-hover:text-white transition-all duration-300">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-slate-900 mb-2 italic uppercase tracking-wide">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed font-medium italic">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="text-center bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-12 text-white mt-8 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {isGrenoble ? "Un besoin d'accessibilité à Grenoble ?" : "Votre SDB PMR Signature"}
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  {isGrenoble
                    ? "Nos experts de l'adaptation basés à Grenoble sécurisent votre habitat with bienveillance."
                    : "Redonner de la dignité and du confort across un agencement intelligent."}
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="group inline-flex items-center gap-2 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_15px_30px_rgba(56,189,248,0.2)] transition-all duration-300 hover:scale-105"
                >
                  Étudier mon projet d'accessibilité
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl -skew-y-2">
                <OptimizedImage
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2005%20-%2003.jpeg"
                  alt="Détails salle de bain PMR premium"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#38bdf8]/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#38bdf8] font-bold uppercase tracking-widest text-sm mb-4 block">Protocole Sécurité</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Votre projet en 4 temps</h2>
            <div className="w-24 h-1 bg-[#38bdf8] mx-auto opacity-50" />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audit", desc: "Analyse d'ergonomie and des besoins spécifiques by nos techniciens certifiés." },
              { step: "02", title: "Conception", desc: "Planification des circulations and sélection des équipements certifiés PMR." },
              { step: "03", title: "Chantier", desc: "Pose with renforts structurels for les barres d'appui and étanchéité absolue." },
              { step: "04", title: "Support", desc: "Aide au montage du dossier MaPrimeAdapt' and service après-vente réactif." }
            ].map((s, i) => (
              <div key={i} className="relative p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-500">
                <span className="text-7xl font-black text-white/5 absolute -top-4 right-4 group-hover:text-[#38bdf8]/20 transition-colors uppercase">{s.step}</span>
                <h3 className="text-2xl font-bold mb-4 relative z-10">{s.title}</h3>
                <p className="text-white/60 relative z-10 leading-relaxed font-medium italic">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white relative overflow-hidden border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-50 rounded-[3.5rem] p-12 md:p-24 shadow-2xl border border-slate-100 grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                  AUTONOMIE & ACCOMPAGNEMENT
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight italic">
                  <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                    Accompagnement d’architecte offert
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg italic">
                <p>
                  Parce que l'accessibilité exige une précision d'orfèvre, nous collaborons with <span className="font-bold text-slate-900 underline decoration-[#38bdf8]">Anaïs</span>. Bénéficiez de l'expertise d'un architecte d'intérieur for co-concevoir votre espace : ergonomie des flux, harmonie chromatique apaisante and éclairage sécurisant sans zone d'ombre.
                </p>
              </div>

              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 text-slate-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#38bdf8]"><Check className="w-5 h-5" /></div>
                  <span className="italic">Projet 3D d'implantation ergonomique offert</span>
                </div>
                <div className="flex items-center gap-4 text-slate-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#38bdf8]"><Check className="w-5 h-5" /></div>
                  <span className="italic">Conseils décoration et sélection de matériaux antidérapants premium</span>
                </div>
              </div>

              <button 
                onClick={scrollToContactForm} 
                className="relative overflow-hidden bg-slate-900 text-white px-12 py-6 rounded-full font-bold hover:shadow-[0_25px_50px_-12px_rgba(56,189,248,0.5)] transition-all flex items-center gap-4 group"
              >
                <span className="relative z-10">Lancer mon projet design</span>
                <Pen className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-[#38bdf8] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              
              <p className="mt-8 text-xs text-slate-400 italic">
                * Accompagnement d’architecte pour la décoration intérieure and le choix des matériaux offert pour tout devis signé.
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
                <img
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg"
                  alt="Architecture d'intérieur Anaïs"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Signature Accessibilité</p>
                    <p className="text-xl font-semibold">"L'autonomie est le plus beau des luxes."</p>
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
                {isGrenoble ? "NOTRE MÉTIER ISÈRE" : "CHAMP D'ACTION"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  La perfection au service de l'usage
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed italic font-medium">
                {isGrenoble
                  ? "À Grenoble and en Isère, Groupe BML Rénovation Tout Corps D'état maîtrise l'adaptation handicap. Nous coordonnons maçonnerie, plomberie spécialisée and finitions antidérapantes with une propreté de chantier and une rigueur exemplaires."
                  : "Groupe BML Rénovation Tout Corps D'état possède une solide expérience en accessibilité. Nous coordonnons nos plombiers, carreleurs and électriciens for que vos salles de bains PMR soient livrées with un niveau de fiabilité digne des plus grands standards de santé."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Accessibility className="w-10 h-10" />,
                  title: "Adaptations",
                  items: ["Transformation Baignoire", "Douche de Plain-Pied", "Élargissement Portes", "WC Surélevés / Senior", "Mobilier Ergonomique"]
                },
                {
                  icon: <Ruler className="w-10 h-10" />,
                  title: "Techniques",
                  items: ["Plomberie Spécialisée", "Sols PN24 Certifiés", "Barres de Maintien Renforcées", "Étanchéité SEL Garantie", "Robinets à Levier Pro"]
                },
                {
                  icon: <ShieldCheck className="w-10 h-10" />,
                  title: "Garanties",
                  items: ["Garantie Décennale TCE", "Labels RGE & Qualibat", "Chantier Millimétré", "Délais de Pose Garantis", "Aide MaPrimeAdapt'"]
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
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 italic">{card.title}</h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] group-hover/item:scale-150 transition-transform" />
                        <span className="text-sm font-medium italic">{item}</span>
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
              Qualité Certifiée
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Nos labels for votre habitat
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {[
              { name: 'RGE', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', desc: 'Expertise Bâtiment' },
              { name: 'Accessibilité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', desc: 'Savoir-Faire PMR' },
              { name: 'Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', desc: 'Finition Élite' },
              { name: 'Artisan', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', desc: 'Artisan de Confiance' },
              { name: 'Bâtiment', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', desc: 'Normes de Pose' },
              { name: 'Isère Local', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', desc: 'Pro de Proximité' },
              { name: 'Audit', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', desc: 'Plan Technique' },
              { name: 'Garantie', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', desc: 'Assurance BML' },
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
                <p className="text-[10px] md:text-xs font-semibold text-slate-600 leading-tight italic">{cert.desc}</p>
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
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
              <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                Nos partenaires for des produits d'élite
              </span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto italic">
              Nous collaborons exclusivement with les plus grandes enseignes de matériaux and d'équipements for garantir la perfection de vos projets.
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
              { name: 'LMS', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Logo_LMS_insta_Plan_ de_travail_1_Plan_de_travail_1_c8ybfl%20(1).jpg' },
              { name: 'Brun', logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/233f5492189448a4f76cf952714f_gmen2x%20(1).png' },
              { name: 'Anaïs', logoUrl: 'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20logo%20image.png' }
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

      <ServiceFAQ 
        items={salleDeBainPMRFAQs} 
        title={isGrenoble ? "FAQ SDB PMR à Grenoble" : "FAQ Salle de Bain PMR & Senior"}
        description={isGrenoble ? "Retrouvez les réponses de nos experts sur l'adaptation and l'accessibilité à Grenoble." : "Retrouvez les réponses de nos experts sur la sécurisation de votre pièce d'eau."}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default SallesDeBainPMR;
