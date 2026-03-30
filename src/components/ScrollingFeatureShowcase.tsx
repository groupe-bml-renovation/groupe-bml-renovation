import React, { useState, useRef } from 'react';
import { Pen } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';

interface Slide {
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  image: string;
  bgColor: string;
  textColor: string;
}

const slidesData: Slide[] = [
  {
    title: "La prise de rendez-vous",
    subtitle: "Premier contact et réactivité",
    description: "Dès votre premier contact, nous vous garantissons une réponse rapide et professionnelle. Notre équipe commerciale prend en charge votre demande immédiatement.",
    bullets: [
      "Réponse sous 24h à votre demande de contact",
      "Prise de rendez-vous sous 48h à 72h maximum",
      "Première écoute de vos besoins et attentes",
      "Planification d'une visite technique sur site"
    ],
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/1%20La%20prise%20de%20rendez%20vous.png",
    bgColor: "#ffffff",
    textColor: "#000000",
  },
  {
    title: "Le rendez-vous client",
    subtitle: "Analyse détaillée et conseils personnalisés",
    description: "Notre expert se déplace chez vous pour une visite technique complète. Il évalue l'état des lieux, analyse vos besoins et vous conseille sur les meilleures solutions adaptées à votre projet.",
    bullets: [
      "Visite technique complète de votre espace",
      "Conseils d'experts sur les possibilités techniques",
      "Relevé des dimensions et prise de photos",
      "Établissement du devis détaillé avec budget précis"
    ],
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/2%20Le%20rendez-vous%20client.png",
    bgColor: "#ffffff",
    textColor: "#000000",
  },
  {
    title: "La validation du projet",
    subtitle: "Finalisation et engagement",
    description: "Une fois le devis accepté, nous entrons dans la phase de concrétisation. Nous affinons ensemble tous les détails pour garantir que votre vision devienne réalité.",
    bullets: [
      "Validation du devis et signature du marché",
      "Élaboration des plans détaillés du projet",
      "Sélection finale des matériaux et coloris",
      "Ajustements selon vos retours et préférences"
    ],
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/3%20La%20validation%20du%20projet.png.png",
    bgColor: "#ffffff",
    textColor: "#000000",
  },
  {
    title: "Projet au planning",
    subtitle: "Organisation et coordination",
    description: "Votre projet est officiellement lancé. Nous coordonnons l'ensemble des intervenants et organisons minutieusement chaque phase pour garantir un déroulement optimal.",
    bullets: [
      "Établissement d'un planning détaillé des travaux",
      "Commande de tous les matériaux et équipements",
      "Réunion préparatoire avec l'équipe d'intervention",
      "Préparation de toute la logistique nécessaire"
    ],
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/4%20Projet%20au%20planning.png",
    bgColor: "#ffffff",
    textColor: "#000000",
  },
  {
    title: "Déroulement des travaux",
    subtitle: "Exécution et qualité",
    description: "C'est le moment où votre projet prend vie. Nos équipes qualifiées interviennent avec professionnalisme, en respectant scrupuleusement le planning et les normes de qualité les plus exigeantes.",
    bullets: [
      "Installation et mise en place du chantier",
      "Exécution des travaux selon le planning validé",
      "Suivi et réunions de chantier régulières",
      "Contrôle qualité continu à chaque étape"
    ],
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/5%20De%CC%81roulement%20des%20travaux.png",
    bgColor: "#ffffff",
    textColor: "#000000",
  },
  {
    title: "Réception des travaux",
    subtitle: "Finalisation et satisfaction",
    description: "La dernière étape est cruciale : nous nous assurons que tout est conforme à vos attentes et aux normes en vigueur. C'est le moment où vous prenez possession de votre projet réalisé.",
    bullets: [
      "Nettoyage final et remise en état des lieux",
      "Vérification de la conformité avec le projet initial",
      "Visite finale complète de tous les travaux réalisés",
      "Support client pour toute question après les travaux"
    ],
    image: "https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/6%20Re%CC%81ception%20des%20travaux.png",
    bgColor: "#ffffff",
    textColor: "#000000",
  },
];

