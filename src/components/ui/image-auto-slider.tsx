import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface Image {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface ImageAutoSliderProps {
  images?: Image[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showControls?: boolean;
  showDots?: boolean;
  slideTransitionDuration?: number;
  onSlideChange?: (index: number) => void;
  className?: string;
}

export const Component: React.FC<ImageAutoSliderProps> = ({
  images = [
    {
      src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254020/6926647f-2fa7-4e03-8143-cdc548d4eaf7_neftu9.jpg",
      alt: "Renovation 1",
      title: "Salle de Bain Spa",
    },
    {
      src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254730/IMG-20250909-WA0036_tjkv9r.jpg",
      alt: "Renovation 2",
      title: "Peinture Intérieure",
    },
    {
      src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/29db9f6e-c821-4223-951b-786d949f99c0_yymo6x.jpg",
      alt: "Renovation 3",
      title: "Espace Bureau",
    },
    {
      src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254075/IMG-20250909-WA0014_jg0xyb.jpg",
      alt: "Renovation 4",
      title: "Piscine Extérieure",
    },
    {
      src: "https://res.cloudinary.com/dkhtcapmr/image/upload/v1758797753/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_m6oul5.jpg",
      alt: "Renovation 5",
      title: "Installation Électrique",
    },
  ],
  autoPlay = true,
  autoPlayInterval = 5000,
  showControls = true,
  showDots = true,
  slideTransitionDuration = 600,
  onSlideChange,
  className = "",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isPlaying || isHovered) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, isHovered, images.length, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    onSlideChange?.(index);
  };

  const nextSlide = () => {
    const newIndex = (currentSlide + 1) % images.length;
    goToSlide(newIndex);
  };

  const prevSlide = () => {
    const newIndex = (currentSlide - 1 + images.length) % images.length;
    goToSlide(newIndex);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className={`relative w-full bg-gray-900 overflow-hidden ${className}`}>
      <div
        className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Container */}
        <div className="relative w-full h-full">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-${slideTransitionDuration} ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          ))}
        </div>

        {/* Title and Description */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white z-10">
          <h3 className="text-2xl md:text-4xl font-bold mb-3">
            {images[currentSlide]?.title}
          </h3>
          {images[currentSlide]?.description && (
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
              {images[currentSlide].description}
            </p>
          )}
        </div>

        {/* Previous Button */}
        {showControls && (
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Next Button */}
        {showControls && (
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Play/Pause Button */}
        {showControls && (
          <button
            onClick={togglePlayPause}
            className="absolute bottom-6 right-6 z-20 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" />
            )}
          </button>
        )}

        {/* Dots Navigation */}
        {showDots && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'bg-white w-8'
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Component;
