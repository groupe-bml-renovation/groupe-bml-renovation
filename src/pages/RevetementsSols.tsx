import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';

interface RevetementsSolsProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1613621792067-8e28d16b735c?w=800&q=80',
    'https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&q=80',
    'https://images.unsplash.com/photo-1630699376289-b62375a35505?w=800&q=80',
    'https://images.unsplash.com/photo-1706629503586-2731f65587ae?w=800&q=80',
    'https://images.unsplash.com/photo-1547333101-6bb18e609b2f?w=800&q=80',
    'https://images.unsplash.com/photo-1560185009-5bf9f2849488?w=800&q=80',
    'https://images.unsplash.com/photo-1722248211908-83d943641e6d?w=800&q=80',
    'https://images.unsplash.com/photo-1722603931789-aea8bd4f5d01?w=800&q=80'
  ];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = 320;
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
      const itemWidth = 320;
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
                  <img
                    src={img}
                    alt={`Revêtements de sols ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-6 animate-scroll" aria-hidden="true">
              {images.map((img, index) => (
                <div key={`set2-${index}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                  <img
                    src={img}
                    alt={`Revêtements de sols ${index + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
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

const RevetementsSols: React.FC<RevetementsSolsProps> = ({ onBack, onNavigate }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const revetementsSolsPartners = [
    {
      name: 'Gerflor',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/gerflor%402x.jpg'
    },
    {
      name: 'Quick-Step',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/quick-step%402x.jpg'
    },
    {
      name: 'Udirev',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/udirev%402x.jpg'
    }
  ];

  const scrollToContactForm = () => {
    onBack();
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Revêtements Sols Grenoble - Entreprise de Rénovation BML' : 'Rénovation Maison - Revêtements Sols | Entreprise de Rénovation BML'}</title>
        <meta name="description" content={isGrenoble ? 'Revêtements de sols à Grenoble (Isère) : professionnels qualifiés, parquet, carrelage, vinyle. Rénovation complète maison, devis gratuit.' : 'Rénovation maison complète : revêtements de sols professionnels. Travaux de rénovation maison ancienne et moderne. Artisan rénovation réputé. Rénover votre intérieur avec nos experts en travaux bâtiment. Devis gratuit rénovation.'} />
        <meta name="keywords" content={isGrenoble ? 'revêtements sols Grenoble, rénovation sols Grenoble, pose parquet Grenoble, carrelage Grenoble, rénovation maison Grenoble, travaux rénovation Isère, entreprise rénovation Grenoble' : 'rénovation maison, renovation maison, rénover une maison, rénovation, rénovations, bâtiment travaux publics, peintre en bâtiment, peintre dans le bâtiment, travaux de rénovation maison, entreprise de rénovation, travaux maison, rénovation maison complète, rénovation maison ancienne, coût rénovation maison, prix rénovation maison, rénovation intérieure, rénovation extérieure, travaux de peinture bâtiment, artisan rénovation maison, entreprise bâtiment rénovation'} />
        <meta property="og:title" content={isGrenoble ? 'Revêtements Sols Grenoble - Rénovation Professionnelle' : 'Rénovation Maison Complète - Revêtements Sols | Entreprise de Rénovation BML'} />
        <meta property="og:description" content={isGrenoble ? 'Revêtements de sols à Grenoble : poses professionnelles de parquet, carrelage, vinyle. Équipe qualifiée, devis gratuit.' : 'Transformez votre maison avec nos services de rénovation professionnels. Revêtements de sols, travaux intérieurs et extérieurs. Entreprise de rénovation expert avec devis gratuit.'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? 'Revêtements Sols Grenoble | Rénovation' : 'Rénovation Maison Complète | Revêtements Sols'} />
        <meta name="twitter:description" content={isGrenoble ? 'Posez vos sols avec des experts à Grenoble : parquet, carrelage, vinyle. Devis gratuit.' : 'Travaux de rénovation maison - Revêtements de sols, rénovation intérieure, extérieure et maison ancienne. Artisan qualifié.'} />
        <link rel="canonical" href={isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble/revetements-sols' : 'https://groupe-bml-renovation.fr/revetements-sols'} />
        <meta name="language" content="fr" />
        <meta name="geo.region" content={isGrenoble ? 'FR-38' : 'FR'} />

        {/* Hidden SEO content for search engines */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Groupe BML Rénovation",
            "description": isGrenoble ? "Entreprise de rénovation sols à Grenoble (Isère), revêtements de sols professionnels, pose parquet, carrelage, vinyle" : "Entreprise de rénovation maison complète, travaux de rénovation maison ancienne et moderne, rénovation intérieure et extérieure, revêtements de sols professionnels",
            "areaServed": isGrenoble ? "Grenoble, Isère, FR" : "FR",
            "serviceType": ["Rénovation maison", "Revêtements de sols", "Travaux de rénovation maison", "Rénovation intérieure", "Rénovation extérieure"],
            "knowsAbout": ["Rénovation maison complète", "Rénovation maison ancienne", "Entreprise de rénovation", "Artisan rénovation maison", "Travaux bâtiment", "Peintre en bâtiment", "Travaux de rénovation maison"]
          })}
        </script>
      </Helmet>

      {/* Hidden SEO headings for search engines - screen reader only */}
      <h1 className="sr-only">{isGrenoble ? 'Revêtements de Sols à Grenoble - Entreprise de Rénovation Professionnelle' : 'Rénovation Maison - Revêtements de Sols | Entreprise de Rénovation Complète'}</h1>
      <h2 className="sr-only">{isGrenoble ? 'Pose de Revêtements Sols à Grenoble (Isère) - Professionnels Qualifiés' : 'Travaux de Rénovation Maison Complète et Maison Ancienne'}</h2>
      <h3 className="sr-only">{isGrenoble ? 'Rénovation Maison à Grenoble avec nos Experts - Revêtements Sols Modernes' : 'Rénover une Maison avec nos Experts - Rénovation Intérieure et Extérieure'}</h3>
      <h4 className="sr-only">{isGrenoble ? 'Travaux de Rénovation à Grenoble et Région Isère' : 'Bâtiment Travaux Publics - Peintre en Bâtiment - Entreprise Bâtiment Rénovation'}</h4>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1722603931789-aea8bd4f5d01?w=1600&q=80"
            alt="Revêtements de Sols"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-slate-900/50 to-slate-900/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide capitalize">
              Revêtements de<br />sols{isGrenoble && <span> à Grenoble</span>}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? 'Professionnels qualifiés pour revêtements de sols à Grenoble - Pose parquet, carrelage, vinyle' : 'Des solutions durables et esthétiques pour tous vos espaces intérieurs et extérieurs'}
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
                REVÊTEMENTS DE SOLS
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Sublimer vos sols</span>{' '}
                <span className="text-slate-900">avec des revêtements</span><br />
                <span className="text-slate-900">alliant style et durabilité.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                {isGrenoble ? 'À Grenoble, nous transformons vos espaces avec nos solutions de revêtements de sols professionnels, alliant esthétique moderne, confort optimal et résistance exceptionnelle avec des matériaux de qualité supérieure.' : 'Transformez votre espace avec nos solutions de revêtements de sols professionnels, alliant esthétique moderne, confort optimal et résistance exceptionnelle grâce à des matériaux de qualité supérieure.'}
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation{isGrenoble && ' à Grenoble'}</strong> met à votre service des <strong>poseurs qualifiés</strong> qui
                maîtrisent toutes les techniques de pose moderne. <strong>Notre équipe vous conseille</strong> sur le
                choix des matériaux et des finitions pour créer l'ambiance parfaite.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que ce soit pour rénover une pièce, moderniser entièrement votre logement ou apporter une touche
                décorative unique, nos experts en revêtements de sols réalisent des travaux soignés qui révèlent le plein potentiel
                de vos espaces avec un résultat impeccable et durable.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1598718544285-7180f670198b?w=1200&q=80"
                alt="Revêtements de Sols"
                className="w-full h-[450px] object-cover"
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
                REVÊTEMENTS DE SOLS
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Habiller vos<br />sols avec élégance
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                {isGrenoble ? 'Groupe BML Rénovation, basée à Grenoble, réalise tous vos travaux de revêtements de sols avec le plus grand soin. De la préparation du support à la pose finale, nos poseurs professionnels vous garantissent un résultat esthétique et durable dans la région de Grenoble et ses environs.' : 'Groupe BML Rénovation tout corps d\'état réalise tous vos travaux de revêtements de sols avec le plus grand soin. De la préparation du support à la pose finale, nos poseurs professionnels vous garantissent un résultat esthétique et durable.'}
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Notre expertise couvre tous les types de revêtements : parquet, carrelage, vinyle, lino, moquette, résine. Nous utilisons exclusivement des matériaux professionnels de qualité supérieure pour votre confort et une longévité maximale.
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
                    <h3 className="text-xl font-bold text-[#38bdf8]">Nos prestations</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#4a5568]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Parquet massif et contrecollé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Carrelage et faïence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Vinyle et LVT</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Moquette et revêtements textiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Résine époxy et béton ciré</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Rénovation et ragréage</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Notre expertise</h3>
                  </div>
                  <p className="text-sm text-[#4a5568] leading-relaxed">
                    Groupe BML Rénovation Tout Corps D'état vous offre une expertise complète en revêtements de sols, avec des poses soignées et un service personnalisé adapté à chaque projet, du plus simple au plus complexe.
                  </p>
                </div>
              </div>

<div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour transformer vos sols.
                </p>
                <p className="text-base mb-8 opacity-90">
                  Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé.
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
                SAVOIR-FAIRE
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                Une maîtrise parfaite<br />des revêtements de sols
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                {isGrenoble ? 'Groupe BML Rénovation à Grenoble possède une expertise reconnue dans tous les domaines des revêtements de sols. Nos poseurs qualifiés maîtrisent les techniques traditionnelles et modernes pour réaliser des poses impeccables, du simple remplacement aux projets les plus exigeants sur tout le territoire de Grenoble et ses environs.' : 'Groupe BML Rénovation Tout Corps D\'état possède une expertise reconnue dans tous les domaines des revêtements de sols. Nos poseurs qualifiés maîtrisent les techniques traditionnelles et modernes pour réaliser des poses impeccables, du simple remplacement aux projets les plus exigeants.'}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Matériaux</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Parquet bois massif et stratifié</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Carrelage grès cérame</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Vinyle et lino</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Moquettes et tapis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Résine époxy décorative</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white overflow-hidden">
              <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
                <h3 className="text-lg font-bold uppercase tracking-wider">Techniques</h3>
              </div>
              <div className="px-6 pt-8 pb-6">
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Pose collée et flottante</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Pose clouée traditionnelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Ragréage et préparation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Jointoiement et finitions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Ponçage et vitrification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Traitement anti-humidité</span>
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
                    <span>Conseils matériaux et styles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Diagnostic et mesures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Dépose ancien revêtement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Finitions et plinthes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                    <span>Garantie et suivi</span>
                  </li>
                </ul>
              </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 bg-white">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Inspiré par Nos Revêtements de Sols ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nos poseurs experts créent des sols impeccables qui allient esthétique, confort et durabilité pour révéler le plein potentiel de vos espaces.
            </p>
            <p className="text-base mb-8 opacity-90">
              Donnez une nouvelle vie à vos sols avec nos solutions professionnelles et obtenez un devis gratuit adapté à votre projet.
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

      <PartnersSection partners={revetementsSolsPartners} />

      <FooterSection onNavigate={onNavigate || onBack} onNavigateToServices={() => onBack()} />
    </div>
  );
};

export default RevetementsSols;
