import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Check, ChevronLeft, ChevronRight, Clock, Shield, Sparkles, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import { FooterSection } from '../components/footer-section';
import PartnersSection from '../components/PartnersSection';
import GEOSummary from '../components/GEOSummary';
import FAQSection from '../components/FAQSection';
import { OptimizedImage } from '../components/OptimizedImage';

interface SallesDeBainProps {
  onBack: () => void;
  onNavigate?: (page: string) => void;
}

const ImageCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1260&q=80',
    'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1260&q=80',
    'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=1260&q=80',
    'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?w=1260&q=80',
    'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1260&q=80'
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
                    alt={`Rénovation salle de bain ${index + 1}`}
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
                    alt={`Rénovation salle de bain ${index + 1}`}
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
  const isGrenoble = location.pathname.includes('/grenoble');

  const scrollToContactForm = () => {
    const basePath = isGrenoble ? '/grenoble' : '/';
    navigate(`${basePath}?scrollTo=contact-form`);
  };

  const seoData = isGrenoble ? {
    title: 'Rénovation Salles de Bain à Grenoble | Devis Gratuit | Groupe BML',
    description: 'Expert en rénovation de salle de bain à Grenoble et Isère. Douche à l\'italienne, sanitaires modernes, aménagement PMR. Artisans certifiés, interlocuteur unique, devis précis sous 24h.',
    keywords: 'rénovation salle de bain grenoble, installateur douche italienne grenoble, travaux plomberie grenoble, salle de bain pmr isère, prix rénovation salle de bain grenoble',
    ogTitle: 'Rénovation de Salle de Bain Haute Qualité à Grenoble | BML',
    ogDescription: 'Transformez votre salle de bain à Grenoble avec nos experts. Design moderne et finitions haut de gamme.',
    twitterTitle: 'Rénovation SDB Grenoble | Groupe BML',
    twitterDescription: 'Votre projet de salle de bain à Grenoble clé en main. Contactez-nous dès aujourd\'hui.',
  } : {
    title: 'Rénovation de Salle de Bain Complète | Entreprise Rénovation Haut de Gamme | BML',
    description: 'Spécialiste de la rénovation de salle de bain clé en main. Douche à l\'italienne, carrelage, plomberie et agencement sur mesure. Finitions de prestige et interlocuteur unique pour tout votre projet.',
    keywords: 'rénovation salle de bain, rénovation douche italienne, aménagement salle de bain, entreprise rénovation prestige, salle de bain haut de gamme, coût rénovation salle de bain',
    ogTitle: 'Rénovation Salle de Bain de Prestige | Entreprise BML',
    ogDescription: 'Création d\'espaces de bien-être et de détente sur mesure. Expertise globale en rénovation de salle de bain.',
    twitterTitle: 'Rénovation Salle de Bain Haute Gamme | BML',
    twitterDescription: 'Entreprise de rénovation spécialisée en salles de bain d\'exception. Devis gratuit.',
  };

  const faqItems = [
    {
      question: isGrenoble ? "Combien coûte une rénovation de salle de bain à Grenoble ?" : "Quel est le budget moyen pour une rénovation de salle de bain ?",
      answer: "Le budget pour une rénovation de salle de bain varie généralement entre 800€ et 2500€ par m², selon la complexité des travaux et la gamme des matériaux (carrelage, sanitaires, mobilier). Nous fournissons un devis détaillé après une visite technique gratuite."
    },
    {
      question: "Quelle est la durée moyenne des travaux ?",
      answer: "Pour une rénovation complète (plomberie, carrelage, électricité, sanitaires), il faut compter entre 7 et 15 jours ouvrés. Ce délai inclut le temps de séchage nécessaire pour garantir une étanchéité parfaite."
    },
    {
      question: "Gérez-vous l'intégralité du projet (plomberie, carrelage, etc.) ?",
      answer: "Oui, nous sommes une entreprise 'tout corps d'état'. Nous coordonnons l'ensemble des artisans : plombiers, carreleurs, électriciens et menuisiers. Vous n'avez qu'un seul interlocuteur (votre chef de projet)."
    },
    {
      question: "Réalisez-vous des salles de bain PMR (accessibles) ?",
      answer: "Absolument. Nous sommes experts dans l'adaptation de logements pour les personnes à mobilité réduite : remplacement de baignoire par douche extra-plate, installation de barres de maintien, parois sécurisées et rangements ergonomiques."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.ogTitle} />
        <meta property="og:description" content={seoData.ogDescription} />
        <meta name="twitter:title" content={seoData.twitterTitle} />
        <meta name="twitter:description" content={seoData.twitterDescription} />
        {isGrenoble && <meta name="geo.region" content="FR-38" />}
      </Helmet>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?w=1920&q=80"
            alt={isGrenoble ? "Rénovation de Salles de Bain à Grenoble" : "Rénovation de Salles de Bain"}
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
            <h1 className="text-5xl md:text-6xl lg:text-8xl font-light text-white mb-8 leading-tight tracking-wide capitalize">
              {isGrenoble ? 'Salles de bain Grenoble' : 'Salles de bain'}
            </h1>
            <p className="text-sm md:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-8 uppercase tracking-[0.3em] font-light">
              Créez votre espace de bien-être et de détente personnalisé
            </p>
            <div className="w-24 h-0.5 bg-[#38bdf8] mx-auto" />
          </motion.div>
        </div>
      </section>

      <GEOSummary
        title={isGrenoble 
          ? "L'essentiel de votre rénovation salle de bain à Grenoble" 
          : "L'essentiel de notre prestation salle de bain haut de gamme"}
        summary={isGrenoble 
          ? "Un interlocuteur unique à Grenoble pour piloter tous les corps de métier (plomberie, carrelage, électricité). Nous garantissons une installation soignée, rapide et certifiée pour votre appartement ou maison en Isère." 
          : "Nous transformons votre salle de bain en un espace de prestige. De la conception 3D à la touche finale, nos artisans experts réalisent votre douche à l'italienne et vos rangements sur mesure avec une finition irréprochable."}
        points={[
          { icon: Clock, text: "Chantier livré entre 7 et 15 jours" },
          { icon: Shield, text: "Garantie décennale sur l'étanchéité" },
          { icon: Sparkles, text: "Matériaux premium et design exclusif" },
          { icon: Ruler, text: "Prise de côtes et devis détaillés gratuits" }
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
                SALLES DE BAIN
              </span>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-6 leading-tight">
                <span className="text-[#38bdf8] font-normal">Votre salle de bain</span>{' '}
                <span className="text-slate-900">{isGrenoble ? 'à Grenoble' : 'clé en main'}</span><br />
                <span className="text-slate-900">qui allie confort et élégance.</span>
              </h2>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Réponse directe :</strong> Groupe BML gère votre rénovation complète {isGrenoble && 'en Isère '}en un temps record, avec une attention maximale sur l'étanchéité et le design.
              </p>

              <p className="text-base text-slate-600 leading-relaxed mb-4">
                <strong>Groupe BML Rénovation {isGrenoble && 'à Grenoble et en Isère '}</strong> vous propose une solution globale pour transformer votre pièce d'eau. <strong>Nous pilotons chaque étape</strong> pour vous éviter de coordonner plusieurs entreprises : de la dépose de l'ancien carrelage à l'installation de votre nouvelle robinetterie.
              </p>

              <p className="text-base text-slate-600 leading-relaxed">
                Qu'il s'agisse d'une <strong>douche à l'italienne moderne</strong>, d'une <strong>salle de bain PMR adaptée</strong> ou d'un <strong>espace compact optimisé</strong>, notre savoir-faire vous garantit un résultat durable et esthétique.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
            >
              <OptimizedImage
                src="https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1260&q=80"
                alt={isGrenoble ? "Expertise rénovation salle de bain Grenoble" : "Expertise rénovation salle de bain"}
                className="w-full h-[450px] object-cover"
                loading="eager"
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
                Rénovation totale<br />de salle d'eau
              </h2>

              <p className="text-base text-[#4a5568] leading-relaxed mb-6">
                Chaque détail compte : du choix du receveur à la couleur des joints. Nous vous conseillons sur les <strong>matériaux antidérapants</strong>, l'<strong>étanchéité sous carrelage (SPEC)</strong> et l'<strong>optimisation des arrivées d'eau</strong>.
              </p>

              <p className="text-base text-[#4a5568] leading-relaxed">
                Notre approche {isGrenoble && 'à Grenoble '}inclut le respect strict des normes de sécurité électrique (volumes de salle de bain) et l'installation d'une ventilation efficace pour éviter toute condensation.
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
                    <h3 className="text-xl font-bold text-[#38bdf8]">Nos interventions</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-[#4a5568]">
                    <li className="flex items-start gap-2">
                       <span className="text-[#38bdf8]">–</span>
                      <span>Pose de carrelage grand format & faïence</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Création de douches à l'italienne maçonnées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Installation de colonnes de douche thermostatiques</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Mise en place de meubles suspendus sur mesure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Éclairage LED d'ambiance et sécurité</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#38bdf8]">–</span>
                      <span>Adaptation complète accès PMR</span>
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
                    Groupe BML vous libère des contraintes techniques. En tant que <strong>contractant général</strong>, nous assumons la responsabilité totale du chantier. Une salle de bain rénovée par nos soins, c'est l'assurance d'un projet sans fuite, sans retard et avec une valeur immobilière décuplée.
                  </p>
                </div>
              </div>

              <div className="text-center bg-gradient-to-r from-[#38bdf8] to-blue-600 rounded-3xl p-12 text-white mt-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Prêt à Démarrer Votre Projet ?
                </h2>
                <p className="text-lg mb-6 opacity-90">
                  Notre équipe d'experts est à votre écoute pour transformer votre salle de bain.
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

      <FAQSection 
        title={isGrenoble ? "FAQ Rénovation Salle de Bain Grenoble" : "FAQ Rénovation Salle de Bain"} 
        items={faqItems}
      />

      <PartnersSection />

      <FooterSection onNavigate={onNavigate} onNavigateToServices={onBack} />
    </div>
  );
};

export default SallesDeBain;
