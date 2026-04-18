import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Pen } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';
import ServiceFAQ from '../components/ServiceFAQ';
import { toitureFAQs } from '../data/service-faqs';

interface ToitureProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2001.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2002.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2003.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2004.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2005.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2006.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2007.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2008.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2009.JPG',
    'https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/G%20BML%20-%2011%20-%2010.JPG'
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
                    alt={`Travaux de Toiture ${index + 1}`}
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
                    alt={`Travaux de Toiture ${index + 1}`}
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

const Toiture: React.FC<ToitureProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    navigate('/?scrollTo=contact-form');
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Travaux de toiture Grenoble | Couvreur Zingueur | Rénovation Toit | Groupe BML' : 'Travaux de toiture | Couvreur Zingueur | Rénovation Toiture | Groupe BML'}</title>
        <meta name="description" content={isGrenoble ? "Travaux de toiture à Grenoble et Isère. Couvreur zingueur professionnel, rénovation de toit, charpente, isolation et étanchéité. Devis gratuit pour votre toiture à Grenoble." : "Rénovation de toiture avec travaux de couverture, zinguerie et isolation. Couvreur professionnel pour toit terrasse, ardoise, tuile et bac acier. Devis gratuit."} />
        <meta name="keywords" content={isGrenoble ? "toiture Grenoble, couvreur Grenoble, zingueur Grenoble, rénovation toiture Grenoble, charpente Grenoble, isolation toiture Grenoble, toit terrasse Grenoble, étanchéité toiture Grenoble, devis toiture Grenoble" : "travaux de toiture, rénovation toiture, couvreur, zingueur, charpente, isolation toiture, étanchéité toit, toiture ardoise, toiture tuile, rénovation maison"} />
        <meta property="og:title" content={isGrenoble ? "Toiture Grenoble | Couvreur Zingueur | Rénovation Toit" : "Travaux de Toiture | Couvreur Zingueur | Groupe BML"} />
        <meta property="og:description" content={isGrenoble ? "Services de toiture à Grenoble - Couvreur zingueur expert, rénovation complète de toiture et charpente, devis gratuit." : "Travaux de toiture professionnels. Couvreur zingueur expert, rénovation de couverture, isolation et étanchéité de toit."} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? "Toiture Grenoble | Couvreur BML" : "Travaux de Toiture | Couvreur BML"} />
        <meta name="twitter:description" content={isGrenoble ? "Travaux de toiture à Grenoble. Couvreur professionnel, rénovation toit, isolation et zinguerie, devis gratuit." : "Services de toiture pour rénovation maison. Couvreur zingueur, travaux de couverture et isolation, devis gratuit."} />
      </Helmet>

      <div className="sr-only">
        <h2>Travaux de Toiture et Couverture</h2>
        <p>Couvreur zingueur professionnel pour rénovation de toiture et charpente</p>
        <h3>Rénovation de Toit et Étanchéité</h3>
        <h3>Entreprise de Couverture et Zinguerie</h3>
        <h3>Rénover sa Toiture avec Expertise</h3>
        <h3>Isolation de Toiture et Travaux Bâtiment</h3>
        <h3>Artisan Couvreur avec Garantie Décennale</h3>
      </div>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Travaux%20de%20toiture.png"
            alt="Travaux de Toiture"
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
                  Travaux de<br />toiture à Grenoble
                </>
              ) : (
                <>
                  Travaux de<br />toiture en Isère
                </>
              )}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "Services professionnels de toiture et zinguerie à Grenoble" : "Services de toiture d'excellence en Isère et alentours"}
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
                <div className="flex flex-col items-center gap-2">
                  <span className="text-white font-semibold text-lg uppercase tracking-wider">
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
                VOTRE TOITURE, NOTRE EXPERTISE
              </span>

              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  {isGrenoble
                    ? "Rénovation de toiture à Grenoble et protection de votre habitat"
                    : "Expertise en toiture en Isère pour une protection durable"}
                </span>
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                {isGrenoble
                  ? "À Grenoble, Groupe BML Rénovation intervient sur tous vos travaux de toiture, couverture et zinguerie. Assurez la pérennité de votre maison avec des solutions de rénovation de toit adaptées aux contraintes climatiques de la région Alpine."
                  : "La toiture est l'élément protecteur n°1 de votre maison. Nous proposons des solutions de rénovation complètes pour garantir l'étanchéité, l'isolation et l'esthétique de votre toit, quelles que soient les surfaces."}
              </p>

              <p className="text-slate-700 leading-relaxed mb-6">
                <span className="text-black font-semibold">Groupe BML Rénovation</span> vous accompagne dans tous vos <span className="text-black font-semibold">travaux de toiture et charpente</span>. Notre équipe locale vous conseille sur les meilleurs matériaux (tuile, ardoise, zinc) pour une <span className="text-black font-semibold">étanchéité parfaite</span>.
              </p>

              <button
                onClick={scrollToContactForm}
                className="group relative inline-flex items-center gap-3 bg-[#38bdf8] text-white px-8 py-4 rounded-full font-semibold overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_15px_30px_rgba(56,189,248,0.25)]"
              >
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
              className="relative rounded-2xl overflow-hidden shadow-2xl h-full aspect-[4/3]"
            >
              <OptimizedImage
                src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Travaux%20de%20toiture.png"
                alt="Expertise Toiture"
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

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-12">
            <div className="bg-[#f5f5f5] p-8 rounded-3xl">
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                {isGrenoble ? "TOITURE À GRENOBLE" : "TOITURE EN ISÈRE"}
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-slate-900">
                Couvreur professionnel certifié
              </h2>

              <p className="text-slate-700 leading-relaxed mb-6">
                Spécialistes de la rénovation de toiture en Isère, nous maîtrisons l'ensemble des techniques de couverture. De la réparation de fuites urgentes à la réfection totale de votre toiture, nos équipes garantissent un travail de précision.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                    <Check size={18} />
                  </div>
                  <span>Garantie Décennale</span>
                </div>
                <div className="flex items-center gap-4 text-slate-700">
                  <div className="w-8 h-8 rounded-full bg-[#38bdf8]/10 flex items-center justify-center text-[#38bdf8]">
                    <Check size={18} />
                  </div>
                  <span>Expertise Qualibat</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                { title: "Couverture", items: ["Tuiles terre cuite", "Ardoises naturelles", "Bac acier & Zinc", "Nettoyage & Démoussage"] },
                { title: "Zinguerie", items: ["Gouttières & Chéneaux", "Entourage cheminée", "Abergement Velux", "Façonnage sur mesure"] },
                { title: "Isolation", items: ["Isolation par l'extérieur", "Combles perdus", "Combles aménageables", "Écrans sous-toiture"] },
                { title: "Charpente", items: ["Modification de charpente", "Traitement bois", "Renforcement structurel", "Vérification d'état"] }
              ].map((service, i) => (
                <div key={i} className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <ul className="space-y-2">
                    {service.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-600">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">
            Une question sur votre projet de toiture ?
          </h2>
          <ServiceFAQ items={toitureFAQs} />
        </div>
      </section>

      <FooterSection onNavigate={onNavigate} />
    </div>
  );
};

export default Toiture;
