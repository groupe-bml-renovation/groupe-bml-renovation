import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import PartnersSection from '../components/PartnersSection';
import { FooterSection } from '../components/footer-section';
import { OptimizedImage } from '../components/OptimizedImage';

interface MenuiserieProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1719381502987-058c2140df08?w=800&q=80',
    'https://images.unsplash.com/photo-1719381503001-e971fddf0dd5?w=800&q=80',
    'https://images.unsplash.com/photo-1697538022270-f3f3e8f9cf32?w=800&q=80',
    'https://images.unsplash.com/photo-1697538022268-c565529e616f?w=800&q=80',
    'https://images.unsplash.com/photo-1736281554803-a04e6499b576?w=800&q=80',
    'https://images.unsplash.com/photo-1656733911001-16912b79d2bf?w=800&q=80'
  ];

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const itemWidth = 344;
      scrollContainerRef.current.scrollTo({ left: index * itemWidth, behavior: 'smooth' });
    }
  };

  const scrollLeft = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
  };

  const scrollRight = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    scrollToIndex(newIndex);
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
                    alt={`Menuiserie ${index + 1}`}
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
                    alt={`Menuiserie ${index + 1}`}
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

const Menuiserie: React.FC<MenuiserieProps> = ({ onBack, onNavigate }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const menuiseriePartners = [
    {
      name: 'Euro Wall',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/euro-wall%402x.jpg'
    },
    {
      name: 'Homs',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/homs%402x.jpg'
    },
    {
      name: 'Scrigno',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/scrigno%402x.jpg'
    },
    {
      name: 'Vachette',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/vachette%402x.jpg'
    },
    {
      name: 'Cuisinella',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/cuisinella%402x.jpg'
    },
    {
      name: 'Bricard',
      logoUrl: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/bricard%402x.jpg'
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
        <title>{isGrenoble ? "Menuiserie Grenoble - Travaux de Rénovation | Groupe BML" : "Menuiserie Rénovation Maison - Travaux de Rénovation | Groupe BML"}</title>
        <meta name="description" content={isGrenoble ? "Menuiserie sur mesure à Grenoble (Isère) par Groupe BML. Portes, placards, parquet, escaliers. Artisans menuisiers qualifiés. Création et pose de menuiserie. Devis gratuit." : "Menuiserie rénovation maison - Travaux de rénovation incluant portes, placards, parquet, escaliers. Artisans menuisiers experts en création sur mesure. Devis gratuit pour rénovation maison."} />
        <meta name="keywords" content={isGrenoble ? "menuiserie grenoble, menuisier grenoble, portes grenoble, placards grenoble, parquet grenoble, escaliers grenoble, menuiserie isère, rénovation maison grenoble, travaux menuiserie grenoble" : "menuiserie rénovation, menuiserie maison, portes intérieures, placards sur mesure, parquet, escaliers, menuiserie sur mesure, artisan menuisier, rénovation maison"} />
        <meta property="og:title" content={isGrenoble ? "Menuiserie Grenoble - Travaux de Rénovation | Groupe BML" : "Menuiserie & Rénovation Maison - Groupe BML Rénovation"} />
        <meta property="og:description" content={isGrenoble ? "Menuiserie sur mesure à Grenoble : portes, placards, parquet, escaliers. Artisans menuisiers professionnels en Isère. Devis gratuit." : "Menuiserie sur mesure pour votre rénovation maison. Portes, placards, parquet, escaliers. Artisans qualifiés. Devis gratuit."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/menuiserie" : "https://groupe-bml-renovation.fr/menuiserie"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? "Menuiserie Grenoble | Travaux de Rénovation" : "Menuiserie & Rénovation Maison | Travaux de Rénovation"} />
        <meta name="twitter:description" content={isGrenoble ? "Menuiserie à Grenoble : portes, placards, parquet, escaliers. Groupe BML rénovation en Isère. Devis gratuit." : "Menuiserie sur mesure pour rénovation maison. Portes, placards, parquet, escaliers. Devis gratuit."} />
        <link rel="canonical" href={isGrenoble ? "https://groupe-bml-renovation.fr/grenoble/menuiserie" : "https://groupe-bml-renovation.fr/menuiserie"} />
        {isGrenoble && <meta name="geo.region" content="FR-38" />}
        {isGrenoble && <meta name="geo.placename" content="Grenoble" />}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": isGrenoble ? "Groupe BML - Menuiserie Grenoble" : "Groupe BML - Menuiserie",
            "description": isGrenoble ? "Entreprise de menuiserie spécialisée à Grenoble. Portes intérieures et extérieures, placards sur mesure, parquet, escaliers, boiseries. Artisans qualifiés, devis gratuit." : "Entreprise de menuiserie spécialisée. Portes, placards sur mesure, parquet, escaliers, boiseries. Artisans qualifiés, devis gratuit.",
            "url": "https://groupe-bml.com",
            "telephone": "+33...",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "",
              "addressLocality": isGrenoble ? "Grenoble" : "",
              "postalCode": isGrenoble ? "38" : "",
              "addressCountry": "FR"
            },
            "areaServed": [
              {
                "@type": "AdministrativeArea",
                "name": isGrenoble ? "Isère" : "France"
              }
            ],
            "knowsAbout": isGrenoble ? [
              "Menuiserie",
              "Portes intérieures et extérieures",
              "Placards sur mesure",
              "Parquet",
              "Escaliers",
              "Boiseries",
              "Rénovation maison",
              "Travaux menuiserie"
            ] : [
              "Menuiserie",
              "Portes intérieures et extérieures",
              "Placards sur mesure",
              "Parquet",
              "Escaliers",
              "Boiseries",
              "Rénovation maison"
            ]
          })}
        </script>
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1687995673177-053cfb879128?w=1600&q=80"
            alt="Menuiserie Sur Mesure"
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
              Menuiserie{isGrenoble && ' Grenoble'}<br />sur mesure
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              {isGrenoble ? "Créations en bois à Grenoble et en Isère - L'artisanat du bois au service de votre habitat" : "L'artisanat du bois au service de votre habitat"}
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
                MENUISERIE
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Des créations en bois</span>{' '}
                <span className="text-slate-900">qui subliment</span><br />
                <span className="text-slate-900">votre intérieur.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Transformez votre espace avec des réalisations en menuiserie sur mesure,
                alliant esthétique, fonctionnalité et durabilité pour créer un intérieur unique et authentique{isGrenoble && " à Grenoble et en Isère"}.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> vous accompagne dans tous vos <strong>projets
                de menuiserie</strong>{isGrenoble && " à Grenoble, Villeurbanne et en Isère"}. Notre équipe <strong>d'artisans qualifiés vous conseille et vous
                accompagne</strong> dans la conception et la réalisation de vos aménagements en bois.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous souhaitiez installer des portes intérieures, créer des placards sur mesure,
                poser du parquet noble, concevoir une bibliothèque encastrée ou réaliser des boiseries décoratives{isGrenoble && " à Grenoble"},
                nos experts menuisiers mettent leur savoir-faire ancestral à votre service pour réaliser
                un projet de qualité qui ajoute du caractère et de la valeur à votre habitation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1630444945539-b7be5e46c78d?w=1200&q=80"
                alt="Menuiserie Sur Mesure"
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
                MENUISERIE SUR MESURE
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Sublimer votre<br />espace avec le bois
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Groupe BML Rénovation tout corps d'état conçoit et réalise des ouvrages de menuiserie sur mesure{isGrenoble && " à Grenoble et en Isère"}. De l'étude de conception à la pose finale, nos menuisiers vous accompagnent tout au long de votre projet personnalisé pour créer des aménagements en bois nobles et durables.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet{isGrenoble && " dans la région de Grenoble"} : analyse de vos besoins et de votre espace, conseils en aménagement et choix des essences de bois, recommandations sur les finitions et les traitements, et suivi rigoureux de chaque étape de fabrication et d'installation.
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
                      <span>Portes intérieures et extérieures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Placards et dressings sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Parquets massifs et contrecollés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Bibliothèques et étagères</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Escaliers et garde-corps</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Boiseries décoratives</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en menuiserie, que ce soit pour des ouvrages traditionnels en bois massif ou des créations contemporaines alliant différents matériaux nobles parfaitement adaptés à votre projet.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe de menuisiers qualifiés est à votre écoute pour donner vie à vos idées.
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
                COMPÉTENCES
              </span>

              <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-6 leading-tight">
                Notre savoir-faire à<br />votre service
              </h2>

              <p className="text-base text-slate-600 leading-relaxed">
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans tous les domaines de la menuiserie{isGrenoble && " à Grenoble et en Isère"}. Notre expertise couvre la menuiserie intérieure et extérieure : pose de portes et fenêtres, création de placards et dressings, pose de parquets traditionnels et contemporains, fabrication d'escaliers sur mesure, réalisation de boiseries décoratives, et agencement d'espaces de rangement optimisés.
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
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Portes intérieures et extérieures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Fenêtres bois et mixtes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Volets battants et coulissants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Vérandas et pergolas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Terrasses bois</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Métiers</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Parquets massifs et stratifiés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Escaliers sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Garde-corps et rampes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Lambris et boiseries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Plinthes et moulures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Habillages décoratifs</span>
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
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Conception et plans 3D</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Choix des essences de bois</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Fabrication en atelier</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Pose et installation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Finitions et traitements</span>
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
              Un Projet de Menuiserie en Tête ?
            </h2>
            <p className="text-lg mb-6 opacity-90">
              Nos artisans menuisiers transforment vos idées en créations sur mesure avec un savoir-faire d'exception.
            </p>
            <p className="text-base mb-8 opacity-90">
              Découvrez comment nous pouvons sublimer vos espaces avec des ouvrages en bois nobles et durables.
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

      <PartnersSection partners={menuiseriePartners} />
      <FooterSection onNavigate={onNavigate} />
    </div>
  );
};

export default Menuiserie;
