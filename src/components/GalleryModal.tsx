import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
  id: string;
  project_slug: string;
  image_url: string;
  caption: string;
  display_order: number;
  is_process_image: boolean;
  created_at: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ isOpen, onClose, images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (lightboxOpen) {
        if (e.key === 'Escape') {
          setLightboxOpen(false);
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
      } else {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'ArrowLeft') {
          setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
        } else if (e.key === 'ArrowRight') {
          setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, lightboxOpen, images.length, onClose]);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleLightboxPrevious = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleLightboxNext = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images.length) {
    return null;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
              <div className="w-full max-w-6xl bg-white rounded-lg shadow-2xl">
                <div className="relative">
                  <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close gallery"
                  >
                    <X className="w-6 h-6 text-gray-800" />
                  </button>

                  {lightboxOpen ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full aspect-video bg-black/90 flex items-center justify-center"
                    >
                      <img
                        src={images[lightboxIndex].image_url}
                        alt={images[lightboxIndex].caption}
                        className="max-w-full max-h-full object-contain"
                      />

                      <button
                        onClick={handleLightboxPrevious}
                        className="absolute left-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6 text-white" />
                      </button>

                      <button
                        onClick={handleLightboxNext}
                        className="absolute right-4 p-2 bg-white/20 hover:bg-white/40 rounded-full transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6 text-white" />
                      </button>

                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded text-sm">
                        {lightboxIndex + 1} / {images.length}
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8">
                      <div className="md:w-2/3">
                        <div
                          className="relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer group flex items-center justify-center min-h-96"
                          onClick={() => {
                            setLightboxIndex(selectedIndex);
                            setLightboxOpen(true);
                          }}
                        >
                          <motion.img
                            key={selectedIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            src={images[selectedIndex].image_url}
                            alt={images[selectedIndex].caption}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <div className="mt-4">
                          <h3 className="text-lg md:text-xl font-semibold text-gray-800">
                            {images[selectedIndex].caption}
                          </h3>
                          <p className="text-sm text-gray-500 mt-2">
                            Image {selectedIndex + 1} sur {images.length}
                          </p>
                        </div>

                        <div className="flex gap-4 mt-6">
                          <button
                            onClick={handlePrevious}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Précédente</span>
                          </button>
                          <button
                            onClick={handleNext}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                            aria-label="Next image"
                          >
                            <span className="hidden sm:inline">Suivante</span>
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      <div className="md:w-1/3">
                        <h4 className="text-sm font-semibold text-gray-700 mb-4">
                          GALERIE COMPLÈTE ({images.length})
                        </h4>
                        <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
                          {images.map((image, index) => (
                            <motion.button
                              key={image.id}
                              whileHover={{ scale: 1.05 }}
                              onClick={() => setSelectedIndex(index)}
                              className={`relative rounded-lg overflow-hidden bg-gray-100 transition-all flex items-center justify-center min-h-24 ${
                                index === selectedIndex ? 'ring-2 ring-cyan-500 ring-offset-2' : ''
                              }`}
                            >
                              <img
                                src={image.image_url}
                                alt={image.caption}
                                className="w-full h-full object-contain hover:opacity-75 transition-opacity"
                              />
                              {index === selectedIndex && (
                                <div className="absolute inset-0 bg-cyan-500/20" />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