export function ScrollingFeatureShowcase() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [openSections, setOpenSections] = useState<Set<number>>(new Set([0]));
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleCtaClick = () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const dynamicStyles = {
    backgroundColor: slidesData[activeIndex].bgColor,
    color: slidesData[activeIndex].textColor,
    transition: 'background-color 0.7s ease, color 0.7s ease',
  };

  return (
    <>
      <div className="lg:hidden w-full min-h-screen bg-gray-50 p-4 overflow-y-auto">
        <div className="space-y-4">
          {slidesData.map((slide, index) => (
            <div
              key={index}
              id={`step-${index}`}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => {
                  setOpenSections(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(index)) {
                      newSet.delete(index);
                    } else {
                      newSet.add(index);
                    }
                    return newSet;
                  });
                }}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-sky-400">{index + 1}.</span>
                  <span className="text-lg font-bold text-gray-900">{slide.title}</span>
                </div>
                <svg
                  className={`w-6 h-6 text-sky-400 transition-transform duration-300 ${
                    openSections.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openSections.has(index) ? 'max-h-[2000px]' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-6">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full rounded-xl mb-6 max-h-64 object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://placehold.co/800x600/e2e8f0/4a5568?text=Image+Not+Found`;
                    }}
                  />

                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-sky-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-black">{slide.subtitle}</h3>
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">{slide.description}</p>

                  <ul className="space-y-2">
                    {slide.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-sky-400 mr-2">•</span>
                        <span className="text-gray-700">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-12 px-2">
            <GradientCTAButton onClick={handleCtaClick} size="sm" className="w-full">
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold whitespace-nowrap">Demander un devis gratuit</span>
                <span className="text-xs font-normal opacity-90 whitespace-nowrap">Réponse sous 24h</span>
              </div>
              <div className="flex flex-col items-center">
                <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
              </div>
            </GradientCTAButton>
          </div>
        </div>
      </div>

      <div ref={scrollContainerRef} className="hidden lg:block w-full overflow-hidden">
        <div className="w-full" style={dynamicStyles}>
          <div className="grid grid-cols-1 lg:grid-cols-[400px_1.2fr_1.5fr]">

            <div className="relative flex flex-col px-8 md:px-16 bg-white pt-0 pb-8">
              <div className="space-y-6">
                {slidesData.map((slide, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`w-full text-left transition-all duration-300 ${
                      index === activeIndex
                        ? 'opacity-100'
                        : 'opacity-40 hover:opacity-70'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className={`text-2xl font-bold ${
                        index === activeIndex ? 'text-sky-400' : 'text-gray-400'
                      }`}>
                        {index + 1}.
                      </span>
                      <span className={`text-lg md:text-xl font-semibold ${
                        index === activeIndex ? 'text-sky-400' : 'text-gray-600'
                      }`}>
                        {slide.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <GradientCTAButton onClick={handleCtaClick} size="sm" className="w-full mt-12">
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-semibold whitespace-nowrap">Demander un devis gratuit</span>
                  <span className="text-xs font-normal opacity-90 whitespace-nowrap">Réponse sous 24h</span>
                </div>
                <div className="flex flex-col items-center">
                  <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                  <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                </div>
              </GradientCTAButton>
            </div>

            <div className="relative flex flex-col justify-start pl-4 md:pl-8 pr-10 md:pr-20 bg-white pt-0 pb-0">
              <div className="relative w-full">
                {slidesData.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity transition-transform duration-300 ${
                      index === activeIndex
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 translate-y-4'
                    }`}
                  >
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-16 h-16 rounded-full bg-sky-400 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-2xl">{index + 1}</span>
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">{slide.subtitle}</h2>
                    </div>
                    <p className="text-sm md:text-base text-gray-700 mb-8 leading-relaxed">{slide.description}</p>

                    <ul className="space-y-3">
                      {slide.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-sky-400 mr-3">•</span>
                          <span className="text-gray-700 text-sm md:text-base">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:flex items-start justify-center px-4 bg-white pt-0 pb-16">
              <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-2xl">
                {slidesData.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      index === activeIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://placehold.co/800x600/e2e8f0/4a5568?text=Image+Not+Found`;
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ScrollingFeatureShowcase;
