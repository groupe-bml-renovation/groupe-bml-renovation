import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServiceSlide {
  image: string;
  title: string;
  description: string;
}

interface ServiceHeroCarouselProps {
  slides: ServiceSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const ServiceHeroCarousel: React.FC<ServiceHeroCarouselProps> = ({
  slides,
  autoPlay = true,
  autoPlayInterval = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;

    const newIndex = (index + slides.length) % slides.length;
    setCurrentIndex(newIndex);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 600);
  }, [slides.length, isTransitioning]);

  const goToNext = useCallback(() => {
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  useEffect(() => {
    if (autoPlay) {
      autoPlayRef.current = setInterval(() => {
        goToNext();
      }, autoPlayInterval);

      return () => {
        if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
      };
    }
  }, [autoPlay, autoPlayInterval, goToNext]);

  const stopAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: index === currentIndex ? 1 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          style={{ pointerEvents: index === currentIndex ? 'auto' : 'none' }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            loading="eager"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>
      ))}

      <motion.div
        key={`content-${currentIndex}`}
        className="absolute bottom-0 left-0 right-0 z-10 px-6 md:px-12 py-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="max-w-3xl">
          <h2 className="text-5xl md:text-7xl font-light text-white mb-4 leading-tight">
            {slides[currentIndex].title}
          </h2>
          <div className="w-16 h-1 bg-cyan-400 mb-6" />
          <p className="text-lg md:text-xl text-white/90 leading-relaxed">
            {slides[currentIndex].description}
          </p>
        </div>
      </motion.div>

      <button
        onClick={() => {
          stopAutoPlay();
          goToPrevious();
        }}
        disabled={isTransitioning}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/15 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
      </button>

      <button
        onClick={() => {
          stopAutoPlay();
          goToNext();
        }}
        disabled={isTransitioning}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/15 hover:bg-white/30 backdrop-blur-md text-white rounded-full transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              stopAutoPlay();
              goToSlide(index);
            }}
            disabled={isTransitioning}
            className={`rounded-full transition-all duration-300 touch-manipulation ${
              index === currentIndex
                ? 'bg-white'
                : 'bg-white/40 hover:bg-white/70'
            }`}
            animate={{
              width: index === currentIndex ? 32 : 8,
              height: 8,
            }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute top-8 right-8 z-10 bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-full text-sm font-medium">
        {currentIndex + 1} / {slides.length}
      </div>
    </div>
  );
};
