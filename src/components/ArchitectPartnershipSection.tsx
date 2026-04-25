import React from 'react';
import { motion } from 'framer-motion';
import { Pen, ShieldCheck, Palette } from 'lucide-react';
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
    <section className="pt-6 pb-6 bg-transparent overflow-hidden">
      <ImageModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        imageUrl={modalImage.url} 
        imageAlt={modalImage.alt} 
      />
      <div className="w-full px-6 md:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 lg:items-center gap-12 max-w-7xl mx-auto">
          
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
                  Votre projet décoré par nos architectes d’intérieur.
                </span>
              </h2>
            </div>

            <div className="flex flex-row items-center gap-6 mb-4">
              <div className="relative shrink-0">
                <div 
                  onClick={() => openModal('https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg', 'Architecte Anaïs')}
                  className="w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer hover:scale-105 transition-transform duration-300 relative z-10"
                >
                  <OptimizedImage 
                    src="https://pub-2855f49daf4b4b1aa34aaa1cf596e77b.r2.dev/ESPACES%20ALPINS%20image.jpeg" 
                    alt="Architecte Anaïs" 
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Partner Badge Overlay */}
                <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 bg-white rounded-full p-1.5 shadow-lg z-20 border border-slate-100 flex items-center justify-center animate-bounce-subtle">
                  <Palette className="w-5 h-5 text-[#38bdf8]" />
                </div>
              </div>
              
              <div className="flex flex-col items-start text-left">
                <h3 className="font-black text-lg text-gray-900 leading-tight">Anaïs</h3>
                <span className="text-[11px] text-[#38bdf8] font-bold uppercase tracking-wider mt-0.5">Architectes d’intérieur</span>
                <div className="mt-2 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#FFB800" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Grâce à notre <strong>partenariat exclusif avec Anaïs</strong>, vos projets de rénovation prennent une <strong>toute nouvelle dimension</strong>.
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
                  <span className="text-xs font-normal opacity-90">Accompagnement d’architecte offert.</span>
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
                "Détail architecture de montagne par Anaïs",
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
                  <span className="text-xs font-normal opacity-90">Accompagnement d’architecte offert.</span>
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
