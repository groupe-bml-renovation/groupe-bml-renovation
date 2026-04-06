import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CarouselCard {
  id: string;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

interface InfiniteCarouselSectionProps {
  cards?: CarouselCard[];
  onCardAction?: (cardId: string) => void;
}

const defaultCards: CarouselCard[] = [
  {
    id: 'renovation-complete',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?w=600&h=400&fit=crop',
    title: 'Rénovation Complète',
    description: 'Transformez votre maison avec nos experts certifiés.\nRénovation qualifiée intérieure et extérieure.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  },
  {
    id: 'menuiserie',
    image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?w=600&h=400&fit=crop',
    title: 'Menuiserie',
    description: 'Portes et fenêtres certifiées sur mesure.\nAménagements qualifiés pour votre espace.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  },
  {
    id: 'peinture',
    image: 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?w=600&h=400&fit=crop',
    title: 'Peinture & Décoration',
    description: 'Services de peinture certifiée professionnels.\nDonnez vie à vos murs avec excellence reconnue.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  },
  {
    id: 'electricite',
    image: 'https://images.pexels.com/photos/3862622/pexels-photo-3862622.jpeg?w=600&h=400&fit=crop',
    title: 'Électricité',
    description: 'Installations électriques certifiées et aux normes.\nTechniciens qualifiés pour votre sécurité.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  },
  {
    id: 'plomberie',
    image: 'https://images.pexels.com/photos/3930595/pexels-photo-3930595.jpeg?w=600&h=400&fit=crop',
    title: 'Plomberie',
    description: 'Solutions de plomberie certifiée et durables.\nArtisans qualifiés reconnus pour votre confort.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  },
  {
    id: 'salle-bain',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?w=600&h=400&fit=crop',
    title: 'Salles de Bain',
    description: 'Créez votre espace avec aménagements certifiés.\nDesign qualifié et reconnu pour le bien-être.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  },
  {
    id: 'cuisine',
    image: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?w=600&h=400&fit=crop',
    title: 'Cuisines Modernes',
    description: 'Cuisines qualifiées fonctionnelles et élégantes.\nDesign certifié reconnu à votre image.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  },
  {
    id: 'chauffage-climatisation',
    image: 'https://images.pexels.com/photos/4239290/pexels-photo-4239290.jpeg?w=600&h=400&fit=crop',
    title: 'Chauffage & Climatisation',
    description: 'Systèmes certifiés pour confort thermique optimal.\nExperts qualifiés et reconnus toute l\'année.',
    buttonText: 'Découvrir',
    buttonAction: () => {}
  }
];

export const InfiniteCarouselSection: React.FC<InfiniteCarouselSectionProps> = ({
  cards = defaultCards,
  onCardAction
}) => {
  const handleCardAction = (card: CarouselCard) => {
    if (onCardAction) {
      onCardAction(card.id);
    } else {
      card.buttonAction();
    }
  };

  return (
    <section className="w-full py-16 md:py-20 bg-white overflow-hidden">
      <div className="w-full px-4 md:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
            NOS SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              Explorez Nos Solutions
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Découvrez l'ensemble de nos services de rénovation et amélioration d'habitat
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="carousel-container overflow-hidden">
          <div
            className="carousel-track flex gap-4 md:gap-6"
            style={{
              animation: `scroll-infinite ${cards.length * 4}s linear infinite`,
            }}
          >
            {cards.map((card) => (
              <div
                key={card.id}
                className="carousel-card flex-shrink-0 w-64 md:w-72 h-auto"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-40 md:h-48 overflow-hidden bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      decoding="async"
                    />
                  </div>

                  <div className="p-6 md:p-7 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>

                    <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow">
                      {card.description}
                    </p>

                    <button
                      onClick={() => handleCardAction(card)}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:translate-x-1"
                    >
                      {card.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {cards.map((card) => (
              <div
                key={`duplicate-${card.id}`}
                className="carousel-card flex-shrink-0 w-64 md:w-72 h-auto"
                aria-hidden="true"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                  <div className="relative h-40 md:h-48 overflow-hidden bg-slate-100">
                    <img
                      src={card.image}
                      alt={card.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      decoding="async"
                    />
                  </div>

                  <div className="p-6 md:p-7 flex flex-col flex-grow">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>

                    <p className="text-slate-600 text-base leading-relaxed mb-6 flex-grow">
                      {card.description}
                    </p>

                    <button
                      onClick={() => handleCardAction(card)}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] hover:from-[#0ea5e9] hover:to-[#0284c7] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:translate-x-1"
                    >
                      {card.buttonText}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-y-0 left-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
      </div>

      <style>{`
        @keyframes scroll-infinite {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-50% - 12px));
          }
        }

        .carousel-track {
          will-change: transform;
        }

        @media (max-width: 768px) {
          @keyframes scroll-infinite {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 12px));
            }
          }
        }
      `}</style>
    </section>
  );
};

export default InfiniteCarouselSection;
