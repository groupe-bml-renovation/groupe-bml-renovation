import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Clock, Shield, Sparkles, Ruler, Hammer, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientCTAButton } from '../components/ui/gradient-cta-button';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import GEOSummary from '../components/GEOSummary';
import FAQSection from '../components/FAQSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface CuisinesRenovationProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const images = [
    'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&q=80',
    'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/0113%20(2).mp4',
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&q=80',
    'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=1200&q=80',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1200&q=80'
  ];

  const imageWidth = 320 + 24;
  const totalImagesWidth = images.length * imageWidth;

  const handleScroll = () => {
    if (!scrollContainerRef.current || !innerDivRef.current) return;

    const scrollLeft = scrollContainerRef.current.scrollLeft;
    const scrollWidth = innerDivRef.current.scrollWidth;
    const clientWidth = scrollContainerRef.current.clientWidth;

    if (scrollLeft + clientWidth >= scrollWidth - 100) {
      scrollContainerRef.current.scrollLeft = totalImagesWidth / 2;
    } else if (scrollLeft <= 100) {
      scrollContainerRef.current.scrollLeft = totalImagesWidth / 2;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
      setTimeout(handleScroll, 600);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
      setTimeout(handleScroll, 600);
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
          onScroll={handleScroll}
        >
          <div
            ref={innerDivRef}
            className="infinite-scroll flex gap-6 w-max"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
          >
            {[...Array(5)].map((_, setIndex) => (
              <div key={`set-${setIndex}`} className="flex gap-6">
                {images.map((media, imgIndex) => (
                  <div key={`${setIndex}-${imgIndex}`} className="flex-shrink-0 w-80 h-64 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    {media.endsWith('.mp4') ? (
                      <video
                        src={media}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <OptimizedImage
                        src={media}
                        alt={`Travaux de rénovation maison cuisine ${imgIndex + 1}`}
                        className="w-full h-full hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const CuisinesRenovation: React.FC<CuisinesRenovationProps> = ({ onBack, onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    const basePath = isGrenoble ? '/grenoble' : '/';
    navigate(`${basePath}?scrollTo=contact-form`);
  };

  const seoData = isGrenoble ? {
    title: 'Rénovation de Cuisine à Grenoble | Devis Gratuit 24h | Groupe BML',
    description: 'Besoin d\'une nouvelle cuisine à Grenoble ou Isère ? Groupe BML : conception 3D, agencement sur mesure et pose complète. Artisans qualifiés RGE, garantie décennale, devis sous 24h.',
    keywords: 'rénovation cuisine grenoble, cuisiniste grenoble, installation cuisine isère, plan de travail sur mesure grenoble, prix rénovation cuisine grenoble',
    ogTitle: 'Rénovation de Cuisine Haut de Gamme à Grenoble | BML',
    twitterTitle: 'Rénovation Cuisine Grenoble | Groupe BML',
  } : {
    title: 'Rénovation de Cuisine Complète | Entreprise Rénovation Haut de Gamme | BML',
    description: 'Expert en rénovation de cuisine clé en main. Conception, plomberie, électricité et pose de mobilier haut de gamme. Finitions de prestige et interlocuteur unique pour tout votre chantier.',
    keywords: 'rénovation cuisine, cuisine haut de gamme, aménagement cuisine sur mesure, entreprise rénovation prestige, coût rénovation cuisine complete',
    ogTitle: 'Rénovation de Cuisine de Prestige | Entreprise BML',
    twitterTitle: 'Rénovation Cuisine Haute Gamme | BML',
  };

  const faqItems = [
    {
      question: isGrenoble ? "Quel est le prix moyen d'une rénovation de cuisine à Grenoble ?" : "Quel budget prévoir pour une rénovation de cuisine complete ?",
      answer: "Le coût d'une rénovation de cuisine varie entre 1500€ et 5000€ par m² selon les matériaux choisis (granit, quartz, bois massif) et l'électroménager. Nous proposons des solutions adaptées à chaque budget avec un devis transparent."
    },
    {
      question: "Combien de temps durent les travaux de cuisine ?",
      answer: "Pour une rénovation totale incluant plomberie et électricité, prévoyez entre 10 et 20 jours ouvrés. Nous minimisons les nuisances pour que vous puissiez retrouver votre usage quotidien rapidement."
    },
    {
      question: "Proposez-vous une conception 3D avant travaux ?",
      answer: "Oui, nous réalisons des plans 2D/3D pour vous aider à visualiser votre futur espace et optimiser l'ergonomie (triangle d'activité, rangements intelligents)."
    },
    {
      question: "Gérez-vous également la pose de l'électroménager ?",
      answer: "Absolument. Nous installons et raccordons l'ensemble de votre équipement (four, plaques, hotte, lave-vaisselle) selon les normes de sécurité en vigueur."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta name="twitter:title" content={seoData.twitterTitle} />
        {isGrenoble && <meta name="geo.region" content="FR-38" />}
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <section className="relative h-screen flex items-center justify-center overflow-hidden pb-12">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=1200&q=80"
            alt={isGrenoble ? "Rénovation de cuisines à Grenoble" : "Rénovation de cuisines haut de gamme"}
            className="w-full h-full"
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
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide capitalize">
              Cuisines<br />{isGrenoble ? 'à Grenoble' : 'sur mesure'}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              L'alliance de l'ergonomie et du design d'exception
            </p>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto" />
          </motion.div>
        </div>
      </section>

      <GEOSummary
        title={isGrenoble 
          ? "Expert en rénovation de cuisine à Grenoble et Isère" 
          : "L'excellence de la cuisine sur mesure clé en main"}
        summary={isGrenoble 
          ? "Nous créons des cuisines modernes et fonctionnelles adaptées au style de vie grenoblois. Un seul interlocuteur pour gérer les plombiers, électriciens et poseurs, avec une garantie de livraison aux dates convenues." 
          : "De la conception architecturale à la pose finale, nous réalisons votre cuisine de prestige. Matériaux nobles, domotique intégrée et finitions artisanales pour transformer votre espace culinaire en pièce maîtresse de votre habitat."}
        points={[
          { icon: Zap, text: "Conception 3D et optimisation d'espace" },
          { icon: Clock, text: "Travaux planifiés et délais garantis" },
          { icon: Shield, text: "Assurance décennale et expertise TCE" },
          { icon: Hammer, text: "Pose d'électroménager et finitions" }
        ]}
      />

      <section className="pt-8 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block text-[#38bdf8] text-xs font-bold uppercase tracking-widest mb-3">
                CUISINES
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Votre cuisine</span>{' '}
                <span className="text-slate-900">{isGrenoble ? 'à Grenoble' : 'clé en main'}</span><br />
                <span className="text-slate-900">qui correspond à vos envies.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Réponse directe :</strong> Groupe BML réalise votre rénovation de cuisine complète en gérant 100% du chantier (démolition, réseaux, mobilier). Nous créons un espace ergonomique avec des matériaux durables et esthétiques.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation{isGrenoble && ' à Grenoble'}</strong> vous propose une approche personnalisée : îlot central, meubles suspendus, éclairage indirect. Nous transformons votre vieille cuisine en un espace moderne et chaleureux.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Notre savoir-faire couvre le <strong>raccordement gaz et électrique</strong>, la <strong>pose de crédence</strong> en verre ou carrelage, et l'ajustage millimétré de vos plans de travail en granit, bois ou corian.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                src="https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/0113%20(2).mp4"
                autoPlay
                loop
                muted
                playsInline
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
                NOS EXPERTISES
              </span>
              <div className="w-24 h-px bg-[#38bdf8] mb-6"></div>

              <h2 className="text-3xl md:text-4xl font-light text-[#38bdf8] mb-6 leading-tight">
                Transformer votre<br />espace culinaire
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                Chaque cuisine que nous rénovons{isGrenoble && ' en Isère'} est unique. Nous portons une attention particulière à la <strong>ventilation (VMC)</strong> et à la <strong>sécurité électrique</strong> indispensable pour vos nouveaux équipements.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Du style industriel au minimalisme contemporain, nous vous aidons à harmoniser carrelage au sol, peinture murale et façade de meubles pour un rendu impeccable.
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
                  <ul className="space-y-2 text-sm text-[#4a5568]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Ouverture de cloison pour cuisine américaine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Pose d'îlots centraux avec évier intégré</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise aux normes plomberie et électricité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation d'électroménager encastrable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Plans de travail sur mesure (Granit, Quartz, Bois)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full border-2 border-[#38bdf8] flex items-center justify-center bg-white">
                      <Check className="w-6 h-6 text-[#38bdf8]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#38bdf8]">Pourquoi nous choisir ?</h3>
                  </div>
                  <p className="text-sm text-[#4a5568] leading-relaxed">
                    Groupe BML est un <strong>contractant général</strong> certifié. Nous assumons l'entière responsabilité du projet, vous garantissant un chantier sans stress et un résultat durable. Notre expertise{isGrenoble && ' locale à Grenoble'} nous permet de réagir rapidement pour toute visite technique.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour transformer votre cuisine.
                </p>
                <p className="text-base mb-8 opacity-90">
                  Contactez-nous aujourd'hui pour un devis gratuit et personnalisé.
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

      <FAQSection 
        title={isGrenoble ? "FAQ Rénovation Cuisine Grenoble" : "FAQ Rénovation Cuisine"} 
        items={faqItems}
      />

      <PartnersSection />

      <FooterSection onNavigateToServices={onBack} onNavigate={onNavigate} />
    </div>
  );
};

export default CuisinesRenovation;
