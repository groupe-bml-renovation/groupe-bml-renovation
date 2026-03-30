import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface Service {
  title: string;
  images: string[];
}

const services: Service[] = [
  {
    title: 'Rénovation Complète',
    images: []
  },
  {
    title: 'Rénovation Cuisine',
    images: []
  },
  {
    title: 'Salle de Bain',
    images: []
  },
  {
    title: 'Peinture',
    images: []
  },
  {
    title: 'Revêtement Sol',
    images: []
  },
  {
    title: 'Électricité et Installation borne électrique',
    images: [
      'https://ik.imagekit.io/qhz1qzxur/Untitled%20design%20(53).png?updatedAt=1761247343059'
    ]
  },
  {
    title: 'Plomberie',
    images: []
  },
  {
    title: 'Travaux isolation intérieure',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256607/IMG_4195_wua13x.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256598/74480365314__041D9C3F-2B60-4BC9-9559-91CD6E3B33E4_qwr6oi.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256686/IMG-0661_cm0pun.jpg'
    ]
  },
  {
    title: 'Rénovation piscine',
    images: []
  },
  {
    title: 'Espace verre',
    images: []
  },
  {
    title: 'Salle de bain PMR',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760252170/WhatsApp_Image_2025-10-02_at_16.26.45_zstr3j.jpg'
    ]
  },
  {
    title: 'Menuiserie',
    images: []
  },
  {
    title: 'Plâtrerie',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257401/IMG-20250910-WA0039_dbbe4v.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257418/IMG-20250910-WA0040_wnqrpi.jpg'
    ]
  },
  {
    title: 'Ventilation et chauffage',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257526/WhatsApp_Image_2025-10-02_at_16.52.32_zqjemo.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257537/WhatsApp_Image_2025-10-02_at_16.56.52_2_dubodk.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257537/WhatsApp_Image_2025-10-02_at_16.56.52_3_v2jaqs.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257590/IMG-20250909-WA0053_lcww4s.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257590/IMG-20250909-WA0052_gr3kxj.jpg'
    ]
  },
  {
    title: 'Aménagement extérieur et terrasse bois',
    images: []
  }
];

const ServicesGallery: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('Rénovation Complète');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentService = services.find(s => s.title === selectedService);

  return (
    <section id="realisations-top" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8 pt-24">
        <div className="text-center mb-12">
          <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
            PORTFOLIO DE RÉALISATIONS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4 mb-8">
            Nos Projets d'Exception
          </h2>
          <p className="text-slate-300 text-lg max-w-3xl mx-auto">
            Découvrez notre savoir-faire à travers une sélection de nos plus belles réalisations.
            Chaque projet reflète notre engagement envers l'excellence et la satisfaction client.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {services.map((service) => (
            <button
              key={service.title}
              onClick={() => setSelectedService(service.title)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedService === service.title
                  ? 'bg-[#38bdf8] text-white shadow-lg shadow-[#38bdf8]/50'
                  : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              {service.title}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedService}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {currentService?.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => setLightboxImage(image)}
              >
                <img
                  src={image}
                  alt={`${selectedService} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">300+</div>
            <div className="text-slate-300 text-sm uppercase tracking-wide">PROJETS RÉALISÉS</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10 ans</div>
            <div className="text-slate-300 text-sm uppercase tracking-wide">D'EXPÉRIENCE</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">98%</div>
            <div className="text-slate-300 text-sm uppercase tracking-wide">CLIENTS SATISFAITS</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-white mb-2">10+</div>
            <div className="text-slate-300 text-sm uppercase tracking-wide">ARTISANS EXPERTS</div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightboxImage(null)}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-8 h-8 text-white" />
            </button>
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={lightboxImage}
              alt="Lightbox"
              className="max-w-full max-h-full object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ServicesGallery;
