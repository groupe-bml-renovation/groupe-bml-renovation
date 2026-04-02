import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface EspaceVerreProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      url: 'https://images.unsplash.com/photo-1722936082032-f68388a67b00?w=1200&q=80',
      alt: 'Espace Verre moderne et lumineux'
    },
    {
      url: 'https://images.unsplash.com/photo-1753596727275-15b5abc2b53d?w=1200&q=80',
      alt: 'Verrière intérieure élégante'
    },
    {
      url: 'https://images.unsplash.com/photo-1715934514077-4684c381f05a?w=1200&q=80',
      alt: 'Baie vitrée panoramique'
    },
    {
      url: 'https://images.unsplash.com/photo-1697538022665-e170c3616c5b?w=1200&q=80',
      alt: 'Cloison vitrée contemporaine'
    },
    {
      url: 'https://images.unsplash.com/photo-1723206524904-d61dd645c5ff?w=1200&q=80',
      alt: 'Façade de verre moderne'
    },
    {
      url: 'https://images.unsplash.com/photo-1644898554223-35728a90138b?w=1200&q=80',
      alt: 'Fenêtres de design premium'
    },
    {
      url: 'https://images.unsplash.com/photo-1685514823717-7e1ff6ee0563?w=1200&q=80',
      alt: 'Intérieur lumineux avec vitrage'
    },
    {
      url: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/revel-3d-option-3.jpg',
      alt: 'Rendu 3D pergola avec toile rétractable, espace extérieur ombragé'
    },
    {
      url: 'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/meylan-3d-option-3.jpg',
      alt: 'Rendu 3D ambiance végétale luxuriante autour d\'un espace'
    }
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
                    src={img.url}
                    alt={img.alt}
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
                    src={img.url}
                    alt={img.alt}
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

