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
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760251355/ChatGPT_Image_29_sept._2025_10_53_53_zd2zb7.png',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250256/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_j3111i.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod.jpg'
    ]
  },
  {
    title: 'Rénovation Cuisine',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256601/ChatGPT_Image_12_oct._2025_a%CC%80_10_03_45_dwyzwi.png'
    ]
  },
  {
    title: 'Salle de Bain',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760255308/ChatGPT_Image_12_oct._2025_a%CC%80_09_48_11_cl2irp.png',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250258/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760252170/WhatsApp_Image_2025-10-02_at_16.26.45_zstr3j.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760255071/IMG-20250910-WA0032_mrskfe.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760255059/IMG-20250909-WA0086_fxxstd.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760252666/IMG-20250910-WA0038_luqpxk.jpg'
    ]
  },
  {
    title: 'Peinture',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250256/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_j3111i.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760251355/ChatGPT_Image_29_sept._2025_10_53_53_zd2zb7.png',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256601/ChatGPT_Image_12_oct._2025_a%CC%80_10_03_45_dwyzwi.png',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250258/d296e8a5-5cb3-446d-93b0-00f1a722c16b_jq4nyi.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760257688/ChatGPT_Image_12_oct._2025_a%CC%80_10_27_55_qk5xf8.png',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256239/ChatGPT_Image_12_oct._2025_a%CC%80_10_03_45_wcm93d.png'
    ]
  },
  {
    title: 'Revêtement Sol',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760254052/IMG-20250909-WA0040_izcj1t.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760253075/IMG-20250909-WA0042_enwkww.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/263b1bc0-48b1-4d4d-84eb-fdb258af1d2c_kq1aov.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256601/ChatGPT_Image_12_oct._2025_a%CC%80_10_03_45_dwyzwi.png',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250256/05db3f2c-8992-44b8-b2f2-3ac3668b72a2_j3111i.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760251355/ChatGPT_Image_29_sept._2025_10_53_53_zd2zb7.png'
    ]
  },
  {
    title: 'Électricité et Installation borne électrique',
    images: [
      'https://ik.imagekit.io/qhz1qzxur/WhatsApp_Image_2025-09-30_at_22.00.36_g9akl6%20(1).jpg?updatedAt=1761308524109',
      'https://ik.imagekit.io/qhz1qzxur/ChatGPT_Image_12_oct._2025_a%CC%80_10_21_18_tmn3sv.png?updatedAt=1761235605590',
      'https://ik.imagekit.io/qhz1qzxur/ChatGPT_Image_12_oct._2025_a%CC%80_10_27_55_qk5xf8%20(1).png?updatedAt=1761308122925',
      'https://ik.imagekit.io/qhz1qzxur/WhatsApp%20Image%202025-10-13%20at%2013.59.58%20(1).jpeg?updatedAt=1761308566160',
      'https://ik.imagekit.io/qhz1qzxur/WhatsApp%20Image%202025-10-14%20at%2015.44.21%20(2).jpeg?updatedAt=1761309529658'
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
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760251258/Capture_d_e%CC%81cran_2025-10-12_a%CC%80_08.39.38_lcr05k.png',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/a4a23d2a-e60e-48a4-aceb-a8996afb580c_htgckp.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/99bc0d67-c27f-414b-b223-6c1f194bbd7a_lamuod.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/29db9f6e-c821-4223-951b-786d949f99c0_yymo6x.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760250257/1090caa8-6c2e-4e6a-a6ad-f0353b69b48a_zdeunt.jpg'
    ]
  },
  {
    title: 'Espace verre',
    images: [
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760619777/WhatsApp_Image_2025-10-13_at_12.53.51_1_mpbczz.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256850/042e28c4-ab31-4285-ac0b-f923e217da66_ewelee.jpg',
      'https://res.cloudinary.com/dzwf4hmpm/image/upload/v1760256855/51f19edd-0cdf-4b46-9f6e-191ce2e22eda_vgciym.jpg'
    ]
  },
  {
    title: 'Salle de bain PMR',
    images: [
      'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1260&q=80'
    ]
  },
  {
    title: 'Menuiserie',
    images: [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design%20(48).png'
    ]
  },
  {
    title: 'Plâtrerie',
    images: [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design%20(42).png'
    ]
  },
  {
    title: 'Ventilation et chauffage',
    images: [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design%20(40).png'
    ]
  },
  {
    title: 'Aménagement extérieur et terrasse bois',
    images: [
      'https://pub-b2e43cc835de44a7830034d539ae5fe1.r2.dev/Untitled%20design%20(47).png'
    ]
  }
];

const ServicesShowcase: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('Rénovation Complète');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const currentService = services.find(s => s.title === selectedService);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 py-8">
        <div className="w-full max-w-none">
          <div className="text-center mb-16">
            <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
              PORTFOLIO DE RÉALISATIONS
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mt-4 mb-6 leading-tight">
              Nos Projets d'Exception
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto leading-relaxed">
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
                    ? 'bg-[#38bdf8] text-white shadow-lg shadow-[#38bdf8]/30 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 shadow-md'
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

export default ServicesShowcase;
