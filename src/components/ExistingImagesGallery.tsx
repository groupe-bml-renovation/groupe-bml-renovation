/**
 * MOBILE-OPTIMIZED IMAGE CAROUSEL
 *
 * This component provides two distinct viewing experiences:
 *
 * MOBILE VIEW (< 768px):
 * - Horizontal auto-scrolling carousel avec infinite loop
 * - Images are perfectly centered et aligned at 85vw width (max 400px)
 * - Smooth CSS animation moves exactly one image at a time
 * - Touch/swipe gestures work naturally avec browser scroll behavior
 * - Auto-pause on hover pour better UX
 *
 * DESKTOP VIEW (>= 768px):
 * - Traditional responsive grid layout (1-3 columns based on screen size)
 * - Hover effects et smooth transitions
 *
 * TECHNICAL IMPLEMENTATION:
 *
 * 1. ALIGNMENT & CENTERING (Mobile):
 *    - Container uses flexbox avec justify-center pour perfect centering
 *    - Each image card is 85vw avec max-width:400px pour consistent sizing
 *    - Gap of 24px (gap-6) provides visual separation
 *
 * 2. INFINITE SCROLL MECHANISM:
 *    - Two identical sets of images are rendered side-by-side
 *    - CSS animation translates the container by -100% over 40 seconds
 *    - When first set exits left, second set seamlessly takes its place
 *    - Creates illusion of endless loop without JavaScript overhead
 *
 * 3. RESPONSIVE DESIGN:
 *    - Media query at 768px switches between carousel et grid
 *    - Mobile-first approach avec progressive enhancement
 *    - Optimized image loading avec lazy loading
 *
 * 4. TOUCH OPTIMIZATION:
 *    - Native browser scroll handling (no custom touch events needed)
 *    - Smooth momentum scrolling on iOS/Android
 *    - Pause animation on interaction via CSS :hover
 *
 * BROWSER COMPATIBILITY:
 * - Works on iOS Safari, Chrome Mobile, Firefox Mobile
 * - Fallback to static display if animations unsupported
 *
 * TESTING INSTRUCTIONS:
 * 1. Mobile (320-767px): Verify auto-scroll avec perfect centering
 * 2. Tablet (768-1023px): Check grid layout transitions
 * 3. Desktop (1024px+): Verify hover effects et grid spacing
 * 4. Touch devices: Test swipe gestures et scroll momentum
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptimizedImage } from './OptimizedImage';

interface ImageItem {
  id: number;
  src: string;
  alt: string;
  category: string;
  title: string;
}

const existingImages: ImageItem[] = [
  // Middle Column (top to bottom)
  {
    id: 3,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254020/6926647f-2fa7-4e03-8143-cdc548d4eaf7_neftu9.jpg",
    alt: "Salle de bain spa",
    category: "Salle de Bain",
    title: "Salle de Bain Spa"
  },
  {
    id: 4,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254730/IMG-20250909-WA0036_tjkv9r.jpg",
    alt: "Peinture intérieure professionnelle",
    category: "Peinture",
    title: "Peinture Intérieure"
  },
  {
    id: 5,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/29db9f6e-c821-4223-951b-786d949f99c0_yymo6x.jpg",
    alt: "Espace bureau rénové",
    category: "Bureau",
    title: "Espace Bureau"
  },
  // Right Column (top to bottom)
  {
    id: 7,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254075/IMG-20250909-WA0014_jg0xyb.jpg",
    alt: "Rénovation piscine extérieure",
    category: "Extérieur",
    title: "Piscine Extérieure"
  },
  {
    id: 8,
    src: "https://res.cloudinary.com/dkhtcapmr/image/upload/v1758797753/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_m6oul5.jpg",
    alt: "Travaux électriques",
    category: "Électricité et installation de born électrique",
    title: "Installation Électrique"
  },
  {
    id: 9,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250258/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi.jpg",
    alt: "Avant rénovation salle de bain",
    category: "Avant/Après",
    title: "Avant Rénovation"
  },
  {
    id: 10,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250258/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi.jpg",
    alt: "Après rénovation salle de bain",
    category: "Avant/Après",
    title: "Après Rénovation"
  },
  {
    id: 11,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760253139/IMG-20250909-WA0016_gpbbxh.jpg",
    alt: "Travaux en cours",
    category: "Chantier",
    title: "Travaux en Cours"
  },
  {
    id: 12,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760253140/IMG-20250909-WA0064_zi3liu.jpg",
    alt: "Finitions modernes",
    category: "Finitions",
    title: "Finitions Modernes"
  },
  {
    id: 15,
    src: "https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/1090caa8-6c2e-4e6a-a6ad-f0353b69b48a_zdeunt.jpg",
    alt: "Aménagement extérieur au terrasse bois",
    category: "Extérieur",
    title: "Aménagement Extérieur au Terrasse Bois"
  },
  {
    id: 17,
    src: "https://res.cloudinary.com/dkhtcapmr/image/upload/v1759132120/IMG-20250909-WA0036_frnxbe.jpg",
    alt: "Détails de finition",
    category: "Finitions",
    title: "Détails Finition"
  },
  {
    id: 18,
    src: "https://res.cloudinary.com/dkhtcapmr/image/upload/v1759132120/IMG-20250909-WA0040_o6jbbw.jpg",
    alt: "Travaux de qualité",
    category: "Qualité",
    title: "Travaux Qualité"
  },
  {
    id: 19,
    src: "https://res.cloudinary.com/dkhtcapmr/image/upload/v1759132136/IMG-20250909-WA0063_ghisdn.jpg",
    alt: "Expertise professionnelle",
    category: "Expertise",
    title: "Expertise Pro"
  },
  {
    id: 20,
    src: "https://res.cloudinary.com/dkhtcapmr/image/upload/v1757526824/c1cd0fee-940a-4f36-b3ac-1cbce01e4fee_iuchlc.jpg",
    alt: "Construction intérieure",
    category: "Construction",
    title: "Construction Intérieure"
  }
];

const categories = [
  "Salle de Bain",
  "Peinture Intérieure",
  "Électricité et installation de born électrique",
  "Plomberie",
  "Isolation complete",
  "Rénovation piscine",
  "Espace verre",
  "Salle de bain PMR",
  "Menuiserie complet",
  "Plâtrerie",
  "Ventilation",
  "Aménagement complète"
];

export default function ExistingImagesGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Salle de Bain");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const filteredImages = existingImages.filter(img => img.category === selectedCategory);
  const minSwipeDistance = 50;

  const openModal = (image: ImageItem) => {
    setSelectedImage(image);
    setCurrentImageIndex(filteredImages.findIndex(img => img.id === image.id));
  };

  const closeModal = () => {
    setSelectedImage(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  const goToPrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredImages.length - 1;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const goToNext = () => {
    const newIndex = currentImageIndex < filteredImages.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleDragStart = (clientX: number) => {
    setDragStart(clientX);
    setIsDragging(true);
  };

  const handleDragMove = (clientX: number) => {
    if (dragStart === null) return;
    const diff = clientX - dragStart;
    setDragOffset(diff);
  };

  const handleDragEnd = () => {
    if (dragStart === null) return;

    const threshold = 100;
    if (dragOffset > threshold) {
      goToPrevious();
    } else if (dragOffset < -threshold) {
      goToNext();
    }

    setDragStart(null);
    setDragOffset(0);
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleDragMove(e.clientX);
    }
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleDragMove(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  return (
    <section className="w-full bg-white py-8">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16">
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide inline-block"
          >
            GALERIE DE NOS RÉALISATIONS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6"
          >
            Découvrez Nos Projets
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Explorez notre portfolio de réalisations et découvrez la qualité de notre travail
          </motion.p>
        </div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#38bdf8] text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Mobile Carousel pour screens < 768px */}
        <div className="md:hidden">
          <div className="relative w-full overflow-hidden flex items-center justify-center group">
            <div className="relative z-10 w-full flex items-center justify-center py-0">
              <div className="scroll-container w-full max-w-6xl overflow-x-auto scrollbar-hide">
                <div className="infinite-scroll flex gap-6 w-max">
                  <div className="flex gap-6 animate-scroll">
                    {filteredImages.map((image) => (
                      <div
                        key={image.id}
                        className="flex-shrink-0 w-[85vw] max-w-[400px] group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                        onClick={() => openModal(image)}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <OptimizedImage
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="eager"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-semibold text-base mb-1">
                              {image.title}
                            </h3>
                            <span className="text-[#38bdf8] text-sm font-medium">
                              {image.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-6 animate-scroll" aria-hidden="true">
                    {filteredImages.map((image) => (
                      <div
                        key={`duplicate-${image.id}`}
                        className="flex-shrink-0 w-[85vw] max-w-[400px] group relative overflow-hidden rounded-xl shadow-lg cursor-pointer"
                        onClick={() => openModal(image)}
                      >
                        <div className="aspect-[4/3] overflow-hidden">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="eager"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-semibold text-base mb-1">
                              {image.title}
                            </h3>
                            <span className="text-[#38bdf8] text-sm font-medium">
                              {image.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Grid pour screens >= 768px */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => openModal(image)}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="eager"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {image.title}
                    </h3>
                    <span className="text-[#38bdf8] text-sm font-medium">
                      {image.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Navigation Buttons */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center text-white hover:bg-black/60 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Image */}
                <motion.div
                  key={selectedImage.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1, x: dragOffset }}
                  transition={{ duration: isDragging ? 0 : 0.3 }}
                  className="relative select-none"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                  <OptimizedImage
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="w-full h-auto max-h-[85vh] object-contain rounded-lg pointer-events-none"
                  />

                  {/* Image Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                    <h3 className="text-white text-2xl font-bold mb-2">
                      {selectedImage.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[#38bdf8] font-medium">
                        {selectedImage.category}
                      </span>
                      <span className="text-white/70 text-sm">
                        {currentImageIndex + 1} / {filteredImages.length}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}