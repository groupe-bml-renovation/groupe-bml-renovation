import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioShowcaseProps {
  onNavigate: (page: string) => void;
}

const PortfolioShowcase: React.FC<PortfolioShowcaseProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState('Rénovation Complète');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    'Rénovation Complète',
    'Rénovation Cuisine',
    'Salle de Bain',
    'Peinture',
    'Revêtement Sol',
    'Électricité et installation de born électrique',
    'Plomberie',
    'Travaux isolation intérieure',
    'Rénovation piscine',
    'Espace verre',
    'Salle de bain PMR',
    'Menuiserie',
    'Plâtrerie',
    'Ventilation et chauffage',
    'Aménagement extérieur et terrasse bois'
  ];

  const categoryImages: { [key: string]: string[] } = {
    'Rénovation Complète': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_53_53_zd2zb7%20(1).png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/8beb5492-0d59-4517-a2a4-ff500de068a7_q9eo3g.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_j3111i%20(3).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-5.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod%20(2).jpg'
    ],
    'Rénovation Cuisine': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/8beb5492-0d59-4517-a2a4-ff500de068a7_q9eo3g.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0044.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0083%20(1).jpg'
    ],
    'Salle de Bain': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-7.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251018_1300_s1t5vnezty%20(1)-2.png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/20251020_0551_Modern%20Bathroom%20Design_remix_01k7zvsr0gf0c9czpjneq6had9-2.png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0086_fxxstd-2.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-5.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250910-WA0032%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0015_zv0dmk-2.jpg'
    ],
    'Peinture': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/mage_12_oct._2025_a%CC%80_10_27_55_qk5xf8-2.png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_j3111i%20(3).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Image_29_sept._2025_10_53_53_zd2zb7%20(1).png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0044.jpg'
    ],
    'Revêtement Sol': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0042_enwkww.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/263b1bc0-48b1-4d4d-84eb-fdb258af1d2c_kq1aov%20(2).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-69.png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0047%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0083%20copie.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0087.jpg'
    ],
    'Électricité et installation de born électrique': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-09-30_at_22.00.36_g9akl6%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-7.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/mage_12_oct._2025_a%CC%80_10_27_55_qk5xf8-2.png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-10.jpg'
    ],
    'Plomberie': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design-71.png'
    ],
    'Travaux isolation intérieure': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG_4194-2.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG_4195-2.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-0661-2.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp%20Image%202025-10-13%20at%2014.07.05-2.jpeg'
    ],
    'Rénovation piscine': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Capture_d_%C3%A9cran_2025-10-12_%C3%A0_08.39.38_lcr05k%20(1).png',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/52360a46-d39e-40b6-b54e-d63125ec822d.JPG',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/a4a23d2a-e60e-48a4-aceb-a8996afb580c_htgckp%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/1090caa8-6c2e-4e6a-a6ad-f0353b69b48a_zdeunt%20(2).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/0d9fc48b-608f-4f03-8727-652717fd849c.JPG',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/29db9f6e-c821-4223-951b-786d949f99c0_yymo6x.jpg'
    ],
    'Espace verre': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/042e28c4-ab31-4285-ac0b-f923e217da66_ewelee.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/e733fa4e-a39d-4629-9e1d-b66ee0cbafb2.JPG',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/f82dc53a-e265-4ef9-abed-2815d48566ce_n1uien.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/51f19edd-0cdf-4b46-9f6e-191ce2e22eda_vgciym.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-13_at_13.08.31_fff52v.jpg'
    ],
    'Salle de bain PMR': [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1260&q=80'
    ],
    'Menuiserie': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design%20(48).png'
    ],
    'Plâtrerie': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0014_jg0xyb%20(2).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0054_kbc2wk%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250910-WA0040_wnqrpi.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250910-WA0038_luqpxk.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250910-WA0039_dbbe4v%20(1).jpg'
    ],
    'Ventilation et chauffage': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-02_at_16.52.32_zqjemo.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/39ce06e4-359c-4237-b855-411d10f88cc8_noisks.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-02_at_16.56.52_2_dubodk.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-02_at_16.56.52_3_v2jaqs.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0052_gr3kxj.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0053_lcww4s.jpg'
    ],
    'Aménagement extérieur et terrasse bois': [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/a4a23d2a-e60e-48a4-aceb-a8996afb580c_htgckp%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/6926647f-2fa7-4e03-8143-cdc548d4eaf7_neftu9.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/IMG-20250909-WA0024.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/08c9784d-a6ba-4494-8ba9-b6935de010d6_kaax7w.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-13_at_12.53.51_1_mpbczz%20(1).jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-13_at_12.53.51_3_oagoit.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-13_at_12.53.39_rddphe.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-13_at_12.53.51_2_dnmyjw.jpg',
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/WhatsApp_Image_2025-10-13_at_12.53.51_eskjdi.jpg'
    ]
  };

  const currentImages = categoryImages[selectedCategory];

  useEffect(() => {
    setCurrentSlideIndex(0);
  }, [selectedCategory]);

  useEffect(() => {
    if (thumbnailScrollRef.current) {
      const thumbnailWidth = 100 + 12;
      const containerWidth = thumbnailScrollRef.current.clientWidth;
      const scrollLeft = Math.max(0, (currentSlideIndex * thumbnailWidth) - (containerWidth / 2) + (thumbnailWidth / 2));

      thumbnailScrollRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentSlideIndex]);

  const handlePrevImage = () => {
    setCurrentSlideIndex((prev) =>
      prev === 0 ? currentImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentSlideIndex((prev) =>
      (prev + 1) % currentImages.length
    );
  };

  return (
    <>
      <div className="mb-12">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-[#38bdf8] text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="relative w-full h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={`${selectedCategory}-${currentSlideIndex}`}
            src={currentImages[currentSlideIndex]}
            alt={`${selectedCategory} ${currentSlideIndex + 1}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </AnimatePresence>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handlePrevImage();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleNextImage();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-medium z-10">
          {currentSlideIndex + 1} / {currentImages.length}
        </div>
      </div>

      <div className="mt-6 overflow-hidden">
        <div
          ref={thumbnailScrollRef}
          className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {currentImages.map((image, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex-shrink-0 w-24 h-16 sm:w-36 sm:h-24 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                idx === currentSlideIndex
                  ? 'border-[#38bdf8] shadow-lg'
                  : 'border-transparent hover:border-gray-300 opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioShowcase;
