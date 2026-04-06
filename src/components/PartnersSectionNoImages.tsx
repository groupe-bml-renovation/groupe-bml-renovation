import React from 'react';
import { motion } from 'framer-motion';
import { mediaLogos } from '../data/media-logos';

interface PartnersSectionNoImagesProps {
  title?: string;
  description?: string;
}

export default function PartnersSectionNoImages({
  title = 'Nos partenaires de confiance',
  description = 'Groupe BML Rénovation collabore avec les plus grandes enseignes de matériaux et d\'équipements pour garantir la qualité de vos projets de rénovation'
}: PartnersSectionNoImagesProps) {
  const partners = mediaLogos;

  return (
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          <p className="text-slate-700 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center justify-items-center pt-4 mb-16"
        >
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 * (index % 5) }}
              viewport={{ once: true }}
              className="h-24 w-32 flex items-center justify-center bg-slate-50 rounded-lg border border-slate-100"
            >
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-20 w-28 object-contain object-center"
                decoding="async"
                width="112"
                height="80"
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
