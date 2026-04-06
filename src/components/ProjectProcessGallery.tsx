import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, ArrowRight } from 'lucide-react';
import { useProjectGallery } from '../hooks/useProjectGallery';
import { GalleryModal } from './GalleryModal';

interface GalleryImage {
  id: string;
  project_slug: string;
  image_url: string;
  caption: string;
  display_order: number;
  is_process_image: boolean;
}

interface ProjectProcessGalleryProps {
  projectSlug: string;
  title?: string;
  subtitle?: string;
  staticImages?: GalleryImage[];
}

export const ProjectProcessGallery: React.FC<ProjectProcessGalleryProps> = ({
  projectSlug,
  title = 'Galerie du projet',
  subtitle = 'Découvrez les différentes étapes de nos travaux',
  staticImages,
}) => {
  const { images, loading } = useProjectGallery(projectSlug, staticImages);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading || !images.length) {
    return null;
  }

  const featuredImage = images[0];

  return (
    <>
      <section className="bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="container max-w-6xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h2>
            <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="md:col-span-2"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-100 group flex items-center justify-center min-h-96">
                <img
                  src={featuredImage.image_url}
                  alt={featuredImage.caption}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  whileHover={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-3 text-white">
                    <Camera className="w-6 h-6" />
                    <span className="font-semibold">Cliquez pour agrandir</span>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {featuredImage.caption}
                </h3>
                <p className="text-gray-600">
                  {featuredImage.is_process_image
                    ? 'Voir toutes les étapes du processus de rénovation'
                    : 'Voir tous les détails du projet finalisé'}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-1"
            >
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-8 h-8 text-cyan-600" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Galerie Complète
                  </h3>

                  <p className="text-gray-600 text-sm mb-6">
                    Explorez {images.length} photos de ce projet
                  </p>

                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                  >
                    <span>Voir toutes les photos</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="mt-6 pt-6 border-t border-gray-200 w-full">
                    <div className="grid grid-cols-3 gap-2">
                      {images.slice(0, 3).map((img, idx) => (
                        <div key={img.id} className="w-full bg-gray-100 rounded-lg flex items-center justify-center min-h-24">
                          <img
                            src={img.image_url}
                            alt={`Gallery ${idx + 1}`}
                            className="w-full h-full object-contain rounded-lg opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={() => {
                              setIsModalOpen(true);
                            }}
                          />
                        </div>
                      ))}
                    </div>
                    {images.length > 3 && (
                      <p className="text-xs text-gray-500 mt-3">
                        + {images.length - 3} autre{images.length - 3 > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <GalleryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        images={images}
      />
    </>
  );
};
