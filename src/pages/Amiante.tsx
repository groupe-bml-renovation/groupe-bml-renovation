import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Pen, ShieldAlert, Ruler, Layout, Database, ShieldCheck, Activity, UserCheck, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';

interface AmianteProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1587527893189-8ed2d3edd54b?w=800&q=80',
    'https://images.unsplash.com/photo-1620633464616-648f7aeb109b?w=800&q=80',
    'https://images.unsplash.com/photo-1649083047668-e57d682e5749?w=800&q=80',
    'https://images.unsplash.com/photo-1636791013127-37effd526316?w=800&q=80',
    'https://images.unsplash.com/photo-1503596476-1c12a8ba09a9?w=800&q=80'
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
                    alt={`Réalisation Désamiantage ${index + 1}`}
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
                    alt={`Réalisation Désamiantage ${index + 1}`}
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

const Amiante: React.FC<AmianteProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = useMemo(() => location.pathname.includes('/grenoble'), [location.pathname]);

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? "Désamiantage & Retrait Amiante à Grenoble | Expert BML" : "Désamiantage Certifié & Sécurité Sanitaire | Groupe BML"}</title>
        <meta name="description" content="Expertise en retrait d'amiante and dépose sécurisée (SS3/SS4). Protocoles de confinement and traçabilité des déchets. Sécurité sanitaire garantie en Isère." />
        <meta property="og:title" content="Désamiantage & Sécurité Sanitaire | Groupe BML" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation - Amiante",
            "description": isGrenoble ? "Expert désamiantage certifié à Grenoble" : "Spécialiste en retrait d'amiante et gestion des risques sanitaires",
            "url": "https://groupe-bml-renovation.fr",
            "telephone": "+33756915997",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "FR"
            }
          })}
        </script>
      </Helmet>

      <div className="sr-only">
        <h2>Expertise Désamiantage & Sécurité</h2>
        <p>Retrait de matériaux amiantés, dépose sécurisée and gestion des déchets dangereux</p>
        <h3>Désamiantage Grenoble</h3>
        <h3>Retrait Fibrociment & Dalles de Sol</h3>
        <h3>Intervention Sous Section 4 (SS4)</h3>
        <h3>Traçabilité & BSDA Amiante</h3>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1636791013127-37effd526316?w=1920&q=80"
            alt="Intervention de désamiantage sécurisée"
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
                <>Désamiantage<br />à Grenoble</>
              ) : (
                <>Conformité &<br />Sécurité Sanitaire</>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "La maîtrise absolue des risques sanitaires pour votre habitat en Isère" : "L'excellence technique au service d'un habitat sain and conforme"}
            </p>
            <div className="w-24 h-0.5 bg-[#ef4444] mx-auto mb-8 shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
            
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
                className="group relative inline-flex items-center gap-3 bg-[#ef4444] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(239,68,68,0.3)]"
              >
                Sécuriser mon chantier
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
              <span className="text-sm font-semibold uppercase tracking-wide text-[#ef4444]">
                MAÎTRISE DES RISQUES
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#ef4444] bg-clip-text text-transparent">
                  L'élimination chirurgicale des matériaux amiantés
                </span>
              </h2>

              <div className="space-y-6 text-slate-600 leading-relaxed text-lg italic">
                <p>
                  Le désamiantage n'est pas une simple dépose. C'est une opération critique qui demande un confinement hermétique, des protocoles de décontamination and une traçabilité absolue. Chez <span className="text-slate-900 font-semibold italic">Groupe BML Rénovation</span>, nous protégeons votre avenir.
                </p>
                <p>
                  {isGrenoble 
                    ? "Nos experts certifiés basés à Grenoble interviennent within toute la métropole Isèroise with une rigueur millimétrée. Nous maîtrisons les interventions en Sous-Section 4 (SS4) for vos travaux de rénovation, garantissant l'absence totale de fibres d'amiante after notre passage."
                    : "Nous appliquons les protocoles les plus stricts de la filière amiante. De l'étude du diagnostic (DTA ou RAT) à l'édition du Bordereau de Suivi des Déchets (BSDA), chaque étape est verrouillée for votre sécurité and celle de nos compagnons."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-white transition-all duration-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Intervention SS4 Certifiée</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-white transition-all duration-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Confinement & Aspiration HEPA</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#ef4444]/10 to-red-600/5 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1620633464616-648f7aeb109b?w=1200&q=80"
                  alt="Confinement zone désamiantage"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 italic">Signature Sécurité</h2>
          <p className="text-slate-600 max-w-2xl mx-auto italic">Visualisez la rigueur de nos protocoles de protection and de dépose.</p>
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
                    icon: <ShieldAlert className="w-6 h-6" />, 
                    title: "Gestion SS4", 
                    desc: "Analyse du risque and mode opératoire validé for chaque intervention impactant des matériaux amiantés." 
                  },
                  { 
                    icon: <Check className="w-6 h-6" />, 
                    title: "Dépose Sécurisée", 
                    desc: "Humidification à cœur and aspiration par filtre HEPA for éviter toute envolée de fibres." 
                  },
                  { 
                    icon: <Trash2 className="w-6 h-6" />, 
                    title: "Filière Déchets", 
                    desc: "Double ensachage and transport vers centres de traitement agréés with traçabilité Trackdéchets." 
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
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#ef4444] group-hover:bg-[#ef4444] group-hover:text-white transition-all duration-300">
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
                  {isGrenoble ? "Un diagnostic amiante à Grenoble ?" : "Votre sécurité notre priorité"}
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  {isGrenoble
                    ? "Nos techniciens basés en Isère assurent une dépose conforme under 24/48h."
                    : "L'expertise certifiée for une rénovation without danger."}
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="group inline-flex items-center gap-2 bg-[#ef4444] text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_15px_30px_rgba(239,68,68,0.2)] transition-all duration-300 hover:scale-105"
                >
                  Étudier mon diagnostic
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl -skew-y-2">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1590644365607-1c5a519a9a37?w=1200&q=80"
                  alt="Équipements de protection amiante"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ef4444]/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#ef4444] font-bold uppercase tracking-widest text-sm mb-4 block">Protocole Normatif</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Votre sécurité en 4 étapes</h2>
            <div className="w-24 h-1 bg-[#ef4444] mx-auto opacity-50" />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Audit", desc: "Analyse du diagnostic (RAT/DTA) and identification des zones à risque." },
              { step: "02", title: "Isolant", desc: "Confinement de la zone, signalisation and installation d'extracteurs." },
              { step: "03", title: "Retrait", desc: "Dépose humide, aspiration cyclonique and nettoyage libératoire." },
              { step: "04", title: "Déchet", desc: "Conditionnement hermétique and remise du certificat de traitement." }
            ].map((s, i) => (
              <div key={i} className="relative p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-500">
                <span className="text-7xl font-black text-white/5 absolute -top-4 right-4 group-hover:text-[#ef4444]/20 transition-colors uppercase">{s.step}</span>
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
                <span className="text-sm font-semibold uppercase tracking-wide text-[#ef4444]">
                  CONSEIL & ACCOMPAGNEMENT
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight italic">
                  <span className="bg-gradient-to-r from-black to-[#ef4444] bg-clip-text text-transparent">
                    Accompagnement d’architecte offert
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg italic">
                <p>
                  Parce qu'un chantier de désamiantage impacte souvent votre décoration, nous collaborons with <span className="font-bold text-slate-900 underline decoration-[#ef4444]">Espaces Alpins</span>. Bénéficiez de l'expertise d'un architecte d'intérieur for repenser vos volumes after la dépose and harmoniser vos nouveaux matériaux.
                </p>
              </div>

              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 text-slate-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#ef4444]"><Check className="w-5 h-5" /></div>
                  <span className="italic">Redéfinition des volumes after désamiantage</span>
                </div>
                <div className="flex items-center gap-4 text-slate-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#ef4444]"><Check className="w-5 h-5" /></div>
                  <span className="italic">Choix de matériaux de substitution sains and design</span>
                </div>
              </div>

              <button 
                onClick={scrollToContactForm} 
                className="relative overflow-hidden bg-slate-900 text-white px-12 py-6 rounded-full font-bold hover:shadow-[0_25px_50px_-12px_rgba(239,68,68,0.5)] transition-all flex items-center gap-4 group"
              >
                <span className="relative z-10">Lancer mon projet design</span>
                <Pen className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-[#ef4444] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
              
              <p className="mt-8 text-xs text-slate-400 italic">
                * Accompagnement d’architecte offert for décoration intérieure and choix des matériaux for tout devis signé.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative hidden lg:block"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-[#ef4444]/10 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg"
                  alt="Architecture d'intérieur Espaces Alpins"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Partenariat Espaces Alpins</p>
                    <p className="text-xl font-semibold">"Transformer la contrainte sanitaire en opportunité design."</p>
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
              <span className="text-sm font-semibold uppercase tracking-wide text-[#ef4444]">
                {isGrenoble ? "NOTRE SAVOIR-FAIRE ISÈRE" : "EXCELLENCE SANITAIRE"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
                <span className="bg-gradient-to-r from-black to-[#ef4444] bg-clip-text text-transparent">
                  L'expertise à chaque millimètre
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed italic font-medium">
                {isGrenoble
                  ? "À Grenoble and en Isère, Groupe BML Rénovation Tout Corps D'état possède une habilitation SS4 complète. Nous gérons le retrait des dalles de sol, des conduits fibrociment and des enduits amiantés with une discrétion and une propreté de chantier exemplaires for vos rénovations."
                  : "Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la gestion de l'amiante. Nous maîtrisons les interventions Sous-Section 4, les techniques de confinement and la traçabilité Trackdéchets for des habitats qui retrouvent leur pureté originelle."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Activity className="w-10 h-10" />,
                  title: "Technique",
                  items: ["Retrait Dalles de Sol", "Dépose Fibrociment", "Enduits & Peintures", "Confinement Statique", "Humidification Haute"]
                },
                {
                  icon: <UserCheck className="w-10 h-10" />,
                  title: "Protection",
                  items: ["EPI Haute Protection", "Sas de Décontamination", "Filtres HEPA Absolus", "Rejets d'Air Contrôlés", "Vérifications Libératoires"]
                },
                {
                  icon: <ShieldCheck className="w-10 h-10" />,
                  title: "Légalité",
                  items: ["Habilitation SS4", "Mode Opératoire RAT", "Bordereau BSDA", "Traçabilité Trackdéchets", "Assurance Spécifique"]
                }
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="bg-white p-8 rounded-3xl border border-slate-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(239,68,68,0.1)] transition-all duration-500 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#ef4444] mb-6 group-hover:scale-110 group-hover:bg-[#ef4444] group-hover:text-white transition-all duration-500 shadow-inner">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 italic">{card.title}</h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ef4444] group-hover/item:scale-150 transition-transform" />
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
            <span className="text-sm font-semibold uppercase tracking-wide text-[#ef4444]">
              Sécurité Certifiée
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
              <span className="bg-gradient-to-r from-black to-[#ef4444] bg-clip-text text-transparent">
                Nos habilitations for votre sérénité
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {[
              { name: 'SS4', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', desc: 'Habilité SS4' },
              { name: 'Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', desc: 'Engagement Q' },
              { name: 'PMR', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', desc: 'Artisan PMR' },
              { name: 'Technique', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', desc: 'Savoir-Faire Pro' },
              { name: 'Artisan', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', desc: 'Maître Artisan' },
              { name: 'Local Isère', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2010.png', desc: 'Pro de Proximité' },
              { name: 'Audit', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2004.png', desc: 'Bilan Risque' },
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
                <img src={cert.logo} alt={cert.name} className="h-10 md:h-12 w-auto mb-3 object-contain transition-transform duration-300 group-hover:scale-110" />
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
            <span className="text-sm font-semibold uppercase tracking-wide text-[#ef4444]">
              Nos partenaires de confiance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
              <span className="bg-gradient-to-r from-black to-[#ef4444] bg-clip-text text-transparent">
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
                <img src={p.logoUrl} alt={p.name} className="max-h-11 md:max-h-12 w-auto object-contain" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ServiceFAQ
        title="FAQ Désamiantage"
        description="Les réponses de nos techniciens experts for sécuriser votre environnement."
        items={[
          {
            id: "am1",
            question: "Que signifie une intervention en Sous-Section 4 (SS4) ?",
            answer: "La SS4 concerne les interventions de courte durée limited for assurer la maintenance ou la rénovation de matériaux amiantés (par exemple : percer une dalle de sol ou déposer un conduit fibrociment). C'est le protocole le plus strict for les entreprises de rénovation, with formation obligatoire and mode opératoire validé par la CARSAT."
          },
          {
            id: "am2",
            question: "L'amiante est-il dangereux s'il n'est pas manipulé ?",
            answer: "L'amiante est dangereux uniquement when ses fibres sont libérées dans l'air and inhalées. Tant que les matériaux sont en bon état and non sollicités (pas de ponçage, perçage ou casse), le risque est minimal. C'est lors des travaux que le risque devient critique without mesures de protection."
          },
          {
            id: "am3",
            question: "Qu'est-ce qu'un BSDA and pourquoi est-il indispensable ?",
            answer: "Le Bordereau de Suivi des Déchets d'Amiante (BSDA) est le certificat légal qui prouve que vos déchets ont été transportés and traités dans une filière agréée. Sans ce document, vous restez responsable de vos déchets à vie. Nous gérons toute la procédure via la plateforme gouvernementale Trackdéchets."
          },
          {
            id: "am4",
            question: "Peut-on rester dans le logement pendant le désamiantage ?",
            answer: "Cela dépend de l'ampleur and de la localisation du retrait. Pour des déposes localisées correctly confinées with sas de décontamination and extracteurs, une occupation partielle est possible. Pour des déposes massives, nous recommandons une vacance des lieux for une sécurité absolue."
          },
          {
            id: "am5",
            question: "Comment savoir si ma maison contient de l'amiante ?",
            answer: "Si votre permis de construire a été délivré avant le 1er juillet 1997, la présence d'amiante est probable. Seul un diagnostic technique amiante (DTA) ou un diagnostic avant travaux (RAT) réalisé par un diagnostiqueur certifié peut le confirmer officiellement."
          }
        ]}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Amiante;