const EspaceVerre: React.FC<EspaceVerreProps> = ({ onBack, onNavigate }) => {
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble/');

  const scrollToContactForm = () => {
    onBack();
    setTimeout(() => {
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleNavigateToServices = () => {
    onBack();
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{isGrenoble ? 'Espace Verre Rénovation Grenoble - Entreprise Vitrages | BML' : 'Espace Verre Rénovation Maison - Entreprise Artisan Travaux | BML'}</title>
        <meta name="description" content={isGrenoble ? 'Rénovation espace verre à Grenoble. Solutions de vitrages, verrières, baies vitrées modernes. Entreprise spécialisée en travaux de rénovation intérieure Grenoble. Devis gratuit.' : 'Rénovation maison avec solutions d\'espace verre. Entreprise de rénovation spécialisée en travaux de rénovation intérieure et vitrages modernes. Rénover votre maison avec nos experts en rénovation maison ancienne et complète. Devis gratuit.'} />
        {isGrenoble && <meta name="keywords" content="espace verre grenoble, vitrages grenoble, baies vitrées grenoble, verrière grenoble, rénovation espace verre grenoble, rénovation intérieure grenoble, travaux vitrages isère" />}
        <meta property="og:title" content={isGrenoble ? 'Espace Verre Grenoble - Rénovation Vitrages | BML' : 'Espace Verre - Rénovation Maison Complète | Groupe BML'} />
        <meta property="og:description" content={isGrenoble ? 'Solutions d\'espace verre et vitrages modernes à Grenoble. Rénovation complète intérieure par experts BML Rénovation.' : 'Solutions d\'espace verre pour rénovation maison. Entreprise de rénovation spécialisée en travaux complets intérieurs et extérieurs.'} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isGrenoble ? 'Espace Verre Grenoble | BML Rénovation' : 'Espace Verre - Rénovation Maison | BML Rénovation'} />
        <meta name="twitter:description" content={isGrenoble ? 'Travaux de rénovation espace verre à Grenoble. Vitrages, verrières, baies vitrées par artisan expert.' : 'Travaux de rénovation maison avec solutions d\'espace verre. Rénovation intérieure et extérieure par artisan expert.'} />
        <link rel="canonical" href={isGrenoble ? 'https://groupe-bml-renovation.fr/grenoble/espace-verre' : 'https://groupe-bml-renovation.fr/espace-verre'} />
        <meta name="language" content="fr" />
        <meta name="geo.region" content={isGrenoble ? 'FR-38' : 'FR'} />
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1672139664252-9e56a5c79ca6?w=1600&q=80"
            alt="Espace Verre et Vitrages"
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
              {isGrenoble ? <>Espace verre<br />à Grenoble modernes</> : <>Rénovation maison<br />espace verre modernes</>}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              Illuminez vos espaces avec élégance et modernité
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
                ESPACE VERRE
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Créer un espace</span>{' '}
                <span className="text-slate-900">de lumière et</span><br />
                <span className="text-slate-900">de transparence.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Transformez vos intérieurs avec nos solutions de vitrages et d'espaces verres innovants,
                alliant esthétique contemporaine, sécurité et efficacité énergétique pour maximiser la lumière naturelle.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation</strong> {isGrenoble ? 'à Grenoble ' : ''}vous accompagne dans tous vos <strong>projets
                d'espaces verre et de vitrages modernes</strong>. Notre équipe <strong>vous conseille et vous
                accompagne</strong> dans la conception et la réalisation de vos solutions vitrées premium.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Que vous souhaitiez créer une verrière intérieure, installer des baies vitrées, rénover vos fenêtres,
                mettre en place des cloisons vitrées ou des façades de verre, nos experts mettent leur savoir-faire à votre
                service pour réaliser un projet de qualité qui valorise votre espace et améliore votre confort de vie.
              </p>

              {isGrenoble && (
                <p className="text-base text-slate-600 leading-relaxed mt-4">
                  Basés à Grenoble, nous intervenons dans la région de Grenoble (Échirolles, Meylan, Fontaine, Saint-Martin-d'Hères, Voiron, Crolles, Voreppe, Sassenage)
                  et dans plusieurs départements du sud-est de la France : l'Isère, le Var, le Rhône, les Bouches-du-Rhône et la Drôme.
                </p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1660361339525-643f7d6eed6b?w=1200&q=80"
                alt="Espace Verre"
                className="w-full h-[450px] object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="min-h-screen bg-white flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center h-full">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                L'espace verre, c'est la structure. <span className="text-[#38bdf8]">L'ambiance</span>, c'est ce qui te fait rester.
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Tu peux avoir la plus belle verrière du monde, si autour c'est vide, ça sonne creux.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Avec nos partenaires on finit le job: on transforme ton espace verre en vrai lieu de vie, chaleureux, intimiste, et canon de jour comme de nuit.
              </p>

              <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-6">
                Ce que ça change, concrètement:
              </h3>

              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">Visite sur place + lecture de l'existant, on garde ce qui marche, on corrige le reste.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">Rendus 3D d'ambiance, tu vois le résultat avant de lancer les travaux.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">Ombrage intelligent, voile triangulaire légère ou pergola avec toile rétractable, ombre quand ça tape, soleil quand tu le veux.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">Végétalisation sur mesure, occultante si besoin, résistante au climat, et adaptée à tes contraintes (même non mellifère si nécessaire).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">Éclairage qui met en scène, spots et guirlandes pour un effet wow le soir.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">Matériaux responsables, bois local ou européen, finitions propres, look premium.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-[#38bdf8] flex-shrink-0 mt-0.5" />
                  <span className="text-base text-slate-600">Conseils d'entretien, simples, pratiques, tu ne te retrouves pas avec un truc mort au bout de 3 mois.</span>
                </li>
              </ul>

              <div className="border-l-4 border-[#38bdf8] pl-4 py-2">
                <p className="text-sm md:text-base text-slate-600 italic">
                  Demande l'option <span className="font-semibold">'Espace Verre + Ambiance Extérieure'</span>, on te prépare une proposition claire, avec visuels.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl h-full min-h-[500px]"
            >
              <video
                src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Video_Generated_From_Image.mp4"
                className="w-full h-full hover:scale-105 transition-transform duration-500 rounded-xl object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
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
                SOLUTIONS VERRE
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Créer votre<br />espace lumineux
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-6">
                Groupe BML Rénovation tout corps d'état conçoit et réalise des projets d'espaces verre sur mesure. De l'étude de conception à l'installation, nos équipes vous accompagnent tout au long de votre projet personnalisé pour créer un espace de lumière unique et durable.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Notre approche globale garantit une prise en charge complète de votre projet : étude d'accueil et analyse des volumes, conseils en matériaux et choix des vitres, recommandations sur l'isolation thermique et acoustique, et suivi rigoureux de chaque étape d'installation et de finition.
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
                      <span>Verrières intérieures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Baies vitrées panoramiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Cloisons vitrées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Façades de verre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Fenêtres modernes haute performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Verre teinté et sablé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Option ambiance extérieure (ombrage, végétalisation, éclairage, rendu 3D)</span>
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
                    Groupe BML Rénovation Tout Corps D'état vous propose une expertise complète en conception et installation d'espaces verre, que ce soit pour créer une nouvelle solution vitrée ou moderniser une installation existante avec les dernières technologies.
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    On ne pose pas juste du verre. On pense l'usage.
                    Avec notre partenaire paysagiste, tu peux aller plus loin: rendus 3D, ombrage modulable, végétalisation intimisante, éclairage de mise en scène, le tout cohérent avec ton lieu.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Transformer Votre Espace ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts en vitrages est à votre écoute pour créer votre espace lumineux.
                </p>
                <p className="text-base mb-8 opacity-90">
                  Contactez-nous dès aujourd'hui pour un devis gratuit et personnalisé.
                </p>
                <p className="text-sm md:text-base mb-8 font-medium opacity-95">
                  Option disponible: Espace Verre + Ambiance Extérieure (ombrage, végétalisation, éclairage, rendu 3D).
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
                Groupe BML Rénovation Tout Corps D'état possède une solide expérience dans la conception et la réalisation d'espaces verre. Notre expertise couvre tous les aspects : structure, étanchéité, isolation thermique et acoustique, revêtements anti-UV, et finitions premium pour garantir qualité et durabilité.
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
                  <h3 className="text-lg font-bold uppercase tracking-wider">Types</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verre teinté</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verre dépoli</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verre teinté composite</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verre sécurisé</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verre structurel</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white overflow-hidden">
                <div className="relative h-40 bg-gradient-to-br from-[#38bdf8] to-[#0ea5e9] flex flex-col items-center justify-center text-white pb-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 50% 100%, 0 65%)' }}>
                  <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                  <h3 className="text-lg font-bold uppercase tracking-wider">Systèmes</h3>
                </div>
                <div className="px-6 pt-8 pb-6">
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Double vitrage isolant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Triple vitrage haute performance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verres anti-UV</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verres acoustiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verres autonettoyants</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Verres intelligents</span>
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
                      <span>Étude et conception 3D</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Installation clés en main</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Rénovation d'espaces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Maintenance et entretien</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8] mt-0.5 font-bold">›</span>
                      <span>Garantie décennale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PartnersSection />

      <FooterSection onNavigateToServices={handleNavigateToServices} onNavigate={onNavigate} />
    </div>
  );
};

export default EspaceVerre;
