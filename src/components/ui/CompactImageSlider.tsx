import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompactImageSliderProps {
  images?: string[];
  onSlideChange?: (index: number) => void;
}

export const CompactImageSlider: React.FC<CompactImageSliderProps> = ({
  images = [
    "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254020/6926647f-2fa7-4e03-8143-cdc548d4eaf7_neftu9.jpg",
    "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254730/IMG-20250909-WA0036_tjkv9r.jpg",
    "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/29db9f6e-c821-4223-951b-786d949f99c0_yymo6x.jpg",
    "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254075/IMG-20250909-WA0014_jg0xyb.jpg",
    "https://res.cloudinary.com/dkhtcapmr/image/upload/v1758797753/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_m6oul5.jpg",
  ],
  onSlideChange,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    onSlideChange?.(newIndex);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    onSlideChange?.(index);
  };

  return (
    <div className="w-full relative overflow-hidden flex items-center justify-center py-12">
      <button
        onClick={handlePrevious}
        className="absolute left-4 z-20 w-12 h-12 rounded-full bg-blue-400/80 hover:bg-blue-400 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="relative z-10 w-full flex items-center justify-center">
        <div className="w-full max-w-6xl px-4">
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center"
              >
                <div className="group w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'bg-blue-400 w-8 h-2'
                    : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={handleNext}
        className="absolute right-4 z-20 w-12 h-12 rounded-full bg-blue-400/80 hover:bg-blue-400 text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
