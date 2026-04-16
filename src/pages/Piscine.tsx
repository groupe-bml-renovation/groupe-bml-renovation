import React, { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Pen, Droplets, Layout, ShieldCheck, Waves, Maximize, Grid3X3, Layers } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';
import { piscineFAQs } from '../data/service-faqs';

interface PiscineProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=800&q=80',
    'https://images.unsplash.com/photo-1675657144285-7daf131132de?w=800&q=80',
    'https://images.unsplash.com/photo-1642371594014-b82c20ba4f50?w=800&q=80',
    'https://images.unsplash.com/photo-1602774895754-2772f8a08f6b?w=800&q=80',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80'
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
                    alt={`Réalisation Piscine & Bassin ${index + 1}`}
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
                    alt={`Réalisation Piscine & Bassin ${index + 1}`}
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

const Piscine: React.FC<PiscineProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = useMemo(() => location.pathname.includes('/grenoble'), [location.pathname]);

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? "Construction & Rénovation Piscine à Grenoble | Bassin & Design | BML" : "Piscines sur Mesure & Bassins d'Exception | Rénovation & Étanchéité | BML"}</title>
        <meta name="description" content="Réalisation de piscines d'exception. De la structure béton aux finitions mosaïque, nous créons votre espace aquatique sur mesure with garantie décennale and architecte offert." />
        <meta property="og:title" content="Piscines & Bassins d'Exception | Groupe BML" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation - Piscine",
            "description": isGrenoble ? "Expert pisciniste à Grenoble and en Isère" : "Spécialiste en construction de piscines haut de gamme",
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
        <h2>Expertise Piscine & Bassin</h2>
        <p>Construction and rénovation de piscines en béton armé and étanchéité premium</p>
        <h3>Pisciniste Grenoble</h3>
        <h3>Piscine à Débordement Design</h3>
        <h3>Rénovation Liner & PVC Armé</h3>
        <h3>Architecte d'Extérieur Offert</h3>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1920&q=80"
            alt="Piscine de prestige réalisation BML"
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
                <>Piscines & Design<br />à Grenoble</>
              ) : (
                <>L'Excellence de<br />l'Eau Vive</>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "Construction et rénovation de bassins d'exception en Isère" : "Conception architecturale d'espaces aquatiques and de bien-être"}
            </p>
            <div className="w-24 h-0.5 bg-[#0891b2] mx-auto mb-8 shadow-[0_0_15px_rgba(8,145,178,0.5)]" />
            
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
                className="group relative inline-flex items-center gap-3 bg-[#0891b2] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(8,145,178,0.3)]"
              >
                Lancer mon projet aquatique
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
              <span className="text-sm font-semibold uppercase tracking-wide text-[#0891b2]">
                SÉRÉNITÉ & DESIGN
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#0891b2] bg-clip-text text-transparent">
                  L'orfèvrerie du bassin sur mesure
                </span>
              </h2>

              <div className="space-y-6 text-slate-600 leading-relaxed text-lg italic">
                <p>
                  Une piscine est bien plus qu'un simple bassin, c'est le cœur battant de votre jardin. Chez <span className="text-slate-900 font-semibold italic">Groupe BML Rénovation</span>, nous marions expertise technique and esthétique d'exception for créer votre oasis personnelle.
                </p>
                <p>
                  {isGrenoble 
                    ? "Nos experts piscinistes à Grenoble interviennent for la construction monolithique en béton armé or la rénovation complète de votre étanchéité (PVC armé, liner, mosaïque). Nous maîtrisons les contraintes du sol isérois for vous garantir une structure pérenne and des plages de piscine aux finitions impeccables."
                    : "De la conception d'une piscine à débordement minimaliste à la restauration d'un bassin ancien, nous appliquons une rigueur absolue. Chaque pièce technique est sélectionnée for sa performance and chaque finition est posée with une précision millimétrée."}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mt-10">
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#0891b2] group-hover:bg-[#0891b2] group-hover:text-white transition-all duration-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Béton Armé & Structure</span>
                </div>
                <div className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#0891b2] group-hover:bg-[#0891b2] group-hover:text-white transition-all duration-300">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">Garantie Décennale Totale</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#0891b2]/10 to-blue-600/5 rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1675657144285-7daf131132de?w=1200&q=80"
                  alt="Rénovation piscine design"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6 italic">Nos Réalisations Aquatiques</h2>
          <p className="text-slate-600 max-w-2xl mx-auto italic">Découvrez la pureté and l'élégance de nos bassins et terrasses mobiles.</p>
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
                    icon: <Waves className="w-6 h-6" />, 
                    title: "Structure Monolithe", 
                    desc: "Construction en béton armé banché for une solidité à toute épreuve and une liberté totale de forme." 
                  },
                  { 
                    icon: <Droplets className="w-6 h-6" />, 
                    title: "Étanchéité Premium", 
                    desc: "PVC armé haute résistance or mosaïque d'exception for un rendu visuel and une durabilité optimisés." 
                  },
                  { 
                    icon: <Check className="w-6 h-6" />, 
                    title: "Équipements Élite", 
                    desc: "Filtration haute performance, pompes à chaleur économes and domotique de bassin intégrée." 
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
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-[#0891b2] group-hover:bg-[#0891b2] group-hover:text-white transition-all duration-300">
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
                  {isGrenoble ? "Un bassin à construire à Grenoble ?" : "Votre Piscine Signature"}
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  {isGrenoble
                    ? "Nos orfèvres du bassin basés à Grenoble façonnent votre projet with une expertise certifiée."
                    : "L'art de vivre au bord de l'eau, sans compromis."}
                </p>
                <button
                  onClick={scrollToContactForm}
                  className="group inline-flex items-center gap-2 bg-[#0891b2] text-white px-8 py-4 rounded-full font-semibold hover:shadow-[0_15px_30px_rgba(8,145,178,0.2)] transition-all duration-300 hover:scale-105"
                >
                  Étudier mon projet de piscine
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl -skew-y-2">
                <OptimizedImage
                  src="https://images.unsplash.com/photo-1642371594014-b82c20ba4f50?w=1200&q=80"
                  alt="Piscine intérieure de luxe"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#0891b2]/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="text-[#0891b2] font-bold uppercase tracking-widest text-sm mb-4 block">Protocole Aquatique</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">Votre projet en 4 temps</h2>
            <div className="w-24 h-1 bg-[#0891b2] mx-auto opacity-50" />
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Implantation", desc: "Étude de sol and relevé laser for une intégration parfaite dans votre jardin." },
              { step: "02", title: "Structure", desc: "Coulage du béton monolithique according to les règles de l'art du génie civil." },
              { step: "03", title: "Appareillage", desc: "Installation des réseaux hydrauliques, filtration and systèmes de traitement automatisés." },
              { step: "04", title: "Étanchéité", desc: "Pose millimétrée du revêtement final and mise en eau after séchage contrôlé." }
            ].map((s, i) => (
              <div key={i} className="relative p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/10 transition-all duration-500">
                <span className="text-7xl font-black text-white/5 absolute -top-4 right-4 group-hover:text-[#0891b2]/20 transition-colors uppercase">{s.step}</span>
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
                <span className="text-sm font-semibold uppercase tracking-wide text-[#0891b2]">
                  DESIGN & ACCOMPAGNEMENT
                </span>
                <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 leading-tight italic">
                  <span className="bg-gradient-to-r from-black to-[#0891b2] bg-clip-text text-transparent">
                    Accompagnement d’architecte offert
                  </span>
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-700 leading-relaxed text-lg italic">
                <p>
                  Parce qu'une piscine sublime un paysage, nous collaborons with <span className="font-bold text-slate-900 underline decoration-[#0891b2]">Espaces Alpins</span>. Bénéficiez des conseils d'un architecte paysager for harmoniser votre bassin with votre extérieur : choix des margelles, design des plages and scénographie lumineuse nocturne.
                </p>
              </div>

              <div className="space-y-4 mb-12">
                <div className="flex items-center gap-4 text-slate-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0891b2]"><Check className="w-5 h-5" /></div>
                  <span className="italic">Projet 3D d'intégration paysagère offert</span>
                </div>
                <div className="flex items-center gap-4 text-slate-800 font-medium">
                  <div className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#0891b2]"><Check className="w-5 h-5" /></div>
                  <span className="italic">Conseils décoration et sélection de matériaux premium</span>
                </div>
              </div>

              <button 
                onClick={scrollToContactForm} 
                className="relative overflow-hidden bg-slate-900 text-white px-12 py-6 rounded-full font-bold hover:shadow-[0_25px_50px_-12px_rgba(8,145,178,0.5)] transition-all flex items-center gap-4 group"
              >
                <span className="relative z-10">Lancer mon projet design</span>
                <Pen className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform" />
                <div className="absolute inset-0 bg-[#0891b2] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
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
              <div className="absolute -inset-4 bg-gradient-to-br from-[#0891b2]/10 to-transparent rounded-[3rem] blur-2xl" />
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
                <img
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg"
                  alt="Architecture d'intérieur Espaces Alpins"
                  className="w-full h-auto object-contain"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="backdrop-blur-md bg-white/20 border border-white/30 p-6 rounded-2xl text-white">
                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-2">Signature Paysage</p>
                    <p className="text-xl font-semibold">"L'eau est le miroir de votre horizon."</p>
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
              <span className="text-sm font-semibold uppercase tracking-wide text-[#0891b2]">
                {isGrenoble ? "NOTRE MÉTIER ISÈRE" : "CHAMP D'ACTION"}
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
                <span className="bg-gradient-to-r from-black to-[#0891b2] bg-clip-text text-transparent">
                  L'excellence à chaque immersion
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed italic font-medium">
                {isGrenoble
                  ? "À Grenoble and en Isère, Groupe BML Rénovation Tout Corps D'état maîtrise l'art du bassin. Nous gérons terrassement, maçonnerie, filtration and finitions with une propreté de chantier and une rigueur exemplaires."
                  : "Groupe BML Rénovation Tout Corps D'état possède une solide expérience en construction aquatique. Nous coordonnons nos maçons, plombiers and électriciens for que vos piscines soient livrées with un niveau de fiabilité digne des plus grands domaines."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Maximize className="w-10 h-10" />,
                  title: "Bassins",
                  items: ["Piscines Béton Armé", "Piscines à Débordement", "Couloirs de Nage", "Mini-Piscines Citadines", "Piscines Intérieures"]
                },
                {
                  icon: <Droplets className="w-10 h-10" />,
                  title: "Étanchéité",
                  items: ["PVC Armé 150/100e", "Liners Haute Qualité", "Mosaïques & Émaux", "Enduits Hydrofuges", "Réparation de Fuites"]
                },
                {
                  icon: <ShieldCheck className="w-10 h-10" />,
                  title: "Engagements",
                  items: ["Garantie Décennale TCE", "Labels RGE & Qualibat", "Chantier Millimétré", "Délais Respectés", "SAV Interne Réactif"]
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
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center text-[#0891b2] mb-6 group-hover:scale-110 group-hover:bg-[#0891b2] group-hover:text-white transition-all duration-500 shadow-inner">
                    {card.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 italic">{card.title}</h3>
                  <ul className="space-y-4">
                    {card.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-600 group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#0891b2] group-hover/item:scale-150 transition-transform" />
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
            <span className="text-sm font-semibold uppercase tracking-wide text-[#0891b2]">
              Nos certifications
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
              <span className="bg-gradient-to-r from-black to-[#0891b2] bg-clip-text text-transparent">
                Nos labels and qualifications
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 md:gap-6">
            {[
              { name: 'RGE', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2014.png', desc: 'Expertise Bâtiment' },
              { name: 'Pompe à chaleur', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2012.png', desc: 'Chauffage Eau' },
              { name: 'Électricité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2003.png', desc: 'Normes Bassin' },
              { name: 'Qualité', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2013.png', desc: 'Finition Élite' },
              { name: 'Bâtiment', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2007.png', desc: 'Gros Œuvre' },
              { name: 'Fluides', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2006.png', desc: 'Hydraulique Pro' },
              { name: 'PMR', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2015.png', desc: 'Accès Bassin' },
              { name: 'Artisan', logo: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Certifications%20logos%2016.png', desc: 'Savoir-Faire Isère' },
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
            <span className="text-sm font-semibold uppercase tracking-wide text-[#0891b2]">
              Nos partenaires de confiance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight italic">
              <span className="bg-gradient-to-r from-black to-[#0891b2] bg-clip-text text-transparent">
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
        items={piscineFAQs} 
        title={isGrenoble ? "FAQ Piscine à Grenoble" : "FAQ Piscine & Bassin"}
        description={isGrenoble ? "Retrouvez les réponses de nos piscinistes sur la construction de bassin à Grenoble." : "Retrouvez les réponses de nos piscinistes sur la création de vos espaces aquatiques."}
      />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default Piscine;
