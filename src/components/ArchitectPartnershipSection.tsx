import React from 'react';
import { motion } from 'framer-motion';
import { Pen } from 'lucide-react';
import { GradientCTAButton } from '@/components/ui/gradient-cta-button';
import { OptimizedImage } from './OptimizedImage';
import { AnimatedGalleryGrid } from './AnimatedGalleryGrid';
import ImageModal from './ImageModal';

interface ArchitectPartnershipSectionProps {
  onCtaClick?: () => void;
}

export const ArchitectPartnershipSection: React.FC<ArchitectPartnershipSectionProps> = ({ onCtaClick }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState({ url: '', alt: '' });

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

  const galleryImages = [
    "https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Realisations01.png",
    "https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Realisations02.png",
    "https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Realisations03.png",
    "https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/Realisations04.png"
  ];

  const features = [
    "Architecture intérieure complète (Rénovation & Extension)",
    "Gestion des dossiers de Permis de Construire (PCMI)",
    "Coaching Déco & Choix des Matériaux",
  ];

  const openModal = (url: string, alt: string) => {
    setModalImage({ url, alt });
    setModalOpen(true);
  };

  return (
    <section className="pt-10 md:pt-14 pb-8 md:pb-12 lg:pb-16 bg-transparent overflow-hidden">
      <ImageModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        imageUrl={modalImage.url} 
        imageAlt={modalImage.alt} 
      />
      <div className="w-full px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 lg:items-stretch gap-12 max-w-7xl mx-auto">
          
          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative order-1 lg:order-2 space-y-6"
          >
            <div>
              <span className="text-sm font-semibold uppercase tracking-wide text-[#38bdf8]">
                PARTENARIAT D'EXCELLENCE
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-4 mb-6 leading-tight">
                <span className="bg-gradient-to-r from-black to-[#38bdf8] bg-clip-text text-transparent">
                  Votre projet de rénovation, dessiné par nos architectes d’intérieur.
                </span>
              </h2>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div 
                onClick={() => openModal('https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20logo%20image.png', 'Espaces Alpins')}
                className="w-14 h-14 flex items-center justify-center shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img 
                  src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20logo%20image.png" 
                  alt="Espaces Alpins Logo" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-gray-900 leading-tight">Espaces Alpins</span>
                <span className="text-xs text-slate-500 uppercase tracking-wider">Architecture & Décoration Intérieur</span>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Grâce à notre <strong>partenariat exclusif avec Espaces Alpins</strong>, vos projets de rénovation prennent une <strong>toute nouvelle dimension</strong>.
              </p>
              <p>
                Du premier contact aux finitions finales, vous bénéficiez d’un <strong>accompagnement offert</strong> pour donner vie à un espace <strong>harmonieux, fonctionnel</strong> et pensé dans les moindres détails.
              </p>
            </div>

            <ul className="space-y-3 mt-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#38bdf8] flex-shrink-0" />
                  <span className="text-slate-700 text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <div className="hidden lg:block pt-2">
              <GradientCTAButton
                onClick={handleCtaClick}
                size="sm"
              >
                <div className="flex flex-col items-start leading-tight text-left">
                  <span className="font-semibold">Demander un devis gratuit</span>
                  <span className="text-xs font-normal opacity-90">Accompagnement d’architecte offert pour tout devis signé</span>
                </div>
                <div className="flex flex-col items-center">
                  <Pen className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                  <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                </div>
              </GradientCTAButton>
            </div>
          </motion.div>

          {/* Visual Side (Animated Gallery) */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1 flex flex-col justify-center"
          >
            <AnimatedGalleryGrid 
              images={galleryImages} 
              imageAlts={[
                "Détail architecture de montagne par Espaces Alpins",
                "Rénovation intérieure haut de gamme de chalet",
                "Aménagement intérieur moderne et chaleureux",
                "Vue d'ensemble d'un projet de design intérieur alpin"
              ]}
            />
            
            {/* Mobile/Tablet CTA */}
            <div className="lg:hidden mt-8 flex justify-center">
              <GradientCTAButton
                onClick={handleCtaClick}
                size="sm"
                className="w-full sm:w-auto"
              >
                <div className="flex flex-col items-start leading-tight text-left">
                  <span className="font-semibold">Demander un devis gratuit</span>
                  <span className="text-xs font-normal opacity-90">Accompagnement d’architecte offert pour tout devis signé</span>
                </div>
                <div className="flex flex-col items-center">
                  <Pen className="w-5 h-5 flex-shrink-0" strokeWidth={2.5} />
                  <div className="w-6 h-0.5 bg-current rounded-full mt-1"></div>
                </div>
              </GradientCTAButton>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ArchitectPartnershipSection;
