import React from 'react';
import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';
import BeforeAfterGallery from '@/components/ui/before-after-gallery';

interface ExpertiseSectionProps {
  onCtaClick?: () => void;
}

export const ExpertiseSection: React.FC<ExpertiseSectionProps> = ({ onCtaClick }) => {
  const handleCtaClick = () => {
    if (onCtaClick) {
      onCtaClick();
    } else {
      const form = document.getElementById('contact-form');
      if (form) {
        form.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="pt-0 pb-8 bg-transparent overflow-hidden">
      <div className="w-full px-4 md:px-8 lg:px-12 xl:px-16 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="space-y-8">
              <BeforeAfterGallery />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 lg:order-2 self-start"
          >
            <div>
              <span className="text-[#38bdf8] text-sm font-semibold uppercase tracking-wide">
                INSTALLATION & ENTRETIEN
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">Expertise et conseils sur mesure</span>
              </h2>
            </div>

            <p className="text-base text-slate-700 leading-relaxed mb-4">
              Au-delà de la rénovation, Groupe BML Rénovation assure l'installation et l'entretien de vos équipements, afin que votre habitat reste performant, sûr et agréable à vivre.
            </p>

            <p className="text-base text-slate-700 leading-relaxed mb-6">
              Qu'il s'agisse d'un chauffe-eau, d'une menuiserie, d'un système électrique ou d'un aménagement, nous veillons à la qualité des matériaux, à la précision des finitions et à la pérennité de chaque installation.
            </p>

            <p className="text-base text-slate-700 leading-relaxed mb-8">
              Notre objectif est de vous garantir un habitat esthétique, fonctionnel et durable, grâce à un suivi rigoureux et personnalisé.
            </p>

            <p className="text-base text-slate-600 italic mb-8">
              Glissez pour voir la transformation
            </p>

            <GradientCTAButton
              onClick={handleCtaClick}
              size="sm"
            >
              <div className="flex flex-col items-start leading-tight">
                <span className="font-semibold">Demander un devis gratuit</span>
                <span className="text-xs font-normal opacity-90">Réponse sous 24h</span>
              </div>
              <div className="flex flex-col items-center">
                <Pen className="w-4 h-4 flex-shrink-0" strokeWidth={2.5} />
                <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
              </div>
            </GradientCTAButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
