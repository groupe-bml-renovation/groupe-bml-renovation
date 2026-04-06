import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useProjectGallery } from '../hooks/useProjectGallery';
import { useProjectHighlightSection } from '../hooks/useProjectHighlightSection';
import { GalleryModal } from './GalleryModal';

interface ProjectHighlightSectionProps {
  projectSlug: string;
}

export const ProjectHighlightSection: React.FC<ProjectHighlightSectionProps> = ({ projectSlug }) => {
  const { section, loading: sectionLoading } = useProjectHighlightSection(projectSlug);
  const { images } = useProjectGallery(projectSlug);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (sectionLoading || !section || !images.length) {
    return null;
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="order-2 md:order-1"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg bg-gray-200 group">
                <img
                  src={section.section_image_url}
                  alt={section.section_title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  whileHover={{ opacity: 1 }}
                >
                  <div className="flex items-center gap-2 text-white">
                    <span className="font-semibold">Cliquez pour agrandir</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {section.section_title}
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {section.section_description}
              </p>

              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <span>{section.cta_button_text}</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  Galerie disponible ({images.length} photos)
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {images.slice(0, 4).map((img, idx) => (
                    <motion.button
                      key={img.id}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setIsModalOpen(true)}
                      className="relative rounded-lg overflow-hidden aspect-square group"
                    >
                      <img
                        src={img.image_url}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity"
                      />
                    </motion.button>
                  ))}
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
