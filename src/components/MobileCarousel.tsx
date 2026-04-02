import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { OptimizedImage } from './OptimizedImage';

interface MobileCarouselProps {
  images: string[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  title?: string;
  description?: string;
  showCounter?: boolean;
}

export const MobileCarousel: React.FC<MobileCarouselProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 5000,
  title,
  description,
  showCounter = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const minSwipeDistance = 50;

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;

    const newIndex = ((index % images.length) + images.length) % images.length;
    setCurrentIndex(newIndex);
    setIsTransitioning(true);

    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [images.length, isTransitioning]);

  const goToNext = useCallback(() => {
    goToSlide((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  const goToPrevious = useCallback(() => {
    goToSlide((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, goToSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

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
    <div className="relative w-full h-full overflow-hidden bg-neutral-900">
      <div
        ref={containerRef}
        className="relative w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={stopAutoPlay}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${images.length * 100}%`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 flex items-center justify-center w-full h-full"
            >
              <OptimizedImage
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          stopAutoPlay();
          goToPrevious();
        }}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={() => {
          stopAutoPlay();
          goToNext();
        }}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              stopAutoPlay();
              goToSlide(index);
            }}
            disabled={isTransitioning}
            className={`rounded-full transition-all duration-300 touch-manipulation ${
              index === currentIndex
                ? 'bg-white w-8 h-2'
                : 'bg-white/40 hover:bg-white/60 w-2 h-2'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {title && (
        <div className="absolute bottom-20 left-6 right-6 z-10">
          <h3 className="text-4xl md:text-5xl font-light text-white leading-tight">
            {title}
          </h3>
        </div>
      )}

      {showCounter && (
        <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};
