import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { particuliersServices, professionnelsServices } from '@/data/services-carousel-config';

interface ServicesTabbedCarouselProps {
  onNavigate: (page: string) => void;
  headerText?: string;
  title?: string;
  description?: string;
  showTabs?: boolean;
  isGrenoble?: boolean;
}

export const ServicesTabbedCarousel: React.FC<ServicesTabbedCarouselProps> = ({
  onNavigate,
  headerText = 'GALLERY DE RÉALISATIONS',
  title = 'Nos projets réalisés',
  description = 'Découvrez notre savoir-faire à travers une sélection de nos plus belles réalisations. Chaque projet reflète notre engagement envers l\'excellence et la rénovation haut de gamme.',
  showTabs = true,
  isGrenoble = false
}) => {
  const [activeTab, setActiveTab] = useState<'particuliers' | 'professionnels'>('particuliers');
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const touchStartXRef = useRef(0);
  const scrollPositionsRef = useRef<{ particuliers: number; professionnels: number }>({ particuliers: 0, professionnels: 0 });

  const activeServices = !showTabs ? [...particuliersServices, ...professionnelsServices] : (activeTab === 'particuliers' ? particuliersServices : professionnelsServices);

  const getCardDimensions = () => {
    if (typeof window === 'undefined') return { cardWidth: 320, gap: 24, totalWidth: 344 };

    const isMobileView = window.innerWidth < 768;
    const cardWidthValue = isMobileView ? 320 : 384;
    const gapValue = 24;

    return {
      cardWidth: cardWidthValue,
      gap: gapValue,
      totalWidth: cardWidthValue + gapValue
    };
  };

  useEffect(() => {
    const updateCardWidth = () => {
      const dimensions = getCardDimensions();
      setCardWidth(dimensions.totalWidth);
      setIsMobile(window.innerWidth < 768);
      if (scrollContainerRef.current) {
        setCarouselPosition(scrollContainerRef.current.scrollLeft);
      }
    };

    updateCardWidth();
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateCardWidth, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);


  const handleTabChange = (tab: 'particuliers' | 'professionnels') => {
    if (scrollContainerRef.current) {
      scrollPositionsRef.current[activeTab] = scrollContainerRef.current.scrollLeft;
    }
    setActiveTab(tab);
    setCarouselPosition(0);
    if (scrollContainerRef.current) {
      const savedPosition = scrollPositionsRef.current[tab];
      scrollContainerRef.current.scrollTo({ left: savedPosition, behavior: 'smooth' });
    }
  };

  const mapPageIdToUrl = (pageId: string): string => {
    const urlMap: Record<string, string> = {
      'maisons-villas': '/maisons-et-villas',
      'appartements': '/appartements',
      'salles-de-bain': '/salles-de-bain',
      'cuisines': '/cuisines',
      'piscine': '/piscine',
      'menuiserie': '/menuiserie',
      'peinture': '/peinture',
      'plomberie': '/plomberie',
      'revetements-sols': '/revetements-sols',
      'boutiques-bureaux': '/boutiques-bureaux',
      'espace-verre': '/espace-verre',
      'terrasse-bois': '/terrasse-bois',
      'revetements-muraux': '/revetements-muraux',
      'climatisation': '/climatisation',
      'chauffage': '/chauffage',
      'electricite': '/electricite'
    };
    const baseUrl = urlMap[pageId] || `/${pageId}`;
    return isGrenoble ? `/grenoble${baseUrl}` : baseUrl;
  };

  const handleNavigateService = (pageId: string) => {
    const url = mapPageIdToUrl(pageId);
    window.location.href = url;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current || isScrollingRef.current || isAnimating) return;

    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('[data-service-card]') as HTMLElement;

    if (!firstCard) return;

    const cardComputedWidth = firstCard.offsetWidth;
    const flexContainer = container.querySelector('.flex') as HTMLElement;

    let computedGap = 24;
    if (flexContainer) {
      const gapStyle = window.getComputedStyle(flexContainer).gap;
      const gapMatch = gapStyle.match(/^([\d.]+)(px|rem|em)?/);
      if (gapMatch) {
        const gapValue = parseFloat(gapMatch[1]);
        const gapUnit = gapMatch[2] || 'px';

        if (gapUnit === 'rem') {
          const rootFontSize = parseFloat(window.getComputedStyle(document.documentElement).fontSize);
          computedGap = Math.round(gapValue * rootFontSize);
        } else if (gapUnit === 'em') {
          const fontSize = parseFloat(window.getComputedStyle(flexContainer).fontSize);
          computedGap = Math.round(gapValue * fontSize);
        } else {
          computedGap = Math.round(gapValue);
        }
      }
    }

    const scrollAmount = (cardComputedWidth + computedGap) * (direction === 'right' ? 1 : -1);
    const currentScrollLeft = container.scrollLeft;
    const newPosition = currentScrollLeft + scrollAmount;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const finalPosition = Math.max(0, Math.min(newPosition, maxScroll));

    isScrollingRef.current = true;
    setIsAnimating(true);

    container.scrollTo({
      left: finalPosition,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrollingRef.current = false;
      setIsAnimating(false);
      setCarouselPosition(container.scrollLeft);
    }, 600);
  };

  const scrollThreshold = 10;
  const currentScrollPosition = scrollContainerRef.current?.scrollLeft ?? carouselPosition;
  const maxScrollPosition = scrollContainerRef.current ? scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth : 0;
  const canScrollLeft = currentScrollPosition > scrollThreshold;
  const canScrollRight = currentScrollPosition < (maxScrollPosition - scrollThreshold);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isAnimating) return;

    const touch = e.touches[0];
    const currentY = touch.clientY;
    const currentX = touch.clientX;

    if (!scrollContainerRef.current) return;

    const startY = (e as any).startY || currentY;
    const startX = (e as any).startX || currentX;
    const verticalMovement = Math.abs(currentY - startY);
    const horizontalMovement = Math.abs(currentX - startX);

    if (horizontalMovement > verticalMovement * 1.5 && horizontalMovement > 15) {
      setIsUserScrolling(true);
    } else if (verticalMovement > horizontalMovement && verticalMovement > 15) {
      setIsUserScrolling(false);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    (e as any).startY = touch.clientY;
    (e as any).startX = touch.clientX;
    touchStartXRef.current = touch.clientX;
    setIsUserScrolling(false);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setIsUserScrolling(false);
    }, 100);
  };

  // Intersection Observer for visibility detection
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-scroll logic
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isInView && !isUserScrolling && !isAnimating) {
      intervalId = setInterval(() => {
        if (canScrollRight) {
          scroll('right');
        } else {
          if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
          }
        }
      }, 8000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isInView, canScrollRight, isUserScrolling, isAnimating]);

  return (
    <section ref={sectionRef} className="w-full pt-8 md:pt-12 pb-8 md:pb-10 bg-white overflow-hidden">
      <div className="mb-6">
        <div className="text-center mb-8 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
            {headerText}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-slate-700 text-base max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {showTabs && (
          <div className="flex gap-2 justify-center mb-6 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
            <motion.button
              initial={false}
              animate={{
                borderBottomWidth: activeTab === 'particuliers' ? 3 : 0,
                borderBottomColor: activeTab === 'particuliers' ? '#38bdf8' : 'transparent'
              }}
              onClick={() => handleTabChange('particuliers')}
              className="px-6 md:px-8 py-3 text-base md:text-lg font-semibold text-slate-700 hover:text-[#38bdf8] transition-colors duration-300"
            >
              Travaux pour les particuliers <span className="text-[#38bdf8] ml-2">({particuliersServices.length})</span>
            </motion.button>

            <motion.button
              initial={false}
              animate={{
                borderBottomWidth: activeTab === 'professionnels' ? 3 : 0,
                borderBottomColor: activeTab === 'professionnels' ? '#38bdf8' : 'transparent'
              }}
              onClick={() => handleTabChange('professionnels')}
              className="px-6 md:px-8 py-3 text-base md:text-lg font-semibold text-slate-700 hover:text-[#38bdf8] transition-colors duration-300"
            >
              Travaux pour les professionnels <span className="text-[#38bdf8] ml-2">({professionnelsServices.length})</span>
            </motion.button>
          </div>
        )}
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="relative w-full">
          <div className="relative group">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollLeft ? 1 : 0.3 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.preventDefault();
                if (canScrollLeft && !isAnimating) scroll('left');
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft' && canScrollLeft && !isAnimating) {
                  e.preventDefault();
                  scroll('left');
                }
              }}
              disabled={!canScrollLeft || isAnimating}
              className={`absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg pointer-events-auto ${
                canScrollLeft && !isAnimating
                  ? 'bg-slate-800 hover:bg-slate-900 hover:shadow-2xl hover:scale-110 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed'
              } ${isMobile ? '-left-2 md:left-0' : 'left-0'}`}
              style={{ touchAction: 'manipulation' }}
              aria-label="Services précédents"
              whileHover={{}}
              whileTap={{}}
            >
              <motion.div
                animate={{ x: canScrollLeft && !isAnimating ? 0 : 2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
            </motion.button>

            <div
              ref={scrollContainerRef}
              className={`w-full scroll-smooth overflow-x-hidden overflow-y-hidden`}
              style={{ scrollSnapType: 'x mandatory', touchAction: 'pan-y', overscrollBehavior: 'pan-x', scrollBehavior: 'smooth' }}
              onScroll={(e) => {
                if (!isScrollingRef.current) {
                  const container = e.currentTarget;
                  setCarouselPosition(container.scrollLeft);
                }
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex gap-6 pb-4">
                <AnimatePresence mode="wait">
                  {activeServices.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ServiceCard
                        title={service.title}
                        description={service.description}
                        image={service.image}
                        iconName={service.icon}
                        onClick={showTabs ? () => handleNavigateService(service.pageId) : undefined}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollRight ? 1 : 0.3 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.preventDefault();
                if (canScrollRight && !isAnimating) scroll('right');
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' && canScrollRight && !isAnimating) {
                  e.preventDefault();
                  scroll('right');
                }
              }}
              disabled={!canScrollRight || isAnimating}
              className={`absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg pointer-events-auto ${
                canScrollRight && !isAnimating
                  ? 'bg-slate-800 hover:bg-slate-900 hover:shadow-2xl hover:scale-110 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed'
              } ${isMobile ? '-right-2 md:right-0' : 'right-0'}`}
              style={{ touchAction: 'manipulation' }}
              aria-label="Services suivants"
              whileHover={{}}
              whileTap={{}}
            >
              <motion.div
                animate={{ x: canScrollRight && !isAnimating ? 0 : -2 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
        div {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        [data-service-card] img {
          will-change: auto;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        [data-service-card] {
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
};

export default ServicesTabbedCarousel;
