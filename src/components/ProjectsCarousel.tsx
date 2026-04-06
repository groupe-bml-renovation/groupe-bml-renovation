import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { featuredProjects_sorted } from '@/data/projects-carousel-config';

interface ProjectsCarouselProps {
  onNavigate?: (page: string) => void;
  headerText?: string;
  title?: string;
  description?: string;
}

export const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  onNavigate,
  headerText = 'GALLERY DE RÉALISATIONS',
  title = 'Nos projets réalisés',
  description = 'Découvrez notre savoir-faire à travers une sélection de nos plus belles réalisations. Chaque projet reflète notre engagement envers l\'excellence et la rénovation haut de gamme.'
}) => {
  const navigate = useNavigate();
  const [carouselPosition, setCarouselPosition] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const touchStartXRef = useRef(0);

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
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);
    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);


  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current || isScrollingRef.current) return;

    const container = scrollContainerRef.current;
    const firstCard = container.querySelector('[data-project-card]') as HTMLElement;

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
    container.scrollTo({
      left: finalPosition,
      behavior: 'smooth'
    });

    setTimeout(() => {
      isScrollingRef.current = false;
      setCarouselPosition(container.scrollLeft);
    }, 600);
  };

  const scrollThreshold = 10;
  const currentScrollPosition = scrollContainerRef.current?.scrollLeft ?? carouselPosition;
  const maxScrollPosition = scrollContainerRef.current ? scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth : 0;
  const canScrollLeft = currentScrollPosition > scrollThreshold;
  const canScrollRight = currentScrollPosition < (maxScrollPosition - scrollThreshold);

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const currentY = touch.clientY;
    const currentX = touch.clientX;

    if (!scrollContainerRef.current) return;

    const startY = (e as any).startY || currentY;
    const startX = (e as any).startX || currentX;
    const verticalMovement = Math.abs(currentY - startY);
    const horizontalMovement = Math.abs(currentX - startX);

    if (horizontalMovement > verticalMovement && horizontalMovement > 10) {
      setIsUserScrolling(true);
    } else if (verticalMovement > horizontalMovement && verticalMovement > 10) {
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
    setIsUserScrolling(false);
  };

  const handleProjectClick = (project: typeof featuredProjects_sorted[0]) => {
    if (project.route && !isUserScrolling) {
      navigate(project.route);
    }
  };

  return (
    <section className="w-full pt-16 md:pt-8 pb-8 md:pb-12 bg-white overflow-hidden">
      <div className="mb-12">
        <div className="text-center mb-12 max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
          <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
            {headerText}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4 leading-tight">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            {description}
          </p>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8">
        <div className="relative w-full">
          <div className="relative group">
            {/* Left Navigation Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollLeft ? 1 : 0.3 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.preventDefault();
                if (canScrollLeft) scroll('left');
              }}
              disabled={!canScrollLeft}
              className={`absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg pointer-events-auto ${
                canScrollLeft
                  ? 'bg-slate-800 hover:bg-slate-900 hover:shadow-2xl hover:scale-110 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed'
              } ${isMobile ? '-left-2 md:left-0' : 'left-0'}`}
              style={{ touchAction: 'manipulation' }}
              aria-label="Projets précédents"
            >
              <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </motion.button>

            {/* Carousel Container */}
            <div
              ref={scrollContainerRef}
              className="w-full scroll-smooth overflow-x-hidden overflow-y-hidden"
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
                  {featuredProjects_sorted.map((project) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectCard
                        title={project.title}
                        description={project.description}
                        image={project.image}
                        category={project.category}
                        budget={project.budget}
                        duration={project.duration}
                        onClick={project.route ? () => handleProjectClick(project) : undefined}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Right Navigation Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: canScrollRight ? 1 : 0.3 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                e.preventDefault();
                if (canScrollRight) scroll('right');
              }}
              disabled={!canScrollRight}
              className={`absolute top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg pointer-events-auto ${
                canScrollRight
                  ? 'bg-slate-800 hover:bg-slate-900 hover:shadow-2xl hover:scale-110 cursor-pointer'
                  : 'bg-slate-400 cursor-not-allowed'
              } ${isMobile ? '-right-2 md:right-0' : 'right-0'}`}
              style={{ touchAction: 'manipulation' }}
              aria-label="Projets suivants"
            >
              <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
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
        [data-project-card] img {
          will-change: auto;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        [data-project-card] {
          transform: translateZ(0);
        }
      `}</style>
    </section>
  );
};

export default ProjectsCarousel;
